// components/ButtonRow.tsx
import { useState } from 'react';
import MenuButton from './MeneButton';
import ToggleButton from './ToggleButton';

type ButtonRowProps = {
  buttons: { label: string; targetId: string }[];
};

export default function ButtonRow({ buttons }: ButtonRowProps) {
  const [isOpen, setButtons] = useState(false);

  return (
    <div className='flex w-full justify-between items-center mb-2 px-11 pt-1'>
      {!isOpen ? (
        <div className='flex justify-start gap-1 overflow-x-hidden relative'>
          {buttons.map((button) => (
            <MenuButton
              key={button.targetId}
              label={button.label}
              targetId={button.targetId}
            />
          ))}
          <div className='absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#f9f9f9] to-transparent rounded-none pointer-events-none' />
        </div>
      ) : (
        <div className='flex flex-wrap justify-start gap-1'>
          {buttons.map((button) => (
            <MenuButton
              key={button.targetId}
              label={button.label}
              targetId={button.targetId}
            />
          ))}
        </div>
      )}
      <div>
        <ToggleButton isOpen={isOpen} onToggle={() => setButtons(!isOpen)} />
      </div>
    </div>
  );
}
