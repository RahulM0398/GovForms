import * as React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { Label } from './label';

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  showValidation?: boolean;
  icon?: React.ReactNode;
}

const ValidatedInput = React.forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ className, label, required, error, hint, showValidation = true, icon, value, ...props }, ref) => {
    const hasValue = value !== undefined && value !== null && String(value).trim().length > 0;
    const isValid = !required || hasValue;
    const showStatus = showValidation && (required || hasValue);

    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium text-[var(--color-muted-foreground)]">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </Label>
          {showStatus && (
            <span className="flex items-center gap-1">
              {isValid ? (
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              ) : (
                <AlertCircle className="h-3 w-3 text-amber-500" />
              )}
            </span>
          )}
        </div>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]">
              {icon}
            </div>
          )}
          <Input
            ref={ref}
            value={value}
            className={cn(
              'bg-white border-[var(--color-border)]',
              icon && 'pl-9',
              error && 'border-red-500 focus:border-red-500',
              !isValid && required && showValidation && 'border-amber-300',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-[var(--color-muted-foreground)]">{hint}</p>
        )}
      </div>
    );
  }
);

ValidatedInput.displayName = 'ValidatedInput';

export { ValidatedInput };

