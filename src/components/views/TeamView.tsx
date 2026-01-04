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
  X,
  Trash2,
  Edit,
  FileText,
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

interface TeamMember {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  department: string;
  yearsExperience: number;
  certifications: string[];
  avatar: string | null;
}

// Initial team data
const initialTeamMembers: TeamMember[] = [
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
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: '',
    title: '',
    email: '',
    phone: '',
    department: 'Architecture',
    yearsExperience: 0,
    certifications: [],
  });

  const filteredMembers = teamMembers.filter((member) => {
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

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const member: TeamMember = {
        id: crypto.randomUUID(),
        name: newMember.name || '',
        title: newMember.title || '',
        email: newMember.email || '',
        phone: newMember.phone || '',
        department: newMember.department || 'Architecture',
        yearsExperience: newMember.yearsExperience || 0,
        certifications: newMember.certifications || [],
        avatar: null,
      };
      setTeamMembers([...teamMembers, member]);
      setNewMember({
        name: '',
        title: '',
        email: '',
        phone: '',
        department: 'Architecture',
        yearsExperience: 0,
        certifications: [],
      });
      setShowAddModal(false);
    }
  };

  const handleUpdateMember = () => {
    if (editingMember) {
      setTeamMembers(teamMembers.map((m) => 
        m.id === editingMember.id ? editingMember : m
      ));
      setEditingMember(null);
    }
  };

  const handleRemoveMember = (id: string) => {
    setTeamMembers(teamMembers.filter((m) => m.id !== id));
  };

  const handleViewResume = (member: TeamMember) => {
    alert(`Viewing resume for ${member.name}\n\nTitle: ${member.title}\nDepartment: ${member.department}\nExperience: ${member.yearsExperience} years\nCertifications: ${member.certifications.join(', ')}`);
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-foreground)]">Team Members</h1>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              {teamMembers.length} employees
            </p>
          </div>
          <Button 
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90"
            onClick={() => setShowAddModal(true)}
          >
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
          <div className="flex gap-2 flex-wrap">
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

        {/* Add/Edit Modal */}
        {(showAddModal || editingMember) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
                  {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingMember(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Name *</Label>
                    <Input
                      value={editingMember?.name || newMember.name || ''}
                      onChange={(e) => editingMember 
                        ? setEditingMember({...editingMember, name: e.target.value})
                        : setNewMember({...newMember, name: e.target.value})
                      }
                      placeholder="Full name"
                      className="bg-white border-[var(--color-border)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Title</Label>
                    <Input
                      value={editingMember?.title || newMember.title || ''}
                      onChange={(e) => editingMember 
                        ? setEditingMember({...editingMember, title: e.target.value})
                        : setNewMember({...newMember, title: e.target.value})
                      }
                      placeholder="Job title"
                      className="bg-white border-[var(--color-border)]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Email *</Label>
                    <Input
                      type="email"
                      value={editingMember?.email || newMember.email || ''}
                      onChange={(e) => editingMember 
                        ? setEditingMember({...editingMember, email: e.target.value})
                        : setNewMember({...newMember, email: e.target.value})
                      }
                      placeholder="email@example.com"
                      className="bg-white border-[var(--color-border)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Phone</Label>
                    <Input
                      type="tel"
                      value={editingMember?.phone || newMember.phone || ''}
                      onChange={(e) => editingMember 
                        ? setEditingMember({...editingMember, phone: e.target.value})
                        : setNewMember({...newMember, phone: e.target.value})
                      }
                      placeholder="(555) 555-5555"
                      className="bg-white border-[var(--color-border)]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Department</Label>
                    <select
                      value={editingMember?.department || newMember.department || 'Architecture'}
                      onChange={(e) => editingMember 
                        ? setEditingMember({...editingMember, department: e.target.value})
                        : setNewMember({...newMember, department: e.target.value})
                      }
                      className="w-full h-9 rounded-md border border-[var(--color-border)] bg-white px-3 text-sm"
                    >
                      {departments.filter(d => d !== 'All').map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Years Experience</Label>
                    <Input
                      type="number"
                      min="0"
                      value={editingMember?.yearsExperience || newMember.yearsExperience || 0}
                      onChange={(e) => editingMember 
                        ? setEditingMember({...editingMember, yearsExperience: parseInt(e.target.value) || 0})
                        : setNewMember({...newMember, yearsExperience: parseInt(e.target.value) || 0})
                      }
                      className="bg-white border-[var(--color-border)]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingMember(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-[var(--color-primary)]"
                  onClick={editingMember ? handleUpdateMember : handleAddMember}
                >
                  {editingMember ? 'Save Changes' : 'Add Member'}
                </Button>
              </div>
            </div>
          </div>
        )}

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
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => setEditingMember(member)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => handleViewResume(member)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Resume
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-600"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </DropdownMenuItem>
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
            <Button 
              variant="ghost" 
              className="mt-2 text-[var(--color-primary)]"
              onClick={() => setShowAddModal(true)}
            >
              <UserPlus className="mr-1 h-4 w-4" />
              Add your first team member
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
