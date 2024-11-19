'use client';

import { useAdminWebSocket } from '@/context/admin/AdminWebSocketContext';
import { useCounsel } from '@/context/admin/CounselContext';
import { useAdminSession } from '@/context/admin/SessionContext';
import { useState } from 'react';
import { addData } from '@/lib/api';
import AdminInput from './AdminInput';
import AdminSubmitButton from './AdminSubmitButton';

interface AdminInputFormProps {
  userId: string;
}

export default function AdminInputForm({ userId }: AdminInputFormProps) {
  const { stompClient, setButtonLogs } = useAdminWebSocket();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { refetchCounselData } = useCounsel();
  const { session } = useAdminSession(); // SessionContext에서 로그인 정보 가져오기

  const handleSubmit = async () => {
    const currentTime = new Date().toISOString();

    const data = {
      id: Date.now().toString(), // 임의의 고유 ID 생성
      agent_id: session.loginUser?.id, // Session에서 가져온 agent ID
      user_id: userId,
      consultation_title: title,
      consultation_content: content,
      consultation_date: currentTime,
    };

    try {
      await addData('consultation', data);
      alert('상담 정보가 등록되었습니다.');
      setTitle('');
      setContent('');
      console.log(data);
      refetchCounselData();

      if (stompClient && stompClient.connected) {
        stompClient.publish({
          destination: `/topic/customer/${userId}/end-consultation`,
          body: JSON.stringify({
            message: 'consultation_ended',
            timestamp: currentTime,
          }),
        });
        setButtonLogs([]);
        console.log('상담 종료 요청 전송');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('데이터 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <AdminInput
        label='상담 제목'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        inputType='text'
      />

      <AdminInput
        label='상담 내용'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        inputType='textarea'
      />
      <div className='flex justify-center items-center'>
        <AdminSubmitButton onClick={handleSubmit} />
      </div>
    </div>
  );
}
