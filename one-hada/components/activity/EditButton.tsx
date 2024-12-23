import { Edit2Icon } from 'lucide-react';
import SmallButton from '../molecules/SmallButton';

const EditButton = ({ onClick }: { onClick: () => void }) => (
  <SmallButton
    id='shortcutButtonEdit'
    classNames='bg-[#5e7887] hover:bg-[#3f505a]'
    onClick={onClick}
  >
    <Edit2Icon />
    편집
  </SmallButton>
);

export default EditButton;
