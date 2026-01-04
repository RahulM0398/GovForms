import type { ReactNode } from 'react';

interface SplitPaneProps {
  left: ReactNode;
  right: ReactNode;
}

export function SplitPane({ left, right }: SplitPaneProps) {
  return (
    <div className="split-pane">
      {/* Left pane - Document Ingestion (30%) */}
      <div className="split-pane-left">
        {left}
      </div>

      {/* Right pane - Form Preview (70%) */}
      <div className="split-pane-right">
        {right}
      </div>
    </div>
  );
}
