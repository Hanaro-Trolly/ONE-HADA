// 개별 거래내역 항목을 표시하는 컴포넌트
// - 거래 상대방 정보 표시
// - 거래 시간 표시
// - 입금/출금 금액을 색상으로 구분하여 표시
// - 금액 포맷팅 처리
import { Transaction } from '@/lib/datatypes';

interface TransactionItemProps {
  transaction: Transaction;
  accountId: string;
}

export default function TransactionItem({
  transaction,
  accountId,
}: TransactionItemProps) {
  const isWithdrawal = transaction.sender_account_id === accountId;
  const transactionTime = new Date(
    transaction.transaction_date
  ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className='mt-2 ml-8 border-b pb-2 flex justify-between'>
      {/* 거래 상대방 및 시간 */}
      <div>
        <p className='font-medium'>
          {isWithdrawal
            ? transaction.receiver_viewer
            : transaction.sender_viewer}
        </p>
        <p className='text-sm text-gray-500'>{transactionTime}</p>
      </div>

      {/* 금액 및 잔액 */}
      <div className='text-right mr-8'>
        <p
          className={`text-lg font-medium ${
            isWithdrawal ? 'text-red-500' : 'text-blue-500'
          }`}
        >
          {isWithdrawal ? '-' : '+'} {transaction.amount.toLocaleString()} 원
        </p>
        {/* 잔액 정보가 필요하다면 아래 코드를 활성화하고 필요한 데이터를 전달해야 합니다 */}
        {/* <p className="text-sm text-gray-500">
          {transaction.balanceAfterTransaction.toLocaleString()} 원
        </p> */}
      </div>
    </div>
  );
}
