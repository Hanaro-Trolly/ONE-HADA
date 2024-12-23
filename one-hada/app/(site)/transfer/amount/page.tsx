'use client';

import { Button } from '@/components/ui/button';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Account } from '@/lib/datatypes';

interface SetRedisData {
  key: string;
  value: string;
}

interface GetRedisData {
  senderAccountId: string;
  receiverName: string;
  receiverAccountBank: string;
  receiverAccountNumber: string;
}

const AMOUNT_BUTTONS = [
  { value: 10000, label: '+1만' },
  { value: 50000, label: '+5만' },
  { value: 100000, label: '+10만' },
  { value: 1000000, label: '+100만' },
];

export default function AmountInput() {
  const { fetchData, error } = useFetch<
    Account | SetRedisData | GetRedisData
  >();
  const { data: session } = useSession();
  const router = useRouter();
  const [amount, setAmount] = useState<string>('0');
  const [receiverName, setReceiverName] = useState<string>('');
  const [receiverBank, setReceiverBank] = useState<string>('');
  const [receiverAccountNumber, setReceiverAccountNumber] =
    useState<string>('');
  const [balance, setBalance] = useState<number>(0);

  const handleAmountChange = (input: string | number) => {
    setAmount((prev) => {
      const newAmount =
        typeof input === 'string' ? Number(prev + input) : Number(prev) + input;

      return newAmount > Number(balance)
        ? balance.toString()
        : newAmount.toString();
    });
  };

  const handleClick = async () => {
    if (!amount || Number(amount) <= 0) {
      alert('금액을 입력해주세요.');
      return;
    }

    const response = await fetchData(`/api/redis`, {
      method: 'POST',
      body: {
        amount: amount,
      },
    });

    if (response.code == 200) {
      router.push(`/transfer/validation`);
    }
  };

  useEffect(() => {
    const getRedisValues = async () => {
      const response = await fetchData('/api/redis/get', {
        method: 'POST',
        body: [
          'senderAccountId',
          'receiverName',
          'receiverAccountBank',
          'receiverAccountNumber',
        ],
      });

      if (response.code == 200) {
        const accountId = response.data.senderAccountId;
        setReceiverName(response.data.receiverName as string);
        setReceiverBank(response.data.receiverAccountBank as string);
        setReceiverAccountNumber(response.data.receiverAccountNumber as string);

        if (accountId && session?.accessToken) {
          const response = await fetchData(`/api/accounts/${accountId}`, {
            method: 'GET',
            token: session.accessToken,
          });

          if (response && 'data' in response) {
            setBalance(response.data.balance);
          }
        }
      }
    };

    getRedisValues();
  }, [session, fetchData]);

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
      <div className=' w-full rounded-lg mb-2 text-center'>
        <div className='mb-5'>
          <div className='border-b-2 py-2'>
            <span className='font-medium text-lg text-gray-700 mt-2'>
              {receiverName}
            </span>
            <span className='text-gray-400 text-sm'>
              ({receiverBank} {receiverAccountNumber})
            </span>
          </div>
          <p
            className={`text-xl  mt-4 ${amount ? 'font-medium text-black' : 'font-medium text-gray-400'}`}
          >
            {amount ? (
              <span>{`${Number(amount).toLocaleString()} 원`}</span>
            ) : (
              <span>얼마를 보낼까요?</span>
            )}
          </p>
        </div>

        <div className='bg-[#95D0BF] text-white p-4 rounded-lg shadow mb-4'>
          <div className='flex justify-between items-center'>
            <span className='font-bold'>내 계좌</span>
            <span className='font-bold'>
              {Number(balance).toLocaleString()} 원
            </span>
          </div>
        </div>
        <div className='flex justify-end mb-4 space-x-2'>
          {AMOUNT_BUTTONS.map(({ value, label }) => (
            <Button
              key={value}
              id='231'
              onClick={() => handleAmountChange(value)}
              className='bg-[#DCEFEA] text-[#635666] flex-1 p-2 rounded-[2rem] focus:bg-[#95D0BF] hover:bg-[#95D0BF] hover:text-white'
            >
              {label}
            </Button>
          ))}
          <Button
            id='231'
            onClick={() => setAmount(balance.toString())}
            className='bg-[#DCEFEA] text-[#635666] flex-1 p-2 rounded-[2rem] focus:bg-[#95D0BF] hover:bg-[#95D0BF] hover:text-white'
          >
            전액
          </Button>
        </div>

        {/* 숫자 키패드 */}
        <div className='grid grid-cols-3 gap-2 '>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '00', 0].map((num) => (
            <button
              key={num}
              onClick={() => handleAmountChange(num.toString())}
              className='p-4 bg-gray-100 rounded text-xl shadow'
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setAmount((prev) => prev.slice(0, -1))}
            className='p-4 bg-gray-100 rounded text-xl shadow'
          >
            ⌫
          </button>
        </div>
      </div>
      <Button
        id='transferButtonToValidation'
        className='w-full h-10 text-white text-lg bg-main-green  py-3 rounded hover:bg-[#479e86] focus:bg-[#479e86] transition'
        onClick={() => handleClick()}
      >
        다음
      </Button>
    </div>
  );
}
