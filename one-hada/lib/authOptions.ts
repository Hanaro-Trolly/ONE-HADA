// app/(site)/api/auth/[...nextauth]/route.ts
import { DefaultSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
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
  session: { strategy: 'jwt' },
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
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      const provider = account?.provider;
      const email = user.id;

      let isFirstLogin = false;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cert/signin`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: provider,
              email: email,
            }),
          }
        );

        if (!response.ok) throw new Error('Failed to generate session ID');

        const data = await response.json();

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
    async jwt({ token, account, user, trigger, session }) {
      if (user) {
        token.sub = user.id;
        token.isNewUser = user.isNewUser;
        token.provider = user.provider;
        token.email = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      if (trigger === 'update' && session) {
        return {
          ...token,
          sub: session.id,
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      session.refreshToken = token.refreshToken as string | undefined;
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.isNewUser = token.isNewUser as boolean;
        session.user.provider = token.provider as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
  },
};
