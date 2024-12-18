'use client';

import { useWebSocket } from '@/hooks/useWebsocket';
import { Client } from '@stomp/stompjs';
import { useSession } from 'next-auth/react';
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

interface WebSocketContextType {
  stompClient: Client | null;
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
    const handleStateChange = (event: CustomEvent) => {
      setIsConsultation(event.detail.state);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener(
        'consultationStateChange',
        handleStateChange as EventListener
      );
    }

    return () => {
      window.removeEventListener(
        'consultationStateChange',
        handleStateChange as EventListener
      );
    };
  }, []);

  useEffect(() => {
    if (isConsultation && session?.user.id) {
      setCustomerId(session.user.id);
      // 연결 시도 전 상태 초기화

      const connect = async () => {
        try {
          await connectWebSocket();
          console.log('웹소켓 연결 성공');
          // 연결 성공 후 즉시 구독
        } catch (error) {
          console.error('연결 실패:', error);
        }
      };

      connect();
    }
  }, [isConsultation, session]);

  useEffect(() => {
    if (stompClient?.connected) {
      console.log('연결양호');
      const endConsultationSub = stompClient.subscribe(
        `/topic/customer/${session?.user.id}/end-consultation`,
        async (message) => {
          try {
            const data = JSON.parse(message.body);
            if (data.message === 'consultation_ended') {
              console.log('상담 종료 메시지 수신');

              // 구독 해제
              if (endConsultationSub) {
                endConsultationSub.unsubscribe();
              }

              // 상태 업데이트
              sessionStorage.setItem('consultationState', 'false');
              window.dispatchEvent(
                new CustomEvent('consultationStateChange', {
                  detail: { state: false },
                })
              );
              setIsConsultation(false);

              // 웹소켓 연결 종료
              try {
                await stompClient.deactivate();
                await disconnectWebSocket();
                console.log('웹소켓 연결 정상 종료');

                setIsConsultation(false);
                setCustomerId(undefined);
              } catch (error) {
                console.error('웹소켓 종료 중 오류:', error);
              }
            }
          } catch (error) {
            console.error('메시지 파싱 실패:', error);
          }
        }
      );
    }
  }, [stompClient?.connected]);

  const sendButtonClick = (buttonId: string) => {
    if (!stompClient?.connected) {
      console.log('STOMP 연결이 없습니다');
      return;
    }

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
