'use client';

import Login from '@/components/admin/Login';
import Profile from '@/components/admin/Profile';
import { useAdminSession } from '@/context/admin/SessionContext';

export default function Admin() {
  const { session } = useAdminSession();

  return (
    <div className='flex items-center justify-center h-screen'>
      {session.loginUser ? <Profile /> : <Login />}
    </div>
  );
}
