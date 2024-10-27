import useApi from '@/hooks/useApi';
import { useState } from 'react';
import { User } from '@/lib/datatypes';

const UserList = () => {
  const {
    data: users,
    loading,
    error,
    updateData,
    deleteData,
  } = useApi<User>('user');
  const [updatedEmail, setUpdatedEmail] = useState<string | null>(null);

  const handleUpdate = async (userId: string) => {
    if (!updatedEmail) return;

    try {
      await updateData(userId, { user_email: updatedEmail });
      setUpdatedEmail(null);
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteData(userId);
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.user_name}</strong>
            email: {user.user_email} <br />
            전화: {user.user_phone} <br />
            주소: {user.user_address} <br />
            생일: {user.user_birth} <br />
            등록일: {String(user.user_register)} <br />
            <input
              type='email'
              placeholder='새 이메일 입력'
              onChange={(e) => setUpdatedEmail(e.target.value)}
            />
            <button onClick={() => handleUpdate(user.id)}>Update</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
