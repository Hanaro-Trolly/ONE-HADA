// Types
interface AdminSubmitButtonProps {
  onClick: () => void;
}

export default function AdminSubmitButton({ onClick }: AdminSubmitButtonProps) {
  return (
    <button
      type='submit'
      onClick={onClick}
      className='
        flex 
        justify-center 
        items-center 
        gap-2 
        rounded-lg 
        bg-[#73a8be] 
        px-4 
        py-2 
        text-white 
        hover:bg-[#527887] 
        transition-colors 
        w-1/4
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus:outline-none 
        focus:ring-2 
        focus:ring-[#73a8be]/50
      '
      aria-label='상담 정보 등록'
    >
      등록
    </button>
  );
}
