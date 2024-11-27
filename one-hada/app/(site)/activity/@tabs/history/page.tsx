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
        if (session?.user?.id) {
          const data = await getDataByUserId<History>(
            'history',
            session.user.id
          );
          setHistoryData(data);
        } else {
          console.log('User session not found');
        }
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    };
    if (session) {
      fetchData();
    }
  }, [session]);

  return (
    <div
      style={{ maxHeight: 'calc(100vh - 110px)' }}
      className='w-full py-2 overflow-y-scroll'
    >
      <ul>
        {historyData.toReversed().map((item) => (
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
