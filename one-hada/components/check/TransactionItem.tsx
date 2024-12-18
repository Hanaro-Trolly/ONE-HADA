import { Transaction } from '@/lib/datatypes';

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const transactionTime = new Date(
    transaction.transactionDateTime
  ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className='mt-2 ml-8 border-b pb-2 flex justify-between'>
      {/* 거래 상대방 및 시간 */}
      <div>
        <p className='font-medium'>{transaction.view}</p>
        <p className='text-sm text-gray-500 mt-1'>{transactionTime}</p>
      </div>

      {/* 금액 및 잔액 */}
      <div className='text-right mr-8'>
        <p
          className={`text-lg font-medium ${
            transaction.transactionType === '출금'
              ? 'text-red-500'
              : 'text-blue-500'
          }`}
        >
          {transaction.transactionType === '출금' ? '-' : '+'}{' '}
          {transaction.amount.toLocaleString()} 원
        </p>
        <p className='text-sm text-gray-500'>
          {transaction.balance.toLocaleString()} 원
        </p>
      </div>
    </div>
  );
}
