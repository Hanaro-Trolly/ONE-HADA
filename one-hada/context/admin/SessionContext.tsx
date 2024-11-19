'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import { fetchAllData } from '@/lib/api';

type LoginUser = {
  id: string;
  agent_name: string;
  agent_email: string;
};

type Session = {
  loginUser: LoginUser | null;
};

type Agent = {
  id: string;
  agent_name: string;
  agent_email: string;
  agent_pw: string;
};

type Action = { type: 'LOGIN'; payload: LoginUser } | { type: 'LOGOUT' };

// 세션스토리지 유틸리티 함수
const getSessionStorageItem = (key: string) => {
  if (typeof window === 'undefined') return null;
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('SessionStorage get error:', error);
    return null;
  }
};

const setSessionStorageItem = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('SessionStorage set error:', error);
  }
};

const removeSessionStorageItem = (key: string) => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('SessionStorage remove error:', error);
  }
};

// 초기 상태를 가져오는 함수
const getInitialSession = (): Session => {
  const storedUser = getSessionStorageItem('loginUser');
  return {
    loginUser: storedUser,
  };
};

const sessionReducer = (state: Session, action: Action): Session => {
  switch (action.type) {
    case 'LOGIN':
      setSessionStorageItem('loginUser', action.payload);
      return { ...state, loginUser: action.payload };
    case 'LOGOUT':
      removeSessionStorageItem('loginUser');
      return { ...state, loginUser: null };
    default:
      return state;
  }
};

type SessionContextType = {
  session: Session;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const AdminSessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [session, dispatch] = useReducer(sessionReducer, { loginUser: null });

  // 마운트 및 초기 세션 복원
  useEffect(() => {
    setMounted(true);
    const initialSession = getInitialSession();
    if (initialSession.loginUser) {
      dispatch({ type: 'LOGIN', payload: initialSession.loginUser });
    }
    setIsLoading(false);
  }, []);

  // 세션스토리지 변경 이벤트 리스너
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'loginUser') {
        if (event.newValue) {
          const newUser = JSON.parse(event.newValue);
          dispatch({ type: 'LOGIN', payload: newUser });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      }
    };

    if (mounted) {
      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [mounted]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const agents = await fetchAllData<Agent>('agent');
      const agent = agents.find(
        (agent) => agent.agent_email === email && agent.agent_pw === password
      );

      if (agent) {
        const loginUser = {
          id: agent.id,
          agent_name: agent.agent_name,
          agent_email: agent.agent_email,
        };
        dispatch({ type: 'LOGIN', payload: loginUser });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // 초기 마운트 전 빈 레이아웃 반환
  if (!mounted) {
    return <div className='min-h-screen'>{children}</div>;
  }

  return (
    <SessionContext.Provider value={{ session, login, logout, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useAdminSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useAdminSession must be used within a SessionProvider');
  }
  return context;
};

// 세션 상태 확인을 위한 커스텀 훅
export const useIsAuthenticated = () => {
  const { session } = useAdminSession();
  return !!session.loginUser;
};
