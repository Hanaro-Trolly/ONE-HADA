'use client';

import { useState } from 'react';
import { addData } from '@/lib/api';
import AdminInput from './AdminInput';
import AdminSubmitButton from './AdminSubmitButton';

interface AdminInputFormProps {
  userId: string;
}

export default function AdminInputForm({ userId }: AdminInputFormProps) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = async () => {
    const currentTime = new Date().toLocaleString();

    const data = {
      title,
      content,
      time: currentTime,
      userId,
    };

    try {
      await addData('counsel', data);
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
