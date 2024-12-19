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
  recommendProductList: string[];
}

export default function AutoMessageCarousel({
  recommendProductList,
}: AutoMessageCarouselProps) {
  const formatMenuUrl = (productId: string) => {
    const matches = productId.match(/product(\w+)(\d+)/);

    if (!matches) return '/menu';

    const [, menuType, idx] = matches;
    return `/menu/${menuType}?productIdx=${idx}`;
  };
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
          {recommendProductList.map((productId, index) => (
            <CarouselItem key={index}>
              <Link href={formatMenuUrl(productId)}>
                <Button
                  id={'homeButton' + productId}
                  variant='home'
                  className='h-16 w-full mx-2 font-medium rounded-x bg-white hover:bg-[#F0F0F0]'
                >
                  <label className='overflow-ellipsis overflow-hidden whitespace-nowrap '>
                    {productId}
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
