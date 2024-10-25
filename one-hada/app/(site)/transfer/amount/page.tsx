'use client';

import dummy from '@/c-dummy/account_d.json';
import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AmountInput() {
  const [amount, setAmount] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const accountId = searchParams.get('account_id');
  const recipientNumber = searchParams.get('recipient_number');
  const bankId = searchParams.get('bank');

  type Bank = {
    bank_id: string;
    bank_name: string;
    bank_code: string;
    logo_url: string;
  };

  type Account = {
    account_id: string;
    user_id: string;
    account_number: number;
    balance: number;
    account_type: string;
    bank: string;
    account_name: string;
  };

  const banks: Bank[] = dummy.banks;
  const accounts: Account[] = dummy.accounts;

  const bankName =
    banks.find((bank) => bank.bank_id === bankId)?.bank_name ||
    '은행 정보 없음';

  const balance =
    accounts.find((account) => account.account_id === accountId)?.balance ||
    '정보 확인되지 않음';

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
    setAmount(balance.toString());
  };

  const handleClick = () => {
    if (accountId && recipientNumber && bankId && amount) {
      router.push(`/transfer/validation?account_id=${accountId}&bank=${bankId}&recipient_number=${recipientNumber}&amount=${amount}`);
    } else {
      alert('은행과 계좌번호를 모두 입력해주세요.');
    }
  };


  return (
    <div className='container mx-auto p-6'>
      <div className='bg-gray-100 p-6 rounded-lg mb-6 text-center'>
        <div className='mb-6'>
          <p className='font-bold text-xl mb-2'>{accountId}</p>
          <p className='text-gray-400'>
            {bankName} {recipientNumber}
          </p>
          <hr className='border-t border-gray-600 mx-auto w-3/4' />
          <p
            className={`text-xl mb-2 mt-8 ${amount ? 'font-bold text-black' : 'font-bold text-gray-400'}`}
          >
            {amount ? (
              <span>{`${Number(amount).toLocaleString()} 원`}</span>
            ) : (
              <span>얼마를 보낼까요?</span>
            )}
          </p>
        </div>

        <div className='bg-white p-4 rounded-lg shadow mb-4'>
          <div className='flex justify-between items-center'>
            <span className='font-bold'>내 계좌</span>
            <span className='font-bold'>
              {Number(balance).toLocaleString()} 원
            </span>
          </div>
        </div>

        {/* 금액 추가 버튼들 */}
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
        <div className='grid grid-cols-3 gap-2 mb-6'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '00', 0].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className='p-4 bg-gray-100 rounded text-xl shadow'
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleBackspace}
            className='p-4 bg-gray-100 rounded text-xl shadow'
          >
            ⌫
          </button>
        </div>

        <Button id='231' onClick={() => handleClick()}>
          다음
        </Button>
      </div>
    </div>
  );
}
