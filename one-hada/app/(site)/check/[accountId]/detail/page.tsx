'use client';

import AccountHeader from '@/components/check/AccountHeader';
import TransactionList from '@/components/check/TransactionList';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { getData, fetchAllData } from '@/lib/api';
import { Account, Transaction } from '@/lib/datatypes';

export default function DetailPage({
  params,
}: {
  params: { accountId: string };
}) {
  const { accountId } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accountInfo, setAccountInfo] = useState<Account | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [account, transactionData] = await Promise.all([
          getData<Account>('account', accountId),
          fetchAllData<Transaction>('transaction'),
        ]);

        console.log('Fetched Account Info:', account);
        setAccountInfo(account);
        setTransactions(transactionData);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchData();
  }, [accountId]);

  // Hooks는 조건 없이 호출되어야 합니다.
  const filterParams = useMemo(
    () => ({
      period: searchParams.get('period') || undefined,
      type: searchParams.get('type') || '전체',
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      searchKeyword: searchParams.get('search') || undefined,
    }),
    [searchParams]
  );

  const filteredTransactions = useMemo(() => {
    // accountInfo가 없으면 빈 배열을 반환
    if (!accountInfo) return [];

    return transactions.filter((transaction) => {
      const transactionType =
        transaction.sender_account_id === accountInfo.id
          ? '출금'
          : transaction.receiver_account_id === accountInfo.id
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
      } else if (filterParams.period && filterParams.period !== '전체') {
        const periodMap: Record<string, number> = {
          '1개월': now.setMonth(now.getMonth() - 1),
          '3개월': now.setMonth(now.getMonth() - 3),
          '6개월': now.setMonth(now.getMonth() - 6),
          '1년': now.setFullYear(now.getFullYear() - 1),
        };
        const periodDate = periodMap[filterParams.period];
        if (periodDate) {
          periodCondition = transactionDate >= new Date(periodDate);
        }
      }

      // 키워드 검색
      const searchTarget =
        transaction.sender_account_id === accountInfo.id
          ? transaction.receiver_viewer
          : transaction.sender_viewer;
      const keywordCondition = filterParams.searchKeyword
        ? searchTarget.includes(filterParams.searchKeyword)
        : true;

      return periodCondition && keywordCondition;
    });
  }, [transactions, accountInfo, filterParams]);

  const groupedTransactions = useMemo(() => {
    // accountInfo 또는 filteredTransactions가 없으면 빈 객체 반환
    if (!accountInfo || filteredTransactions.length === 0) return {};

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
  }, [filteredTransactions, accountInfo]);

  // accountInfo가 null 또는 undefined인 경우를 체크
  if (!accountInfo) {
    return <div className='p-4'>거래 내역 로딩 중...</div>;
  }

  return (
    <div className='bg-white min-h-screen flex flex-col'>
      <AccountHeader account={accountInfo} />
      <TransactionList
        groupedTransactions={groupedTransactions}
        accountId={accountId}
        onSearchClick={() => router.push(`/check/${accountInfo.id}`)}
      />
    </div>
  );
}
