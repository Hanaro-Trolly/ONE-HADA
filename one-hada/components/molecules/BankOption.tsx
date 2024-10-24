import React from 'react';

type BankOptionProps = {
  bankId: string;
  bankName: string;
  selected: boolean;
  onClick: (bankId: string) => void;
};

const BankOption: React.FC<BankOptionProps> = ({ bankId, bankName, selected, onClick }) => {
  return (
    <button
      onClick={() => onClick(bankId)}
      className={`p-4 rounded-lg flex items-center justify-center border ${
        selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'
      } hover:bg-blue-200 transition`}
      style={{ width: '120px', height: '120px' }}
    >
      <span>{bankName}</span>
    </button>
  );
};

export default BankOption;