import { useState } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Users,
  Building2,
  Settings,
  ChevronDown,
  ChevronRight,
  FileCheck,
  FileSpreadsheet,
  FileBadge,
  FileSignature,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboard } from '@/context/DashboardContext';
import type { FormType } from '@/types';

type NavSection = 'dashboard' | 'projects' | 'forms' | 'team' | 'firms' | 'settings';

interface NavItem {
  id: NavSection | FormType;
  label: string;
  icon: React.ReactNode;
  children?: { id: FormType; label: string; icon: React.ReactNode }[];
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: <FolderKanban className="h-4 w-4" />,
  },
  {
    id: 'forms',
    label: 'Forms',
    icon: <FileText className="h-4 w-4" />,
    children: [
      { id: 'SF330', label: 'SF330', icon: <FileCheck className="h-4 w-4" /> },
      { id: 'SF254', label: 'SF254', icon: <FileSpreadsheet className="h-4 w-4" /> },
      { id: 'SF255', label: 'SF255', icon: <FileBadge className="h-4 w-4" /> },
      { id: 'SF252', label: 'SF252', icon: <FileSignature className="h-4 w-4" /> },
    ],
  },
  {
    id: 'team',
    label: 'Team',
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: 'firms',
    label: 'Firms',
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="h-4 w-4" />,
  },
];

interface SidebarProps {
  activeSection: NavSection;
  onSectionChange: (section: NavSection) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { state, setActiveForm } = useDashboard();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['forms']));

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleFormSelect = (formId: FormType) => {
    setActiveForm(formId);
    onSectionChange('forms');
  };

  const isFormActive = (formId: string) => {
    return activeSection === 'forms' && state.activeForm === formId;
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-[var(--color-border)] bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-[var(--color-border)] px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 shadow-md">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-[var(--color-foreground)] tracking-tight">VForms</h1>
          <p className="text-[10px] text-[var(--color-muted-foreground)] font-medium -mt-0.5">Document Intelligence</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              {item.children ? (
                // Expandable item
                <div>
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      activeSection === item.id
                        ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                        : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </span>
                    {expandedItems.has(item.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedItems.has(item.id) && (
                    <ul className="mt-1 ml-4 space-y-0.5 border-l border-[var(--color-border)] pl-3">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <button
                            onClick={() => handleFormSelect(child.id)}
                            className={cn(
                              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                              isFormActive(child.id)
                                ? 'bg-[var(--color-primary)] text-white font-medium shadow-sm'
                                : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                            )}
                          >
                            {child.icon}
                            {child.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                // Regular item
                <button
                  onClick={() => onSectionChange(item.id as NavSection)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    activeSection === item.id
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                      : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-[var(--color-border)] p-3">
        <div className="rounded-lg bg-gradient-to-r from-violet-50 to-purple-50 p-3">
          <p className="text-xs font-medium text-[var(--color-foreground)]">Need Help?</p>
          <p className="text-[10px] text-[var(--color-muted-foreground)] mt-0.5">Check our documentation</p>
        </div>
      </div>
    </aside>
  );
}

