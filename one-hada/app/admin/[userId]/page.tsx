'use client';

import CounselDetail from '@/components/admin/CounselDetail';
import { useParams } from 'next/navigation';

export default function UserCounselPage() {
  const params = useParams();
  const userId = params.userId as string;

  return (
    <div className='w-full'>
      <CounselDetail userId={userId} />
    </div>
  );
}
