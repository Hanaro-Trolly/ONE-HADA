import { AdminSessionProvider } from '@/context/admin/SessionContext';
import '../globals.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminSessionProvider>{children}</AdminSessionProvider>;
}
