'use client';

import { Counsel, CounselContextType } from '@/app/admin/types/counsel';
import { createContext, useCallback, useContext, useState } from 'react';
import { fetchAllData } from '@/lib/api';

const CounselContext = createContext<CounselContextType | undefined>(undefined);

export function CounselProvider({ children }: { children: React.ReactNode }) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [counselData, setCounselData] = useState<Counsel[]>([]);

  const fetchCounselData = useCallback(async () => {
    try {
      const data = await fetchAllData<Counsel>('consultation');
      setCounselData(data);
    } catch (error) {
      console.error('상담 데이터 조회 중 오류 발생:', error);
    }
  }, []);
  function refetchCounselData() {
    fetchCounselData();
  }

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
