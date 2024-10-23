'use client';

import Modal from '@/components/layout/Modal';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

type Temp = {
  historyId: number;
  memberId: number;
  title: string;
  date: string;
  isConsulting: boolean;
};
const TempTable: Temp[] = [
  {
    historyId: 1,
    memberId: 2000,
    title: '메가커피 결제내역 확인',
    date: '2024.10.22',
    isConsulting: false,
  },
  {
    historyId: 2,
    memberId: 2000,
    title: '오늘 입금내역 확인',
    date: '2024.10.22',
    isConsulting: false,
  },
  {
    historyId: 3,
    memberId: 2000,
    title: '시온이한테 2억 송금',
    date: '2024.10.21',
    isConsulting: false,
  },
  {
    historyId: 4,
    memberId: 2000,
    title: '한달간 출금 내역 확인',
    date: '2024.10.18',
    isConsulting: false,
  },
];

export default function HistoryModalPage({
  params: { historyId },
}: {
  params: { historyId: string };
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const item = TempTable.find((item) => item.historyId === parseInt(historyId));
  if (!item) return <> History Not Found</>;

  const handleSave = () => {
    const inputValue = inputRef.current?.value;
    if (!inputValue) {
      inputRef.current?.focus();
      return; // 타이틀에 포커스 주고 모달 닫으면 안됨.
    }
    console.log('🚀 ~ handleSave ~ inputValue:', inputValue);

    // 전송 로직 추가
    router.back();
  };

  return (
    <Modal>
      <div className='flex flex-col gap-3 w-full'>
        <div className='w-full'>
          <h1 className='font-bold'>바로가기 등록</h1>
          <div className='flex justify-around pt-3'>
            <input
              ref={inputRef}
              defaultValue={item?.title}
              placeholder={item?.title}
              className='flex justify-center border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-0 transition duration-200 w-full'
            ></input>
          </div>
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
