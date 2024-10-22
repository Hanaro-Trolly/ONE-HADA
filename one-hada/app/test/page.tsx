import HistoryCard from '@/components/molecules/HistoryCard';

export default function ComponentTest() {
  return (
    <>
      <div className='font-bold'>폰트 테스트</div>
      <div>
        <HistoryCard
          name={'테스트'}
          date={'2024.10.22'}
          isConsulting={false}
        ></HistoryCard>
        <HistoryCard
          name={'테스트'}
          date={'2024.10.22'}
          isConsulting={false}
        ></HistoryCard>
      </div>
    </>
  );
}
