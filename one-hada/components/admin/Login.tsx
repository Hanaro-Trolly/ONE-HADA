import { useAdminSession } from '@/context/admin/SessionContext';
import { useState } from 'react';
import { FormEvent } from 'react';
import { useRef } from 'react';

export default function Login() {
  const { login } = useAdminSession();
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const id = idRef.current?.value;
    const password = passwordRef.current?.value;

    if (id && password) {
      const success = login(id, password);
      if (success) {
        setMessage('로그인 성공');
      } else {
        setMessage('로그인 실패, 아이디 또는 비밀번호를 확인해주세요.');
      }
    }
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <div className='flex flex-col space-y-2 mb-11'>
        <input
          className='border px-1 py-1'
          ref={idRef}
          type='text'
          placeholder='ID'
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
      {message && <div>{message}</div>}
    </form>
  );
}
