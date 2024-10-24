import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>메인 페이지</h1>
      <Link href='/activity'>내 활동보기</Link>
      <Link href='/check'>조회하기</Link>
      <Link href='/transfer/my'>이체하기</Link>
    </div>
  );
}
