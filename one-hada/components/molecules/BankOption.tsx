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
      className={`flex p-4 rounded-lg items-center justify-center border ${
        selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'
      } hover:bg-blue-200 transition`}
      style={{ width: '120px', height: '120px' }}
    >
      <BankIcon bankId={bankName} />
      <span>{bankName}</span>
    </button>
  );
};

export default BankOption;
