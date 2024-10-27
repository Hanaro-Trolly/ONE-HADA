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
import useApi from '@/hooks/useApi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, Ref, useRef, useState } from 'react';
import React from 'react';
import { User } from '@/lib/datatypes';

export default function Register() {
  const { data: session } = useSession();
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

  const {
    data: users,
    loading,
    error,
    updateData,
    addData,
  } = useApi<User>('user');

  const createFormData = () => ({
    id: Date.now().toString(),
    user_name: nameRef.current!.value,
    user_gender: userGender,
    user_birth: birthDateRef.current!.value,
    user_phone: phoneRefs.map((ref) => ref.current!.value).join('-'),
    user_address: addressRef.current!.value,
    user_email: session?.user?.email || '',
    user_register: new Date(),
    user_google: session?.user.provider === 'google' ? session.user.id : null,
    user_kakao: session?.user.provider === 'kakao' ? session.user.id : null,
    user_naver: session?.user.provider === 'naver' ? session.user.id : null,
    simple_password: undefined,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = createFormData();

    const existingUser = users.find(
      (user) =>
        user.user_name === formData.user_name &&
        user.user_gender === formData.user_gender &&
        user.user_birth === formData.user_birth &&
        user.user_phone === formData.user_phone
    );

    if (existingUser) {
      try {
        await updateData(existingUser.id, {
          [`user_${session?.user.provider}`]: session?.user.id,
        });
        alert('기존 계정과 연동하였습니다');
        router.push('/');
      } catch (err) {
        console.error('Error updating user:', err);
      }
    } else {
      // 유저가 존재하지 않으면 추가
      try {
        await addData(formData);
        alert('회원등록에 성공하였습니다');
        router.push('/');
      } catch (err) {
        console.error('Error adding user:', err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
            inputRef={nameRef}
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
                <SelectItem value='male'>남성</SelectItem>
                <SelectItem value='female'>여성</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <InputField
            label='생년월일'
            type='date'
            inputRef={birthDateRef}
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
