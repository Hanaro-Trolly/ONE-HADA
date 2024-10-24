import { IoClose } from 'react-icons/io5';
import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex min-h-screen items-center justify-center p-4'>
        <div className='fixed inset-0 bg-black opacity-40' onClick={onClose} />
        <div
          ref={modalRef}
          className='relative w-full max-w-4xl rounded-lg bg-white shadow-lg'
        >
          <div className='flex items-center justify-between border-b p-4'>
            <h2 className='text-xl font-semibold'>{title}</h2>
            <button
              onClick={onClose}
              className='rounded-full p-1 hover:bg-gray-100'
            >
              <IoClose size={24} />
            </button>
          </div>
          <div className='p-4'>{children}</div>
        </div>
      </div>
    </div>
  );
}
