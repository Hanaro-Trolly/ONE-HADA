import { RotateCcwIcon, Trash2Icon } from 'lucide-react';
import SmallButton from '../molecules/SmallButton';

const CancelDeleteBtns = ({
  onCancel,
  onDelete,
}: {
  onCancel: () => void;
  onDelete: () => void;
}) => (
  <div className='flex gap-2'>
    <SmallButton
      classNames='text-[#666666] bg-white hover:bg-gray-200'
      onClick={onCancel}
    >
      <RotateCcwIcon />
      취소
    </SmallButton>
    <SmallButton
      classNames='bg-[#E44B5B] hover:bg-[#B61C2B]'
      onClick={onDelete}
    >
      <Trash2Icon />
      삭제
    </SmallButton>
  </div>
);

export default CancelDeleteBtns;
