'use client';

import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface RedisData {
  amount: string;
  senderAccountId: string;
  senderName: string;
  receiverAccountId: string;
  receiverName: string;
}

export default function Save() {
  const { data: session } = useSession();
  const { fetchData, error } = useFetch<RedisData>();
  const router = useRouter();
  const userId = session?.user.id;
  const [isSaveTransfer, setIsSaveTransfer] = useState<boolean>(false);
  const [isSaveHistory, setIsSaveHistory] = useState<boolean>(false);

  const saveTransfer = useCallback(
    async (transferData: RedisData) => {
      const {
        senderAccountId,
        receiverAccountId,
        senderName,
        receiverName,
        amount,
      } = transferData;

      if (
        senderAccountId &&
        receiverAccountId &&
        senderName &&
        receiverName &&
        amount
      ) {
        const response = await fetchData(`/api/transaction/transfer`, {
          method: 'POST',
          token: session?.accessToken,
          body: {
            fromAccountId: senderAccountId,
            toAccountId: receiverAccountId,
            amount: Number(amount),
            senderMessage: senderName,
            receiverMessage: receiverName,
          },
        });

        if (response.code === 200) {
          setIsSaveTransfer(true);
        }
      } else {
        console.error('계좌이체 중 오류 발생');
      }
    },
    [session?.accessToken, fetchData]
  );

  const saveHistory = useCallback(
    async (historyData: RedisData) => {
      const { senderAccountId, receiverAccountId, receiverName, amount } =
        historyData;

      if (senderAccountId && receiverAccountId && receiverName && amount) {
        const response = await fetchData('api/history', {
          method: 'POST',
          token: session?.accessToken,
          body: {
            userId: userId,
            historyName: `${receiverName}에게 ${amount} 이체`,
            historyElements: {
              type: 'transfer',
              myAccount: senderAccountId,
              receiverAccount: receiverAccountId,
              amount: amount,
              transferType: 'instant',
            },
            historyUrl: '/',
            activity_date: '2024-12-03T11:28:14', //필요없을거 같은데??
          },
        });

        if (response.code == 200) {
          setIsSaveHistory(true);
        }
      } else {
        console.error('히스토리 저장 중 오류 발생');
      }
    },
    [userId, session?.accessToken, fetchData]
  );

  const handleTransfer = useCallback(async () => {
    const response = await fetchData('/api/redis', {
      method: 'GET',
      body: [
        'amount',
        'senderName',
        'senderAccountId',
        'receiverName',
        'receiverAccountId',
      ],
    });

    if (response.code === 200) {
      await saveTransfer(response.data);
      await saveHistory(response.data);
      //활동내역 저장 api
    }
  }, [fetchData, saveTransfer, saveHistory]);

  useEffect(() => {
    handleTransfer();

    if (isSaveTransfer && isSaveHistory) {
      router.push('/transfer/checking');
    }
  }, [handleTransfer, isSaveTransfer, isSaveHistory, router]);

  useEffect(() => {
    if (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
  }, [error]);

  return <div>이체 처리 중...</div>;
}
