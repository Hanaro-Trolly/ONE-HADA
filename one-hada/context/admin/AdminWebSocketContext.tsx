'use client';

import { useWebSocket } from '@/hooks/useWebsocket';
import { StompSubscription } from '@stomp/stompjs';
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
  const [subscription, setSubscription] = useState<StompSubscription>();
  const [shouldConnect, setShouldConnect] = useState<Boolean>(false);
  const { stompClient, connected, connectWebSocket, disconnectWebSocket } =
    useWebSocket({
      role: 'consultant',
    });

  useEffect(() => {
    sessionStorage.setItem('wsConnected', 'true');
    setShouldConnect(Boolean(sessionStorage.getItem('wsConnected')));
  }, [session.loginUser]);

  useEffect(() => {
    if (shouldConnect) {
      connectWebSocket();
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [shouldConnect]);

  useEffect(() => {
    if (stompClient && connected) {
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
