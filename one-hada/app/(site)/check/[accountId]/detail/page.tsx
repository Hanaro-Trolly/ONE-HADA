'use client';

import BankIcon from '@/components/molecules/BankIcon';
import { Button } from '@/components/ui/button';
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
        const transactions = await fetchAllData<Transaction>('transaction');
        const searchParams = new URLSearchParams(window.location.search);
        const period = searchParams.get('period');
        const type = searchParams.get('type');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const searchKeyword = searchParams.get('search');

        const filtered = transactions.filter((transaction) => {
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
    <div className='bg-[#DCEFEA] min-h-screen flex flex-col'>
      {accountInfo && (
        <div className=' flex items-center ml-4 mt-4'>
          <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
            <BankIcon bankId={accountInfo.bank} />
          </div>
          <div className=' ml-4 '>
            <h1 className='text-xl font-medium'>{accountInfo.account_name}</h1>
            <h2 className='text-xl font-medium'>
              {accountInfo.account_number}
            </h2>
          </div>
        </div>
      )}
      <div className='bg-[#DCEFEA] flex justify-end mt-8 mb-8'>
        <h1 className=' text-2xl font-semibold mr-8'>
          {accountInfo?.balance.toLocaleString()}원
        </h1>
      </div>
      <div className='bg-white flex justify-center items-center'>
        <h1 className='mt-2 mb-2 text-center flex-1 text-xl'>거래 내역</h1>
        <Button
          onClick={handleSearchClick}
          className='tossface-icon mt-2 mb-2 mr-2 bg-[#61B89F]  rounded-full'
        >
          🔍
        </Button>
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
            <div key={date} className='bg-white'>
              <h2 className='text-lg font-bold'>
                {new Date(date).getMonth() + 1}월 {new Date(date).getDate()}일
              </h2>
              {transaction.map((transaction) => {
                const isWithdrawal =
                  transaction.sender_account_id === accountId;
                const transactionTime = new Date(
                  transaction.transaction_date
                ).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={transaction.id}
                    className='mt-2 ml-8 border-b pb-2 flex justify-between'
                  >
                    <div>
                      <p className='font-bold'>
                        {isWithdrawal
                          ? ` ${transaction.receiver_viewer}`
                          : ` ${transaction.sender_viewer}`}
                      </p>
                      <p className='text-sm text-gray-500'>{transactionTime}</p>
                    </div>
                    <div className='text-right'>
                      <p className={`text-lg font-bold ${isWithdrawal}`}>
                        {isWithdrawal ? '-' : '+'}
                        {transaction.amount.toLocaleString()} 원
                      </p>
                      <p className='text-sm text-gray-500'>
                        {accountInfo?.balance.toLocaleString()} 원
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
      )}
    </div>
  );
}
