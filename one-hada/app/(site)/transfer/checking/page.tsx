'use client';

import { IoCheckbox } from 'react-icons/io5';
import { useState } from 'react';

export default function Checking({
  searchParams: {
    account_id: accountId,
    recipient_number: recipientNumber,
    bank: bankName,
    amount,
  },
}: {
  searchParams: {
    account_id: string;
    recipient_number: string;
    bank: string;
    amount: string;
  };
}) {
  // const accountId = searchParams.get('account_id');
  // const recipientNumber = searchParams.get('recipient_number');
  // const bankName = searchParams.get('bank');
  // const amount = searchParams.get('amount');
  const [recipientName] = useState('김하나');
  const [senderName] = useState('김율리');

  return (
    <div className='container mx-auto p-4'>
      <div className='bg-gray-50 p-6 flex flex-col items-center rounded-lg shadow-md'>
        <IoCheckbox className='text-green-600 text-4xl mb-6' />
        <h2 className='text-center font-bold text-lg mb-12'>
          <span className='text-green-700'>
            {recipientName}
            {accountId}
          </span>
          <span className='text-gray-400'>님께 </span>
          <span className='text-green-700'>
            {Number(amount).toLocaleString()}원을
          </span>
          <span className='block text-gray-400'> 송금했습니다!</span>
        </h2>

        <div className='bg-white border border-gray-300 rounded-lg p-4 mb-6 w-full'>
          <div className='flex justify-between mt-4 mb-10'>
            <p className='font-bold text-sm text-gray-600'>받는 계좌</p>
            <p className='text-gray-800'>
              {bankName} {recipientNumber}
            </p>
          </div>
          <div className='flex justify-between items-center mb-10'>
            <p className='font-bold text-sm text-gray-600'>받는분에게 표기</p>
            <input
              type='text'
              value={recipientName}
              readOnly
              className='border-b border-gray-400 w-1/2 text-right focus:outline-none'
            />
          </div>
          <div className='flex justify-between items-center mb-4'>
            <p className='font-bold text-sm text-gray-600'>나에게 표기</p>
            <input
              type='text'
              value={senderName}
              readOnly
              className='border-b border-gray-400 w-1/2 text-right focus:outline-none'
            />
          </div>
        </div>
      </div>
      <button className='w-full bg-green-400 text-white font-bold py-3 rounded mt-6 hover:bg-green-500 transition'>
        확인
      </button>
    </div>
  );
}