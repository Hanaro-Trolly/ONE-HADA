'use client';

import PhoneField from '@/components/ui/PhoneInput';
import InputField from '@/components/ui/labelInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';

export default function Register() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const phoneRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const [userGender, setUserGender] = useState<string>('');

  const login = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: session?.user.provider,
          email: session?.user.email,
        }),
      });

      const data = await response.json();

      if (data.code == 200 && data.status === 'EXIST') {
        try {
          await update({
            id: data.id,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const createFormData = () => ({
    name: nameRef.current!.value,
    gender: userGender,
    birth: birthDateRef.current!.value,
    phone: phoneRefs.map((ref) => ref.current!.value).join('-'),
    address: addressRef.current!.value,
    google: session?.user.provider === 'google' ? session.user.email : null,
    kakao: session?.user.provider === 'kakao' ? session.user.email : null,
    naver: session?.user.provider === 'naver' ? session.user.email : null,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = createFormData();
    //[todo] //기존에 있는 유저가 다른 소셜 로그인으로 로그인(계정과 연동)
    try {
      const response = await fetch(`http://localhost:8080/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      if (data.status == 'EXIST') {
        alert('기존 계정과 연동하였습니다');
        login();
        router.push('/');
      } else if (data.status == 'NEW') {
        alert('회원등록에 성공하였습니다');
        const route: string = '/api/auth/checkPassword';
        router.push(`/api/auth/register/setPassword?route=${route}`);
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생', error);
    }
  };

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='max-w-md mx-auto p-10 flex'
    >
      <form
        onSubmit={handleSubmit}
        className='flex-1 flex flex-col justify-between'
      >
        <div className='flex flex-col items-center'>
          <div className='flex items-center mb-2'>
            <h1 className='text-main-green text-2xl font-medium'>원,하다</h1>
            <h2 className='text-lg ml-2 flex'>
              에 오신 것을 <p className='text-main-green ml-2'>환영합니다!</p>
            </h2>
          </div>
          <h3 className='text-md mt-1'>가입을 위한 정보를 입력해주세요</h3>
        </div>

        <div className='space-y-6'>
          <InputField
            label='이름'
            type='text'
            ref={nameRef}
            labelClassName='w-20 block text-md'
            inputClassName='flex-1 px-3 py-2 text-md rounded-xl shadow-sm focus:outline-none'
          />

          <div className='flex items-center justify-center'>
            <label htmlFor='gender' className='w-20 block text-md'>
              성별
            </label>
            <Select onValueChange={setUserGender}>
              <SelectTrigger
                id='gender'
                className='flex-1 px-3 py-2 h-11 text-md data-[placeholder]:text-gray-400 data-[placeholder]:font-light bg-white rounded-xl shadow-sm focus:outline-none border-0 ring-0'
              >
                <SelectValue placeholder='선택해주세요' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='M'>남성</SelectItem>
                <SelectItem value='F'>여성</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <InputField
            label='생년월일'
            type='date'
            ref={birthDateRef}
            labelClassName='w-20 block text-md'
            inputClassName='flex-1 px-3 py-2 text-md rounded-xl shadow-sm focus:outline-none'
          />
          <PhoneField refs={phoneRefs} />
          <div className='flex items-start justify-center'>
            <label htmlFor='address' className='w-20 block text-md mb-2'>
              주소
            </label>
            <textarea
              id='address'
              ref={addressRef}
              required
              rows={2}
              className='flex-1 px-3 py-2 rounded-xl shadow-sm focus:outline-none resize-none overflow-hidden'
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
