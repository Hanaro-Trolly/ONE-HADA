'use client'

import AccountCard from '@/components/molecules/AccountCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function TransferPage() {
  const router = useRouter();

  const accounts = [
    {
      account_id: "A001",
      user_id: "U001",
      account_number: 1002153876539,
      balance: 1848890,
      account_type: "입출금",
      bank: "하나은행",
      account_name: "하나은행 주거래 통장"
    },
    {
      account_id: "A002",
      user_id: "U001",
      account_number: 10021537524301,
      balance: 2358890,
      account_type: "저축",
      bank: "하나은행",
      account_name: "달달 하나 통장"
    }
  ];

  
  
    const handleClick = (id:string) => {
    router.push(`/transfer/${id}`);
  };

  return (
    <div className='container'>
      {/* Title */}
      <h1 className='title text-center'>보낼 계좌를 선택해주세요</h1>
    <div className='w-[700px] h-[150px]'>
      {/* {todo} 받아오는 map이나 리스트 크기로 button 만들어야함*/}
    {accounts.map((account) => (
    <Button
     key={account.account_id}
     id='211'
     variant={'ghost'} 
     className='w-full h-full' 
     onClick={() => handleClick(account.account_id)}>
      <AccountCard
        id={account.account_id}
        name={account.account_name}
        accountType={account.account_type}
        accountNumber={account.account_number}
        balance={account.balance}
        bank={account.bank}
        />
    </Button>
))}
      </div>
    </div>
  );
}
