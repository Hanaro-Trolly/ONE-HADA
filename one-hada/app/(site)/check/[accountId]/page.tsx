'use client';

import BankIcon from '@/components/molecules/BankIcon';
import TypeButton from '@/components/molecules/TypeButton';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getData, addData, fetchAllData } from '@/lib/api';
import { History, Account } from '@/lib/datatypes';

// 기간 옵션 상수 정의
const PERIOD_OPTIONS = ['전체', '1개월', '3개월', '6개월', '1년'] as const;
type PeriodOption = (typeof PERIOD_OPTIONS)[number];

// 거래 구분 옵션 상수 정의
const TRANSACTION_TYPES = ['전체', '입금', '출금'] as const;
type TransactionType = (typeof TRANSACTION_TYPES)[number];

interface SearchFormState {
  period: PeriodOption;
  type: TransactionType;
  startDate: string;
  endDate: string;
  searchKeyword: string;
}

interface PeriodSectionProps {
  period: PeriodOption;
  onPeriodChange: (value: string) => void;
  buttonClassName: (isSelected: boolean) => string;
}

interface TransactionTypeSectionProps {
  type: TransactionType;
  onTypeChange: (value: string) => void;
  buttonClassName: (isSelected: boolean) => string;
}

// 각 섹션 컴포넌트 정의
const PeriodSection = ({
  period,
  onPeriodChange,
  buttonClassName,
}: PeriodSectionProps) => (
  <div className='mt-10 mb-10'>
    <p className='text-md font-semibold'>조회기간</p>
    <div className='flex justify-between mt-6'>
      {PERIOD_OPTIONS.map((periodOption) => (
        <TypeButton
          key={periodOption}
          button_type='조회기간'
          onClick={() => onPeriodChange(periodOption)}
          className={buttonClassName(period === periodOption)}
        >
          {periodOption}
        </TypeButton>
      ))}
    </div>
  </div>
);

interface DateRangeSectionProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

const DateRangeSection = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangeSectionProps) => (
  <div className='mb-4'>
    <div className='flex justify-between items-center mt-2'>
      <input
        type='date'
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        className='w-36 border text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-inset focus:ring-main-green focus:outline-none'
        placeholder='시작 날짜'
      />
      <span>~</span>
      <input
        type='date'
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        className='w-36 border text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-inset focus:ring-main-green focus:outline-none'
        placeholder='종료 날짜'
      />
    </div>
  </div>
);

const TransactionTypeSection = ({
  type,
  onTypeChange,
  buttonClassName,
}: TransactionTypeSectionProps) => (
  <div className='mb-10'>
    <p className='text-md mt-10 font-semibold'>거래 구분</p>
    <div className='flex gap-2 mt-6'>
      {TRANSACTION_TYPES.map((transactionType) => (
        <TypeButton
          key={transactionType}
          button_type='거래구분'
          onClick={() => onTypeChange(transactionType)}
          className={buttonClassName(type === transactionType)}
        >
          {transactionType}
        </TypeButton>
      ))}
    </div>
  </div>
);

interface SearchKeywordSectionProps {
  keyword: string;
  onChange: (value: string) => void;
}

