import React, { forwardRef } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputClassName?: string;
  labelClassName?: string;
}
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type, inputClassName, labelClassName, ...props }, ref) => {
    return (
      <div className='flex items-center justify-center'>
        <label className={labelClassName}>{label}</label>
        <input type={type} ref={ref} className={inputClassName} {...props} />
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
