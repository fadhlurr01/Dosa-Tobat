import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Edit2, Eye, CheckCircle, Clock, X, Search } from 'lucide-react';
import { ContentStatus, ContentItem } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import ReligiousContentCard from '../../components/admin/ReligiousContentCard';

export default function CMSView() {
  const { cmsItems, addCmsItem, updateCmsItemStatus } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<ContentItem | null>(null);
  
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'DOSA' | 'DOA' | 'AYAT' | 'HADIS' | 'PROGRAM'>('DOSA');
  const [arabic, setArabic] = useState('');
  const [translation, setTranslation] = useState('');
  const [reference, setReference] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addCmsItem({
      title,
      type,
      status: 'DRAFT',
      author: 'Admin',
      ...( ['AYAT', 'HADIS', 'DOA'].includes(type) ? { arabic, translation, reference } : {} )
    });
    
    setTitle('');
    setArabic('');
    setTranslation('');
    setReference('');
    setIsModalOpen(false);
  };

  const statusColors: Record<ContentStatus, string> = {
    DRAFT: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    IN_REVIEW: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    VERIFIED: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    PUBLISHED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    ARCHIVED: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Content Management</h1>
          <p className="text-slate-500 text-sm">Manage religious sources and programs.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Content
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search content..." 
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Version</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {cmsItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  No content found. Click "Add Content" to start.
                </td>
              </tr>
            ) : (
              cmsItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{item.title}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${statusColors[item.status]}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{item.author}</td>
                  <td className="px-6 py-4 text-slate-500">v{item.version}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => setPreviewItem(item)} className="text-slate-400 hover:text-indigo-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    {item.status === 'DRAFT' && (
                      <button onClick={() => updateCmsItemStatus(item.id, 'IN_REVIEW')} className="text-indigo-600 hover:text-indigo-800 font-medium">Request Review</button>
                    )}
                    {item.status === 'IN_REVIEW' && (
                      <button onClick={() => updateCmsItemStatus(item.id, 'VERIFIED', 'Reviewer1')} className="text-emerald-600 hover:text-emerald-800 font-medium">Verify</button>
                    )}
                    {item.status === 'VERIFIED' && (
                      <button onClick={() => updateCmsItemStatus(item.id, 'PUBLISHED')} className="text-emerald-600 hover:text-emerald-800 font-medium">Publish</button>
                    )}
                    <button className="text-slate-400 hover:text-slate-600 ml-2">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-200 dark:border-slate-800"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Add New Content</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Content Type</label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="DOSA">Direktori Dosa</option>
                    <option value="DOA">Panduan Doa</option>
                    <option value="AYAT">Ayat / Dalil</option>
                    <option value="HADIS">Hadis</option>
                    <option value="PROGRAM">Program Perubahan</option>
                  </select>
                </div>
                
                {['AYAT', 'HADIS', 'DOA'].includes(type) && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Arabic Text</label>
                      <textarea 
                        dir="rtl"
                        value={arabic}
                        onChange={(e) => setArabic(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-arabic text-right h-24"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Translation</label>
                      <textarea 
                        value={translation}
                        onChange={(e) => setTranslation(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 h-24"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Source/Reference</label>
                      <input 
                        type="text" 
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g. H.R. Bukhari"
                      />
                    </div>
                  </>
                )}

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-500 font-medium">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">Save Draft</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="relative w-full max-w-2xl"
            >
              <button 
                onClick={() => setPreviewItem(null)} 
                className="absolute -top-12 right-0 text-white hover:text-slate-200 bg-slate-900/50 rounded-full p-2"
              >
                <X className="w-6 h-6" />
              </button>
              <ReligiousContentCard content={previewItem} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
