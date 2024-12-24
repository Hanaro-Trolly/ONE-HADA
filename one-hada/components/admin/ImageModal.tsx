import { FaImage } from 'react-icons/fa6';
import Image from 'next/image';
import { useState } from 'react';
import { decompressImage } from '@/lib/imageCompression';

interface ImageModalProps {
  screenshot: string;
}

export default function ImageModal({ screenshot }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className='px-2 py-1 text-sm text-main-green'
      >
        <FaImage className='text-xl' />
      </button>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
          onClick={toggleModal}
        >
          <div className='bg-white p-2 rounded-lg max-w-2xl max-h-[90vh] overflow-auto'>
            <Image
              src={decompressImage(screenshot)}
              width={400}
              height={700}
              unoptimized
              alt='스크린샷'
              className='max-w-full h-auto'
            />
          </div>
        </div>
      )}
    </>
  );
}
