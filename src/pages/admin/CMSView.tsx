import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Plus, 
  Edit2, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Clock, 
  X, 
  Search, 
  Filter, 
  BookOpen, 
  Quote, 
  Sparkles,
  Send,
  ShieldCheck
} from 'lucide-react';
import { ContentStatus, ContentItem } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import ReligiousContentCard from '../../components/admin/ReligiousContentCard';
import DeleteConfirmModal from '../../components/ui/DeleteConfirmModal';
import { soundFx } from '../../lib/soundFx';

export default function CMSView() {
  const { cmsItems, addCmsItem, updateCmsItem, deleteCmsItem, updateCmsItemStatus } = useStore();
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [previewItem, setPreviewItem] = useState<ContentItem | null>(null);

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    itemId: string;
    itemTitle: string;
    isProcessing: boolean;
  }>({
    isOpen: false,
    itemId: '',
    itemTitle: '',
    isProcessing: false,
  });
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'DOSA' | 'DOA' | 'AYAT' | 'HADIS' | 'PROGRAM'>('AYAT');
  const [arabic, setArabic] = useState('');
  const [translation, setTranslation] = useState('');
  const [reference, setReference] = useState('');

  const filteredItems = useMemo(() => {
    return cmsItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (item.translation || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (item.reference || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = typeFilter === 'ALL' ? true : item.type === typeFilter;
      const matchesStatus = statusFilter === 'ALL' ? true : item.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [cmsItems, searchQuery, typeFilter, statusFilter]);

  const handleOpenCreate = () => {
    setTitle('');
    setType('AYAT');
    setArabic('');
    setTranslation('');
    setReference('');
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (item: ContentItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setType(item.type);
    setArabic(item.arabic || '');
    setTranslation(item.translation || '');
    setReference(item.reference || '');
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    await addCmsItem({
      title,
      type,
      status: 'DRAFT',
      author: 'Admin',
      ...( ['AYAT', 'HADIS', 'DOA'].includes(type) ? { arabic, translation, reference } : {} )
    });
    
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !title.trim()) return;

    await updateCmsItem({
      ...editingItem,
      title,
      type,
      arabic: ['AYAT', 'HADIS', 'DOA'].includes(type) ? arabic : undefined,
      translation: ['AYAT', 'HADIS', 'DOA'].includes(type) ? translation : undefined,
      reference: ['AYAT', 'HADIS', 'DOA'].includes(type) ? reference : undefined,
    });

    setEditingItem(null);
  };

  const handleOpenDelete = (id: string, itemTitle: string) => {
    soundFx.playTap();
    setDeleteModal({
      isOpen: true,
      itemId: id,
      itemTitle,
      isProcessing: false,
    });
  };

  const handleConfirmDelete = async () => {
    setDeleteModal(prev => ({ ...prev, isProcessing: true }));
    try {
      await deleteCmsItem(deleteModal.itemId);
      soundFx.playSuccess();
      setDeleteModal({ isOpen: false, itemId: '', itemTitle: '', isProcessing: false });
    } catch {
      setDeleteModal(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const statusColors: Record<ContentStatus, string> = {
    DRAFT: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    IN_REVIEW: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    VERIFIED: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    PUBLISHED: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    ARCHIVED: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">Manajemen Konten (CMS)</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Kelola materi dalil Al-Qur'an, Hadis shahih, doa taubat, dan katalog panduan ibadah.
          </p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-indigo-700 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" /> Tambah Konten Baru
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Search & Filter Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari judul, terjemahan, atau rujukan..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
            >
              <option value="ALL">Semua Jenis</option>
              <option value="AYAT">Ayat / Dalil</option>
              <option value="HADIS">Hadis</option>
              <option value="DOA">Panduan Doa</option>
              <option value="DOSA">Direktori Dosa</option>
              <option value="PROGRAM">Program Hijrah</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
            >
              <option value="ALL">Semua Status</option>
              <option value="PUBLISHED">Published (Terbit)</option>
              <option value="VERIFIED">Verified (Terverifikasi)</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Judul Materi</th>
                <th className="px-6 py-4">Jenis</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Penulis / Reviewer</th>
                <th className="px-6 py-4">Versi</th>
                <th className="px-6 py-4 text-right">Aksi & Workflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                    Tidak ditemukan materi konten. Klik "Tambah Konten Baru" untuk memulai.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-colors">
                    
                    {/* Title */}
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">
                      <div>{item.title}</div>
                      {item.reference && (
                        <div className="text-[10px] text-slate-400 font-normal mt-0.5">{item.reference}</div>
                      )}
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md">
                        {item.type}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${statusColors[item.status]}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Author / Reviewer */}
                    <td className="px-6 py-4 text-slate-500">
                      <div>{item.author}</div>
                      {item.reviewer && (
                        <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                          Rev: {item.reviewer}
                        </div>
                      )}
                    </td>

                    {/* Version */}
                    <td className="px-6 py-4 text-slate-400">
                      v{item.version}
                    </td>

                    {/* Action buttons & workflow */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Preview */}
                        <button 
                          onClick={() => setPreviewItem(item)} 
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Preview Kartu"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Workflow Buttons */}
                        {item.status === 'DRAFT' && (
                          <button 
                            onClick={() => updateCmsItemStatus(item.id, 'IN_REVIEW')} 
                            className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-colors cursor-pointer"
                          >
                            Ajukan Review
                          </button>
                        )}
                        {item.status === 'IN_REVIEW' && (
                          <button 
                            onClick={() => updateCmsItemStatus(item.id, 'VERIFIED', 'Dewan Syariah')} 
                            className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition-colors cursor-pointer"
                          >
                            Verifikasi
                          </button>
                        )}
                        {item.status === 'VERIFIED' && (
                          <button 
                            onClick={() => updateCmsItemStatus(item.id, 'PUBLISHED')} 
                            className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
                          >
                            Terbitkan
                          </button>
                        )}

                        {/* Edit */}
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Edit Materi"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button 
                          onClick={() => handleOpenDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Hapus Materi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {(isCreateModalOpen || editingItem) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  {editingItem ? 'Edit Konten Materi' : 'Tambah Konten Syar\'i Baru'}
                </h3>
                <button 
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingItem(null);
                  }} 
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={editingItem ? handleEditSubmit : handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Judul Konten
                  </label>
                  <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Ayat Rahmat & Pengampunan Dosa"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Jenis Konten
                  </label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 cursor-pointer"
                  >
                    <option value="AYAT">Ayat Al-Qur'an</option>
                    <option value="HADIS">Hadis Shahih</option>
                    <option value="DOA">Panduan Doa</option>
                    <option value="DOSA">Direktori Dosa</option>
                    <option value="PROGRAM">Program Perubahan</option>
                  </select>
                </div>
                
                {['AYAT', 'HADIS', 'DOA'].includes(type) && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Teks Arab Kaligrafi
                      </label>
                      <textarea 
                        dir="rtl"
                        value={arabic}
                        onChange={(e) => setArabic(e.target.value)}
                        placeholder="Masukkan harakat teks Arab..."
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-arabic text-right h-24 text-base text-slate-900 dark:text-slate-100 leading-loose"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Terjemahan Bahasa Indonesia
                      </label>
                      <textarea 
                        value={translation}
                        onChange={(e) => setTranslation(e.target.value)}
                        placeholder="Arti dan makna dalam bahasa Indonesia..."
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-xs text-slate-900 dark:text-slate-100 h-20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Rujukan / Sumber Dalil
                      </label>
                      <input 
                        type="text" 
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-xs text-slate-900 dark:text-slate-100"
                        placeholder="Contoh: Q.S. Az-Zumar: 53 atau H.R. Bukhari no. 6306"
                      />
                    </div>
                  </>
                )}

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setEditingItem(null);
                    }} 
                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    {editingItem ? 'Simpan Perubahan' : 'Simpan Draf'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Preview Modal */}
        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  Pratinjau Kartu ({previewItem.type})
                </span>
                <button 
                  onClick={() => setPreviewItem(null)} 
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ReligiousContentCard content={previewItem} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modern Center Modal for Content Deletion */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmDelete}
        title="Hapus Materi Dakwah"
        description="Apakah Anda yakin ingin menghapus materi konten ini secara permanen dari database?"
        itemName={deleteModal.itemTitle}
        confirmLabel="Hapus Materi"
        cancelLabel="Batal"
        isProcessing={deleteModal.isProcessing}
        type="danger"
      />
    </div>
  );
}
