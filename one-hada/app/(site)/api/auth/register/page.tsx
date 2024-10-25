'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef } from 'react';

export default function Register() {
  // const { data: session } = useSession();
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLButtonElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const phone1Ref = useRef<HTMLInputElement>(null);
  const phone2Ref = useRef<HTMLInputElement>(null);
  const phone3Ref = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = {
    //   name: nameRef.current?.value,
    //   gender: genderRef.current?.value,
    //   birthDate: birthDateRef.current?.value,
    //   phone: [
    //     phone1Ref.current?.value,
    //     phone2Ref.current?.value,
    //     phone3Ref.current?.value,
    //   ].join('-'),
    //   address: addressRef.current?.value,
    //   email: session?.user?.email,
    // };

    // 사용자가 입력한 정보 DB로 전송
    console.log('사용자 정보를 전송했습니다!');
    router.push('/');
  };

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='max-w-md mx-auto p-10 flex'
    >
      <form
        onSubmit={handleSubmit}
        className='felx-1 flex flex-col justify-between'
      >
        <div className='flex flex-col items-center '>
          <div className='flex items-center mb-2'>
            <h1 className='text-main-green text-2xl font-medium'>원,하다</h1>
            <h2 className='text-lg ml-2 flex'>
              에 오신 것을 <p className='text-main-green ml-2'>환영합니다!</p>
            </h2>
          </div>
          <h3 className='text-md mt-1'>가입을 위한 정보를 입력해주세요</h3>
        </div>

        <div className='space-y-6'>
          <div className='flex items-center justify-center'>
            <label htmlFor='name' className='w-20 block text-md '>
              이름
            </label>
            <input
              type='text'
              id='name'
              ref={nameRef}
              required
              className=' flex-1 px-3 py-2 text-md rounded-xl shadow-sm focus:outline-none '
            />
          </div>

          <div className='flex items-center justify-center'>
            <label htmlFor='gender' className='w-20 block text-md '>
              성별
            </label>
            <Select>
              <SelectTrigger
                id='gender'
                ref={genderRef}
                className='flex-1 px-3 py-2 h-11 text-md data-[placeholder]:text-gray-400 data-[placeholder]:font-light bg-white rounded-xl shadow-sm focus:outline-none border-0 ring-0'
              >
                <SelectValue placeholder='선택해주세요' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='male'>남성</SelectItem>
                <SelectItem value='female'>여성</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center justify-center'>
            <label htmlFor='birthDate' className='w-20 block text-md mb-2'>
              생년월일
            </label>
            <input
              type='date'
              id='birthDate'
              ref={birthDateRef}
              data-placeholder='날짜 선택'
              required
              className='flex-1 px-3 py-2 data-[placeholder]:text-gray-400 rounded-xl shadow-sm focus:outline-none'
            />
          </div>

          <div className='flex items-center justify-center'>
            <label htmlFor='phone' className='w-20 block text-md mb-2'>
              연락처
            </label>
            <div className='flex-1 flex items-center justify-center'>
              <input
                type='tel'
                id='phone1'
                ref={phone1Ref}
                placeholder='010'
                required
                className='w-full px-3 py-2  rounded-xl shadow-sm focus:outline-none'
              />
              <p className='mx-2'>-</p>
              <input
                type='tel'
                id='phone2'
                ref={phone2Ref}
                placeholder='1234'
                required
                className='w-full px-3 py-2  rounded-xl shadow-sm focus:outline-none'
              />
              <p className='mx-2'>-</p>
              <input
                type='tel'
                id='phone3'
                ref={phone3Ref}
                placeholder='5678'
                required
                className='w-full px-3 py-2  rounded-xl shadow-sm focus:outline-none'
              />
            </div>
          </div>

          <div className='flex items-start justify-center'>
            <label htmlFor='address' className='w-20 block text-md mb-2'>
              주소
            </label>
            <textarea
              id='address'
              ref={addressRef}
              required
              rows={2} // 기본 줄 수 설정
              className='flex-1 px-3 py-2 rounded-xl shadow-sm focus:outline-none resize-none  overflow-hidden'
            />
          </div>
        </div>
        <div>
          <button
            type='submit'
            className='w-full bg-main-green text-white py-2 px-4 rounded-md hover:bg-[#479e86] focus:outline-none focus:ring-2'
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
