'use client';

import AccountHeader from '@/components/check/AccountHeader';
import SearchForm from '@/components/check/SearchForm';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { Account } from '@/lib/datatypes';

export default function AccountDetailPage({
  params,
}: {
  params: { accountId: string };
}) {
  const { accountId } = params;
  const { data: session } = useSession();
  const { fetchData, error } = useFetch<Account>();
  const [account, setAccount] = useState<Account>();
  // const [transactions, setTransactions] = useState<Transaction[]>([]);

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

  // const createHistoryParams = (searchParams: Record<string, string>) => {
  //   return [
  //     accountId,
  //     searchParams.period,
  //     searchParams.startDate,
  //     searchParams.endDate,
  //     searchParams.type,
  //     searchParams.searchKeyword,
  //   ].join('#');
  // };

  const handleSearch = () => {};

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

  if (!account) return <div>계좌 조회 중...</div>;

  return (
    <div className='w-full min-h-screen flex flex-col'>
      <AccountHeader account={account} />

      <SearchForm onSearch={handleSearch} />
    </div>
  );
}
