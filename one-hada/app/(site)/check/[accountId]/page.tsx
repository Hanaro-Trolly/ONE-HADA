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
    period: '전체',
    type: '전체',
    startDate: '',
    endDate: '',
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

  const fetchTransactionData = useCallback(async () => {
    const now = new Date();
    let endDate = now.toDateString();
    let startDate = '';

    switch (searchParams.period) {
      case '1개월':
        startDate = new Date(now.setMonth(now.getMonth() - 1)).toDateString();
        break;

      case '3개월':
        startDate = new Date(now.setMonth(now.getMonth() - 3)).toDateString();
        break;

      case '6개월':
        startDate = new Date(now.setMonth(now.getMonth() - 6)).toDateString();
        break;

      case '1년':
        startDate = new Date(
          now.setFullYear(now.getFullYear() - 1)
        ).toDateString();
        break;

      default:
        endDate = searchParams.endDate;
        startDate = searchParams.startDate;
        break;
    }

    const response = await fetchData(`/api/transaction/${accountId}`, {
      method: 'POST',
      token: session?.accessToken,
      body: {
        startDate: startDate,
        endDate: endDate,
        transactionType: searchParams.type,
        keword: searchParams.searchKeyword,
      },
    });

    if (response.code == 200) {
      setTransactions(response.data);
    } else '거래내역 조회 오류';
  }, []);

  useEffect(() => {
    fetchAccountData();
    fetchTransactionData();
  }, [fetchAccountData, fetchTransactionData]);

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

  // 날짜별 거래 내역 그룹화
  const groupedTransactions = useMemo(() => {
    if (!account || !transactions) return {};

    return transactions.reduce(
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
  }, [transactions, account]);

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
