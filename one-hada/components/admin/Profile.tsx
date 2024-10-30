import { useAdminSession } from '@/context/admin/SessionContext';

export default function Profile() {
  const { session } = useAdminSession();

  if (!session.loginUser) return null;

  return (
    <div>
      <div className='text-gray-400 text-xl'>
        안녕하세요, {session.loginUser.agent_name} 님!
      </div>
    </div>
  );
}
