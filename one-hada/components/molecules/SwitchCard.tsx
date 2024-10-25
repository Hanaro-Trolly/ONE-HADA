import { Switch } from '../ui/switch';

type SettingCardProps = {
  mode: string;
  checked: boolean;
  checkedChange: () => void;
};

export default function SettingsCard({
  mode,
  checked,
  checkedChange,
}: SettingCardProps) {
  return (
    <>
      <div className='bg-white shadow-md rounded-xl mb-4 mx-6 p-4 px-5 h-14 flex justify-between items-center'>
        <div>{mode}</div>
        <div>
          <Switch checked={checked} onCheckedChange={checkedChange} />
        </div>
      </div>
    </>
  );
}
