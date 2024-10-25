'use client';

import CounselDetail from '@/components/admin/CounselDetail';
import { useParams } from 'next/navigation';
import AdminInputForm from './AdminInputForm';

export default function AdminForm() {
  const params = useParams();
  const userId = params.userId as string;

  return (
    <div className='flex justify-between'>
      <div className='w-1/2'>
        <CounselDetail userId={userId} />
      </div>
      <div className='w-1/2 '>
        <AdminInputForm />
      </div>
    </div>
  );
}
