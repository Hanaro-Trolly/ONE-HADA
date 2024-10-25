'use client';

import SwitchCard from '@/components/molecules/SwitchCard';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [name] = useState('홍길동');
  const [birthDate] = useState('2000-01-01');
  const [phoneNumber, setPhoneNumber] = useState('010-1234-5678');
  const [address, setAddress] = useState(
    '서울특별시 성동구 아차산로111 우행빌딩 2층'
  );
  const [isLargeTextMode, setIsLargeTextMode] = useState(false);
  const [isColorBlindMode, setIsColorBlindMode] = useState(false);

  return (
    <>
      <div className='bg-[#DCEFEA] pb-4'>
        <div className='w-2/5 h-[14%] mb-4 mx-6 px-5 pt-4'>
          <div className='text=[#635666}'>
            <label className='text-xl text-[#698596] font-semibold'>
              {name}
            </label>
            님{' '}
          </div>
          <div>
            내정보 변경
            <Button variant='ghost' className='[&_svg]:size-4'>
              <PencilIcon />
            </Button>
          </div>
        </div>
        <div className='flex flex-col justify-between bg-white shadow-md rounded-xl mx-6 p-4 px-5'>
          <div>
            <label>생년월일</label>
            <p className='w-full border p-2 rounded-lg'>{birthDate}</p>
          </div>

          <div className='mt-4'>
            <label>전화번호</label>
            <input
              type='text'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className='w-full border p-2 rounded-lg'
            />
          </div>

          <div className='mt-4'>
            <label>주소</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='w-full border p-2 rounded-lg'
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className='mb-4 mt-4 mx-6 px-5'>모드 설정</h2>
        <SwitchCard
          mode='큰글씨 모드'
          checked={isLargeTextMode}
          checkedChange={() => setIsLargeTextMode(!isLargeTextMode)}
        ></SwitchCard>
        <SwitchCard
          mode='색맹 모드'
          checked={isColorBlindMode}
          checkedChange={() => setIsColorBlindMode(!isColorBlindMode)}
        ></SwitchCard>
      </div>
    </>
  );
}
