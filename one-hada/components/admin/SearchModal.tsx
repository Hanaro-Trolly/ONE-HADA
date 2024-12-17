'use client';

import { useCounsel } from '@/context/admin/CounselContext';
import { useFetch } from '@/hooks/useFetch';
import { useFormattedDate } from '@/hooks/useFormattedDate';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Modal from './Modal';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  userName: string;
  userBirth: string;
  userPhone: string;
  userGender: string;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'birth'>('name');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { formatDateLong } = useFormattedDate();
  const { fetchData } = useFetch();
  const router = useRouter();
  const { setSelectedUserId } = useCounsel();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    try {
      const requestBody: { userName?: string; userBirth?: string } = {};

      if (searchType === 'birth') {
        requestBody.userBirth = formatBirthForDatabase(searchTerm);
      } else {
        requestBody.userName = searchTerm;
      }

      const response = await fetchData('/api/admin/user/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (response && response.data) {
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    router.push(`/admin/${encodeURIComponent(userId)}`);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setSearchResults([]);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='고객 검색'>
      <div className='space-y-4'>
        <div className='flex gap-4'>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as 'name' | 'birth')}
            className='px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main-green'
          >
            <option value='name'>이름</option>
            <option value='birth'>생년월일</option>
          </select>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              searchType === 'name'
                ? '고객 이름을 입력하세요'
                : '생년월일을 입력하세요 (YYYYMMDD)'
            }
            className='flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main-green'
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className='px-4 py-2 bg-main-green text-white rounded-md hover:bg-main-green/80 disabled:opacity-50'
          >
            검색
          </button>
        </div>

        <div className='mt-4 space-y-2 max-h-96 overflow-y-auto'>
          {searchResults.map((result) => (
            <button
              key={result.id}
              onClick={() => handleUserSelect(result.id)}
              className='w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors'
            >
              <div className='flex justify-between items-center'>
                <div>
                  <span className='font-medium mr-2'>{result.userName}</span>
                  <span className='text-sm text-gray-500'>
                    {result.userPhone}
                  </span>
                </div>
                <div className='text-sm text-gray-500'>
                  <span className='mr-2'>
                    {formatDateLong(result.userBirth)}
                  </span>
                  <span>{result.userGender === 'male' ? '남' : '여'}</span>
                </div>
              </div>
            </button>
          ))}
          {searchResults.length === 0 && searchTerm && !isSearching && (
            <p className='text-center text-gray-500 py-4'>
              검색 결과가 없습니다.
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}

function formatBirthForDatabase(dateString: string): string {
  const numbers = dateString.replace(/[^0-9]/g, '');

  if (numbers.length !== 8) {
    return dateString;
  }

  const year = parseInt(numbers.substring(0, 4));
  const month = parseInt(numbers.substring(4, 6));
  const day = parseInt(numbers.substring(6, 8));

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return dateString;
  }

  return numbers;
}
