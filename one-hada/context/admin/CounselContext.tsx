'use client';

import { Counsel, CounselContextType } from '@/app/admin/types/adminTypes';
import { createContext, useCallback, useContext, useState } from 'react';
import { useAdminSession } from './SessionContext';

const API_URL = 'http://localhost:8080/api/admin';

interface ConsultationResponse {
  code: number;
  status: string;
  message: string;
  data: {
    userId: string;
    consultations: {
      id: string;
      agentId: string;
      consultationTitle: string;
      consultationContent: string;
      consultationDate: string;
    }[];
  } | null;
}

const CounselContext = createContext<CounselContextType | undefined>(undefined);

export function CounselProvider({ children }: { children: React.ReactNode }) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [counselData, setCounselData] = useState<Counsel[]>([]);
  const { session } = useAdminSession();

  const fetchCounselData = useCallback(async () => {
    if (!session.loginUser?.id) return;

    try {
      const response = await fetch(
        `${API_URL}/consultation/${session.loginUser.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result: ConsultationResponse = await response.json();

      if (result.code === 200 && result.data) {
        const formattedData = result.data.consultations.map((consultation) => ({
          id: consultation.id,
          agent_id: consultation.agentId,
          user_id: result.data!.userId,
          consultation_title: consultation.consultationTitle,
          consultation_content: consultation.consultationContent,
          consultation_date: consultation.consultationDate,
        }));

        setCounselData(formattedData);
      } else {
        console.error('상담 데이터 조회 실패:', result.message);
        setCounselData([]);
      }
    } catch (error) {
      console.error('상담 데이터 조회 중 오류 발생:', error);
      setCounselData([]);
    }
  }, [session.loginUser?.id]);

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
