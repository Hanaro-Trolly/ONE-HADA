'use client';

import AccountCard from '@/components/molecules/AccountCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import dummy from '@/c-dummy/account_d.json'
import useApi from '@/hooks/useApi';

export default function TransferPage() {
  const router = useRouter();

  const { data: accounts, loading, error } = useApi<Account>('account');

  type Account = {
    id: string;
    user_id: string;
    account_number: number;
    balance: number;
    account_type: string;
    bank: string;
    account_name: string;
  };


  const handleClick = (account: Account) => {
    router.push(`/transfer/recipient?account_id=${account.id}`);
  };

  return (
    <div className='container'>
      <h1 className='text-center font-medium text-2xl mb-6'>
        보낼 계좌를 선택해주세요
      </h1>
      <div className='w-full h-[150px]'>
        {/* {todo} 받아오는 map이나 리스트 크기로 button 만들어야함*/}
        {accounts.map((account) => (
          <Button
            key={account.id}
            id='211'
            variant={'ghost'}
            className='w-full h-full'
            onClick={() => handleClick(account)}
          >
            <AccountCard
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
