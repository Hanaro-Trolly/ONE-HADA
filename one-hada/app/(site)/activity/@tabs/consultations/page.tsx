'use client';

import ConsultationCard from '@/components/activity/ConsultationCard';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { Consultation } from '@/lib/datatypes';
import { formatDate } from '@/lib/formatDate';

const ConsultationsPage = () => {
  const [consultationData, setConsultationData] = useState<Consultation[]>([]);
  const { fetchData, error } = useFetch<Consultation[]>();
  const { data: session } = useSession();

  const fetchConsultations = useCallback(async () => {
    const response = await fetchData('/api/consultations', {
      method: 'GET',
      token: session?.accessToken,
    });

    if (response.code === 200) {
      setConsultationData(response.data.consultations);
    }
  }, [fetchData, session?.accessToken]);

  useEffect(() => {
    if (session?.accessToken) {
      fetchConsultations();
    }
  }, [fetchConsultations, session?.accessToken]);

  useEffect(() => {
    if (error) {
      console.error('Consultation 데이터 fetch 에러:', error);
    }
  }, [error]);

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
            consultationId,
            consultationTitle,
            consultationDate,
            consultationContent,
          }) => (
            <li key={consultationId}>
              <ConsultationCard
                title={consultationTitle}
                date={formatDate(consultationDate)}
                content={consultationContent}
              />
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default ConsultationsPage;
