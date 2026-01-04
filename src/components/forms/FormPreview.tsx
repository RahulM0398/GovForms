import { useState } from 'react';
import { FileText, FileSignature, FileSpreadsheet, FileBadge, Loader2, FileDown, CheckCircle2 } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';
import { SF330 } from './SF330';
import { SF254 } from './SF254';
import { SF255 } from './SF255';
import { SF252 } from './SF252';
import { FormProgressBar } from './FormProgressBar';
import { getFormProgress } from '@/utils/formProgress';
import { exportFormToPDF, downloadPDF } from '@/utils/pdfExport';
import { Button } from '@/components/ui/button';

const formMeta: Record<string, { title: string; subtitle: string; icon: typeof FileText; gradient: string }> = {
  SF330: {
    title: 'SF330',
    subtitle: 'Architect-Engineer Qualifications',
    icon: FileText,
    gradient: 'from-violet-500 to-purple-600',
  },
  SF254: {
    title: 'SF254',
    subtitle: 'A-E Services Questionnaire',
    icon: FileSpreadsheet,
    gradient: 'from-blue-500 to-cyan-600',
  },
  SF255: {
    title: 'SF255',
    subtitle: 'Project-Specific Questionnaire',
    icon: FileBadge,
    gradient: 'from-amber-500 to-orange-600',
  },
  SF252: {
    title: 'SF252',
    subtitle: 'Architect-Engineer Contract',
    icon: FileSignature,
    gradient: 'from-emerald-500 to-teal-600',
  },
};

export function FormPreview() {
  const { state } = useDashboard();
  const { activeForm, isLoading, formData } = state;
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  
  const meta = formMeta[activeForm] || formMeta.SF330;
  const Icon = meta.icon;
  
  // Calculate progress for current form
  const progress = getFormProgress(activeForm, formData);

  const handleExportPDF = async () => {
    setIsExporting(true);
    setExportSuccess(false);
    
    try {
      const { blob, filename } = await exportFormToPDF(activeForm, formData);
      downloadPDF(blob, filename);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

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

        <div className="flex items-center gap-3">
          {isLoading && (
            <div className="flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-3 py-1.5 text-xs font-medium text-[var(--color-primary)]">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Extracting...</span>
            </div>
          )}

          {exportSuccess && (
            <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-3 w-3" />
              <span>Exported!</span>
            </div>
          )}

          {/* Export Button */}
          <Button 
            variant="outline" 
            size="sm"
            disabled={isExporting}
            onClick={handleExportPDF}
            className="gap-2 border-[var(--color-border)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileDown className="h-4 w-4" />
            )}
            Export PDF
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <FormProgressBar progress={progress} formName={meta.title} />

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto">
        {activeForm === 'SF330' && <SF330 />}
        {activeForm === 'SF254' && <SF254 />}
        {activeForm === 'SF255' && <SF255 />}
        {activeForm === 'SF252' && <SF252 />}
      </div>
    </div>
  );
}
