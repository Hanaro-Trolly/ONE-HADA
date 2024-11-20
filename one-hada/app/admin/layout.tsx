// app/admin/layout.tsx
'use client';

import AdminHeader from '@/components/admin/AdminHeader';
import { CounselProvider } from '@/context/admin/CounselContext';
import { AdminSessionProvider } from '@/context/admin/SessionContext';
import { PropsWithChildren, useEffect, useState } from 'react';
import '../globals.css';

// app/admin/layout.tsx

// app/admin/layout.tsx

/**
 * 관리자 페이지의 레이아웃 컴포넌트
 * 세션 관리와 상담 컨텍스트를 제공하며, 사이드바와 메인 컨텐츠 영역을 구성합니다.
 */
export default function AdminLayout({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <AdminSessionProvider>
      <CounselProvider>
        <div className='flex min-h-screen'>
          <LayoutContent isMounted={isMounted}>{children}</LayoutContent>
        </div>
      </CounselProvider>
    </AdminSessionProvider>
  );
}

interface LayoutContentProps extends PropsWithChildren {
  isMounted: boolean;
}

/**
 * 레이아웃의 실제 컨텐츠를 렌더링하는 컴포넌트
 * 마운트 상태에 따라 다른 UI를 표시합니다.
 */
function LayoutContent({ isMounted, children }: LayoutContentProps) {
  if (!isMounted) {
    return <SkeletonLayout />;
  }

  return (
    <>
      <aside className='w-1/5 min-h-screen bg-gray-100 border-r'>
        <AdminHeader />
      </aside>
      <main className='flex-1 p-4'>{children}</main>
    </>
  );
}

/**
 * 페이지 로딩 중 표시될 스켈레톤 UI 컴포넌트
 */
function SkeletonLayout() {
  return (
    <div className='flex min-h-screen'>
      <div className='w-1/5 min-h-screen bg-gray-100 border-r' />
      <main className='flex-1 p-4' />
    </div>
  );
}
