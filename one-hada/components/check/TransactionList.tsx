// 전체 거래내역 목록을 관리하는 컴포넌트
// - 거래내역 헤더와 검색 버튼 표시
// - 날짜별로 그룹화된 거래내역을 정렬하여 표시
// - TransactionGroup 컴포넌트들을 포함
import { Transaction } from '@/lib/datatypes';
import TransactionGroup from './TransactionGroup';

interface TransactionListProps {
  groupedTransactions: Record<string, Transaction[]>;
  accountId: string;
}

export default function TransactionList({
  groupedTransactions,
  accountId,
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
            accountId={accountId}
          />
        ))}
    </>
  );
}
