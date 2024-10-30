import TabBar from '@/components/activity/TabBar';

export default function ActivityLayout({
  children,
  tabs,
}: {
  children: React.ReactNode;
  tabs: React.ReactNode;
}) {
  return (
    <div>
      <TabBar></TabBar>
      <div className='pt-11 '></div>
      <div>{tabs}</div>
      <div>{children}</div>
    </div>
  );
}
