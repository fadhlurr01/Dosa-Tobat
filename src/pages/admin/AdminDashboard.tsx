import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  CreditCard, 
  Activity, 
  FileText, 
  UserPlus, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ArrowUpRight, 
  Sparkles, 
  Database,
  Layers,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { dbService, ActivityLog } from '../../lib/db';

export default function AdminDashboard() {
  const { mockUsers, cmsItems, appSettings, activityLogs, refreshFromDB, currentUser, role } = useStore();
  const [logs, setLogs] = useState<ActivityLog[]>(activityLogs);

  const effectiveRole = currentUser?.role || role || 'USER';
  const isContentAdmin = effectiveRole === 'CONTENT_ADMIN';

  useEffect(() => {
    refreshFromDB();
    dbService.getActivityLogs(8).then(setLogs).catch(() => {});
  }, []);

  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.status === 'ACTIVE').length;
  const premiumUsers = mockUsers.filter(u => u.plan !== 'FREE').length;
  const publishedContent = cmsItems.filter(c => c.status === 'PUBLISHED').length;
  const draftContent = cmsItems.filter(c => c.status === 'DRAFT' || c.status === 'IN_REVIEW').length;

  const newUsersLast7Days = mockUsers.filter(u => {
    const regDate = new Date(u.registrationDate).getTime();
    const sevenDaysAgo = Date.now() - 7 * 86400000;
    return regDate >= sevenDaysAgo;
  }).length;

  const stats = [
    { 
      label: 'Total Pengguna Terdaftar', 
      value: totalUsers.toString(), 
      change: `+${newUsersLast7Days} minggu ini`,
      icon: Users, 
      color: 'text-blue-600 dark:text-blue-400', 
      bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/40' 
    },
    { 
      label: 'Pengguna Aktif', 
      value: `${activeUsers}`, 
      change: `${Math.round((activeUsers / (totalUsers || 1)) * 100)}% aktif`,
      icon: Activity, 
      color: 'text-emerald-600 dark:text-emerald-400', 
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/40' 
    },
    { 
      label: 'Member Pro & Donatur', 
      value: premiumUsers.toString(), 
      change: 'Akses Penuh',
      icon: CreditCard, 
      color: 'text-amber-600 dark:text-amber-400', 
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/40' 
    },
    { 
      label: 'Materi Dakwah & Dalil', 
      value: publishedContent.toString(), 
      change: `${draftContent} draf/review`,
      icon: FileText, 
      color: 'text-indigo-600 dark:text-indigo-400', 
      bg: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/40' 
    },
  ];

  const recentUsers = [...mockUsers]
    .sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-700/50 relative overflow-hidden">
        <div className="absolute right-[-5%] bottom-[-20%] opacity-10 pointer-events-none">
          <Database className="w-72 h-72 text-indigo-400" />
        </div>
        
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/10 backdrop-blur-md mb-2">
            <Sparkles className="w-3 h-3" />
            <span>
              {isContentAdmin 
                ? 'Hak Akses: Content Admin (Dewan Syariah & CMS)' 
                : 'Hak Akses: Super Administrator (Root & MySQL)'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {isContentAdmin 
              ? 'Portal Kurasi Dakwah & Syariah' 
              : 'Ikhtisar Platform & Sistem'}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            {isContentAdmin
              ? 'Kelola draf ayat Al-Qur\'an, hadits shahih, doa taubat, serta moderasi materi syar\'i platform secara terverifikasi.'
              : 'Pantau pertumbuhan pengguna, aktivitas taubat harian, materi syar\'i, dan integritas database MySQL secara real-time.'}
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-2">
          {!isContentAdmin && (
            <Link
              to="/admin/users"
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Kelola Pengguna</span>
            </Link>
          )}
          <Link
            to="/admin/cms"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Kelola Konten CMS</span>
          </Link>
          {effectiveRole === 'SUPER_ADMIN' && (
            <Link
              to="/admin/settings"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600/60 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Database</span>
            </Link>
          )}
        </div>
      </div>

      {/* Grid Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, i) => (
          <div 
            key={i} 
            className={`p-6 rounded-3xl border bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-all ${s.bg}`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{s.label}</span>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${s.bg}`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {s.value}
              </h3>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {s.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 2-Column Split: Recent Users & Live Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recent Registrations Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Pendaftaran Pengguna Terbaru
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Pengguna baru yang mendaftar ke platform secara langsung
              </p>
            </div>
            <Link 
              to="/admin/users" 
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentUsers.map((user) => (
              <div key={user.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img 
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0" 
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {user.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                    user.status === 'ACTIVE' 
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {user.status}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    {new Date(user.registrationDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Database Activity Feed (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                Log Aktivitas Database
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Pencatatan event realtime sistem
              </p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Live Database Feed" />
          </div>

          <div className="space-y-3">
            {logs.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">Belum ada log aktivitas.</p>
            ) : (
              logs.slice(0, 5).map((log) => (
                <div 
                  key={log.id} 
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      {log.userName}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    {log.details || log.action}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Quick Access Status & Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/admin/settings"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Backup & Restore DB</h4>
              <p className="text-[11px] text-slate-500">Ekspor JSON atau pulihkan data</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </Link>

        <Link
          to="/admin/cms"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Draf Menunggu Review</h4>
              <p className="text-[11px] text-slate-500">{draftContent} materi butuh verifikasi</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </Link>

        <Link
          to="/admin/users"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Total User Aktif</h4>
              <p className="text-[11px] text-slate-500">{activeUsers} akun status aktif</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </Link>
      </div>
    </div>
  );
}
