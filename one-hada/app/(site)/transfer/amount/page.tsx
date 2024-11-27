'use client';

import { Button } from '@/components/ui/button';
import useApi from '@/hooks/useApi';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getData } from '@/lib/api';
import { Account, User } from '@/lib/datatypes';

interface Params {
  accountId: string | null;
  recipientId: string | null;
  recipientNumber: string | null;
  bankName: string | null;
}

const AMOUNT_BUTTONS = [
  { value: 10000, label: '+1만' },
  { value: 50000, label: '+5만' },
  { value: 100000, label: '+10만' },
  { value: 1000000, label: '+100만' },
];

export default function AmountInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');

  const params: Params = {
    accountId: searchParams.get('account_id'),
    recipientId: searchParams.get('recipient'),
    recipientNumber: searchParams.get('recipient_number'),
    bankName: searchParams.get('bank'),
  };

  const [account, setAccount] = useState<Account | null>();
  const { data: users } = useApi<User>('user');

  const balance: number | string = account?.balance || '정보 확인되지 않음';

  const handleAmountChange = (input: string | number) => {
    setAmount((prev) => {
      const newAmount =
        typeof input === 'string' ? Number(prev + input) : Number(prev) + input;

      return newAmount > Number(balance)
        ? balance.toString()
        : newAmount.toString();
    });
  };

  const handleClick = () => {
    // 추후 수정
    const { accountId, recipientId, bankName, recipientNumber } = params;

    if (!amount) {
      alert('금액을 입력해주세요.');
      return;
    }

    if (accountId && recipientId && recipientNumber && bankName) {
      const searchParams = new URLSearchParams({
        account_id: accountId,
        recipient: recipientId,
        bank: bankName,
        recipient_number: recipientNumber,
        amount,
      });

      router.push(`/transfer/validation?${searchParams.toString()}`);
    }
  };

  //레디스 적용 후 수정 필요
  useEffect(() => {
    if (users && params.recipientId) {
      const recipient = users.find((user) => user.id === params.recipientId);
      if (recipient) {
        setRecipientName(recipient.user_name);
      } else {
        setRecipientName('알 수 없는 사용자');
      }
    }
  }, [users, params.recipientId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.accountId) {
          const data = await getData<Account>('account', params.accountId);
          setAccount(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [params.accountId]);

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='flex flex-col justify-between items-center px-6 pb-6'
    >
      <div className=' w-full rounded-lg mb-2 text-center'>
        <div className='mb-5'>
          <div className='border-b-2 py-2'>
            <span className='font-medium text-lg text-gray-700 mt-2'>
              {recipientName}
            </span>
            <span className='text-gray-400 text-sm'>
              ({params.bankName} {params.recipientNumber})
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
        id='232'
        className='w-full h-10 text-white text-lg bg-main-green  py-3 rounded hover:bg-[#479e86] focus:bg-[#479e86] transition'
        onClick={() => handleClick()}
      >
        다음
      </Button>
    </div>
  );
}
