import { useState } from 'react';
import {
  Building2,
  Plus,
  Search,
  MapPin,
  Users,
  Calendar,
  Globe,
  MoreVertical,
  Star,
  X,
  Trash2,
  Edit,
  Eye,
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
import { cn } from '@/lib/utils';

interface Firm {
  id: string;
  name: string;
  type: 'Prime' | 'Subconsultant' | 'JV Partner';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  employeeCount: number;
  yearEstablished: string;
  website: string;
  specialties: string[];
  isPrimary: boolean;
}

// Initial firms data
const initialFirms: Firm[] = [
  {
    id: '1',
    name: 'ACME Architects, LLC',
    type: 'Prime',
    address: '1234 Constitution Ave NW',
    city: 'Washington',
    state: 'DC',
    zipCode: '20001',
    employeeCount: 45,
    yearEstablished: '1985',
    website: 'www.acmearchitects.com',
    specialties: ['Commercial', 'Federal', 'Healthcare'],
    isPrimary: true,
  },
  {
    id: '2',
    name: 'Sterling Engineering Group',
    type: 'Subconsultant',
    address: '567 Market Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    employeeCount: 120,
    yearEstablished: '1972',
    website: 'www.sterlingeng.com',
    specialties: ['Structural', 'Civil', 'Environmental'],
    isPrimary: false,
  },
  {
    id: '3',
    name: 'Nova MEP Solutions',
    type: 'Subconsultant',
    address: '890 Tech Parkway',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    employeeCount: 35,
    yearEstablished: '2005',
    website: 'www.novamep.com',
    specialties: ['Mechanical', 'Electrical', 'Plumbing'],
    isPrimary: false,
  },
];

const firmTypes = ['All', 'Prime', 'Subconsultant', 'JV Partner'];

export function FirmsView() {
  const [firms, setFirms] = useState<Firm[]>(initialFirms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFirm, setEditingFirm] = useState<Firm | null>(null);
  const [viewingFirm, setViewingFirm] = useState<Firm | null>(null);
  const [newFirm, setNewFirm] = useState<Partial<Firm>>({
    name: '',
    type: 'Subconsultant',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    employeeCount: 0,
    yearEstablished: '',
    website: '',
    specialties: [],
    isPrimary: false,
  });
  const [newSpecialty, setNewSpecialty] = useState('');

  const filteredFirms = firms.filter((firm) => {
    const matchesSearch =
      firm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      firm.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || firm.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Prime':
        return 'bg-violet-100 text-violet-700';
      case 'Subconsultant':
        return 'bg-blue-100 text-blue-700';
      case 'JV Partner':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddFirm = () => {
    if (newFirm.name) {
      const firm: Firm = {
        id: crypto.randomUUID(),
        name: newFirm.name || '',
        type: newFirm.type as 'Prime' | 'Subconsultant' | 'JV Partner' || 'Subconsultant',
        address: newFirm.address || '',
        city: newFirm.city || '',
        state: newFirm.state || '',
        zipCode: newFirm.zipCode || '',
        employeeCount: newFirm.employeeCount || 0,
        yearEstablished: newFirm.yearEstablished || '',
        website: newFirm.website || '',
        specialties: newFirm.specialties || [],
        isPrimary: false,
      };
      setFirms([...firms, firm]);
      setNewFirm({
        name: '',
        type: 'Subconsultant',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        employeeCount: 0,
        yearEstablished: '',
        website: '',
        specialties: [],
        isPrimary: false,
      });
      setShowAddModal(false);
    }
  };

  const handleUpdateFirm = () => {
    if (editingFirm) {
      setFirms(firms.map((f) => f.id === editingFirm.id ? editingFirm : f));
      setEditingFirm(null);
    }
  };

  const handleRemoveFirm = (id: string) => {
    const firm = firms.find(f => f.id === id);
    if (firm?.isPrimary) {
      alert('Cannot remove the primary firm. Set another firm as primary first.');
      return;
    }
    setFirms(firms.filter((f) => f.id !== id));
  };

  const handleSetPrimary = (id: string) => {
    setFirms(firms.map((f) => ({
      ...f,
      isPrimary: f.id === id,
      type: f.id === id ? 'Prime' : (f.type === 'Prime' && f.id !== id ? 'Subconsultant' : f.type),
    })));
  };

  const handleAddSpecialty = (isEditing: boolean) => {
    if (newSpecialty.trim()) {
      if (isEditing && editingFirm) {
        setEditingFirm({
          ...editingFirm,
          specialties: [...editingFirm.specialties, newSpecialty.trim()],
        });
      } else {
        setNewFirm({
          ...newFirm,
          specialties: [...(newFirm.specialties || []), newSpecialty.trim()],
        });
      }
      setNewSpecialty('');
    }
  };

  const handleRemoveSpecialty = (specialty: string, isEditing: boolean) => {
    if (isEditing && editingFirm) {
      setEditingFirm({
        ...editingFirm,
        specialties: editingFirm.specialties.filter((s) => s !== specialty),
      });
    } else {
      setNewFirm({
        ...newFirm,
        specialties: (newFirm.specialties || []).filter((s) => s !== specialty),
      });
    }
  };

  const renderModal = (isEditing: boolean) => {
    const currentFirm = isEditing ? editingFirm : newFirm;
    const setCurrentFirm = isEditing 
      ? (data: Partial<Firm>) => setEditingFirm({...editingFirm!, ...data})
      : (data: Partial<Firm>) => setNewFirm({...newFirm, ...data});

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
              {isEditing ? 'Edit Firm' : 'Add New Firm'}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowAddModal(false);
                setEditingFirm(null);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Firm Name *</Label>
              <Input
                value={currentFirm?.name || ''}
                onChange={(e) => setCurrentFirm({name: e.target.value})}
                placeholder="Enter firm name"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Type</Label>
                <select
                  value={currentFirm?.type || 'Subconsultant'}
                  onChange={(e) => setCurrentFirm({type: e.target.value as Firm['type']})}
                  className="w-full h-9 rounded-md border border-[var(--color-border)] bg-white px-3 text-sm"
                >
                  <option value="Prime">Prime</option>
                  <option value="Subconsultant">Subconsultant</option>
                  <option value="JV Partner">JV Partner</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Year Established</Label>
                <Input
                  value={currentFirm?.yearEstablished || ''}
                  onChange={(e) => setCurrentFirm({yearEstablished: e.target.value})}
                  placeholder="e.g., 1985"
                  className="bg-white border-[var(--color-border)]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Address</Label>
              <Input
                value={currentFirm?.address || ''}
                onChange={(e) => setCurrentFirm({address: e.target.value})}
                placeholder="Street address"
                className="bg-white border-[var(--color-border)]"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">City</Label>
                <Input
                  value={currentFirm?.city || ''}
                  onChange={(e) => setCurrentFirm({city: e.target.value})}
                  placeholder="City"
                  className="bg-white border-[var(--color-border)]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">State</Label>
                <Input
                  value={currentFirm?.state || ''}
                  onChange={(e) => setCurrentFirm({state: e.target.value})}
                  placeholder="ST"
                  className="bg-white border-[var(--color-border)]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">ZIP</Label>
                <Input
                  value={currentFirm?.zipCode || ''}
                  onChange={(e) => setCurrentFirm({zipCode: e.target.value})}
                  placeholder="00000"
                  className="bg-white border-[var(--color-border)]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Employee Count</Label>
                <Input
                  type="number"
                  min="0"
                  value={currentFirm?.employeeCount || 0}
                  onChange={(e) => setCurrentFirm({employeeCount: parseInt(e.target.value) || 0})}
                  className="bg-white border-[var(--color-border)]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Website</Label>
                <Input
                  value={currentFirm?.website || ''}
                  onChange={(e) => setCurrentFirm({website: e.target.value})}
                  placeholder="www.example.com"
                  className="bg-white border-[var(--color-border)]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Specialties</Label>
              <div className="flex gap-2">
                <Input
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="Add specialty"
                  className="bg-white border-[var(--color-border)]"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialty(isEditing))}
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => handleAddSpecialty(isEditing)}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {(currentFirm?.specialties || []).map((specialty) => (
                  <span
                    key={specialty}
                    className="inline-flex items-center gap-1 rounded-full bg-[var(--color-muted)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-foreground)]"
                  >
                    {specialty}
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecialty(specialty, isEditing)}
                      className="hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowAddModal(false);
                setEditingFirm(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              className="bg-[var(--color-primary)]"
              onClick={isEditing ? handleUpdateFirm : handleAddFirm}
            >
              {isEditing ? 'Save Changes' : 'Add Firm'}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-foreground)]">Firms</h1>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              {firms.length} registered firms
            </p>
          </div>
          <Button 
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Firm
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
            <Input
              type="search"
              placeholder="Search firms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {firmTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(type)}
                className={
                  selectedType === type
                    ? 'bg-[var(--color-primary)]'
                    : 'border-[var(--color-border)]'
                }
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Add/Edit Modal */}
        {(showAddModal || editingFirm) && renderModal(!!editingFirm)}

        {/* View Profile Modal */}
        {viewingFirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Firm Profile</h2>
                <Button variant="ghost" size="icon" onClick={() => setViewingFirm(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{viewingFirm.name}</h3>
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getTypeColor(viewingFirm.type)}`}>
                    {viewingFirm.type}
                  </span>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-[var(--color-muted-foreground)]">
                  <MapPin className="h-4 w-4" />
                  <span>{viewingFirm.address}, {viewingFirm.city}, {viewingFirm.state} {viewingFirm.zipCode}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-muted-foreground)]">
                  <Users className="h-4 w-4" />
                  <span>{viewingFirm.employeeCount} employees</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-muted-foreground)]">
                  <Calendar className="h-4 w-4" />
                  <span>Established {viewingFirm.yearEstablished}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-muted-foreground)]">
                  <Globe className="h-4 w-4" />
                  <span>{viewingFirm.website}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                <p className="text-sm font-medium text-[var(--color-foreground)] mb-2">Specialties</p>
                <div className="flex flex-wrap gap-1">
                  {viewingFirm.specialties.map((s) => (
                    <span key={s} className="rounded-full bg-[var(--color-muted)] px-2.5 py-0.5 text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button variant="outline" onClick={() => setViewingFirm(null)}>Close</Button>
              </div>
            </div>
          </div>
        )}

        {/* Firms List */}
        <div className="space-y-4">
          {filteredFirms.map((firm) => (
            <div
              key={firm.id}
              className={cn(
                'group relative rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition-all',
                firm.isPrimary
                  ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/20'
                  : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
              )}
            >
              {/* Primary Badge */}
              {firm.isPrimary && (
                <div className="absolute -top-2 left-4 flex items-center gap-1 rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
                  <Star className="h-3 w-3" />
                  Primary Firm
                </div>
              )}

              {/* Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-3 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => setEditingFirm(firm)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Firm
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => setViewingFirm(firm)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Profile
                  </DropdownMenuItem>
                  {!firm.isPrimary && (
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => handleSetPrimary(firm.id)}
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Set as Primary
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-600"
                    onClick={() => handleRemoveFirm(firm.id)}
                    disabled={firm.isPrimary}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-start gap-5">
                {/* Firm Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 shrink-0">
                  <Building2 className="h-7 w-7 text-blue-600" />
                </div>

                {/* Firm Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-[var(--color-foreground)]">{firm.name}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getTypeColor(
                        firm.type
                      )}`}
                    >
                      {firm.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted-foreground)]">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {firm.city}, {firm.state} {firm.zipCode}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {firm.employeeCount} employees
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Est. {firm.yearEstablished}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="h-3.5 w-3.5" />
                      {firm.website}
                    </span>
                  </div>

                  {/* Specialties */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {firm.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full bg-[var(--color-muted)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-foreground)]"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFirms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-[var(--color-muted-foreground)]/30" />
            <p className="mt-4 text-sm font-medium text-[var(--color-muted-foreground)]">
              No firms found
            </p>
            <Button 
              variant="ghost" 
              className="mt-2 text-[var(--color-primary)]"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="mr-1 h-4 w-4" />
              Add your first firm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
