'use client';

import { useState } from 'react';

interface PasswordKeypadProps {
  hadleSubmit: (password: string[]) => void;
}

export default function PasswordKeypad({ hadleSubmit }: PasswordKeypadProps) {
  const [password, setPassword] = useState<string[]>([]);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'delete'];

  const handleNumberClick = (num: number | string) => {
    if (num === 'delete') {
      setPassword((prev) => prev.slice(0, -1));
      return;
    }

    if (num === '') return; // 빈 버튼

    if (password.length >= 6) return; // 최대 6자리

    setPassword((prev) => [...prev, num.toString()]);
  };

  return (
    <>
      {/* 비밀번호 표시 영역 */}
      <div className='flex justify-center gap-3 mb-8'>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              password[index] ? 'bg-main-green' : 'bg-sub-green'
            }`}
          />
        ))}
      </div>

      {/* 키패드 */}
      <div className='grid grid-cols-3 gap-3'>
        {numbers.map((num, index) => (
          <button
            key={index}
            onClick={() => handleNumberClick(num)}
            className={`
                h-16 w-20 rounded-lg text-2xl font-semibold bg-white
                ${num === '' ? 'cursor-default' : ''}
                transition-colors focus:outline-none
              `}
            disabled={num === null}
          >
            {num === 'delete' ? '←' : num}
          </button>
        ))}
      </div>

      {/* 확인 버튼 */}
      <button
        onClick={() => hadleSubmit(password)}
        className='w-[290px] mt-6 h-10 bg-main-green text-white text-lg rounded-lg'
      >
        확인
      </button>
    </>
  );
}
