'use client';

import Modal from '@/components/layout/Modal';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { addData, fetchAllData, getData } from '@/lib/api';
import { Account, History, Shortcut } from '@/lib/datatypes';

const BASE_URL = 'http://localhost:3000/';
const TRANSFERPARAM = ['recipient', 'amount', 'validation'];
const INQUIRYPARAM = [
  'accound_id',
  'period',
  'start_date',
  'end_date',
  'type',
  'search',
];

export default function HistoryModalPage({
  params: { historyId },
}: {
  params: { historyId: string };
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [checkpoints, setCheckPoints] = useState<string[]>([]);
  const [history, setHistory] = useState<History | null>(null);
  const { data: session } = useSession();

  const myAccount = useRef<Account | null>(null);
  const receiveAccount = useRef<Account | null>(null);

  const handleSave = async () => {
    const inputValue = inputRef.current?.value;
    if (!inputValue) {
      inputRef.current?.focus();
      return;
    }
    try {
      const existingShortcuts = await fetchAllData<Shortcut>('shortcut');
      const newId =
        existingShortcuts.length > 0
          ? Math.max(...existingShortcuts.map((shortcut) => +shortcut.id)) + 1
          : 1;
      let shortcutUrl = BASE_URL;
      const params = history!.history_params.split('#');
      if (history?.history_type === 'transaction') {
        shortcutUrl +=
          'transfer/' + TRANSFERPARAM[checkedList.length - 1] + '?';
        checkedList.forEach((idx) => {
          if (idx === '0') shortcutUrl += 'account_id=' + params[0] + '&';
          else if (idx === '1') {
            shortcutUrl += 'recipient=' + receiveAccount.current?.user_id + '&';
            shortcutUrl += 'bank=' + receiveAccount.current?.bank + '&';
            shortcutUrl +=
              'recipient_number=' +
              receiveAccount.current?.account_number +
              '&';
          } else if (idx === '2') {
            shortcutUrl += 'amount=' + params[2] + '&';
          }
        });
      } else if (history?.history_type === 'inquiry') {
        shortcutUrl += 'check/';
        shortcutUrl += myAccount.current?.id + '/detail?';
        checkedList.forEach((idx) => {
          if (idx === '0')
            shortcutUrl += INQUIRYPARAM[0] + '=' + params[0] + '&';
          else if (idx === '1') {
            if (params[1] !== '')
              shortcutUrl += INQUIRYPARAM[1] + '=' + params[1] + '&';
            else {
              shortcutUrl += INQUIRYPARAM[2] + '=' + params[2] + '&';
              shortcutUrl += INQUIRYPARAM[3] + '=' + params[3] + '&';
            }
          } else if (idx === '2') {
            shortcutUrl += INQUIRYPARAM[4] + '=' + params[4] + '&';
          } else if (idx === '3') {
            shortcutUrl += INQUIRYPARAM[5] + '=' + params[5] + '&';
          }
        });
      } else {
        shortcutUrl += 'menu/' + params[0] + '/';
      }
      const new_shortcut: Shortcut = {
        id: '' + newId,
        user_id: session?.user.id || '',
        shortcut_name: inputRef.current.value,
        shortcutUrl: shortcutUrl.slice(0, -1),
        is_Favorite: false,
      };
      await addData('shortcut', new_shortcut);
      router.back();
    } catch (error) {
      console.error('Shortcut 저장 중 오류 발생:', error);
    }
  };

  const handleCheckedItem = (idx: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, idx]);
    } else {
      setCheckedList((prev) => prev.filter((item) => item !== idx));
    }
  };

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getData<History>('history', historyId);
        if (data) {
          setHistory(data);
          const params = data?.history_params.split('#') || [];
          if (data.history_type === 'transaction') {
            myAccount.current = await getData<Account>('account', params[0]);
            receiveAccount.current = await getData<Account>(
              'account',
              params[1]
            );
            setCheckPoints([
              (myAccount.current?.bank || '') +
                (' ' + myAccount.current?.account_number || ''),
              (receiveAccount.current?.bank || '') +
                (' ' + receiveAccount.current?.account_number || ''),
              params[2],
            ]);
            setCheckedList(Array.from({ length: 3 }, (v, i) => '' + i));
          } else if (data.history_type === 'inquiry') {
            myAccount.current = await getData<Account>('account', params[0]);
            const initInquiry: string[] = [
              (myAccount.current?.bank || '') +
                (' ' + myAccount.current?.account_number || ''),
            ];
            if (params[1]) initInquiry.push(params[1]);
            else initInquiry.push(params[2] + ' ~ ' + params[3]);
            if (params[4]) initInquiry.push(params[4]);
            if (params[5]) initInquiry.push(params[5]);
            setCheckPoints(initInquiry);
            setCheckedList(Array.from({ length: 4 }, (v, i) => '' + i));
          }
        } else {
          console.error('No history found for the user.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadHistory();
  }, [history?.history_params, historyId]);

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
          {checkpoints.map((value, idx) => (
            <label key={value} className='flex items-center'>
              <input
                type='checkbox'
                className='accent-green-700'
                checked={checkedList.includes('' + idx)}
                onChange={(e) => handleCheckedItem('' + idx, e.target.checked)}
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
