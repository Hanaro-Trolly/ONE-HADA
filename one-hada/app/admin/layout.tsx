'use client';

import AdminHeader from '@/components/admin/AdminHeader';
import { AdminWebSocketProvider } from '@/context/admin/AdminWebSocketContext';
import { CounselProvider } from '@/context/admin/CounselContext';
import { AdminSessionProvider } from '@/context/admin/SessionContext';
import { useEffect, useState } from 'react';
import '../globals.css';

// AdminContent 컴포넌트 분리
const AdminContent = ({
  mounted,
  children,
}: {
  mounted: boolean;
  children: React.ReactNode;
}) => {
  return (
    <CounselProvider>
      <AdminWebSocketProvider>
        <div className='flex min-h-screen'>
          {mounted ? (
            <>
              <div className='w-1/5 min-h-screen bg-gray-100 border-r'>
                <AdminHeader />
              </div>
              <main className='flex-1 p-4'>{children}</main>
            </>
          ) : (
            <div className='flex min-h-screen'>
              <div className='w-1/5 min-h-screen bg-gray-100 border-r'></div>
              <main className='flex-1 p-4'></main>
            </div>
          )}
        </div>
      </AdminWebSocketProvider>
    </CounselProvider>
  );
};

// AdminLayout 컴포넌트
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AdminSessionProvider>
      {mounted && <AdminContent mounted={mounted} children={children} />}
      {!mounted && (
        <div className='flex min-h-screen'>
          <div className='w-1/5 min-h-screen bg-gray-100 border-r'></div>
          <main className='flex-1 p-4'></main>
        </div>
      )}
    </AdminSessionProvider>
  );
}
