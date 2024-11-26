interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <h1 className='relative inline-block' aria-label={`${text} 섹션`}>
      <span className='text-[40px] font-bold text-[#635666]'>{text}</span>
      <div
        className='absolute bottom-0 left-0 w-full h-[5px] bg-[#AEDBCE]'
        aria-hidden='true'
      />
    </h1>
  );
}
