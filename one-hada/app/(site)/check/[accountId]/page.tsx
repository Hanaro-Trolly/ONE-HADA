'use client';

import AccountHeader from '@/components/check/AccountHeader';
import SearchForm from '@/components/check/SearchForm';
import TransactionList from '@/components/check/TransactionList';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { PulseLoader } from 'react-spinners';
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

  const fetchAccountData = useCallback(async () => {
    const response = await fetchData(`/api/accounts/${accountId}`, {
      method: 'GET',
      token: session?.accessToken,
    });

    if (response.code == 200) {
      setAccount(response.data);
    }
  }, [fetchData, accountId, session?.accessToken]);

  const getTransactions = useCallback(
    async (
      startDate: string,
      endDate: string,
      transferType: string,
      searchWord: string
    ) => {
      const response = await fetchData(`/api/transaction/${accountId}`, {
        method: 'POST',
        token: session?.accessToken,
        body: {
          startDate: startDate,
          endDate: endDate,
          transactionType: transferType,
          keyword: searchWord,
        },
      });
      if (response.code == 200) {
        setTransactions(response.data);
      } else {
        console.log('거래내역 조회 오류');
      }
    },
    [fetchData, accountId, session?.accessToken]
  );

  const changePeriod = async (period: string) => {
    const now = new Date();
    let endDate = now.toISOString();
    let startDate = '';
    switch (period) {
      case '1개월':
        startDate = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
        break;
      case '3개월':
        startDate = new Date(now.setMonth(now.getMonth() - 3)).toISOString();
        break;
      case '6개월':
        startDate = new Date(now.setMonth(now.getMonth() - 6)).toISOString();
        break;
      case '1년':
        startDate = new Date(
          now.setFullYear(now.getFullYear() - 1)
        ).toISOString();
        break;
      default:
        endDate = '';
        break;
    }

    return { startDate, endDate };
  };

  const formatDateToISO = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-');

    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    date.setHours(0, 0, 0, 0);

    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    return utcDate.toISOString();
  };

  const fetchTransactionData = useCallback(async () => {
    const response = await fetchData('/api/redis/get', {
      method: 'POST',
      body: ['period', 'transferType', 'searchWord'],
    });

    if (response.code == 200) {
      const { period, transferType, searchWord } = response.data;

      const periodList: string[] = period.split('부터');
      if (periodList.length === 2) {
        const startDate: string = formatDateToISO(periodList[0].trim());
        const endDate: string = formatDateToISO(periodList[1].trim());
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        if (startDateObj > endDateObj) {
          alert('시작일이 종료일보다 클 수 없습니다');
          return false;
        } else {
          await getTransactions(startDate, endDate, transferType, searchWord);
        }
      } else {
        const { startDate, endDate } = await changePeriod(period);
        await getTransactions(startDate, endDate, transferType, searchWord);
      }

      return { period, transferType, searchWord };
    } else {
      console.log('레디스 정보 가져오기 실패');
      return undefined;
    }
  }, [fetchData, getTransactions]);

  const saveHistory = useCallback(
    async (period: string, transferType: string, searchWord: string) => {
      const response = await fetchData('/api/history', {
        method: 'POST',
        token: session?.accessToken,
        body: {
          historyName: `${period} 동안 ${transferType} 내역 ${searchWord} 조회하기`,
          historyElements: {
            type: 'inquiry',
            senderAccountId: accountId,
            myAccount: account?.accountNumber,
            period: period,
            transferType: transferType,
            searchWord: searchWord,
          },
        },
      });

      if (response.code == 200) {
        console.log('활동내역 저장 성공');
      } else {
        console.error('활동내역 저장 실패');
      }
    },
    [fetchData, account, session?.accessToken, accountId]
  );

  const handleSearch = useCallback(async () => {
    if (!account) return;
    const result = await fetchTransactionData();
    if (result) {
      const { period, transferType, searchWord } = result;
      await saveHistory(period, transferType, searchWord);
    }
  }, [account, saveHistory, fetchTransactionData]);

  const initializeData = useCallback(async () => {
    if (session?.accessToken) {
      await fetchAccountData();
      await fetchTransactionData();
    }
  }, [session?.accessToken, fetchAccountData, fetchTransactionData]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  useEffect(() => {
    if (error) {
      console.error('Fetch 에러 발생:', error);
    }
  }, [error]);

  // 날짜별 거래 내역 그룹화
  const groupedTransactions = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {};
    }

    const groups: Record<string, Transaction[]> = {};

    transactions.forEach((transaction) => {
      if (!transaction?.transactionDateTime) {
        return;
      }

      const date = transaction.transactionDateTime.split('T')[0];

      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
    });

    console.log('Grouped result:', groups);
    return groups;
  }, [transactions]);

  if (!account)
    return (
      <div
        style={{ height: 'calc(100vh - 56px)' }}
        className='flex flex-col justify-center items-center'
      >
        <PulseLoader color='#61B89F'></PulseLoader>
        <div className='mt-4'>계좌 조회 중입니다</div>
      </div>
    );

  return (
    <div className='w-full min-h-screen flex flex-col'>
      <AccountHeader account={account} />
      <SearchForm onSearch={handleSearch} />
      <TransactionList groupedTransactions={groupedTransactions} />
    </div>
  );
}
