import { FileText, User, Building2, Award, File, X, Inbox } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { UploadedAsset } from '@/types';

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getAssetIcon(type: UploadedAsset['type']) {
  switch (type) {
    case 'resume':
      return <User className="h-4 w-4" />;
    case 'project_profile':
      return <Building2 className="h-4 w-4" />;
    case 'certificate':
      return <Award className="h-4 w-4" />;
    default:
      return <File className="h-4 w-4" />;
  }
}

function getAssetTypeLabel(type: UploadedAsset['type']): string {
  switch (type) {
    case 'resume':
      return 'Resume';
    case 'project_profile':
      return 'Project';
    case 'certificate':
      return 'Certificate';
    default:
      return 'Document';
  }
}

function getAssetTypeColor(type: UploadedAsset['type']): string {
  switch (type) {
    case 'resume':
      return 'text-blue-600 bg-blue-50';
    case 'project_profile':
      return 'text-emerald-600 bg-emerald-50';
    case 'certificate':
      return 'text-amber-600 bg-amber-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

interface UploadedAssetsProps {
  className?: string;
}

export function UploadedAssets({ className }: UploadedAssetsProps) {
  const { state, removeAsset, getActiveProject } = useDashboard();
  
  // Filter assets by the active project
  const projectAssets = state.uploadedAssets.filter(
    (asset) => asset.projectId === state.activeProjectId
  );
  
  const activeProject = getActiveProject();

  if (projectAssets.length === 0) {
    return (
      <div className={cn('flex flex-1 flex-col items-center justify-center p-6', className)}>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-muted)]">
          <Inbox className="h-7 w-7 text-[var(--color-muted-foreground)]/50" />
        </div>
        <p className="mt-3 text-sm font-medium text-[var(--color-muted-foreground)]">No files yet</p>
        <p className="text-xs text-[var(--color-muted-foreground)]/70 mt-1 text-center">
          Upload documents to <span className="font-medium">{activeProject?.name}</span>
        </p>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center justify-between border-t border-[var(--color-border)] px-5 py-3">
        <h3 className="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider">
          Project Files
        </h3>
        <span className="rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-[10px] font-semibold text-white">
          {projectAssets.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-2">
          {projectAssets.map((asset) => (
            <div
              key={asset.id}
              className="group relative flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-white p-3 transition-all hover:shadow-sm hover:border-[var(--color-primary)]/30"
            >
              {/* Icon */}
              <div
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                  getAssetTypeColor(asset.type)
                )}
              >
                {getAssetIcon(asset.type)}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[var(--color-foreground)]">{asset.name}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                  <span className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-medium', getAssetTypeColor(asset.type))}>
                    {getAssetTypeLabel(asset.type)}
                  </span>
                  <span className="text-[var(--color-border)]">•</span>
                  <span>{formatFileSize(asset.size)}</span>
                </div>
              </div>

              {/* Delete button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[var(--color-destructive)]/10 hover:text-[var(--color-destructive)]"
                onClick={() => removeAsset(asset.id)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
