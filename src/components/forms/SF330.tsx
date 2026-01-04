import { useState } from 'react';
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Users,
  FolderKanban,
  Plus,
  Trash2,
  Building,
  Hash,
  Shield,
  Users2,
  ChevronDown,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDashboard } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';
import type { KeyPersonnel, ExampleProject, EmployeeByDiscipline } from '@/types';

// Section collapse state type
type SectionId = 'contract' | 'contact' | 'personnel' | 'projects' | 'firm' | 'ownership' | 'office' | 'employees' | 'disciplines';

const FUNCTION_CODES = [
  { code: '01', discipline: 'Acoustical Engineer' },
  { code: '02', discipline: 'Administrative' },
  { code: '12', discipline: 'Architect' },
  { code: '21', discipline: 'Civil Engineer' },
  { code: '23', discipline: 'Structural Engineer' },
  { code: '24', discipline: 'Electrical Engineer' },
  { code: '30', discipline: 'Mechanical Engineer' },
  { code: '32', discipline: 'Environmental Engineer' },
  { code: '42', discipline: 'Interior Designer' },
  { code: '48', discipline: 'Landscape Architect' },
  { code: '60', discipline: 'Project Manager' },
];

interface CollapsibleSectionProps {
  id: SectionId;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  iconBg: string;
  iconColor: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  badge?: string;
  headerAction?: React.ReactNode;
}

function CollapsibleSection({
  id,
  title,
  subtitle,
  icon,
  gradientFrom,
  gradientTo,
  iconBg,
  iconColor,
  isOpen,
  onToggle,
  children,
  badge,
  headerAction,
}: CollapsibleSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
      <div
        className={cn(
          'flex w-full items-center justify-between px-5 py-4 border-b border-[var(--color-border)] transition-colors',
          `bg-gradient-to-r ${gradientFrom} ${gradientTo}`,
          !isOpen && 'border-b-0'
        )}
      >
        <div 
          className="flex flex-1 items-center gap-3 cursor-pointer"
          onClick={onToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onToggle()}
        >
          <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', iconBg)}>
            <span className={iconColor}>{icon}</span>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-[var(--color-foreground)]">{title}</h3>
              {badge && (
                <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-foreground)]">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--color-muted-foreground)]">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {headerAction}
          <div 
            className="cursor-pointer p-1 hover:bg-black/5 rounded"
            onClick={onToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onToggle()}
          >
            {isOpen ? (
              <ChevronDown className="h-5 w-5 text-[var(--color-muted-foreground)]" />
            ) : (
              <ChevronRight className="h-5 w-5 text-[var(--color-muted-foreground)]" />
            )}
          </div>
        </div>
      </div>
      {isOpen && <div className="p-5">{children}</div>}
    </div>
  );
}

