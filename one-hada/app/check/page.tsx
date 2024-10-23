// import dummy from '@/c-dummy/dummy.json';
// import AccountCard from '@/components/molecules/AccountCard';
// import AccountTypeButton from '@/components/molecules/AccountTypeButton';
// import Link from 'next/link';
// type AccountData = {
//   account_id: string;
//   user_id: string;
//   account_number: number;
//   balance: number;
//   account_type: string;
//   bank: string;
//   account_name: string;
// }[];
// export default function CheckPage() {
//   const accountData: AccountData = dummy.accounts;
//   const totalBalance = accountData.reduce(
//     (total, account) => total + account.balance,
//     0
//   );
//   return (
//     <div>
//       <h1>내 계좌</h1>
//       <div className='bg-white shadow-md rounded-lg m-4 p-4 flex items-start justify-between flex-col'>
//         <h2>총 금액: {totalBalance.toLocaleString()} 원</h2>{' '}
//       </div>
//       <div className='flex justify-center space-x-4'>
//         <AccountTypeButton account_type='입출금'></AccountTypeButton>
//         <AccountTypeButton account_type='예적금'></AccountTypeButton>
//         <AccountTypeButton account_type='대출'></AccountTypeButton>
//         <AccountTypeButton account_type='펀드'></AccountTypeButton>
//       </div>
//       <div>
//         {accountData.map((account) => (
//           <Link href={`/check/${account.account_id}`} key={account.account_id}>
//             <div>
//               <AccountCard
//                 id={account.account_id}
//                 user_id={account.user_id}
//                 accountNumber={account.account_number}
//                 balance={account.balance}
//                 accountType={account.account_type}
//                 bank={account.bank}
//                 name={account.account_name}
//               />
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
'use client';

import dummy from '@/c-dummy/dummy.json';
import AccountCard from '@/components/molecules/AccountCard';
import AccountTypeButton from '@/components/molecules/AccountTypeButton';
import Link from 'next/link';
import { useState } from 'react';

// import dummy from '@/c-dummy/dummy.json';
// import AccountCard from '@/components/molecules/AccountCard';
// import AccountTypeButton from '@/components/molecules/AccountTypeButton';
// import Link from 'next/link';
// type AccountData = {
//   account_id: string;
//   user_id: string;
//   account_number: number;
//   balance: number;
//   account_type: string;
//   bank: string;
//   account_name: string;
// }[];
// export default function CheckPage() {
//   const accountData: AccountData = dummy.accounts;
//   const totalBalance = accountData.reduce(
//     (total, account) => total + account.balance,
//     0
//   );
//   return (
//     <div>
//       <h1>내 계좌</h1>
//       <div className='bg-white shadow-md rounded-lg m-4 p-4 flex items-start justify-between flex-col'>
//         <h2>총 금액: {totalBalance.toLocaleString()} 원</h2>{' '}
//       </div>
//       <div className='flex justify-center space-x-4'>
//         <AccountTypeButton account_type='입출금'></AccountTypeButton>
//         <AccountTypeButton account_type='예적금'></AccountTypeButton>
//         <AccountTypeButton account_type='대출'></AccountTypeButton>
//         <AccountTypeButton account_type='펀드'></AccountTypeButton>
//       </div>
//       <div>
//         {accountData.map((account) => (
//           <Link href={`/check/${account.account_id}`} key={account.account_id}>
//             <div>
//               <AccountCard
//                 id={account.account_id}
//                 user_id={account.user_id}
//                 accountNumber={account.account_number}
//                 balance={account.balance}
//                 accountType={account.account_type}
//                 bank={account.bank}
//                 name={account.account_name}
//               />
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// import dummy from '@/c-dummy/dummy.json';
// import AccountCard from '@/components/molecules/AccountCard';
// import AccountTypeButton from '@/components/molecules/AccountTypeButton';
// import Link from 'next/link';
// type AccountData = {
//   account_id: string;
//   user_id: string;
//   account_number: number;
//   balance: number;
//   account_type: string;
//   bank: string;
//   account_name: string;
// }[];
// export default function CheckPage() {
//   const accountData: AccountData = dummy.accounts;
//   const totalBalance = accountData.reduce(
//     (total, account) => total + account.balance,
//     0
//   );
//   return (
//     <div>
//       <h1>내 계좌</h1>
//       <div className='bg-white shadow-md rounded-lg m-4 p-4 flex items-start justify-between flex-col'>
//         <h2>총 금액: {totalBalance.toLocaleString()} 원</h2>{' '}
//       </div>
//       <div className='flex justify-center space-x-4'>
//         <AccountTypeButton account_type='입출금'></AccountTypeButton>
//         <AccountTypeButton account_type='예적금'></AccountTypeButton>
//         <AccountTypeButton account_type='대출'></AccountTypeButton>
//         <AccountTypeButton account_type='펀드'></AccountTypeButton>
//       </div>
//       <div>
//         {accountData.map((account) => (
//           <Link href={`/check/${account.account_id}`} key={account.account_id}>
//             <div>
//               <AccountCard
//                 id={account.account_id}
//                 user_id={account.user_id}
//                 accountNumber={account.account_number}
//                 balance={account.balance}
//                 accountType={account.account_type}
//                 bank={account.bank}
//                 name={account.account_name}
//               />
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// import dummy from '@/c-dummy/dummy.json';
// import AccountCard from '@/components/molecules/AccountCard';
// import AccountTypeButton from '@/components/molecules/AccountTypeButton';
// import Link from 'next/link';
// type AccountData = {
//   account_id: string;
//   user_id: string;
//   account_number: number;
//   balance: number;
//   account_type: string;
//   bank: string;
//   account_name: string;
// }[];
// export default function CheckPage() {
//   const accountData: AccountData = dummy.accounts;
//   const totalBalance = accountData.reduce(
//     (total, account) => total + account.balance,
//     0
//   );
//   return (
//     <div>
//       <h1>내 계좌</h1>
//       <div className='bg-white shadow-md rounded-lg m-4 p-4 flex items-start justify-between flex-col'>
//         <h2>총 금액: {totalBalance.toLocaleString()} 원</h2>{' '}
//       </div>
//       <div className='flex justify-center space-x-4'>
//         <AccountTypeButton account_type='입출금'></AccountTypeButton>
//         <AccountTypeButton account_type='예적금'></AccountTypeButton>
//         <AccountTypeButton account_type='대출'></AccountTypeButton>
//         <AccountTypeButton account_type='펀드'></AccountTypeButton>
//       </div>
//       <div>
//         {accountData.map((account) => (
//           <Link href={`/check/${account.account_id}`} key={account.account_id}>
//             <div>
//               <AccountCard
//                 id={account.account_id}
//                 user_id={account.user_id}
//                 accountNumber={account.account_number}
//                 balance={account.balance}
//                 accountType={account.account_type}
//                 bank={account.bank}
//                 name={account.account_name}
//               />
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

