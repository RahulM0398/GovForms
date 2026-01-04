import React, { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react';
import type {
  DashboardState,
  DashboardAction,
  FormType,
  Project,
  UploadedAsset,
  SF330PartIData,
  SF330PartIIData,
  SF254Data,
  SF255Data,
  SF252Data,
  EmployeeByDiscipline,
  KeyPersonnel,
  ExampleProject,
} from '@/types';

const STORAGE_KEY = 'vsuite_dashboard_state';
const DEBOUNCE_MS = 500;

// Initial form data
const initialSF330PartI: SF330PartIData = {
  contractNumber: '',
  taskOrderNumber: '',
  firmName: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'USA',
  pointOfContactName: '',
  pointOfContactTitle: '',
  pointOfContactPhone: '',
  pointOfContactFax: '',
  pointOfContactEmail: '',
  primeContractorName: '',
  primeContractorAddress: '',
  organizationalChartDescription: '',
  keyPersonnel: [],
  exampleProjects: [],
};

const initialSF330PartII: SF330PartIIData = {
  firmName: '',
  yearEstablished: '',
  dunsNumber: '',
  taxIdNumber: '',
  ownershipType: '',
  smallBusinessStatus: '',
  principalOfficeName: '',
  principalOfficeAddress: '',
  principalOfficeCity: '',
  principalOfficeState: '',
  principalOfficeZipCode: '',
  branchOffices: [],
  totalEmployees: 0,
  totalArchitects: 0,
  totalEngineers: 0,
  totalOtherProfessionals: 0,
  totalAdministrative: 0,
  employeesByDiscipline: [],
  firmExperienceProfile: [],
};

const initialSF252: SF252Data = {
  contractNumber: '',
  deliveryOrderNumber: '',
  amendmentNumber: '',
  effectiveDate: '',
  contractorName: '',
  contractorAddress: '',
  contractorCity: '',
  contractorState: '',
  contractorZipCode: '',
  contractorPhone: '',
  contractorTIN: '',
  contractDate: '',
  contractAmount: 0,
  obligatedAmount: 0,
  issuingOfficeName: '',
  issuingOfficeAddress: '',
  administrationOfficeName: '',
  administrationOfficeAddress: '',
  periodOfPerformanceStart: '',
  periodOfPerformanceEnd: '',
  paymentOfficeName: '',
  paymentOfficeAddress: '',
  servicesDescription: '',
  accountingData: '',
  contractorSignatureName: '',
  contractorSignatureTitle: '',
  contractorSignatureDate: '',
  contractingOfficerName: '',
  contractingOfficerTitle: '',
  contractingOfficerDate: '',
};

const initialSF254: SF254Data = {
  firmName: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  contactName: '',
  contactTitle: '',
  contactPhone: '',
  contactEmail: '',
  parentCompanyName: '',
  parentCompanyAddress: '',
  yearEstablished: '',
  dateSubmitted: '',
  totalPersonnel: 0,
  personnelByDiscipline: [],
  serviceCapabilities: [],
  geographicExperience: [],
  annualAverageRevenue: 0,
  federalWorkPercentage: 0,
  nonFederalWorkPercentage: 0,
};

const initialSF255: SF255Data = {
  projectTitle: '',
  projectLocation: '',
  solicitationNumber: '',
  firmName: '',
  firmAddress: '',
  firmCity: '',
  firmState: '',
  firmZipCode: '',
  pocName: '',
  pocTitle: '',
  pocPhone: '',
  pocEmail: '',
  jointVenturePartners: [],
  personnelByDiscipline: [],
  outsideConsultants: [],
  projectTeamResumes: [],
  relevantProjects: [],
  additionalInformation: '',
  authorizedRepName: '',
  authorizedRepTitle: '',
  authorizedRepDate: '',
  authorizedRepSignature: '',
};

// Create a default project
const defaultProject: Project = {
  id: 'default',
  name: 'Untitled Project',
  description: 'Default project',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const initialState: DashboardState = {
  activeForm: 'SF330',
  projects: [defaultProject],
  activeProjectId: 'default',
  uploadedAssets: [],
  formData: {
    sf330PartI: initialSF330PartI,
    sf330PartII: initialSF330PartII,
    sf254: initialSF254,
    sf255: initialSF255,
    sf252: initialSF252,
  },
  isLoading: false,
};

// Reducer function
function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_ACTIVE_FORM':
      return { ...state, activeForm: action.payload };

    // Project actions
    case 'CREATE_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
        activeProjectId: action.payload.id,
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id
            ? { ...project, name: action.payload.name, description: action.payload.description, updatedAt: new Date() }
            : project
        ),
      };

    case 'DELETE_PROJECT': {
      const remainingProjects = state.projects.filter((project) => project.id !== action.payload);
      const remainingAssets = state.uploadedAssets.filter((asset) => asset.projectId !== action.payload);
      // If we're deleting the active project, switch to another one
      const newActiveProjectId = state.activeProjectId === action.payload
        ? (remainingProjects[0]?.id || null)
        : state.activeProjectId;
      return {
        ...state,
        projects: remainingProjects,
        uploadedAssets: remainingAssets,
        activeProjectId: newActiveProjectId,
      };
    }

    case 'SET_ACTIVE_PROJECT':
      return { ...state, activeProjectId: action.payload };

    case 'ADD_ASSET':
      return {
        ...state,
        uploadedAssets: [...state.uploadedAssets, action.payload],
      };

    case 'REMOVE_ASSET':
      return {
        ...state,
        uploadedAssets: state.uploadedAssets.filter((asset) => asset.id !== action.payload),
      };

    case 'UPDATE_SF330_PART_I':
      return {
        ...state,
        formData: {
          ...state.formData,
          sf330PartI: { ...state.formData.sf330PartI, ...action.payload },
        },
      };

    case 'UPDATE_SF330_PART_II':
      return {
        ...state,
        formData: {
          ...state.formData,
          sf330PartII: { ...state.formData.sf330PartII, ...action.payload },
        },
      };

    case 'UPDATE_SF252':
      return {
        ...state,
        formData: {
          ...state.formData,
          sf252: { ...state.formData.sf252, ...action.payload },
        },
      };

    case 'UPDATE_SF254':
      return {
        ...state,
        formData: {
          ...state.formData,
          sf254: { ...state.formData.sf254, ...action.payload },
        },
      };

    case 'UPDATE_SF255':
      return {
        ...state,
        formData: {
          ...state.formData,
          sf255: { ...state.formData.sf255, ...action.payload },
        },
      };

    case 'UPDATE_FORM_FIELD': {
      const { formType, field, value } = action.payload;
      if (formType === 'SF330_PART_I') {
        return {
          ...state,
          formData: {
            ...state.formData,
            sf330PartI: { ...state.formData.sf330PartI, [field]: value },
          },
        };
      } else if (formType === 'SF330_PART_II') {
        return {
          ...state,
          formData: {
            ...state.formData,
            sf330PartII: { ...state.formData.sf330PartII, [field]: value },
          },
        };
      } else {
        return {
          ...state,
          formData: {
            ...state.formData,
            sf252: { ...state.formData.sf252, [field]: value },
          },
        };
      }
    }

    case 'AUTO_FILL_FROM_EXTRACTION': {
      const { formType, data } = action.payload;
      if (formType === 'SF330_PART_I') {
        return {
          ...state,
          formData: {
            ...state.formData,
            sf330PartI: { ...state.formData.sf330PartI, ...data as Partial<SF330PartIData> },
          },
        };
      } else if (formType === 'SF330_PART_II') {
        return {
          ...state,
          formData: {
            ...state.formData,
            sf330PartII: { ...state.formData.sf330PartII, ...data as Partial<SF330PartIIData> },
          },
        };
      } else {
        return {
          ...state,
          formData: {
            ...state.formData,
            sf252: { ...state.formData.sf252, ...data as Partial<SF252Data> },
          },
        };
      }
    }

    case 'ADD_EMPLOYEE_BY_DISCIPLINE':
      return {
        ...state,
        formData: {
          ...state.formData,
          sf330PartII: {
            ...state.formData.sf330PartII,
            employeesByDiscipline: [
              ...state.formData.sf330PartII.employeesByDiscipline,
              action.payload,
            ],
          },
        },
      };

    case 'REMOVE_EMPLOYEE_BY_DISCIPLINE':
      return {
        ...state,
        formData: {
          ...state.formData,
          sf330PartII: {
            ...state.formData.sf330PartII,
            employeesByDiscipline: state.formData.sf330PartII.employeesByDiscipline.filter(
              (emp) => emp.id !== action.payload
            ),
          },
        },
      };

    case 'UPDATE_EMPLOYEE_BY_DISCIPLINE':
      return {
        ...state,
        formData: {
          ...state.formData,
          sf330PartII: {
            ...state.formData.sf330PartII,
            employeesByDiscipline: state.formData.sf330PartII.employeesByDiscipline.map((emp) =>
              emp.id === action.payload.id ? action.payload : emp
            ),
          },
        },
      };

    case 'ADD_KEY_PERSONNEL':
      return {
        ...state,
        formData: {
          ...state.formData,
          sf330PartI: {
            ...state.formData.sf330PartI,
            keyPersonnel: [...state.formData.sf330PartI.keyPersonnel, action.payload],
          },
        },
      };

    case 'REMOVE_KEY_PERSONNEL':
      return {
        ...state,
        formData: {
          ...state.formData,
          sf330PartI: {
            ...state.formData.sf330PartI,
            keyPersonnel: state.formData.sf330PartI.keyPersonnel.filter(
              (person) => person.id !== action.payload
            ),
          },
        },
      };

    case 'ADD_EXAMPLE_PROJECT':
      return {
        ...state,
        formData: {
          ...state.formData,
          sf330PartI: {
            ...state.formData.sf330PartI,
            exampleProjects: [...state.formData.sf330PartI.exampleProjects, action.payload],
          },
        },
      };

    case 'REMOVE_EXAMPLE_PROJECT':
      return {
        ...state,
        formData: {
          ...state.formData,
          sf330PartI: {
            ...state.formData.sf330PartI,
            exampleProjects: state.formData.sf330PartI.exampleProjects.filter(
              (project) => project.id !== action.payload
            ),
          },
        },
      };

    case 'LOAD_PERSISTED_STATE':
      return action.payload;

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}

