'use client';

import CounselDetail from '@/components/admin/CounselDetail';
import { useParams } from 'next/navigation';
import AdminInputForm from './AdminInputForm';
import Title from './AdminTitle';

export default function AdminForm() {
  const params = useParams();
  const userId = params.userId as string;

  return (
    <div className='flex justify-between'>
      <div className='w-1/2 px-6 space-y-6'>
        <Title text='고객 정보' />
        <CounselDetail userId={userId} />
      </div>
      <div className='w-1/2 px-6 space-y-6'>
        <Title text='상담 정보' />
        <AdminInputForm />
      </div>
    </div>
  );
}
