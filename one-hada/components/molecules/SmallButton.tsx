import { Button } from '../ui/button';

export default function SmallButton({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) {
  return (
    <>
      <Button
        size='sm'
        className={`${classNames} rounded-2xl h-7 w-16 font-bold`}
      >
        <div className='flex'>{children}</div>
      </Button>
    </>
  );
}
