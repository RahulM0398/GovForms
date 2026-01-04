// Form types
export type FormType = 'SF330' | 'SF252';

// Project types
export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Uploaded asset types
export interface UploadedAsset {
  id: string;
  name: string;
  type: 'resume' | 'project_profile' | 'certificate' | 'other';
  size: number;
  uploadedAt: Date;
  projectId: string; // Associated project
  extractedData?: Record<string, unknown>;
}

// SF330 Part I Data
export interface SF330PartIData {
  // Section A - Contract Information
  contractNumber: string;
  taskOrderNumber: string;
  
  // Section B - Architect-Engineer Point of Contact
  firmName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  pointOfContactName: string;
  pointOfContactTitle: string;
  pointOfContactPhone: string;
  pointOfContactFax: string;
  pointOfContactEmail: string;
  
  // Section C - Proposed Team
  primeContractorName: string;
  primeContractorAddress: string;
  
  // Section D - Organizational Chart
  organizationalChartDescription: string;
  
  // Section E - Resumes
  keyPersonnel: KeyPersonnel[];
  
  // Section F - Example Projects
  exampleProjects: ExampleProject[];
}

export interface KeyPersonnel {
  id: string;
  name: string;
  title: string;
  yearsExperience: number;
  firmName: string;
  education: string;
  certifications: string[];
  relevantProjects: string[];
}

export interface ExampleProject {
  id: string;
  projectName: string;
  projectOwner: string;
  ownerPointOfContact: string;
  ownerPhone: string;
  completionDate: string;
  projectLocation: string;
  estimatedCost: number;
  briefDescription: string;
}

// SF330 Part II Data
export interface SF330PartIIData {
  // Section 4 - Firm Information
  firmName: string;
  yearEstablished: string;
  dunsNumber: string;
  taxIdNumber: string;
  
  // Section 5 - Ownership
  ownershipType: string;
  smallBusinessStatus: string;
  
  // Section 6 - Principal Office
  principalOfficeName: string;
  principalOfficeAddress: string;
  principalOfficeCity: string;
  principalOfficeState: string;
  principalOfficeZipCode: string;
  
  // Section 7 - Branch Offices
  branchOffices: BranchOffice[];
  
  // Section 8 - Total Personnel
  totalEmployees: number;
  totalArchitects: number;
  totalEngineers: number;
  totalOtherProfessionals: number;
  totalAdministrative: number;
  
  // Section 9 - Employees by Discipline (Block 9)
  employeesByDiscipline: EmployeeByDiscipline[];
  
  // Section 10 - Profile of Firm's Experience
  firmExperienceProfile: ExperienceProfile[];
}

export interface BranchOffice {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  employeeCount: number;
}

export interface EmployeeByDiscipline {
  id: string;
  functionCode: string;
  discipline: string;
  employeeCount: number;
}

export interface ExperienceProfile {
  id: string;
  profileCode: string;
  experienceType: string;
  numberOfProjects: number;
  grossRevenue: number;
}

// SF252 Data - Architect-Engineer Contract
export interface SF252Data {
  // Contract Identification
  contractNumber: string;
  deliveryOrderNumber: string;
  amendmentNumber: string;
  effectiveDate: string;
  
  // Contractor Information
  contractorName: string;
  contractorAddress: string;
  contractorCity: string;
  contractorState: string;
  contractorZipCode: string;
  contractorPhone: string;
  contractorTIN: string;
  
  // Contract Details
  contractDate: string;
  contractAmount: number;
  obligatedAmount: number;
  
  // Issuing Office
  issuingOfficeName: string;
  issuingOfficeAddress: string;
  
  // Administration Office
  administrationOfficeName: string;
  administrationOfficeAddress: string;
  
  // Period of Performance
  periodOfPerformanceStart: string;
  periodOfPerformanceEnd: string;
  
  // Payment Information
  paymentOfficeName: string;
  paymentOfficeAddress: string;
  
  // Services Description
  servicesDescription: string;
  accountingData: string;
  
  // Signatures
  contractorSignatureName: string;
  contractorSignatureTitle: string;
  contractorSignatureDate: string;
  contractingOfficerName: string;
  contractingOfficerTitle: string;
  contractingOfficerDate: string;
}

// Unified Form Data
export interface UnifiedFormData {
  sf330PartI: SF330PartIData;
  sf330PartII: SF330PartIIData;
  sf252: SF252Data;
}

// Dashboard State
export interface DashboardState {
  activeForm: FormType;
  projects: Project[];
  activeProjectId: string | null;
  uploadedAssets: UploadedAsset[];
  formData: UnifiedFormData;
  isLoading: boolean;
}

// Action types
export type DashboardAction =
  | { type: 'SET_ACTIVE_FORM'; payload: FormType }
  | { type: 'CREATE_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; name: string; description?: string } }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'SET_ACTIVE_PROJECT'; payload: string | null }
  | { type: 'ADD_ASSET'; payload: UploadedAsset }
  | { type: 'REMOVE_ASSET'; payload: string }
  | { type: 'UPDATE_FORM_FIELD'; payload: { formType: FormType; field: string; value: unknown } }
  | { type: 'UPDATE_SF330_PART_I'; payload: Partial<SF330PartIData> }
  | { type: 'UPDATE_SF330_PART_II'; payload: Partial<SF330PartIIData> }
  | { type: 'UPDATE_SF252'; payload: Partial<SF252Data> }
  | { type: 'AUTO_FILL_FROM_EXTRACTION'; payload: { formType: FormType; data: Partial<SF330PartIData | SF330PartIIData | SF252Data> } }
  | { type: 'LOAD_PERSISTED_STATE'; payload: DashboardState }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_EMPLOYEE_BY_DISCIPLINE'; payload: EmployeeByDiscipline }
  | { type: 'REMOVE_EMPLOYEE_BY_DISCIPLINE'; payload: string }
  | { type: 'UPDATE_EMPLOYEE_BY_DISCIPLINE'; payload: EmployeeByDiscipline }
  | { type: 'ADD_KEY_PERSONNEL'; payload: KeyPersonnel }
  | { type: 'REMOVE_KEY_PERSONNEL'; payload: string }
  | { type: 'ADD_EXAMPLE_PROJECT'; payload: ExampleProject }
  | { type: 'REMOVE_EXAMPLE_PROJECT'; payload: string };

