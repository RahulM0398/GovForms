import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { UserProfileDropdown } from './UserProfileDropdown';
import { useDashboard } from '@/context/DashboardContext';

interface TopNavProps {
  title?: string;
  subtitle?: string;
}

export function TopNav({ title, subtitle }: TopNavProps) {
  const { state } = useDashboard();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[var(--color-border)] bg-white px-6">
      {/* Left side - Title/Breadcrumb */}
      <div className="flex items-center gap-4">
        {title ? (
          <div>
            <h1 className="text-lg font-semibold text-[var(--color-foreground)]">{title}</h1>
            {subtitle && (
              <p className="text-xs text-[var(--color-muted-foreground)]">{subtitle}</p>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--color-primary)]" />
            <span className="text-sm font-medium text-[var(--color-foreground)]">
              {state.activeForm} Form
            </span>
          </div>
        )}
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
          <Input
            type="search"
            placeholder="Search projects, forms, team..."
            className="pl-9 bg-[var(--color-muted)] border-transparent focus:border-[var(--color-primary)] focus:bg-white"
          />
        </div>
      </div>

      {/* Right side - User Profile */}
      <div className="flex items-center gap-3">
        {/* Auto-save indicator */}
        <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Auto-saved
        </div>
        
        <UserProfileDropdown />
      </div>
    </header>
  );
}
