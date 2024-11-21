'use client';

import ConsultationCard from '@/components/activity/ConsultationCard';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getDataByUserId } from '@/lib/api';
import { Consultation } from '@/lib/datatypes';
import { formatDate } from '@/lib/formatDate';

const ConsultationsPage = () => {
  const [consultationData, setConsultationData] = useState<Consultation[]>([]);
  const { data: session } = useSession();

  const fetchConsultations = async (userId: string) => {
    try {
      const data = await getDataByUserId<Consultation>('consultation', userId);
      setConsultationData(data.reverse());
    } catch (error) {
      console.error('Error fetching consultations:', error);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchConsultations(session.user.id);
    }
  }, [session?.user?.id]);

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
        {consultationData.map(
          ({
            id,
            consultation_title,
            consultation_date,
            consultation_content,
          }) => (
            <li key={id}>
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
};

export default ConsultationsPage;
