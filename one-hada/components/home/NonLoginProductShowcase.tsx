'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

const NonLoginProductShowcase = () => {
  const messages = [
    {
      title: '원,하다로 한번에!',
      description: '맞춤 금융 서비스를 경험하세요',
    },
    {
      title: '쉽고 빠른 금융생활',
      description: '원하다와 함께 시작하세요',
    },
    {
      title: '당신의 금융 파트너',
      description: '원하다가 함께합니다',
    },
  ];

  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className='w-full px-2' // 좌우 패딩 추가
    >
      <CarouselContent className='-mx-2' showDots={false}>
        {' '}
        {/* 마진 조정 */}
        {messages.map((message, index) => (
          <CarouselItem key={index} className='px-2'>
            {' '}
            {/* 패딩 조정 */}
            <div className='flex items-center justify-between h-full w-full bg-white rounded-md px-4 py-4 shadow-sm'>
              <div className='flex flex-col gap-1'>
                <h2 className='text-md font-semibold text-[#635666]'>
                  {message.title}
                </h2>
                <p className='text-gray-600 text-sm text-nowrap'>
                  {message.description}
                </p>
              </div>
              <div className='relative'>
                <Image
                  src='/images/one-hada.png'
                  alt={`${message} ${index}`}
                  width={60}
                  height={60}
                  priority
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default NonLoginProductShowcase;
