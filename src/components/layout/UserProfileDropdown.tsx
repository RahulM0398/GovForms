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
import { useNavigation } from '@/context/NavigationContext';

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
  const [hasNotifications, setHasNotifications] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const { navigateToTeam, setActiveSettingsSection, setActiveSection } = useNavigation();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleOrganizationClick = () => {
    setActiveSettingsSection('organization');
    setActiveSection('settings');
  };

  const handleTeamMembersClick = () => {
    navigateToTeam();
  };

  const handleProfileSettingsClick = () => {
    setActiveSettingsSection('profile');
    setActiveSection('settings');
  };

  const handleSecurityClick = () => {
    setActiveSettingsSection('security');
    setActiveSection('settings');
  };

  const handleBillingClick = () => {
    // Could navigate to a billing page in the future
    alert('Billing management coming soon!');
  };

  const handlePreferencesClick = () => {
    setActiveSettingsSection('appearance');
    setActiveSection('settings');
  };

  const handleHelpClick = () => {
    setActiveSettingsSection('help');
    setActiveSection('settings');
  };

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      // Clear session/auth data and redirect
      alert('Sign out functionality would be implemented with authentication.');
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (hasNotifications) {
      setHasNotifications(false);
    }
  };

  // Mock notifications
  const notifications = [
    { id: 1, title: 'SF330 form submitted', time: '2 min ago', read: false },
    { id: 2, title: 'New team member added', time: '1 hour ago', read: false },
    { id: 3, title: 'Project deadline reminder', time: '3 hours ago', read: true },
  ];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Notifications */}
      <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
            onClick={handleNotificationClick}
          >
            <Bell className="h-4 w-4" />
            {hasNotifications && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 bg-white shadow-lg border border-[var(--color-border)]" align="end">
          <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--color-border)]">
            <span className="font-semibold text-sm text-[var(--color-foreground)]">Notifications</span>
            <button 
              className="text-xs text-[var(--color-primary)] hover:underline"
              onClick={() => {
                setHasNotifications(false);
                setShowNotifications(false);
              }}
            >
              Mark all read
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={cn(
                  'px-3 py-2 hover:bg-[var(--color-muted)] cursor-pointer border-b border-[var(--color-border)] last:border-b-0',
                  !notification.read && 'bg-[var(--color-primary)]/5'
                )}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm text-[var(--color-foreground)]">{notification.title}</p>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-[var(--color-primary)] mt-1.5" />
                  )}
                </div>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">{notification.time}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--color-border)] px-3 py-2">
            <button 
              className="text-xs text-[var(--color-primary)] hover:underline w-full text-center"
              onClick={() => {
                setActiveSettingsSection('notifications');
                setActiveSection('settings');
                setShowNotifications(false);
              }}
            >
              View all notifications
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

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
            <DropdownMenuItem 
              className="cursor-pointer px-3 py-2 hover:bg-[var(--color-muted)]"
              onClick={handleOrganizationClick}
            >
              <Building className="mr-3 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <span className="text-sm">{mockUser.organization}</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer px-3 py-2 hover:bg-[var(--color-muted)]"
              onClick={handleTeamMembersClick}
            >
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
            <DropdownMenuItem 
              className="cursor-pointer px-3 py-2 hover:bg-[var(--color-muted)]"
              onClick={handleProfileSettingsClick}
            >
              <User className="mr-3 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <span className="text-sm">Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer px-3 py-2 hover:bg-[var(--color-muted)]"
              onClick={handleSecurityClick}
            >
              <Shield className="mr-3 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <span className="text-sm">Security</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer px-3 py-2 hover:bg-[var(--color-muted)]"
              onClick={handleBillingClick}
            >
              <CreditCard className="mr-3 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <span className="text-sm">Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer px-3 py-2 hover:bg-[var(--color-muted)]"
              onClick={handlePreferencesClick}
            >
              <Settings className="mr-3 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <span className="text-sm">Preferences</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Help & Logout */}
          <DropdownMenuItem 
            className="cursor-pointer px-3 py-2 hover:bg-[var(--color-muted)]"
            onClick={handleHelpClick}
          >
            <HelpCircle className="mr-3 h-4 w-4 text-[var(--color-muted-foreground)]" />
            <span className="text-sm">Help & Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer px-3 py-2 hover:bg-red-50 text-red-600"
            onClick={handleSignOut}
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="text-sm font-medium">Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
