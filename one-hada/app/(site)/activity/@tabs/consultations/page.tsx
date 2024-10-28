import ConsultationCard from '@/components/molecules/ConsultationCard';
import { getDataByUserId } from '@/lib/api';
import { Consultation } from '@/lib/datatypes';
import { formatDate } from '@/lib/formatDate';

export default async function ConsultationsPage() {
  let consultationData: Consultation[] = [];
  try {
    consultationData = await getDataByUserId<Consultation>('consultation', '1');
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <div className='h-10 flex items-center w-full pl-4'>
        총<div className='font-semibold text-lg'>{consultationData.length}</div>
        건
      </div>
      <ul
        style={{ maxHeight: 'calc(100vh - 150px)' }}
        className='w-full py-2 overflow-y-scroll rounded-t-md'
      >
        {consultationData
          .reverse()
          .map(
            (
              { consultation_title, consultation_date, consultation_content },
              idx
            ) => (
              <li key={idx}>
                <ConsultationCard
                  title={consultation_title}
                  date={formatDate(consultation_date)}
                  content={consultation_content}
                />
              </li>
            )
          )}
      </ul>
    </>
  );
}