// Context types
interface DashboardContextType {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
  // Form actions
  setActiveForm: (form: FormType) => void;
  // Project actions
  createProject: (name: string, description?: string) => Project;
  updateProject: (id: string, name: string, description?: string) => void;
  deleteProject: (id: string) => void;
  setActiveProject: (id: string | null) => void;
  getActiveProject: () => Project | undefined;
  // Asset actions
  addAsset: (asset: UploadedAsset) => void;
  removeAsset: (id: string) => void;
  getProjectAssets: (projectId: string) => UploadedAsset[];
  // Form data actions
  updateSF330PartI: (data: Partial<SF330PartIData>) => void;
  updateSF330PartII: (data: Partial<SF330PartIIData>) => void;
  updateSF254: (data: Partial<SF254Data>) => void;
  updateSF255: (data: Partial<SF255Data>) => void;
  updateSF252: (data: Partial<SF252Data>) => void;
  addEmployeeByDiscipline: (employee: EmployeeByDiscipline) => void;
  removeEmployeeByDiscipline: (id: string) => void;
  updateEmployeeByDiscipline: (employee: EmployeeByDiscipline) => void;
  addKeyPersonnel: (person: KeyPersonnel) => void;
  removeKeyPersonnel: (id: string) => void;
  addExampleProject: (project: ExampleProject) => void;
  removeExampleProject: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

// Load state from localStorage
function loadPersistedState(): DashboardState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects for uploadedAssets
      if (parsed.uploadedAssets) {
        parsed.uploadedAssets = parsed.uploadedAssets.map((asset: UploadedAsset) => ({
          ...asset,
          uploadedAt: new Date(asset.uploadedAt),
        }));
      }
      // Convert date strings back to Date objects for projects
      if (parsed.projects) {
        parsed.projects = parsed.projects.map((project: Project) => ({
          ...project,
          createdAt: new Date(project.createdAt),
          updatedAt: new Date(project.updatedAt),
        }));
      }
      // Ensure we have at least one project
      if (!parsed.projects || parsed.projects.length === 0) {
        parsed.projects = [defaultProject];
        parsed.activeProjectId = 'default';
      }
      // Ensure all assets have a projectId
      if (parsed.uploadedAssets) {
        parsed.uploadedAssets = parsed.uploadedAssets.map((asset: UploadedAsset) => ({
          ...asset,
          projectId: asset.projectId || parsed.activeProjectId || 'default',
        }));
      }
      // Ensure all form data sections exist (for backwards compatibility)
      if (!parsed.formData) {
        parsed.formData = initialState.formData;
      } else {
        // Merge with initial state to ensure all form types exist
        parsed.formData = {
          sf330PartI: { ...initialSF330PartI, ...(parsed.formData.sf330PartI || {}) },
          sf330PartII: { ...initialSF330PartII, ...(parsed.formData.sf330PartII || {}) },
          sf254: { ...initialSF254, ...(parsed.formData.sf254 || {}) },
          sf255: { ...initialSF255, ...(parsed.formData.sf255 || {}) },
          sf252: { ...initialSF252, ...(parsed.formData.sf252 || {}) },
        };
      }
      // Handle old activeForm types
      if (parsed.activeForm === 'SF330_PART_I' || parsed.activeForm === 'SF330_PART_II') {
        parsed.activeForm = 'SF330';
      }
      return parsed;
    }
  } catch (error) {
    console.error('Failed to load persisted state:', error);
  }
  return null;
}

