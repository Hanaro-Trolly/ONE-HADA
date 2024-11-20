'use client';

// Types
interface AdminInputProps {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  inputType: 'text' | 'textarea';
}

// Component
export default function AdminInput({
  label,
  value,
  onChange,
  inputType,
}: AdminInputProps) {
  const baseClassNames = `
    py-2 
    px-2 
    rounded-lg 
    border 
    border-gray-100 
    focus:ring-1 
    focus:ring-inset 
    focus:ring-main-green 
    focus:outline-none
  `;

  const sharedProps = {
    id: `admin-input-${label}`,
    value,
    onChange,
    placeholder: `${label}을 입력하세요`,
  };

  return (
    <div className='flex flex-col space-y-2 mb-10'>
      <label htmlFor={`admin-input-${label}`} className='text-2xl font-medium'>
        {label}
      </label>

      {inputType === 'text' ? (
        <input type='text' className={baseClassNames} {...sharedProps} />
      ) : (
        <textarea
          className={`${baseClassNames} h-72 resize-none`}
          {...sharedProps}
        />
      )}
    </div>
  );
}
