import { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Search,
  MoreVertical,
  Calendar,
  FileText,
  Trash2,
  Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDashboard } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';

export function ProjectsView() {
  const { state, createProject, setActiveProject, deleteProject } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const filteredProjects = state.projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      createProject(newProjectName.trim());
      setNewProjectName('');
      setShowNewProject(false);
    }
  };

  const getProjectFileCount = (projectId: string) => {
    return state.uploadedAssets.filter((asset) => asset.projectId === projectId).length;
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-foreground)]">Projects</h1>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              {state.projects.length} project{state.projects.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button onClick={() => setShowNewProject(true)} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
          <Input
            type="search"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-[var(--color-border)]"
          />
        </div>

        {/* New Project Form */}
        {showNewProject && (
          <div className="mb-6 rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary)]/5 p-4">
            <h3 className="font-medium text-[var(--color-foreground)] mb-3">Create New Project</h3>
            <div className="flex gap-3">
              <Input
                placeholder="Project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
                className="bg-white border-[var(--color-border)]"
                autoFocus
              />
              <Button onClick={handleCreateProject} className="bg-[var(--color-primary)]">
                Create
              </Button>
              <Button variant="outline" onClick={() => setShowNewProject(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={cn(
                'group relative rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md cursor-pointer',
                state.activeProjectId === project.id
                  ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20'
                  : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
              )}
              onClick={() => setActiveProject(project.id)}
            >
              {/* Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem className="cursor-pointer">
                    <Edit className="mr-2 h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      if (state.projects.length > 1) {
                        deleteProject(project.id);
                      }
                    }}
                    disabled={state.projects.length <= 1}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Project Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 mb-4">
                <FolderKanban className="h-6 w-6 text-violet-600" />
              </div>

              {/* Project Info */}
              <h3 className="font-semibold text-[var(--color-foreground)] truncate">{project.name}</h3>
              {project.description && (
                <p className="mt-1 text-sm text-[var(--color-muted-foreground)] line-clamp-2">
                  {project.description}
                </p>
              )}

              {/* Stats */}
              <div className="mt-4 flex items-center gap-4 text-xs text-[var(--color-muted-foreground)]">
                <span className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  {getProjectFileCount(project.id)} files
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Active Badge */}
              {state.activeProjectId === project.id && (
                <div className="absolute bottom-3 right-3">
                  <span className="rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-[10px] font-medium text-white">
                    Active
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <FolderKanban className="h-12 w-12 text-[var(--color-muted-foreground)]/30" />
            <p className="mt-4 text-sm font-medium text-[var(--color-muted-foreground)]">No projects found</p>
            <Button
              variant="ghost"
              className="mt-2 text-[var(--color-primary)]"
              onClick={() => setShowNewProject(true)}
            >
              <Plus className="mr-1 h-4 w-4" />
              Create your first project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

