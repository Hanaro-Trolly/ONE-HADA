'use client';

import { useState } from 'react';
import { addData } from '@/lib/api';
import AdminInput from './AdminInput';
import AdminSubmitButton from './AdminSubmitButton';

interface AdminInputFormProps {
  userId: string;
  agentId: string; // agentId 추가
}

export default function AdminInputForm({
  userId,
  agentId,
}: AdminInputFormProps) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = async () => {
    const currentTime = new Date().toISOString(); // ISO 형식으로 날짜 포맷

    const data = {
      id: Date.now().toString(), // 임의의 고유 ID 생성
      agent_id: agentId,
      user_id: userId,
      consultation_title: title,
      consultation_content: content,
      consultation_date: currentTime,
    };

    try {
      await addData('consultation', data); // consultation 리소스에 추가
      alert('상담 정보가 등록되었습니다.');
      setTitle('');
      setContent('');
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
