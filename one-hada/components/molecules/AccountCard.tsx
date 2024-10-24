type AccountCardProps = {
  id: string;
  name: string;
  accountNumber: number;
  balance: number;
  accountType: string;
  bank: string;
  user_id: string;
};

export default function AccountCard({
  id,
  name,
  accountNumber,
  balance,
  accountType,
  bank,
}: AccountCardProps) {
  // console.log(`🚀 ~ key:`, id);
  // console.log('🚀 ~ name:', name);
  // console.log('🚀 ~ bank:', bank);
  // console.log('🚀 ~ accountType:', accountType);
  // console.log('🚀 ~ accountNumer:', accountNumber);
  // console.log('🚀 ~ balance:', balance);

  return (
    <div
      key={id}
      className='bg-white shadow-md rounded-lg m-4 p-4 flex items-start justify-between flex-col'
    >
      <div className='flex items-center gap-4'>
        {/* Bank icon */}
        <h1>아이콘</h1>
        <div className='flex flex-col'>
          <h1 className='font-medium text-lg'>{name}</h1>
          <label className='font-light text-gray-500 text-sm'>
            {`${accountType} • ${accountNumber}`}
          </label>
        </div>
      </div>
      <h2 className='font-medium text-lg text-right self-end mt-8'>
        {balance.toLocaleString()} 원
      </h2>
    </div>
  );
}
