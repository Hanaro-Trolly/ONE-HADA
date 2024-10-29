import { useAdminSession } from '@/context/admin/SessionContext';
import Image from 'next/image';
import { useState, useRef, FormEvent } from 'react';

export default function Login() {
  const { login } = useAdminSession();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      try {
        const success = await login(email, password);
        if (success) {
          setMessage('로그인 성공');
        } else {
          setMessage('로그인 실패, 이메일 또는 비밀번호를 확인해주세요.');
        }
      } catch (error) {
        setMessage('로그인 중 오류가 발생했습니다.');
        console.error('Login error:', error);
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-gray-50 p-8 rounded-xl shadow-lg'>
        <div>
          <div className='flex justify-center'>
            <Image
              src='/images/one-hada.png'
              alt='One Hada Logo'
              width={200} // 로고 크기에 맞게 조절
              height={80} // 로고 크기에 맞게 조절
              className='mb-6' // 로고와 텍스트 사이 간격
              priority // 로고를 우선적으로 로드
            />
          </div>
          <h2 className='mt-6 text-center text-3xl font-semibold text-main-green'>
            관리자 로그인
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            서비스 관리를 위해 로그인해주세요
          </p>
        </div>

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
                className='appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green focus:border-main-green focus:z-10 sm:text-sm transition-all duration-200'
                placeholder='이메일을 입력하세요'
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
                className='appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green focus:border-main-green focus:z-10 sm:text-sm transition-all duration-200'
                placeholder='비밀번호를 입력하세요'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-green hover:bg-main-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-green transition-all duration-200'
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
          </div>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm text-center ${
              message.includes('성공')
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
