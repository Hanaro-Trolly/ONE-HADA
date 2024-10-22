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
    <form onSubmit={handleSubmit}>
      <input ref={idRef} type='text' placeholder='ID' required />
      <input
        ref={passwordRef}
        type='password'
        placeholder='Password'
        required
      />
      <button type='submit'>Login</button>
      {message && <div>{message}</div>}
    </form>
  );
}
