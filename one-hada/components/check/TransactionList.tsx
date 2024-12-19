import { useEffect } from 'react';
import { Transaction } from '@/lib/datatypes';
import TransactionGroup from './TransactionGroup';

interface TransactionListProps {
  groupedTransactions: Record<string, Transaction[]>;
}

export default function TransactionList({
  groupedTransactions,
}: TransactionListProps) {
  useEffect(() => {}, [groupedTransactions]);

  if (Object.keys(groupedTransactions).length === 0) {
    return (
      <div className='flex-grow bg-white flex justify-center items-center'>
        <p className='text-gray-500'>거래내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='flex-grow bg-white'>
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
          />
        ))}
    </div>
  );
}
