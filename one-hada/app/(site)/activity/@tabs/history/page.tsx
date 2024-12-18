'use client';

import HistoryCard from '@/components/activity/HistoryCard';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { History } from '@/lib/datatypes';
import { formatDate } from '@/lib/formatDate';

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState<History[]>([]);
  const { data: session } = useSession();
  const { fetchData, error } = useFetch<History[]>();

  const fetchHistory = useCallback(async () => {
    const response = await fetchData('/api/history', {
      method: 'GET',
      token: session?.accessToken,
    });

    if (response.code === 200) {
      setHistoryData(response.data.histories);
    }
  }, [fetchData, session?.accessToken]);

  useEffect(() => {
    if (session?.accessToken) {
      fetchHistory();
    }
  }, [session?.accessToken, fetchHistory]);

  useEffect(() => {
    if (error) {
      console.error('History 데이터 fetch 에러:', error);
    }
  }, [error]);

  return (
    <div
      style={{ maxHeight: 'calc(100vh - 110px)' }}
      className='w-full py-2 overflow-y-scroll'
    >
      <ul>
        {historyData.map((item) => (
          <li key={item.historyId}>
            <HistoryCard
              id={item.historyId}
              date={formatDate(item.activityDate)}
              name={item.historyName}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
