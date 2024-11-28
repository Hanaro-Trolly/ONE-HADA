import Link from 'next/link';
import JSONtoUrl from '@/lib/JSONtoUrl';
import { Shortcut } from '@/lib/datatypes';
import { Button } from '../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const FavoriteCarousel = ({ favoriteList }: { favoriteList: Shortcut[] }) => (
  <div className='flex justify-center'>
    <Carousel
      opts={{ align: 'start', loop: true }}
      className='h-16 w-full flex justify-between items-center'
    >
      <CarouselPrevious variant='ghost' size='xl' className='mb-[14px]' />
      <CarouselContent>
        {favoriteList.map((item, idx) => (
          <CarouselItem key={idx}>
            <Link href={JSONtoUrl(JSON.parse(item.shortcut_elements))}>
              <Button
                id={'favoriteBtn-' + item.id}
                variant='home'
                className='h-16 w-full mx-2 font-medium rounded-x bg-white hover:bg-[#F0F0F0]'
              >
                <label className='overflow-ellipsis overflow-hidden whitespace-nowrap'>
                  {item.shortcut_name}
                </label>
              </Button>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext variant='ghost' size='xl' className='mb-[14px]' />
    </Carousel>
  </div>
);

export default FavoriteCarousel;
