'use client';

import HistoryCard from '@/components/activity/HistoryCard';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getDataByUserId } from '@/lib/api';
import { History } from '@/lib/datatypes';
import { formatDate } from '@/lib/formatDate';

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState<History[]>([]);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user) {
          const data = await getDataByUserId<History>(
            'history',
            session?.user.id
          );
          setHistoryData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div
      style={{ maxHeight: 'calc(100vh - 110px)' }}
      className='w-full py-2 overflow-y-scroll'
    >
      <ul>
        {historyData.reverse().map((item) => (
          <li key={item.id}>
            <HistoryCard
              id={item.id}
              date={formatDate(item.activity_date)}
              name={item.history_name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
