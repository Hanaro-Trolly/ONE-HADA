'use client';

import dummy from '@/c-dummy/account_d.json';
import TypeButton from '@/components/molecules/TypeButton';
import Link from 'next/link';
import { useState } from 'react';

type AccountData = {
  account_id: string;
  user_id: string;
  account_number: number;
  balance: number;
  account_type: string;
  bank: string;
  account_name: string;
};
export default function AccountDetailPage({
  params,
}: {
  params: { accountId: string };
}) {
  const { accountId } = params;
  const [selectedPeriod, setSelectedPeriod] = useState<string>('전체');
  const [selectedType, setSelectedType] = useState<string>('전체');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const account: AccountData | undefined = dummy.accounts.find((acc) => {
    return acc.account_id === accountId;
  });
  if (!account) {
    return <div>계좌를 찾을 수 없습니다.</div>;
  }
  const handlePeriodClick = (period: string) => {
    setSelectedPeriod(period);
    setStartDate('');
    setEndDate('');
  };
  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };
  return (
    <div className='bg-white shadow-md rounded-lg m-4 p-4'>
      <h1>{account.account_name}</h1>
      <div className='mt-4'>{account.account_number}</div>
      <div className='bg-gray-100 shadow-md rounded-lg mt-8 p-4'>
        <h2 className='text-lg font-bold mb-4'>조회 옵션</h2>
        <div className='mb-4'>
          <p className='text-md font-semibold'>조회기간</p>
          <div className='flex gap-2 mt-2'>
            <TypeButton
              button_type='조회기간'
              onClick={() => handlePeriodClick('전체')}
              className={
                selectedPeriod === '전체'
                  ? 'bg-[#377B68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              전체
            </TypeButton>
            <TypeButton
              button_type='조회기간'
              onClick={() => handlePeriodClick('1개월')}
              className={
                selectedPeriod === '1개월'
                  ? 'bg-[#377B68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              1개월
            </TypeButton>
            <TypeButton
              button_type='조회기간'
              onClick={() => handlePeriodClick('3개월')}
              className={
                selectedPeriod === '3개월'
                  ? 'bg-[#377B68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              3개월
            </TypeButton>
            <TypeButton
              button_type='조회기간'
              onClick={() => handlePeriodClick('6개월')}
              className={
                selectedPeriod === '6개월'
                  ? 'bg-[#377B68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              6개월
            </TypeButton>
            <TypeButton
              button_type='조회기간'
              onClick={() => handlePeriodClick('1년')}
              className={
                selectedPeriod === '1년'
                  ? 'bg-[#377B68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              1년
            </TypeButton>
          </div>
        </div>
        <div className='mb-4'>
          <div className='flex gap-4 mt-2'>
            <input
              type='date'
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setSelectedPeriod('');
              }}
              className='border rounded-md px-4 py-2'
              placeholder='시작 날짜'
            />
            <input
              type='date'
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setSelectedPeriod('');
              }}
              className='border rounded-md px-4 py-2'
              placeholder='종료 날짜'
            />
          </div>
        </div>
        {/* 거래 구분 */}
        <div className='mb-4'>
          <p className='text-md font-semibold'>거래 구분</p>
          <div className='flex gap-2 mt-2'>
            <TypeButton
              button_type='거래구분'
              onClick={() => handleTypeClick('전체')}
              className={
                selectedType === '전체'
                  ? 'bg-[#377B68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              전체
            </TypeButton>
            <TypeButton
              button_type='거래구분'
              onClick={() => handleTypeClick('입금')}
              className={
                selectedType === '입금'
                  ? 'bg-[#377B68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              입금
            </TypeButton>
            <TypeButton
              button_type='거래구분'
              onClick={() => handleTypeClick('출금')}
              className={
                selectedType === '출금'
                  ? 'bg-[#377B68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              출금
            </TypeButton>
          </div>
        </div>
        <div className='mb-4'>
          <p className='text-md font-semibold'>검색어</p>
          <input
            type='text'
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className='border rounded-md px-4 py-2 w-full'
            placeholder='검색어 입력'
          />
        </div>
        {/* 조회하기 버튼 */}
        <Link
          href={`/check/${account.account_id}/detail?period=${selectedPeriod}&type=${selectedType}&accountId=${account.account_id}&startDate=${startDate}&endDate=${endDate}&search=${searchKeyword}`}
        >
          <div className='flex justify-end'>
            <button className='px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'>
              조회하기
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
