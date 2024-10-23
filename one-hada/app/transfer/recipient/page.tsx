'use client'

// import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/router';
import { useState } from 'react';

export default function RecipientPage({
  searchParams: { account_id },
}: {
  searchParams: { account_id: string };
}) {
  //   const router = useRouter();
  //   const searchParams = useSearchParams();
  //   const account_id = searchParams.get('account_id');

  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBank(event.target.value);
  };

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountNumber(event.target.value);
  };

  type Account = {
    account_id: string;
    user_id: string;
    account_number: number;
    balance: number;
    account_type: string;
    bank: string;
    account_name: string;
  };

  const recipientAccounts: Account[] = [
    {
      account_id: 'B001',
      user_id: 'U002',
      account_number: 1003153876539,
      balance: 5000000,
      account_type: '입출금',
      bank: '신한은행',
      account_name: '신한 주거래 통장',
    },
    {
      account_id: 'B002',
      user_id: 'U002',
      account_number: 10031537524301,
      balance: 3200000,
      account_type: '저축',
      bank: '신한은행',
      account_name: '신한 저축 통장',
    },
  ];

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-center font-bold text-2xl mb-6'>
        누구에게 보낼까요? {account_id}
      </h1>
      <div className='bg-gray-100 p-4 rounded-lg mb-6'>
        <select
          value={selectedBank}
          onChange={handleBankChange}
          className='w-full mb-4 p-2 border border-gray-300 rounded'
        >
          <option value=''>은행을 선택해주세요</option>
          <option value='bank1'>하나은행</option>
          <option value='bank2'>국민은행</option>
          <option value='bank3'>신한은행</option>
        </select>

        <input
          type='text'
          placeholder='계좌번호를 입력해주세요'
          value={accountNumber}
          onChange={handleAccountNumberChange}
          className='w-full mb-4 p-2 border border-gray-300 rounded'
        />

        {/* 수취인 목록 */}
        <div className='flex flex-col gap-4'>
          {recipientAccounts.map((account) => (
            <div
              key={account.account_id}
              className='flex items-center bg-[#bfe4da] p-4 rounded-lg cursor-pointer hover:bg-[#a3d2c7]'
            >
              <div className='flex flex-col'>
                <span className='font-medium text-lg'>
                  {account.account_name}
                </span>
                <span className='text-sm text-gray-600'>
                  {account.account_number}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
