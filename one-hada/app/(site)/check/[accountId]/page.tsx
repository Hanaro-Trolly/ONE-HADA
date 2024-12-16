'use client';

import AccountHeader from '@/components/check/AccountHeader';
import SearchForm from '@/components/check/SearchForm';
import TransactionList from '@/components/check/TransactionList';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Account, Transaction } from '@/lib/datatypes';

export default function AccountDetailPage({
  params,
}: {
  params: { accountId: string };
}) {
  const { accountId } = params;
  const { data: session } = useSession();
  const { fetchData, error } = useFetch<Account>();
  const [account, setAccount] = useState<Account>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchParams, setSearchParams] = useState<Record<string, string>>({
    type: '전체',
    period: '전체',
    searchKeyword: '',
  });

  const fetchAccountData = useCallback(async () => {
    const response = await fetchData(`/api/accounts/${accountId}`, {
      method: 'GET',
      token: session?.accessToken,
    });

    if (response.code == 200) {
      setAccount(response.data);
    }
  }, [fetchData, accountId, session?.accessToken]);

  useEffect(() => {
    fetchAccountData();
    setTransactions([]);
  }, [fetchAccountData]);

  useEffect(() => {
    if (error) {
      console.error('Fetch 에러 발생:', error);
    }
  }, [error]);

  // const createHistoryName = (searchParams: Record<string, string>) => {
  //   const periodText =
  //     searchParams.startDate && searchParams.endDate
  //       ? `${searchParams.startDate}부터 ${searchParams.endDate}`
  //       : searchParams.period;
  //   return `${periodText} 동안 ${searchParams.type} 내역 ${searchParams.searchKeyword} 조회하기`;
  // };

  const handleSearch = (newSearchParams: Record<string, string>) => {
    setSearchParams(newSearchParams);
  };

  // const handleSearch = async (searchParams: Record<string, string>) => {
  //   if (!account) return;

  // const response = await fetchData('/api/history', {
  //   method: 'POST',
  //   token: session?.accessToken,
  //   body: {

  //   }
  // })

  // const historyData: History = {
  //   user_id: account.userId,
  //   history_name: createHistoryName(searchParams),
  //   history_elements: createHistoryParams(searchParams),
  //   activity_date: new Date(),
  // };

  // try {
  //   await addData<History>('history', historyData);
  //   const queryString = new URLSearchParams(searchParams).toString();
  // } catch (error) {
  //   console.error('조회 기록 저장 오류:', error);
  // }
  // };

  // 필터링된 거래 내역
  const filteredTransactions = useMemo(() => {
    if (!account) return [];

    return transactions.filter((transaction) => {
      const transactionType =
        transaction.senderAccountId === account.accountId
          ? '출금'
          : transaction.receiverAccountId === account.accountId
            ? '입금'
            : null;

      if (!transactionType) return false;
      if (searchParams.type !== '전체' && transactionType !== searchParams.type)
        return false;

      const transactionDate = new Date(transaction.transactionDate);
      const now = new Date();

      // 기간 필터링
      let periodCondition = true;
      if (searchParams.startDate && searchParams.endDate) {
        const start = new Date(searchParams.startDate);
        const end = new Date(searchParams.endDate);
        periodCondition = transactionDate >= start && transactionDate <= end;
      } else if (searchParams.period && searchParams.period !== '전체') {
        const periodMap: Record<string, number> = {
          '1개월': now.setMonth(now.getMonth() - 1),
          '3개월': now.setMonth(now.getMonth() - 3),
          '6개월': now.setMonth(now.getMonth() - 6),
          '1년': now.setFullYear(now.getFullYear() - 1),
        };
        const periodDate = periodMap[searchParams.period];
        if (periodDate) {
          periodCondition = transactionDate >= new Date(periodDate);
        }
      }

      // 키워드 검색 조건
      const searchTarget =
        transaction.senderAccountId === account.accountId
          ? transaction.receiverViewer
          : transaction.senderViewer;
      const keywordCondition = searchParams.searchKeyword
        ? searchTarget.includes(searchParams.searchKeyword)
        : true;

      return periodCondition && keywordCondition;
    });
  }, [transactions, account, searchParams]);

  // 날짜별 거래 내역 그룹화
  const groupedTransactions = useMemo(() => {
    if (!account || filteredTransactions.length === 0) return {};

    return filteredTransactions.reduce(
      (groups: Record<string, Transaction[]>, transaction) => {
        const date = new Date(transaction.transactionDate)
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
  }, [filteredTransactions, account]);

  if (!account) return <div>계좌 조회 중...</div>;

  return (
    <div className='w-full min-h-screen flex flex-col'>
      <AccountHeader account={account} />
      <TransactionList
        groupedTransactions={groupedTransactions}
        accountId={accountId}
      />
      <SearchForm onSearch={handleSearch} />
    </div>
  );
}
