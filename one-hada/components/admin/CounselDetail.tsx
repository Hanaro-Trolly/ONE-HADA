'use client';

import { Counsel, UserData } from '@/app/admin/types/adminTypes';
import { useCounsel } from '@/context/admin/CounselContext';
import { useAdminSession } from '@/context/admin/SessionContext';
import { IoEye, IoFemale, IoMale } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { fetchUserData } from '@/lib/adminApi';
import AdminCard from './AdminCard';
import AdminInfo from './AdminInfo';
import Modal from './Modal';
import RealTimeLog from './RealTimeLog';

interface CounselDetailProps {
  userId: string;
}

export default function CounselDetail({ userId }: CounselDetailProps) {
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { counselData } = useCounsel();
  const { session } = useAdminSession();

  const decodedUserId = decodeURIComponent(userId);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetchUserData(decodedUserId);
        if (response.code === 200 && response.data) {
          setUserData({
            birth: response.data.userBirth,
            phone: response.data.userPhone,
            name: response.data.userName,
            gender:
              response.data.userGender === 'male'
                ? 'M'
                : response.data.userGender === 'female'
                  ? 'F'
                  : null,
          });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    loadUserData();
  }, [decodedUserId]);

  const userCounsels = counselData
    .filter(
      (item: Counsel) =>
        item.agent_id === session.loginUser?.id &&
        item.user_id === decodedUserId
    )
    .sort(
      (a: Counsel, b: Counsel) =>
        new Date(b.consultation_date).getTime() -
        new Date(a.consultation_date).getTime()
    );

  const getGenderIcon = () => {
    switch (userData?.gender) {
      case 'M':
        return <IoMale className='text-blue-500' size={24} />;
      case 'F':
        return <IoFemale className='text-pink-500' size={24} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <div className='space-y-4'>
          <div className='flex justify-between'>
            <div className='flex'>
              <h2 className='text-2xl font-medium'>
                {userData?.name || decodedUserId} 님
              </h2>
              <div className='ml-2 mt-1'>{getGenderIcon()}</div>
            </div>

            <button
              onClick={() => setIsLogOpen(true)}
              className='flex items-center gap-2 rounded-lg bg-[#61B89F] px-4 py-2 text-white hover:bg-[#377b68] transition-colors'
              aria-label='고객 사용 로그 보기'
            >
              <IoEye size={20} />
              <span>고객 사용 로그</span>
            </button>
          </div>

          {userData && (
            <AdminInfo birth={userData.birth} phone={userData.phone} />
          )}

          {userCounsels.map((counsel: Counsel) => (
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
        isOpen={isLogOpen}
        onClose={() => setIsLogOpen(false)}
        title='고객 사용 로그'
      >
        <RealTimeLog userId={decodedUserId} userName={userData?.name || ''} />
      </Modal>
    </>
  );
}
