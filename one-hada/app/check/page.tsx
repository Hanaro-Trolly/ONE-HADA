/// 메인페이지에서 조회하기 버튼 클릭 시 이동하는 페이지 입니다.
import dummy from '@/c-dummy/dummy.json';
import Link from 'next/link';

// import Link from next/
type AccountData = {
  account_id: string;
  user_id: string;
  account_number: number;
  balance: number;
  account_type: string;
  bank: string;
}[];

export default function check() {
  const accountData: AccountData = dummy.accounts;
  const accountId = accountData[0].account_id;
  console.log(accountData);
  return (
    <div>
      <h1>조회하기 화면</h1>
      <Link href={`/check/${accountId}`}> 내계좌</Link>
    </div>
  );
}
