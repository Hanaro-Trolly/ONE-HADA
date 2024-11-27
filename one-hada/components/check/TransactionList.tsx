import { Button } from '@/components/ui/button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Transaction } from '@/lib/datatypes';
import TransactionGroup from './TransactionGroup';

interface TransactionListProps {
  groupedTransactions: Record<string, Transaction[]>;
  accountId: string;
  onSearchClick: () => void;
}

export default function TransactionList({
  groupedTransactions,
  accountId,
  onSearchClick,
}: TransactionListProps) {
  return (
    <>
      {/* 거래 내역 헤더 */}
      <div className='bg-white flex justify-center items-center relative'>
        <h1 className='text-center mt-6 mb-6 text-xl font-medium'>거래 내역</h1>
        <Button
          onClick={onSearchClick}
          className='mt-6 mb-6 absolute right-8 tossface-icon bg-[#61B89F] rounded-full hover:bg-[#479e86]'
        >
          <MagnifyingGlassIcon className='text-white size-4' />
        </Button>
      </div>

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
            accountId={accountId}
          />
        ))}
    </>
  );
}
