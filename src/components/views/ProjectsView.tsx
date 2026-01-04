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
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  File,
  Image,
  FileSpreadsheet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDashboard } from '@/context/DashboardContext';
import { useNavigation } from '@/context/NavigationContext';
import { cn } from '@/lib/utils';
import { getFormProgress } from '@/utils/formProgress';
import type { Project, UploadedAsset } from '@/types';

export function ProjectsView() {
  const { state, createProject, setActiveProject, deleteProject, updateProject, getProjectAssets, removeAsset, setActiveForm } = useDashboard();
  const { setActiveSection } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const filteredProjects = state.projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      const project = createProject(newProjectName.trim(), newProjectDescription.trim() || undefined);
      setNewProjectName('');
      setNewProjectDescription('');
      setShowNewProject(false);
      setActiveProject(project.id);
      setSelectedProject(project);
    }
  };

  const handleUpdateProject = () => {
    if (editingProject && editingProject.name.trim()) {
      updateProject(editingProject.id, editingProject.name.trim(), editingProject.description);
      setEditingProject(null);
    }
  };

  const handleDeleteProject = (id: string) => {
    if (state.projects.length <= 1) {
      alert('Cannot delete the last project. Create another project first.');
      return;
    }
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      deleteProject(id);
      if (selectedProject?.id === id) {
        setSelectedProject(null);
      }
    }
  };

  const handleSelectProject = (project: Project) => {
    setActiveProject(project.id);
    setSelectedProject(project);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
  };

  const handleOpenForm = (formType: 'SF330' | 'SF254' | 'SF255' | 'SF252') => {
    setActiveForm(formType);
    setActiveSection('forms');
  };

  const handleRemoveAsset = (assetId: string) => {
    if (confirm('Remove this file from the project?')) {
      removeAsset(assetId);
    }
  };

  const getFileCount = (projectId: string) => {
    return state.uploadedAssets.filter((asset) => asset.projectId === projectId).length;
  };

  const getFileIcon = (asset: UploadedAsset) => {
    if (asset.type === 'resume') return <FileText className="h-4 w-4 text-blue-500" />;
    if (asset.type === 'project_profile') return <FolderKanban className="h-4 w-4 text-violet-500" />;
    if (asset.type === 'certificate') return <FileSpreadsheet className="h-4 w-4 text-emerald-500" />;
    if (asset.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return <Image className="h-4 w-4 text-amber-500" />;
    return <File className="h-4 w-4 text-gray-500" />;
  };

  // Calculate overall form progress for a project
  const getProjectProgress = () => {
    const sf330Progress = getFormProgress('SF330', state.formData);
    const sf254Progress = getFormProgress('SF254', state.formData);
    const sf255Progress = getFormProgress('SF255', state.formData);
    const sf252Progress = getFormProgress('SF252', state.formData);

    return {
      sf330: sf330Progress,
      sf254: sf254Progress,
      sf255: sf255Progress,
      sf252: sf252Progress,
    };
  };

  // Project Detail View
  if (selectedProject) {
    const projectAssets = getProjectAssets(selectedProject.id);
    const formProgress = getProjectProgress();

    return (
      <div className="h-full overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </button>

          {/* Project Header */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6 shadow-sm mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-purple-100">
                  <FolderKanban className="h-7 w-7 text-violet-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[var(--color-foreground)]">{selectedProject.name}</h1>
                  {selectedProject.description && (
                    <p className="text-sm text-[var(--color-muted-foreground)] mt-1">{selectedProject.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-[var(--color-muted-foreground)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Created {new Date(selectedProject.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      {projectAssets.length} files
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditingProject(selectedProject)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteProject(selectedProject.id)}
                  disabled={state.projects.length <= 1}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>

          {/* Forms Progress */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Form Progress</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(['SF330', 'SF254', 'SF255', 'SF252'] as const).map((formType) => {
                const progress = formProgress[formType.toLowerCase() as keyof typeof formProgress];
                return (
                  <button
                    key={formType}
                    onClick={() => handleOpenForm(formType)}
                    className="p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-[var(--color-foreground)]">{formType}</span>
                      {progress.percentage >= 100 ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                    <div className="h-2 bg-[var(--color-muted)] rounded-full overflow-hidden mb-2">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          progress.percentage >= 100 ? 'bg-emerald-500' :
                          progress.percentage >= 75 ? 'bg-blue-500' :
                          progress.percentage >= 50 ? 'bg-amber-500' : 'bg-red-500'
                        )}
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-[var(--color-muted-foreground)]">
                      {progress.percentage}% complete ({progress.filledFields}/{progress.totalRequiredFields})
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Uploaded Files */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Uploaded Files</h2>
              <Button 
                size="sm" 
                className="bg-[var(--color-primary)]"
                onClick={() => setActiveSection('forms')}
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload Files
              </Button>
            </div>
            
            {projectAssets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[var(--color-border)] rounded-lg">
                <FileText className="h-12 w-12 text-[var(--color-muted-foreground)]/30" />
                <p className="mt-4 text-sm font-medium text-[var(--color-muted-foreground)]">No files uploaded</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">Upload resumes, project profiles, or certificates</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-[var(--color-primary)]"
                  onClick={() => setActiveSection('forms')}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Upload first file
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {projectAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-muted)]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(asset)}
                      <div>
                        <p className="text-sm font-medium text-[var(--color-foreground)]">{asset.name}</p>
                        <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                          <span className="capitalize">{asset.type.replace('_', ' ')}</span>
                          <span>•</span>
                          <span>{(asset.size / 1024).toFixed(1)} KB</span>
                          <span>•</span>
                          <span>{new Date(asset.uploadedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[var(--color-muted-foreground)] hover:text-red-600"
                      onClick={() => handleRemoveAsset(asset.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Edit Project Modal */}
        {editingProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Edit Project</h2>
                <Button variant="ghost" size="icon" onClick={() => setEditingProject(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Project Name *</Label>
                  <Input
                    value={editingProject.name}
                    onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                    placeholder="Project name"
                    className="bg-white border-[var(--color-border)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={editingProject.description || ''}
                    onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                    placeholder="Optional description"
                    className="bg-white border-[var(--color-border)]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setEditingProject(null)}>Cancel</Button>
                <Button className="bg-[var(--color-primary)]" onClick={handleUpdateProject}>Save Changes</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Project List View
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
            <div className="space-y-3">
              <Input
                placeholder="Project name *"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
                className="bg-white border-[var(--color-border)]"
                autoFocus
              />
              <Input
                placeholder="Description (optional)"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <Button onClick={handleCreateProject} className="bg-[var(--color-primary)]" disabled={!newProjectName.trim()}>
                Create
              </Button>
              <Button variant="outline" onClick={() => { setShowNewProject(false); setNewProjectName(''); setNewProjectDescription(''); }}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const projectProgress = getFormProgress('SF330', state.formData);
            
            return (
              <div
                key={project.id}
                className={cn(
                  'group relative rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md cursor-pointer',
                  state.activeProjectId === project.id
                    ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                )}
                onClick={() => handleSelectProject(project)}
              >
                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); setEditingProject(project); }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600"
                      onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }}
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

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-[var(--color-muted-foreground)] mb-1">
                    <span>Progress</span>
                    <span>{projectProgress.percentage}%</span>
                  </div>
                  <div className="h-1.5 bg-[var(--color-muted)] rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        projectProgress.percentage >= 100 ? 'bg-emerald-500' :
                        projectProgress.percentage >= 50 ? 'bg-blue-500' : 'bg-amber-500'
                      )}
                      style={{ width: `${projectProgress.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 flex items-center gap-4 text-xs text-[var(--color-muted-foreground)]">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5" />
                    {getFileCount(project.id)} files
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
            );
          })}
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

        {/* Edit Project Modal (for list view) */}
        {editingProject && !selectedProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Edit Project</h2>
                <Button variant="ghost" size="icon" onClick={() => setEditingProject(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Project Name *</Label>
                  <Input
                    value={editingProject.name}
                    onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                    placeholder="Project name"
                    className="bg-white border-[var(--color-border)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={editingProject.description || ''}
                    onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                    placeholder="Optional description"
                    className="bg-white border-[var(--color-border)]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setEditingProject(null)}>Cancel</Button>
                <Button className="bg-[var(--color-primary)]" onClick={handleUpdateProject}>Save Changes</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
