import BankIcon from '@/components/molecules/BankIcon';
import { Account } from '@/lib/datatypes';

interface AccountHeaderProps {
  account?: Account;
}

export default function AccountHeader({ account }: AccountHeaderProps) {
  if (!account) {
    return <div>계좌 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className='bg-[#DCEFEA] w-full '>
      <div className=' flex items-center ml-4 my-8'>
        <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
          <BankIcon bankId={account.bank} />
        </div>
        <div className='ml-4'>
          <h1 className='text-xl font-medium'>{account.accountName}</h1>
          <h2 className='text-lg font-medium'>{account.accountNumber}</h2>
        </div>
      </div>
    </div>
  );
}
