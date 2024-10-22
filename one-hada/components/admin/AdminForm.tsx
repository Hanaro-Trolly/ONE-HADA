'use client';

import { useState } from 'react';
import AdminInput from './AdminInput';
import AdminSubmitButton from './AdminSubmitButton';

const AdminForm = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = () => {
    const data = {
      title,
      content,
    };
    console.log('전송된 데이터:', data);
    alert('상담 정보가 등록되었습니다.');
    setTitle('');
    setContent('');
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

      <AdminSubmitButton onClick={handleSubmit} />
    </div>
  );
};

export default AdminForm;
