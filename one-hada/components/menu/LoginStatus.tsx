import { ChevronRightIcon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { User } from '@/lib/datatypes';
import { Button } from '../ui/button';

const LoginStatus = ({ userProfile }: { userProfile: User | null }) => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className='bg-[#DCEFEA] flex items-center'>
        <div className='mx-6 px-5 h-14 w-full flex justify-between items-center'>
          <div className='text-[#635666]'>
            <label className='text-xl text-[#698596] font-semibold'>
              {userProfile?.userName}
            </label>
            님
          </div>
          <div className='flex items-center h-5 text-gray-500'>
            <Button
              variant='ghost'
              className='px-0 py-0 gap-0 font-normal'
              onClick={() => signOut()}
            >
              로그아웃
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-[#DCEFEA] flex items-center'>
      <div className='mx-6 px-5 h-14 w-full flex justify-between items-center'>
        로그인을 해주세요.
        <div className='flex items-center h-5 text-gray-500'>
          <Button
            variant='ghost'
            className='px-0 py-0 gap-0 font-normal'
            onClick={() => signIn()}
          >
            로그인
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginStatus;
