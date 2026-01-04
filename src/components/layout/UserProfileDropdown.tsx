import { useState } from 'react';
import {
  User,
  Building,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronDown,
  Bell,
  Shield,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface UserProfileDropdownProps {
  className?: string;
}

// Mock user data - in real app, this would come from auth context
const mockUser = {
  name: 'John Smith',
  email: 'john.smith@acmearchitects.com',
  role: 'Admin',
  organization: 'ACME Architects, LLC',
  avatar: null as string | null,
};

export function UserProfileDropdown({ className }: UserProfileDropdownProps) {
  const [hasNotifications] = useState(true);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Notifications */}
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
      >
        <Bell className="h-4 w-4" />
        {hasNotifications && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        )}
      </Button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 h-9 px-2 hover:bg-[var(--color-muted)]"
          >
            {/* Avatar */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-semibold">
              {mockUser.avatar ? (
                <img src={mockUser.avatar} alt="" className="h-full w-full rounded-full object-cover" />
              ) : (
                getInitials(mockUser.name)
              )}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-[var(--color-foreground)] leading-none">{mockUser.name}</p>
              <p className="text-[10px] text-[var(--color-muted-foreground)] leading-tight mt-0.5">{mockUser.organization}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-[var(--color-muted-foreground)] hidden md:block" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-white shadow-lg border border-[var(--color-border)]" align="end">
          {/* User Info Header */}
          <div className="px-3 py-3 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white font-semibold">
                {getInitials(mockUser.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--color-foreground)] truncate">{mockUser.name}</p>
                <p className="text-xs text-[var(--color-muted-foreground)] truncate">{mockUser.email}</p>
                <span className="inline-flex items-center rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700 mt-1">
                  {mockUser.role}
                </span>
              </div>
            </div>
          </div>

          {/* Organization Section */}
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs text-[var(--color-muted-foreground)] font-normal px-3 py-2">
              Organization
            </DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer px-3 py-2 hover:bg-[var(--color-muted)]">
              <Building className="mr-3 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <span className="text-sm">{mockUser.organization}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer px-3 py-2 hover:bg-[var(--color-muted)]">
              <Users className="mr-3 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <span className="text-sm">Team Members</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Account Section */}
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs text-[var(--color-muted-foreground)] font-normal px-3 py-2">
              Account
            </DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer px-3 py-2 hover:bg-[var(--color-muted)]">
              <User className="mr-3 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <span className="text-sm">Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer px-3 py-2 hover:bg-[var(--color-muted)]">
              <Shield className="mr-3 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <span className="text-sm">Security</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer px-3 py-2 hover:bg-[var(--color-muted)]">
              <CreditCard className="mr-3 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <span className="text-sm">Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer px-3 py-2 hover:bg-[var(--color-muted)]">
              <Settings className="mr-3 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <span className="text-sm">Preferences</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Help & Logout */}
          <DropdownMenuItem className="cursor-pointer px-3 py-2 hover:bg-[var(--color-muted)]">
            <HelpCircle className="mr-3 h-4 w-4 text-[var(--color-muted-foreground)]" />
            <span className="text-sm">Help & Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-3 py-2 hover:bg-red-50 text-red-600">
            <LogOut className="mr-3 h-4 w-4" />
            <span className="text-sm font-medium">Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

