'use client';

import CancelDeleteBtns from '@/components/activity/CancleDeleteBtns';
import EditButton from '@/components/activity/EditButton';
import ShortCutCard from '@/components/activity/ShortCutCard';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';
import { deleteData, getDataByUserId, updateData } from '@/lib/api';
import { Shortcut } from '@/lib/datatypes';

const ShortCutPage = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [shortCuts, setShortCuts] = useState<Shortcut[]>([]);
  const { data: session } = useSession();

  const toggleDeleteMode = useCallback(() => setIsDelete((prev) => !prev), []);

  const cancelDeleteMode = () => {
    setCheckedItems(new Set());
    toggleDeleteMode();
  };

  const toggleFavorite = async (id: string) => {
    setShortCuts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, is_Favorite: !item.is_Favorite };
          updateData('shortcut', id, updatedItem);
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleCheckboxChange = useCallback((id: string) => {
    setCheckedItems((prev) => {
      const newCheckedItems = new Set(prev);
      if (newCheckedItems.has(id)) {
        newCheckedItems.delete(id);
      } else {
        newCheckedItems.add(id);
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
        Array.from(checkedItems).map(async (id) => {
          await deleteData('shortcut', id);
        })
      );
      setShortCuts((prev) => prev.filter((item) => !checkedItems.has(item.id)));
    } catch (error) {
      console.error('Error deleting shortcuts:', error);
    } finally {
      setCheckedItems(new Set());
      toggleDeleteMode();
    }
  }, [checkedItems, toggleDeleteMode]);

  const favoriteList = shortCuts.filter(({ is_Favorite }) => is_Favorite);
  const normalList = shortCuts.filter(({ is_Favorite }) => !is_Favorite);

  useEffect(() => {
    const loadShortCuts = async () => {
      if (session?.user.id) {
        try {
          const shortcuts = await getDataByUserId<Shortcut>(
            'shortcut',
            session.user.id
          );
          setShortCuts(shortcuts.reverse());
        } catch (error) {
          console.error('Error fetching shortcuts:', error);
        }
      }
    };

    if (session?.user.id) {
      loadShortCuts();
    }
  }, [session]);

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
          <li key={item.id} className='flex'>
            <ShortCutCard
              id={item.id}
              name={item.shortcut_name}
              isEdit={isDelete}
              isFavorite={item.is_Favorite}
              onCheckboxChange={handleCheckboxChange}
              favoriteToggle={toggleFavorite}
              shortcutElements={item.shortcut_elements}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShortCutPage;
