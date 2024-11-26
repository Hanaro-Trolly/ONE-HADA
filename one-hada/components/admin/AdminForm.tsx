'use client';

import CounselDetail from '@/components/admin/CounselDetail';
import { useParams } from 'next/navigation';
import AdminInputForm from './AdminInputForm';
import Title from './AdminTitle';

// 컴포넌트에 props가 없는 경우 Props 타입 정의를 생략
export default function AdminForm() {
  const { userId } = useParams<{ userId: string }>();

  return (
    <div className='grid grid-cols-2 gap-12 px-6'>
      <section className='space-y-6' aria-label='고객 정보 섹션'>
        <Title text='고객 정보' />
        <CounselDetail userId={userId} />
      </section>

      <section className='space-y-6' aria-label='상담 정보 섹션'>
        <Title text='상담 정보' />
        <AdminInputForm userId={userId} />
      </section>
    </div>
  );
}
