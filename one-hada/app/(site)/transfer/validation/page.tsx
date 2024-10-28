'use client';

import { Button } from '@/components/ui/button';
import useApi from '@/hooks/useApi';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TransferConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const accountId = searchParams.get('account_id');
  const recipientNumber = searchParams.get('recipient_number');
  const recipientId = searchParams.get('recipient');
  const bankName = searchParams.get('bank');
  const amount = searchParams.get('amount');
  const bankId = searchParams.get('bank');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderLabel, setSenderLabel] = useState('');
  const [recipientLabel, setRecipientLabel] = useState('');

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

  useEffect(() => {
    if (accounts && users && accountId) {
      const account = accounts.find((acc) => acc.id === accountId);
      if (account) {
        const user = users.find((u) => u.id === account.user_id);
        setSenderName(user ? user.user_name : '알 수 없는 사용자');
      }
    }
  }, [accounts, users, accountId]);

  useEffect(() => {
    if (users && recipientId) {
      const recipient = users.find((user) => user.id === recipientId);
      setRecipientName(recipient ? recipient.user_name : '알 수 없는 사용자');
    }
  }, [users, recipientId]);

  const handleClick = () => {
    if (accountId && recipientNumber && bankId && amount) {
      router.push(
        `/transfer/checking?account_id=${accountId}&recipient=${recipientId}&bank=${bankId}&recipient_number=${recipientNumber}&amount=${amount}`
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
              placeholder={senderName}
              value={senderLabel}
              onChange={(e) => setSenderLabel(e.target.value)}
              className='border-b border-gray-400 w-1/2 text-right focus:outline-none'
            />
          </div>
          <div className='flex justify-between items-center mb-4'>
            <p className='font-bold text-sm text-gray-600'>나에게 표기</p>
            <input
              type='text'
              placeholder={recipientName}
              value={recipientLabel}
              onChange={(e) => setRecipientLabel(e.target.value)}
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
