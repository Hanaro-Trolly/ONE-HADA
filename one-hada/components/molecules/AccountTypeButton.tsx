import React, { ButtonHTMLAttributes } from 'react';

interface AccountTypeButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  account_type: string;
  onClick: () => void;
  isSelected?: boolean;
}

const AccountTypeButton: React.FC<AccountTypeButtonProps> = ({
  account_type,
  onClick,
  isSelected = false,
  ...rest
}) => {
  const buttonClassName = isSelected
    ? 'bg-[#95D0BF] text-white'
    : 'bg-[#ffffff] text-black shadow-none hover:bg-[#95D0BF] hover:text-white';

  return (
    <button
      id='checkButtonAccountType'
      onClick={onClick}
      className={`${buttonClassName} rounded-full px-4 py-2 focus:outline-none text-sm`}
      {...rest}
    >
      {account_type}
    </button>
  );
};

export default AccountTypeButton;
