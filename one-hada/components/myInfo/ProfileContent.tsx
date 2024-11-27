import React from 'react';

interface ProfileContentProps {
  isEditing: boolean;
  userProfile: any;
  phoneNumberRef: React.RefObject<HTMLInputElement>;
  addressRef: React.RefObject<HTMLTextAreaElement>;
}

const ProfileContent = ({
  isEditing,
  userProfile,
  phoneNumberRef,
  addressRef,
}: ProfileContentProps) => {
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');

    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return cleaned;
  };
  return (
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
  );
};

export default ProfileContent;
