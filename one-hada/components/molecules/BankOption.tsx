import React from 'react';
import BankIcon from './BankIcon';

type BankOptionProps = {
  bankName: string;
  selected: boolean;
  onClick: (bank: string) => void;
};

const BankOption: React.FC<BankOptionProps> = ({
  bankName,
  selected,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick(bankName)}
      className={`flex py-2 rounded-lg items-center justify-center border border-gray-100 ${
        selected ? 'bg-blue-500 text-white' : 'bg-gray-50 text-black'
      } hover:bg-blue-200 transition`}
    >
      <div className='flex flex-col items-center justify-center gap-2'>
        <BankIcon bankId={bankName} />

        <label className='text-xs font-normal'>{bankName}</label>
      </div>
    </button>
  );
};

export default BankOption;
