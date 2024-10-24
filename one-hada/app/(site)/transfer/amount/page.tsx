'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import dummy from '@/c-dummy/account_d.json'

export default function AmountInput() {
  const [amount, setAmount] = useState('');
  const searchParams = useSearchParams();

  const accountId = searchParams.get('account_id');
  const recipientNumber = searchParams.get('recipient_number');
  const bankId = searchParams.get('bank');

  type Bank = {
    bank_id: string;
    bank_name: string;
    bank_code: string;
    logo_url: string;
  };

  const banks: Bank[] = dummy.banks;

  const bankName = banks.find((bank) => bank.bank_id === bankId)?.bank_name || '은행 정보 없음';

  const handleNumberClick = (num: string) => {
    setAmount((prev) => prev + num);
  };

  const handleSpecialAmount = (value: number) => {
    setAmount((prev) => (Number(prev) + value).toString());
  };

  const handleBackspace = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const handleMaxAmount = () => {
    setAmount('5500500'); // 예시로 계좌의 최대 잔액을 사용
  };

  const handleNext = () => {
    alert(`입력한 금액: ${amount}`);
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-center font-bold text-2xl mb-6'>얼마를 보낼까요?</h1>
      <div className='bg-gray-100 p-4 rounded-lg mb-6 text-center'>
        <div className='mb-4'>
          <p>계좌 ID: {accountId}</p>
          <p>수취인 계좌번호: {bankName} {recipientNumber}</p>
          <div className='text-lg font-bold mb-2'>
            내 계좌 {Number(amount).toLocaleString()} 원
          </div>
        </div>

        <div className='flex justify-between mb-4'>
          <button
            onClick={() => handleSpecialAmount(10000)}
            className='p-2 bg-gray-200 rounded'
          >
            +1만
          </button>
          <button
            onClick={() => handleSpecialAmount(50000)}
            className='p-2 bg-gray-200 rounded'
          >
            +5만
          </button>
          <button
            onClick={() => handleSpecialAmount(100000)}
            className='p-2 bg-gray-200 rounded'
          >
            +10만
          </button>
          <button
            onClick={() => handleSpecialAmount(1000000)}
            className='p-2 bg-gray-200 rounded'
          >
            +100만
          </button>
          <button onClick={handleMaxAmount} className='p-2 bg-gray-200 rounded'>
            전액
          </button>
        </div>

        {/* 숫자 키패드 */}
        <div className='grid grid-cols-3 gap-2 mb-4'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '00', 0].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className='p-4 bg-gray-100 rounded text-xl'
            >
              {num}
            </button>
          ))}
          <button onClick={handleBackspace} className='p-4 bg-red-200 rounded'>
            ⌫
          </button>
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          className='w-full p-4 bg-green-500 text-white font-bold rounded'
        >
          다음
        </button>
      </div>
    </div>
  );
}
