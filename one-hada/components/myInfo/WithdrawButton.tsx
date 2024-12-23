import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from 'lucide-react';

interface WithdrawButtonProps {
  handleWithDraw: () => void;
}

const WithdrawButton = ({ handleWithDraw }: WithdrawButtonProps) => (
  <div className='flex items-center h-5 text-gray-500'>
    <Button
      id='myInfoButtonWithdraw'
      variant='ghost'
      className='px-0 py-0 gap-0 font-normal'
      onClick={handleWithDraw}
    >
      회원탈퇴 <ChevronRightIcon />
    </Button>
  </div>
);

export default WithdrawButton;
