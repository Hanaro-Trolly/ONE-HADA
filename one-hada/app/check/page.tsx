import dummy from '@/c-dummy/dummy.json';
import AccountCard from '@/components/molecules/AccountCard';
import Link from 'next/link';

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
  const totalBalance = accountData.reduce(
    (total, account) => total + account.balance,
    0
  );

  return (
    <div>
      <h1>내 계좌</h1>
      <div className='bg-white shadow-md rounded-lg m-4 p-4 flex items-start justify-between flex-col'>
        <h2>총 금액: {totalBalance.toLocaleString()} 원</h2>{' '}
      </div>

      <div>
        {accountData.map((account) => (
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
