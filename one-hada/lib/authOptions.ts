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
      accessToken?: string;
      refreshToken?: string;
    } & DefaultSession['user'];
  }

  interface User {
    isNewUser: boolean;
    provider: string | undefined;
    accessToken?: string;
    refreshToken?: string;
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
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      const provider = account?.provider;
      const email = user.email;
      let isFirstLogin = false;

      try {
        const response = await fetch(`http://localhost:8080/api/cert/signin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: provider,
            email: email,
          }),
        });

        if (!response.ok) throw new Error('Failed to generate session ID');

        const data = await response.json();
        console.log('data', data);
        console.log(data.status);

        if (data.status === 'NEW') {
          isFirstLogin = true;
        }

        user.isNewUser = isFirstLogin;
        user.provider = provider;

        return true;
      } catch (error) {
        console.error('처음 로그인 유저인지 조회중 오류', error);
        return false;
      }
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id;
        token.isNewUser = user.isNewUser;
        token.provider = user.provider;

        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      if (trigger === 'update') {
        token.sub = session.id;
        token.accessToken = token.accessToken;
        token.refreshToken = token.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.isNewUser = token.isNewUser as boolean;
        session.user.provider = token.provider as string;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
  },
};
