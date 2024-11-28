'use client';

// 계좌 검색 페이지
// - 계좌 상세 정보 표시
// - 검색 폼 제공
// - 검색 히스토리 저장 기능
// - 검색 결과를 URL 파라미터로 변환하여 detail 페이지로 이동
import AccountHeader from '@/components/check/AccountHeader';
import SearchForm from '@/components/check/SearchForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getData, addData, fetchAllData } from '@/lib/api';
import { History, Account } from '@/lib/datatypes';

export default function AccountDetailPage({
  params,
}: {
  params: { accountId: string };
}) {
  const { accountId } = params;
  const [account, setAccount] = useState<Account | null>(null);
  const [historyLength, setHistoryLength] = useState<number>(0);
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

  const handleSearch = async (searchParams: Record<string, string>) => {
    if (!account) return;

    const historyData: History = {
      id: String(historyLength),
      user_id: account.user_id,
      history_name: createHistoryName(searchParams),
      history_elements: createHistoryParams(searchParams),
      activity_date: new Date(),
    };

    try {
      await addData<History>('history', historyData);
      const queryString = new URLSearchParams(searchParams).toString();
      router.push(`/check/${account.id}/detail?${queryString}`);
    } catch (error) {
      console.error('조회 기록 저장 오류:', error);
    }
  };

  const createHistoryName = (searchParams: Record<string, string>) => {
    const periodText =
      searchParams.startDate && searchParams.endDate
        ? `${searchParams.startDate}부터 ${searchParams.endDate}`
        : searchParams.period;
    return `${periodText} 동안 ${searchParams.type} 내역 ${searchParams.searchKeyword} 조회하기`;
  };

  const createHistoryParams = (searchParams: Record<string, string>) => {
    return [
      accountId,
      searchParams.period,
      searchParams.startDate,
      searchParams.endDate,
      searchParams.type,
      searchParams.searchKeyword,
    ].join('#');
  };

  if (account == null) return <div>계좌 조회 중...</div>;

  return (
    <div className='bg-[#DCEFEA] w-full min-h-screen flex flex-col'>
      <AccountHeader account={account} />
      <SearchForm onSearch={handleSearch} />
    </div>
  );
}
