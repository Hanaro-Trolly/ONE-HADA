'use client';

import { ChevronLeftIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import AuthButton from '../molecules/AuthButton';
import { Button } from '../ui/button';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className='sticky top-0 h-14 bg-main-background flex justify-center'>
      <nav className='w-full flex justify-between items-center'>
        <div>
          {pathname === '/' ? (
            <AuthButton />
          ) : (
            <Button
              variant='ghost'
              className='rounded-none hover:bg-main-background'
              onClick={() => router.back()}
            >
              <ChevronLeftIcon /> 뒤로
            </Button>
          )}
        </div>
        <div>
          <Button
            variant='ghost'
            className='rounded-none hover:bg-main-background'
            onClick={() => router.push('/menu')}
          >
            메뉴
          </Button>
          {pathname === '/' ? (
            <Button
              variant='ghost'
              className='rounded-none hover:bg-main-background'
              onClick={() => router.push('/settings')}
            >
              설정
            </Button>
          ) : (
            <Button
              variant='ghost'
              className='rounded-none hover:bg-main-background'
              onClick={() => router.push('/')}
            >
              홈
            </Button>
          )}
        </div>

        {/* <Link href='/'>메인(임시)</Link>
        <Link href='/menu'>메뉴</Link>
        <Link href='/settings'>설정or홈</Link>
        <AuthButton /> */}
      </nav>
    </header>
  );
}

/**
 * 
        <Link href={isHome ? '/settings' : '/'} className='text-main-color hover:underline'>
          {isHome ? '설정' : '메인화면'}
        </Link>
 */
