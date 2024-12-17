'use client';

import EditButtons from '@/components/myInfo/EditButtons';
import LoginPrompt from '@/components/myInfo/LoginPrompt';
import ProfileContent from '@/components/myInfo/ProfileContent';
import WithdrawButton from '@/components/myInfo/WithdrawButton';
import { useFetch } from '@/hooks/useFetch';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { User } from '@/lib/datatypes';

export default function MyInfoPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const { fetchData } = useFetch<User>();
  const phoneNumberRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSave = async () => {
    const phoneNumber = phoneNumberRef.current?.value;
    const address = addressRef.current?.value;

    if (!phoneNumber || !address) {
      (phoneNumber ? addressRef.current : phoneNumberRef.current)?.focus();
      return;
    }

    if (session?.accessToken) {
      try {
        await fetchData('/api/user', {
          method: 'PATCH',
          token: session.accessToken,
          body: {
            ...userProfile,
            userPhone: phoneNumber,
            userAddress: address,
          },
        });
        setUserProfile((prev) => ({
          ...prev!,
          userPhone: phoneNumber,
          userAddress: address,
        }));
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleCancel = () => {
    if (userProfile) {
      phoneNumberRef.current!.value = userProfile.userPhone;
      addressRef.current!.value = userProfile.userAddress;
    }
    setIsEditing(false);
  };

  const handleWithDraw = useCallback(async () => {
    const response = await fetchData('/api/user', {
      method: 'DELETE',
      token: session?.accessToken,
    });
    if (response.code === 200) {
      signOut();
    }
  }, [fetchData, session?.accessToken]);

  const handleEdit = useCallback(() => setIsEditing(true), []);

  useEffect(() => {
    if (session?.accessToken) {
      const loadUserProfile = async () => {
        try {
          const response = await fetchData('/api/user', {
            method: 'GET',
            token: session.accessToken,
          });
          if (response.code === 200) {
            setUserProfile(response.data);
          }
        } catch (error) {
          console.error('Failed to load user data:', error);
        }
      };
      loadUserProfile();
    }
  }, [fetchData, session]);

  return (
    <div className='bg-[#DCEFEA] w-full overflow-y-scroll mt-3 shadow-sm'>
      {session?.user ? (
        <div className='pb-4'>
          <div className='mx-6 px-5 flex flex-col justify-center'>
            <div className='flex items-center h-14 text-[#635666]'>
              <label className='text-xl text-[#698596] font-semibold'>
                {userProfile?.userName}
              </label>{' '}
              님
            </div>
            <div className='w-full flex justify-between text-sm pb-2'>
              <EditButtons
                isEditing={isEditing}
                handleSave={handleSave}
                handleCancel={handleCancel}
                handleEdit={handleEdit}
              />
              <WithdrawButton handleWithDraw={handleWithDraw} />
            </div>
          </div>
          <ProfileContent
            isEditing={isEditing}
            userProfile={userProfile!}
            phoneNumberRef={phoneNumberRef}
            addressRef={addressRef}
          />
        </div>
      ) : (
        <LoginPrompt />
      )}
    </div>
  );
}
