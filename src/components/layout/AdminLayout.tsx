import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Settings, LogOut } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function AdminLayout() {
  const { theme, setRole } = useStore();
  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { to: '/admin/cms', icon: FileText, label: 'Content' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogoutAdmin = () => {
    setRole('USER');
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-tight uppercase">Admin Console</h1>
          <p className="text-xs text-slate-500 mt-1">Dosa & Tobat Platform</p>
        </div>
        
        <nav className="flex-1 py-6 space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogoutAdmin}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Keluar Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-lg font-bold">Workspace</h2>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              SA
            </span>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
