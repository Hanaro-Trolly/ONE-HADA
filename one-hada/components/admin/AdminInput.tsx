interface AdminInputProps {
  label: string;
  value: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  inputType: 'text' | 'textarea';
}

export default function AdminInput({
  label,
  value,
  onChange,
  inputType,
}: AdminInputProps) {
  return (
    <div className='flex flex-col space-y-2 mb-10'>
      <label className='text-2xl font-bold '>{label}</label>
      {inputType === 'text' ? (
        <input
          className='py-2 px-2'
          type='text'
          value={value}
          onChange={onChange}
          placeholder={`${label}을 입력하세요`}
        />
      ) : (
        <textarea
          className='h-80 resize-none py-2 px-2'
          value={value}
          onChange={onChange}
          placeholder={`${label}을 입력하세요`}
        />
      )}
    </div>
  );
}
