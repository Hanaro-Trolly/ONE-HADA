'use client';

import CancelDeleteBtns from '@/components/activity/CancleDeleteBtns';
import EditButton from '@/components/activity/EditButton';
import ShortCutCard from '@/components/activity/ShortCutCard';
import '@/hooks/useFetch';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { HistoryElementType, Shortcut } from '@/lib/datatypes';
import { handleShortcutClick } from '@/lib/shortcutUtils';

const ShortCutPage = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [shortCuts, setShortCuts] = useState<Shortcut[]>([]);
  const { fetchData, error } = useFetch<Shortcut[]>();
  const { data: session } = useSession();
  const router = useRouter();

  const toggleDeleteMode = useCallback(() => setIsDelete((prev) => !prev), []);

  const cancelDeleteMode = () => {
    setCheckedItems(new Set());
    toggleDeleteMode();
  };
  const toggleFavorite = async (shortcutId: string) => {
    try {
      const updatedShortcuts = await Promise.all(
        shortCuts.map(async (item) => {
          if (item.shortcutId === shortcutId) {
            const updatedItem = { ...item, isFavorite: !item.isFavorite };
            await fetchData(`/api/shortcut/${shortcutId}/favorite`, {
              method: 'PATCH',
              token: session?.accessToken,
              body: JSON.stringify({ isFavorite: !item.isFavorite }),
            });
            return updatedItem;
          }
          return item;
        })
      );
      setShortCuts(updatedShortcuts);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleCheckboxChange = useCallback((shortcutId: string) => {
    setCheckedItems((prev) => {
      const newCheckedItems = new Set(prev);
      if (newCheckedItems.has(shortcutId)) {
        newCheckedItems.delete(shortcutId);
      } else {
        newCheckedItems.add(shortcutId);
      }
      return newCheckedItems;
    });
  }, []);

  const deleteSelectedShortcuts = useCallback(async () => {
    if (checkedItems.size === 0) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    }
    try {
      await Promise.all(
        Array.from(checkedItems).map(async (shortcutId) => {
          await fetchData(`/api/shortcut/${shortcutId}`, {
            method: 'DELETE',
            token: session?.accessToken,
          });
        })
      );
      setShortCuts((prev) =>
        prev.filter((item) => !checkedItems.has(item.shortcutId))
      );
    } catch (error) {
      console.error('Error deleting shortcut:', error);
    } finally {
      setCheckedItems(new Set());
      toggleDeleteMode();
    }
  }, [checkedItems, fetchData, session?.accessToken, toggleDeleteMode]);

  const favoriteList = shortCuts.filter(({ isFavorite }) => isFavorite);
  const normalList = shortCuts.filter(({ isFavorite }) => !isFavorite);

  const fetchShortcuts = useCallback(async () => {
    const response = await fetchData('/api/shortcut', {
      method: 'GET',
      token: session?.accessToken,
    });

    if (response.code === 200) {
      setShortCuts(response.data.shortcuts);
    }
  }, [fetchData, session?.accessToken]);

  useEffect(() => {
    if (session?.accessToken) {
      fetchShortcuts();
    }
  }, [session?.accessToken, fetchShortcuts]);

  useEffect(() => {
    if (error) {
      console.error('Shortcut 데이터 fetch 에러:', error);
    }
  }, [error]);

  const handleButtonClick = async (shortcutElements: HistoryElementType) => {
    const success = await handleShortcutClick(
      shortcutElements,
      fetchData,
      session?.accessToken
    );
    if (success) {
      router.push(JSON.stringify(shortcutElements));
    }
  };

  return (
    <div>
      <li className='h-10 flex items-center w-full justify-between pr-4 py-1'>
        <div />
        <div className='mx-2'>
          {isDelete ? (
            <CancelDeleteBtns
              onCancel={cancelDeleteMode}
              onDelete={deleteSelectedShortcuts}
            />
          ) : (
            <EditButton onClick={cancelDeleteMode} />
          )}
        </div>
      </li>

      <ul
        className='w-full py-2 overflow-y-scroll'
        style={{ maxHeight: 'calc(100vh - 150px)' }}
      >
        {[...favoriteList, ...normalList].map((item) => (
          <li key={item.shortcutId} className='flex'>
            <ShortCutCard
              id={item.shortcutId}
              name={item.shortcutName}
              isEdit={isDelete}
              isFavorite={item.isFavorite}
              onCheckboxChange={handleCheckboxChange}
              favoriteToggle={toggleFavorite}
              shortcutElements={item.shortcutElements}
              onButtonClick={() => handleButtonClick(item.shortcutElements)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShortCutPage;
