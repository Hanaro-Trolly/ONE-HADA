'use client';

import dummi from '@/c-dummy/account_d.json';
import dummy from '@/c-dummy/transaction_d.json';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Transaction = {
  transaction_id: string;
  sender_account_id: string;
  receiver_account_id: string;
  amount: number;
  sender_view: string;
  receiver_view: string;
  transaction_date: string;
};

type Account = {
  account_id: string;
  account_name: string;
  account_number: number;
  balance: number;
};

export default function DetailPage({
  params,
}: {
  params: { accountId: string };
}) {
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [accountInfo, setAccountInfo] = useState<Account | null>(null);
  const { accountId } = params;
  const router = useRouter();

  useEffect(() => {
    const account = dummi.accounts.find(
      (acc: Account) => acc.account_id === accountId
    );
    if (account) {
      setAccountInfo(account);
    }

    const searchParams = new URLSearchParams(window.location.search);
    const period = searchParams.get('period');
    const type = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const searchKeyword = searchParams.get('search');

    if ((period || (startDate && endDate)) && type) {
      const transactions = dummy.transactions.filter((transaction) => {
        let transactionType = '';

        if (transaction.sender_account_id === accountId) {
          transactionType = '출금';
        } else if (transaction.receiver_account_id === accountId) {
          transactionType = '입금';
        } else {
          return false;
        }

        if (type !== '전체' && transactionType !== type) return false;

        const now = new Date();
        const transactionDate = new Date(transaction.transaction_date);
        let periodCondition = true;

        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          periodCondition = transactionDate >= start && transactionDate <= end;
        } else {
          switch (period) {
            case '1개월':
              periodCondition =
                transactionDate >= new Date(now.setMonth(now.getMonth() - 1));
              break;
            case '3개월':
              periodCondition =
                transactionDate >= new Date(now.setMonth(now.getMonth() - 3));
              break;
            case '6개월':
              periodCondition =
                transactionDate >= new Date(now.setMonth(now.getMonth() - 6));
              break;
            case '1년':
              periodCondition =
                transactionDate >=
                new Date(now.setFullYear(now.getFullYear() - 1));
              break;
            default:
              periodCondition = true;
              break;
          }
        }

        const keywordCondition = searchKeyword
          ? transaction.sender_view.includes(searchKeyword) ||
            transaction.receiver_view.includes(searchKeyword)
          : true;

        return periodCondition && keywordCondition;
      });

      setFilteredTransactions(transactions);
    }
  }, [accountId]);

  const groupedTransactions = filteredTransactions.reduce(
    (groups: Record<string, Transaction[]>, transaction) => {
      const date = transaction.transaction_date.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {}
  );

  const handleSearchClick = () => {
    if (accountInfo) {
      router.push(`/check/${accountInfo.account_id}`);
    }
  };

  return (
    <div>
      {accountInfo && (
        <div className='bg-white shadow-md rounded-lg w-full h-full flex items-start justify-between flex-col'>
          <h1>계좌 이름: {accountInfo.account_name}</h1>
          <h2>계좌 번호: {accountInfo.account_number}</h2>
          <h3>{accountInfo.balance.toLocaleString()}원</h3>
        </div>
      )}
      <div className='flex justify-center items-center '>
        <h1>거래 내역</h1>
        <button onClick={handleSearchClick} className='ml-2'>
          🔍
        </button>
      </div>

      {/* {Object.keys(groupedTransactions).length === 0 ? (
        <p>거래 내역이 없습니다.</p>
      ) : (
        Object.entries(groupedTransactions).map(([date, transactions]) => (
          <div key={date} className='mt-4'>
            <h2 className='text-lg font-bold'>{date}</h2>
            {transactions.map((transaction) => (
              <div
                key={transaction.transaction_id}
                className='mt-2 border-b pb-2'
              > */}
      {Object.keys(groupedTransactions).length === 0 ? (
        <p>거래 내역이 없습니다.</p>
      ) : (
        Object.entries(groupedTransactions)
          .sort(
            ([dateA], [dateB]) =>
              new Date(dateB).getTime() - new Date(dateA).getTime()
          )
          .map(([date, transactions]) => (
            <div key={date} className='mt-4'>
              <h2 className='text-lg font-bold'>{date}</h2>
              {transactions.map((transaction) => (
                <div
                  key={transaction.transaction_id}
                  className='mt-2 border-b pb-2'
                >
                  <p>
                    거래 타입:{' '}
                    {transaction.sender_account_id === accountId
                      ? '출금'
                      : '입금'}
                  </p>
                  <p>금액: {transaction.amount.toLocaleString()} 원</p>
                  <p>
                    {transaction.sender_account_id === accountId
                      ? `받는 사람: ${transaction.receiver_view}`
                      : `보낸 사람: ${transaction.sender_view}`}
                  </p>
                  <p>거래 날짜: {transaction.transaction_date}</p>
                </div>
              ))}
            </div>
          ))
      )}
    </div>
  );
}
