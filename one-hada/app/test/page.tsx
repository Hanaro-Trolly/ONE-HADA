import HistoryCard from '@/components/molecules/HistoryCard';
import ShortCutCard from '@/components/molecules/ShortCutCard';

export default function ComponentTest() {
  return (
    <>
      <div className='font-bold'>폰트 테스트</div>
      <div>
        <HistoryCard
          id='1'
          name='테스트'
          date='2024.10.22'
          isConsulting={false}
        ></HistoryCard>
        <HistoryCard
          id='2'
          name='테스트'
          date='2024.10.22'
          isConsulting={false}
        ></HistoryCard>
        <ShortCutCard
          id='1'
          name='바로가기카드'
          isEdit={false}
          isFavorite={true}
        ></ShortCutCard>
        <ShortCutCard
          id='2'
          name='바로가기 편집'
          isEdit={true}
          isFavorite={true}
        ></ShortCutCard>
      </div>
    </>
  );
}
