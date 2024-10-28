interface AdminSubmitButtonProps {
  onClick: () => void;
}

export default function AdminSubmitButton({ onClick }: AdminSubmitButtonProps) {
  return (
    <button
      className='flex justify-center items-center gap-2 rounded-lg bg-[#73a8be] px-4 py-2 text-white hover:bg-[#527887] transition-colors w-1/4'
      onClick={onClick}
    >
      등록
    </button>
  );
}
