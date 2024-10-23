'use client';

import AdminForm from '@/components/admin/AdminForm';
import Login from '@/components/admin/Login';
import Profile from '@/components/admin/Profile';
import UserList from '@/components/admin/UserList';
import { useAdminSession } from '@/context/admin/SessionContext';

export default function Admin() {
  const { session } = useAdminSession();

  return (
    <div>
      <div>Admin Page</div>
      {session.loginUser ? <Profile /> : <Login />}

      <div>
        <AdminForm />
      </div>

      <div>
        <UserList />
      </div>
    </div>
  );
}
