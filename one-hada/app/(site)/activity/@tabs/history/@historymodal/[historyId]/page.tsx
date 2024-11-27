'use client';

import CheckBoxCard from '@/components/activity/CheckBoxCard';
import Modal from '@/components/layout/Modal';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { addData, fetchAllData, getData } from '@/lib/api';
import { History, Shortcut } from '@/lib/datatypes';

type HistoryElementType = {
  type: string;
  myAccount?: string;
  receiverAccount?: string;
  amount?: string;
  period?: string;
  transferType?: string;
  searchWord?: string;
};

export default function HistoryModalPage({
  params: { historyId },
}: {
  params: { historyId: string };
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [history, setHistory] = useState<History | null>(null);
  const [historyElements, setHistoryElements] = useState<HistoryElementType>({
    type: '',
  });
  const { data: session } = useSession();

  const handleSave = async () => {
    const inputValue = inputRef.current?.value;
    if (!inputValue) {
      inputRef.current?.focus();
      return;
    }

    const checkedElements = checkedList.reduce(
      (acc, key) => {
        if (key in historyElements) {
          acc[key] = historyElements[key as keyof HistoryElementType];
        }
        return acc;
      },
      { type: historyElements.type } as Record<string, any>
    );

    try {
      const existingShortcuts = await fetchAllData<Shortcut>('shortcut');
      const newId =
        existingShortcuts.length > 0
          ? Math.max(...existingShortcuts.map((shortcut) => +shortcut.id)) + 1
          : 1;

      const new_shortcut: Shortcut = {
        id: '' + newId,
        user_id: session?.user.id || '',
        shortcut_name: inputRef.current.value,
        shortcut_elements: JSON.stringify(checkedElements), // 직렬화된 데이터
        is_Favorite: false,
      };

      await addData('shortcut', new_shortcut);
      router.back();
    } catch (error) {
      console.error('Shortcut 저장 중 오류 발생:', error);
    }
  };

  const handleCheckedItem = (key: string, isChecked: boolean) => {
    setCheckedList((prev) =>
      isChecked ? [...prev, key] : prev.filter((item) => item !== key)
    );
  };

  const filteredElements = useMemo(() => {
    return Object.entries(historyElements)
      .filter(([key]) => key !== 'type' && key !== 'myAccount')
      .map(([key, value]) => ({
        key,
        value,
      }));
  }, [historyElements]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getData<History>('history', historyId);
        if (data) {
          setHistory(data);
          setHistoryElements(JSON.parse(data.history_elements));
        } else {
          console.error('No history found for the user.');
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadHistory();
  }, [historyId]);

  useEffect(() => {
    const initialCheckedList = filteredElements.map(({ key }) => key);
    setCheckedList(initialCheckedList);
  }, [filteredElements]);

  return (
    <Modal>
      <div className='flex flex-col gap-2 w-full'>
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
        {filteredElements.length > 0 ? (
          <>
            <div className='text-sm font-semibold'>
              내계좌: {historyElements.myAccount}
            </div>
            <div className='flex flex-col justify-items-start'>
              {filteredElements.map(({ key, value }) => (
                <CheckBoxCard
                  key={key}
                  title={key}
                  description={value}
                  isChecked={checkedList.includes(key)}
                  onChange={handleCheckedItem}
                />
              ))}
            </div>
          </>
        ) : (
          <div></div>
        )}
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
