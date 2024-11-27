// hooks/useFetchData.ts
import { useState, useEffect } from 'react';
import { getData, fetchAllData } from '@/lib/api';
import { Account, Transaction } from '@/lib/datatypes';

export function useAccountData(accountId: string) {
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await getData<Account>('account', accountId);
        setAccount(data);
      } catch (error) {
        console.error('계좌 데이터 가져오기 오류:', error);
      }
    };

    fetchAccount();
  }, [accountId]);

  return account;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await fetchAllData<Transaction>('transaction');
        setTransactions(data);
      } catch (error) {
        console.error('거래 내역 가져오기 오류:', error);
      }
    };

    fetchTransactions();
  }, []);

  return transactions;
}
