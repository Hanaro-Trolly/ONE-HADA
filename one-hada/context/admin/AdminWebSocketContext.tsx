'use client';

import { useWebSocket } from '@/hooks/useWebsocket';
import { StompSubscription, Client } from '@stomp/stompjs';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useAdminSession } from './SessionContext';

interface WebSocketContextType {
  stompClient: Client | null;
  connected: boolean;
  buttonLogs: ButtonLog[];
  setButtonLogs: React.Dispatch<React.SetStateAction<ButtonLog[]>>;
}

interface ButtonLog {
  customerId: string;
  buttonId: string;
  screenshot: string;
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
  const connectionAttempted = useRef(false);

  const { stompClient, connected, connectWebSocket, disconnectWebSocket } =
    useWebSocket({
      role: 'consultant',
    });

  // 웹소켓 연결 관리
  useEffect(() => {
    if (session.loginUser) {
      connectionAttempted.current = true;
      console.log('웹소켓 연결');
      connectWebSocket();
    }

    return () => {
      if (stompClient) {
        disconnectWebSocket();
        connectionAttempted.current = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.loginUser]);

  // 구독 로직
  useEffect(() => {
    let subscription: StompSubscription | null = null;

    const subscribe = () => {
      if (stompClient && connected && !subscription) {
        try {
          subscription = stompClient.subscribe(
            '/topic/consultant/button-logs',
            (message) => {
              const log = JSON.parse(message.body);
              setButtonLogs((prev) => [...prev, log]);
            }
          );
        } catch (error) {
          console.error('구독 오류:', error);
        }
      }
    };

    subscribe();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [stompClient, connected]);

  return (
    <WebSocketContext.Provider
      value={{
        stompClient,
        connected,
        buttonLogs,
        setButtonLogs,
      }}
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
