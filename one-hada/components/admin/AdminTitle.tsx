interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <div className='relative inline-block'>
      <div className='text-[45px] font-bold text-[#635666]'>{text}</div>
      <div className='absolute bottom-0 left-0 w-full h-[5px] bg-[#AEDBCE]'></div>
    </div>
  );
}
