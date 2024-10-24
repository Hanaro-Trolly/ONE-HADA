'use client';

import adminData from '@/app/admin/data/AdminData.json';
import { useCounsel } from '@/context/admin/CounselContext';
import { useAdminSession } from '@/context/admin/SessionContext';
import { useRouter } from 'next/navigation';
// navigation으로 변경
import { useEffect, useState } from 'react';

export default function AdminHeader() {
  const router = useRouter();
  const { setCounselData, counselData, setSelectedUserId } = useCounsel();
  const [uniqueUsers, setUniqueUsers] = useState<string[]>([]);
  const { session } = useAdminSession();

  useEffect(() => {
    setCounselData(adminData.counsel);
  }, [setCounselData]); // 의존성 배열에 setCounselData 추가

  useEffect(() => {
    if (counselData.length > 0 && session.loginUser?.id) {
      const filteredUsers = counselData
        .filter((item) => item.agentid === session.loginUser?.id)
        .map((item) => item.userid)
        .filter((value, index, self) => self.indexOf(value) === index);

      setUniqueUsers(filteredUsers);
    }
  }, [counselData, session.loginUser?.id]);

  if (!session.loginUser) {
    return (
      <p className='align-middle text-center text-gray-500 py-4'>
        로그인 하세요.
      </p>
    );
  }

  // components/admin/AdminHeader.tsx
  const handleUserClick = (userid: string) => {
    setSelectedUserId(userid);
    // URL 인코딩 처리
    const encodedUserId = encodeURIComponent(userid);
    router.push(`/admin/${encodedUserId}`, { scroll: false });
  };

  return (
    <div className='p-4 bg-gray-50'>
      <h2 className='text-xl font-bold mb-4'>목록</h2>
      <div className='divide-y divide-gray-200'>
        {uniqueUsers.map((userid) => {
          const latestCounsel = counselData
            .filter(
              (item) =>
                item.agentid === session.loginUser?.id && item.userid === userid
            )
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )[0];

          return (
            <button
              key={userid}
              onClick={() => handleUserClick(userid)}
              className='py-4 w-full text-left hover:bg-gray-100 transition-colors duration-200'
            >
              <div className='flex justify-start items-center'>
                <div>
                  <h3 className='font-semibold'>{userid}</h3>
                  <p className='text-sm text-gray-400'>
                    최근 상담: {latestCounsel?.date}
                  </p>
                  <p className='text-sm font-semibold text-gray-600'>
                    제목: {latestCounsel?.title}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {uniqueUsers.length === 0 && (
        <p className='text-center text-gray-500 py-4'>상담 내역이 없습니다.</p>
      )}
    </div>
  );
}
