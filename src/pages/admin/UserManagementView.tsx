import { useState, useMemo, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Ban, 
  Mail, 
  Trash2, 
  Eye, 
  Edit2,
  X, 
  UserCheck, 
  ShieldCheck, 
  Calendar,
  Flame,
  Award,
  RefreshCw,
  Save,
  UserCog
} from 'lucide-react';
import { UserAccount, Role, SubscriptionPlan, AccountStatus } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import DeleteConfirmModal from '../../components/ui/DeleteConfirmModal';
import { soundFx } from '../../lib/soundFx';

export default function UserManagementView() {
  const { mockUsers, updateMockUserStatus, deleteUser, editUser, refreshFromDB } = useStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState<'ALL' | 'FREE' | 'PREMIUM'>('ALL');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);

  // Edit User State
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [editFormData, setEditFormData] = useState<{
    name: string;
    email: string;
    role: Role;
    plan: SubscriptionPlan;
    status: AccountStatus;
    title: string;
  }>({
    name: '',
    email: '',
    role: 'USER',
    plan: 'FREE',
    status: 'ACTIVE',
    title: '',
  });
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Auto-sync from MySQL upon mounting
  useEffect(() => {
    refreshFromDB();
  }, []);

  // Modal State for Delete Confirmation
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    userId: string;
    userName: string;
    isProcessing: boolean;
  }>({
    isOpen: false,
    userId: '',
    userName: '',
    isProcessing: false,
  });

  // Modal State for Status Toggle Confirmation
  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    userId: string;
    userName: string;
    nextStatus: 'ACTIVE' | 'SUSPENDED';
    isProcessing: boolean;
  }>({
    isOpen: false,
    userId: '',
    userName: '',
    nextStatus: 'SUSPENDED',
    isProcessing: false,
  });

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPlan = planFilter === 'ALL' 
        ? true 
        : planFilter === 'PREMIUM' 
          ? user.plan !== 'FREE' 
          : user.plan === 'FREE';

      const matchesRole = roleFilter === 'ALL'
        ? true
        : user.role === roleFilter;

      return matchesSearch && matchesPlan && matchesRole;
    });
  }, [mockUsers, searchQuery, planFilter, roleFilter]);

  const handleOpenStatusModal = (user: UserAccount) => {
    soundFx.playTap();
    const nextStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    setStatusModal({
      isOpen: true,
      userId: user.id,
      userName: user.name,
      nextStatus,
      isProcessing: false,
    });
  };

  const handleConfirmStatus = async () => {
    setStatusModal(prev => ({ ...prev, isProcessing: true }));
    try {
      await updateMockUserStatus(statusModal.userId, statusModal.nextStatus);
      soundFx.playSuccess();
      setStatusModal({ isOpen: false, userId: '', userName: '', nextStatus: 'SUSPENDED', isProcessing: false });
    } catch {
      setStatusModal(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const handleOpenDelete = (id: string, name: string) => {
    soundFx.playTap();
    setDeleteModal({
      isOpen: true,
      userId: id,
      userName: name,
      isProcessing: false,
    });
  };

  const handleConfirmDelete = async () => {
    setDeleteModal(prev => ({ ...prev, isProcessing: true }));
    try {
      await deleteUser(deleteModal.userId);
      soundFx.playSuccess();
      if (selectedUser?.id === deleteModal.userId) {
        setSelectedUser(null);
      }
      setDeleteModal({ isOpen: false, userId: '', userName: '', isProcessing: false });
    } catch {
      setDeleteModal(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const handleOpenEdit = (user: UserAccount) => {
    soundFx.playTap();
    setEditingUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      plan: user.plan,
      status: user.status,
      title: user.title || '',
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    soundFx.playTap();
    setIsSavingEdit(true);
    try {
      await editUser(editingUser.id, editFormData);
      soundFx.playSuccess();
      setIsSavingEdit(false);
      setEditingUser(null);
    } catch {
      setIsSavingEdit(false);
    }
  };

  const handleRefresh = async () => {
    soundFx.playTap();
    setIsRefreshing(true);
    await refreshFromDB();
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">Manajemen Pengguna</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Kelola akun pendaftar, hak akses, status langganan, dan sinkronisasi langsung dengan MySQL Laragon & IndexedDB.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
            title="Muat ulang & sinkron data dari database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sinkron Data</span>
          </button>
          <div className="text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            Total Terdaftar: {mockUsers.length} Pengguna
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Filters and Search Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari berdasarkan nama atau email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-slate-200"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <Filter className="w-4 h-4 text-slate-400" />
            
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value as any)}
              className="px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
            >
              <option value="ALL">Semua Paket</option>
              <option value="FREE">Free Member</option>
              <option value="PREMIUM">Premium PRO</option>
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
            >
              <option value="ALL">Semua Role</option>
              <option value="USER">User Reguler</option>
              <option value="CONTENT_ADMIN">Content Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Pengguna</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Paket</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Terdaftar Sejak</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                    Tidak ditemukan pengguna yang sesuai dengan pencarian atau filter.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-colors">
                    
                    {/* User info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'} 
                          alt={user.name} 
                          className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0" 
                        />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                            {user.name}
                            {user.isDemo && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-normal">
                                Demo
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {user.status === 'ACTIVE' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3" /> Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-900 text-[10px] font-bold uppercase tracking-wider">
                          <Ban className="w-3 h-3" /> Suspended
                        </span>
                      )}
                    </td>

                    {/* Plan */}
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        user.plan !== 'FREE' 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800' 
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {user.plan.replace('PREMIUM_', 'PRO ')}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        user.role === 'SUPER_ADMIN' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                          : user.role === 'CONTENT_ADMIN'
                          ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
                          : 'text-slate-500'
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Registration Date */}
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {new Date(user.registrationDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Lihat Detail Pengguna"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Edit Data Pengguna (Sinkron MySQL)"
                        >
                          <Edit2 className="w-4 h-4 text-indigo-500 hover:text-indigo-600" />
                        </button>
                        
                        <button 
                          onClick={() => handleOpenStatusModal(user)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                            user.status === 'ACTIVE'
                              ? 'text-rose-600 border-rose-200 hover:bg-rose-50 dark:border-rose-900/50 dark:hover:bg-rose-950/30'
                              : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-900/50 dark:hover:bg-emerald-950/30'
                          }`}
                        >
                          {user.status === 'ACTIVE' ? 'Suspend' : 'Aktifkan'}
                        </button>

                        {!user.isDemo && (
                          <button
                            onClick={() => handleOpenDelete(user.id, user.name)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Hapus Akun Pengguna (Permanen MySQL)"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 relative space-y-6"
            >
              <button 
                onClick={() => setSelectedUser(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <img 
                  src={selectedUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'} 
                  alt={selectedUser.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-md"
                />
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                    {selectedUser.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedUser.email}</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 inline-block mt-1">
                    {selectedUser.title || 'Penuntut Kebaikan'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block mb-1">Status Akun:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedUser.status}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block mb-1">Role Akun:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedUser.role}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block mb-1">Paket Akses:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedUser.plan}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block mb-1">Streak Istiqomah:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    {selectedUser.streakDays || 0} Hari
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <p><strong>ID Pengguna:</strong> <span className="font-mono text-[10px]">{selectedUser.id}</span></p>
                <p><strong>Tanggal Registrasi:</strong> {new Date(selectedUser.registrationDate).toLocaleString('id-ID')}</p>
                <p><strong>Aktivitas Terakhir:</strong> {new Date(selectedUser.lastActive).toLocaleString('id-ID')}</p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer hover:bg-slate-200"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modern Center Modal for User Deletion */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmDelete}
        title="Hapus Akun Pengguna"
        description="Apakah Anda yakin ingin menghapus akun pengguna ini secara permanen dari database?"
        itemName={deleteModal.userName}
        confirmLabel="Hapus Permanen"
        cancelLabel="Batal"
        isProcessing={deleteModal.isProcessing}
        type="danger"
      />

      {/* Modern Center Modal for Suspend/Activate Status Toggle */}
      <DeleteConfirmModal
        isOpen={statusModal.isOpen}
        onClose={() => setStatusModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmStatus}
        title={statusModal.nextStatus === 'SUSPENDED' ? 'Suspend Akun Pengguna' : 'Aktifkan Akun Pengguna'}
        description={
          statusModal.nextStatus === 'SUSPENDED'
            ? 'Pengguna yang di-suspend tidak dapat login atau mengakses fitur aplikasi sampai diaktifkan kembali.'
            : 'Aktifkan kembali akses akun pengguna agar dapat login dan beraktivitas normal.'
        }
        confirmText={statusModal.nextStatus === 'SUSPENDED' ? 'Ya, Suspend Akun' : 'Ya, Aktifkan Akun'}
        type={statusModal.nextStatus === 'SUSPENDED' ? 'warning' : 'info'}
      />

      {/* Modern Modal for Editing User (Full MySQL CRUD Sync) */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingUser(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
                    <UserCog className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                      Edit Data Akun Pengguna
                    </h3>
                    <p className="text-xs text-slate-500">Perubahan akan langsung disinkronkan ke database Laragon MySQL & IndexedDB.</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingUser(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Role Pengguna
                    </label>
                    <select
                      value={editFormData.role}
                      onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value as Role })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 cursor-pointer"
                    >
                      <option value="USER">USER (Reguler)</option>
                      <option value="CONTENT_ADMIN">CONTENT_ADMIN</option>
                      <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Paket Langganan
                    </label>
                    <select
                      value={editFormData.plan}
                      onChange={(e) => setEditFormData({ ...editFormData, plan: e.target.value as SubscriptionPlan })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 cursor-pointer"
                    >
                      <option value="FREE">FREE Member</option>
                      <option value="PREMIUM_MONTHLY">PRO Bulanan</option>
                      <option value="PREMIUM_YEARLY">PRO Tahunan</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Status Akun
                    </label>
                    <select
                      value={editFormData.status}
                      onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as AccountStatus })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 cursor-pointer"
                    >
                      <option value="ACTIVE">ACTIVE (Aktif)</option>
                      <option value="SUSPENDED">SUSPENDED (Diblokir)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Gelar / Level Keistiqomahan
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pejuang Istiqomah"
                      value={editFormData.title}
                      onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    disabled={isSavingEdit}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    disabled={isSavingEdit}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-wider shadow-md shadow-indigo-600/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSavingEdit ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Menyimpan ke MySQL...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Simpan Perubahan</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
