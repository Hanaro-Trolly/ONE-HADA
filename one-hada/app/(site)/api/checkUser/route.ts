// app/(site)/api/checkUser/route.ts
import axios from 'axios';
import { User } from '@/lib/datatypes';

export async function POST(req: Request) {
  //나증에 페이지 지우기!!!!!!!!!!!(오류가 없다면)
  const { userId, provider } = await req.json();

  try {
    const response = await axios.get<User[]>(`http://localhost:3001/user`);
    const users = response.data;

    // provider에 따라 사용자를 확인합니다.
    const userExists = users.some((user) => {
      if (provider === 'google') {
        return user.user_google === userId;
      } else if (provider === 'kakao') {
        return user.user_kakao === userId;
      } else if (provider === 'naver') {
        return user.user_naver === userId;
      }
      return false; // 제공자가 일치하지 않으면 false 반환
    });

    return new Response(JSON.stringify({ exists: userExists }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response('Error fetching users', { status: 500 });
  }
}
