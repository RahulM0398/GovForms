import { z } from 'zod';

// Key Personnel Schema
export const keyPersonnelSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  yearsExperience: z.number().min(0),
  firmName: z.string(),
  education: z.string(),
  certifications: z.array(z.string()),
  relevantProjects: z.array(z.string()),
});

// Example Project Schema
export const exampleProjectSchema = z.object({
  id: z.string(),
  projectName: z.string().min(1, 'Project name is required'),
  projectOwner: z.string(),
  ownerPointOfContact: z.string(),
  ownerPhone: z.string(),
  completionDate: z.string(),
  projectLocation: z.string(),
  estimatedCost: z.number().min(0),
  briefDescription: z.string(),
});

// SF330 Part I Schema
export const sf330PartISchema = z.object({
  // Section A - Contract Information
  contractNumber: z.string(),
  taskOrderNumber: z.string(),
  
  // Section B - Architect-Engineer Point of Contact
  firmName: z.string().min(1, 'Firm name is required'),
  streetAddress: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string().default('USA'),
  pointOfContactName: z.string(),
  pointOfContactTitle: z.string(),
  pointOfContactPhone: z.string(),
  pointOfContactFax: z.string(),
  pointOfContactEmail: z.string().email().or(z.literal('')),
  
  // Section C - Proposed Team
  primeContractorName: z.string(),
  primeContractorAddress: z.string(),
  
  // Section D - Organizational Chart
  organizationalChartDescription: z.string(),
  
  // Section E - Resumes
  keyPersonnel: z.array(keyPersonnelSchema),
  
  // Section F - Example Projects
  exampleProjects: z.array(exampleProjectSchema),
});

// Branch Office Schema
export const branchOfficeSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  employeeCount: z.number().min(0),
});

// Employee by Discipline Schema (Block 9)
export const employeeByDisciplineSchema = z.object({
  id: z.string(),
  functionCode: z.string().min(1, 'Function code is required'),
  discipline: z.string().min(1, 'Discipline is required'),
  employeeCount: z.number().min(0),
});

// Experience Profile Schema
export const experienceProfileSchema = z.object({
  id: z.string(),
  profileCode: z.string(),
  experienceType: z.string(),
  numberOfProjects: z.number().min(0),
  grossRevenue: z.number().min(0),
});

// SF330 Part II Schema
export const sf330PartIISchema = z.object({
  // Section 4 - Firm Information
  firmName: z.string().min(1, 'Firm name is required'),
  yearEstablished: z.string(),
  dunsNumber: z.string(),
  taxIdNumber: z.string(),
  
  // Section 5 - Ownership
  ownershipType: z.string(),
  smallBusinessStatus: z.string(),
  
  // Section 6 - Principal Office
  principalOfficeName: z.string(),
  principalOfficeAddress: z.string(),
  principalOfficeCity: z.string(),
  principalOfficeState: z.string(),
  principalOfficeZipCode: z.string(),
  
  // Section 7 - Branch Offices
  branchOffices: z.array(branchOfficeSchema),
  
  // Section 8 - Total Personnel
  totalEmployees: z.number().min(0),
  totalArchitects: z.number().min(0),
  totalEngineers: z.number().min(0),
  totalOtherProfessionals: z.number().min(0),
  totalAdministrative: z.number().min(0),
  
  // Section 9 - Employees by Discipline (Block 9)
  employeesByDiscipline: z.array(employeeByDisciplineSchema),
  
  // Section 10 - Profile of Firm's Experience
  firmExperienceProfile: z.array(experienceProfileSchema),
});

// SF252 Schema - Architect-Engineer Contract
export const sf252Schema = z.object({
  // Contract Identification
  contractNumber: z.string().min(1, 'Contract number is required'),
  deliveryOrderNumber: z.string(),
  amendmentNumber: z.string(),
  effectiveDate: z.string(),
  
  // Contractor Information
  contractorName: z.string().min(1, 'Contractor name is required'),
  contractorAddress: z.string(),
  contractorCity: z.string(),
  contractorState: z.string(),
  contractorZipCode: z.string(),
  contractorPhone: z.string(),
  contractorTIN: z.string(),
  
  // Contract Details
  contractDate: z.string(),
  contractAmount: z.number().min(0),
  obligatedAmount: z.number().min(0),
  
  // Issuing Office
  issuingOfficeName: z.string(),
  issuingOfficeAddress: z.string(),
  
  // Administration Office
  administrationOfficeName: z.string(),
  administrationOfficeAddress: z.string(),
  
  // Period of Performance
  periodOfPerformanceStart: z.string(),
  periodOfPerformanceEnd: z.string(),
  
  // Payment Information
  paymentOfficeName: z.string(),
  paymentOfficeAddress: z.string(),
  
  // Services Description
  servicesDescription: z.string(),
  accountingData: z.string(),
  
  // Signatures
  contractorSignatureName: z.string(),
  contractorSignatureTitle: z.string(),
  contractorSignatureDate: z.string(),
  contractingOfficerName: z.string(),
  contractingOfficerTitle: z.string(),
  contractingOfficerDate: z.string(),
});

// Unified Form Schema - Discriminated Union
export const unifiedFormSchema = z.discriminatedUnion('formType', [
  z.object({
    formType: z.literal('SF330_PART_I'),
    data: sf330PartISchema,
  }),
  z.object({
    formType: z.literal('SF330_PART_II'),
    data: sf330PartIISchema,
  }),
  z.object({
    formType: z.literal('SF252'),
    data: sf252Schema,
  }),
]);

// Type inference helpers
export type SF330PartI = z.infer<typeof sf330PartISchema>;
export type SF330PartII = z.infer<typeof sf330PartIISchema>;
export type SF252 = z.infer<typeof sf252Schema>;
export type UnifiedForm = z.infer<typeof unifiedFormSchema>;
export type KeyPersonnel = z.infer<typeof keyPersonnelSchema>;
export type ExampleProject = z.infer<typeof exampleProjectSchema>;
export type EmployeeByDiscipline = z.infer<typeof employeeByDisciplineSchema>;
export type BranchOffice = z.infer<typeof branchOfficeSchema>;
export type ExperienceProfile = z.infer<typeof experienceProfileSchema>;


