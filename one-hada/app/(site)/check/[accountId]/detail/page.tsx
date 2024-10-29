'use client';

import BankIcon from '@/components/molecules/BankIcon';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getData, fetchAllData } from '@/lib/api';
import { Account } from '@/lib/datatypes';
import { Transaction } from '@/lib/datatypes';

export default function DetailPage({
  params,
}: {
  params: { accountId: string };
}) {
  const [filteredtransaction, setFilteredtransaction] = useState<Transaction[]>(
    []
  );
  const [accountInfo, setAccountInfo] = useState<Account | null>(null);
  const { accountId } = params;
  const router = useRouter();

  useEffect(() => {
    // Fetch account details
    const fetchAccountData = async () => {
      try {
        const account = await getData<Account>('account', accountId);
        if (account) setAccountInfo(account);
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };

    // Fetch transaction data with filtering
    const fetchTransactionData = async () => {
      try {
        const transaction = await fetchAllData<Transaction>('transaction');
        console.log('Fetched transaction:', transaction); // Log transaction to check data structure
        const searchParams = new URLSearchParams(window.location.search);
        const period = searchParams.get('period');
        const type = searchParams.get('type');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const searchKeyword = searchParams.get('search');

        const filtered = transaction.filter((transaction) => {
          let transactionType = '';

          if (transaction.sender_account_id === accountId) {
            transactionType = '출금';
          } else if (transaction.receiver_account_id === accountId) {
            transactionType = '입금';
          } else {
            return false;
          }

          if (type !== '전체' && transactionType !== type) return false;

          const transactionDate = new Date(transaction.transaction_date);
          const now = new Date();
          let periodCondition = true;

          if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            periodCondition =
              transactionDate >= start && transactionDate <= end;
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
            ? transaction.sender_account_id === accountId
              ? transaction.receiver_viewer.includes(searchKeyword)
              : transaction.sender_viewer.includes(searchKeyword)
            : true;

          return periodCondition && keywordCondition;
        });

        setFilteredtransaction(filtered);
      } catch (error) {
        console.error('Error fetching transaction:', error);
      }
    };

    fetchAccountData();
    fetchTransactionData();
  }, [accountId]);

  const groupedtransaction = filteredtransaction.reduce(
    (groups: Record<string, Transaction[]>, transaction) => {
      // Check if transaction_date exists before using toISOString
      const transactionDate = transaction.transaction_date;
      if (!transactionDate) {
        console.error('Transaction date is undefined:', transaction);
        return groups; // Skip this transaction if date is not defined
      }

      const date = new Date(transactionDate).toISOString().split('T')[0]; // Convert to "YYYY-MM-DD" format
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
      router.push(`/check/${accountInfo.id}`);
    }
  };

  return (
    <div>
      {accountInfo && (
        <div className=' bg-[#DCEFEA] flex items-center mt-4'>
          <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
            <BankIcon bankId={accountInfo.bank} />
          </div>
          <div className=' ml-4 '>
            <h1 className='text-xl font-medium'>
              계좌 이름: {accountInfo.account_name}
            </h1>
            <h2 className='text-xl font-medium'>
              계좌 번호: {accountInfo.account_number}
            </h2>
            <h3>{accountInfo.balance.toLocaleString()}원</h3>
          </div>
        </div>
      )}
      <div className='flex justify-center items-center'>
        <h1>거래 내역</h1>
        <button onClick={handleSearchClick} className='ml-2'>
          🔍
        </button>
      </div>
      {Object.keys(groupedtransaction).length === 0 ? (
        <p>거래 내역이 없습니다.</p>
      ) : (
        Object.entries(groupedtransaction)
          .sort(
            ([dateA], [dateB]) =>
              new Date(dateB).getTime() - new Date(dateA).getTime()
          )
          .map(([date, transaction]) => (
            <div key={date} className='mt-4'>
              <h2 className='text-lg font-bold'>{date}</h2>
              {transaction.map((transaction) => (
                <div key={transaction.id} className='mt-2 border-b pb-2'>
                  <p>
                    거래 타입:{' '}
                    {transaction.sender_account_id === accountId
                      ? '출금'
                      : '입금'}
                  </p>
                  <p>금액: {transaction.amount.toLocaleString()} 원</p>
                  <p>
                    {transaction.sender_account_id === accountId
                      ? `받는 사람: ${transaction.receiver_viewer}`
                      : `보낸 사람: ${transaction.sender_viewer}`}
                  </p>
                  <p>
                    거래 날짜:{' '}
                    {new Date(
                      transaction.transaction_date
                    ).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ))
      )}
    </div>
  );
}
