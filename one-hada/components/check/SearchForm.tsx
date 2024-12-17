import TypeButton from '@/components/molecules/TypeButton';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface SearchFormProps {
  onSearch: (params: Record<string, string>) => void;
}

const PERIOD_OPTIONS = ['전체', '1개월', '3개월', '6개월', '1년'] as const;
const TRANSACTION_TYPES = ['전체', '입금', '출금'] as const;

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [formState, setFormState] = useState({
    period: '전체',
    type: '전체',
    startDate: '',
    endDate: '',
    searchKeyword: '',
  });

  const handleFormChange = (field: string, value: string) => {
    const date = new Date(value);
    const dateTimeString = date.toISOString();

    setFormState((prev) => ({
      ...prev,
      [field]: dateTimeString,
      ...(field === 'period' ? { startDate: '', endDate: '' } : {}),
      ...(field === 'startDate' || field === 'endDate'
        ? { period: '전체' }
        : {}),
    }));
  };

  const handleSubmit = () => {
    onSearch(formState);
  };

  const buttonClassName = (isSelected: boolean) => `
    ${isSelected ? 'bg-[#95D0BF] text-white' : 'bg-[#ffffff] text-black shadow-none hover:bg-[#95D0BF] hover:text-white'}
    rounded-full px-4 py-2 focus:bg-[#95D0BF] focus:text-white
  `;

  return (
    <Drawer>
      <div className='bg-white flex justify-center items-center relative'>
        <h1 className='text-center mt-6 mb-6 text-xl font-medium'>거래 내역</h1>
        <DrawerTrigger className='mt-6 mb-6 px-4 py-2 absolute right-8 tossface-icon bg-[#61B89F] rounded-full hover:bg-[#479e86]'>
          <MagnifyingGlassIcon className='text-white size-4' />
        </DrawerTrigger>
      </div>
      <DrawerContent>
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
                  value={formState.startDate}
                  onChange={(e) =>
                    handleFormChange('startDate', e.target.value)
                  }
                  className='w-36 border text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-inset focus:ring-main-green focus:outline-none'
                  placeholder='시작 날짜'
                />
                <span>~</span>
                <input
                  type='date'
                  value={formState.endDate}
                  onChange={(e) => handleFormChange('endDate', e.target.value)}
                  className='w-36 border text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-inset focus:ring-main-green focus:outline-none'
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
            <DrawerClose className='w-full'>
              <button
                onClick={handleSubmit}
                className='w-4/5 mt-6 px-6 py-2 bg-[#61B89F] text-white rounded-md hover:bg-[#377B68]'
              >
                조회하기
              </button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
