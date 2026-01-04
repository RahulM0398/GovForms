import {
  FileSignature,
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  Hash,
  FileText,
  Pen,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDashboard } from '@/context/DashboardContext';

export function SF252() {
  const { state, updateSF252 } = useDashboard();
  const data = state.formData.sf252;

  const handleInputChange = (field: string, value: string | number) => {
    updateSF252({ [field]: value });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-5 p-6">
      {/* Header Banner */}
      <div className="rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-inner">
            <FileSignature className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">SF252 - Architect-Engineer Contract</h2>
            <p className="text-sm text-white/80 mt-0.5">
              Standard Form for A-E contract award and modifications
            </p>
          </div>
        </div>
      </div>

      {/* Contract Identification */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-slate-50 to-gray-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
            <Hash className="h-4 w-4 text-slate-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Contract Identification</h3>
            <p className="text-xs text-[var(--color-muted-foreground)]">Contract numbers and dates</p>
          </div>
        </div>
        <div className="p-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Contract Number *</Label>
            <Input
              value={data.contractNumber}
              onChange={(e) => handleInputChange('contractNumber', e.target.value)}
              placeholder="GS-00P-00-CYD-0009"
              className="font-mono bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Delivery Order No.</Label>
            <Input
              value={data.deliveryOrderNumber}
              onChange={(e) => handleInputChange('deliveryOrderNumber', e.target.value)}
              placeholder="DO-2024-0145"
              className="font-mono bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Amendment No.</Label>
            <Input
              value={data.amendmentNumber}
              onChange={(e) => handleInputChange('amendmentNumber', e.target.value)}
              placeholder="A001"
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Effective Date</Label>
            <Input
              type="date"
              value={data.effectiveDate}
              onChange={(e) => handleInputChange('effectiveDate', e.target.value)}
              className="bg-white border-[var(--color-border)]"
            />
          </div>
        </div>
      </div>

      {/* Contractor Information */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
            <Building2 className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Contractor Information</h3>
            <p className="text-xs text-[var(--color-muted-foreground)]">A-E firm details</p>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Contractor Name *</Label>
              <Input
                value={data.contractorName}
                onChange={(e) => handleInputChange('contractorName', e.target.value)}
                placeholder="Mitchell & Associates Architects, PLLC"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
                <Input
                  className="pl-9 bg-white border-[var(--color-border)]"
                  value={data.contractorAddress}
                  onChange={(e) => handleInputChange('contractorAddress', e.target.value)}
                  placeholder="1250 Connecticut Avenue NW, Suite 700"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">City</Label>
              <Input
                value={data.contractorCity}
                onChange={(e) => handleInputChange('contractorCity', e.target.value)}
                placeholder="Washington"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">State</Label>
                <Input
                  value={data.contractorState}
                  onChange={(e) => handleInputChange('contractorState', e.target.value)}
                  placeholder="DC"
                  className="bg-white border-[var(--color-border)]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">ZIP</Label>
                <Input
                  value={data.contractorZipCode}
                  onChange={(e) => handleInputChange('contractorZipCode', e.target.value)}
                  placeholder="20036"
                  className="bg-white border-[var(--color-border)]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
                <Input
                  className="pl-9 bg-white border-[var(--color-border)]"
                  value={data.contractorPhone}
                  onChange={(e) => handleInputChange('contractorPhone', e.target.value)}
                  placeholder="(202) 555-0100"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Tax ID (TIN)</Label>
              <Input
                className="font-mono bg-white border-[var(--color-border)]"
                value={data.contractorTIN}
                onChange={(e) => handleInputChange('contractorTIN', e.target.value)}
                placeholder="52-1234567"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contract Details - Amount */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-emerald-50 to-green-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Contract Details</h3>
            <p className="text-xs text-[var(--color-muted-foreground)]">Financial information and amounts</p>
          </div>
        </div>
        <div className="p-5 space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Contract Date</Label>
              <Input
                type="date"
                value={data.contractDate}
                onChange={(e) => handleInputChange('contractDate', e.target.value)}
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Contract Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
                <Input
                  type="number"
                  min="0"
                  step="1000"
                  className="pl-9 bg-white border-[var(--color-border)]"
                  value={data.contractAmount || ''}
                  onChange={(e) => handleInputChange('contractAmount', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Obligated Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
                <Input
                  type="number"
                  min="0"
                  step="1000"
                  className="pl-9 bg-white border-[var(--color-border)]"
                  value={data.obligatedAmount || ''}
                  onChange={(e) => handleInputChange('obligatedAmount', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Amount visualization */}
          {data.contractAmount > 0 && (
            <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 p-4 border border-emerald-100">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-emerald-700">Funding Status</span>
                <span className="font-bold text-emerald-700">
                  {((data.obligatedAmount / data.contractAmount) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all shadow-sm"
                  style={{ width: `${Math.min((data.obligatedAmount / data.contractAmount) * 100, 100)}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-emerald-600">
                <span>Obligated: {formatCurrency(data.obligatedAmount)}</span>
                <span>Total: {formatCurrency(data.contractAmount)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Period of Performance */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-amber-50 to-yellow-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100">
            <Calendar className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Period of Performance</h3>
            <p className="text-xs text-[var(--color-muted-foreground)]">Contract duration</p>
          </div>
        </div>
        <div className="p-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Start Date</Label>
            <Input
              type="date"
              value={data.periodOfPerformanceStart}
              onChange={(e) => handleInputChange('periodOfPerformanceStart', e.target.value)}
              className="bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">End Date</Label>
            <Input
              type="date"
              value={data.periodOfPerformanceEnd}
              onChange={(e) => handleInputChange('periodOfPerformanceEnd', e.target.value)}
              className="bg-white border-[var(--color-border)]"
            />
          </div>
        </div>
      </div>

      {/* Services Description */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-violet-50 to-purple-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100">
            <FileText className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Services & Accounting</h3>
            <p className="text-xs text-[var(--color-muted-foreground)]">Scope description and accounting data</p>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Description of Services</Label>
            <textarea
              className="flex min-h-[100px] w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              value={data.servicesDescription}
              onChange={(e) => handleInputChange('servicesDescription', e.target.value)}
              placeholder="Describe the architectural and engineering services..."
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Accounting Data</Label>
            <Input
              className="font-mono bg-white border-[var(--color-border)]"
              value={data.accountingData}
              onChange={(e) => handleInputChange('accountingData', e.target.value)}
              placeholder="Accounting classification reference"
            />
          </div>
        </div>
      </div>

      {/* Signatures */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)] bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100">
            <Pen className="h-4 w-4 text-rose-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Signatures</h3>
            <p className="text-xs text-[var(--color-muted-foreground)]">Authorization and execution</p>
          </div>
        </div>
        <div className="p-5">
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Contractor Signature */}
            <div className="rounded-xl border border-[var(--color-border)] p-4 bg-[var(--color-surface)]">
              <h4 className="mb-4 text-sm font-semibold text-[var(--color-foreground)]">Contractor</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Name</Label>
                  <Input
                    value={data.contractorSignatureName}
                    onChange={(e) => handleInputChange('contractorSignatureName', e.target.value)}
                    placeholder="Full name"
                    className="bg-white border-[var(--color-border)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Title</Label>
                  <Input
                    value={data.contractorSignatureTitle}
                    onChange={(e) => handleInputChange('contractorSignatureTitle', e.target.value)}
                    placeholder="President, CEO, etc."
                    className="bg-white border-[var(--color-border)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Date</Label>
                  <Input
                    type="date"
                    value={data.contractorSignatureDate}
                    onChange={(e) => handleInputChange('contractorSignatureDate', e.target.value)}
                    className="bg-white border-[var(--color-border)]"
                  />
                </div>
              </div>
            </div>

            {/* Contracting Officer Signature */}
            <div className="rounded-xl border border-[var(--color-border)] p-4 bg-[var(--color-surface)]">
              <h4 className="mb-4 text-sm font-semibold text-[var(--color-foreground)]">Contracting Officer</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Name</Label>
                  <Input
                    value={data.contractingOfficerName}
                    onChange={(e) => handleInputChange('contractingOfficerName', e.target.value)}
                    placeholder="Full name"
                    className="bg-white border-[var(--color-border)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Title</Label>
                  <Input
                    value={data.contractingOfficerTitle}
                    onChange={(e) => handleInputChange('contractingOfficerTitle', e.target.value)}
                    placeholder="Contracting Officer"
                    className="bg-white border-[var(--color-border)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">Date</Label>
                  <Input
                    type="date"
                    value={data.contractingOfficerDate}
                    onChange={(e) => handleInputChange('contractingOfficerDate', e.target.value)}
                    className="bg-white border-[var(--color-border)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
