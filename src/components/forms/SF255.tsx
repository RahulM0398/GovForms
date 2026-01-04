import { useState } from 'react';
import {
  FileText,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Users,
  Briefcase,
  FolderKanban,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Handshake,
  UserCheck,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';
import type { JointVenturePartner, OutsideConsultant, ProjectTeamMember, RelevantProject } from '@/types';

type SectionId = 'project' | 'firm' | 'poc' | 'jv' | 'consultants' | 'team' | 'experience' | 'authorization';

interface CollapsibleSectionProps {
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

export function SF255() {
  const { state, updateSF255 } = useDashboard();
  const data = state.formData.sf255;

  const [openSections, setOpenSections] = useState<Set<SectionId>>(
    new Set(['project', 'firm', 'poc'])
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

  const handleChange = (field: string, value: string) => {
    updateSF255({ [field]: value });
  };

  // Joint Venture Partners
  const handleAddJVPartner = () => {
    const newPartner: JointVenturePartner = {
      id: crypto.randomUUID(),
      firmName: '',
      address: '',
      percentParticipation: 0,
    };
    updateSF255({ jointVenturePartners: [...data.jointVenturePartners, newPartner] });
  };

  const handleRemoveJVPartner = (id: string) => {
    updateSF255({ jointVenturePartners: data.jointVenturePartners.filter((p) => p.id !== id) });
  };

  // Consultants
  const handleAddConsultant = () => {
    const newConsultant: OutsideConsultant = {
      id: crypto.randomUUID(),
      firmName: '',
      address: '',
      services: '',
    };
    updateSF255({ outsideConsultants: [...data.outsideConsultants, newConsultant] });
  };

  const handleRemoveConsultant = (id: string) => {
    updateSF255({ outsideConsultants: data.outsideConsultants.filter((c) => c.id !== id) });
  };

  // Team Members
  const handleAddTeamMember = () => {
    const newMember: ProjectTeamMember = {
      id: crypto.randomUUID(),
      name: '',
      title: '',
      projectRole: '',
      yearsExperience: 0,
      education: '',
      certifications: [],
    };
    updateSF255({ projectTeamResumes: [...data.projectTeamResumes, newMember] });
  };

  const handleRemoveTeamMember = (id: string) => {
    updateSF255({ projectTeamResumes: data.projectTeamResumes.filter((m) => m.id !== id) });
  };

  // Relevant Projects
  const handleAddRelevantProject = () => {
    const newProject: RelevantProject = {
      id: crypto.randomUUID(),
      projectName: '',
      projectOwner: '',
      completionDate: '',
      projectCost: 0,
      projectRole: '',
      briefDescription: '',
    };
    updateSF255({ relevantProjects: [...data.relevantProjects, newProject] });
  };

  const handleRemoveRelevantProject = (id: string) => {
    updateSF255({ relevantProjects: data.relevantProjects.filter((p) => p.id !== id) });
  };

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
          <FileText className="h-4 w-4 text-white" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[var(--color-foreground)]">SF255 — Project-Specific Questionnaire</h2>
          <p className="text-xs text-[var(--color-muted-foreground)]">Qualifications for a specific project</p>
        </div>
      </div>

      {/* Project Information */}
      <CollapsibleSection
        title="Project Information"
        subtitle="Details about the solicitation"
        icon={<FileText className="h-4 w-4" />}
        gradientFrom="from-amber-50"
        gradientTo="to-orange-50"
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
        isOpen={openSections.has('project')}
        onToggle={() => toggleSection('project')}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Project Title</Label>
            <Input
              value={data.projectTitle}
              onChange={(e) => handleChange('projectTitle', e.target.value)}
              placeholder="Enter project title"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Project Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <Input
                className="pl-9 bg-white border-[var(--color-border)]"
                value={data.projectLocation}
                onChange={(e) => handleChange('projectLocation', e.target.value)}
                placeholder="City, State"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Solicitation Number</Label>
            <Input
              value={data.solicitationNumber}
              onChange={(e) => handleChange('solicitationNumber', e.target.value)}
              placeholder="e.g., W912DR-24-R-0001"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Firm Information */}
      <CollapsibleSection
        title="Submitting Firm"
        subtitle="Primary firm details"
        icon={<Building2 className="h-4 w-4" />}
        gradientFrom="from-blue-50"
        gradientTo="to-cyan-50"
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
        isOpen={openSections.has('firm')}
        onToggle={() => toggleSection('firm')}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Firm Name</Label>
            <Input
              value={data.firmName}
              onChange={(e) => handleChange('firmName', e.target.value)}
              placeholder="Enter firm name"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Address</Label>
              <Input
                value={data.firmAddress}
                onChange={(e) => handleChange('firmAddress', e.target.value)}
                placeholder="123 Main Street"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">City</Label>
              <Input
                value={data.firmCity}
                onChange={(e) => handleChange('firmCity', e.target.value)}
                placeholder="Washington"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">State</Label>
                <Input
                  value={data.firmState}
                  onChange={(e) => handleChange('firmState', e.target.value)}
                  placeholder="DC"
                  className="bg-white border-[var(--color-border)]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">ZIP</Label>
                <Input
                  value={data.firmZipCode}
                  onChange={(e) => handleChange('firmZipCode', e.target.value)}
                  placeholder="20001"
                  className="bg-white border-[var(--color-border)]"
                />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Point of Contact */}
      <CollapsibleSection
        title="Point of Contact"
        subtitle="Primary contact for this submission"
        icon={<User className="h-4 w-4" />}
        gradientFrom="from-violet-50"
        gradientTo="to-purple-50"
        iconBg="bg-violet-100"
        iconColor="text-violet-600"
        isOpen={openSections.has('poc')}
        onToggle={() => toggleSection('poc')}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Name</Label>
            <Input
              value={data.pocName}
              onChange={(e) => handleChange('pocName', e.target.value)}
              placeholder="John Smith"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Title</Label>
            <Input
              value={data.pocTitle}
              onChange={(e) => handleChange('pocTitle', e.target.value)}
              placeholder="Project Manager"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Phone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <Input
                className="pl-9 bg-white border-[var(--color-border)]"
                value={data.pocPhone}
                onChange={(e) => handleChange('pocPhone', e.target.value)}
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
                value={data.pocEmail}
                onChange={(e) => handleChange('pocEmail', e.target.value)}
                placeholder="contact@firm.com"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Joint Venture Partners */}
      <CollapsibleSection
        title="Joint Venture Partners"
        subtitle="If applicable"
        icon={<Handshake className="h-4 w-4" />}
        gradientFrom="from-pink-50"
        gradientTo="to-rose-50"
        iconBg="bg-pink-100"
        iconColor="text-pink-600"
        isOpen={openSections.has('jv')}
        onToggle={() => toggleSection('jv')}
        badge={data.jointVenturePartners.length > 0 ? `${data.jointVenturePartners.length}` : undefined}
        headerAction={
          <Button size="sm" onClick={handleAddJVPartner} className="bg-pink-600 hover:bg-pink-700 text-white shadow-sm h-7 text-xs">
            <Plus className="mr-1 h-3 w-3" />
            Add
          </Button>
        }
      >
        {data.jointVenturePartners.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border)] py-8">
            <Handshake className="h-10 w-10 text-[var(--color-muted-foreground)]/30" />
            <p className="mt-3 text-sm font-medium text-[var(--color-muted-foreground)]">No JV partners</p>
            <p className="text-xs text-[var(--color-muted-foreground)]">Add partners if this is a joint venture</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.jointVenturePartners.map((partner, index) => (
              <div key={partner.id} className="relative rounded-lg border border-[var(--color-border)] p-4 bg-[var(--color-surface)]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7 text-[var(--color-destructive)] hover:bg-[var(--color-destructive)]/10"
                  onClick={() => handleRemoveJVPartner(partner.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="mb-2 text-xs font-semibold text-pink-600">Partner #{index + 1}</div>
                <div className="grid gap-3 sm:grid-cols-3 pr-8">
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">Firm Name</Label>
                    <Input
                      value={partner.firmName}
                      onChange={(e) => {
                        const updated = data.jointVenturePartners.map((p) =>
                          p.id === partner.id ? { ...p, firmName: e.target.value } : p
                        );
                        updateSF255({ jointVenturePartners: updated });
                      }}
                      className="h-8 bg-white border-[var(--color-border)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">Address</Label>
                    <Input
                      value={partner.address}
                      onChange={(e) => {
                        const updated = data.jointVenturePartners.map((p) =>
                          p.id === partner.id ? { ...p, address: e.target.value } : p
                        );
                        updateSF255({ jointVenturePartners: updated });
                      }}
                      className="h-8 bg-white border-[var(--color-border)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">% Participation</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={partner.percentParticipation || ''}
                      onChange={(e) => {
                        const updated = data.jointVenturePartners.map((p) =>
                          p.id === partner.id ? { ...p, percentParticipation: parseInt(e.target.value) || 0 } : p
                        );
                        updateSF255({ jointVenturePartners: updated });
                      }}
                      className="h-8 bg-white border-[var(--color-border)]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* Outside Consultants */}
      <CollapsibleSection
        title="Outside Consultants"
        subtitle="Subconsultants for this project"
        icon={<Briefcase className="h-4 w-4" />}
        gradientFrom="from-indigo-50"
        gradientTo="to-blue-50"
        iconBg="bg-indigo-100"
        iconColor="text-indigo-600"
        isOpen={openSections.has('consultants')}
        onToggle={() => toggleSection('consultants')}
        badge={data.outsideConsultants.length > 0 ? `${data.outsideConsultants.length}` : undefined}
        headerAction={
          <Button size="sm" onClick={handleAddConsultant} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm h-7 text-xs">
            <Plus className="mr-1 h-3 w-3" />
            Add
          </Button>
        }
      >
        {data.outsideConsultants.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border)] py-8">
            <Briefcase className="h-10 w-10 text-[var(--color-muted-foreground)]/30" />
            <p className="mt-3 text-sm font-medium text-[var(--color-muted-foreground)]">No consultants added</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.outsideConsultants.map((consultant, index) => (
              <div key={consultant.id} className="relative rounded-lg border border-[var(--color-border)] p-4 bg-[var(--color-surface)]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7 text-[var(--color-destructive)] hover:bg-[var(--color-destructive)]/10"
                  onClick={() => handleRemoveConsultant(consultant.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="mb-2 text-xs font-semibold text-indigo-600">Consultant #{index + 1}</div>
                <div className="grid gap-3 sm:grid-cols-3 pr-8">
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">Firm Name</Label>
                    <Input
                      value={consultant.firmName}
                      onChange={(e) => {
                        const updated = data.outsideConsultants.map((c) =>
                          c.id === consultant.id ? { ...c, firmName: e.target.value } : c
                        );
                        updateSF255({ outsideConsultants: updated });
                      }}
                      className="h-8 bg-white border-[var(--color-border)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">Address</Label>
                    <Input
                      value={consultant.address}
                      onChange={(e) => {
                        const updated = data.outsideConsultants.map((c) =>
                          c.id === consultant.id ? { ...c, address: e.target.value } : c
                        );
                        updateSF255({ outsideConsultants: updated });
                      }}
                      className="h-8 bg-white border-[var(--color-border)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">Services</Label>
                    <Input
                      value={consultant.services}
                      onChange={(e) => {
                        const updated = data.outsideConsultants.map((c) =>
                          c.id === consultant.id ? { ...c, services: e.target.value } : c
                        );
                        updateSF255({ outsideConsultants: updated });
                      }}
                      placeholder="e.g., MEP Engineering"
                      className="h-8 bg-white border-[var(--color-border)]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* Project Team */}
      <CollapsibleSection
        title="Project Team"
        subtitle="Key personnel for this project"
        icon={<Users className="h-4 w-4" />}
        gradientFrom="from-emerald-50"
        gradientTo="to-teal-50"
        iconBg="bg-emerald-100"
        iconColor="text-emerald-600"
        isOpen={openSections.has('team')}
        onToggle={() => toggleSection('team')}
        badge={data.projectTeamResumes.length > 0 ? `${data.projectTeamResumes.length}` : undefined}
        headerAction={
          <Button size="sm" onClick={handleAddTeamMember} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm h-7 text-xs">
            <Plus className="mr-1 h-3 w-3" />
            Add
          </Button>
        }
      >
        {data.projectTeamResumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border)] py-8">
            <Users className="h-10 w-10 text-[var(--color-muted-foreground)]/30" />
            <p className="mt-3 text-sm font-medium text-[var(--color-muted-foreground)]">No team members added</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.projectTeamResumes.map((member, index) => (
              <div key={member.id} className="relative rounded-lg border border-[var(--color-border)] p-4 bg-[var(--color-surface)]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7 text-[var(--color-destructive)] hover:bg-[var(--color-destructive)]/10"
                  onClick={() => handleRemoveTeamMember(member.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="mb-2 text-xs font-semibold text-emerald-600">Team Member #{index + 1}</div>
                <div className="grid gap-3 sm:grid-cols-3 pr-8">
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">Name</Label>
                    <Input
                      value={member.name}
                      onChange={(e) => {
                        const updated = data.projectTeamResumes.map((m) =>
                          m.id === member.id ? { ...m, name: e.target.value } : m
                        );
                        updateSF255({ projectTeamResumes: updated });
                      }}
                      className="h-8 bg-white border-[var(--color-border)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">Title</Label>
                    <Input
                      value={member.title}
                      onChange={(e) => {
                        const updated = data.projectTeamResumes.map((m) =>
                          m.id === member.id ? { ...m, title: e.target.value } : m
                        );
                        updateSF255({ projectTeamResumes: updated });
                      }}
                      className="h-8 bg-white border-[var(--color-border)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">Project Role</Label>
                    <Input
                      value={member.projectRole}
                      onChange={(e) => {
                        const updated = data.projectTeamResumes.map((m) =>
                          m.id === member.id ? { ...m, projectRole: e.target.value } : m
                        );
                        updateSF255({ projectTeamResumes: updated });
                      }}
                      placeholder="e.g., Project Manager"
                      className="h-8 bg-white border-[var(--color-border)]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* Relevant Projects */}
      <CollapsibleSection
        title="Relevant Experience"
        subtitle="Similar projects completed"
        icon={<FolderKanban className="h-4 w-4" />}
        gradientFrom="from-cyan-50"
        gradientTo="to-blue-50"
        iconBg="bg-cyan-100"
        iconColor="text-cyan-600"
        isOpen={openSections.has('experience')}
        onToggle={() => toggleSection('experience')}
        badge={data.relevantProjects.length > 0 ? `${data.relevantProjects.length}` : undefined}
        headerAction={
          <Button size="sm" onClick={handleAddRelevantProject} className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm h-7 text-xs">
            <Plus className="mr-1 h-3 w-3" />
            Add
          </Button>
        }
      >
        {data.relevantProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border)] py-8">
            <FolderKanban className="h-10 w-10 text-[var(--color-muted-foreground)]/30" />
            <p className="mt-3 text-sm font-medium text-[var(--color-muted-foreground)]">No projects added</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.relevantProjects.map((project, index) => (
              <div key={project.id} className="relative rounded-lg border border-[var(--color-border)] p-4 bg-[var(--color-surface)]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7 text-[var(--color-destructive)] hover:bg-[var(--color-destructive)]/10"
                  onClick={() => handleRemoveRelevantProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="mb-2 text-xs font-semibold text-cyan-600">Project #{index + 1}</div>
                <div className="grid gap-3 sm:grid-cols-2 pr-8">
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">Project Name</Label>
                    <Input
                      value={project.projectName}
                      onChange={(e) => {
                        const updated = data.relevantProjects.map((p) =>
                          p.id === project.id ? { ...p, projectName: e.target.value } : p
                        );
                        updateSF255({ relevantProjects: updated });
                      }}
                      className="h-8 bg-white border-[var(--color-border)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">Owner</Label>
                    <Input
                      value={project.projectOwner}
                      onChange={(e) => {
                        const updated = data.relevantProjects.map((p) =>
                          p.id === project.id ? { ...p, projectOwner: e.target.value } : p
                        );
                        updateSF255({ relevantProjects: updated });
                      }}
                      className="h-8 bg-white border-[var(--color-border)]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* Authorization */}
      <CollapsibleSection
        title="Authorization"
        subtitle="Authorized representative signature"
        icon={<UserCheck className="h-4 w-4" />}
        gradientFrom="from-gray-50"
        gradientTo="to-slate-50"
        iconBg="bg-gray-100"
        iconColor="text-gray-600"
        isOpen={openSections.has('authorization')}
        onToggle={() => toggleSection('authorization')}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Name</Label>
            <Input
              value={data.authorizedRepName}
              onChange={(e) => handleChange('authorizedRepName', e.target.value)}
              placeholder="Full name"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Title</Label>
            <Input
              value={data.authorizedRepTitle}
              onChange={(e) => handleChange('authorizedRepTitle', e.target.value)}
              placeholder="e.g., President"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Date</Label>
            <Input
              type="date"
              value={data.authorizedRepDate}
              onChange={(e) => handleChange('authorizedRepDate', e.target.value)}
              className="bg-white border-[var(--color-border)]"
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}