export function SF330() {
  const {
    state,
    updateSF330PartI,
    updateSF330PartII,
    addKeyPersonnel,
    removeKeyPersonnel,
    addExampleProject,
    removeExampleProject,
    addEmployeeByDiscipline,
    removeEmployeeByDiscipline,
    updateEmployeeByDiscipline,
  } = useDashboard();

  const partI = state.formData.sf330PartI;
  const partII = state.formData.sf330PartII;

  // Collapsed sections state
  const [openSections, setOpenSections] = useState<Set<SectionId>>(
    new Set(['contract', 'contact', 'firm'])
  );

  const toggleSection = (id: SectionId) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handlePartIChange = (field: string, value: string | number) => {
    updateSF330PartI({ [field]: value });
  };

  const handlePartIIChange = (field: string, value: string | number) => {
    updateSF330PartII({ [field]: value });
  };

  const handleAddKeyPersonnel = () => {
    const newPerson: KeyPersonnel = {
      id: crypto.randomUUID(),
      name: '',
      title: '',
      yearsExperience: 0,
      firmName: partI.firmName,
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

  const handleAddDiscipline = () => {
    const newEmployee: EmployeeByDiscipline = {
      id: crypto.randomUUID(),
      functionCode: '',
      discipline: '',
      employeeCount: 0,
    };
    addEmployeeByDiscipline(newEmployee);
  };

  const handleUpdateDiscipline = (
    id: string,
    field: keyof EmployeeByDiscipline,
    value: string | number
  ) => {
    const employee = partII.employeesByDiscipline.find((e) => e.id === id);
    if (employee) {
      if (field === 'functionCode') {
        const match = FUNCTION_CODES.find((fc) => fc.code === value);
        updateEmployeeByDiscipline({
          ...employee,
          functionCode: value as string,
          discipline: match?.discipline || employee.discipline,
        });
      } else {
        updateEmployeeByDiscipline({
          ...employee,
          [field]: value,
        });
      }
    }
  };

  const totalDisciplineEmployees = partII.employeesByDiscipline.reduce(
    (sum, emp) => sum + emp.employeeCount,
    0
  );

  return (
    <div className="space-y-4 p-6">
      {/* Part I Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
          <FileText className="h-4 w-4 text-white" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[var(--color-foreground)]">Part I — Contract-Specific Qualifications</h2>
          <p className="text-xs text-[var(--color-muted-foreground)]">Sections A through H</p>
        </div>
      </div>

      {/* Section A - Contract Information */}
      <CollapsibleSection
        id="contract"
        title="Section A — Contract Information"
        subtitle="Solicitation and contract details"
        icon={<Building2 className="h-4 w-4" />}
        gradientFrom="from-violet-50"
        gradientTo="to-purple-50"
        iconBg="bg-violet-100"
        iconColor="text-violet-600"
        isOpen={openSections.has('contract')}
        onToggle={() => toggleSection('contract')}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Contract Number</Label>
            <Input
              value={partI.contractNumber}
              onChange={(e) => handlePartIChange('contractNumber', e.target.value)}
              placeholder="e.g., GS-00P-00-CYD-0009"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Task Order Number</Label>
            <Input
              value={partI.taskOrderNumber}
              onChange={(e) => handlePartIChange('taskOrderNumber', e.target.value)}
              placeholder="e.g., TO-2024-0145"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Section B - Point of Contact */}
      <CollapsibleSection
        id="contact"
        title="Section B — Architect-Engineer Point of Contact"
        subtitle="Primary firm and contact information"
        icon={<User className="h-4 w-4" />}
        gradientFrom="from-blue-50"
        gradientTo="to-cyan-50"
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
        isOpen={openSections.has('contact')}
        onToggle={() => toggleSection('contact')}
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Firm Name</Label>
            <Input
              value={partI.firmName}
              onChange={(e) => handlePartIChange('firmName', e.target.value)}
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
                  value={partI.streetAddress}
                  onChange={(e) => handlePartIChange('streetAddress', e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">City</Label>
              <Input
                value={partI.city}
                onChange={(e) => handlePartIChange('city', e.target.value)}
                placeholder="Washington"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">State</Label>
              <Input
                value={partI.state}
                onChange={(e) => handlePartIChange('state', e.target.value)}
                placeholder="DC"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">ZIP Code</Label>
              <Input
                value={partI.zipCode}
                onChange={(e) => handlePartIChange('zipCode', e.target.value)}
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
                value={partI.pointOfContactName}
                onChange={(e) => handlePartIChange('pointOfContactName', e.target.value)}
                placeholder="John Smith"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Title</Label>
              <Input
                value={partI.pointOfContactTitle}
                onChange={(e) => handlePartIChange('pointOfContactTitle', e.target.value)}
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
                  value={partI.pointOfContactPhone}
                  onChange={(e) => handlePartIChange('pointOfContactPhone', e.target.value)}
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
                  value={partI.pointOfContactEmail}
                  onChange={(e) => handlePartIChange('pointOfContactEmail', e.target.value)}
                  placeholder="contact@firm.com"
                />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Section E - Key Personnel */}
      <CollapsibleSection
        id="personnel"
        title="Section E — Resumes of Key Personnel"
        subtitle="Team members proposed for this contract"
        icon={<Users className="h-4 w-4" />}
        gradientFrom="from-indigo-50"
        gradientTo="to-blue-50"
        iconBg="bg-indigo-100"
        iconColor="text-indigo-600"
        isOpen={openSections.has('personnel')}
        onToggle={() => toggleSection('personnel')}
        badge={partI.keyPersonnel.length > 0 ? `${partI.keyPersonnel.length}` : undefined}
        headerAction={
          <Button size="sm" onClick={handleAddKeyPersonnel} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white shadow-sm h-7 text-xs">
            <Plus className="mr-1 h-3 w-3" />
            Add
          </Button>
        }
      >
        {partI.keyPersonnel.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border)] py-8">
            <Users className="h-10 w-10 text-[var(--color-muted-foreground)]/30" />
            <p className="mt-3 text-sm font-medium text-[var(--color-muted-foreground)]">No key personnel added</p>
            <Button variant="ghost" size="sm" className="mt-2 text-[var(--color-primary)]" onClick={handleAddKeyPersonnel}>
              <Plus className="mr-1 h-4 w-4" />
              Add first person
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {partI.keyPersonnel.map((person, index) => (
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
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* Section F - Example Projects */}
      <CollapsibleSection
        id="projects"
        title="Section F — Example Projects"
        subtitle="Relevant project experience"
        icon={<FolderKanban className="h-4 w-4" />}
        gradientFrom="from-emerald-50"
        gradientTo="to-teal-50"
        iconBg="bg-emerald-100"
        iconColor="text-emerald-600"
        isOpen={openSections.has('projects')}
        onToggle={() => toggleSection('projects')}
        badge={partI.exampleProjects.length > 0 ? `${partI.exampleProjects.length}` : undefined}
        headerAction={
          <Button size="sm" onClick={handleAddProject} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm h-7 text-xs">
            <Plus className="mr-1 h-3 w-3" />
            Add
          </Button>
        }
      >
        {partI.exampleProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border)] py-8">
            <FolderKanban className="h-10 w-10 text-[var(--color-muted-foreground)]/30" />
            <p className="mt-3 text-sm font-medium text-[var(--color-muted-foreground)]">No projects added</p>
            <Button variant="ghost" size="sm" className="mt-2 text-emerald-600" onClick={handleAddProject}>
              <Plus className="mr-1 h-4 w-4" />
              Add first project
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {partI.exampleProjects.map((project, index) => (
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
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">Est. Cost</Label>
                    <p className="text-sm font-medium">{project.estimatedCost ? `$${project.estimatedCost.toLocaleString()}` : '—'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* Divider between Part I and Part II */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--color-border)]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[var(--color-surface)] px-4 text-sm font-medium text-[var(--color-muted-foreground)]">
            Part II — General Qualifications
          </span>
        </div>
      </div>

      {/* Part II Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
          <Building className="h-4 w-4 text-white" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[var(--color-foreground)]">Part II — General Qualifications</h2>
          <p className="text-xs text-[var(--color-muted-foreground)]">Sections 4 through 10</p>
        </div>
      </div>

      {/* Section 4 - Firm Information */}
      <CollapsibleSection
        id="firm"
        title="Section 4 — Firm Information"
        subtitle="General organizational details"
        icon={<Building className="h-4 w-4" />}
        gradientFrom="from-emerald-50"
        gradientTo="to-teal-50"
        iconBg="bg-emerald-100"
        iconColor="text-emerald-600"
        isOpen={openSections.has('firm')}
        onToggle={() => toggleSection('firm')}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Firm Name</Label>
            <Input
              value={partII.firmName}
              onChange={(e) => handlePartIIChange('firmName', e.target.value)}
              placeholder="Enter firm name"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Year Established</Label>
            <Input
              value={partII.yearEstablished}
              onChange={(e) => handlePartIIChange('yearEstablished', e.target.value)}
              placeholder="e.g., 1995"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">DUNS Number</Label>
            <div className="relative">
              <Hash className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <Input
                className="pl-9 font-mono bg-white border-[var(--color-border)]"
                value={partII.dunsNumber}
                onChange={(e) => handlePartIIChange('dunsNumber', e.target.value)}
                placeholder="000000000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Tax ID Number</Label>
            <Input
              className="font-mono bg-white border-[var(--color-border)]"
              value={partII.taxIdNumber}
              onChange={(e) => handlePartIIChange('taxIdNumber', e.target.value)}
              placeholder="00-0000000"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Section 5 - Ownership */}
      <CollapsibleSection
        id="ownership"
        title="Section 5 — Ownership"
        subtitle="Business type and status"
        icon={<Shield className="h-4 w-4" />}
        gradientFrom="from-amber-50"
        gradientTo="to-orange-50"
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
        isOpen={openSections.has('ownership')}
        onToggle={() => toggleSection('ownership')}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Ownership Type</Label>
            <Input
              value={partII.ownershipType}
              onChange={(e) => handlePartIIChange('ownershipType', e.target.value)}
              placeholder="e.g., Corporation, LLC"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Small Business Status</Label>
            <Input
              value={partII.smallBusinessStatus}
              onChange={(e) => handlePartIIChange('smallBusinessStatus', e.target.value)}
              placeholder="e.g., Small Business, 8(a)"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Section 6 - Principal Office */}
      <CollapsibleSection
        id="office"
        title="Section 6 — Principal Office"
        subtitle="Headquarters location"
        icon={<MapPin className="h-4 w-4" />}
        gradientFrom="from-cyan-50"
        gradientTo="to-blue-50"
        iconBg="bg-cyan-100"
        iconColor="text-cyan-600"
        isOpen={openSections.has('office')}
        onToggle={() => toggleSection('office')}
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Office Name</Label>
              <Input
                value={partII.principalOfficeName}
                onChange={(e) => handlePartIIChange('principalOfficeName', e.target.value)}
                placeholder="Headquarters"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Address</Label>
              <Input
                value={partII.principalOfficeAddress}
                onChange={(e) => handlePartIIChange('principalOfficeAddress', e.target.value)}
                placeholder="123 Main Street"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">City</Label>
              <Input
                value={partII.principalOfficeCity}
                onChange={(e) => handlePartIIChange('principalOfficeCity', e.target.value)}
                placeholder="Washington"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">State</Label>
              <Input
                value={partII.principalOfficeState}
                onChange={(e) => handlePartIIChange('principalOfficeState', e.target.value)}
                placeholder="DC"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">ZIP Code</Label>
              <Input
                value={partII.principalOfficeZipCode}
                onChange={(e) => handlePartIIChange('principalOfficeZipCode', e.target.value)}
                placeholder="20001"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Section 8 - Total Personnel */}
      <CollapsibleSection
        id="employees"
        title="Section 8 — Total Personnel"
        subtitle="Summary employee counts"
        icon={<Users className="h-4 w-4" />}
        gradientFrom="from-violet-50"
        gradientTo="to-purple-50"
        iconBg="bg-violet-100"
        iconColor="text-violet-600"
        isOpen={openSections.has('employees')}
        onToggle={() => toggleSection('employees')}
      >
        <div className="space-y-4">
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-5">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Total</Label>
              <Input
                type="number"
                min="0"
                value={partII.totalEmployees || ''}
                onChange={(e) => handlePartIIChange('totalEmployees', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="text-center font-semibold bg-violet-50 border-violet-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Architects</Label>
              <Input
                type="number"
                min="0"
                value={partII.totalArchitects || ''}
                onChange={(e) => handlePartIIChange('totalArchitects', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="text-center bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Engineers</Label>
              <Input
                type="number"
                min="0"
                value={partII.totalEngineers || ''}
                onChange={(e) => handlePartIIChange('totalEngineers', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="text-center bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Other Prof.</Label>
              <Input
                type="number"
                min="0"
                value={partII.totalOtherProfessionals || ''}
                onChange={(e) => handlePartIIChange('totalOtherProfessionals', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="text-center bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Admin</Label>
              <Input
                type="number"
                min="0"
                value={partII.totalAdministrative || ''}
                onChange={(e) => handlePartIIChange('totalAdministrative', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="text-center bg-white border-[var(--color-border)]"
              />
            </div>
          </div>

          {/* Visual breakdown */}
          {partII.totalEmployees > 0 && (
            <div className="pt-3 border-t border-[var(--color-border)]">
              <div className="flex h-3 overflow-hidden rounded-full bg-[var(--color-muted)]">
                {partII.totalArchitects > 0 && (
                  <div
                    className="bg-blue-500 transition-all"
                    style={{ width: `${(partII.totalArchitects / partII.totalEmployees) * 100}%` }}
                  />
                )}
                {partII.totalEngineers > 0 && (
                  <div
                    className="bg-emerald-500 transition-all"
                    style={{ width: `${(partII.totalEngineers / partII.totalEmployees) * 100}%` }}
                  />
                )}
                {partII.totalOtherProfessionals > 0 && (
                  <div
                    className="bg-amber-500 transition-all"
                    style={{ width: `${(partII.totalOtherProfessionals / partII.totalEmployees) * 100}%` }}
                  />
                )}
                {partII.totalAdministrative > 0 && (
                  <div
                    className="bg-violet-500 transition-all"
                    style={{ width: `${(partII.totalAdministrative / partII.totalEmployees) * 100}%` }}
                  />
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-blue-500" /><span className="text-[var(--color-muted-foreground)]">Architects</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-emerald-500" /><span className="text-[var(--color-muted-foreground)]">Engineers</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-amber-500" /><span className="text-[var(--color-muted-foreground)]">Other</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-violet-500" /><span className="text-[var(--color-muted-foreground)]">Admin</span></div>
              </div>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* Section 9 - Employees by Discipline (Block 9) */}
      <CollapsibleSection
        id="disciplines"
        title="Section 9 — Employees by Discipline"
        subtitle="Personnel breakdown by function code"
        icon={<Users2 className="h-4 w-4" />}
        gradientFrom="from-pink-50"
        gradientTo="to-rose-50"
        iconBg="bg-pink-100"
        iconColor="text-pink-600"
        isOpen={openSections.has('disciplines')}
        onToggle={() => toggleSection('disciplines')}
        badge={partII.employeesByDiscipline.length > 0 ? `${totalDisciplineEmployees}` : undefined}
        headerAction={
          <Button size="sm" onClick={handleAddDiscipline} className="bg-pink-600 hover:bg-pink-700 text-white shadow-sm h-7 text-xs">
            <Plus className="mr-1 h-3 w-3" />
            Add Row
          </Button>
        }
      >
        {partII.employeesByDiscipline.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border)] py-8">
            <Users2 className="h-10 w-10 text-[var(--color-muted-foreground)]/30" />
            <p className="mt-3 text-sm font-medium text-[var(--color-muted-foreground)]">No disciplines added</p>
            <Button variant="ghost" size="sm" className="mt-2 text-pink-600" onClick={handleAddDiscipline}>
              <Plus className="mr-1 h-4 w-4" />
              Add first discipline
            </Button>
          </div>
        ) : (
          <>
            <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[var(--color-muted)] hover:bg-[var(--color-muted)]">
                    <TableHead className="w-[100px] text-xs font-semibold">Code</TableHead>
                    <TableHead className="text-xs font-semibold">Discipline</TableHead>
                    <TableHead className="w-[120px] text-right text-xs font-semibold">Count</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partII.employeesByDiscipline.map((employee) => (
                    <TableRow key={employee.id} className="hover:bg-[var(--color-muted)]/50">
                      <TableCell>
                        <Input
                          value={employee.functionCode}
                          onChange={(e) => handleUpdateDiscipline(employee.id, 'functionCode', e.target.value)}
                          placeholder="00"
                          className="h-8 w-full font-mono text-center bg-white border-[var(--color-border)]"
                          list={`function-codes-${employee.id}`}
                        />
                        <datalist id={`function-codes-${employee.id}`}>
                          {FUNCTION_CODES.map((fc) => (
                            <option key={fc.code} value={fc.code}>{fc.discipline}</option>
                          ))}
                        </datalist>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={employee.discipline}
                          onChange={(e) => handleUpdateDiscipline(employee.id, 'discipline', e.target.value)}
                          placeholder="Enter discipline"
                          className="h-8 bg-white border-[var(--color-border)]"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          value={employee.employeeCount || ''}
                          onChange={(e) => handleUpdateDiscipline(employee.id, 'employeeCount', parseInt(e.target.value) || 0)}
                          placeholder="0"
                          className="h-8 text-right bg-white border-[var(--color-border)]"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-[var(--color-destructive)] hover:bg-[var(--color-destructive)]/10"
                          onClick={() => removeEmployeeByDiscipline(employee.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Summary footer */}
            <div className="mt-3 flex items-center justify-between rounded-lg bg-[var(--color-muted)] px-4 py-2.5">
              <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
                {partII.employeesByDiscipline.length} discipline{partII.employeesByDiscipline.length !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-muted-foreground)]">Total:</span>
                <span className="rounded-md bg-pink-100 px-2.5 py-1 text-sm font-bold text-pink-700">
                  {totalDisciplineEmployees}
                </span>
              </div>
            </div>
          </>
        )}
      </CollapsibleSection>
    </div>
  );
}

