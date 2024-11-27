// components/molecules/AccountTypeButton.tsx
import React, { ButtonHTMLAttributes } from 'react';

interface AccountTypeButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  account_type: string;
  onClick: () => void;
  isSelected?: boolean;
}

const AccountTypeButton: React.FC<AccountTypeButtonProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  account_type,
  onClick,
  isSelected = false,
  children,
  ...rest
}) => {
  const buttonClassName = isSelected
    ? 'bg-[#95D0BF] text-white'
    : 'bg-[#ffffff] text-black shadow-none hover:bg-[#95D0BF] hover:text-white';

  return (
    <button
      onClick={onClick}
      className={`${buttonClassName} rounded-full px-4 py-2 focus:outline-none`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default AccountTypeButton;
