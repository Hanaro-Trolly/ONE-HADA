'use client';

import React, { createContext, useContext, useReducer } from 'react';
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
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const AdminSessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, dispatch] = useReducer(sessionReducer, initialSession);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const agents = await fetchAllData<Agent>('agent');
      const agent = agents.find(
        (agent) => agent.agent_email === email && agent.agent_pw === password
      );

      if (agent) {
        dispatch({
          type: 'LOGIN',
          payload: {
            id: agent.id,
            agent_name: agent.agent_name,
            agent_email: agent.agent_email,
          },
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
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
