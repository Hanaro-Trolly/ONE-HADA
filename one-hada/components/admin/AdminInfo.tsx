'use client';

type AdminInfoProps = {
  birth: string;
  phone: string;
};

export default function AdminInfo({ birth, phone }: AdminInfoProps) {
  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  return (
    <div className='mt-4'>
      <div className='text-m font-medium'>전화번호</div>
      <div className='bg-gray-100 p-2 rounded-md flex justify-center items-center'>
        {formatPhone(phone)}
      </div>{' '}
      <div className='text-m font-medium mt-2'>생년월일</div>
      <div className='bg-gray-100 p-2 rounded-md flex justify-center items-center'>
        {birth}
      </div>{' '}
    </div>
  );
}
