'use client';

import AdminHeader from '@/components/admin/AdminHeader';
import { AdminWebSocketProvider } from '@/context/admin/AdminWebSocketContext';
import { CounselProvider } from '@/context/admin/CounselContext';
import { AdminSessionProvider } from '@/context/admin/SessionContext';
import { useEffect, useState } from 'react';
import '../globals.css';

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
    </AdminSessionProvider>
  );
}
