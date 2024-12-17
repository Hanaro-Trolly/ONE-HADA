import { Transaction } from '@/lib/datatypes';
import TransactionGroup from './TransactionGroup';

interface TransactionListProps {
  groupedTransactions: Record<string, Transaction[]>;
}

export default function TransactionList({
  groupedTransactions,
}: TransactionListProps) {
  return (
    <>
      {/* 거래 내역 리스트 */}
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
    </>
  );
}
