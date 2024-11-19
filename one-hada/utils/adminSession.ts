// utils/session.ts
export const isClient = typeof window !== 'undefined';

export const getSessionStorage = (key: string) => {
  if (!isClient) return null;
  try {
    return sessionStorage.getItem(key);
  } catch (e) {
    console.error('SessionStorage error:', e);
    return null;
  }
};

export const setSessionStorage = (key: string, value: string) => {
  if (!isClient) return;
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {
    console.error('SessionStorage error:', e);
  }
};
