'use clinet';

import TypeButton from '@/components/molecules/TypeButton';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useFetch } from '@/hooks/useFetch';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import { formatDate } from '@/lib/formatDate';
import { Button } from '../ui/button';

interface SearchFormProps {
  onSearch: () => void;
}

const PERIOD_OPTIONS = ['전체', '1개월', '3개월', '6개월', '1년'] as const;
const TRANSACTION_TYPES = ['전체', '입금', '출금'] as const;

export default function SearchForm({ onSearch }: SearchFormProps) {
  const { fetchData, error } = useFetch();
  const [formState, setFormState] = useState({
    period: '전체',
    type: '전체',
    startDate: '',
    endDate: '',
    searchKeyword: '',
  });

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const buttonClassName = (isSelected: boolean) => `
  ${isSelected ? 'bg-[#95D0BF] text-white' : 'bg-[#ffffff] text-black shadow-none hover:bg-[#95D0BF] hover:text-white'}
  rounded-full px-4 py-2 focus:bg-[#95D0BF] focus:text-white
`;

  const formatDateForInput = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };

  const handleDateClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.showPicker();
  };

  const handleFormChange = (field: string, value: string) => {
    // 날짜 필드가 아닌 경우 또는 period인 경우 직접 값 설정
    if (field !== 'startDate' && field !== 'endDate') {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
        ...(field === 'period' ? { startDate: '', endDate: '' } : {}),
      }));
      return;
    }

    // 날짜 필드인 경우 (startDate, endDate)
    if (value) {
      // 입력된 날짜를 UTC 기준으로 변환
      const date = new Date(value);
      // 시간을 현지 시간대로 설정
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      const isoString = localDate.toISOString();

      setFormState((prev) => ({
        ...prev,
        [field]: isoString,
        period: '전체', // 날짜 직접 입력 시 period 초기화
      }));
    } else {
      // 날짜가 비어있는 경우
      setFormState((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const createPeriodText = (formState: Record<string, string>) => {
    return formState.startDate && formState.endDate
      ? `${formatDate(formState.startDate)}부터 ${formatDate(formState.endDate)}`
      : formState.period;
  };

  const setRedis = async () => {
    const periodText = createPeriodText(formState);
    const response = await fetchData(`/api/redis`, {
      method: 'POST',
      body: {
        period: periodText,
        transferType: formState.type,
        searchWord: formState.searchKeyword,
      },
    });

    return response;
  };

  const handleSubmit = async () => {
    const response = await setRedis();
    if (response.code == 200) {
      onSearch();
    } else {
      console.error('레디스 저장 실패');
    }
    setFormState({
      period: '전체',
      type: '전체',
      startDate: '',
      endDate: '',
      searchKeyword: '',
    });
  };

  useEffect(() => {
    if (error) {
      console.error('Fetch 에러 발생:', error);
    }
  }, [error]);

  return (
    <Drawer>
      <div className='bg-white flex justify-center items-center relative'>
        <h1 className='text-center mt-6 mb-6 text-xl font-medium'>거래 내역</h1>
        <DrawerTrigger asChild>
          <Button
            id='checkButtonSearch'
            className='mt-6 mb-6 px-4 py-2 absolute right-8 tossface-icon bg-[#61B89F] rounded-full hover:bg-[#479e86]'
          >
            <MagnifyingGlassIcon className='text-white size-4' />
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <DrawerHeader className='sr-only'>
          <DrawerTitle>거래 내역</DrawerTitle>
          <DrawerDescription>검색 조건 설정</DrawerDescription>
        </DrawerHeader>
        <div className='bg-white shadow-md rounded-lg mt-8 p-8 flex-grow flex flex-col justify-between items-start'>
          {/* 조회기간 섹션 */}
          <div className='w-full my-2'>
            <p className='text-md font-semibold'>조회기간</p>
            <div className='flex justify-between mt-2'>
              {PERIOD_OPTIONS.map((periodOption) => (
                <TypeButton
                  key={periodOption}
                  button_type='조회기간'
                  onClick={() => handleFormChange('period', periodOption)}
                  className={buttonClassName(formState.period === periodOption)}
                >
                  {periodOption}
                </TypeButton>
              ))}
            </div>

            <div>
              <div className='flex justify-between items-center mt-2'>
                <input
                  type='date'
                  ref={startDateRef}
                  name='startDate'
                  value={formatDateForInput(formState.startDate)}
                  onChange={(e) =>
                    handleFormChange('startDate', e.target.value)
                  }
                  onClick={() => handleDateClick(startDateRef)}
                  className='w-36 border text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-inset focus:ring-main-green focus:outline-none cursor-pointer'
                  placeholder='시작 날짜'
                />
                <span>~</span>
                <input
                  type='date'
                  ref={endDateRef}
                  name='endDate'
                  value={formatDateForInput(formState.endDate)}
                  onChange={(e) => handleFormChange('endDate', e.target.value)}
                  onClick={() => handleDateClick(endDateRef)}
                  className='w-36 border text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-inset focus:ring-main-green focus:outline-none cursor-pointer'
                  placeholder='종료 날짜'
                />
              </div>
            </div>
          </div>

          {/* 거래 구분 섹션 */}
          <div className='w-full my-2'>
            <p className='text-md mt-4 font-semibold'>거래 구분</p>
            <div className='flex gap-2 mt-2'>
              {TRANSACTION_TYPES.map((transactionType) => (
                <TypeButton
                  key={transactionType}
                  button_type='거래구분'
                  onClick={() => handleFormChange('type', transactionType)}
                  className={buttonClassName(
                    formState.type === transactionType
                  )}
                >
                  {transactionType}
                </TypeButton>
              ))}
            </div>
          </div>

          {/* 검색어 섹션 */}
          <div className='w-full my-2'>
            <p className='text-md mt-4 font-semibold'>검색어</p>
            <input
              type='text'
              value={formState.searchKeyword}
              onChange={(e) =>
                handleFormChange('searchKeyword', e.target.value)
              }
              className='border rounded-full mt-2 px-4 py-2 w-1/2 bg-[#DCEFEA] focus:ring-2 focus:ring-inset focus:ring-main-green focus:outline-none'
              placeholder='검색어 입력'
            />
          </div>

          {/* 조회하기 버튼 */}
          <div className='flex justify-center w-full mt-2'>
            <DrawerClose asChild className='w-full'>
              <Button
                id='checkButtonSearchSubmit'
                onClick={handleSubmit}
                tabIndex={0}
                className='w-4/5 mt-6 px-6 py-2 bg-[#61B89F] text-white rounded-md hover:bg-[#377B68]'
              >
                조회하기
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
