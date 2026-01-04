import type { 
  SF330PartIData, 
  SF330PartIIData, 
  SF254Data, 
  SF255Data, 
  SF252Data,
  UnifiedFormData 
} from '@/types';

interface FieldValidation {
  field: string;
  label: string;
  required: boolean;
  filled: boolean;
}

interface FormProgress {
  percentage: number;
  filledFields: number;
  totalRequiredFields: number;
  missingFields: FieldValidation[];
  allFields: FieldValidation[];
}

// Helper to check if a value is filled
function isFilled(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return true; // Numbers are always filled (including 0)
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

// SF330 Part I required fields
const SF330_PART_I_FIELDS: { field: keyof SF330PartIData; label: string; required: boolean }[] = [
  { field: 'contractNumber', label: 'Contract Number', required: true },
  { field: 'firmName', label: 'Firm Name', required: true },
  { field: 'streetAddress', label: 'Street Address', required: true },
  { field: 'city', label: 'City', required: true },
  { field: 'state', label: 'State', required: true },
  { field: 'zipCode', label: 'ZIP Code', required: true },
  { field: 'pointOfContactName', label: 'Point of Contact Name', required: true },
  { field: 'pointOfContactEmail', label: 'Point of Contact Email', required: true },
  { field: 'pointOfContactPhone', label: 'Point of Contact Phone', required: true },
  { field: 'taskOrderNumber', label: 'Task Order Number', required: false },
  { field: 'country', label: 'Country', required: false },
  { field: 'pointOfContactTitle', label: 'Point of Contact Title', required: false },
  { field: 'pointOfContactFax', label: 'Point of Contact Fax', required: false },
  { field: 'primeContractorName', label: 'Prime Contractor Name', required: false },
  { field: 'primeContractorAddress', label: 'Prime Contractor Address', required: false },
  { field: 'organizationalChartDescription', label: 'Organizational Chart', required: false },
  { field: 'keyPersonnel', label: 'Key Personnel', required: true },
  { field: 'exampleProjects', label: 'Example Projects', required: true },
];

// SF330 Part II required fields
const SF330_PART_II_FIELDS: { field: keyof SF330PartIIData; label: string; required: boolean }[] = [
  { field: 'firmName', label: 'Firm Name', required: true },
  { field: 'yearEstablished', label: 'Year Established', required: true },
  { field: 'dunsNumber', label: 'DUNS Number', required: false },
  { field: 'taxIdNumber', label: 'Tax ID Number', required: false },
  { field: 'ownershipType', label: 'Ownership Type', required: true },
  { field: 'smallBusinessStatus', label: 'Small Business Status', required: false },
  { field: 'principalOfficeName', label: 'Principal Office Name', required: true },
  { field: 'principalOfficeAddress', label: 'Principal Office Address', required: true },
  { field: 'principalOfficeCity', label: 'Principal Office City', required: true },
  { field: 'principalOfficeState', label: 'Principal Office State', required: true },
  { field: 'principalOfficeZipCode', label: 'Principal Office ZIP', required: true },
  { field: 'totalEmployees', label: 'Total Employees', required: true },
  { field: 'employeesByDiscipline', label: 'Employees by Discipline', required: false },
];

// SF254 required fields - matches SF254Data interface
const SF254_FIELDS: { field: keyof SF254Data; label: string; required: boolean }[] = [
  { field: 'firmName', label: 'Firm Name', required: true },
  { field: 'streetAddress', label: 'Street Address', required: true },
  { field: 'city', label: 'City', required: true },
  { field: 'state', label: 'State', required: true },
  { field: 'zipCode', label: 'ZIP Code', required: true },
  { field: 'contactName', label: 'Contact Name', required: true },
  { field: 'contactEmail', label: 'Contact Email', required: true },
  { field: 'contactPhone', label: 'Contact Phone', required: true },
  { field: 'contactTitle', label: 'Contact Title', required: false },
  { field: 'yearEstablished', label: 'Year Established', required: true },
  { field: 'totalPersonnel', label: 'Total Personnel', required: false },
  { field: 'serviceCapabilities', label: 'Service Capabilities', required: false },
  { field: 'parentCompanyName', label: 'Parent Company Name', required: false },
  { field: 'parentCompanyAddress', label: 'Parent Company Address', required: false },
  { field: 'dateSubmitted', label: 'Date Submitted', required: false },
  { field: 'geographicExperience', label: 'Geographic Experience', required: false },
  { field: 'annualAverageRevenue', label: 'Annual Average Revenue', required: false },
  { field: 'federalWorkPercentage', label: 'Federal Work Percentage', required: false },
  { field: 'nonFederalWorkPercentage', label: 'Non-Federal Work Percentage', required: false },
];

// SF255 required fields - matches SF255Data interface
const SF255_FIELDS: { field: keyof SF255Data; label: string; required: boolean }[] = [
  { field: 'projectTitle', label: 'Project Title', required: true },
  { field: 'projectLocation', label: 'Project Location', required: true },
  { field: 'solicitationNumber', label: 'Solicitation Number', required: true },
  { field: 'firmName', label: 'Firm Name', required: true },
  { field: 'firmAddress', label: 'Firm Address', required: true },
  { field: 'firmCity', label: 'Firm City', required: true },
  { field: 'firmState', label: 'Firm State', required: true },
  { field: 'firmZipCode', label: 'Firm ZIP Code', required: true },
  { field: 'pocName', label: 'POC Name', required: true },
  { field: 'pocEmail', label: 'POC Email', required: true },
  { field: 'pocPhone', label: 'POC Phone', required: true },
  { field: 'pocTitle', label: 'POC Title', required: false },
  { field: 'projectTeamResumes', label: 'Project Team', required: false },
  { field: 'relevantProjects', label: 'Relevant Projects', required: false },
  { field: 'authorizedRepName', label: 'Authorized Representative', required: true },
  { field: 'authorizedRepDate', label: 'Authorization Date', required: true },
  { field: 'jointVenturePartners', label: 'JV Partners', required: false },
  { field: 'outsideConsultants', label: 'Outside Consultants', required: false },
  { field: 'additionalInformation', label: 'Additional Information', required: false },
];

// SF252 required fields
const SF252_FIELDS: { field: keyof SF252Data; label: string; required: boolean }[] = [
  { field: 'contractNumber', label: 'Contract Number', required: true },
  { field: 'contractDate', label: 'Contract Date', required: true },
  { field: 'contractAmount', label: 'Contract Amount', required: true },
  { field: 'contractorName', label: 'Contractor Name', required: true },
  { field: 'contractorAddress', label: 'Contractor Address', required: true },
  { field: 'contractorCity', label: 'Contractor City', required: true },
  { field: 'contractorState', label: 'Contractor State', required: true },
  { field: 'contractorZipCode', label: 'Contractor ZIP', required: true },
  { field: 'contractorPhone', label: 'Contractor Phone', required: true },
  { field: 'periodOfPerformanceStart', label: 'Performance Start', required: true },
  { field: 'periodOfPerformanceEnd', label: 'Performance End', required: true },
  { field: 'servicesDescription', label: 'Services Description', required: true },
  { field: 'issuingOfficeName', label: 'Issuing Office', required: true },
  { field: 'contractorSignatureName', label: 'Contractor Signature', required: true },
  { field: 'contractorSignatureDate', label: 'Signature Date', required: true },
  { field: 'deliveryOrderNumber', label: 'Delivery Order Number', required: false },
  { field: 'amendmentNumber', label: 'Amendment Number', required: false },
  { field: 'effectiveDate', label: 'Effective Date', required: false },
  { field: 'contractorTIN', label: 'Contractor TIN', required: false },
  { field: 'obligatedAmount', label: 'Obligated Amount', required: false },
];

function calculateProgress<T extends Record<string, unknown>>(
  data: T | undefined | null,
  fields: { field: keyof T; label: string; required: boolean }[]
): FormProgress {
  // Handle undefined or null data
  if (!data) {
    const allFields: FieldValidation[] = fields.map((f) => ({
      field: String(f.field),
      label: f.label,
      required: f.required,
      filled: false,
    }));
    const requiredFields = allFields.filter((f) => f.required);
    return {
      percentage: 0,
      filledFields: 0,
      totalRequiredFields: requiredFields.length,
      missingFields: requiredFields,
      allFields,
    };
  }

  const allFields: FieldValidation[] = fields.map((f) => ({
    field: String(f.field),
    label: f.label,
    required: f.required,
    filled: isFilled(data[f.field]),
  }));

  const requiredFields = allFields.filter((f) => f.required);
  const filledRequired = requiredFields.filter((f) => f.filled);
  const missingFields = requiredFields.filter((f) => !f.filled);

  const percentage = requiredFields.length > 0
    ? Math.round((filledRequired.length / requiredFields.length) * 100)
    : 100;

  return {
    percentage,
    filledFields: filledRequired.length,
    totalRequiredFields: requiredFields.length,
    missingFields,
    allFields,
  };
}

export function getSF330PartIProgress(data: SF330PartIData | undefined): FormProgress {
  return calculateProgress(data, SF330_PART_I_FIELDS);
}

export function getSF330PartIIProgress(data: SF330PartIIData | undefined): FormProgress {
  return calculateProgress(data, SF330_PART_II_FIELDS);
}

export function getSF330Progress(partI: SF330PartIData | undefined, partII: SF330PartIIData | undefined): FormProgress {
  const progress1 = getSF330PartIProgress(partI);
  const progress2 = getSF330PartIIProgress(partII);

  const totalRequired = progress1.totalRequiredFields + progress2.totalRequiredFields;
  const totalFilled = progress1.filledFields + progress2.filledFields;
  const percentage = totalRequired > 0 ? Math.round((totalFilled / totalRequired) * 100) : 100;

  return {
    percentage,
    filledFields: totalFilled,
    totalRequiredFields: totalRequired,
    missingFields: [...progress1.missingFields, ...progress2.missingFields],
    allFields: [...progress1.allFields, ...progress2.allFields],
  };
}

export function getSF254Progress(data: SF254Data | undefined): FormProgress {
  return calculateProgress(data, SF254_FIELDS);
}

export function getSF255Progress(data: SF255Data | undefined): FormProgress {
  return calculateProgress(data, SF255_FIELDS);
}

export function getSF252Progress(data: SF252Data | undefined): FormProgress {
  return calculateProgress(data, SF252_FIELDS);
}

export function getFormProgress(
  formType: string,
  formData: UnifiedFormData | undefined
): FormProgress {
  if (!formData) {
    return { percentage: 0, filledFields: 0, totalRequiredFields: 0, missingFields: [], allFields: [] };
  }

  switch (formType) {
    case 'SF330':
      return getSF330Progress(formData.sf330PartI, formData.sf330PartII);
    case 'SF254':
      return getSF254Progress(formData.sf254);
    case 'SF255':
      return getSF255Progress(formData.sf255);
    case 'SF252':
      return getSF252Progress(formData.sf252);
    default:
      return { percentage: 0, filledFields: 0, totalRequiredFields: 0, missingFields: [], allFields: [] };
  }
}

export type { FormProgress, FieldValidation };
