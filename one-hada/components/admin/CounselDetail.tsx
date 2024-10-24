'use client';

import { useCounsel } from '@/context/admin/CounselContext';
import { useAdminSession } from '@/context/admin/SessionContext';
import { IoEye } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import ServicePreview from './ServicePreview';

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
    <>
      <div className='p-6'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>{decodedUserId}님의 상담 내역</h2>
          <button
            onClick={() => setIsPreviewOpen(true)}
            className='flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors'
          >
            <IoEye size={20} />
            <span>화면 보기</span>
          </button>
        </div>
        <div className='space-y-4'>
          {userCounsels.map((counsel) => (
            <div
              key={counsel.id}
              className='rounded-lg border bg-white p-6 shadow-sm'
            >
              <div className='mb-2 flex items-start justify-between'>
                <h3 className='text-lg font-semibold'>{counsel.title}</h3>
                <span className='text-sm text-gray-500'>{counsel.date}</span>
              </div>
              <p className='text-gray-700'>{counsel.content}</p>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title='서비스 화면 미리보기'
      >
        <ServicePreview userId={decodedUserId} />
      </Modal>
    </>
  );
}
