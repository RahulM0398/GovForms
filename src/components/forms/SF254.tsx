import { useState } from 'react';
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Globe,
  DollarSign,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';
import type { ServiceCapability } from '@/types';

type SectionId = 'firm' | 'contact' | 'parent' | 'personnel' | 'services' | 'geographic' | 'revenue';

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
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">{title}</h3>
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

export function SF254() {
  const { state, updateSF254 } = useDashboard();
  const data = state.formData.sf254;

  const [openSections, setOpenSections] = useState<Set<SectionId>>(
    new Set(['firm', 'contact', 'personnel'])
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

  const handleChange = (field: string, value: string | number) => {
    updateSF254({ [field]: value });
  };

  const handleAddServiceCapability = () => {
    const newCapability: ServiceCapability = {
      id: crypto.randomUUID(),
      code: '',
      description: '',
      yearsExperience: 0,
    };
    updateSF254({
      serviceCapabilities: [...data.serviceCapabilities, newCapability],
    });
  };

  const handleRemoveServiceCapability = (id: string) => {
    updateSF254({
      serviceCapabilities: data.serviceCapabilities.filter((c) => c.id !== id),
    });
  };

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600">
          <Building2 className="h-4 w-4 text-white" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[var(--color-foreground)]">SF254 — Architect-Engineer Questionnaire</h2>
          <p className="text-xs text-[var(--color-muted-foreground)]">General firm qualifications</p>
        </div>
      </div>

      {/* Firm Information */}
      <CollapsibleSection
        title="Firm Information"
        subtitle="Basic company details"
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
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Street Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
                <Input
                  className="pl-9 bg-white border-[var(--color-border)]"
                  value={data.streetAddress}
                  onChange={(e) => handleChange('streetAddress', e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">City</Label>
              <Input
                value={data.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="Washington"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">State</Label>
              <Input
                value={data.state}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="DC"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">ZIP Code</Label>
              <Input
                value={data.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                placeholder="20001"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Year Established</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
                <Input
                  className="pl-9 bg-white border-[var(--color-border)]"
                  value={data.yearEstablished}
                  onChange={(e) => handleChange('yearEstablished', e.target.value)}
                  placeholder="1995"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Date Submitted</Label>
              <Input
                type="date"
                value={data.dateSubmitted}
                onChange={(e) => handleChange('dateSubmitted', e.target.value)}
                className="bg-white border-[var(--color-border)]"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Contact Information */}
      <CollapsibleSection
        title="Contact Information"
        subtitle="Point of contact details"
        icon={<User className="h-4 w-4" />}
        gradientFrom="from-violet-50"
        gradientTo="to-purple-50"
        iconBg="bg-violet-100"
        iconColor="text-violet-600"
        isOpen={openSections.has('contact')}
        onToggle={() => toggleSection('contact')}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Contact Name</Label>
            <Input
              value={data.contactName}
              onChange={(e) => handleChange('contactName', e.target.value)}
              placeholder="John Smith"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Title</Label>
            <Input
              value={data.contactTitle}
              onChange={(e) => handleChange('contactTitle', e.target.value)}
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
                value={data.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
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
                value={data.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                placeholder="contact@firm.com"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Parent Company */}
      <CollapsibleSection
        title="Parent Company"
        subtitle="If applicable"
        icon={<Building2 className="h-4 w-4" />}
        gradientFrom="from-amber-50"
        gradientTo="to-orange-50"
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
        isOpen={openSections.has('parent')}
        onToggle={() => toggleSection('parent')}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Parent Company Name</Label>
            <Input
              value={data.parentCompanyName}
              onChange={(e) => handleChange('parentCompanyName', e.target.value)}
              placeholder="Enter parent company name"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Parent Company Address</Label>
            <Input
              value={data.parentCompanyAddress}
              onChange={(e) => handleChange('parentCompanyAddress', e.target.value)}
              placeholder="Enter address"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Personnel */}
      <CollapsibleSection
        title="Personnel Summary"
        subtitle="Total employees and disciplines"
        icon={<Users className="h-4 w-4" />}
        gradientFrom="from-emerald-50"
        gradientTo="to-teal-50"
        iconBg="bg-emerald-100"
        iconColor="text-emerald-600"
        isOpen={openSections.has('personnel')}
        onToggle={() => toggleSection('personnel')}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Total Personnel</Label>
            <Input
              type="number"
              min="0"
              value={data.totalPersonnel || ''}
              onChange={(e) => handleChange('totalPersonnel', parseInt(e.target.value) || 0)}
              placeholder="0"
              className="bg-white border-[var(--color-border)] w-32"
            />
          </div>
          <p className="text-xs text-[var(--color-muted-foreground)]">
            Personnel by discipline can be managed in the Team section.
          </p>
        </div>
      </CollapsibleSection>

      {/* Service Capabilities */}
      <CollapsibleSection
        title="Service Capabilities"
        subtitle="Professional services offered"
        icon={<Briefcase className="h-4 w-4" />}
        gradientFrom="from-indigo-50"
        gradientTo="to-blue-50"
        iconBg="bg-indigo-100"
        iconColor="text-indigo-600"
        isOpen={openSections.has('services')}
        onToggle={() => toggleSection('services')}
        headerAction={
          <Button size="sm" onClick={handleAddServiceCapability} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm h-7 text-xs">
            <Plus className="mr-1 h-3 w-3" />
            Add
          </Button>
        }
      >
        {data.serviceCapabilities.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border)] py-8">
            <Briefcase className="h-10 w-10 text-[var(--color-muted-foreground)]/30" />
            <p className="mt-3 text-sm font-medium text-[var(--color-muted-foreground)]">No services added</p>
            <Button variant="ghost" size="sm" className="mt-2 text-indigo-600" onClick={handleAddServiceCapability}>
              <Plus className="mr-1 h-4 w-4" />
              Add first service
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {data.serviceCapabilities.map((capability, index) => (
              <div key={capability.id} className="relative rounded-lg border border-[var(--color-border)] p-4 bg-[var(--color-surface)]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7 text-[var(--color-destructive)] hover:bg-[var(--color-destructive)]/10"
                  onClick={() => handleRemoveServiceCapability(capability.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="mb-2 text-xs font-semibold text-indigo-600">
                  Service #{index + 1}
                </div>
                <div className="grid gap-3 sm:grid-cols-3 pr-8">
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">Code</Label>
                    <Input
                      value={capability.code}
                      onChange={(e) => {
                        const updated = data.serviceCapabilities.map((c) =>
                          c.id === capability.id ? { ...c, code: e.target.value } : c
                        );
                        updateSF254({ serviceCapabilities: updated });
                      }}
                      placeholder="e.g., 12"
                      className="h-8 bg-white border-[var(--color-border)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">Description</Label>
                    <Input
                      value={capability.description}
                      onChange={(e) => {
                        const updated = data.serviceCapabilities.map((c) =>
                          c.id === capability.id ? { ...c, description: e.target.value } : c
                        );
                        updateSF254({ serviceCapabilities: updated });
                      }}
                      placeholder="Architecture"
                      className="h-8 bg-white border-[var(--color-border)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[var(--color-muted-foreground)]">Years Exp.</Label>
                    <Input
                      type="number"
                      min="0"
                      value={capability.yearsExperience || ''}
                      onChange={(e) => {
                        const updated = data.serviceCapabilities.map((c) =>
                          c.id === capability.id ? { ...c, yearsExperience: parseInt(e.target.value) || 0 } : c
                        );
                        updateSF254({ serviceCapabilities: updated });
                      }}
                      placeholder="0"
                      className="h-8 bg-white border-[var(--color-border)]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* Geographic Experience */}
      <CollapsibleSection
        title="Geographic Experience"
        subtitle="Regions where firm has experience"
        icon={<Globe className="h-4 w-4" />}
        gradientFrom="from-cyan-50"
        gradientTo="to-blue-50"
        iconBg="bg-cyan-100"
        iconColor="text-cyan-600"
        isOpen={openSections.has('geographic')}
        onToggle={() => toggleSection('geographic')}
      >
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Geographic experience regions will be displayed here. Add states or regions where your firm has completed projects.
        </p>
      </CollapsibleSection>

      {/* Revenue Information */}
      <CollapsibleSection
        title="Revenue Information"
        subtitle="Annual average and work distribution"
        icon={<DollarSign className="h-4 w-4" />}
        gradientFrom="from-green-50"
        gradientTo="to-emerald-50"
        iconBg="bg-green-100"
        iconColor="text-green-600"
        isOpen={openSections.has('revenue')}
        onToggle={() => toggleSection('revenue')}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Annual Avg. Revenue ($)</Label>
            <Input
              type="number"
              min="0"
              value={data.annualAverageRevenue || ''}
              onChange={(e) => handleChange('annualAverageRevenue', parseInt(e.target.value) || 0)}
              placeholder="0"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Federal Work (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={data.federalWorkPercentage || ''}
              onChange={(e) => handleChange('federalWorkPercentage', parseInt(e.target.value) || 0)}
              placeholder="0"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Non-Federal Work (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={data.nonFederalWorkPercentage || ''}
              onChange={(e) => handleChange('nonFederalWorkPercentage', parseInt(e.target.value) || 0)}
              placeholder="0"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}

