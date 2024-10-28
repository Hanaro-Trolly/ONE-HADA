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
      return Number(newAmount) > Number(balance) ? balance.toString() : newAmount.toString();
    });
  };

  const handleSpecialAmount = (value: number) => {
    setAmount((prev) => {
      const newAmount = Number(prev) + value;
      return newAmount > Number(balance) ? balance.toString() : newAmount.toString();
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
    <div className='container mx-auto p-6'>
      <div className='bg-gray-100 p-6 rounded-lg mb-6 text-center'>
        <div className='mb-6'>
          <p className='font-bold text-xl mb-2'>{recipientName}</p>
          <p className='text-gray-400'>
            {bankName} {recipientNumber}
          </p>
          <hr className='border-t border-gray-600 mx-auto w-3/4' />
          <p
            className={`text-xl mb-2 mt-8 ${amount ? 'font-bold text-black' : 'font-bold text-gray-400'}`}
          >
            {amount ? (
              <span>{`${Number(amount).toLocaleString()} 원`}</span>
            ) : (
              <span>얼마를 보낼까요?</span>
            )}
          </p>
        </div>

        <div className='bg-[#61B89F] hover:bg-[#377b68] text-white p-4 rounded-lg shadow mb-4'>
          <div className='flex justify-between items-center'>
            <span className='font-bold'>내 계좌</span>
            <span className='font-bold'>
              {Number(balance).toLocaleString()} 원
            </span>
          </div>
        </div>
        <div className='flex justify-between mb-4 space-x-2'>
          <TypeButton
            onClick={() => handleSpecialAmount(10000)}
            button_type={'231'}
          >
            +1만
          </TypeButton>
          <TypeButton
            onClick={() => handleSpecialAmount(50000)}
            button_type={'231'}
          >
            +5만
          </TypeButton>
          <TypeButton
            onClick={() => handleSpecialAmount(100000)}
            button_type={'231'}
          >
            +10만
          </TypeButton>
          <TypeButton
            onClick={() => handleSpecialAmount(1000000)}
            button_type={'231'}
          >
            +100만
          </TypeButton>
          <TypeButton onClick={handleMaxAmount} button_type={'231'}>
            전액
          </TypeButton>
        </div>

        {/* 숫자 키패드 */}
        <div className='grid grid-cols-3 gap-2 mb-6'>
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

        <Button
          id='231'
          className='w-full  text-white bg-[#61B89F] font-bold py-3 rounded mt-6 hover:bg-[#377b68] transition'
          onClick={() => handleClick()}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
