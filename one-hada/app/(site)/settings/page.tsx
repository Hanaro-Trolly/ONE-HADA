'use client';

import { Button } from '@/components/ui/button';
import { ChevronRightIcon, PencilIcon } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { getData, updateData } from '@/lib/api';
import { User } from '@/lib/datatypes';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);

  const phoneNumberRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (session?.user) {
          const data = await getData<User>('user', session.user.id);
          if (data) {
            setUserProfile(data);
            if (phoneNumberRef.current)
              phoneNumberRef.current.value = data.user_phone;
            if (addressRef.current)
              addressRef.current.value = data.user_address;
          }
        }
      } catch (error) {
        console.error('유저 정보를 불러오는데 실패했습니다.', error);
      }
    };
    loadUser();
  }, [session]);

  const handleSave = async () => {
    const phoneNumber = phoneNumberRef.current?.value;
    const address = addressRef.current?.value;

    if (!phoneNumber || !address) {
      (phoneNumber ? addressRef.current : phoneNumberRef.current)?.focus();
      return;
    }

    const userId = session?.user?.id;
    try {
      if (userId && userProfile) {
        await updateData<User>('user', userId, {
          ...userProfile,
          user_phone: phoneNumber,
          user_address: address,
        });
        setUserProfile((prev) => ({
          ...prev!,
          user_phone: phoneNumber,
          user_address: address,
        }));
      }
    } catch (error) {
      console.error('Error updating Profile:', error);
      alert('내 정보 변경에 실패했습니다..');
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (userProfile) {
      if (phoneNumberRef.current)
        phoneNumberRef.current.value = userProfile.user_phone;
      if (addressRef.current)
        addressRef.current.value = userProfile.user_address;
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className='bg-[#DCEFEA] w-full overflow-y-scroll mt-3 shadow-sm'>
      {session?.user ? (
        <div className='pb-4'>
          <div className='mx-6 px-5 flex flex-col justify-center'>
            <div className='flex items-center h-14'>
              <div className='text-[#635666]'>
                <label className='text-xl text-[#698596] font-semibold'>
                  {userProfile?.user_name}
                </label>
                님{' '}
              </div>
            </div>
            <div className='w-full flex justify-between text-sm pb-2'>
              <div className='flex items-center h-5'>
                {isEditing ? (
                  <div className='flex gap-4 items-center'>
                    <Button
                      variant='ghost'
                      className='px-0 py-1 gap-0 h-5'
                      onClick={handleCancel}
                    >
                      취소
                    </Button>
                    <Button
                      variant='ghost'
                      className='px-0 py-1 gap-0 h-5'
                      onClick={handleSave}
                    >
                      완료
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant='ghost'
                    className='px-0 py-0 gap-0 font-normal'
                    onClick={handleEdit}
                  >
                    내정보 변경 <PencilIcon />
                  </Button>
                )}
              </div>
              <div className='flex items-center h-5 text-gray-500'>
                <Button variant='ghost' className='px-0 py-0 gap-0 font-normal'>
                  회원탈퇴
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-between bg-white shadow-md rounded-xl mx-6 p-4 px-5'>
            <div>
              <label className='font-medium'>생년월일</label>
              <p className='w-full border p-2 rounded-lg'>
                {userProfile?.user_birth}
              </p>
            </div>

            <div className='mt-4'>
              <label className='font-medium'>전화번호</label>
              {isEditing ? (
                <input
                  ref={phoneNumberRef}
                  type='tel'
                  defaultValue={userProfile?.user_phone || ''}
                  className='w-full border p-2 rounded-lg focus:outline-[#61B89F]'
                />
              ) : (
                <p className='w-full border p-2 rounded-lg'>
                  {userProfile?.user_phone}
                </p>
              )}
            </div>

            <div className='mt-4'>
              <label className='font-medium'>주소</label>
              <div className='w-full h-16'>
                {isEditing ? (
                  <textarea
                    ref={addressRef}
                    defaultValue={userProfile?.user_address || ''}
                    className='w-full h-full border p-2 rounded-lg resize-none focus:outline-[#61B89F]'
                  />
                ) : (
                  <p className='w-full h-full border p-2 rounded-lg'>
                    {userProfile?.user_address}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex items-center'>
          <div className='mx-6 px-5 h-14 w-full flex justify-between items-center'>
            로그인을 해주세요.
            <div className='flex items-center h-5 text-gray-500'>
              <Button
                variant='ghost'
                className='px-0 py-0 gap-0 font-normal'
                onClick={() => {
                  signIn();
                }}
              >
                로그인
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
