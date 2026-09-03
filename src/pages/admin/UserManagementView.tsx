import { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Search, Filter, MoreVertical, CheckCircle2, Ban, Mail, ShieldAlert } from 'lucide-react';

export default function UserManagementView() {
  const { mockUsers, updateMockUserStatus } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState<'ALL' | 'FREE' | 'PREMIUM'>('ALL');

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPlan = planFilter === 'ALL' 
        ? true 
        : planFilter === 'PREMIUM' 
          ? user.plan !== 'FREE' 
          : user.plan === 'FREE';

      return matchesSearch && matchesPlan;
    });
  }, [mockUsers, searchQuery, planFilter]);

  const handleToggleStatus = (id: string, currentStatus: 'ACTIVE' | 'SUSPENDED') => {
    if (confirm(`Are you sure you want to ${currentStatus === 'ACTIVE' ? 'suspend' : 'reactivate'} this user?`)) {
      updateMockUserStatus(id, currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">User Management</h1>
          <p className="text-slate-500 text-sm">Manage user accounts, subscriptions, and access.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 dark:bg-slate-900/50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value as any)}
              className="pl-3 pr-8 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="ALL">All Plans</option>
              <option value="FREE">Free Only</option>
              <option value="PREMIUM">Premium Only</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-slate-100">{user.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.status === 'ACTIVE' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 text-[10px] font-bold uppercase tracking-wider">
                          <Ban className="w-3 h-3" /> Suspended
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        user.plan !== 'FREE' 
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' 
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {user.plan.replace('PREMIUM_', 'PREMIUM ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        user.role !== 'USER' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleToggleStatus(user.id, user.status)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                          user.status === 'ACTIVE'
                            ? 'text-rose-600 border-rose-200 hover:bg-rose-50 dark:border-rose-900/50 dark:hover:bg-rose-900/20'
                            : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-900/50 dark:hover:bg-emerald-900/20'
                        }`}
                      >
                        {user.status === 'ACTIVE' ? 'Suspend' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
