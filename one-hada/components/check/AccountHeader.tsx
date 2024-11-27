// 계좌 상세 정보를 표시하는 헤더 컴포넌트
// - 은행 아이콘 표시
// - 계좌명과 계좌번호 표시
// - 계좌 정보 로딩 중 상태 처리
import BankIcon from '@/components/molecules/BankIcon';
import { Account } from '@/lib/datatypes';

interface AccountHeaderProps {
  account?: Account | null;
}

export default function AccountHeader({ account }: AccountHeaderProps) {
  if (!account) {
    return <div>계좌 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className='flex items-center ml-4 mt-4'>
      <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
        <BankIcon bankId={account.bank} />
      </div>
      <div className='ml-4'>
        <h1 className='text-xl font-medium'>{account.account_name}</h1>
        <h2 className='text-xl font-medium'>{account.account_number}</h2>
      </div>
    </div>
  );
}
