'use client';

import { Counsel, CounselContextType } from '@/app/admin/types/counsel';
import { createContext, useContext, useState } from 'react';

const CounselContext = createContext<CounselContextType | undefined>(undefined);

export function CounselProvider({ children }: { children: React.ReactNode }) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [counselData, setCounselData] = useState<Counsel[]>([]);

  return (
    <CounselContext.Provider
      value={{
        selectedUserId,
        setSelectedUserId,
        counselData,
        setCounselData,
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
