'use client';

// API 호출 함수 가져오기
import AccountCard from '@/components/molecules/AccountCard';
import AccountTypeButton from '@/components/molecules/AccountTypeButton';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchAllData } from '@/lib/api';
import { Account } from '@/lib/datatypes';

export default function CheckPage() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    // API에서 account 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const data = await fetchAllData<Account>(`account?user_id=${userId}`); // account는 API 리소스 경로
        setAccountData(data);
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const totalBalance = accountData.reduce(
    (total, account) => total + account.balance,
    0
  );

  const filteredaccount = selectedType
    ? accountData.filter((account) => account.account_type === selectedType)
    : accountData;
  console.log(filteredaccount);
  return (
    <div className='p-8'>
      <h1 className='text-center text-xl font-medium '>내 계좌</h1>
      <div className='bg-[#95D0BF] shadow-md rounded-xl my-6 px-8 py-6 flex items-center justify-between'>
        <span className='text-lg text-white ml-2'>총 금액</span>
        <span className='text-lg text-white mr-2'>
          {totalBalance.toLocaleString()} 원
        </span>
      </div>

      <div className='flex justify-center space-x-4 mb-4'>
        <AccountTypeButton
          account_type='입출금'
          onClick={() => setSelectedType('입출금')}
        >
          입출금
        </AccountTypeButton>
        <AccountTypeButton
          account_type='예적금'
          onClick={() => setSelectedType('예적금')}
        >
          예적금
        </AccountTypeButton>
        <AccountTypeButton
          account_type='대출'
          onClick={() => setSelectedType('대출')}
        >
          대출
        </AccountTypeButton>
        <AccountTypeButton
          account_type='펀드'
          onClick={() => setSelectedType('펀드')}
        >
          펀드
        </AccountTypeButton>
      </div>

      <div>
        {filteredaccount.map((account) => (
          <Link href={`/check/${account.id}`}>
            <div>
              <AccountCard
                id={account.id}
                user_id={account.user_id}
                accountNumber={account.account_number}
                balance={account.balance}
                accountType={account.account_type}
                bank={account.bank}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
