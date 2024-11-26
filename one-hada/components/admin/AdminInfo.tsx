'use client';

// Types
interface AdminInfoProps {
  birth: string;
  phone: string;
}

// Component
export default function AdminInfo({ birth, phone }: AdminInfoProps) {
  return (
    <div className='mt-4 space-y-4'>
      <InfoField label='전화번호' value={phone} />
      <InfoField label='생년월일' value={birth} />
    </div>
  );
}

// Sub-component
interface InfoFieldProps {
  label: string;
  value: string;
}

function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div>
      <div className='text-m font-medium'>{label}</div>
      <div className='bg-gray-100 p-2 rounded-md flex justify-center items-center'>
        {value}
      </div>
    </div>
  );
}
