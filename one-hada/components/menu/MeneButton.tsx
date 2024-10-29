import { Button } from '../ui/button';

type MenuButtonProps = {
  label: string;
  targetId: string;
};

export default function MenuButton({ label, targetId }: MenuButtonProps) {
  const scrollToSection = () => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div>
      <Button
        onClick={scrollToSection}
        size='sm'
        className='rounded-2xl h-7 w-16 bg-[#61B89F] hover:bg-[#AEDBCE]'
      >
        {label}
      </Button>
    </div>
  );
}
