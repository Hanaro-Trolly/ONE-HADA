'use client';

import { useWebSocket } from '@/hooks/useWebsocket';
import { Client, StompSubscription } from '@stomp/stompjs';
import { useSession } from 'next-auth/react';
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

interface WebSocketContextType {
  stompClient: Client | null;
  connected: boolean;
  sendButtonClick: (buttonId: string) => void;
  setCustomerId: (id: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
  stompClient: null,
  connected: false,
  sendButtonClick: () => {},
  setCustomerId: () => {},
});

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [customerId, setCustomerId] = useState<string | undefined>(undefined);
  const [isConsultation, setIsConsultation] = useState<boolean>(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const maxRetries = 3;

  const { stompClient, connected, connectWebSocket, disconnectWebSocket } =
    useWebSocket({
      role: 'customer',
      customerId,
    });

  // 스토리지 변경 감지
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const consultationState = Boolean(
          sessionStorage.getItem('consultationState')
        );
        setIsConsultation(consultationState);
      } catch (error) {
        console.error('Storage access error:', error);
      }
    };

    if (typeof window !== 'undefined') {
      handleStorageChange();
      window.addEventListener('storage', handleStorageChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange);
      }
    };
  }, []);

  // 웹소켓 연결 관리
  useEffect(() => {
    let isActive = true;
    let retryTimeout: NodeJS.Timeout;

    const initializeWebSocket = async () => {
      if (!isConsultation || !session?.user?.id || !isActive) return;

      try {
        setCustomerId(session.user.id);
        await connectWebSocket();
        setConnectionAttempts(0); // 연결 성공시 시도 횟수 리셋
      } catch (error) {
        console.error('WebSocket connection error:', error);

        // 재시도 로직
        if (connectionAttempts < maxRetries && isActive) {
          setConnectionAttempts((prev) => prev + 1);
          retryTimeout = setTimeout(initializeWebSocket, 2000); // 2초 후 재시도
        }
      }
    };

    initializeWebSocket();

    return () => {
      isActive = false;
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
      if (stompClient) {
        disconnectWebSocket();
      }
    };
  }, [
    isConsultation,
    session?.user?.id,
    connectWebSocket,
    connectionAttempts,
    stompClient,
    disconnectWebSocket,
  ]);

  // 구독 관리
  useEffect(() => {
    let subscription: StompSubscription | null = null;
    let retryTimeout: NodeJS.Timeout;

    const setupSubscription = async () => {
      if (!stompClient || !connected || !customerId) return;

      try {
        // 연결 상태 한번 더 확인
        if (!stompClient.connected) {
          throw new Error('STOMP connection not ready');
        }

        subscription = stompClient.subscribe(
          `/topic/customer/${customerId}/end-consultation`,
          (message) => {
            try {
              const data = JSON.parse(message.body);
              if (data.message === 'consultation_ended') {
                sessionStorage.setItem('consultationState', 'false');
                setIsConsultation(false);
                disconnectWebSocket();
              }
            } catch (error) {
              console.error('Message parsing error:', error);
            }
          }
        );
      } catch (error) {
        console.error('Subscription error:', error);
        // 구독 실패시 3초 후 재시도
        retryTimeout = setTimeout(setupSubscription, 3000);
      }
    };

    setupSubscription();

    return () => {
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch (error) {
          console.error('Unsubscribe error:', error);
        }
      }
    };
  }, [stompClient, connected, customerId, disconnectWebSocket]);

  const sendButtonClick = useCallback(
    (buttonId: string) => {
      if (!stompClient || !connected || !customerId) {
        console.warn('WebSocket is not ready');
        return;
      }

      try {
        stompClient.publish({
          destination: '/app/button.click',
          body: JSON.stringify({
            type: 'BUTTON_CLICK',
            customerId,
            buttonId,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error('Failed to send button click:', error);
      }
    },
    [stompClient, connected, customerId]
  );

  const contextValue = useMemo(
    () => ({
      stompClient,
      connected,
      sendButtonClick,
      setCustomerId,
    }),
    [stompClient, connected, sendButtonClick]
  );

  return (
    <WebSocketContext.Provider value={contextValue}>
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
