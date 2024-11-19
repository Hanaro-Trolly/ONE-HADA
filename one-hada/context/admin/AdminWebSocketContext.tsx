'use client';

import { useWebSocket } from '@/hooks/useWebsocket';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { useAdminSession } from './SessionContext';

interface WebSocketContextType {
  stompClient: any;
  connected: boolean;
  buttonLogs: ButtonLog[];
  setButtonLogs: Dispatch<SetStateAction<ButtonLog[]>>;
}

interface ButtonLog {
  customerId: string;
  buttonId: string;
  timestamp: string;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const AdminWebSocketProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { session } = useAdminSession();
  const [buttonLogs, setButtonLogs] = useState<ButtonLog[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const { stompClient, connected, connectWebSocket, disconnectWebSocket } =
    useWebSocket({
      role: 'consultant',
    });

  useEffect(() => {
    if (session.loginUser) {
      connectWebSocket();
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      disconnectWebSocket();
    };
  }, [session.loginUser]);

  useEffect(() => {
    if (stompClient && connected) {
      // 버튼 클릭 로그 구독
      const buttonSub = stompClient.subscribe(
        '/topic/consultant/button-logs',
        (message) => {
          console.log('new message');
          const log = JSON.parse(message.body);
          setButtonLogs((prev) => [...prev, log]);
        }
      );
      setSubscription(buttonSub);

      return () => {
        buttonSub.unsubscribe();
      };
    }
  }, [stompClient, connected]);

  return (
    <WebSocketContext.Provider
      value={{ stompClient, connected, buttonLogs, setButtonLogs }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useAdminWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      'useAdminWebSocket must be used within an AdminWebSocketProvider'
    );
  }
  return context;
};
