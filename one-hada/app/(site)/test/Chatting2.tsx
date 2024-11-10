'use client'

import React, { useCallback, useRef, useState, useEffect, FormEvent } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// Message 타입 정의
interface Message {
    type: 'JOIN' | 'CHAT';
    sender: string;
    message?: string;
    history?: Message[];
    createdDt?: string;
}

// SockJS와 Stomp를 이용해서 웹 소켓 서버로 연결하고 메시지를 주고 받는 기능을 구현합니다.
const Chatting2: React.FC = () => {
    // 상태 변수 정의
    const [isJoin, setIsJoin] = useState<boolean>(false);
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [sender, setSender] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    
    // ref 변수 정의
    const refDialogDiv = useRef<HTMLDivElement>(null);
    const refSenderInput = useRef<HTMLInputElement>(null);
    const refMessageInput = useRef<HTMLInputElement>(null);
    const stompClient = useRef<Stomp.Client | null>(null);
    
    // 채팅 참여
    const joinChatting = useCallback((e: FormEvent) => {
        e.preventDefault();

        if (!sender) {
            alert('닉네임을 입력하세요.');
            refSenderInput.current?.focus();
            return;
        }

        stompClient.current = Stomp.over(() => new SockJS('http://localhost:8080/ws'));  
        stompClient.current.connect({}, onConnected, onError);
    }, [sender]);

    // 연결에 성공한 경우
    const onConnected = useCallback(() => {
        stompClient.current?.subscribe('/topic/chatting', onMessageReceived);
        stompClient.current?.send('/app/chat.addUser', {}, JSON.stringify({ sender, type: 'JOIN' }));
    }, [sender]);

    // 연결에 실패한 경우
    const onError = useCallback((error: any) => {
        console.log('연결실패', error);
    }, []);

    // 채팅 메시지를 전달하는 경우
    const sendMessage = useCallback((e: FormEvent) => {
        e.preventDefault();

        if (stompClient.current) {
            stompClient.current.send('/app/chat.sendMessage', {}, JSON.stringify({ sender, message, type: 'CHAT' }));
        }
        
        setMessage('');
        refMessageInput.current?.focus();
    }, [message, sender]);
    
    // 메시지를 수신한 경우
    const onMessageReceived = useCallback((payload: any) => {
        const message: Message = JSON.parse(payload.body);

        if (message.type === 'JOIN' && message.sender === sender) {
            setIsJoin(true);
            message.history?.forEach(msg => setChatHistory(chatHistory => [...chatHistory, msg]));
        } else {
            setChatHistory(chatHistory => [...chatHistory, message]);
        }
    }, [sender]);

    // 채팅 내용 출력 영역을 자동 스크롤
    useEffect(() => {
        if (refDialogDiv.current) {
            refDialogDiv.current.scroll({
                top: refDialogDiv.current.scrollHeight, 
                behavior: 'smooth'
            });
        }
    }, [chatHistory]);

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-4 overflow-auto h-80" ref={refDialogDiv}>
                        <div className="space-y-4">
                            {/* 채팅 내용을 출력 */}
                            {chatHistory.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`p-3 rounded-lg ${
                                        item.sender === sender
                                            ? 'bg-blue-100 text-blue-900 self-end'
                                            : 'bg-gray-100 text-gray-900 self-start'
                                    }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold">{item.sender}</span>
                                        <span className="text-xs text-gray-500">{item.createdDt}</span>
                                    </div>
                                    <p className="mt-1">{item.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="닉네임을 입력하세요."
                                maxLength={7}
                                ref={refSenderInput}
                                value={sender}
                                disabled={isJoin}
                                onChange={(e) => setSender(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        joinChatting(e);
                                    }
                                }}
                                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={joinChatting}
                                disabled={isJoin}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                참가
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">메시지</label>
                        <div className="flex items-start space-x-2">
                            <textarea
                                ref={refMessageInput}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        sendMessage(e);
                                    }
                                }}
                                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={sendMessage}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                전송
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatting2;