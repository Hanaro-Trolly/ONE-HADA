import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  inputClassName?: string;
  labelClassName?: string;
  [key: string]: any;
}

export default function InputField({
  label,
  type,
  inputRef,
  inputClassName,
  labelClassName,
  ...props
}: InputFieldProps) {
  return (
    <div className='flex items-center justify-center'>
      <label className={labelClassName}>{label}</label>
      <input type={type} ref={inputRef} className={inputClassName} {...props} />
    </div>
  );
}
