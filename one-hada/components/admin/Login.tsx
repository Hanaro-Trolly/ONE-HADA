'use client';

import { useAdminSession } from '@/context/admin/SessionContext';
import { IoWarningOutline } from 'react-icons/io5';
import Image from 'next/image';
import { useState, useRef, FormEvent } from 'react';

// Types
interface LoginMessage {
  text: string;
  isSuccess: boolean;
}

export default function Login() {
  // Hooks
  const { login } = useAdminSession();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<LoginMessage | null>(null);

  // Handlers
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) return;

    try {
      const success = await login(email, password);
      setMessage({
        text: success
          ? '로그인 성공'
          : '로그인 실패\n이메일 또는 비밀번호를 확인해주세요.',
        isSuccess: success,
      });
    } catch (error) {
      setMessage({
        text: '로그인 중 오류가 발생했습니다.',
        isSuccess: false,
      });
      console.error('Login error:', error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-gray-50 px-28 py-8 rounded-xl shadow-lg'>
        <header className='text-center'>
          <Image
            src='/images/one-hada.png'
            alt='One Hada Logo'
            width={200}
            height={80}
            className='mx-auto mb-6'
            priority
          />
          <h1 className='mt-6 text-3xl font-semibold text-main-green'>
            관리자 로그인
          </h1>
          <p className='mt-2 text-sm text-gray-600'>
            서비스 관리를 위해 로그인해주세요
          </p>
        </header>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm space-y-4'>
            <div>
              <label htmlFor='email' className='sr-only'>
                이메일
              </label>
              <input
                ref={emailRef}
                id='email'
                name='email'
                type='email'
                required
                className='input-field'
                placeholder='이메일을 입력하세요'
                aria-label='이메일 입력'
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                비밀번호
              </label>
              <input
                ref={passwordRef}
                id='password'
                name='password'
                type='password'
                required
                className='input-field'
                placeholder='비밀번호를 입력하세요'
                aria-label='비밀번호 입력'
              />
            </div>
          </div>

          <button
            type='submit'
            className='group login-button'
            aria-label='로그인'
          >
            <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
              <svg
                className='h-5 w-5 text-main-green/80 group-hover:text-main-green/50'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            로그인
          </button>
        </form>
        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm text-center break-words w-[120%] -ml-[10%] ${
              message.isSuccess
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
            role='alert'
          >
            {message.isSuccess ? (
              message.text
            ) : (
              <>
                <div className='flex justify-center text-2xl mb-3'>
                  <IoWarningOutline />
                </div>
                <div>로그인 실패</div>
                <div>이메일 또는 비밀번호를 확인해주세요.</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
