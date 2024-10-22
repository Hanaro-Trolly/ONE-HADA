import HistoryCard from '@/components/molecules/HistoryCard';

type Temp = {
  historyId: number;
  memberId: number;
  title: string;
  date: string;
  isConsulting: boolean;
};
const TempTable: Temp[] = [
  {
    historyId: 1,
    memberId: 2000,
    title: '메가커피 결제내역 확인',
    date: '2024.10.22',
    isConsulting: false,
  },
  {
    historyId: 2,
    memberId: 2000,
    title: '오늘 입금내역 확인',
    date: '2024.10.22',
    isConsulting: false,
  },
  {
    historyId: 3,
    memberId: 2000,
    title: '시온이한테 2억 송금',
    date: '2024.10.21',
    isConsulting: false,
  },
  {
    historyId: 4,
    memberId: 2000,
    title: '한달간 출금 내역 확인',
    date: '2024.10.18',
    isConsulting: false,
  },
];
export default function HistoryPage() {
  return (
    <div>
      <ul>
        {TempTable.map((item) => (
          <li key={item.historyId}>
            <HistoryCard
              id={'' + item.historyId}
              date={item.date}
              name={item.title}
              isConsulting={false}
            ></HistoryCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
