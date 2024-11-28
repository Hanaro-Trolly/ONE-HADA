'use client';

import { ChevronLeftIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import LoginButton from '../molecules/LoginButton';
import { Button } from '../ui/button';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    if (pathname.startsWith('/activity')) {
      router.push('/');
    } else {
      router.back();
    }
  };

  return (
    <header className='w-full fixed h-14 bg-main-background flex justify-center'>
      <nav className='w-full flex justify-between items-center px-4'>
        <div>
          {pathname === '/' ? (
            <LoginButton />
          ) : (
            <Button
              variant='ghost'
              className='rounded-none hover:bg-main-background'
              onClick={handleBack}
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
              className='rounded-none hover:bg-main-background w-14'
              onClick={() => router.push('/myInfo')}
            >
              내 정보
            </Button>
          ) : (
            <Button
              variant='ghost'
              className='rounded-none hover:bg-main-background w-14'
              onClick={() => router.push('/')}
            >
              홈
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
