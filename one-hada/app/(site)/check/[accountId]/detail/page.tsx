'use client';

import dummi from '@/c-dummy/account_d.json';
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

type Account = {
  account_id: string;
  account_name: string; // 계좌 소유자 이름
  account_number: number; // 계좌 번호
  balance: number;
};

export default function DetailPage({
  params,
}: {
  params: { accountId: string };
}) {
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [accountInfo, setAccountInfo] = useState<Account | null>(null); // 계좌 정보 상태 추가
  const { accountId } = params;

  useEffect(() => {
    // 계좌 정보를 찾아서 상태에 저장
    const account = dummi.accounts.find(
      (acc: Account) => acc.account_id === accountId
    );
    if (account) {
      setAccountInfo(account);
    }

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
  }, [accountId]);

  return (
    <div>
      {/* 계좌 정보가 있을 경우 상단에 이름과 계좌번호 출력 */}
      {accountInfo && (
        <div className='bg-white shadow-md rounded-lg w-full h-full flex items-start justify-between flex-col'>
          <h1>계좌 이름: {accountInfo.account_name}</h1>
          <h2>계좌 번호: {accountInfo.account_number}</h2>
          <h3>{accountInfo.balance.toLocaleString()}원</h3>
        </div>
      )}

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
