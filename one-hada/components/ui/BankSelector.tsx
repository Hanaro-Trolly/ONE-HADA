'use client';

import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import BankOption from '../molecules/BankOption';

type Bank = {
  bank_id: string;
  bank_name: string;
};

const banks: Bank[] = [
  { bank_id: 'bank1', bank_name: '하나은행' },
  { bank_id: 'bank2', bank_name: '국민은행' },
  { bank_id: 'bank3', bank_name: '신한은행' },
  { bank_id: 'bank4', bank_name: '우리은행' },
  { bank_id: 'bank5', bank_name: '농협은행' },
  { bank_id: 'bank6', bank_name: '카카오뱅크' },
  { bank_id: 'bank7', bank_name: '토스뱅크' },
  { bank_id: 'bank8', bank_name: '제일은행' },
  { bank_id: 'bank9', bank_name: '기업은행' },
  { bank_id: 'bank10', bank_name: 'JP모건' },
  { bank_id: 'bank11', bank_name: 'HSBC' },
  { bank_id: 'bank12', bank_name: '도이치뱅크' },
  { bank_id: 'bank13', bank_name: 'BNP파리바' },
];

interface BankSelectorProps {
  selectedBank: string;
  onSelect: (bank: string) => void;
}

export default function BankSelector({
  selectedBank,
  onSelect,
}: BankSelectorProps) {
  const [isToggleOpen, setIsToggleOpen] = useState<Boolean>(false);

  const onToggle = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <>
      <button onClick={onToggle} className='w-full mb-8 p-2 border-b-2'>
        {selectedBank ? (
          banks.find((bank) => bank.bank_name === selectedBank)?.bank_name
        ) : (
          <div className='flex items-center'>
            <span className='flex-1 text-gray-400'>은행을 선택해주세요</span>
            <ChevronDownIcon className='size-4 text-gray-400' />
          </div>
        )}
      </button>

      {isToggleOpen && (
        <div className='absolute bg-white border border-gray-300 shadow-lg p-4 mt-2 w-[272px] overflow-auto h-60'>
          <div className='grid grid-cols-3 gap-2 mb-6 w-full'>
            {banks.map((bank) => (
              <BankOption
                key={bank.bank_id}
                bankName={bank.bank_name}
                selected={selectedBank === bank.bank_id}
                onClick={onSelect}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
