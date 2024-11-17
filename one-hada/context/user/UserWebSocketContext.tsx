'use client';

import { useWebSocket } from '@/hooks/useWebsocket';
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

interface WebSocketContextType {
  stompClient: any;
  connected: boolean;
  sendButtonClick: (buttonId: string) => void;
  setCustomerId: (id: string) => void;
  customerId: string | undefined;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [customerId, setCustomerId] = useState<string | undefined>(undefined);
  const { stompClient, connected, connectWebSocket } = useWebSocket({
    role: 'customer',
    customerId,
  });

  useEffect(() => {
    if (customerId) {
      connectWebSocket();
    }
  }, [customerId]);

  const sendButtonClick = (buttonId: string) => {
    console.log('sendButtonClick!', customerId, stompClient, connected);
    if (!customerId) {
      console.warn('No customerId provided for WebSocket communication');
      return;
    }

    if (stompClient && connected) {
      console.log('버튼로그전송');
      stompClient.publish({
        destination: '/app/button.click',
        body: JSON.stringify({
          type: 'BUTTON_CLICK',
          customerId,
          buttonId,
          timestamp: new Date().toISOString(),
        }),
      });
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        stompClient,
        connected,
        sendButtonClick,
        setCustomerId,
        customerId,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      'useWebSocketContext must be used within a WebSocketProvider'
    );
  }
  return context;
};
