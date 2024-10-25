import dummy from '@/c-dummy/account_d.json';

type AccountData = {
  account_id: string;
  user_id: string;
  account_number: number;
  balance: number;
  account_type: string;
  bank: string;
  account_name: string;
};
export default function AccountDetailPage({
  params,
}: {
  params: { accountId: string };
}) {
  const { accountId } = params;
  console.log('🚀 ~ params:', accountId);
  // 더미 데이터에서 account_id에 맞는 계좌를 찾음
  const account: AccountData | undefined = dummy.accounts.find((acc) => {
    console.log(
      '🚀 ~ accountId:',
      accountId,
      ' | acc.account_id:',
      acc.account_id
    );
    return acc.account_id === accountId;
  });
  // 계좌를 찾지 못한 경우
  if (!account) {
    return <div>계좌를 찾을 수 없습니다.</div>;
  }
  // 계좌를 찾은 경우
  return (
    <div className='bg-white shadow-md rounded-lg m-4 p-4'>
      <h1>{account.account_name} 상세 정보</h1>

      <div className='mt-4'>
        <p>계좌 번호: {account.account_number}</p>
        <p>잔액: {account.balance.toLocaleString()} 원</p>
        <p>은행: {account.bank}</p>
        <p>계좌 종류: {account.account_type}</p>
      </div>
    </div>
  );
}
