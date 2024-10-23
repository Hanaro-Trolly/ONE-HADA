import Link from 'next/link';
import LoginButton from '../molecules/LoginButton';

export default function Header() {
  return (
    <header>
      <nav>
        <Link href='/'>메인(임시)</Link>
        <Link href='/menu'>메뉴</Link>
        <Link href='/settings'>설정</Link>
        <LoginButton />
      </nav>
    </header>
  );
}
