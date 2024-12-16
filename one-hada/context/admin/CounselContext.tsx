'use client';

import { Counsel, CounselContextType } from '@/app/admin/types/adminTypes';
import { useFetch } from '@/hooks/useFetch';
import { createContext, useCallback, useContext, useState } from 'react';

interface ConsultationResponse {
  userId: string;
  consultations: {
    id: string;
    agentId: string;
    consultationTitle: string;
    consultationContent: string;
    consultationDate: string;
  }[];
}

const CounselContext = createContext<CounselContextType | undefined>(undefined);

export function CounselProvider({ children }: { children: React.ReactNode }) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [counselData, setCounselData] = useState<Counsel[]>([]);
  const { fetchData, isLoading, error } = useFetch<ConsultationResponse>();

  const fetchCounselData = useCallback(
    async (userId: string) => {
      try {
        console.log(userId);
        const response = await fetchData(`/api/admin/consultation/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: true,
        });

        if (response?.data) {
          const transformedData = response.data.consultations.map(
            (consultation: ConsultationResponse['consultations'][0]) => ({
              id: consultation.id,
              agent_id: consultation.agentId,
              consultation_title: consultation.consultationTitle,
              consultation_content: consultation.consultationContent,
              consultation_date: consultation.consultationDate,
              user_id: response.data.userId,
            })
          );

          setCounselData(transformedData);
        }
      } catch (error) {
        console.error('상담 데이터 조회 중 오류 발생:', error);
      }
    },
    [fetchData]
  );

  const refetchCounselData = useCallback(
    (userId: string) => {
      fetchCounselData(userId);
    },
    [fetchCounselData]
  );

  return (
    <CounselContext.Provider
      value={{
        selectedUserId,
        setSelectedUserId,
        counselData,
        setCounselData,
        fetchCounselData,
        refetchCounselData,
        isLoading,
        error,
      }}
    >
      {children}
    </CounselContext.Provider>
  );
}

export const useCounsel = () => {
  const context = useContext(CounselContext);
  if (!context) {
    throw new Error('useCounsel must be used within a CounselProvider');
  }
  return context;
};
