'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import useAdminAuth from '@/hooks/useAdminAuth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useAdminAuth();

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* HEADER (always visible) */}
      <Header />

      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* SIDEBAR (scrollable, fixed width) */}
        <aside
          className="d-none d-md-flex flex-column bg-white border-end overflow-auto"
          style={{ width: '250px' }}
        >
          <Sidebar />
        </aside>

        {/* MAIN CONTENT (scrollable area) */}
        <main className="flex-grow-1 p-3 overflow-auto" style={{ height: 'calc(100vh - 56px)' }}>
          {children}
        </main>
      </div>

      {/* MOBILE NAV (bottom fixed) */}
      <MobileNav />
    </div>
  );
}
