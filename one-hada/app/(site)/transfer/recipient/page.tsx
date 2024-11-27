'use client';

import BankSelector from '@/components/ui/BankSelector';
import { Button } from '@/components/ui/button';
import useApi from '@/hooks/useApi';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Account } from '@/lib/datatypes';

export default function RecipientPage({
  searchParams,
}: {
  searchParams: { account_id: string };
}) {
  const router = useRouter();
  const { account_id } = searchParams;
  const { data: recipientAccounts } = useApi<Account>('account');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const accountInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const accountNumber = accountInputRef.current?.value || '';
    const matchingAccount = recipientAccounts?.find(
      (account) =>
        account.account_number.toString() === accountNumber &&
        account.bank === selectedBank
    );

    if (!matchingAccount) {
      alert('일치하는 계좌가 없습니다.');
      return;
    }

    // 레디스, api 적용!!!
    const searchParams = new URLSearchParams({
      account_id,
      recipient: matchingAccount.user_id,
      bank: matchingAccount.bank,
      recipient_number: matchingAccount.account_number.toString(),
    });

    router.push(`/transfer/amount?${searchParams.toString()}`);
  };

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
            onSelect={(bank) => setSelectedBank(bank)}
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
