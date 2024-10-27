'use client';

import { Button } from '@/components/ui/button';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TransferConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const accountId = searchParams.get('account_id');
  const recipientNumber = searchParams.get('recipient_number');
  const bankName = searchParams.get('bank');
  const amount = searchParams.get('amount');
  const [recipientName] = useState('김하나');
  const [senderName] = useState('김율리');
  const bankId = searchParams.get('bank');

  const handleClick = () => {
    if (accountId && recipientNumber && bankId && amount) {
      router.push(
        `/transfer/checking?account_id=${accountId}&bank=${bankId}&recipient_number=${recipientNumber}&amount=${amount}`
      );
    } else {
      alert('은행과 계좌번호를 모두 입력해주세요.');
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='bg-gray-50 p-6 flex flex-col items-center rounded-lg shadow-md'>
        <MdOutlineQuestionMark className='text-gray-400 text-4xl mb-6' />
        <h2 className='text-center font-bold text-lg mb-12'>
          <span className='text-green-700'>{recipientName}</span>
          <span className='text-gray-400'>님께 </span>
          <span className='text-green-700'>
            {Number(amount).toLocaleString()}원을
          </span>
          <span className='block text-gray-400'> 송금할까요?</span>
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
      <Button
        id='241'
        onClick={() => handleClick()}
        className='w-full bg-green-400 text-white font-bold py-3 rounded mt-6 hover:bg-green-500 transition'
      >
        {recipientName}님께 송금
      </Button>
    </div>
  );
}
