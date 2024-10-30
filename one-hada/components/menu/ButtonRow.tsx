import { useState, useRef, useEffect } from 'react';
import MenuButton from './MenuButton';
import ToggleButton from './ToggleButton';

type ButtonRowProps = {
  buttons: { label: string; targetId: string }[];
};

export default function ButtonRow({ buttons }: ButtonRowProps) {
  const [isOpen, setButtons] = useState(false);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const checkOver = () => {
      if (buttonContainerRef.current) {
        const container = buttonContainerRef.current;
        const totalWidth = Array.from(container.children).reduce(
          (acc, child) => {
            return acc + (child as HTMLElement).offsetWidth;
          },
          0
        );
        setIsOver(totalWidth > container.clientWidth);
      }
    };

    checkOver();
    window.addEventListener('resize', checkOver);

    return () => {
      window.removeEventListener('resize', checkOver);
    };
  }, [buttons]);

  return (
    <div className='flex w-full justify-between mb-2 px-11 pt-1'>
      <div
        ref={buttonContainerRef}
        className={`flex ${isOpen ? 'flex-wrap' : 'overflow-x-hidden'} justify-start gap-1 relative`}
      >
        {buttons.map((button) => (
          <MenuButton
            key={button.targetId}
            label={button.label}
            targetId={button.targetId}
          />
        ))}
        {isOver && !isOpen && (
          <div className='absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#f9f9f9] to-transparent rounded-none pointer-events-none' />
        )}
      </div>
      <div>
        <ToggleButton isOpen={isOpen} onToggle={() => setButtons(!isOpen)} />
      </div>
    </div>
  );
}
