import { Transaction } from '@/lib/datatypes';
import TransactionItem from './TransactionItem';

interface TransactionGroupProps {
  date: string;
  transactions: Transaction[];
  accountId: string;
}

export default function TransactionGroup({
  date,
  transactions,
  accountId,
}: TransactionGroupProps) {
  const dateObj = new Date(date);

  return (
    <div className='bg-white'>
      {/* 날짜 표시 */}
      <h2 className='ml-4 text-sm font-normal'>
        {dateObj.getMonth() + 1}월 {dateObj.getDate()}일
      </h2>

      {/* 거래 아이템 리스트 */}
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          accountId={accountId}
        />
      ))}
    </div>
  );
}
