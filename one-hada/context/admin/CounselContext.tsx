'use client';

import {
  ConsultationSummary,
  Counsel,
  CounselContextType,
} from '@/app/admin/types/adminTypes';
import { useFetch } from '@/hooks/useFetch';
import { createContext, useCallback, useContext, useState } from 'react';
import { useAdminSession } from './SessionContext';

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

// context/admin/CounselContext.tsx

export function CounselProvider({ children }: { children: React.ReactNode }) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [counselData, setCounselData] = useState<Counsel[]>([]);
  const [consultationList, setConsultationList] = useState<
    ConsultationSummary[]
  >([]);
  const { session } = useAdminSession();
  const { fetchData, isLoading, error } = useFetch<ConsultationResponse>();

  const fetchCounselData = useCallback(
    async (userId: string) => {
      try {
        const response = await fetchData(`/api/admin/consultation/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: false,
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

  const fetchConsultationList = useCallback(
    async (agentId: string) => {
      try {
        const response = await fetchData(
          `/api/admin/consultationList/${agentId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: false,
          }
        );

        if (response?.data) {
          setConsultationList(response.data);
        }
      } catch (error) {
        console.error('Failed to load consultation list:', error);
      }
    },
    [fetchData]
  );

  const refetchCounselData = useCallback(
    async (userId: string) => {
      await fetchCounselData(userId);
      if (session?.loginUser?.id) {
        await fetchConsultationList(session.loginUser.id);
      }
    },
    [fetchCounselData, fetchConsultationList, session]
  );

  return (
    <CounselContext.Provider
      value={{
        selectedUserId,
        setSelectedUserId,
        counselData,
        setCounselData,
        consultationList,
        fetchConsultationList,
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
