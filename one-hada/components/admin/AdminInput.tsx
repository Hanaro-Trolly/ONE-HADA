'use client';
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
    <div>
      <label>{label}</label>
      {inputType === 'text' ? (
        <input
          type='text'
          value={value}
          onChange={onChange}
          placeholder={`${label}을 입력하세요`}
        />
      ) : (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={`${label}을 입력하세요`}
        />
      )}
    </div>
  );
}
