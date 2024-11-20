'use client';

import { useCounsel } from '@/context/admin/CounselContext';
import { useAdminSession } from '@/context/admin/SessionContext';
import { useState } from 'react';
import { addData } from '@/lib/api';
import AdminInput from './AdminInput';
import AdminSubmitButton from './AdminSubmitButton';

// Types
interface AdminInputFormProps {
  userId: string;
}

interface ConsultationData {
  id: string;
  agent_id: string | undefined;
  user_id: string;
  consultation_title: string;
  consultation_content: string;
  consultation_date: string;
}

export default function AdminInputForm({ userId }: AdminInputFormProps) {
  // State
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  // Hooks
  const { refetchCounselData } = useCounsel();
  const { session } = useAdminSession();

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: 'title' | 'content'
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const consultationData: ConsultationData = {
      id: Date.now().toString(),
      agent_id: session.loginUser?.id,
      user_id: userId,
      consultation_title: formData.title,
      consultation_content: formData.content,
      consultation_date: new Date().toISOString(),
    };

    try {
      await addData('consultation', consultationData);
      await refetchCounselData();

      setFormData({ title: '', content: '' });
      alert('상담 정보가 등록되었습니다.');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('데이터 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='space-y-6'>
      <AdminInput
        label='상담 제목'
        value={formData.title}
        onChange={(e) => handleInputChange(e, 'title')}
        inputType='text'
      />

      <AdminInput
        label='상담 내용'
        value={formData.content}
        onChange={(e) => handleInputChange(e, 'content')}
        inputType='textarea'
      />

      <div className='flex justify-center'>
        <AdminSubmitButton onClick={handleSubmit} />
      </div>
    </div>
  );
}
