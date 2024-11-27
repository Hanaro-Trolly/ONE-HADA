'use client';

import BankIcon from '@/components/molecules/BankIcon';
import { Button } from '@/components/ui/button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { getData, fetchAllData } from '@/lib/api';
import { Account, Transaction } from '@/lib/datatypes';

// 트랜잭션 필터링을 위한 인터페이스
interface FilterParams {
  period: string | null;
  type: string;
  startDate: string | null;
  endDate: string | null;
  searchKeyword: string | null;
}

export default function DetailPage({
  params,
}: {
  params: { accountId: string };
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accountInfo, setAccountInfo] = useState<Account | null>(null);
  const { accountId } = params;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [account, transactionData] = await Promise.all([
          getData<Account>('account', accountId),
          fetchAllData<Transaction>('transaction'),
        ]);

        setAccountInfo(account);
        setTransactions(transactionData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [accountId]);

  const [filterParams, setFilterParams] = useState<FilterParams>({
    period: null,
    type: '전체',
    startDate: null,
    endDate: null,
    searchKeyword: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setFilterParams({
        period: searchParams.get('period'),
        type: searchParams.get('type') || '전체',
        startDate: searchParams.get('startDate'),
        endDate: searchParams.get('endDate'),
        searchKeyword: searchParams.get('search'),
      });
    }
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const transactionType =
        transaction.sender_account_id === accountId
          ? '출금'
          : transaction.receiver_account_id === accountId
            ? '입금'
            : null;

      if (!transactionType) return false;
      if (filterParams.type !== '전체' && transactionType !== filterParams.type)
        return false;

      const transactionDate = new Date(transaction.transaction_date);
      const now = new Date();

      // 기간 필터링
      let periodCondition = true;
      if (filterParams.startDate && filterParams.endDate) {
        const start = new Date(filterParams.startDate);
        const end = new Date(filterParams.endDate);
        periodCondition = transactionDate >= start && transactionDate <= end;
      } else if (filterParams.period) {
        const periodMap = {
          '1개월': now.setMonth(now.getMonth() - 1),
          '3개월': now.setMonth(now.getMonth() - 3),
          '6개월': now.setMonth(now.getMonth() - 6),
          '1년': now.setFullYear(now.getFullYear() - 1),
        };
        const periodDate =
          periodMap[filterParams.period as keyof typeof periodMap];
        if (periodDate) {
          periodCondition = transactionDate >= new Date(periodDate);
        }
      }

      // 키워드 검색
      const searchTarget =
        transaction.sender_account_id === accountId
          ? transaction.receiver_viewer
          : transaction.sender_viewer;
      const keywordCondition = filterParams.searchKeyword
        ? searchTarget.includes(filterParams.searchKeyword)
        : true;

      return periodCondition && keywordCondition;
    });
  }, [transactions, accountId, filterParams]);

  const groupedTransactions = useMemo(() => {
    return filteredTransactions.reduce(
      (groups: Record<string, Transaction[]>, transaction) => {
        const date = new Date(transaction.transaction_date)
          .toISOString()
          .split('T')[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
      },
      {}
    );
  }, [filteredTransactions]);

  if (!accountInfo) {
    return <div className='p-4'>거래 내역 로딩중...</div>;
  }

  return (
    <div className='bg-white min-h-screen flex flex-col'>
      <AccountHeader accountInfo={accountInfo} />
      <TransactionList
        groupedTransactions={groupedTransactions}
        accountId={accountId}
        accountInfo={accountInfo}
        onSearchClick={() => router.push(`/check/${accountInfo.id}`)}
      />
    </div>
  );
}

// 계좌 헤더 컴포넌트
function AccountHeader({ accountInfo }: { accountInfo: Account }) {
  return (
    <div className='bg-[#DCEFEA]'>
      <div className='flex items-center ml-4 mt-4 p-4 rounded-lg'>
        <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
          <BankIcon bankId={accountInfo.bank} />
        </div>
        <div className='ml-4'>
          <h1 className='text-xl font-normal'>{accountInfo.account_name}</h1>
          <h2 className='mt-4 text-xl font-normal'>
            {accountInfo.account_number}
          </h2>
        </div>
      </div>
      <div className='flex justify-end mt-4 mb-8'>
        <h1 className='text-2xl font-medium mr-8'>
          {accountInfo.balance.toLocaleString()}원
        </h1>
      </div>
    </div>
  );
}

// 거래 내역 리스트 컴포넌트
function TransactionList({
  groupedTransactions,
  accountId,
  accountInfo,
  onSearchClick,
}: {
  groupedTransactions: Record<string, Transaction[]>;
  accountId: string;
  accountInfo: Account;
  onSearchClick: () => void;
}) {
  return (
    <>
      <div className='bg-white flex justify-center items-center relative'>
        <h1 className='text-center mt-6 mb-6 text-xl font-medium'>거래 내역</h1>
        <Button
          onClick={onSearchClick}
          className='mt-6 mb-6 absolute right-8 tossface-icon bg-[#61B89F] rounded-full hover:bg-[#479e86]'
        >
          <MagnifyingGlassIcon className='text-white size-4' />
        </Button>
      </div>
      {Object.entries(groupedTransactions)
        .sort(
          ([dateA], [dateB]) =>
            new Date(dateB).getTime() - new Date(dateA).getTime()
        )
        .map(([date, transactions]) => (
          <TransactionGroup
            key={date}
            date={date}
            transactions={transactions}
            accountId={accountId}
            accountInfo={accountInfo}
          />
        ))}
    </>
  );
}

// 날짜별 거래 내역 그룹 컴포넌트
function TransactionGroup({
  date,
  transactions,
  accountId,
  accountInfo,
}: {
  date: string;
  transactions: Transaction[];
  accountId: string;
  accountInfo: Account;
}) {
  const dateObj = new Date(date);
  return (
    <div className='bg-white'>
      <h2 className='ml-4 text-sm font-normal'>
        {dateObj.getMonth() + 1}월 {dateObj.getDate()}일
      </h2>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          accountId={accountId}
          accountInfo={accountInfo}
        />
      ))}
    </div>
  );
}

// 개별 거래 내역 아이템 컴포넌트
function TransactionItem({
  transaction,
  accountId,
  accountInfo,
}: {
  transaction: Transaction;
  accountId: string;
  accountInfo: Account;
}) {
  const isWithdrawal = transaction.sender_account_id === accountId;
  const transactionTime = new Date(
    transaction.transaction_date
  ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className='mt-2 ml-8 border-b pb-2 flex justify-between'>
      <div>
        <p className='font-medium'>
          {isWithdrawal
            ? transaction.receiver_viewer
            : transaction.sender_viewer}
        </p>
        <p className='text-sm text-gray-500'>{transactionTime}</p>
      </div>
      <div className='text-right mr-8'>
        <p
          className={`text-lg font-medium ${isWithdrawal ? 'text-red-500' : 'text-blue-500'}`}
        >
          {isWithdrawal ? '-' : '+'} {transaction.amount.toLocaleString()} 원
        </p>
        <p className='text-sm text-gray-500'>
          {accountInfo.balance.toLocaleString()} 원
        </p>
      </div>
    </div>
  );
}
