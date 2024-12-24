'use client';

import { Button } from '@/components/ui/button';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface RedisData {
  senderName: string;
  receiverName: string;
  receiverAccountBank: string;
  receiverAccountNumber: string;
  amount: string;
}

export default function Checking() {
  const { fetchData, error } = useFetch<RedisData>();
  const router = useRouter();

  const [senderName, setSenderName] = useState<string>('');
  const [receiverName, setReceiverName] = useState<string>('');
  const [receiverBank, setReceiverBank] = useState<string>('');
  const [receiverAccountNumber, setReceiverAccountNumber] =
    useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const handleClick = async () => {
    const response = await fetchData('/api/redis/delete', {
      method: 'POST',
      body: [
        'senderName',
        'senderAccountId',
        'receiverName',
        'receiverAccountId',
        'receiverAccountBank',
        'receiverAccountNumber',
        'amount',
      ],
    });

    if (response.code == 200) {
      router.push(`/`);
    } else {
      console.error('레디스 정보 삭제 중 오류발생');
    }
  };

  useEffect(() => {
    const getRedis = async () => {
      const response = await fetchData('/api/redis/get', {
        method: 'POST',
        body: [
          'senderName',
          'receiverName',
          'receiverAccountBank',
          'receiverAccountNumber',
          'amount',
        ],
      });

      if (response.code == 200) {
        setSenderName(response.data.senderName);
        setReceiverName(response.data.receiverName);
        setReceiverBank(response.data.receiverAccountBank);
        setReceiverAccountNumber(response.data.receiverAccountNumber);
        setAmount(response.data.amount);
      }
    };

    getRedis();
  }, [fetchData]);

  useEffect(() => {
    if (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
  }, [error]);

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='flex flex-col justify-between items-center px-6 pb-6'
    >
      <div className='relative flex justify-center pt-10'>
        <span className='absolute inline-flex text-[3rem] opacity-75 animate-ping-small '>
          ✅
        </span>
        <span className='relative inline-flex text-[3rem]'>✅</span>
      </div>

      <h2 className='text-center font-medium text-lg mb-12'>
        <span className='text-[#479E86]'>{receiverName}</span>
        <span className='font-medium'> 님께 </span>
        <span className='text-[#479E86]'>
          {Number(amount).toLocaleString()}원을
        </span>
        <span className='block'> 송금했습니다!</span>
      </h2>

      <div className='bg-white  rounded-xl shadow-md p-4 mb-6 w-full'>
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
            value={senderName}
            readOnly
            className='border-b border-gray-400 w-1/2 text-right focus:outline-none'
          />
        </div>
        <div className='flex justify-between items-center mb-4'>
          <p className='font-bold text-sm text-gray-600'>나에게 표기</p>
          <input
            type='text'
            value={receiverName}
            readOnly
            className='border-b border-gray-400 w-1/2 text-right focus:outline-none'
          />
        </div>
      </div>
      <Button
        id='transferButtonEnd'
        onClick={() => handleClick()}
        className='w-full h-10 text-white text-lg bg-main-green hover:bg-[#479e86]  focus:bg-[#479e86] py-3 rounded mt-6  transition'
      >
        확인
      </Button>
    </div>
  );
}
