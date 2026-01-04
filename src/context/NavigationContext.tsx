import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { FormType } from '@/types';

export type NavSection = 'dashboard' | 'projects' | 'forms' | 'team' | 'firms' | 'settings';

interface NavigationContextType {
  activeSection: NavSection;
  setActiveSection: (section: NavSection) => void;
  navigateToForm: (formType: FormType) => void;
  navigateToProjects: () => void;
  navigateToTeam: () => void;
  navigateToFirms: () => void;
  navigateToSettings: (settingsSection?: string) => void;
  activeSettingsSection: string;
  setActiveSettingsSection: (section: string) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<NavSection>('forms');
  const [activeSettingsSection, setActiveSettingsSection] = useState('profile');

  const navigateToForm = useCallback((_formType: FormType) => {
    setActiveSection('forms');
    // The form type will be set via the dashboard context
  }, []);

  const navigateToProjects = useCallback(() => {
    setActiveSection('projects');
  }, []);

  const navigateToTeam = useCallback(() => {
    setActiveSection('team');
  }, []);

  const navigateToFirms = useCallback(() => {
    setActiveSection('firms');
  }, []);

  const navigateToSettings = useCallback((settingsSection?: string) => {
    setActiveSection('settings');
    if (settingsSection) {
      setActiveSettingsSection(settingsSection);
    }
  }, []);

  const value: NavigationContextType = {
    activeSection,
    setActiveSection,
    navigateToForm,
    navigateToProjects,
    navigateToTeam,
    navigateToFirms,
    navigateToSettings,
    activeSettingsSection,
    setActiveSettingsSection,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

