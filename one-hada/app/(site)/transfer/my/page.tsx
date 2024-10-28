'use client';

import AccountCard from '@/components/molecules/AccountCard';
import BankIcon from '@/components/molecules/BankIcon';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useApi from '@/hooks/useApi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Account } from '@/lib/datatypes';

export default function TransferPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: accounts } = useApi<Account>('account');
  const userId = session?.user?.id;
  const [selectedAccount, setSelectedAccount] = useState<string>();

  const filteredAccounts =
    accounts?.filter((account) => account.user_id === userId) || [];

  const handleClick = (selectedAccount: string) => {
    router.push(`/transfer/recipient?account_id=${selectedAccount}`);
  };

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='flex flex-col justify-between items-center px-6'
    >
      <div>
        <div className='tossface-icon text-[4rem] pt-10 text-center'>💴</div>
        <h1 className='text-center font-medium text-xl pt-4 mb-10'>
          어떤 계좌로 보낼까요?
        </h1>
        <Select onValueChange={setSelectedAccount}>
          <SelectTrigger
            id='gender'
            className='w-[300px] h-20 text-md flex items-center justify-center space-x-4 data-[placeholder]:text-gray-400 data-[placeholder]:text-center data-[placeholder]:font-light bg-white rounded-xl shadow-none focus:outline-none focus:ring-0 border-0 ring-0'
          >
            <SelectValue
              placeholder='계좌를 선택해주세요'
              className='text-center '
            />
          </SelectTrigger>
          <SelectContent className='focus:outline-none'>
            {filteredAccounts.map((account) => (
              <SelectItem
                key={account.id}
                value={account.id}
                className='bg-white focus:outline-none'
              >
                <div className='w-full p-2'>
                  <div className='w-full rounded-lg flex flex-col'>
                    <div className='flex items-center gap-4'>
                      <BankIcon bankId={account.bank} />
                      <div className='flex flex-col'>
                        <h1 className='font-medium text-left text-lg'>
                          {account.account_type}
                        </h1>
                        <label className='font-light text-gray-500 text-left text-sm'>
                          {`${account.bank} • ${account.account_number}`}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        id='211'
        className='w-full h-10 mx-8 bg-main-green text-white text-lg focus:bg-main-green'
        onClick={() => {
          if (selectedAccount) {
            handleClick(selectedAccount);
          } else {
            alert('계좌를 선택해주세요.');
          }
        }}
      >
        다음
      </Button>
    </div>
  );
}
