import HistoryCard from '@/components/molecules/HistoryCard';
import { getDataByUserId } from '@/lib/api';
import { History } from '@/lib/datatypes';
import { formatDate } from '@/lib/formatDate';

const HistoryPage = async () => {
  let historyData: History[] = [];

  try {
    historyData = await getDataByUserId<History>('history', '1');
  } catch (error) {
    console.error(error);
  }

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
