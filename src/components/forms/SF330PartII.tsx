import { Building, Hash, Shield, MapPin, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDashboard } from '@/context/DashboardContext';
import { EmployeesByDiscipline } from './EmployeesByDiscipline';

export function SF330PartII() {
  const { state, updateSF330PartII } = useDashboard();
  const data = state.formData.sf330PartII;

  const handleInputChange = (field: string, value: string | number) => {
    updateSF330PartII({ [field]: value });
  };

  return (
    <div className="space-y-5 p-6">
      {/* Section 4 - Firm Information */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
            <Building className="h-4 w-4 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Section 4 - Firm Information</h3>
            <p className="text-xs text-[var(--color-muted-foreground)]">General organizational details</p>
          </div>
        </div>
        <div className="p-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Firm Name</Label>
            <Input
              value={data.firmName}
              onChange={(e) => handleInputChange('firmName', e.target.value)}
              placeholder="Enter firm name"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Year Established</Label>
            <Input
              value={data.yearEstablished}
              onChange={(e) => handleInputChange('yearEstablished', e.target.value)}
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
                value={data.dunsNumber}
                onChange={(e) => handleInputChange('dunsNumber', e.target.value)}
                placeholder="000000000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Tax ID Number</Label>
            <Input
              className="font-mono bg-white border-[var(--color-border)]"
              value={data.taxIdNumber}
              onChange={(e) => handleInputChange('taxIdNumber', e.target.value)}
              placeholder="00-0000000"
            />
          </div>
        </div>
      </div>

      {/* Section 5 - Ownership */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100">
            <Shield className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Section 5 - Ownership</h3>
            <p className="text-xs text-[var(--color-muted-foreground)]">Business type and status</p>
          </div>
        </div>
        <div className="p-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Ownership Type</Label>
            <Input
              value={data.ownershipType}
              onChange={(e) => handleInputChange('ownershipType', e.target.value)}
              placeholder="e.g., Corporation, LLC"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Small Business Status</Label>
            <Input
              value={data.smallBusinessStatus}
              onChange={(e) => handleInputChange('smallBusinessStatus', e.target.value)}
              placeholder="e.g., Small Business, 8(a)"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
        </div>
      </div>

      {/* Section 6 - Principal Office */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-cyan-50 to-blue-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100">
            <MapPin className="h-4 w-4 text-cyan-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Section 6 - Principal Office</h3>
            <p className="text-xs text-[var(--color-muted-foreground)]">Headquarters location</p>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Office Name</Label>
              <Input
                value={data.principalOfficeName}
                onChange={(e) => handleInputChange('principalOfficeName', e.target.value)}
                placeholder="Headquarters"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Address</Label>
              <Input
                value={data.principalOfficeAddress}
                onChange={(e) => handleInputChange('principalOfficeAddress', e.target.value)}
                placeholder="123 Main Street"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">City</Label>
              <Input
                value={data.principalOfficeCity}
                onChange={(e) => handleInputChange('principalOfficeCity', e.target.value)}
                placeholder="Washington"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">State</Label>
              <Input
                value={data.principalOfficeState}
                onChange={(e) => handleInputChange('principalOfficeState', e.target.value)}
                placeholder="DC"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">ZIP Code</Label>
              <Input
                value={data.principalOfficeZipCode}
                onChange={(e) => handleInputChange('principalOfficeZipCode', e.target.value)}
                placeholder="20001"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 8 - Total Personnel */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-violet-50 to-purple-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100">
            <Users className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Section 8 - Total Personnel</h3>
            <p className="text-xs text-[var(--color-muted-foreground)]">Summary employee counts</p>
          </div>
        </div>
        <div className="p-5">
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-5">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Total</Label>
              <Input
                type="number"
                min="0"
                value={data.totalEmployees || ''}
                onChange={(e) => handleInputChange('totalEmployees', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="text-center font-semibold bg-violet-50 border-violet-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Architects</Label>
              <Input
                type="number"
                min="0"
                value={data.totalArchitects || ''}
                onChange={(e) => handleInputChange('totalArchitects', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="text-center bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Engineers</Label>
              <Input
                type="number"
                min="0"
                value={data.totalEngineers || ''}
                onChange={(e) => handleInputChange('totalEngineers', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="text-center bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Other Prof.</Label>
              <Input
                type="number"
                min="0"
                value={data.totalOtherProfessionals || ''}
                onChange={(e) => handleInputChange('totalOtherProfessionals', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="text-center bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Admin</Label>
              <Input
                type="number"
                min="0"
                value={data.totalAdministrative || ''}
                onChange={(e) => handleInputChange('totalAdministrative', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="text-center bg-white border-[var(--color-border)]"
              />
            </div>
          </div>

          {/* Visual breakdown */}
          {data.totalEmployees > 0 && (
            <div className="mt-5 pt-4 border-t border-[var(--color-border)]">
              <div className="flex h-3 overflow-hidden rounded-full bg-[var(--color-muted)]">
                {data.totalArchitects > 0 && (
                  <div
                    className="bg-blue-500 transition-all"
                    style={{ width: `${(data.totalArchitects / data.totalEmployees) * 100}%` }}
                  />
                )}
                {data.totalEngineers > 0 && (
                  <div
                    className="bg-emerald-500 transition-all"
                    style={{ width: `${(data.totalEngineers / data.totalEmployees) * 100}%` }}
                  />
                )}
                {data.totalOtherProfessionals > 0 && (
                  <div
                    className="bg-amber-500 transition-all"
                    style={{ width: `${(data.totalOtherProfessionals / data.totalEmployees) * 100}%` }}
                  />
                )}
                {data.totalAdministrative > 0 && (
                  <div
                    className="bg-violet-500 transition-all"
                    style={{ width: `${(data.totalAdministrative / data.totalEmployees) * 100}%` }}
                  />
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-blue-500" /><span className="text-[var(--color-muted-foreground)]">Architects</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-emerald-500" /><span className="text-[var(--color-muted-foreground)]">Engineers</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-amber-500" /><span className="text-[var(--color-muted-foreground)]">Other</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-violet-500" /><span className="text-[var(--color-muted-foreground)]">Admin</span></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 9 - Employees by Discipline (Block 9) */}
      <EmployeesByDiscipline />
    </div>
  );
}
