import { useAdminSession } from '@/context/admin/SessionContext';
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
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <div className='flex flex-col space-y-2 mb-11'>
        <input
          className='border px-1 py-1'
          ref={emailRef}
          type='email'
          placeholder='Email'
          required
        />
        <input
          className='border px-1 py-1'
          ref={passwordRef}
          type='password'
          placeholder='Password'
          required
        />
      </div>
      <button
        className='flex justify-center items-center gap-2 rounded-lg bg-[#61B89F] px-4 py-2 text-white hover:bg-[#377b68] transition-colors'
        type='submit'
      >
        Login
      </button>
      {message && <div className='mt-4 text-center'>{message}</div>}
    </form>
  );
}