const SearchKeywordSection = ({
  keyword,
  onChange,
}: SearchKeywordSectionProps) => (
  <div className='mb-10'>
    <p className='text-md font-semibold'>검색어</p>
    <input
      type='text'
      value={keyword}
      onChange={(e) => onChange(e.target.value)}
      className='border rounded-full mt-6 px-4 py-2 w-1/2 bg-[#DCEFEA] focus:ring-2 focus:ring-inset focus:ring-main-green focus:outline-none'
      placeholder='검색어 입력'
    />
  </div>
);
export default function AccountDetailPage({
  params,
}: {
  params: { accountId: string };
}) {
  const { accountId } = params;
  const [account, setAccount] = useState<Account | null>(null);
  const [historyLength, setHistoryLength] = useState<number>(0);
  const [searchForm, setSearchForm] = useState<SearchFormState>({
    period: '전체',
    type: '전체',
    startDate: '',
    endDate: '',
    searchKeyword: '',
  });
  const router = useRouter();

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const [accountData, histories] = await Promise.all([
          getData<Account>('account', accountId),
          fetchAllData<History>('history'),
        ]);

        setAccount(accountData);
        setHistoryLength(histories.length + 1);
      } catch (error) {
        console.error('데이터 로딩 오류:', error);
      }
    };

    fetchAccountData();
  }, [accountId]);

  const handleFormChange = (field: keyof SearchFormState, value: string) => {
    setSearchForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'period' ? { startDate: '', endDate: '' } : {}),
      ...(field === 'startDate' || field === 'endDate'
        ? { period: '전체' }
        : {}),
    }));
  };

  const handleSearch = async () => {
    if (!account) return;

    const historyData: History = {
      id: String(historyLength),
      user_id: account.user_id,
      history_name: createHistoryName(),
      history_type: 'inquiry',
      history_params: createHistoryParams(),
      activity_date: new Date(),
      is_Shortcut: false,
    };

    try {
      await addData<History>('history', historyData);
      const queryString = createQueryString();

      // 클라이언트 사이드에서만 실행
      if (typeof window !== 'undefined') {
        router.push(`/check/${account.id}/detail?${queryString}`);
      }
    } catch (error) {
      console.error('조회 기록 저장 오류:', error);
    }
  };

  const createHistoryName = () => {
    const periodText =
      searchForm.startDate && searchForm.endDate
        ? `${searchForm.startDate}부터 ${searchForm.endDate}`
        : searchForm.period;
    return `${periodText} 동안 ${searchForm.type} 내역 ${searchForm.searchKeyword} 조회하기`;
  };

  const createHistoryParams = () => {
    return [
      accountId,
      searchForm.period,
      searchForm.startDate,
      searchForm.endDate,
      searchForm.type,
      searchForm.searchKeyword,
    ].join('#');
  };

  const createQueryString = () => {
    const params = new URLSearchParams({
      period: searchForm.period,
      type: searchForm.type,
      accountId: account!.id,
      startDate: searchForm.startDate,
      endDate: searchForm.endDate,
      search: searchForm.searchKeyword,
    });
    return params.toString();
  };

  if (!account) return <div>계좌 조회중</div>;

  return (
    <div className='bg-[#DCEFEA] w-full min-h-screen flex flex-col'>
      <AccountHeader account={account} />
      <SearchForm
        searchForm={searchForm}
        onFormChange={handleFormChange}
        onSearch={handleSearch}
      />
    </div>
  );
}

function AccountHeader({ account }: { account: Account }) {
  return (
    <div className='flex items-center ml-4 mt-4'>
      <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
        <BankIcon bankId={account.bank} />
      </div>
      <div className='ml-4'>
        <h1 className='text-xl font-medium'>{account.account_name}</h1>
        <h2 className='text-xl font-medium'>{account.account_number}</h2>
      </div>
    </div>
  );
}

interface SearchFormProps {
  searchForm: SearchFormState;
  onFormChange: (field: keyof SearchFormState, value: string) => void;
  onSearch: () => void;
}

function SearchForm({ searchForm, onFormChange, onSearch }: SearchFormProps) {
  const buttonClassName = (isSelected: boolean) => `
    ${isSelected ? 'bg-[#95D0BF] text-white' : 'bg-[#ffffff] text-black shadow-none hover:bg-[#95D0BF] hover:text-white'}
    rounded-full px-4 py-2 focus:bg-[#95D0BF] focus:text-white
  `;

  return (
    <div className='bg-white shadow-md rounded-lg mt-8 p-8 flex-grow'>
      <h2 className='text-lg font-bold mb-4'>조회 옵션</h2>

      <PeriodSection
        period={searchForm.period}
        onPeriodChange={(value) => onFormChange('period', value)}
        buttonClassName={buttonClassName}
      />

      <DateRangeSection
        startDate={searchForm.startDate}
        endDate={searchForm.endDate}
        onStartDateChange={(value) => onFormChange('startDate', value)}
        onEndDateChange={(value) => onFormChange('endDate', value)}
      />

      <TransactionTypeSection
        type={searchForm.type}
        onTypeChange={(value) => onFormChange('type', value)}
        buttonClassName={buttonClassName}
      />

      <SearchKeywordSection
        keyword={searchForm.searchKeyword}
        onChange={(value) => onFormChange('searchKeyword', value)}
      />

      <button
        onClick={onSearch}
        className='w-4/5 mt-6 px-6 py-2 bg-[#61B89F] text-white rounded-md hover:bg-[#377B68]'
      >
        조회하기
      </button>
    </div>
  );
}
