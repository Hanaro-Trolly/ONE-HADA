'use client';

import { useWebSocket } from '@/hooks/useWebsocket';
import { useSession } from 'next-auth/react';
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
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { data: session } = useSession();
  const [customerId, setCustomerId] = useState<string | undefined>(undefined);
  const [isConsultation, setIsConsultation] = useState<boolean | null>(false);
  const { stompClient, connected, connectWebSocket, disconnectWebSocket } =
    useWebSocket({
      role: 'customer',
      customerId,
    });

  useEffect(() => {
    const handleStorageChange = () => {
      const consultationState = Boolean(
        sessionStorage.getItem('consultationState')
      );
      setIsConsultation(consultationState);
    };

    // 초기 상태 확인
    if (typeof window !== 'undefined') {
      handleStorageChange();
    }

    // storage 이벤트 리스너 등록
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (isConsultation && session?.user.id) {
      setCustomerId(session.user.id);
      connectWebSocket();
    }
  }, [isConsultation, session]);

  useEffect(() => {
    if (stompClient && connected && customerId) {
      console.log(stompClient, connectWebSocket, customerId);
      // 상담 종료 메시지 구독
      const endConsultationSub = stompClient.subscribe(
        `/topic/customer/${customerId}/end-consultation`,
        (message) => {
          const data = JSON.parse(message.body);
          if (data.message === 'consultation_ended') {
            // 웹소켓 연결 해제
            sessionStorage.setItem('consultationState', 'false');
            setIsConsultation(false);
            disconnectWebSocket();
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

  const sendButtonClick = (buttonId: string) => {
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
