'use client';

import { useCounsel } from '@/context/admin/CounselContext';
import { useAdminSession } from '@/context/admin/SessionContext';
import { IoEye } from 'react-icons/io5';
import { useState } from 'react';
import AdminCard from './AdminCard';
import AdminInfo from './AdminInfo';
import Modal from './Modal';
import ServicePreview from './ServicePreview';

export default function CounselDetail({ userId }: { userId: string }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { counselData } = useCounsel();
  const { session } = useAdminSession();
  const decodedUserId = decodeURIComponent(userId);

  const userCounsels = counselData
    .filter(
      (item) =>
        item.agentid === session.loginUser?.id && item.userid === decodedUserId
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const { birth, phone } = userCounsels[0] || { birth: '', phone: '' };

  return (
    <>
      <div>
        <div className='space-y-4'>
          <div className='flex justify-between'>
            <h2 className='text-2xl font-medium'>{decodedUserId} 님</h2>
            <button
              onClick={() => setIsPreviewOpen(true)}
              className='flex items-center gap-2 rounded-lg bg-[#61B89F] px-4 py-2 text-white hover:bg-[#377b68] transition-colors'
            >
              <IoEye size={20} />
              <span>화면 보기</span>
            </button>
          </div>

          <AdminInfo birth={birth} phone={phone} />

          {userCounsels.map((counsel) => (
            <AdminCard
              key={counsel.id}
              title={counsel.title}
              content={counsel.content}
              date={counsel.date}
              birth={counsel.birth}
              phone={counsel.phone}
            />
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
