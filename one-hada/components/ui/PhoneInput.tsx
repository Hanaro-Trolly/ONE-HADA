import React from 'react';

interface PhoneFieldProps {
  refs: React.Ref<HTMLInputElement>[]; // refs 배열의 타입 정의
}

export default function PhoneField({ refs }: PhoneFieldProps) {
  return (
    <div className='flex items-center justify-center'>
      <label htmlFor='phone' className='w-20 block text-md mb-2'>
        연락처
      </label>
      <div className='flex-1 flex items-center justify-center'>
        {refs.map((ref, index) => (
          <React.Fragment key={index}>
            <input
              type='tel'
              ref={ref}
              placeholder={index === 0 ? '010' : index === 1 ? '1234' : '5678'}
              required
              className='w-full px-3 py-2 rounded-xl shadow-sm focus:outline-none'
            />
            {index < refs.length - 1 && <p className='mx-2'>-</p>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
