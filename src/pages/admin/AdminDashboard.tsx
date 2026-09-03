import { Users, CreditCard, Activity, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Active Premium', value: '432', icon: CreditCard, color: 'text-indigo-600', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
    { label: 'MRR', value: 'Rp 6.4M', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { label: 'Pending Review', value: '12', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">System Overview</h1>
        <p className="text-slate-500 text-sm">Monitor platform metrics and health.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Needs Attention</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="font-medium">12 Content Items Awaiting Review</span>
            <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Review Now</button>
          </div>
          <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="font-medium">5 Payment Failures Detected</span>
            <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400">View Logs</button>
          </div>
          <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="font-medium">2 Reported User Comments</span>
            <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Moderate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
