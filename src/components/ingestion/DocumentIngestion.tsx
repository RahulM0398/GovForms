import { FileUp } from 'lucide-react';
import { ProjectSelector } from '@/components/project/ProjectSelector';
import { FileDropZone } from './FileDropZone';
import { UploadedAssets } from './UploadedAssets';

export function DocumentIngestion() {
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Project Selector */}
      <div className="border-b border-[var(--color-border)] p-4">
        <ProjectSelector />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
          <FileUp className="h-4.5 w-4.5 text-[var(--color-primary)]" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[var(--color-foreground)]">Document Ingestion</h2>
          <p className="text-xs text-[var(--color-muted-foreground)]">Upload files to auto-extract data</p>
        </div>
      </div>

      {/* Drop Zone */}
      <FileDropZone />

      {/* Uploaded Assets List */}
      <UploadedAssets className="flex-1 overflow-hidden" />
    </div>
  );
}
