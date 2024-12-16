'use client';

import AccountCard from '@/components/molecules/AccountCard';
import AccountTypeButton from '@/components/molecules/AccountTypeButton';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { Account } from '@/lib/datatypes';

const ACCOUNT_TYPES = ['입출금', '예적금', '대출', '펀드'] as const;
type AccountType = (typeof ACCOUNT_TYPES)[number];

export default function CheckPage() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const { fetchData, error } = useFetch<Account[]>();

  const [accountData, setAccountData] = useState<Account[]>([]);
  const [selectedType, setSelectedType] = useState<AccountType | null>(null);

  const totalBalance = useMemo(
    () => accountData.reduce((total, account) => total + account.balance, 0),
    [accountData]
  );

  const filteredAccounts = useMemo(
    () =>
      selectedType
        ? accountData.filter((account) => account.accountType === selectedType)
        : accountData,
    [accountData, selectedType]
  );

  const fetchAccounts = useCallback(async () => {
    const response = await fetchData('/api/accounts', {
      method: 'GET',
      token: session?.accessToken,
    });

    if (response.code == 200) {
      setAccountData(response.data);
    }
  }, [fetchData, session?.accessToken]);

  useEffect(() => {
    if (userId) {
      fetchAccounts();
    }
  }, [userId, fetchAccounts]);

  useEffect(() => {
    if (error) {
      console.error('Fetch 에러 발생:', error);
    }
  }, [error]);

  return (
    <div className='p-8'>
      <h1 className='text-center text-xl font-medium'>내 계좌</h1>

      {/* 총 금액 표시 */}
      <div className='bg-[#95D0BF] shadow-md rounded-xl my-6 px-8 py-6 flex items-center justify-between'>
        <span className='text-lg text-white ml-2'>총 금액</span>
        <span className='text-lg text-white mr-2'>
          {totalBalance.toLocaleString()} 원
        </span>
      </div>

      {/* 계좌 유형 필터 버튼 */}
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

      {/* 계좌 카드 리스트 */}
      <div>
        {filteredAccounts.map((account) => (
          <Link key={account.accountId} href={`/check/${account.accountId}`}>
            <AccountCard
              accountId={account.accountId}
              accountNumber={account.accountNumber}
              accountType={account.accountType}
              balance={account.balance}
              bank={account.bank}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