type AccountData = {
  account_id: string;
  user_id: string;
  account_number: number;
  balance: number;
  account_type: string;
  bank: string;
  account_name: string;
}[];

export default function CheckPage() {
  const accountData: AccountData = dummy.accounts;

  // 상태로 선택된 account_type을 저장
  const [selectedType, setSelectedType] = useState<string | null>(null);
  //   const [selectedType, setSelectedType] = useState<string>('입출금');

  const totalBalance = accountData.reduce(
    (total, account) => total + account.balance,
    0
  );

  // account_type을 기준으로 필터링
  const filteredAccounts = selectedType
    ? accountData.filter((account) => account.account_type === selectedType)
    : accountData;

  return (
    <div>
      <h1>내 계좌</h1>
      <div className='bg-white shadow-md rounded-lg m-4 p-4 flex items-start justify-between flex-col'>
        <h2>총 금액: {totalBalance.toLocaleString()} 원</h2>
      </div>

      {/* 버튼 클릭 시 account_type을 설정 */}
      <div className='flex justify-center space-x-4'>
        <AccountTypeButton
          account_type='입출금'
          onClick={() => setSelectedType('입출금')}
        >
          입출금
        </AccountTypeButton>
        <AccountTypeButton
          account_type='예적금'
          onClick={() => setSelectedType('예적금')}
        >
          예적금
        </AccountTypeButton>
        <AccountTypeButton
          account_type='대출'
          onClick={() => setSelectedType('대출')}
        >
          대출
        </AccountTypeButton>
        <AccountTypeButton
          account_type='펀드'
          onClick={() => setSelectedType('펀드')}
        >
          펀드
        </AccountTypeButton>
      </div>

      {/* 필터링된 계좌를 표시 */}
      <div>
        {filteredAccounts.map((account) => (
          <Link href={`/check/${account.account_id}`} key={account.account_id}>
            <div>
              <AccountCard
                id={account.account_id}
                user_id={account.user_id}
                accountNumber={account.account_number}
                balance={account.balance}
                accountType={account.account_type}
                bank={account.bank}
                name={account.account_name}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
