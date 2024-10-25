'use client';

import dummy from '@/c-dummy/transaction_d.json';
import { useRouter } from 'next/navigation';
// 더미 데이터를 가져옴
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

export default function DetailPage({
  params,
}: {
  params: { accountId: string };
}) {
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  // 예시로 특정 계좌 ID를 넣음, 실제로는 URL 파라미터 등을 통해 받아올 수 있음
  const { accountId } = params;

  useEffect(() => {
    // URL의 파라미터 값을 가져옴
    const searchParams = new URLSearchParams(window.location.search);
    const period = searchParams.get('period');
    const type = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const searchKeyword = searchParams.get('search'); // 검색어 추가

    if ((period || (startDate && endDate)) && type) {
      const transactions = dummy.transactions.filter((transaction) => {
        let transactionType = '';

        // 계좌에 맞는 거래만 필터링
        if (transaction.sender_account_id === accountId) {
          transactionType = '출금';
        } else if (transaction.receiver_account_id === accountId) {
          transactionType = '입금';
        } else {
          return false;
        }

        // 거래 구분 필터링
        if (type !== '전체' && transactionType !== type) return false;

        // 조회 기간 필터링 (기본 기간 필터링과 날짜 입력 필터링 추가)
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

        // 검색어 필터링: 송신자/수신자에 검색어가 포함된 경우만 필터링
        const keywordCondition = searchKeyword
          ? transaction.sender_view.includes(searchKeyword) ||
            transaction.receiver_view.includes(searchKeyword)
          : true;

        return periodCondition && keywordCondition;
      });

      setFilteredTransactions(transactions);
    }
  }, []);

  return (
    <div>
      <h1>거래 내역</h1>

      {filteredTransactions.length === 0 ? (
        <p>거래 내역이 없습니다.</p>
      ) : (
        filteredTransactions.map((transaction) => (
          <div key={transaction.transaction_id}>
            <p>
              거래 타입:{' '}
              {transaction.sender_account_id === accountId ? '출금' : '입금'}
            </p>
            <p>금액: {transaction.amount.toLocaleString()} 원</p>
            <p>
              {transaction.sender_account_id === accountId
                ? `받는 사람: ${transaction.receiver_view}`
                : `보낸 사람: ${transaction.sender_view}`}
            </p>
            <p>거래 날짜: {transaction.transaction_date}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
