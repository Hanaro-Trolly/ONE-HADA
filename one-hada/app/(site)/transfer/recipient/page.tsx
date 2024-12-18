'use client';

import BankSelector from '@/components/ui/BankSelector';
import { Button } from '@/components/ui/button';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface UserData {
  userId: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  userBirth: string;
  userRegister: string;
  userGender: string;
  userPassword: string;
}

interface ReceiverAccount {
  userName: string;
  accountNumber: string;
  bank: string;
}

export default function RecipientPage() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const accountInputRef = useRef<HTMLInputElement>(null);
  const { fetchData, error } = useFetch<UserData | ReceiverAccount>();

  const handleSubmit = async () => {
    const accountNumber = accountInputRef.current?.value || '';
    const response = await fetchData(`/api/accounts/exist/${accountNumber}`, {
      method: 'GET',
      token: session?.accessToken,
    });

    if (!Boolean(response.status)) {
      return;
    }
    console.log(
      senderName,
      response.data.userName,
      response.data.accountId,
      response.data.bank,
      accountNumber
    );
    // 계좌가 존재하면 레디스에 저장
    const result = await fetchData('/api/redis', {
      method: 'POST',
      body: {
        senderName: senderName,
        receiverName: response.data.userName,
        receiverAccountId: response.data.accountId,
        receiverAccountBank: response.data.bank,
        receiverAccountNumber: accountNumber,
      },
    });

    if (result.code == 200) {
      router.push('/transfer/amount');
    }
  };

  useEffect(() => {
    const getUserName = async () => {
      if (!userId || !session?.accessToken) return;
      const response = await fetchData(`/api/user`, {
        method: 'GET',
        token: session.accessToken,
      });

      if (response.code === 200) {
        setSenderName(response.data.userName);
      }
    };

    getUserName();
  }, [userId, session?.accessToken, fetchData]);

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
      <div>
        <div className='tossface-icon text-[4rem] pt-10 text-center'>✉️</div>
        <h1 className='text-center font-medium text-xl pt-4 mb-10'>
          누구에게 보낼까요?
        </h1>
        <div className=' p-8 rounded-xl mb-6'>
          <BankSelector
            selectedBank={selectedBank}
            onSelect={(bank) => {
              setSelectedBank(bank);
            }}
          />
          <input
            ref={accountInputRef}
            type='text'
            placeholder='계좌번호를 입력해주세요'
            className='w-full bg-transparent mb-4 p-2 border-b-2 rounded focus:ring-0 focus:outline-none text-center focus:bg-transparent'
          />
        </div>
      </div>
      <Button
        id='221'
        className='w-full h-10 text-white text-lg bg-main-green  py-3 rounded mt-6 focus:bg-[#479e86] hover:bg-[#479e86] transition'
        onClick={handleSubmit}
      >
        다음
      </Button>
    </div>
  );
}
