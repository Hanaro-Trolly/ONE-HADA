import { ButtonHTMLAttributes } from 'react';
import { Button } from '../ui/button';

type TypeButtonProps = {
  button_type: string;
  onClicks: () => void;
  children: React.ReactNode; // children 속성 추가
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function AccountTypeButton({
  button_type,
  onClicks,
  children,
  ...rest
}: TypeButtonProps) {
  return (
    <Button
      id={button_type}
      className='px-4 py-2 bg-[#61B89F] text-white rounded-md hover:bg-[#377b68]'
      onClick={onClicks}
      {...rest}
    >
      {children}
    </Button>
  );
}