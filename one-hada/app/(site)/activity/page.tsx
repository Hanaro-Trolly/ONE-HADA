'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ActivityPage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/activity/history');
  }, [router]);
  return <div></div>;
}
