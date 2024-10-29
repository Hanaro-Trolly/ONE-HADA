'use client';

import { Button } from '@/components/ui/button';
import useApi from '@/hooks/useApi';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
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
  const [userId, setUserId] = useState('');
  const [recipientAccountId, setRecipientAccountId] = useState<string | null>(
    null
  );
  const pathname = usePathname(); // 현재 경로를 가져옴

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
    if (accounts && accountId) {
      const account = accounts.find((acc) => acc.id === accountId);
      if (account) {
        setUserId(account.user_id);
      }
    }
  }, [accounts, accountId]);

  useEffect(() => {
    if (users && userId) {
      const user = users.find((u) => u.id === userId);
      setSenderName(user ? user.user_name : '알 수 없는 사용자');
    }
  }, [users, userId]);

  useEffect(() => {
    if (users && recipientId) {
      const recipient = users.find((user) => user.id === recipientId);
      setRecipientName(recipient ? recipient.user_name : '알 수 없는 사용자');
    }
  }, [users, recipientId]);

  useEffect(() => {
    if (accounts && recipientNumber && bankName) {
      const account = accounts.find(
        (acc) =>
          acc.account_number === Number(recipientNumber) &&
          acc.bank === bankName
      );
      setRecipientAccountId(account ? account.id : null);
    }
  }, [accounts, recipientNumber, bankName]);

  const handleClick = () => {
    if (accountId && recipientNumber && bankId && amount) {
      const queryString = `?account_id=${accountId}&sender_name=${senderName}&recipient_name=${recipientName}&recipient_account_id=${recipientAccountId}&recipient=${recipientId}&bank=${bankId}&recipient_number=${recipientNumber}&amount=${amount}`;
      const fullRoute = `${pathname}${queryString}`;
      const targetRoute = `/transfer/checking${queryString}`;
      router.push(
        // `/transfer/checking?account_id=${accountId}&recipient=${recipientId}&bank=${bankId}&recipient_number=${recipientNumber}&amount=${amount}`
        `/api/auth/checkPassword?userId=${userId}&route=${encodeURIComponent(fullRoute)}&redirectTo=${encodeURIComponent(targetRoute)}`
      );
    } else {
      alert('은행과 계좌번호를 모두 입력해주세요.');
    }
  };

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='flex flex-col justify-between items-center px-6'
    >
      <div className='tossface-icon text-[4rem] pt-10 text-center'>❔</div>
      <h2 className='text-center font-medium text-xl mb-12'>
        <span className='text-[#479E86]'>{recipientName}</span>
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
      <Button
        id='241'
        onClick={() => handleClick()}
        className='w-full text-white text-lg bg-main-green hover:bg-[#479e86]  focus:bg-[#479e86] py-3 rounded mt-6  transition'
      >
        확인
      </Button>
    </div>
  );
}
