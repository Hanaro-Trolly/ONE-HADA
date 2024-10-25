// app/(site)/api/auth/[...nextauth]/route.ts
import { DefaultSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      isNewUser: boolean; // isNewUser 속성 추가
    } & DefaultSession['user'];
  }

  interface User {
    isNewUser: boolean; // User 인터페이스에 isNewUser 추가
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
    async signIn({ user }) {
      //   const provider = account?.provider;
      //   const useId = user.id;
      const isFirstLogin = true;

      // 최초 로그인인지 아닌지 구분하는 api 요청

      // 만약 최초 로그인일 경우

      user.isNewUser = isFirstLogin;

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.isNewUser = user.isNewUser;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.isNewUser = token.isNewUser as boolean;
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
  },
};
