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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Mock firms data
const mockFirms = [
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredFirms = mockFirms.filter((firm) => {
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

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-foreground)]">Firms</h1>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              {mockFirms.length} registered firms
            </p>
          </div>
          <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
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
          <div className="flex gap-2">
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
                  <DropdownMenuItem className="cursor-pointer">Edit Firm</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">View Profile</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Set as Primary</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-600">Remove</DropdownMenuItem>
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
          </div>
        )}
      </div>
    </div>
  );
}

