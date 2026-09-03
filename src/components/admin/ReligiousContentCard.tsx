import { ContentItem } from '../../types';
import ReligiousCard from '../ui/ReligiousCard';

interface ReligiousContentCardProps {
  content: ContentItem;
}

export default function ReligiousContentCard({ content }: ReligiousContentCardProps) {
  const isArabicContent = ['AYAT', 'HADIS', 'DOA'].includes(content.type);

  return (
    <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col">
      <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          CMS Preview
        </span>
        <span className="text-[10px] text-slate-400 font-medium bg-white dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700">
          v{content.version} • {content.status}
        </span>
      </div>

      <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950">
        <ReligiousCard 
          type={content.type}
          title={content.title}
          arabic={isArabicContent ? content.arabic : undefined}
          translation={isArabicContent ? content.translation : undefined}
          reference={isArabicContent ? content.reference : undefined}
          className="shadow-md"
        />
      </div>

      <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500 bg-white dark:bg-slate-900">
        <span>Oleh: <span className="font-medium text-slate-700 dark:text-slate-300">{content.author}</span></span>
        {content.reviewer && <span>Direview oleh: <span className="font-medium text-slate-700 dark:text-slate-300">{content.reviewer}</span></span>}
      </div>
    </div>
  );
}
