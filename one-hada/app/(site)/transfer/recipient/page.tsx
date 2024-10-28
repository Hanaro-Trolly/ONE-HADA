'use client';

import dummy from '@/c-dummy/account_d.json';
import AccountCard from '@/components/molecules/AccountCard';
import BankOption from '@/components/molecules/BankOption';
import { Button } from '@/components/ui/button';
import useApi from '@/hooks/useApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RecipientPage({
  searchParams,
}: {
  searchParams: { account_id: string };
}) {
  const router = useRouter();
  // const { data: session } = useSession(); // 세션에서 sessionId 가져오기
  // const sessionId = session?.user?.id; // sessionId를 세션에서 가져온다고 가정

  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isBankOptionsOpen, setIsBankOptionsOpen] = useState(false);

  const { account_id } = searchParams;

  const handleBankChange = (bank: string) => {
    setSelectedBank(bank);
    setIsBankOptionsOpen(false);
  };

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountNumber(event.target.value);
  };

  const handleClick = () => {
    const matchingAccount = recipientAccounts.find(
      (account) =>
        account.account_number.toString() === accountNumber &&
        account.bank === selectedBank
    );
    console.log(selectedBank);
    console.log('d', recipientAccounts);

    if (matchingAccount) {
      router.push(
        `/transfer/amount?account_id=${account_id}&recipient=${matchingAccount.user_id}&bank=${matchingAccount.bank}&recipient_number=${matchingAccount.account_number}`
      );
    } else {
      alert('일치하는 계좌가 없습니다.');
    }
  };

  const handleClick2 = (account: Account) => {
    router.push(
      `/transfer/amount?account_id=${account_id}&recipient=${account.user_id}&bank=${account.bank}&recipient_number=${account.account_number}`
    );
  };

  type Account = {
    id: string;
    user_id: string;
    account_number: number;
    balance: number;
    account_type: string;
    bank: string;
    account_name: string;
  };

  type Bank = {
    bank_id: string;
    bank_name: string;
    bank_code: string;
    logo_url: string;
  };

  const {
    data: recipientAccounts,
    loading,
    error,
  } = useApi<Account>('account');
  const banks: Bank[] = dummy.banks;

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-center font-bold text-2xl mb-6'>
        누구에게 보낼까요?
      </h1>
      <div className='bg-gray-100 p-4 rounded-lg mb-6'>
        <button
          onClick={() => setIsBankOptionsOpen(!isBankOptionsOpen)}
          className='w-full mb-4 p-2 border border-gray-300 rounded'
        >
          {selectedBank
            ? banks.find((bank) => bank.bank_name === selectedBank)?.bank_name
            : '은행을 선택해주세요'}
        </button>

        {isBankOptionsOpen && (
          <div className='absolute bg-white border border-gray-300 rounded shadow-lg p-4 mt-2 w-80'>
            <div className='grid grid-cols-3 gap-2 mb-6 w-full'>
              {banks.map((bank) => (
                <BankOption
                  key={bank.bank_id}
                  bankName={bank.bank_name}
                  selected={selectedBank === bank.bank_id}
                  onClick={handleBankChange}
                />
              ))}
            </div>
          </div>
        )}

        <input
          type='text'
          placeholder='계좌번호를 입력해주세요'
          value={accountNumber}
          onChange={handleAccountNumberChange}
          className='w-full mb-4 p-2 border border-gray-300 rounded'
        />

        <Button
          id='223'
          className='text-white bg-[#61B89F] font-bold py-3 rounded mt-6 hover:bg-[#377b68] transition'
          onClick={() => handleClick()}
        >
          다음
        </Button>
      </div>

      <div className='flex flex-col gap-4'>
        {recipientAccounts.map((account) => (
          <Button
            key={account.id}
            id='222'
            variant={'ghost'}
            className='w-full h-full'
            onClick={() => handleClick2(account)}
          >
            <AccountCard
              key={account.id}
              id={account.id}
              name={account.account_name}
              accountType={account.account_type}
              accountNumber={account.account_number}
              balance={account.balance}
              bank={account.bank}
              user_id={account.user_id}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
