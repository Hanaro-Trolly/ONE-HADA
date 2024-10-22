import Link from 'next/link';

export default function ActivityLayout({
  children,
  tabs,
}: {
  children: React.ReactNode;
  tabs: React.ReactNode;
}) {
  return (
    <div>
      <div>여기여기</div>
      <ul className='flex justify-between'>
        <li>
          <Link href='/activity/history'>활동내역</Link>
        </li>
        <li>
          <Link href='/activity/shortcut'>바로가기</Link>
        </li>
        <li>
          <Link href='/activity/consultations'>상담내역</Link>
        </li>
      </ul>
      <div className='border bg-green-300 h-10'>{tabs}</div>
      {children}
    </div>
  );
}
