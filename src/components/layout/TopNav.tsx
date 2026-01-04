import { FileText, Sparkles, FileSignature } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDashboard } from '@/context/DashboardContext';
import type { FormType } from '@/types';

const formOptions: { value: FormType; label: string; description: string }[] = [
  { value: 'SF330', label: 'SF330', description: 'A-E Qualifications' },
  { value: 'SF252', label: 'SF252', description: 'A-E Contract' },
];

export function TopNav() {
  const { state, setActiveForm } = useDashboard();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[var(--color-border)]">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo and title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[hsl(280,60%,55%)] shadow-md">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[var(--color-foreground)] tracking-tight">VSuite</h1>
            <p className="text-xs text-[var(--color-muted-foreground)] font-medium">Document Intelligence</p>
          </div>
        </div>

        {/* Form Selector */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--color-muted-foreground)] font-medium hidden sm:block">Form:</span>
          <Select
            value={state.activeForm}
            onValueChange={(value) => setActiveForm(value as FormType)}
          >
            <SelectTrigger className="w-[160px] bg-white border-[var(--color-border)] shadow-sm hover:bg-[var(--color-muted)] transition-colors">
              <SelectValue placeholder="Select a form" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[var(--color-border)] shadow-lg">
              {formOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="cursor-pointer hover:bg-[var(--color-muted)] focus:bg-[var(--color-muted)]"
                >
                  <div className="flex items-center gap-2">
                    {option.value === 'SF330' ? (
                      <FileText className="h-4 w-4 text-[var(--color-primary)]" />
                    ) : (
                      <FileSignature className="h-4 w-4 text-blue-600" />
                    )}
                    <span className="font-medium">{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-[var(--color-accent)]/10 px-3 py-1.5 text-xs font-medium text-[var(--color-accent)]">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            Auto-save
          </div>
        </div>
      </div>
    </header>
  );
}
