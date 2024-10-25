'use client';

import dummy from '@/c-dummy/transaction_d.json';
import { useRouter } from 'next/navigation';
// 더미 데이터를 가져옴
import { useEffect, useState } from 'react';

// type Transaction = {
//   transaction_id: string;
//   user_id: string;
//   account_id: string;
//   transaction_type: string;
//   amount: number;
//   counteraccountnumber: number;
//   transaction_date: string; // 거래 일시 추가
// };

// export default function DetailPage() {
//   const [filteredTransactions, setFilteredTransactions] = useState<
//     Transaction[]
//   >([]);

//   useEffect(() => {
//     // window.location을 통해 URL의 파라미터 값을 가져옴
//     const searchParams = new URLSearchParams(window.location.search);
//     const period = searchParams.get('period');
//     const type = searchParams.get('type');
//     const accountId = searchParams.get('accountId');

//     if (period && type && accountId) {
//       const transactions = dummy.transactions.filter((transaction) => {
//         // 계좌에 맞는 거래만 필터링
//         if (transaction.account_id !== accountId) return false;

//         // 거래 구분 필터링
//         if (type !== '전체' && transaction.transaction_type !== type)
//           return false;

//         // 조회 기간 필터링
//         const now = new Date();
//         const transactionDate = new Date(transaction.transaction_date);

//         let periodCondition = true;
//         if (period === '1개월') {
//           periodCondition =
//             transactionDate >= new Date(now.setMonth(now.getMonth() - 1));
//         } else if (period === '3개월') {
//           periodCondition =
//             transactionDate >= new Date(now.setMonth(now.getMonth() - 3));
//         } else if (period === '6개월') {
//           periodCondition =
//             transactionDate >= new Date(now.setMonth(now.getMonth() - 6));
//         } else if (period === '1년') {
//           periodCondition =
//             transactionDate >= new Date(now.setFullYear(now.getFullYear() - 1));
//         }

//         return periodCondition;
//       });

//       setFilteredTransactions(transactions);
//     }
//   }, []); // 컴포넌트가 처음 렌더링될 때만 실행

//   return (
//     <div className='bg-white shadow-md rounded-lg m-4 p-4'>
//       <h1 className='text-lg font-bold mb-4'>거래 내역</h1>

//       {filteredTransactions.length === 0 ? (
//         <p>해당 조건에 맞는 거래 내역이 없습니다.</p>
//       ) : (
//         <ul>
//           {filteredTransactions.map((transaction) => (
//             <li key={transaction.transaction_id} className='mb-2'>
//               <p>거래 ID: {transaction.transaction_id}</p>
//               <p>거래 유형: {transaction.transaction_type}</p>
//               <p>거래 금액: {transaction.amount.toLocaleString()} 원</p>
//               <p>거래 일시: {transaction.transaction_date}</p>
//               <p>상대방 계좌 번호: {transaction.counteraccountnumber}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
type Transaction = {
  transaction_id: string;
  user_id: string;
  account_id: string;
  transaction_type: string;
  amount: number;
  counteraccountnumber: number;
  transaction_date: string; // 거래 일시 추가
};

export default function DetailPage() {
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    // URL의 파라미터 값을 가져옴
    const searchParams = new URLSearchParams(window.location.search);
    const period = searchParams.get('period');
    const type = searchParams.get('type');
    const accountId = searchParams.get('accountId');

    if (period && type && accountId) {
      const transactions = dummy.transactions.filter((transaction) => {
        // 계좌에 맞는 거래만 필터링
        if (transaction.account_id !== accountId) return false;

        // 거래 구분 필터링
        if (type !== '전체' && transaction.transaction_type !== type)
          return false;

        // 조회 기간 필터링
        const now = new Date();
        const transactionDate = new Date(transaction.transaction_date);

        let periodCondition = true;
        if (period === '1개월') {
          periodCondition =
            transactionDate >= new Date(now.setMonth(now.getMonth() - 1));
        } else if (period === '3개월') {
          periodCondition =
            transactionDate >= new Date(now.setMonth(now.getMonth() - 3));
        } else if (period === '6개월') {
          periodCondition =
            transactionDate >= new Date(now.setMonth(now.getMonth() - 6));
        } else if (period === '1년') {
          periodCondition =
            transactionDate >= new Date(now.setFullYear(now.getFullYear() - 1));
        }

        return periodCondition;
      });

      setFilteredTransactions(transactions);
    }
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <div className='bg-white shadow-md rounded-lg m-4 p-4'>
      <h1 className='text-lg font-bold mb-4'>거래 내역</h1>

      {filteredTransactions.length === 0 ? (
        <p>해당 조건에 맞는 거래 내역이 없습니다.</p>
      ) : (
        <ul className='space-y-4'>
          {filteredTransactions.map((transaction) => (
            <li
              key={transaction.transaction_id}
              className='bg-gray-100 p-4 shadow rounded-lg'
            >
              <div className='mb-2'>
                <p className='text-md font-bold'>
                  거래 ID: {transaction.transaction_id}
                </p>
              </div>
              <div className='mb-2'>
                <p className='text-md'>
                  거래 유형: {transaction.transaction_type}
                </p>
              </div>
              <div className='mb-2'>
                <p className='text-md'>
                  거래 금액: {transaction.amount.toLocaleString()} 원
                </p>
              </div>
              <div className='mb-2'>
                <p className='text-md'>
                  거래 일시: {transaction.transaction_date}
                </p>
              </div>
              <div>
                <p className='text-md'>
                  상대방 계좌 번호: {transaction.counteraccountnumber}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
