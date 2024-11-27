'use client';

import AccountCard from '@/components/molecules/AccountCard';
import AccountTypeButton from '@/components/molecules/AccountTypeButton';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { fetchAllData } from '@/lib/api';
import { Account } from '@/lib/datatypes';

const ACCOUNT_TYPES = ['입출금', '예적금', '대출', '펀드'] as const;
type AccountType = (typeof ACCOUNT_TYPES)[number];

export default function CheckPage() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [selectedType, setSelectedType] = useState<AccountType | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchAccounts = async () => {
      try {
        const data = await fetchAllData<Account>(`account?user_id=${userId}`);
        setAccountData(data);
      } catch (error) {
        console.error('계좌 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchAccounts();
  }, [userId]);

  const totalBalance = useMemo(
    () => accountData.reduce((total, account) => total + account.balance, 0),
    [accountData]
  );

  const filteredAccounts = useMemo(
    () =>
      selectedType
        ? accountData.filter((account) => account.account_type === selectedType)
        : accountData,
    [accountData, selectedType]
  );

  return (
    <div className='p-8'>
      <h1 className='text-center text-xl font-medium'>내 계좌</h1>

      <div className='bg-[#95D0BF] shadow-md rounded-xl my-6 px-8 py-6 flex items-center justify-between'>
        <span className='text-lg text-white ml-2'>총 금액</span>
        <span className='text-lg text-white mr-2'>
          {totalBalance.toLocaleString()} 원
        </span>
      </div>

      <div className='flex justify-center space-x-4 mb-4'>
        {ACCOUNT_TYPES.map((type) => (
          <AccountTypeButton
            key={type}
            account_type={type}
            onClick={() => setSelectedType(type)}
            isSelected={selectedType === type}
          >
            {type}
          </AccountTypeButton>
        ))}
      </div>

      <div>
        {filteredAccounts.map((account) => (
          <Link key={account.id} href={`/check/${account.id}`}>
            <AccountCard
              accountNumber={account.account_number}
              accountType={account.account_type}
              {...account}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
