'use client';

import AdminForm from '@/components/admin/AdminForm';
import { Suspense } from 'react';

/**
 * 사용자별 상담 페이지 컴포넌트
 */
export default function UserCounselPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <UserCounselContent />
    </Suspense>
  );
}

/**
 * 상담 페이지의 실제 컨텐츠를 렌더링하는 컴포넌트
 */
function UserCounselContent() {
  return (
    <div className='container mx-auto'>
      <AdminForm />
    </div>
  );
}

/**
 * 로딩 상태를 표시하는 컴포넌트
 */
function LoadingState() {
  return (
    <div className='container mx-auto p-4'>
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-200 rounded w-1/4 mb-6' />
        <div className='space-y-4'>
          <div className='h-4 bg-gray-200 rounded w-3/4' />
          <div className='h-4 bg-gray-200 rounded w-1/2' />
          <div className='h-4 bg-gray-200 rounded w-2/3' />
        </div>
      </div>
    </div>
  );
}
