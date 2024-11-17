import { useWebSocket } from '@/hooks/useWebsocket';
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface WebSocketContextType {
  stompClient: any;
  connected: boolean;
  sendButtonClick: (buttonId: string) => void;
  setCustomerId: (id: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [customerId, setCustomerId] = useState<string | null>(null);
  const { stompClient, connected } = useWebSocket({
    role: 'customer',
    customerId: customerId!,
  });

  const sendButtonClick = (buttonId: string) => {
    if (!customerId) {
      console.warn('No customerId provided for WebSocket communication');
      return;
    }

    if (stompClient && connected) {
      stompClient.publish({
        destination: '/app/button.click',
        body: JSON.stringify({
          type: 'BUTTON_CLICK',
          customerId,
          buttonId,
          timestamp: new Date().toISOString(),
          path: window.location.pathname,
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
