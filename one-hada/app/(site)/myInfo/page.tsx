'use client';

import EditButtons from '@/components/myInfo/EditButtons';
import LoginPrompt from '@/components/myInfo/LoginPrompt';
import ProfileContent from '@/components/myInfo/ProfileContent';
import WithdrawButton from '@/components/myInfo/WithdrawButton';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import { getData, updateData } from '@/lib/api';
import { User } from '@/lib/datatypes';

export default function MyInfoPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);

  const phoneNumberRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (session?.user) {
      const loadUserProfile = async () => {
        try {
          const data = await getData<User>('user', session.user.id);
          setUserProfile(data);
          if (data) {
            phoneNumberRef.current!.value = data.user_phone;
            addressRef.current!.value = data.user_address;
          }
        } catch (error) {
          console.error('Failed to load user data:', error);
        }
      };
      loadUserProfile();
    }
  }, [session]);

  const handleSave = async () => {
    const phoneNumber = phoneNumberRef.current?.value;
    const address = addressRef.current?.value;

    if (!phoneNumber || !address) {
      (phoneNumber ? addressRef.current : phoneNumberRef.current)?.focus();
      return;
    }

    if (session?.user && userProfile) {
      try {
        await updateData<User>('user', session.user.id, {
          ...userProfile,
          user_phone: phoneNumber,
          user_address: address,
        });
        setUserProfile((prev) => ({
          ...prev!,
          user_phone: phoneNumber,
          user_address: address,
        }));
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleCancel = () => {
    if (userProfile) {
      phoneNumberRef.current!.value = userProfile.user_phone;
      addressRef.current!.value = userProfile.user_address;
    }
    setIsEditing(false);
  };

  const handleEdit = () => setIsEditing(true);

  return (
    <div className='bg-[#DCEFEA] w-full overflow-y-scroll mt-3 shadow-sm'>
      {session?.user ? (
        <div className='pb-4'>
          <div className='mx-6 px-5 flex flex-col justify-center'>
            <div className='flex items-center h-14 text-[#635666]'>
              <label className='text-xl text-[#698596] font-semibold'>
                {userProfile?.user_name}
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
              <WithdrawButton />
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
