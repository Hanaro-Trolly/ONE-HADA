'use client';

import Modal from '@/components/layout/Modal';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getDataByUserId } from '@/lib/api';
import { History } from '@/lib/datatypes';

export default function HistoryModalPage({
  params: { historyId },
}: {
  params: { historyId: string };
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [history, setHistory] = useState<History | null>(null); // useState로 history 관리

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getDataByUserId<History>('history', historyId);
        if (data) {
          const foundHistory =
            data.find((item) => item.id === historyId) || null;
          setHistory(foundHistory); // 상태로 설정
        } else {
          console.error('No history found for the user.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadHistory();
  }, [historyId]);

  const handleSave = () => {
    const inputValue = inputRef.current?.value;
    if (!inputValue) {
      inputRef.current?.focus();
      return;
    }
    console.log('🚀 ~ handleSave ~ inputValue:', inputValue);
    console.log('🚀 ~ 체크된 항목 checkedList:', checkedList);

    // 전송 로직 추가
    router.back();
  };

  const handleCheckedItem = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
    } else {
      setCheckedList((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <Modal>
      <div className='flex flex-col gap-3 w-full'>
        <div className='w-full'>
          <h1 className='font-bold'>바로가기 등록</h1>
          <div className='flex justify-around pt-3'>
            <input
              ref={inputRef}
              defaultValue={history?.history_name}
              placeholder={history?.history_name}
              className='flex justify-center border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-0 transition duration-200 w-full'
            />
          </div>
        </div>
        <div className='flex flex-col justify-items-start'>
          {history?.history_params.split('#').map((value) => (
            <label key={value} className='flex items-center'>
              <input
                type='checkbox'
                checked={checkedList.includes(value)}
                onChange={(e) => handleCheckedItem(value, e.target.checked)}
              />
              <span className='ml-2'>{value}</span>
            </label>
          ))}
        </div>
        <div className='flex justify-between gap-4'>
          <Button
            id='cancle_historymodal'
            variant='outline'
            className='flex-1 rounded-lg hover:bg-gray-100 border-[#527887] border-opacity-30 text-[#61B89F]'
            onClick={() => router.back()}
          >
            취소
          </Button>
          <Button
            id='create_shortcut'
            className='flex-1 rounded-lg bg-[#61B89F] hover:bg-[#377b68] text-white'
            onClick={handleSave}
          >
            등록
          </Button>
        </div>
      </div>
    </Modal>
  );
}
