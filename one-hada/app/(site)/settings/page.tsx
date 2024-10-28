'use client';

import SwitchCard from '@/components/molecules/SwitchCard';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon, PencilIcon } from 'lucide-react';
import { useRef, useState } from 'react';

export default function SettingsPage() {
  const initialPhoneNumber = '010-1234-5678';
  const initialAddress = '서울특별시 성동구 아차산로111 우행빌딩 2층';
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);

  const [isLogined] = useState(true);
  const name = '홍길동';
  const birthDate = '2000-01-01';
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [address, setAddress] = useState(initialAddress);
  const [isLargeTextMode, setIsLargeTextMode] = useState(false);
  const [isColorBlindMode, setIsColorBlindMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    const phoneInputValue = phoneNumberRef.current?.value;
    const addressInputValue = addressRef.current?.value;

    if (!phoneInputValue || !addressInputValue) {
      if (!phoneInputValue) {
        phoneNumberRef.current?.focus();
      } else {
        addressRef.current?.focus();
      }
      return;
    }
    console.log('🚀 ~ handleSave ~ phoneInputValue:', phoneInputValue);
    console.log('🚀 ~ handleSave ~ addressInputValue:', addressInputValue);

    //데이터 전송 로직 추가
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPhoneNumber(initialPhoneNumber);
    setAddress(initialAddress);
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
      <div className='bg-[#DCEFEA] pb-4'>
        {isLogined ? (
          <div>
            <div className='h-[14%] mb-2 mx-6 px-5 pt-4'>
              <div className='text=[#635666}'>
                <label className='text-xl text-[#698596] font-semibold'>
                  {name}
                </label>
                님{' '}
              </div>
              <div className='w-full flex justify-between text-sm pt-1'>
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
                <label>생년월일</label>
                <p className='w-full border p-2 rounded-lg'>{birthDate}</p>
              </div>

              <div className='mt-4'>
                <label>전화번호</label>
                {isEditing ? (
                  <input
                    ref={phoneNumberRef}
                    type='tel'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className='w-full border p-2 rounded-lg'
                  />
                ) : (
                  <p className='w-full border p-2 rounded-lg'>{phoneNumber}</p>
                )}
              </div>

              <div className='mt-4'>
                <label>주소</label>
                <div className='w-full h-16'>
                  {isEditing ? (
                    <textarea
                      ref={addressRef}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className='w-full h-full border p-2 rounded-lg resize-none'
                    />
                  ) : (
                    <p className='w-full h-full border p-2 rounded-lg'>
                      {address}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='pt-4 h-32 flex items-center justify-center '>
            로그인을 해주세요.
          </div>
        )}
      </div>
      <div>
        <h2 className='mb-4 mt-4 mx-6 px-5'>모드 설정</h2>
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
