import { useAdminSession } from '@/context/admin/SessionContext';

export default function Profile() {
  const { session, logout } = useAdminSession();

  if (!session.loginUser) return null;

  return (
    <div>
      <div>Welcome, {session.loginUser.name}!</div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
