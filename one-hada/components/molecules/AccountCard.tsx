'use client';

import BankIcon from './BankIcon';

type AccountCardProps = {
  accountId: string;
  accountNumber: number;
  balance?: number; // balance를 선택적 속성으로 정의
  accountType: string;
  bank: string;
};

export default function AccountCard({
  accountId,
  accountNumber,
  balance,
  accountType,
  bank,
}: AccountCardProps) {
  return (
    <div
      key={accountId}
      className='bg-white shadow-md rounded-lg w-full h-full flex items-start justify-center flex-col space-y-3 p-4 mb-4'
    >
      <div className='flex items-center gap-4'>
        {/* Bank icon */}
        <BankIcon bankId={bank} />
        <div className='flex flex-col'>
          <h1 className='font-medium text-left text-lg'>{accountType}</h1>
          <label className='font-light text-gray-500 text-left text-sm'>
            {`${bank} • ${accountNumber}`}
          </label>
        </div>
      </div>
      {/* balance 값이 존재할 때만 렌더링 */}
      {balance !== undefined && (
        <h2 className='font-medium text-lg text-right self-end'>
          {balance.toLocaleString()} 원
        </h2>
      )}
    </div>
  );
}
