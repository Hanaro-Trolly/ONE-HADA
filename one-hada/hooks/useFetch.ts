import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

interface FetchOptions<TBody> {
  method: string;
  headers?: Record<string, string>;
  body?: TBody;
  token?: string;
  cache?: boolean;
}
interface ApiResponse<T> {
  find(arg0: (user: unknown) => boolean): unknown;
  code: number;
  status: string;
  message: string;
  data?: T;
}
interface ErrorWithMessage {
  message: string;
}

const ABORT_REASON = 'Fetch aborted';
const cache: Record<string, unknown> = {};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ErrorWithMessage).message === 'string'
  );
};

const toErrorWithMessage = (error: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(error)) return error;
  try {
    return new Error(JSON.stringify(error));
  } catch {
    return new Error(String(error));
  }
};

export const useFetch = <T = unknown, TBody = unknown>() => {
  const [data, setData] = useState<ApiResponse<T> | undefined>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorWithMessage | undefined>();
  const session = useSession();
  const sessionData = session?.data;
  const router = useRouter();

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cert/refresh`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: sessionData?.refreshToken,
          }),
        }
      );

      if (response.status === 401) {
        signOut();
        signIn();
        alert('재로그인이 필요합니다');
      }

      if (!response.ok) {
        throw new Error('토큰 갱신 실패');
      }

      const result = await response.json();
      const newAccessToken = result.data.accessToken;
      const newRefreshToken = result.data.refreshToken;
      console.log(newAccessToken, newRefreshToken);
      return { newAccessToken, newRefreshToken };
    } catch (error) {
      console.log(error);
      throw new Error('토큰 갱신 중 오류 발생');
    }
  }, [sessionData?.refreshToken]); // 필요한 의존성만 포함

  const fetchData = useCallback(
    async (url: string, options: FetchOptions<TBody>) => {
      const controller = new AbortController();
      const cacheKey = `${url}-${JSON.stringify(options)}`;

      try {
        setLoading(true);
        setError(undefined);

        if (options.cache && cache[cacheKey]) {
          setData(cache[cacheKey] as ApiResponse<T>);
          return cache[cacheKey] as ApiResponse<T>;
        }

        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...options.headers,
        };

        if (options.token) {
          headers.Authorization = `Bearer ${options.token}`;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
          {
            method: options.method,
            headers,
            body: JSON.stringify(options.body),
            signal: controller.signal,
          }
        );

        if (response.status === 401) {
          const { newAccessToken, newRefreshToken } = await refreshToken();
          const currentPath = window.location.pathname;
          const searchParams = new URLSearchParams({
            route: currentPath,
            newAccessToken,
            newRefreshToken,
          });
          alert(
            '세션이 만료되었습니다.\n서비스 이용을 계속하시려면 간편비밀번호를 입력해주세요.'
          );
          router.push(`/api/auth/checkPassword?${searchParams.toString()}`);
        }

        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (options.cache) {
          cache[cacheKey] = result;
        }
        setData(result);
        return result;
      } catch (err) {
        if (String(err) !== ABORT_REASON) {
          const errorMessage = toErrorWithMessage(err);
          setError(errorMessage);
          throw err;
        }
      } finally {
        setLoading(false);
      }

      return () => {
        controller.abort(ABORT_REASON);
      };
    },
    [refreshToken, router]
  );

  return { data, isLoading, error, fetchData };
};
