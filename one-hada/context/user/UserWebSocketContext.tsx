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
  startConsultation: (id: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [customerId, setCustomerId] = useState<string | undefined>(undefined);
  const [shouldConnect, setShouldConnect] = useState(false);
  const { stompClient, connected, connectWebSocket, disconnectWebSocket } =
    useWebSocket({
      role: 'customer',
      customerId,
    });

  useEffect(() => {
    if (customerId && shouldConnect) {
      connectWebSocket();
    }
  }, [customerId, shouldConnect]);

  useEffect(() => {
    if (stompClient && connected && customerId) {
      // 상담 종료 메시지 구독
      const endConsultationSub = stompClient.subscribe(
        `/topic/customer/${customerId}/end-consultation`,
        (message) => {
          const data = JSON.parse(message.body);
          if (data.message === 'consultation_ended') {
            // 웹소켓 연결 해제
            disconnectWebSocket();
            setShouldConnect(false);
            // 필요한 경우 추가 정리 작업 수행
            console.log('웹소켓이 해제되었습니다.');
          }
        }
      );

      return () => {
        endConsultationSub.unsubscribe();
      };
    }
  }, [stompClient, connected, customerId, disconnectWebSocket]);

  const startConsultation = (id: string) => {
    setCustomerId(id);
    setShouldConnect(true);
  };

  const sendButtonClick = (buttonId: string) => {
    // console.log('sendButtonClick!', customerId, stompClient, connected);
    if (!customerId || !shouldConnect) {
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
        startConsultation,
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
