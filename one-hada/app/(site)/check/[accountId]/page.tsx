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

  // 더미 데이터에서 account_id에 맞는 계좌를 찾음
  const account: AccountData | undefined = dummy.accounts.find((acc) => {
    return acc.account_id === accountId;
  });

  // 계좌를 찾지 못한 경우
  if (!account) {
    return <div>계좌를 찾을 수 없습니다.</div>;
  }

  // TypeButton 클릭 시 실행될 함수
  const handlePeriodClick = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  return (
    <div className='bg-white shadow-md rounded-lg m-4 p-4'>
      <h1>
        {account.account_name} ({account.account_number})
      </h1>

      <div className='mt-4'>
        <p>잔액: {account.balance.toLocaleString()} 원</p>
        <p>은행: {account.bank}</p>
        <p>계좌 종류: {account.account_type}</p>
      </div>

      {/* 조회 옵션 박스 */}
      <div className='bg-gray-100 shadow-md rounded-lg mt-8 p-4'>
        <h2 className='text-lg font-bold mb-4'>조회 옵션</h2>

        {/* 조회 기간 */}
        <div className='mb-4'>
          <p className='text-md font-semibold'>조회기간</p>
          <div className='flex gap-2 mt-2'>
            <TypeButton
              button_type='조회기간'
              onClicks={() => handlePeriodClick('전체')}
              className={
                selectedPeriod === '전체'
                  ? 'bg-[#377b68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              전체
            </TypeButton>
            <TypeButton
              button_type='조회기간'
              onClicks={() => handlePeriodClick('1개월')}
              className={
                selectedPeriod === '1개월'
                  ? 'bg-[#377b68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              1개월
            </TypeButton>
            <TypeButton
              button_type='조회기간'
              onClicks={() => handlePeriodClick('3개월')}
              className={
                selectedPeriod === '3개월'
                  ? 'bg-[#377b68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              3개월
            </TypeButton>
            <TypeButton
              button_type='조회기간'
              onClicks={() => handlePeriodClick('6개월')}
              className={
                selectedPeriod === '6개월'
                  ? 'bg-[#377b68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              6개월
            </TypeButton>
            <TypeButton
              button_type='조회기간'
              onClicks={() => handlePeriodClick('1년')}
              className={
                selectedPeriod === '1년'
                  ? 'bg-[#377b68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              1년
            </TypeButton>
          </div>
        </div>

        {/* 거래 구분 */}
        <div className='mb-4'>
          <p className='text-md font-semibold'>거래 구분</p>
          <div className='flex gap-2 mt-2'>
            <TypeButton
              button_type='거래구분'
              onClicks={() => handleTypeClick('전체')}
              className={
                selectedType === '전체'
                  ? 'bg-[#377b68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              전체
            </TypeButton>
            <TypeButton
              button_type='거래구분'
              onClicks={() => handleTypeClick('입금')}
              className={
                selectedType === '입금'
                  ? 'bg-[#377b68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              입금
            </TypeButton>
            <TypeButton
              button_type='거래구분'
              onClicks={() => handleTypeClick('출금')}
              className={
                selectedType === '출금'
                  ? 'bg-[#377b68] text-white'
                  : 'bg-[#61B89F] text-white'
              }
            >
              출금
            </TypeButton>
          </div>
        </div>

        {/* 조회하기 버튼 */}
        <Link
          href={`/check/${account.account_id}/detail?period=${selectedPeriod}&type=${selectedType}&accountId=${account.account_id}`}
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
