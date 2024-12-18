import { Transaction } from '@/lib/datatypes';
import TransactionItem from './TransactionItem';

interface TransactionGroupProps {
  date: string;
  transactions: Transaction[];
}

export default function TransactionGroup({
  date,
  transactions,
}: TransactionGroupProps) {
  const dateObj = new Date(date);

  const sortedTransactions = [...transactions].sort(
    (a, b) =>
      new Date(b.transactionDateTime).getTime() -
      new Date(a.transactionDateTime).getTime()
  );

  return (
    <div className='bg-white'>
      {/* 날짜 표시 */}
      <h2 className='ml-4 text-sm font-normal mt-2'>
        {dateObj.getMonth() + 1}월 {dateObj.getDate()}일
      </h2>

      {/* 거래 아이템 리스트 */}
      {sortedTransactions.map((transaction) => (
        <TransactionItem
          key={transaction.transactionId}
          transaction={transaction}
        />
      ))}
    </div>
  );
}
