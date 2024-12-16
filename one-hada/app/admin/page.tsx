'use client';

import Login from '@/components/admin/Login';
import Profile from '@/components/admin/Profile';
import { useAdminSession } from '@/context/admin/SessionContext';
import { Suspense } from 'react';

/**
 * 관리자 페이지의 메인 컴포넌트
 * 로그인 상태에 따라 Profile 또는 Login 컴포넌트를 렌더링합니다.
 */
export default function AdminPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminContent />
    </Suspense>
  );
}

/**
 * 관리자 페이지의 실제 컨텐츠를 렌더링하는 컴포넌트
 */
function AdminContent() {
  const { session } = useAdminSession();

  return (
    <div className='flex items-center justify-center h-screen'>
      {session.loginUser ? <Profile /> : <Login />}
    </div>
  );
}

/**
 * 로딩 중 표시될 스피너 컴포넌트
 */
function LoadingSpinner() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500' />
    </div>
  );
}
