import { useState } from 'react';
import {
  Users,
  Search,
  Mail,
  Phone,
  Briefcase,
  Award,
  MoreVertical,
  UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock team data - in a real app, this would come from context/API
const mockTeamMembers = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    title: 'Principal Architect',
    email: 'sarah.mitchell@firm.com',
    phone: '(202) 555-0147',
    department: 'Architecture',
    yearsExperience: 18,
    certifications: ['LEED AP', 'AIA', 'NCARB'],
    avatar: null,
  },
  {
    id: '2',
    name: 'James Wellington',
    title: 'Senior Structural Engineer',
    email: 'james.wellington@firm.com',
    phone: '(202) 555-0148',
    department: 'Engineering',
    yearsExperience: 15,
    certifications: ['PE', 'SE'],
    avatar: null,
  },
  {
    id: '3',
    name: 'Maria Garcia',
    title: 'Project Manager',
    email: 'maria.garcia@firm.com',
    phone: '(202) 555-0149',
    department: 'Management',
    yearsExperience: 12,
    certifications: ['PMP', 'CCM'],
    avatar: null,
  },
  {
    id: '4',
    name: 'Robert Chen',
    title: 'Civil Engineer',
    email: 'robert.chen@firm.com',
    phone: '(202) 555-0150',
    department: 'Engineering',
    yearsExperience: 8,
    certifications: ['PE'],
    avatar: null,
  },
];

const departments = ['All', 'Architecture', 'Engineering', 'Management', 'Administrative'];

export function TeamView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const filteredMembers = mockTeamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartment === 'All' || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Architecture':
        return 'bg-violet-100 text-violet-700';
      case 'Engineering':
        return 'bg-blue-100 text-blue-700';
      case 'Management':
        return 'bg-emerald-100 text-emerald-700';
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
            <h1 className="text-xl font-bold text-[var(--color-foreground)]">Team Members</h1>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              {mockTeamMembers.length} employees
            </p>
          </div>
          <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
            <Input
              type="search"
              placeholder="Search by name or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-[var(--color-border)]"
            />
          </div>
          <div className="flex gap-2">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDepartment(dept)}
                className={
                  selectedDepartment === dept
                    ? 'bg-[var(--color-primary)]'
                    : 'border-[var(--color-border)]'
                }
              >
                {dept}
              </Button>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="group relative rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/50 transition-all"
            >
              {/* Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem className="cursor-pointer">Edit Profile</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">View Resume</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-600">Remove</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Avatar and Basic Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white font-semibold text-lg">
                  {getInitials(member.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--color-foreground)] truncate">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[var(--color-muted-foreground)] truncate">
                    {member.title}
                  </p>
                  <span
                    className={`inline-block mt-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${getDepartmentColor(
                      member.department
                    )}`}
                  >
                    {member.department}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-[var(--color-muted-foreground)]">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-muted-foreground)]">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{member.phone}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-[var(--color-muted-foreground)]">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>{member.yearsExperience} years exp.</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[var(--color-muted-foreground)]">
                  <Award className="h-3.5 w-3.5" />
                  <span>{member.certifications.length} certs</span>
                </div>
              </div>

              {/* Certifications */}
              {member.certifications.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {member.certifications.slice(0, 3).map((cert) => (
                    <span
                      key={cert}
                      className="rounded-full bg-[var(--color-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-foreground)]"
                    >
                      {cert}
                    </span>
                  ))}
                  {member.certifications.length > 3 && (
                    <span className="rounded-full bg-[var(--color-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-muted-foreground)]">
                      +{member.certifications.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-[var(--color-muted-foreground)]/30" />
            <p className="mt-4 text-sm font-medium text-[var(--color-muted-foreground)]">
              No team members found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

