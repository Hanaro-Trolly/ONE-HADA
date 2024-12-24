'use client';

import { useState } from 'react';
import { captureScreenshot } from '@/lib/screenshot';

export default function Test() {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const onClickHandler = async () => {
    const screenshot = await captureScreenshot();
    setScreenshot(screenshot);
    console.log(screenshot);
  };
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <button onClick={onClickHandler}>스크린샷 캡처</button>

      {screenshot && <img src={screenshot} alt='스크린샷' />}
    </div>
  );
}
