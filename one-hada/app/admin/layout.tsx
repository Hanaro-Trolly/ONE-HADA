import AdminHeader from '@/components/admin/AdminHeader';
import Title from '@/components/admin/AdminTitle';
import { CounselProvider } from '@/context/admin/CounselContext';
import { AdminSessionProvider } from '@/context/admin/SessionContext';
import '../globals.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSessionProvider>
      <CounselProvider>
        <div className='flex min-h-screen'>
          <div className='w-1/5 min-h-screen bg-gray-100 border-r'>
            <Title text='목록' />
            <AdminHeader />
          </div>
          <main className='flex-1 p-8'>{children}</main>
        </div>
      </CounselProvider>
    </AdminSessionProvider>
  );
}
