import { useState } from 'react';
import { DashboardProvider } from '@/context/DashboardContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';
import { SplitPane } from '@/components/layout/SplitPane';
import { DocumentIngestion } from '@/components/ingestion/DocumentIngestion';
import { FormPreview } from '@/components/forms/FormPreview';
import { DashboardView } from '@/components/views/DashboardView';
import { ProjectsView } from '@/components/views/ProjectsView';
import { TeamView } from '@/components/views/TeamView';
import { FirmsView } from '@/components/views/FirmsView';
import { SettingsView } from '@/components/views/SettingsView';

type NavSection = 'dashboard' | 'projects' | 'forms' | 'team' | 'firms' | 'settings';

const sectionTitles: Record<NavSection, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of your activity' },
  projects: { title: 'Projects', subtitle: 'Manage your projects' },
  forms: { title: 'Forms', subtitle: 'Federal qualification forms' },
  team: { title: 'Team', subtitle: 'Manage employees and roles' },
  firms: { title: 'Firms', subtitle: 'Manage firm profiles' },
  settings: { title: 'Settings', subtitle: 'Application preferences' },
};

function MainLayout() {
  const [activeSection, setActiveSection] = useState<NavSection>('forms');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardView />;
      case 'projects':
        return <ProjectsView />;
      case 'forms':
        return (
          <SplitPane
            left={<DocumentIngestion />}
            right={<FormPreview />}
          />
        );
      case 'team':
        return <TeamView />;
      case 'firms':
        return <FirmsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-[var(--color-surface)]">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav 
          title={sectionTitles[activeSection].title}
          subtitle={sectionTitles[activeSection].subtitle}
        />
        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <DashboardProvider>
      <MainLayout />
    </DashboardProvider>
  );
}

export default App;
