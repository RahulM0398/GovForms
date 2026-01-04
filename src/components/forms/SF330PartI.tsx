import { Building2, User, Phone, Mail, MapPin, Users, FolderKanban, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useDashboard } from '@/context/DashboardContext';
import type { KeyPersonnel, ExampleProject } from '@/types';

export function SF330PartI() {
  const { state, updateSF330PartI, addKeyPersonnel, removeKeyPersonnel, addExampleProject, removeExampleProject } = useDashboard();
  const data = state.formData.sf330PartI;

  const handleInputChange = (field: string, value: string | number) => {
    updateSF330PartI({ [field]: value });
  };

  const handleAddKeyPersonnel = () => {
    const newPerson: KeyPersonnel = {
      id: crypto.randomUUID(),
      name: '',
      title: '',
      yearsExperience: 0,
      firmName: data.firmName,
      education: '',
      certifications: [],
      relevantProjects: [],
    };
    addKeyPersonnel(newPerson);
  };

  const handleAddProject = () => {
    const newProject: ExampleProject = {
      id: crypto.randomUUID(),
      projectName: '',
      projectOwner: '',
      ownerPointOfContact: '',
      ownerPhone: '',
      completionDate: '',
      projectLocation: '',
      estimatedCost: 0,
      briefDescription: '',
    };
    addExampleProject(newProject);
  };

  return (
    <div className="space-y-5 p-6">
      {/* Section A - Contract Information */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-violet-50 to-purple-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100">
            <Building2 className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Section A - Contract Information</h3>
            <p className="text-xs text-[var(--color-muted-foreground)]">Solicitation and contract details</p>
          </div>
        </div>
        <div className="p-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contractNumber" className="text-xs font-medium text-[var(--color-muted-foreground)]">Contract Number</Label>
            <Input
              id="contractNumber"
              value={data.contractNumber}
              onChange={(e) => handleInputChange('contractNumber', e.target.value)}
              placeholder="e.g., GS-00P-00-CYD-0009"
              className="bg-white border-[var(--color-border)] focus:border-[var(--color-primary)]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taskOrderNumber" className="text-xs font-medium text-[var(--color-muted-foreground)]">Task Order Number</Label>
            <Input
              id="taskOrderNumber"
              value={data.taskOrderNumber}
              onChange={(e) => handleInputChange('taskOrderNumber', e.target.value)}
              placeholder="e.g., TO-2024-0145"
              className="bg-white border-[var(--color-border)] focus:border-[var(--color-primary)]"
            />
          </div>
        </div>
      </div>

      {/* Section B - Point of Contact */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Section B - Point of Contact</h3>
            <p className="text-xs text-[var(--color-muted-foreground)]">Primary firm and contact information</p>
          </div>
        </div>
        <div className="p-5 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="firmName" className="text-xs font-medium text-[var(--color-muted-foreground)]">Firm Name</Label>
            <Input
              id="firmName"
              value={data.firmName}
              onChange={(e) => handleInputChange('firmName', e.target.value)}
              placeholder="Enter firm name"
              className="bg-white border-[var(--color-border)]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Street Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
                <Input
                  className="pl-9 bg-white border-[var(--color-border)]"
                  value={data.streetAddress}
                  onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">City</Label>
              <Input
                value={data.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Washington"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">State</Label>
              <Input
                value={data.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="DC"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">ZIP Code</Label>
              <Input
                value={data.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                placeholder="20001"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
          </div>

          <div className="h-px bg-[var(--color-border)]" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Point of Contact Name</Label>
              <Input
                value={data.pointOfContactName}
                onChange={(e) => handleInputChange('pointOfContactName', e.target.value)}
                placeholder="John Smith"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Title</Label>
              <Input
                value={data.pointOfContactTitle}
                onChange={(e) => handleInputChange('pointOfContactTitle', e.target.value)}
                placeholder="Principal Architect"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
                <Input
                  className="pl-9 bg-white border-[var(--color-border)]"
                  value={data.pointOfContactPhone}
                  onChange={(e) => handleInputChange('pointOfContactPhone', e.target.value)}
                  placeholder="(202) 555-0100"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
                <Input
                  className="pl-9 bg-white border-[var(--color-border)]"
                  type="email"
                  value={data.pointOfContactEmail}
                  onChange={(e) => handleInputChange('pointOfContactEmail', e.target.value)}
                  placeholder="contact@firm.com"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section E - Key Personnel */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100">
              <Users className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Section E - Key Personnel</h3>
              <p className="text-xs text-[var(--color-muted-foreground)]">Resumes of key team members</p>
            </div>
          </div>
          <Button size="sm" onClick={handleAddKeyPersonnel} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white shadow-sm">
            <Plus className="mr-1 h-4 w-4" />
            Add
          </Button>
        </div>
        <div className="p-5">
          {data.keyPersonnel.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border)] py-10">
              <Users className="h-10 w-10 text-[var(--color-muted-foreground)]/30" />
              <p className="mt-3 text-sm font-medium text-[var(--color-muted-foreground)]">No key personnel added</p>
              <Button variant="ghost" size="sm" className="mt-2 text-[var(--color-primary)]" onClick={handleAddKeyPersonnel}>
                <Plus className="mr-1 h-4 w-4" />
                Add first person
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {data.keyPersonnel.map((person, index) => (
                <div key={person.id} className="relative rounded-lg border border-[var(--color-border)] p-4 bg-[var(--color-surface)]">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-7 w-7 text-[var(--color-destructive)] hover:bg-[var(--color-destructive)]/10"
                    onClick={() => removeKeyPersonnel(person.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="mb-2 text-xs font-semibold text-[var(--color-primary)]">
                    Personnel #{index + 1}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <Label className="text-[10px] text-[var(--color-muted-foreground)]">Name</Label>
                      <p className="text-sm font-medium">{person.name || '—'}</p>
                    </div>
                    <div>
                      <Label className="text-[10px] text-[var(--color-muted-foreground)]">Title</Label>
                      <p className="text-sm font-medium">{person.title || '—'}</p>
                    </div>
                    <div>
                      <Label className="text-[10px] text-[var(--color-muted-foreground)]">Experience</Label>
                      <p className="text-sm font-medium">{person.yearsExperience} years</p>
                    </div>
                  </div>
                  {person.certifications.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {person.certifications.map((cert, i) => (
                        <span key={i} className="rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-xs font-medium text-[var(--color-primary)]">
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section F - Example Projects */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
              <FolderKanban className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Section F - Example Projects</h3>
              <p className="text-xs text-[var(--color-muted-foreground)]">Relevant project experience</p>
            </div>
          </div>
          <Button size="sm" onClick={handleAddProject} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
            <Plus className="mr-1 h-4 w-4" />
            Add
          </Button>
        </div>
        <div className="p-5">
          {data.exampleProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border)] py-10">
              <FolderKanban className="h-10 w-10 text-[var(--color-muted-foreground)]/30" />
              <p className="mt-3 text-sm font-medium text-[var(--color-muted-foreground)]">No projects added</p>
              <Button variant="ghost" size="sm" className="mt-2 text-emerald-600" onClick={handleAddProject}>
                <Plus className="mr-1 h-4 w-4" />
                Add first project
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {data.exampleProjects.map((project, index) => (
                <div key={project.id} className="relative rounded-lg border border-[var(--color-border)] p-4 bg-[var(--color-surface)]">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-7 w-7 text-[var(--color-destructive)] hover:bg-[var(--color-destructive)]/10"
                    onClick={() => removeExampleProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="mb-2 text-xs font-semibold text-emerald-600">
                    Project #{index + 1}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Label className="text-[10px] text-[var(--color-muted-foreground)]">Project Name</Label>
                      <p className="text-sm font-medium">{project.projectName || '—'}</p>
                    </div>
                    <div>
                      <Label className="text-[10px] text-[var(--color-muted-foreground)]">Owner</Label>
                      <p className="text-sm">{project.projectOwner || '—'}</p>
                    </div>
                    <div>
                      <Label className="text-[10px] text-[var(--color-muted-foreground)]">Location</Label>
                      <p className="text-sm">{project.projectLocation || '—'}</p>
                    </div>
                    <div>
                      <Label className="text-[10px] text-[var(--color-muted-foreground)]">Completion</Label>
                      <p className="text-sm">{project.completionDate || '—'}</p>
                    </div>
                    <div>
                      <Label className="text-[10px] text-[var(--color-muted-foreground)]">Est. Cost</Label>
                      <p className="text-sm font-medium">{project.estimatedCost ? `$${project.estimatedCost.toLocaleString()}` : '—'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
