'use client';

import useApi from '@/hooks/useApi';
import BankIcon from './BankIcon';

type AccountCardProps = {
  id: string;
  name: string;
  accountNumber: number;
  balance: number;
  accountType: string;
  bank: string;
  user_id: string;
};

export default function AccountCard({
  id,
  name,
  accountNumber,
  balance,
  accountType,
  bank,
}: AccountCardProps) {
  return (
    <div
      key={id}
      className='bg-white shadow-md rounded-lg w-full h-full flex items-start justify-between flex-col p-5 mb-4'
    >
      <div className='flex items-center gap-4'>
        {/* Bank icon */}
        <BankIcon bankId={bank} />
        <div className='flex flex-col'>
          <h1 className='font-medium text-left text-lg'>{accountType}</h1>
          <label className='font-light text-gray-500 text-left text-xs'>
            {`${bank} • ${accountNumber}`}
          </label>
        </div>
      </div>
      <h2 className='font-medium text-lg text-right self-end'>
        {balance.toLocaleString()} 원
      </h2>
    </div>
  );
}
