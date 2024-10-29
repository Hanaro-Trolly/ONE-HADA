import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Button } from '../ui/button';

type ToggleButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function ToggleButton({ isOpen, onToggle }: ToggleButtonProps) {
  return (
    <Button
      onClick={onToggle}
      variant='ghost'
      size='sm'
      className='rounded-2xl h-7 w-7 font-bold '
    >
      {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </Button>
  );
}

