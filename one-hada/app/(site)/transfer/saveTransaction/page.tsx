'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { addData } from '@/lib/api';

export default function saveTransaction() {
  const { data: session } = useSession();
  const router = useRouter();
  const [historyLength, setHistoryLength] = useState<number>(0);
  const userId = session?.user.id;

  const handleTransactionAndHistory = async (route: string) => {
    const queryParams = new URLSearchParams(route.split('?')[1]);
    const queryCount = Array.from(queryParams.keys()).length;

    if (queryCount === 8) {
      const transactionId = String(Date.now());
      const newTransaction = {
        id: transactionId,
        sender_account_id: queryParams.get('account_id') || '',
        receiver_account_id: queryParams.get('recipient_account_id'),
        amount: Number(queryParams.get('amount')) || 0,
        sender_viewer: queryParams.get('sender_name') || '',
        receiver_viewer: queryParams.get('recipient_name') || '',
        transaction_date: new Date().toISOString(),
      };

      try {
        await addData('transaction', newTransaction);

        const newHistory = {
          id: '' + historyLength,
          user_id: userId || '',
          history_name: `${queryParams.get('recipient_name') || '수신자'}님께 ${
            queryParams.get('amount') || 0
          }원 송금`,
          activity_date: new Date().toISOString(),
          history_elements: `${queryParams.get('account_id')}#${queryParams.get('recipient_account_id')}#${queryParams.get(
            'amount'
          )}`,
        };

        await addData('history', newHistory);
        router.push('/transfer/checking');
      } catch (error) {
        console.error('Error adding transaction or history:', error);
      }
    }
  };

  useEffect(() => {
    handleTransactionAndHistory;
  }, [handleTransactionAndHistory]);

  return <div>처리중...</div>;
}
