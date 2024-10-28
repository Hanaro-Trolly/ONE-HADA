import { StarFilledIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

type ShortCutCardProps = {
  id: string;
  name: string;
  isEdit: boolean;
  isFavorite: boolean;
  onCheckboxChange?: (id: string) => void;
  favoriteToggle: (id: string) => void;
  shortcutUrl: string;
};

export default function ShortCutCard({
  id,
  name,
  isEdit = false,
  isFavorite = false,
  onCheckboxChange,
  favoriteToggle,
  shortcutUrl,
}: ShortCutCardProps) {
  return (
    <>
      <Button
        key={id}
        className='bg-white shadow-md rounded-lg border-l-[10px] border-[#AEDBCE] m-4 mx-6 p-4 px-5 h-16 flex justify-between w-11/12 hover:bg-slate-100'
        onClick={() => (window.location.href = shortcutUrl)}
      >
        <div className='flex items-center gap-1'>
          <label className='font-medium text-lg text-black'>{name}</label>
        </div>

        {isEdit ? (
          <div className='px-6 py-2'>
            <input
              type='checkbox'
              id={'chk' + id}
              onChange={(e) => {
                e.stopPropagation();
                onCheckboxChange?.(id);
              }}
            />
          </div>
        ) : isFavorite ? (
          <div
            id='deleteFavorite'
            className='[&_svg]:size-6 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation(); // 클릭 이벤트 전파 방지
              favoriteToggle(id);
            }}
          >
            <StarFilledIcon className='text-yellow-300' />
          </div>
        ) : (
          <div
            id='addFavorite'
            className='[&_svg]:size-6 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation(); // 클릭 이벤트 전파 방지
              favoriteToggle(id);
            }}
          >
            <StarFilledIcon className='text-gray-400' />
          </div>
        )}
      </Button>
    </>
  );
}
