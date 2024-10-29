'use client';

import TypeButton from '@/components/molecules/TypeButton';
import { Button } from '@/components/ui/button';
import useApi from '@/hooks/useApi';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AmountInput() {
  const [amount, setAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const accountId = searchParams.get('account_id');
  const recipientId = searchParams.get('recipient');
  const recipientNumber = searchParams.get('recipient_number');
  const bankName = searchParams.get('bank');

  type Account = {
    id: string;
    user_id: string;
    account_number: number;
    balance: number;
    account_type: string;
    bank: string;
    account_name: string;
  };

  type User = {
    id: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    user_address: string;
    user_birth: string;
    user_register: string;
    user_google: string;
    user_kakao: string;
    user_naver: string;
  };

  const { data: accounts } = useApi<Account>('account');
  const { data: users } = useApi<User>('user');

  const balance: number | string =
    accounts.find((account) => account.id === accountId)?.balance ||
    '정보 확인되지 않음';

  const handleNumberClick = (num: string) => {
    setAmount((prev) => {
      const newAmount = String(prev) + num;
      return Number(newAmount) > Number(balance)
        ? balance.toString()
        : newAmount.toString();
    });
  };

  const handleSpecialAmount = (value: number) => {
    setAmount((prev) => {
      const newAmount = Number(prev) + value;
      return newAmount > Number(balance)
        ? balance.toString()
        : newAmount.toString();
    });
  };

  const handleBackspace = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const handleMaxAmount = () => {
    setAmount(balance.toString());
  };

  const handleClick = () => {
    if (accountId && recipientId && recipientNumber && bankName && amount) {
      router.push(
        `/transfer/validation?account_id=${accountId}&recipient=${recipientId}&bank=${bankName}&recipient_number=${recipientNumber}&amount=${amount}`
      );
    } else {
      alert('은행과 계좌번호를 모두 입력해주세요.');
    }
  };
  useEffect(() => {
    if (users && recipientId) {
      const recipient = users.find((user) => user.id === recipientId);
      if (recipient) {
        setRecipientName(recipient.user_name);
      } else {
        setRecipientName('알 수 없는 사용자');
      }
    }
  }, [users, recipientId]);


  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='flex flex-col justify-between items-center px-6'
    >
      <div className=' w-full rounded-lg mb-2 text-center'>
        <div className='mb-5'>
          <div className='border-b-2 py-2'>
            <span className='font-medium text-lg text-gray-700 mt-2'>
              {recipientName}
            </span>
            <span className='text-gray-400 text-sm'>
              ({bankName} {recipientNumber})
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
          <TypeButton
            onClick={() => handleSpecialAmount(10000)}
            button_type={'231'}
            className='bg-[#DCEFEA] text-[#635666] flex-1 p-2 rounded-[2rem] focus:bg-[#95D0BF]'
          >
            +1만
          </TypeButton>
          <TypeButton
            onClick={() => handleSpecialAmount(50000)}
            button_type={'231'}
            className='bg-[#DCEFEA] text-[#635666] flex-1 p-2 rounded-[2rem] focus:bg-[#95D0BF]'
          >
            +5만
          </TypeButton>
          <TypeButton
            onClick={() => handleSpecialAmount(100000)}
            button_type={'231'}
            className='bg-[#DCEFEA] text-[#635666] flex-1 p-2 rounded-[2rem] focus:bg-[#95D0BF]'
          >
            +10만
          </TypeButton>
          <TypeButton
            onClick={() => handleSpecialAmount(1000000)}
            button_type={'231'}
            className='bg-[#DCEFEA] text-[#635666] flex-1 p-2 rounded-[2rem] focus:bg-[#95D0BF]'
          >
            +100만
          </TypeButton>
          <TypeButton
            onClick={handleMaxAmount}
            button_type={'231'}
            className='bg-[#DCEFEA] text-[#635666] flex-1 p-2 rounded-[2rem] focus:bg-[#95D0BF]'
          >
            전액
          </TypeButton>
        </div>

        {/* 숫자 키패드 */}
        <div className='grid grid-cols-3 gap-2 '>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '00', 0].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className='p-4 bg-gray-100 rounded text-xl shadow'
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleBackspace}
            className='p-4 bg-gray-100 rounded text-xl shadow'
          >
            ⌫
          </button>
        </div>
      </div>
      <Button
        id='231'
        className='w-full text-white text-lg bg-main-green  py-3 rounded hover:bg-[#479e86] focus:bg-[#479e86] transition'
        onClick={() => handleClick()}
      >
        다음
      </Button>
    </div>
  );
}
