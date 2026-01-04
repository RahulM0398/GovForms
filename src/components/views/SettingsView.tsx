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
  Download,
  Trash2,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useNavigation } from '@/context/NavigationContext';

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
  const { activeSettingsSection, setActiveSettingsSection } = useNavigation();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Profile state
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@acmearchitects.com',
    phone: '(202) 555-0147',
    title: 'Principal Architect',
  });

  // Organization state
  const [organization, setOrganization] = useState({
    name: 'ACME Architects, LLC',
    address: '1234 Constitution Ave NW',
    city: 'Washington',
    state: 'DC',
    zipCode: '20001',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    formSubmissionAlerts: true,
    deadlineReminders: true,
    teamUpdates: false,
  });

  const handleSave = () => {
    // Simulate save
    setShowSavedMessage(true);
    setTimeout(() => setShowSavedMessage(false), 2000);
  };

  const handleExportData = () => {
    // Get data from localStorage
    const data = localStorage.getItem('vsuite_dashboard_state');
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vforms-data-export.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      alert('No data to export');
    }
  };

  const handleClearLocalStorage = () => {
    if (confirm('Are you sure you want to clear cached data? This will refresh the page.')) {
      localStorage.removeItem('vsuite_dashboard_state');
      window.location.reload();
    }
  };

  const handleDeleteAllData = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAllData = () => {
    localStorage.clear();
    setShowDeleteConfirm(false);
    window.location.reload();
  };

  const renderSectionContent = () => {
    switch (activeSettingsSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Profile Information</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white text-2xl font-bold">
                  {profile.firstName[0]}{profile.lastName[0]}
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
                  <Input 
                    value={profile.firstName}
                    onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                    className="bg-white border-[var(--color-border)]" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Last Name</Label>
                  <Input 
                    value={profile.lastName}
                    onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                    className="bg-white border-[var(--color-border)]" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Email</Label>
                  <Input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="bg-white border-[var(--color-border)]" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Phone</Label>
                  <Input 
                    type="tel" 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="bg-white border-[var(--color-border)]" 
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm font-medium">Title</Label>
                  <Input 
                    value={profile.title}
                    onChange={(e) => setProfile({...profile, title: e.target.value})}
                    className="bg-white border-[var(--color-border)]" 
                  />
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
                  <Input 
                    value={organization.name}
                    onChange={(e) => setOrganization({...organization, name: e.target.value})}
                    className="bg-white border-[var(--color-border)]" 
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm font-medium">Address</Label>
                  <Input 
                    value={organization.address}
                    onChange={(e) => setOrganization({...organization, address: e.target.value})}
                    className="bg-white border-[var(--color-border)]" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">City</Label>
                  <Input 
                    value={organization.city}
                    onChange={(e) => setOrganization({...organization, city: e.target.value})}
                    className="bg-white border-[var(--color-border)]" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">State</Label>
                    <Input 
                      value={organization.state}
                      onChange={(e) => setOrganization({...organization, state: e.target.value})}
                      className="bg-white border-[var(--color-border)]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">ZIP</Label>
                    <Input 
                      value={organization.zipCode}
                      onChange={(e) => setOrganization({...organization, zipCode: e.target.value})}
                      className="bg-white border-[var(--color-border)]" 
                    />
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
                  <Switch 
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">Form Submission Alerts</p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">Get notified when forms are submitted</p>
                  </div>
                  <Switch 
                    checked={notifications.formSubmissionAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, formSubmissionAlerts: checked})}
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">Deadline Reminders</p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">Reminders before submission deadlines</p>
                  </div>
                  <Switch 
                    checked={notifications.deadlineReminders}
                    onCheckedChange={(checked) => setNotifications({...notifications, deadlineReminders: checked})}
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">Team Updates</p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">Notifications about team changes</p>
                  </div>
                  <Switch 
                    checked={notifications.teamUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, teamUpdates: checked})}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--color-foreground)]">Change Password</p>
                      <p className="text-sm text-[var(--color-muted-foreground)]">Update your account password</p>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                </div>
                <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--color-foreground)]">Two-Factor Authentication</p>
                      <p className="text-sm text-[var(--color-muted-foreground)]">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </div>
                <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--color-foreground)]">Active Sessions</p>
                      <p className="text-sm text-[var(--color-muted-foreground)]">Manage your active login sessions</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
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
                  {theme === 'light' && <Check className="h-4 w-4 text-[var(--color-primary)]" />}
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
                  {theme === 'dark' && <Check className="h-4 w-4 text-[var(--color-primary)]" />}
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
                  {theme === 'system' && <Check className="h-4 w-4 text-[var(--color-primary)]" />}
                </button>
              </div>
              <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">
                Dark mode support coming soon. Currently only light theme is available.
              </p>
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
                    <Button variant="outline" size="sm" onClick={handleExportData}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--color-foreground)]">Clear Local Storage</p>
                      <p className="text-sm text-[var(--color-muted-foreground)]">Remove cached data from browser</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleClearLocalStorage}>
                      Clear
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-red-700">Delete All Data</p>
                      <p className="text-sm text-red-600">Permanently delete all projects and forms</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={handleDeleteAllData}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Help & Support</h3>
              <div className="space-y-4">
                <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--color-foreground)]">Documentation</p>
                      <p className="text-sm text-[var(--color-muted-foreground)]">Read the VForms user guide</p>
                    </div>
                    <Button variant="outline" size="sm">View Docs</Button>
                  </div>
                </div>
                <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--color-foreground)]">Contact Support</p>
                      <p className="text-sm text-[var(--color-muted-foreground)]">Get help from our support team</p>
                    </div>
                    <Button variant="outline" size="sm">Contact</Button>
                  </div>
                </div>
                <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--color-foreground)]">About VForms</p>
                      <p className="text-sm text-[var(--color-muted-foreground)]">Version 1.0.0</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
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
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
              <h2 className="text-lg font-semibold text-red-600 mb-2">Delete All Data?</h2>
              <p className="text-sm text-[var(--color-muted-foreground)] mb-4">
                This action cannot be undone. All your projects, forms, and uploaded documents will be permanently deleted.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
                <Button variant="destructive" onClick={confirmDeleteAllData}>Delete Everything</Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Settings Navigation */}
          <div className="lg:w-64 shrink-0">
            <nav className="space-y-1">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSettingsSection(section.id)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors',
                      activeSettingsSection === section.id
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
              {(activeSettingsSection === 'profile' || activeSettingsSection === 'organization' || activeSettingsSection === 'notifications') && (
                <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex items-center justify-between">
                  {showSavedMessage && (
                    <div className="flex items-center gap-2 text-emerald-600 text-sm">
                      <Check className="h-4 w-4" />
                      Changes saved successfully!
                    </div>
                  )}
                  <div className={showSavedMessage ? '' : 'ml-auto'}>
                    <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90" onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
