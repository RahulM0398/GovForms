import { useState, useRef, useEffect } from 'react';
import {
  FolderOpen,
  Plus,
  ChevronDown,
  Check,
  Pencil,
  Trash2,
  X,
  FolderPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDashboard } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';

interface ProjectSelectorProps {
  className?: string;
}

export function ProjectSelector({ className }: ProjectSelectorProps) {
  const {
    state,
    createProject,
    updateProject,
    deleteProject,
    setActiveProject,
    getActiveProject,
  } = useDashboard();

  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [editName, setEditName] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeProject = getActiveProject();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsCreating(false);
        setEditingId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when creating
  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreating]);

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      createProject(newProjectName.trim());
      setNewProjectName('');
      setIsCreating(false);
    }
  };

  const handleUpdateProject = (id: string) => {
    if (editName.trim()) {
      updateProject(id, editName.trim());
      setEditingId(null);
      setEditName('');
    }
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (state.projects.length > 1) {
      deleteProject(id);
    }
  };

  const handleSelectProject = (id: string) => {
    setActiveProject(id);
    setIsOpen(false);
  };

  const startEditing = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(id);
    setEditName(name);
  };

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      {/* Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-left transition-all hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-muted)]/50"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
            <FolderOpen className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--color-foreground)]">
              {activeProject?.name || 'Select Project'}
            </p>
            <p className="text-xs text-[var(--color-muted-foreground)]">
              {state.uploadedAssets.filter((a) => a.projectId === state.activeProjectId).length} files
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-2">
            <span className="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider">
              Projects
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
              onClick={() => setIsCreating(true)}
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              New
            </Button>
          </div>

          {/* Project List */}
          <div className="max-h-[280px] overflow-y-auto py-1">
            {state.projects.map((project) => (
              <div
                key={project.id}
                className={cn(
                  'group relative flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors',
                  project.id === state.activeProjectId
                    ? 'bg-[var(--color-primary)]/5'
                    : 'hover:bg-[var(--color-muted)]'
                )}
                onClick={() => handleSelectProject(project.id)}
              >
                {editingId === project.id ? (
                  <div className="flex flex-1 items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleUpdateProject(project.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      className="h-7 text-sm"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-[var(--color-accent)]"
                      onClick={() => handleUpdateProject(project.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setEditingId(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-md',
                        project.id === state.activeProjectId
                          ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                          : 'bg-[var(--color-muted)] text-[var(--color-muted-foreground)]'
                      )}
                    >
                      <FolderOpen className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          'truncate text-sm font-medium',
                          project.id === state.activeProjectId
                            ? 'text-[var(--color-primary)]'
                            : 'text-[var(--color-foreground)]'
                        )}
                      >
                        {project.name}
                      </p>
                      <p className="text-[10px] text-[var(--color-muted-foreground)]">
                        {state.uploadedAssets.filter((a) => a.projectId === project.id).length} files
                      </p>
                    </div>
                    {project.id === state.activeProjectId && (
                      <Check className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                    )}
                    <div className="flex shrink-0 items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                        onClick={(e) => startEditing(project.id, project.name, e)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      {state.projects.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-[var(--color-muted-foreground)] hover:text-[var(--color-destructive)]"
                          onClick={(e) => handleDeleteProject(project.id, e)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Create New Project */}
          {isCreating && (
            <div className="border-t border-[var(--color-border)] p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-muted)]">
                  <FolderPlus className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                </div>
                <Input
                  ref={inputRef}
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreateProject();
                    if (e.key === 'Escape') {
                      setIsCreating(false);
                      setNewProjectName('');
                    }
                  }}
                  placeholder="Project name..."
                  className="h-8 text-sm flex-1"
                />
                <Button
                  size="sm"
                  className="h-8 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white"
                  onClick={handleCreateProject}
                  disabled={!newProjectName.trim()}
                >
                  Create
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


