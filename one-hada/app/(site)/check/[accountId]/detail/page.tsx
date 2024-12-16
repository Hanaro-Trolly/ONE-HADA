'use client';

// 계좌 거래내역 상세 페이지
// - URL 파라미터 기반 거래내역 필터링
// - 계좌 정보와 거래내역 동시 로딩
// - 필터링된 거래내역을 날짜별로 그룹화
// - 실시간 검색 결과 표시
import AccountHeader from '@/components/check/AccountHeader';
import TransactionList from '@/components/check/TransactionList';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { getData, fetchAllData } from '@/lib/api';
import { Account, Transaction } from '@/lib/datatypes';

export default function DetailPage({
  params,
}: {
  params: { accountId: string };
}) {
  const { accountId } = params;
  // const router = useRouter();
  const searchParams = useSearchParams();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accountInfo, setAccountInfo] = useState<Account | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [account, transactionData] = await Promise.all([
          getData<Account>('account', accountId),
          fetchAllData<Transaction>('transaction'),
        ]);
        setAccountInfo(account);
        setTransactions(transactionData);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchData();
  }, [accountId]);

  // 검색 파라미터를 객체로 정리
  const filterParams = useMemo(
    () => ({
      period: searchParams.get('period') || undefined,
      type: searchParams.get('type') || '전체',
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      searchKeyword: searchParams.get('search') || undefined,
    }),
    [searchParams]
  );

  // 필터링된 거래 내역
  const filteredTransactions = useMemo(() => {
    if (!accountInfo) return [];

    return transactions.filter((transaction) => {
      const transactionType =
        transaction.senderAccountId === accountInfo.accountId
          ? '출금'
          : transaction.receiverAccountId === accountInfo.accountId
            ? '입금'
            : null;

      if (!transactionType) return false;
      if (filterParams.type !== '전체' && transactionType !== filterParams.type)
        return false;

      const transactionDate = new Date(transaction.transactionDate);
      const now = new Date();

      // 기간 필터링
      let periodCondition = true;
      if (filterParams.startDate && filterParams.endDate) {
        const start = new Date(filterParams.startDate);
        const end = new Date(filterParams.endDate);
        periodCondition = transactionDate >= start && transactionDate <= end;
      } else if (filterParams.period && filterParams.period !== '전체') {
        const periodMap: Record<string, number> = {
          '1개월': now.setMonth(now.getMonth() - 1),
          '3개월': now.setMonth(now.getMonth() - 3),
          '6개월': now.setMonth(now.getMonth() - 6),
          '1년': now.setFullYear(now.getFullYear() - 1),
        };
        const periodDate = periodMap[filterParams.period];
        if (periodDate) {
          periodCondition = transactionDate >= new Date(periodDate);
        }
      }

      // 키워드 검색 조건
      const searchTarget =
        transaction.senderAccountId === accountInfo.accountId
          ? transaction.receiverViewer
          : transaction.senderViewer;
      const keywordCondition = filterParams.searchKeyword
        ? searchTarget.includes(filterParams.searchKeyword)
        : true;

      return periodCondition && keywordCondition;
    });
  }, [transactions, accountInfo, filterParams]);

  // 날짜별 거래 내역 그룹화
  const groupedTransactions = useMemo(() => {
    if (!accountInfo || filteredTransactions.length === 0) return {};

    return filteredTransactions.reduce(
      (groups: Record<string, Transaction[]>, transaction) => {
        const date = new Date(transaction.transactionDate)
          .toISOString()
          .split('T')[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
      },
      {}
    );
  }, [filteredTransactions, accountInfo]);

  if (!accountInfo) {
    return <div className='p-4'>거래 내역 로딩 중...</div>;
  }

  return (
    <div className='bg-white min-h-screen flex flex-col'>
      <AccountHeader account={accountInfo} />
      <TransactionList
        groupedTransactions={groupedTransactions}
        accountId={accountId}
      />
    </div>
  );
}
