'use client';

import { Counsel, CounselContextType } from '@/app/admin/types/adminTypes';
import { useFetch } from '@/hooks/useFetch';
import { createContext, useCallback, useContext, useState } from 'react';
import { useAdminSession } from './SessionContext';

interface Consultation {
  id: string;
  agentId: string;
  consultationTitle: string;
  consultationContent: string;
  consultationDate: string;
}

interface ConsultationResponse {
  code: number;
  status: string;
  message: string;
  data: {
    userId: string;
    consultations: Consultation[];
  } | null;
}

const CounselContext = createContext<CounselContextType | undefined>(undefined);

export function CounselProvider({ children }: { children: React.ReactNode }) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [counselData, setCounselData] = useState<Counsel[]>([]);
  const { session } = useAdminSession();
  const { fetchData } = useFetch<ConsultationResponse>();

  const fetchCounselData = useCallback(async () => {
    if (!session.loginUser?.id) return;

    try {
      const result = await fetchData(
        `/api/admin/consultation/${session.loginUser.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (result?.code === 200 && result.data) {
        const formattedData = result.data.consultations.map(
          (consultation: Consultation) => ({
            id: consultation.id,
            agent_id: String(consultation.agentId), // agent_id도 문자열로 변환
            user_id: String(result.data!.userId),
            consultation_title: consultation.consultationTitle,
            consultation_content: consultation.consultationContent,
            consultation_date: consultation.consultationDate,
          })
        );

        setCounselData(formattedData);
      } else {
        console.error('상담 데이터 조회 실패:', result?.message);
        setCounselData([]);
      }
    } catch (error) {
      console.error('상담 데이터 조회 중 오류 발생:', error);
      setCounselData([]);
    }
  }, [session.loginUser?.id, fetchData]);

  const refetchCounselData = useCallback(() => {
    fetchCounselData();
  }, [fetchCounselData]);

  return (
    <CounselContext.Provider
      value={{
        selectedUserId,
        setSelectedUserId,
        counselData,
        setCounselData,
        fetchCounselData,
        refetchCounselData,
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
