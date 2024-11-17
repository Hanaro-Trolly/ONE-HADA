// hooks/useWebSocket.ts
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useState } from 'react';

interface UseWebSocketProps {
  customerId?: string;
  role: 'customer' | 'consultant';
}

export const useWebSocket = ({ customerId, role }: UseWebSocketProps) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);

  // 웹소켓 연결 함수
  const connectWebSocket = () => {
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      onConnect: () => {
        setConnected(true);
        console.log('WebSocket Connected!');
      },
      onDisconnect: () => {
        setConnected(false);
        console.log('WebSocket Disconnected!');
      },
    });

    client.activate();
    setStompClient(client);
  };

  // 웹소켓 연결 해제 함수
  const disconnectWebSocket = () => {
    if (stompClient) {
      stompClient.deactivate();
      setStompClient(null);
      setConnected(false);
    }
  };

  return { stompClient, connected, connectWebSocket, disconnectWebSocket };
};
