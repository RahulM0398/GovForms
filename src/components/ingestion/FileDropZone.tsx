import { useState, useCallback } from 'react';
import { Loader2, CheckCircle2, AlertCircle, CloudUpload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboard } from '@/context/DashboardContext';
import { useAutoFill } from '@/hooks/useAutoFill';
import { isValidFileType, isValidFileSize, sanitizeString } from '@/utils/security';
import type { UploadedAsset } from '@/types';

interface FileDropZoneProps {
  className?: string;
}

// Allowed file types and max size
const ALLOWED_FILE_TYPES = ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx'];
const MAX_FILE_SIZE_MB = 10;
const MAX_FILES_PER_UPLOAD = 10;

export function FileDropZone({ className }: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
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

  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    // Sanitize filename to prevent XSS
    const sanitizedName = sanitizeString(file.name);
    if (sanitizedName !== file.name.trim()) {
      return { valid: false, error: 'Filename contains invalid characters' };
    }

    // Check file type
    if (!isValidFileType(file.name, ALLOWED_FILE_TYPES)) {
      return { valid: false, error: `Invalid file type. Allowed: ${ALLOWED_FILE_TYPES.join(', ')}` };
    }

    // Check file size
    if (!isValidFileSize(file.size, MAX_FILE_SIZE_MB)) {
      return { valid: false, error: `File too large. Maximum size: ${MAX_FILE_SIZE_MB}MB` };
    }

    // Check for empty files
    if (file.size === 0) {
      return { valid: false, error: 'Cannot upload empty files' };
    }

    return { valid: true };
  }, []);

  const processFile = useCallback(
    async (file: File) => {
      // Validate file first
      const validation = validateFile(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

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
        name: sanitizeString(file.name),
        type: assetType,
        size: file.size,
        uploadedAt: new Date(),
        projectId,
      };

      addAsset(asset);
      await triggerExtraction(file);
    },
    [addAsset, triggerExtraction, state.activeProjectId, validateFile]
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      setUploadStatus('uploading');
      setErrorMessage('');

      const files = Array.from(e.dataTransfer.files);
      
      // Limit number of files per upload
      if (files.length > MAX_FILES_PER_UPLOAD) {
        setErrorMessage(`Too many files. Maximum ${MAX_FILES_PER_UPLOAD} files per upload.`);
        setUploadStatus('error');
        setTimeout(() => setUploadStatus('idle'), 3000);
        return;
      }

      try {
        for (const file of files) {
          await processFile(file);
        }
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 2000);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Upload failed');
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
      setErrorMessage('');

      // Limit number of files per upload
      if (files.length > MAX_FILES_PER_UPLOAD) {
        setErrorMessage(`Too many files. Maximum ${MAX_FILES_PER_UPLOAD} files per upload.`);
        setUploadStatus('error');
        setTimeout(() => setUploadStatus('idle'), 3000);
        e.target.value = '';
        return;
      }

      try {
        for (const file of Array.from(files)) {
          await processFile(file);
        }
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 2000);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Upload failed');
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
          accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
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
                <p className="text-xs text-[var(--color-muted-foreground)]">
                  {errorMessage || 'Please try again'}
                </p>
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
                  PDF, DOC, DOCX, TXT, XLS, XLSX (max {MAX_FILE_SIZE_MB}MB)
                </p>
              </div>
            </>
          )}
        </div>
      </label>
    </div>
  );
}
