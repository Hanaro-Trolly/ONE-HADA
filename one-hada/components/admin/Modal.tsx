'use client';

import { IoClose } from 'react-icons/io5';
import { useEffect, useRef } from 'react';

// Types
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 overflow-y-auto'
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
    >
      <div className='flex min-h-screen items-center justify-center p-4'>
        <div
          className='fixed inset-0 bg-black/40 transition-opacity'
          aria-hidden='true'
        />

        <div
          ref={modalRef}
          className='relative w-full max-w-4xl rounded-lg bg-white shadow-lg'
        >
          <header className='flex items-center justify-between border-b p-4'>
            <h2 id='modal-title' className='text-xl font-semibold'>
              {title}
            </h2>
            <button
              onClick={onClose}
              className='rounded-full p-1 hover:bg-gray-100 transition-colors'
              aria-label='모달 닫기'
            >
              <IoClose size={24} />
            </button>
          </header>

          <div className='p-4'>{children}</div>
        </div>
      </div>
    </div>
  );
}
