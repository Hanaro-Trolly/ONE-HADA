'use client';

import SetPassword from '@/components/auth/SetPassword';
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
import { useRef, useState } from 'react';
import { UserInput } from '@/lib/datatypes';

export default function Register() {
  const { data: session } = useSession();

  const [isPasswordPage, setIsPasswordPage] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const phoneRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const [userGender, setUserGender] = useState<'M' | 'F'>();
  const [userData, setUserData] = useState<UserInput | null>(null);

  const createFormData = (): UserInput => ({
    name: nameRef.current?.value,
    email: session?.user.email,
    gender: userGender,
    birth: birthDateRef.current?.value,
    phone: phoneRefs.map((ref) => ref.current!.value).join('-'),
    address: addressRef.current!.value,
    google: session?.user.provider === 'google' ? session.user.email : null,
    kakao: session?.user.provider === 'kakao' ? session.user.email : null,
    naver: session?.user.provider === 'naver' ? session.user.email : null,
    simplePassword: '',
  });

  const handleCheckForm = () => {
    if (
      nameRef.current?.value &&
      userGender &&
      birthDateRef.current?.value &&
      phoneRefs &&
      addressRef.current?.value
    ) {
      const formData: UserInput = createFormData();
      // 전화번호 형식 검사
      const phoneNumber = formData.phone;
      const phonePattern = /^010-\d{4}-\d{4}$/;

      if (!phonePattern.test(phoneNumber)) {
        alert('전화번호 형식이 올바르지 않습니다. (010-0000-0000)');
        return;
      }

      // 모든 검증을 통과하면 다음 단계로
      setUserData(formData);
      setIsPasswordPage(true);
    } else {
      alert('모든 정보를 입력해주세요');
    }
  };

  return (
    <>
      {isPasswordPage ? (
        <SetPassword userData={userData} setUserData={setUserData} />
      ) : (
        <div
          style={{ height: 'calc(100vh - 56px)' }}
          className='max-w-md mx-auto p-10 flex'
        >
          <div className='flex-1 flex flex-col justify-between'>
            <div className='flex flex-col items-center'>
              <div className='flex items-center mb-2'>
                <h1 className='text-main-green text-2xl font-medium'>
                  원,하다
                </h1>
                <h2 className='text-lg ml-2 flex'>
                  에 오신 것을{' '}
                  <p className='text-main-green ml-2'>환영합니다!</p>
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
                <Select
                  onValueChange={(value: 'M' | 'F') => setUserGender(value)}
                >
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
                onClick={handleCheckForm}
                className='w-full bg-main-green text-white py-2 px-4 rounded-md hover:bg-[#479e86] focus:outline-none focus:ring-2'
              >
                다음
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
