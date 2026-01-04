import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { FormProgress } from '@/utils/formProgress';

interface FormProgressBarProps {
  progress: FormProgress;
  formName: string;
}

export function FormProgressBar({ progress, formName }: FormProgressBarProps) {
  const [showMissing, setShowMissing] = useState(false);
  const { percentage, filledFields, totalRequiredFields, missingFields } = progress;

  const getProgressColor = () => {
    if (percentage >= 100) return 'bg-emerald-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getStatusIcon = () => {
    if (percentage >= 100) {
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    }
    return <AlertCircle className="h-4 w-4 text-amber-500" />;
  };

  return (
    <div className="bg-white border-b border-[var(--color-border)] px-6 py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm font-medium text-[var(--color-foreground)]">
            {formName} Progress
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--color-muted-foreground)]">
            {filledFields} of {totalRequiredFields} required fields
          </span>
          <span className={cn(
            'text-sm font-bold',
            percentage >= 100 ? 'text-emerald-600' : 'text-[var(--color-foreground)]'
          )}>
            {percentage}%
          </span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-2 bg-[var(--color-muted)] rounded-full overflow-hidden">
        <div
          className={cn('h-full transition-all duration-500 ease-out rounded-full', getProgressColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Missing fields warning */}
      {missingFields.length > 0 && (
        <div className="mt-2">
          <button
            onClick={() => setShowMissing(!showMissing)}
            className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-medium"
          >
            <AlertCircle className="h-3 w-3" />
            {missingFields.length} required field{missingFields.length > 1 ? 's' : ''} missing
            {showMissing ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>
          
          {showMissing && (
            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs font-medium text-amber-800 mb-2">Missing required fields:</p>
              <div className="flex flex-wrap gap-1">
                {missingFields.map((field) => (
                  <span
                    key={field.field}
                    className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700"
                  >
                    {field.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Completion message */}
      {percentage >= 100 && (
        <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-xs text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            All required fields are complete! Review and submit when ready.
          </p>
        </div>
      )}
    </div>
  );
}

