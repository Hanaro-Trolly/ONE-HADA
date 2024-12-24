'use client';

import { useWebSocket } from '@/hooks/useWebsocket';
import { StompSubscription, Client } from '@stomp/stompjs';
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
  stompClient: Client | null;
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
  const [subscription, setSubscription] = useState<StompSubscription>();
  const [shouldConnect, setShouldConnect] = useState<boolean>(false);
  const { stompClient, connected, connectWebSocket } = useWebSocket({
    role: 'consultant',
  });

  useEffect(() => {
    sessionStorage.setItem('wsConnected', 'true');
    setShouldConnect(Boolean(sessionStorage.getItem('wsConnected')));
  }, [session.loginUser]);

  useEffect(() => {
    if (shouldConnect) {
      connectWebSocket();
      console.log('웹소켓 연결 성공');
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [shouldConnect, connectWebSocket, subscription]);

  useEffect(() => {
    if (stompClient && connected) {
      const buttonSub = stompClient.subscribe(
        '/topic/consultant/button-logs',
        (message) => {
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
