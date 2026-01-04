import { FileText, FileSignature, Loader2 } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';
import { SF330 } from './SF330';
import { SF252 } from './SF252';
import type { FormType } from '@/types';

const formMeta: Record<string, { title: string; subtitle: string; icon: typeof FileText; gradient: string }> = {
  SF330: {
    title: 'SF330',
    subtitle: 'Architect-Engineer Qualifications',
    icon: FileText,
    gradient: 'from-violet-500 to-purple-600',
  },
  // Legacy form types for backwards compatibility
  SF330_PART_I: {
    title: 'SF330',
    subtitle: 'Architect-Engineer Qualifications',
    icon: FileText,
    gradient: 'from-violet-500 to-purple-600',
  },
  SF330_PART_II: {
    title: 'SF330',
    subtitle: 'Architect-Engineer Qualifications',
    icon: FileText,
    gradient: 'from-violet-500 to-purple-600',
  },
  SF252: {
    title: 'SF252',
    subtitle: 'Architect-Engineer Contract',
    icon: FileSignature,
    gradient: 'from-blue-500 to-indigo-600',
  },
};

export function FormPreview() {
  const { state, setActiveForm } = useDashboard();
  const { activeForm, isLoading } = state;
  
  // Handle legacy form types - redirect to combined SF330
  const normalizedForm = activeForm === 'SF330_PART_I' || activeForm === 'SF330_PART_II' 
    ? 'SF330' 
    : activeForm;
  
  // Update state if we have a legacy form type
  if (activeForm !== normalizedForm) {
    setActiveForm(normalizedForm as FormType);
  }
  
  const meta = formMeta[normalizedForm] || formMeta.SF330;
  const Icon = meta.icon;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[var(--color-surface)]">
      {/* Header */}
      <div className="flex items-center justify-between bg-white border-b border-[var(--color-border)] px-6 py-4">
        <div className="flex items-center gap-4">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${meta.gradient} shadow-md`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--color-foreground)]">{meta.title}</h2>
            <p className="text-sm text-[var(--color-muted-foreground)]">{meta.subtitle}</p>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-3 py-1.5 text-xs font-medium text-[var(--color-primary)]">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>Extracting...</span>
          </div>
        )}
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto">
        {(normalizedForm === 'SF330') && <SF330 />}
        {normalizedForm === 'SF252' && <SF252 />}
      </div>
    </div>
  );
}
