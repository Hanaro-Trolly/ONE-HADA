// 거래내역 검색을 위한 폼 컴포넌트
// - 조회기간 선택 (전체/1개월/3개월/6개월/1년)
// - 날짜 직접 선택 기능
// - 거래 구분 필터 (전체/입금/출금)
// - 검색어 입력
// - 모든 검색 조건을 단일 상태로 관리
import TypeButton from '@/components/molecules/TypeButton';
import { useState } from 'react';

interface SearchFormProps {
  onSearch: (params: Record<string, string>) => void;
}

const PERIOD_OPTIONS = ['전체', '1개월', '3개월', '6개월', '1년'] as const;
const TRANSACTION_TYPES = ['전체', '입금', '출금'] as const;

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [formState, setFormState] = useState({
    period: '전체',
    type: '전체',
    startDate: '',
    endDate: '',
    searchKeyword: '',
  });

  const handleFormChange = (field: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'period' ? { startDate: '', endDate: '' } : {}),
      ...(field === 'startDate' || field === 'endDate'
        ? { period: '전체' }
        : {}),
    }));
  };

  const handleSubmit = () => {
    onSearch(formState);
  };

  const buttonClassName = (isSelected: boolean) => `
    ${isSelected ? 'bg-[#95D0BF] text-white' : 'bg-[#ffffff] text-black shadow-none hover:bg-[#95D0BF] hover:text-white'}
    rounded-full px-4 py-2 focus:bg-[#95D0BF] focus:text-white
  `;

  return (
    <div className='bg-white shadow-md rounded-lg mt-8 p-8 flex-grow'>
      <h2 className='text-lg font-bold mb-4'>조회 옵션</h2>

      {/* 조회기간 섹션 */}
      <div className='mt-10 mb-10'>
        <p className='text-md font-semibold'>조회기간</p>
        <div className='flex justify-between mt-6'>
          {PERIOD_OPTIONS.map((periodOption) => (
            <TypeButton
              key={periodOption}
              button_type='조회기간'
              onClick={() => handleFormChange('period', periodOption)}
              className={buttonClassName(formState.period === periodOption)}
            >
              {periodOption}
            </TypeButton>
          ))}
        </div>
      </div>

      {/* 날짜 범위 섹션 */}
      <div className='mb-4'>
        <div className='flex justify-between items-center mt-2'>
          <input
            type='date'
            value={formState.startDate}
            onChange={(e) => handleFormChange('startDate', e.target.value)}
            className='w-36 border text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-inset focus:ring-main-green focus:outline-none'
            placeholder='시작 날짜'
          />
          <span>~</span>
          <input
            type='date'
            value={formState.endDate}
            onChange={(e) => handleFormChange('endDate', e.target.value)}
            className='w-36 border text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-inset focus:ring-main-green focus:outline-none'
            placeholder='종료 날짜'
          />
        </div>
      </div>

      {/* 거래 구분 섹션 */}
      <div className='mb-10'>
        <p className='text-md mt-10 font-semibold'>거래 구분</p>
        <div className='flex gap-2 mt-6'>
          {TRANSACTION_TYPES.map((transactionType) => (
            <TypeButton
              key={transactionType}
              button_type='거래구분'
              onClick={() => handleFormChange('type', transactionType)}
              className={buttonClassName(formState.type === transactionType)}
            >
              {transactionType}
            </TypeButton>
          ))}
        </div>
      </div>

      {/* 검색어 섹션 */}
      <div className='mb-10'>
        <p className='text-md font-semibold'>검색어</p>
        <input
          type='text'
          value={formState.searchKeyword}
          onChange={(e) => handleFormChange('searchKeyword', e.target.value)}
          className='border rounded-full mt-6 px-4 py-2 w-1/2 bg-[#DCEFEA] focus:ring-2 focus:ring-inset focus:ring-main-green focus:outline-none'
          placeholder='검색어 입력'
        />
      </div>

      {/* 조회하기 버튼 */}
      <button
        onClick={handleSubmit}
        className='w-4/5 mt-6 px-6 py-2 bg-[#61B89F] text-white rounded-md hover:bg-[#377B68]'
      >
        조회하기
      </button>
    </div>
  );
}
