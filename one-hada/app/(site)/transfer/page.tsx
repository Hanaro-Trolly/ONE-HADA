import AccountCard from '@/components/molecules/AccountCard';
import { Button } from '@/components/ui/button';

export default function TransferPage() {
  const accountNumber = 11911111111111;

  return (
    <div className='container'>
      {/* Title */}
      <h1 className='title text-center'>보낼 계좌를 선택해주세요</h1>

    <Button id='211'>
      <AccountCard
        id='1'
        name='달달하나통장'
        accountType='저축예금'
        accountNumber={accountNumber}
        balance={1848890}
        bank='하나은행'
      ></AccountCard>
      </Button>
      <Button id='211'>
      <AccountCard
        id='2'
        name='소크라테스트통장'
        accountType='적금통장'
        accountNumber={accountNumber}
        balance={28890}
        bank='하나은행'
      ></AccountCard>
      </Button>

    </div>
  );
}
