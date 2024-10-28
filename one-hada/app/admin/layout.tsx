import AdminHeader from '@/components/admin/AdminHeader';
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
            <AdminHeader />
          </div>
          <main className='flex-1 p-4'>{children}</main>
        </div>
      </CounselProvider>
    </AdminSessionProvider>
  );
}
