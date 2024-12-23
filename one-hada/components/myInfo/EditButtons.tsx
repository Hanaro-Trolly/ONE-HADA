import { Button } from '@/components/ui/button';

interface EditButtonsProps {
  isEditing: boolean;
  handleSave: () => void;
  handleCancel: () => void;
  handleEdit: () => void;
}

const EditButtons = ({
  isEditing,
  handleSave,
  handleCancel,
  handleEdit,
}: EditButtonsProps) => {
  return (
    <div className='flex items-center h-5'>
      {isEditing ? (
        <div className='flex gap-4 items-center'>
          <Button
            id='myInfoButtonCancel'
            variant='ghost'
            className='px-0 py-1 h-5'
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            id='myInfoButtonSave'
            variant='ghost'
            className='px-0 py-1 h-5'
            onClick={handleSave}
          >
            완료
          </Button>
        </div>
      ) : (
        <Button
          id='myInfoButtonEdit'
          variant='ghost'
          className='px-0 py-0 font-normal'
          onClick={handleEdit}
        >
          내정보 변경
        </Button>
      )}
    </div>
  );
};

export default EditButtons;
