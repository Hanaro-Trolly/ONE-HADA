import { ButtonHTMLAttributes } from 'react';
import { Button } from '../ui/button';

type AccountTypeButtonProps = {
  account_type: string;
  onClicks: () => void;
  children: React.ReactNode; // children 속성 추가
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function AccountTypeButton({
  account_type,
  onClicks,
  children,
  ...rest
}: AccountTypeButtonProps) {
  return (
    <Button
      id={account_type}
      className='px-4 py-2 bg-[#61B89F] text-white rounded-md hover:bg-[#377b68]'
      onClick={onClicks}
      {...rest}
    >
      {children}
    </Button>
  );
}