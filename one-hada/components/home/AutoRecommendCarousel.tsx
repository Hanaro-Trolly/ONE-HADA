'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PRODUCT_LIST } from '@/data/productData';
import Autoplay from 'embla-carousel-autoplay';
import { RingLoader } from 'react-spinners';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface AutoRecommendCarouselProps {
  recommendProductList: string[];
}

export default function AutoRecommendCarousel({
  recommendProductList,
}: AutoRecommendCarouselProps) {
  const [menuType, setMenuType] = useState('none');

  const formatMenu = (productId: string) => {
    const matches = productId.match(/product(\w+)(\d+)/);
    const [, , idx] = matches!;
    return Number(idx) || 0;
  };

  useEffect(() => {
    if (recommendProductList.length > 0) {
      const matches = recommendProductList[0].match(/product(\w+)(\d+)/);
      if (matches) {
        setMenuType(matches[1]);
      }
    }
  }, [recommendProductList]);

  return (
    <div className='flex justify-center'>
      {menuType !== 'none' ? (
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
                <Link
                  href={
                    menuType != 'none'
                      ? `/menu/${menuType}?productIdx=${formatMenu(productId)}`
                      : `/menu`
                  }
                >
                  <Button
                    id={'homeButton' + productId}
                    variant='ghost'
                    className='h-16 w-full mx-2 font-medium rounded-x bg-white hover:bg-[#F0F0F0] flex justify-between'
                  >
                    <div className='flex flex-col text-lg'>
                      <label className='text-black'>
                        {PRODUCT_LIST[menuType].products[formatMenu(productId)]}
                      </label>
                      <label className='text-xs text-slate-600'>
                        {PRODUCT_LIST[menuType].oneline[formatMenu(productId)]}
                      </label>
                    </div>
                    <div>
                      <Image
                        src={`/products/${menuType}${formatMenu(productId)}.png`}
                        alt={`${menuType} ${formatMenu(productId)}`}
                        width={40}
                        height={40}
                        priority
                      />
                    </div>
                  </Button>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className='flex justify-center items-center h-16 w-full mx-2'>
          <RingLoader color='#61B89F' size={40} />
        </div>
      )}
    </div>
  );
}
