import { DashboardProvider } from '@/context/DashboardContext';
import { TopNav } from '@/components/layout/TopNav';
import { SplitPane } from '@/components/layout/SplitPane';
import { DocumentIngestion } from '@/components/ingestion/DocumentIngestion';
import { FormPreview } from '@/components/forms/FormPreview';

function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <main className="flex-1">
        <SplitPane
          left={<DocumentIngestion />}
          right={<FormPreview />}
        />
      </main>
    </div>
  );
}

function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}

export default App;
