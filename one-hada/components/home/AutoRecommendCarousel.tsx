'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { Button } from '../ui/button';

interface AutoMessageCarouselProps {
  messages: string[];
}

export default function AutoMessageCarousel({
  messages,
}: AutoMessageCarouselProps) {
  return (
    <div className='flex justify-center'>
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
        className='h-16 w-full flex justify-between items-center'
      >
        <CarouselContent showDots={false}>
          {messages.map((message, index) => (
            <CarouselItem key={index}>
              <Link href='/menu'>
                <Button
                  id={message}
                  variant='home'
                  className='h-16 w-full mx-2 font-medium rounded-x bg-white hover:bg-[#F0F0F0]'
                >
                  <label className='overflow-ellipsis overflow-hidden whitespace-nowrap '>
                    {message}
                  </label>
                </Button>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
