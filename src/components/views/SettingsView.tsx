import { useState } from 'react';
import {
  Settings,
  User,
  Building2,
  Bell,
  Shield,
  Palette,
  Database,
  HelpCircle,
  ChevronRight,
  Save,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

type SettingsSection = 'profile' | 'organization' | 'notifications' | 'security' | 'appearance' | 'data' | 'help';

const settingsSections = [
  { id: 'profile' as const, label: 'Profile', icon: User, description: 'Your personal information' },
  { id: 'organization' as const, label: 'Organization', icon: Building2, description: 'Company settings' },
  { id: 'notifications' as const, label: 'Notifications', icon: Bell, description: 'Email and push alerts' },
  { id: 'security' as const, label: 'Security', icon: Shield, description: 'Password and 2FA' },
  { id: 'appearance' as const, label: 'Appearance', icon: Palette, description: 'Theme and display' },
  { id: 'data' as const, label: 'Data & Storage', icon: Database, description: 'Manage your data' },
  { id: 'help' as const, label: 'Help & Support', icon: HelpCircle, description: 'Get assistance' },
];

export function SettingsView() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Profile Information</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white text-2xl font-bold">
                  JS
                </div>
                <div>
                  <Button variant="outline" size="sm" className="mb-1">
                    Change Photo
                  </Button>
                  <p className="text-xs text-[var(--color-muted-foreground)]">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">First Name</Label>
                  <Input defaultValue="John" className="bg-white border-[var(--color-border)]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Last Name</Label>
                  <Input defaultValue="Smith" className="bg-white border-[var(--color-border)]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Email</Label>
                  <Input type="email" defaultValue="john.smith@acmearchitects.com" className="bg-white border-[var(--color-border)]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Phone</Label>
                  <Input type="tel" defaultValue="(202) 555-0147" className="bg-white border-[var(--color-border)]" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm font-medium">Title</Label>
                  <Input defaultValue="Principal Architect" className="bg-white border-[var(--color-border)]" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'organization':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Organization Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm font-medium">Organization Name</Label>
                  <Input defaultValue="ACME Architects, LLC" className="bg-white border-[var(--color-border)]" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm font-medium">Address</Label>
                  <Input defaultValue="1234 Constitution Ave NW" className="bg-white border-[var(--color-border)]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">City</Label>
                  <Input defaultValue="Washington" className="bg-white border-[var(--color-border)]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">State</Label>
                    <Input defaultValue="DC" className="bg-white border-[var(--color-border)]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">ZIP</Label>
                    <Input defaultValue="20001" className="bg-white border-[var(--color-border)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">Email Notifications</p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">Receive email updates about your projects</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">Form Submission Alerts</p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">Get notified when forms are submitted</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">Deadline Reminders</p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">Reminders before submission deadlines</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">Team Updates</p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">Notifications about team changes</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Theme</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                <button
                  onClick={() => setTheme('light')}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-lg border p-4 transition-all',
                    theme === 'light'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                      : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/50'
                  )}
                >
                  <Sun className="h-6 w-6 text-amber-500" />
                  <span className="text-sm font-medium text-[var(--color-foreground)]">Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-lg border p-4 transition-all',
                    theme === 'dark'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                      : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/50'
                  )}
                >
                  <Moon className="h-6 w-6 text-indigo-500" />
                  <span className="text-sm font-medium text-[var(--color-foreground)]">Dark</span>
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-lg border p-4 transition-all',
                    theme === 'system'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                      : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/50'
                  )}
                >
                  <Monitor className="h-6 w-6 text-gray-500" />
                  <span className="text-sm font-medium text-[var(--color-foreground)]">System</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Data Management</h3>
              <div className="space-y-4">
                <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--color-foreground)]">Export Data</p>
                      <p className="text-sm text-[var(--color-muted-foreground)]">Download all your form data as JSON</p>
                    </div>
                    <Button variant="outline" size="sm">Export</Button>
                  </div>
                </div>
                <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--color-foreground)]">Clear Local Storage</p>
                      <p className="text-sm text-[var(--color-muted-foreground)]">Remove cached data from browser</p>
                    </div>
                    <Button variant="outline" size="sm">Clear</Button>
                  </div>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-red-700">Delete All Data</p>
                      <p className="text-sm text-red-600">Permanently delete all projects and forms</p>
                    </div>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <Settings className="h-12 w-12 text-[var(--color-muted-foreground)]/30" />
            <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">Settings content coming soon</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Settings Navigation */}
          <div className="lg:w-64 shrink-0">
            <nav className="space-y-1">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors',
                      activeSection === section.id
                        ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                        : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{section.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
              {renderSectionContent()}

              {/* Save Button */}
              {(activeSection === 'profile' || activeSection === 'organization') && (
                <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex justify-end">
                  <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

