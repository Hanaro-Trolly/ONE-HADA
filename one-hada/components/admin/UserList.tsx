'use client';

import adminData from '@/app/admin/data/AdminData.json';
import { useAdminSession } from '@/context/admin/SessionContext';
import { useEffect, useState } from 'react';

// JSON 파일을 직접 import

interface Counsel {
  id: number;
  agentid: string;
  userid: string;
  title: string;
  content: string;
  date: string;
}

export default function UserList() {
  const [counselData, setCounselData] = useState<Counsel[]>([]);
  const [uniqueUsers, setUniqueUsers] = useState<string[]>([]);
  const { session } = useAdminSession();

  useEffect(() => {
    setCounselData(adminData.counsel);
  }, []);

  useEffect(() => {
    if (counselData.length > 0 && session.loginUser?.id) {
      const filteredUsers = counselData
        .filter((item) => item.agentid === session.loginUser?.id)
        .map((item) => item.userid)
        .filter((value, index, self) => self.indexOf(value) === index);

      setUniqueUsers(filteredUsers);
    }
  }, [counselData, session.loginUser?.id]);

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>상담 고객 목록</h2>
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
            <div key={userid} className='py-4'>
              <div className='flex justify-between items-center'>
                <div>
                  <h3 className='font-semibold'>{userid}</h3>
                  <p className='text-sm text-gray-600'>
                    최근 상담: {latestCounsel?.date}
                  </p>
                  <p className='text-sm text-gray-600'>
                    제목: {latestCounsel?.title}
                  </p>
                </div>
                <div className='text-sm text-gray-500'>
                  상담 건수:{' '}
                  {
                    counselData.filter(
                      (item) =>
                        item.agentid === session.loginUser?.id &&
                        item.userid === userid
                    ).length
                  }
                  건
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {uniqueUsers.length === 0 && (
        <p className='text-center text-gray-500 py-4'>상담 내역이 없습니다.</p>
      )}
    </div>
  );
}
