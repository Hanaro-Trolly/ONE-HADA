'use client';

import BankIcon from '@/components/molecules/BankIcon';
import TypeButton from '@/components/molecules/TypeButton';
import { useEffect, useState } from 'react';
import { getData, addData } from '@/lib/api';
import { History } from '@/lib/datatypes';
// postData 함수 가져오기
import { Account } from '@/lib/datatypes';

// History 타입 정의
// type History = {
//   id: string;
//   user_id: string;
//   history_name: string;
//   history_type: 'inquiry' | 'transfer' | 'acc';
//   history_params: string;
//   activity_date: Date;
//   is_Shortcut: boolean;
// };

export default function AccountDetailPage({
  params,
}: {
  params: { accountId: string };
}) {
  const { accountId } = params;
  const [account, setAccount] = useState<Account | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('전체');
  const [selectedType, setSelectedType] = useState<string>('전체');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // account 데이터 가져오기
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await getData<Account>('account', accountId); // 'account' 리소스에서 accountId로 데이터 가져오기
        setAccount(data); // 가져온 데이터를 상태로 설정
      } catch (error) {
        console.error('계좌 데이터 가져오기 오류:', error);
      }
    };

    fetchAccount();
  }, [accountId]);

  // account가 없을 때 처리
  if (!account) {
    return <div>계좌를 찾을 수 없습니다.</div>;
  }

  const handlePeriodClick = (period: string) => {
    setSelectedPeriod(period);
    setStartDate('');
    setEndDate('');
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  // 조회하기 버튼 클릭 시 호출되는 함수
  const handleSearchClick = async () => {
    const historyId = Math.random().toString(36).substring(2, 15); // 랜덤 ID 생성
    const historyName = `${selectedPeriod} 동안 ${selectedType} 내역 ${searchKeyword} 조회하기`; // 조회 이름 생성
    const historyType = 'inquiry'; // history_type
    const historyParams = `${accountId}#${selectedPeriod}#${startDate}#${endDate}#${selectedType}#${searchKeyword}`; // 파라미터 생성
    const activityDate = new Date(); // 현재 날짜
    const isShortcut = false; // 단축키 여부

    const historyData: History = {
      id: historyId,
      user_id: account.user_id, // 사용자 ID는 account에서 가져옵니다
      history_name: historyName,
      history_type: historyType,
      history_params: historyParams,
      activity_date: activityDate,
      is_Shortcut: isShortcut,
    };

    try {
      // API를 통해 historyData 저장
      await addData<History>('history', historyData);
      console.log('History saved:', historyData);
    } catch (error) {
      console.error('조회 기록 저장 오류:', error);
      return; // 에러 발생 시 종료
    }

    // 검색 결과 페이지로 이동
    const queryString = `period=${selectedPeriod}&type=${selectedType}&accountId=${account.id}&startDate=${startDate}&endDate=${endDate}&search=${searchKeyword}`;
    window.location.href = `/check/${account.id}/detail?${queryString}`;
  };

  return (
    <div className='bg-[#DCEFEA] min-h-screen flex flex-col'>
      <div className='flex items-center ml-4 mt-4'>
        <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
          <BankIcon bankId={account.bank} />
        </div>
        <div className='ml-4'>
          <h1 className='text-xl font-medium'>{account.account_name}</h1>
          <h2 className='text-xl font-medium'>{account.account_number}</h2>
        </div>
      </div>

      <div className='bg-white shadow-md rounded-lg mt-8 p-8 flex-grow'>
        <h2 className='text-lg font-bold mb-4'>조회 옵션</h2>
        <div className='mb-10'>
          <p className='text-md font-semibold'>조회기간</p>
          <div className='flex gap-4 mt-10'>
            <TypeButton
              button_type='조회기간'
              onClick={() => handlePeriodClick('전체')}
              className={
                selectedPeriod === '전체'
                  ? 'bg-[#95D0BF] text-white rounded-full px-4 py-2'
                  : 'bg-[#ffffff] text-black rounded-full px-4 py-2 shadow-none'
              }
            >
              전체
            </TypeButton>
            <TypeButton
              button_type='조회기간'
              onClick={() => handlePeriodClick('1개월')}
              className={
                selectedPeriod === '1개월'
                  ? 'bg-[#95D0BF] text-white rounded-full px-4 py-2'
                  : 'bg-[#ffffff] text-black rounded-full px-4 py-2 shadow-none'
              }
            >
              1개월
            </TypeButton>
            <TypeButton
              button_type='조회기간'
              onClick={() => handlePeriodClick('3개월')}
              className={
                selectedPeriod === '3개월'
                  ? 'bg-[#95D0BF] text-white rounded-full px-4 py-2'
                  : 'bg-[#ffffff] text-black rounded-full px-4 py-2 shadow-none'
              }
            >
              3개월
            </TypeButton>
            <TypeButton
              button_type='조회기간'
              onClick={() => handlePeriodClick('6개월')}
              className={
                selectedPeriod === '6개월'
                  ? 'bg-[#95D0BF] text-white rounded-full px-4 py-2'
                  : 'bg-[#ffffff] text-black rounded-full px-4 py-2 shadow-none'
              }
            >
              6개월
            </TypeButton>
            <TypeButton
              button_type='조회기간'
              onClick={() => handlePeriodClick('1년')}
              className={
                selectedPeriod === '1년'
                  ? 'bg-[#95D0BF] text-white rounded-full px-4 py-2'
                  : 'bg-[#ffffff] text-black rounded-full px-4 py-2 shadow-none'
              }
            >
              1년
            </TypeButton>
          </div>
        </div>

        <div className='mb-4'>
          <div className='flex gap-4 mt-2'>
            <input
              type='date'
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setSelectedPeriod('');
              }}
              className='border rounded-md px-4 py-2'
              placeholder='시작 날짜'
            />
            <input
              type='date'
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setSelectedPeriod('');
              }}
              className='border rounded-md px-4 py-2'
              placeholder='종료 날짜'
            />
          </div>
        </div>

        {/* 거래 구분 */}
        <div className='mb-10'>
          <p className='text-md mt-10 font-semibold'>거래 구분</p>
          <div className='flex gap-2 mt-10'>
            <TypeButton
              button_type='거래구분'
              onClick={() => handleTypeClick('전체')}
              className={
                selectedType === '전체'
                  ? 'bg-[#95D0BF] text-white rounded-full px-4 py-2'
                  : 'bg-[#ffffff] text-black rounded-full px-4 py-2 shadow-none'
              }
            >
              전체
            </TypeButton>
            <TypeButton
              button_type='거래구분'
              onClick={() => handleTypeClick('입금')}
              className={
                selectedType === '입금'
                  ? 'bg-[#95D0BF] text-white rounded-full px-4 py-2'
                  : 'bg-[#ffffff] text-black rounded-full px-4 py-2 shadow-none'
              }
            >
              입금
            </TypeButton>
            <TypeButton
              button_type='거래구분'
              onClick={() => handleTypeClick('출금')}
              className={
                selectedType === '출금'
                  ? 'bg-[#95D0BF] text-white rounded-full px-4 py-2'
                  : 'bg-[#ffffff] text-black rounded-full px-4 py-2 shadow-none'
              }
            >
              출금
            </TypeButton>
          </div>
        </div>

        <div className='mb-10 '>
          <p className='text-md  font-semibold'>검색어</p>
          <input
            type='text'
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className='border rounded-full mt-10 px-4 py-2 w-1/2 bg-[#DCEFEA]'
            placeholder='검색어 입력'
          />
        </div>

        {/* 조회하기 버튼 */}
        <div className='flex justify-center'>
          <button
            onClick={handleSearchClick}
            className='w-4/5 mt-10 px-6 py-2 bg-[#61B89F] text-white rounded-md hover:bg-[#377B68]'
          >
            조회하기
          </button>
        </div>
      </div>
    </div>
  );
}
