'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ActivityPage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/activity/history');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div></div>;
}
