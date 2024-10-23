import AuthButton from '@/components/ui/AuthButton';
import { getServerSession } from 'next-auth/next';
import { getProviders } from 'next-auth/react';
import { authOptions } from '../[...nextauth]/route';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return (
    <>
      <div className='m-4'>
        {providers && <AuthButton providers={providers} />}
      </div>
    </>
  );
}
