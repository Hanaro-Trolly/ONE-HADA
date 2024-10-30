'use client';

import SwitchCard from '@/components/molecules/SwitchCard';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon, PencilIcon } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { getData, updateData } from '@/lib/api';
import { User } from '@/lib/datatypes';

export default function SettingsPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [address, setAddress] = useState<string>();
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (session?.user) {
          const data = await getData<User>('user', session.user.id);
          if (data) {
            setUserProfile(data);
            setPhoneNumber(data.user_phone);
            setAddress(data.user_address);
          }
        }
      } catch (error) {
        console.error('유저 정보를 불러오는데 실패했습니다.', error);
      }
    };
    loadUser();
  }, [session]);

  const [isLargeTextMode, setIsLargeTextMode] = useState(false);
  const [isColorBlindMode, setIsColorBlindMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    if (!phoneNumber || !address) {
      (phoneNumber ? addressRef.current : phoneNumberRef.current)?.focus();
      return;
    }
    console.log('🚀 ~ handleSave ~ phoneNumber:', phoneNumber);
    console.log('🚀 ~ handleSave ~ address:', address);
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
    setPhoneNumber(userProfile?.user_phone || '');
    setAddress(userProfile?.user_address || '');
    setIsEditing(false);
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleLargeTextModeChange = () => {
    setIsLargeTextMode((prev) => !prev);
    console.log('🚀 handleLargeTextModeChange', isLargeTextMode);
  };
  const handleColorBlindModeChange = () => {
    console.log('🚀 handleColorBlindModeChange', isColorBlindMode);
    setIsColorBlindMode((prev) => !prev);
  };

  return (
    <>
      <div className='bg-[#DCEFEA] w-full overflow-y-scroll'>
        {session?.user ? (
          <div className='pb-4'>
            <div className='mx-6 px-5 flex flex-col justify-center'>
              <div className='flex items-center h-14'>
                <div className='text=[#635666}'>
                  <label className='text-xl text-[#698596] font-semibold'>
                    {userProfile?.user_name}
                  </label>
                  님{' '}
                </div>
              </div>
              <div className='w-full flex justify-between text-sm pb-2'>
                <div className='flex items-center h-5'>
                  {isEditing ? (
                    <div className='flex gap-1 items-center'>
                      <Button
                        className='px-2 py-1 gap-0  h-5 bg-[#E44B5B] hover:bg-[#B61C2B]'
                        onClick={handleCancel}
                      >
                        취소
                      </Button>
                      <Button
                        className='px-2 py-1 gap-0 h-5 bg-[#5E7887] hover:bg-[#3f505a]'
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
                  <Button
                    variant='ghost'
                    className='px-0 py-0 gap-0 font-normal'
                  >
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
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className='w-full h-full border p-2 rounded-lg resize-none focus:outline-[#61B89F] '
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
          // </div>
        )}
      </div>
      <div>
        <h2 className='mb-2 mt-4 mx-6 px-5 font-semibold text-lg'>모드 설정</h2>
        <SwitchCard
          mode='큰글씨 모드'
          checked={isLargeTextMode}
          checkedChange={handleLargeTextModeChange}
        ></SwitchCard>
        <SwitchCard
          mode='색맹 모드'
          checked={isColorBlindMode}
          checkedChange={handleColorBlindModeChange}
        ></SwitchCard>
      </div>
    </>
  );
}
