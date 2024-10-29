'use client';

import PasswordKeypad from '@/components/ui/PasswordKeypad';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getData, addData } from '@/lib/api';
import { User } from '@/lib/datatypes';

export default function CheckPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get('userId');
  let route = searchParams.get('route');
  const redirectTo = searchParams.get('redirectTo');
  const recipientNumber = searchParams.get('recipient');
  const [userPassword, setUserPassword] = useState<string[] | null>(null);

  const getUserPassword = useCallback(async () => {
    try {
      if (userId) {
        const userData = await getData<User>('user', userId);
        setUserPassword(userData?.simple_password || null);
      }
    } catch (error) {
      console.error('Error fetching user password:', error);
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserPassword();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, recipientNumber, getUserPassword]);

  const handleTransactionAndHistory = async (route: string) => {
    const queryParams = new URLSearchParams(route.split('?')[1]);
    const queryCount = Array.from(queryParams.keys()).length;

    if (queryCount === 8) {
      console.log('Inside handleTransactionAndHistory');
      const transactionId = String(Date.now());
      const newTransaction = {
        id: transactionId,
        sender_account_id: queryParams.get('account_id') || '',
        receiver_account_id: queryParams.get('recipient_account_id'),
        amount: Number(queryParams.get('amount')) || 0,
        sender_viewer: queryParams.get('sender_name') || '',
        receiver_viewer: queryParams.get('recipient_name') || '',
      };

      try {
        await addData('transaction', newTransaction);

        const newHistory = {
          id: transactionId,
          user_id: userId || '',
          history_name: `${queryParams.get('recipient_name') || '수신자'}님께 ${
            queryParams.get('amount') || 0
          }원 송금`,
          activity_date: new Date().toISOString(),
          is_Shortcut: false,
          history_type: 'transaction',
          history_params: `${queryParams.get('account_id')}#${queryParams.get('recipient_account_id')}#${queryParams.get(
            'amount'
          )}`,
        };

        await addData('history', newHistory);
      } catch (error) {
        console.error('Error adding transaction or history:', error);
      }
    }
  };

  if (route) {
    route = decodeURIComponent(route);
  }

  const handleSubmit = (password: string[]) => {
    if (password.length !== 6) {
      alert('6자리 숫자를 모두 입력해주세요.');
      return;
    }

    if (userPassword?.join('') === password.join('')) {
      alert('인증에 성공하였습니다');
      handleTransactionAndHistory(route || '');
      router.push(redirectTo || route || '/');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className='py-8 px-10 w-full flex flex-col items-center justify-center'>
      <h2 className='text-xl font-medium text-[#635666] text-center mb-6'>
        간편 비밀번호를 입력하세요
      </h2>
      <PasswordKeypad hadleSubmit={handleSubmit}></PasswordKeypad>
    </div>
  );
}