// Provider component
export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Load persisted state on mount
  useEffect(() => {
    const persistedState = loadPersistedState();
    if (persistedState) {
      dispatch({ type: 'LOAD_PERSISTED_STATE', payload: persistedState });
    }
  }, []);

  // Debounced save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to persist state:', error);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [state]);

  // Form helper functions
  const setActiveForm = useCallback((form: FormType) => {
    dispatch({ type: 'SET_ACTIVE_FORM', payload: form });
  }, []);

  // Project helper functions
  const createProject = useCallback((name: string, description?: string): Project => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: 'CREATE_PROJECT', payload: newProject });
    return newProject;
  }, []);

  const updateProject = useCallback((id: string, name: string, description?: string) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: { id, name, description } });
  }, []);

  const deleteProject = useCallback((id: string) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id });
  }, []);

  const setActiveProject = useCallback((id: string | null) => {
    dispatch({ type: 'SET_ACTIVE_PROJECT', payload: id });
  }, []);

  const getActiveProject = useCallback(() => {
    return state.projects.find((p) => p.id === state.activeProjectId);
  }, [state.projects, state.activeProjectId]);

  // Asset helper functions
  const addAsset = useCallback((asset: UploadedAsset) => {
    dispatch({ type: 'ADD_ASSET', payload: asset });
  }, []);

  const removeAsset = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ASSET', payload: id });
  }, []);

  const getProjectAssets = useCallback((projectId: string) => {
    return state.uploadedAssets.filter((asset) => asset.projectId === projectId);
  }, [state.uploadedAssets]);

  // Form data helper functions
  const updateSF330PartI = useCallback((data: Partial<SF330PartIData>) => {
    dispatch({ type: 'UPDATE_SF330_PART_I', payload: data });
  }, []);

  const updateSF330PartII = useCallback((data: Partial<SF330PartIIData>) => {
    dispatch({ type: 'UPDATE_SF330_PART_II', payload: data });
  }, []);

  const updateSF254 = useCallback((data: Partial<SF254Data>) => {
    dispatch({ type: 'UPDATE_SF254', payload: data });
  }, []);

  const updateSF255 = useCallback((data: Partial<SF255Data>) => {
    dispatch({ type: 'UPDATE_SF255', payload: data });
  }, []);

  const updateSF252 = useCallback((data: Partial<SF252Data>) => {
    dispatch({ type: 'UPDATE_SF252', payload: data });
  }, []);

  const addEmployeeByDiscipline = useCallback((employee: EmployeeByDiscipline) => {
    dispatch({ type: 'ADD_EMPLOYEE_BY_DISCIPLINE', payload: employee });
  }, []);

  const removeEmployeeByDiscipline = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_EMPLOYEE_BY_DISCIPLINE', payload: id });
  }, []);

  const updateEmployeeByDiscipline = useCallback((employee: EmployeeByDiscipline) => {
    dispatch({ type: 'UPDATE_EMPLOYEE_BY_DISCIPLINE', payload: employee });
  }, []);

  const addKeyPersonnel = useCallback((person: KeyPersonnel) => {
    dispatch({ type: 'ADD_KEY_PERSONNEL', payload: person });
  }, []);

  const removeKeyPersonnel = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_KEY_PERSONNEL', payload: id });
  }, []);

  const addExampleProject = useCallback((project: ExampleProject) => {
    dispatch({ type: 'ADD_EXAMPLE_PROJECT', payload: project });
  }, []);

  const removeExampleProject = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_EXAMPLE_PROJECT', payload: id });
  }, []);

  const value: DashboardContextType = {
    state,
    dispatch,
    setActiveForm,
    createProject,
    updateProject,
    deleteProject,
    setActiveProject,
    getActiveProject,
    addAsset,
    removeAsset,
    getProjectAssets,
    updateSF330PartI,
    updateSF330PartII,
    updateSF254,
    updateSF255,
    updateSF252,
    addEmployeeByDiscipline,
    removeEmployeeByDiscipline,
    updateEmployeeByDiscipline,
    addKeyPersonnel,
    removeKeyPersonnel,
    addExampleProject,
    removeExampleProject,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

// Custom hook to use the context
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
