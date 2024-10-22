'use client';

import Login from '@/components/admin/Login';
import Profile from '@/components/admin/Profile';
import { useAdminSession } from '@/context/admin/SessionContext';

export default function Admin() {
  const { session } = useAdminSession();

  return (
    <div>
      <div>Admin Page</div>
      {session.loginUser ? <Profile /> : <Login />}
    </div>
  );
}
