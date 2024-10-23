import AdminHeader from '@/components/admin/AdminHeader';
import { AdminSessionProvider } from '@/context/admin/SessionContext';
import '../globals.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSessionProvider>
      <div className='flex min-h-screen'>
        <div className='w-1/5 min-h-screen bg-white border-r'>
          <AdminHeader />
        </div>
        <main className='flex-1 p-8'>{children}</main>
      </div>
    </AdminSessionProvider>
  );
}
