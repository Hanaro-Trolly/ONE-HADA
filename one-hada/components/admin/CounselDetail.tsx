'use client';

import { useCounsel } from '@/context/admin/CounselContext';
import { useAdminSession } from '@/context/admin/SessionContext';
import { useEffect } from 'react';

// components/admin/CounselDetail.tsx

// components/admin/CounselDetail.tsx

export default function CounselDetail({ userId }: { userId: string }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { counselData, setSelectedUserId } = useCounsel();
  const { session } = useAdminSession();

  // URL 디코딩 추가
  const decodedUserId = decodeURIComponent(userId);

  useEffect(() => {
    setSelectedUserId(decodedUserId);
  }, [decodedUserId, setSelectedUserId]);

  const userCounsels = counselData
    .filter(
      (item) =>
        item.agentid === session.loginUser?.id && item.userid === decodedUserId
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-6'>{decodedUserId}님의 상담 내역</h2>
      <div className='space-y-4'>
        {userCounsels.map((counsel) => (
          <div
            key={counsel.id}
            className='bg-white p-6 rounded-lg shadow-sm border'
          >
            <div className='flex justify-between items-start mb-2'>
              <h3 className='text-lg font-semibold'>{counsel.title}</h3>
              <span className='text-sm text-gray-500'>{counsel.date}</span>
            </div>
            <p className='text-gray-700'>{counsel.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
