// hooks/useWebSocket.ts
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useCallback, useState } from 'react';

interface UseWebSocketProps {
  customerId?: string;
  role: 'customer' | 'consultant';
}

export const useWebSocket = ({ customerId, role }: UseWebSocketProps) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);

  const connectWebSocket = useCallback(() => {
    if (stompClient) {
      stompClient.deactivate();
      setStompClient(null);
      setConnected(false);
    }

    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.NEXT_PUBLIC_BASE_URL}/ws`),
      onConnect: () => {
        setConnected(true);
      },
      onDisconnect: () => {
        setConnected(false);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.activate();
    setStompClient(client);
  }, []); // 외부 의존성이 없으므로 빈 배열 사용

  const disconnectWebSocket = useCallback(() => {
    if (stompClient) {
      stompClient.deactivate();
      setStompClient(null);
      setConnected(false);
    }
  }, [stompClient]);

  return { stompClient, connected, connectWebSocket, disconnectWebSocket };
};
