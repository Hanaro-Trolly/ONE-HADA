'use client';

import AccountCard from '@/components/molecules/AccountCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function TransferPage() {
  const router = useRouter();

  type Account = {
    account_id: string;
    user_id: string;
    account_number: number;
    balance: number;
    account_type: string;
    bank: string;
    account_name: string;
  };

  const accounts: Account[] = [
    {
      account_id: 'A001',
      user_id: 'U001',
      account_number: 1002153876539,
      balance: 1848890,
      account_type: '입출금',
      bank: '하나은행',
      account_name: '하나은행 주거래 통장',
    },
    {
      account_id: 'A002',
      user_id: 'U001',
      account_number: 10021537524301,
      balance: 2358890,
      account_type: '저축',
      bank: '하나은행',
      account_name: '달달 하나 통장',
    },
  ];

  const handleClick = (account: Account) => {
    router.push(`/transfer/recipient?account_id=${account.account_id}`);
  };

  return (
    <div className='container'>
      <h1 className='text-center font-medium text-2xl mb-6'>
        보낼 계좌를 선택해주세요
      </h1>
      <div className='w-[700px] h-[150px]'>
        {/* {todo} 받아오는 map이나 리스트 크기로 button 만들어야함*/}
        {accounts.map((account) => (
          <Button
            key={account.account_id}
            id='211'
            variant={'ghost'}
            className='w-full h-full'
            onClick={() => handleClick(account)}
          >
            <AccountCard
              id={account.account_id}
              name={account.account_name}
              accountType={account.account_type}
              accountNumber={account.account_number}
              balance={account.balance}
              bank={account.bank}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
