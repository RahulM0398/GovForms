import { useState, useCallback } from 'react';
import { Loader2, CheckCircle2, AlertCircle, CloudUpload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboard } from '@/context/DashboardContext';
import { useAutoFill } from '@/hooks/useAutoFill';
import type { UploadedAsset } from '@/types';

interface FileDropZoneProps {
  className?: string;
}

export function FileDropZone({ className }: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const { state, addAsset } = useDashboard();
  const { triggerExtraction, isExtracting } = useAutoFill();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const processFile = useCallback(
    async (file: File) => {
      const fileName = file.name.toLowerCase();
      let assetType: UploadedAsset['type'] = 'other';
      
      if (fileName.includes('resume') || fileName.includes('cv')) {
        assetType = 'resume';
      } else if (fileName.includes('project') || fileName.includes('profile')) {
        assetType = 'project_profile';
      } else if (fileName.includes('cert') || fileName.includes('license')) {
        assetType = 'certificate';
      }

      // Use the active project ID, or 'default' if none selected
      const projectId = state.activeProjectId || 'default';

      const asset: UploadedAsset = {
        id: crypto.randomUUID(),
        name: file.name,
        type: assetType,
        size: file.size,
        uploadedAt: new Date(),
        projectId,
      };

      addAsset(asset);
      await triggerExtraction(file);
    },
    [addAsset, triggerExtraction, state.activeProjectId]
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      setUploadStatus('uploading');

      const files = Array.from(e.dataTransfer.files);
      
      try {
        for (const file of files) {
          await processFile(file);
        }
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 2000);
      } catch (error) {
        setUploadStatus('error');
        setTimeout(() => setUploadStatus('idle'), 3000);
      }
    },
    [processFile]
  );

  const handleFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      setUploadStatus('uploading');

      try {
        for (const file of Array.from(files)) {
          await processFile(file);
        }
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 2000);
      } catch (error) {
        setUploadStatus('error');
        setTimeout(() => setUploadStatus('idle'), 3000);
      }

      e.target.value = '';
    },
    [processFile]
  );

  const isProcessing = uploadStatus === 'uploading' || isExtracting;

  return (
    <div className={cn('p-4', className)}>
      <label
        htmlFor="file-upload"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-200',
          isDragOver
            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 scale-[1.01]'
            : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-muted)]/50',
          isProcessing && 'pointer-events-none opacity-70'
        )}
      >
        <input
          id="file-upload"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileInput}
          className="sr-only"
          disabled={isProcessing}
        />

        <div className="flex flex-col items-center gap-3 p-5 text-center">
          {isProcessing ? (
            <>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                <Loader2 className="h-5 w-5 animate-spin text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-foreground)]">Processing...</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">Extracting information</p>
              </div>
            </>
          ) : uploadStatus === 'success' ? (
            <>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent)]/10">
                <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-accent)]">Upload complete!</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">Data extracted successfully</p>
              </div>
            </>
          ) : uploadStatus === 'error' ? (
            <>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-destructive)]/10">
                <AlertCircle className="h-5 w-5 text-[var(--color-destructive)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-destructive)]">Upload failed</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">Please try again</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-muted)]">
                <CloudUpload className="h-5 w-5 text-[var(--color-muted-foreground)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-foreground)]">
                  Drop files or <span className="text-[var(--color-primary)]">browse</span>
                </p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
                  PDF, DOC, DOCX, TXT
                </p>
              </div>
            </>
          )}
        </div>
      </label>
    </div>
  );
}
