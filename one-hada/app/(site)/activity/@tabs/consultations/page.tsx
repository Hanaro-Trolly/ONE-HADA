import ConsultationCard from '@/components/molecules/ConsultationCard';

type Temp = {
  title: string;
  date: string;
  content: string;
};
const TempConsultation: Temp[] = [
  {
    title: '대출하는 법',
    date: '2024.10.23',
    content: '상담내용1.상담내용2.상담내용3.',
  },
  {
    title: '계좌 생성하는 법',
    date: '2024.10.22',
    content: '상담내용A.상담내용B.상담내용C.',
  },
  {
    title: '내 집 마련하기',
    date: '2024.10.10',
    content: '못해요.파이팅하세요.',
  },
];
export default function ConsultationsPage() {
  return (
    <>
      <div className='h-10 text-left flex items-center w-full pl-4'>
        총<div className='font-semibold text-lg'>{TempConsultation.length}</div>
        건
      </div>
      <ul className='rounded-t-md'>
        {TempConsultation.map(({ title, date, content }, idx) => (
          <li key={idx}>
            <ConsultationCard title={title} date={date} content={content} />
          </li>
        ))}
      </ul>
    </>
  );
}
