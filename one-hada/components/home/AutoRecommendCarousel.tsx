'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const messages = ['원하다 짱', '시온이 짱', '캐러셀'];

export default function AutoMessageCarousel() {
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
    >
      <CarouselContent showDots={false}>
        {messages.map((message, index) => (
          <CarouselItem key={index}>
            <div className='h-16  text-[#635666] text-center p-2 text-sm flex justify-center items-center'>
              {message}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
