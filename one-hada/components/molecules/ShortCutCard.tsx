import { StarFilledIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

type ShortCutCardProps = {
  id: string;
  name: string;
  isEdit: boolean;
  isFavorite: boolean;
  onCheckboxChange?: (id: string) => void;
};

export default function ShortCutCard({
  id,
  name,
  isEdit = false,
  isFavorite = false,
  onCheckboxChange,
}: ShortCutCardProps) {
  return (
    <>
      <div
        key={id}
        className='bg-white shadow-md rounded-lg border-l-[10px] border-[#AEDBCE] m-4 mx-6 p-4 px-5 h-16 flex justify-between'
      >
        <div className='flex items-center gap-1'>
          <label className='font-medium text-lg'>{name}</label>
        </div>

        {isEdit ? (
          <div className='px-6 py-2'>
            <input
              type='checkbox'
              id={'chk' + id}
              onChange={() => onCheckboxChange?.(id)}
            ></input>
          </div>
        ) : isFavorite ? (
          <Button
            id='deleteFavorite'
            variant='ghost'
            className='[&_svg]:size-6'
            onClick={() =>
              console.log(`id : ${id}, name: ${name} 즐겨찾기 삭제!`)
            }
          >
            <StarFilledIcon className='text-yellow-300' />
          </Button>
        ) : (
          <Button
            id='addFavorite'
            variant='ghost'
            className='[&_svg]:size-6'
            onClick={() =>
              console.log(`id : ${id}, name: ${name} 즐겨찾기 추가!`)
            }
          >
            <StarFilledIcon className='text-gray-400' />
          </Button>
        )}
      </div>
    </>
  );
}
