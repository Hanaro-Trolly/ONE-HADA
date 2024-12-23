import { StarFilledIcon } from '@radix-ui/react-icons';
import JSONtoUrl from '@/lib/JSONtoUrl';
import { HistoryElementType } from '@/lib/datatypes';
import { Button } from '../ui/button';

type ShortCutCardProps = {
  id: string;
  name: string;
  isEdit: boolean;
  isFavorite: boolean;
  onCheckboxChange?: (id: string) => void;
  favoriteToggle: (id: string) => void;
  shortcutElements: HistoryElementType;
  onButtonClick: (shortcutElements: HistoryElementType) => void;
};

export default function ShortCutCard({
  id,
  name,
  isEdit = false,
  isFavorite = false,
  onCheckboxChange,
  favoriteToggle,
  shortcutElements,
  onButtonClick,
}: ShortCutCardProps) {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (
      e.target === e.currentTarget ||
      (e.target as HTMLElement).tagName.toLowerCase() === 'label'
    ) {
      onButtonClick(shortcutElements);
    }
  };
  const where = JSONtoUrl(shortcutElements).split('/')[1];
  return (
    <Button
      key={id}
      id={`shortcutButtonRedirect${where}`}
      className='bg-white shadow-md flex-1 rounded-lg border-l-[10px] border-[#AEDBCE] mx-6 my-2 py-4 h-16 flex justify-between hover:bg-white'
      onClick={handleButtonClick}
    >
      <div className='flex items-center gap-1 max-w-64 min-w-[170px]'>
        <label className='font-medium text-lg text-[#635666] overflow-ellipsis overflow-hidden whitespace-nowrap'>
          {name}
        </label>
      </div>

      {isEdit ? (
        <div className='pr-1 pt-2'>
          <input
            type='checkbox'
            id={'chk' + id}
            className='w-4 h-4'
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
            e.stopPropagation();
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
            e.stopPropagation();
            favoriteToggle(id);
          }}
        >
          <StarFilledIcon className='text-gray-400' />
        </div>
      )}
    </Button>
  );
}
