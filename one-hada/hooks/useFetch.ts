import { useCallback, useState } from 'react';

interface FetchOptions<TBody> {
  method: string;
  headers?: Record<string, string>;
  body: TBody;
  token?: string;
  cache?: boolean;
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

export const useFetch = <TData, TBody = unknown>() => {
  const [data, setData] = useState<TData | undefined>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorWithMessage | undefined>();

  const fetchData = useCallback(
    async (url: string, options: FetchOptions<TBody>) => {
      const controller = new AbortController();
      const cacheKey = `${url}-${JSON.stringify(options)}`;
      let isMounted = true;

      try {
        setLoading(true);
        setError(undefined);

        if (options.cache && cache[cacheKey]) {
          setData(cache[cacheKey] as TData);
          return cache[cacheKey] as TData;
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

        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (options.cache) {
          cache[cacheKey] = result;
        }

        if (isMounted) {
          setData(result);
          setError(undefined);
        }

        return result;
      } catch (err) {
        if (String(err) !== ABORT_REASON && isMounted) {
          const errorMessage = toErrorWithMessage(err);
          setError(errorMessage);
          throw err;
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }

      return () => {
        isMounted = false;
        controller.abort(ABORT_REASON);
      };
    },
    []
  );

  return { data, isLoading, error, fetchData };
};
