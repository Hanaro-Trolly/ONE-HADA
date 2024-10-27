'use client';

import adminData from '@/app/admin/data/AdminData.json';
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';

type LoginUser = { id: string; name: string };
type Session = { loginUser: LoginUser | null };
type AdminData = {
  id: string;
  password: string;
  name: string;
};

type Action = { type: 'LOGIN'; payload: LoginUser } | { type: 'LOGOUT' };

const initialSession: Session = {
  loginUser: null,
};

const sessionReducer = (state: Session, action: Action): Session => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, loginUser: action.payload };
    case 'LOGOUT':
      return { ...state, loginUser: null };
    default:
      return state;
  }
};

type SessionContextType = {
  session: Session;
  login: (id: string, password: string) => boolean;
  logout: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const AdminSessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, dispatch] = useReducer(sessionReducer, initialSession);
  const [admins, setAdmins] = useState<AdminData[]>([]);

  useEffect(() => {
    setAdmins(adminData.dummyadmins);
  }, []);

  const login = (id: string, password: string): boolean => {
    const admin = admins.find(
      (admin) => admin.id === id && admin.password === password
    );
    if (admin) {
      dispatch({ type: 'LOGIN', payload: { id: admin.id, name: admin.name } });
      return true;
    }
    return false;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
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
