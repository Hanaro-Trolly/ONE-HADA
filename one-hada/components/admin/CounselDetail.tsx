'use client';

import { useCounsel } from '@/context/admin/CounselContext';
import { useAdminSession } from '@/context/admin/SessionContext';
import { IoEye, IoFemale, IoMale } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { fetchAllData } from '@/lib/api';
import AdminCard from './AdminCard';
import AdminInfo from './AdminInfo';
import Modal from './Modal';
import ServicePreview from './ServicePreview';

export default function CounselDetail({ userId }: { userId: string }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [userData, setUserData] = useState<{
    birth: string;
    phone: string;
    name: string;
    gender: string;
  } | null>(null);
  const { counselData } = useCounsel();
  const { session } = useAdminSession();
  const decodedUserId = decodeURIComponent(userId);

  const getGenderIcon = () => {
    if (userData?.gender === '남') {
      return <IoMale className='text-blue-500' size={24} />;
    } else if (userData?.gender === '여') {
      return <IoFemale className='text-pink-500' size={24} />;
    }
    return null;
  };

  // 사용자 데이터 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      const allUsers = await fetchAllData<{
        id: string;
        user_birth: string;
        user_phone: string;
        user_name: string;
        user_gender: string;
      }>('user');
      const currentUser = allUsers.find((user) => user.id === decodedUserId);
      if (currentUser) {
        setUserData({
          birth: currentUser.user_birth,
          phone: currentUser.user_phone,
          name: currentUser.user_name,
          gender: currentUser.user_gender,
        });
      }
    };

    fetchUserData();
  }, [decodedUserId]);

  // 해당 상담원과 사용자에 맞는 상담 데이터 필터링 및 정렬
  const userCounsels = counselData
    .filter(
      (item) =>
        item.agent_id === session.loginUser?.id &&
        item.user_id === decodedUserId
    )
    .sort(
      (a, b) =>
        new Date(b.consultation_date).getTime() -
        new Date(a.consultation_date).getTime()
    );

  return (
    <>
      <div>
        <div className='space-y-4'>
          <div className='flex justify-between'>
            <h2 className='text-2xl font-medium'>
              {' '}
              {userData ? `${userData.name}` : `${decodedUserId}`} 님
            </h2>
            <div className='ml-2 mt-1'>{getGenderIcon()}</div>
            <button
              onClick={() => setIsPreviewOpen(true)}
              className='flex items-center gap-2 rounded-lg bg-[#61B89F] px-4 py-2 text-white hover:bg-[#377b68] transition-colors'
            >
              <IoEye size={20} />
              <span>화면 보기</span>
            </button>
          </div>

          {userData && (
            <AdminInfo birth={userData.birth} phone={userData.phone} />
          )}

          {userCounsels.map((counsel) => (
            <AdminCard
              key={counsel.id}
              title={counsel.consultation_title}
              content={counsel.consultation_content}
              date={counsel.consultation_date}
              birth={userData?.birth || ''}
              phone={userData?.phone || ''}
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
