'use client';

import PasswordKeypad from '@/components/ui/PasswordKeypad';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UserInput } from '@/lib/datatypes';

type SetPasswordProps = {
  userData: UserInput | null;
  setUserData: React.Dispatch<React.SetStateAction<UserInput | null>>;
};

export default function SetPassword({
  userData,
  setUserData,
}: SetPasswordProps) {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [isFist, setIsfirst] = useState<boolean>(true);
  const [firstPassword, setFirstPassword] = useState<string | null>(null);
  const isRegistering = useRef(false);
  const isRegistered = useRef(false);

  const login = useCallback(async () => {
    console.log('login function called');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cert/signin`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: session?.user.provider,
            email: session?.user.email,
          }),
        }
      );

      const data = await response.json();
      console.log('login response received:', data);

      if (data.code == 200 && data.status === 'EXIST') {
        try {
          await update({
            id: data.data.userId,
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
            isLogin: true,
          });

          router.push('/');
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }, [router, session?.user.email, session?.user.provider, update]);

  const register = useCallback(async () => {
    if (isRegistering.current) return;
    isRegistering.current = true;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cert/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      if (data.status == 'EXIST') {
        alert('기존 계정과 연동하였습니다');
        await login();
      } else if (data.status == 'NEW') {
        alert('회원등록에 성공하였습니다');
        await login();
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생', error);
    } finally {
      isRegistering.current = false;
    }
  }, [login, userData]);

  const handleSubmit = async (
    password: string[],
    setPassword: Dispatch<SetStateAction<string[]>>
  ) => {
    if (password.length !== 6) {
      alert('6자리 숫자를 모두 입력해주세요.');
      return;
    }

    const currentPassword = password.join('');
    setPassword([]);

    if (isFist) {
      setFirstPassword(currentPassword);
      setIsfirst(false);
      return;
    }

    if (currentPassword !== firstPassword || !userData) {
      alert('비밀번호가 일치하지 않습니다. \n다시 입력해주세요');
      setIsfirst(true);
      return;
    }

    setUserData({
      ...userData,
      simplePassword: currentPassword,
    });
  };

  useEffect(() => {
    const registerOnce = async () => {
      if (userData?.simplePassword && !isRegistered.current) {
        isRegistered.current = true;
        await register();
      }
    };
    registerOnce();
  }, [userData?.simplePassword, register]);

  return (
    <div className='py-8 px-10 w-full flex flex-col items-center justify-center'>
      {isFist ? (
        <h2 className='text-xl font-medium text-[#635666] text-center mb-6'>
          간편 비밀번호를 설정하세요
        </h2>
      ) : (
        <h2 className='text-xl font-medium text-[#635666] text-center mb-6'>
          다시 한번 입력해주세요
        </h2>
      )}
      <PasswordKeypad handleSubmit={handleSubmit}></PasswordKeypad>
    </div>
  );
}
