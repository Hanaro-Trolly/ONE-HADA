'use client';

import { Button } from '@/components/ui/button';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface GetRedisData {
  amount: string;
  senderName: string;
  receiverName: string;
  receiverAccountBank: string;
  receiverAccountNumber: string;
}

export default function TransferConfirmation() {
  const { fetchData, error } = useFetch<GetRedisData>();
  const router = useRouter();

  const senderNameRef = useRef<HTMLInputElement>(null);
  const receiverNameRef = useRef<HTMLInputElement>(null);

  const [senderName, setSenderName] = useState<string>('');
  const [receiverName, setReceiverName] = useState<string>('');
  const [receiverBank, setReceiverBank] = useState<string>('');
  const [receiverAccountNumber, setReceiverAccountNumber] =
    useState<string>('');
  const [amount, setAmount] = useState<string>('0');

  const handleClick = async () => {
    if (senderNameRef.current && receiverNameRef.current) {
      const response = await fetchData('/api/redis', {
        method: 'PATCH',
        body: {
          senderName: senderNameRef.current.value,
          receiverName: receiverNameRef.current.value,
        },
      });

      if (response.code == 200) {
        const route: string = '/transfer/save';
        router.push(`/api/auth/checkPassword?route=${route}`);
      }
    }
  };

  useEffect(() => {
    const getRedisValues = async () => {
      const response = await fetchData('/api/redis/get', {
        method: 'POST',
        body: [
          'amount',
          'senderName',
          'receiverName',
          'receiverAccountBank',
          'receiverAccountNumber',
        ],
      });

      if (response.code == 200) {
        setSenderName(response.data.senderName as string);
        setAmount(response.data.amount as string);
        setReceiverName(response.data.receiverName as string);
        setReceiverBank(response.data.receiverBank as string);
        setReceiverAccountNumber(response.data.receiverAccountNumber as string);
      }
    };

    getRedisValues();
  }, [fetchData]);

  useEffect(() => {
    if (error) {
      console.error('Fetch 에러 발생:', error);
    }
  }, [error]);

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='flex flex-col justify-between items-center px-6 pb-6'
    >
      <div className='tossface-icon text-[4rem] pt-10 text-center'>❔</div>
      <h2 className='text-center font-medium text-xl mb-12'>
        <span className='text-[#479E86]'>{receiverName}</span>
        <span className='font-medium'>님께 </span>
        <span className='text-[#479E86] '>
          {Number(amount).toLocaleString()}원
          <span className='text-black'>을</span>
        </span>
        <span className='block font-medium'> 송금할까요?</span>
      </h2>

      <div className='bg-white rounded-xl shadow-md p-4 mb-6 w-full'>
        <div className='flex justify-between mt-4 mb-10'>
          <p className='font-bold text-sm text-gray-600'>받는 계좌</p>
          <p className='text-gray-800'>
            {receiverBank} {receiverAccountNumber}
          </p>
        </div>
        <div className='flex justify-between items-center mb-10'>
          <p className='font-bold text-sm text-gray-600'>받는분에게 표기</p>
          <input
            type='text'
            placeholder={senderName}
            ref={senderNameRef}
            defaultValue={senderName}
            className='border-b border-gray-400 w-1/2 text-right focus:outline-none'
          />
        </div>
        <div className='flex justify-between items-center mb-4'>
          <p className='font-bold text-sm text-gray-600'>나에게 표기</p>
          <input
            type='text'
            placeholder={receiverName}
            ref={receiverNameRef}
            defaultValue={receiverName}
            className='border-b border-gray-400 w-1/2 text-right focus:outline-none'
          />
        </div>
      </div>
      <Button
        id='241'
        onClick={() => handleClick()}
        className='w-full h-10 text-white text-lg bg-main-green hover:bg-[#479e86]  focus:bg-[#479e86] py-3 rounded mt-6  transition'
      >
        확인
      </Button>
    </div>
  );
}
