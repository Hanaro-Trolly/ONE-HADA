const API_URL = 'http://localhost:8080/api/admin';

interface UserResponse {
  code: number;
  status: string;
  message: string;
  data: {
    id: string;
    userName: string;
    userBirth: string;
    userPhone: string;
    userGender: string;
  } | null;
}

export const fetchUserData = async (userId: string): Promise<UserResponse> => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: UserResponse = await response.json();
    return data;
  } catch (error) {
    console.error('User data fetch error:', error);
    throw new Error('Failed to fetch user data');
  }
};
