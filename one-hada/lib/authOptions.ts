// app/(site)/api/auth/[...nextauth]/route.ts
import { DefaultSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      isNewUser: boolean;
      provider: string | undefined;
    } & DefaultSession['user'];
  }

  interface User {
    isNewUser: boolean;
    provider: string | undefined;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.AUTH_NAVER_ID!,
      clientSecret: process.env.AUTH_NAVER_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID!,
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const provider = account?.provider;
      const userId = user.id;
      let isFirstLogin = false;

      try {
        const response = await fetch(`http://localhost:3000/api/checkUser`, {
          method: 'POST', // POST 메서드로 변경
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, provider }), // userId와 provider를 요청 본문에 포함
        });

        const { exists } = await response.json();

        if (!exists) {
          isFirstLogin = true; // 사용자가 존재하지 않으면 최초 로그인으로 처리
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        return false; // 오류가 발생하면 로그인 실패
      }

      user.isNewUser = isFirstLogin;
      user.provider = provider;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.isNewUser = user.isNewUser;
        token.provider = user.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.isNewUser = token.isNewUser as boolean;
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};
