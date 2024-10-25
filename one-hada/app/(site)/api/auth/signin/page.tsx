// app/(site)/api/auth/signin/page.tsx
import AuthButton from '@/components/ui/AuthButton';
import { getServerSession } from 'next-auth/next';
import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import { authOptions } from '@/lib/authOptions';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();
  console.log(providers);

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='flex flex-col justify-around'
    >
      <div className='flex justify-center'>
        <Image alt='logo' src='/images/one-hada.png' width={100} height={100} />
      </div>
      <div className='flex flex-col justify-center items-center'>
        <h3 className='flex'>
          당신이 <p className='text-main-green mx-2 font-medium'>원하는</p> 모든
          금융을 <p className='text-main-green ml-2 font-medium'>하나로</p>
        </h3>
        <h1 className='text-2xl mt-2 font-medium text-main-green'>원, 하다</h1>
      </div>

      <div className='m-4 flex flex-col justify-center items-center'>
        <AuthButton></AuthButton>
      </div>
    </div>
  );
}
