'use client';

import { redirect } from 'next/navigation';

export default function DefaultActivity() {
  redirect('/activity/history');
}
