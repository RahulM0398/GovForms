import type { SF330PartIData, SF330PartIIData, SF252Data, EmployeeByDiscipline, FormDataType } from '@/types';

// Simulated extraction responses based on file type
export interface ExtractionResult {
  success: boolean;
  data: Partial<SF330PartIData | SF330PartIIData | SF252Data>;
  confidence: number;
}

// Mock data for different document types
const mockResumeExtraction: Partial<SF330PartIData> = {
  keyPersonnel: [
    {
      id: crypto.randomUUID(),
      name: 'Dr. Sarah Mitchell',
      title: 'Principal Architect',
      yearsExperience: 18,
      firmName: 'Mitchell & Associates',
      education: 'Ph.D. Architecture, MIT',
      certifications: ['LEED AP', 'AIA', 'NCARB'],
      relevantProjects: ['Federal Courthouse Renovation', 'DOD Campus Master Plan'],
    },
  ],
  pointOfContactName: 'Dr. Sarah Mitchell',
  pointOfContactTitle: 'Principal Architect',
  pointOfContactEmail: 'sarah.mitchell@maa-architects.com',
  pointOfContactPhone: '(202) 555-0147',
};

const mockProjectProfileExtraction: Partial<SF330PartIData> = {
  exampleProjects: [
    {
      id: crypto.randomUUID(),
      projectName: 'Federal Reserve Bank Modernization',
      projectOwner: 'Federal Reserve System',
      ownerPointOfContact: 'James Wellington',
      ownerPhone: '(202) 555-0198',
      completionDate: '2024-06',
      projectLocation: 'Washington, DC',
      estimatedCost: 45000000,
      briefDescription: 'Complete renovation and modernization of the historic Federal Reserve building including HVAC upgrades, seismic retrofitting, and sustainable design implementation.',
    },
  ],
  firmName: 'Mitchell & Associates Architects',
  primeContractorName: 'Mitchell & Associates Architects',
};

const mockCertificateExtraction: Partial<SF330PartIIData> = {
  firmName: 'Mitchell & Associates Architects, PLLC',
  yearEstablished: '1995',
  dunsNumber: '078451236',
  taxIdNumber: '52-1234567',
  ownershipType: 'Professional Limited Liability Company',
  smallBusinessStatus: 'Small Business',
  totalEmployees: 127,
  totalArchitects: 35,
  totalEngineers: 42,
  totalOtherProfessionals: 30,
  totalAdministrative: 20,
  employeesByDiscipline: [
    { id: crypto.randomUUID(), functionCode: '12', discipline: 'Architect', employeeCount: 35 },
    { id: crypto.randomUUID(), functionCode: '21', discipline: 'Civil Engineer', employeeCount: 15 },
    { id: crypto.randomUUID(), functionCode: '23', discipline: 'Structural Engineer', employeeCount: 12 },
    { id: crypto.randomUUID(), functionCode: '30', discipline: 'Mechanical Engineer', employeeCount: 8 },
    { id: crypto.randomUUID(), functionCode: '32', discipline: 'Electrical Engineer', employeeCount: 7 },
  ] as EmployeeByDiscipline[],
};

const mockContractExtraction: Partial<SF252Data> = {
  contractNumber: 'GS-00P-00-CYD-0009',
  deliveryOrderNumber: 'DO-2024-0145',
  effectiveDate: '2024-01-15',
  contractorName: 'Mitchell & Associates Architects, PLLC',
  contractorAddress: '1250 Connecticut Avenue NW',
  contractorCity: 'Washington',
  contractorState: 'DC',
  contractorZipCode: '20036',
  contractorPhone: '(202) 555-0100',
  contractorTIN: '52-1234567',
  contractDate: '2024-01-15',
  contractAmount: 2500000,
  obligatedAmount: 750000,
  periodOfPerformanceStart: '2024-02-01',
  periodOfPerformanceEnd: '2026-01-31',
  servicesDescription: 'Architectural and Engineering Services for Federal Building Renovation Project',
};

// Determine extraction type based on file name patterns
function getExtractionType(fileName: string): 'resume' | 'project' | 'certificate' | 'contract' | 'other' {
  const lowerName = fileName.toLowerCase();
  
  if (lowerName.includes('resume') || lowerName.includes('cv') || lowerName.includes('personnel')) {
    return 'resume';
  }
  if (lowerName.includes('project') || lowerName.includes('profile') || lowerName.includes('portfolio')) {
    return 'project';
  }
  if (lowerName.includes('cert') || lowerName.includes('license') || lowerName.includes('firm')) {
    return 'certificate';
  }
  if (lowerName.includes('contract') || lowerName.includes('sf252') || lowerName.includes('agreement')) {
    return 'contract';
  }
  return 'other';
}

// Simulate document extraction with delay
export async function simulateExtraction(fileName: string): Promise<ExtractionResult> {
  // Simulate processing delay (1-3 seconds)
  const delay = 1000 + Math.random() * 2000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const extractionType = getExtractionType(fileName);

  switch (extractionType) {
    case 'resume':
      return {
        success: true,
        data: mockResumeExtraction,
        confidence: 0.92,
      };
    case 'project':
      return {
        success: true,
        data: mockProjectProfileExtraction,
        confidence: 0.88,
      };
    case 'certificate':
      return {
        success: true,
        data: mockCertificateExtraction,
        confidence: 0.95,
      };
    case 'contract':
      return {
        success: true,
        data: mockContractExtraction,
        confidence: 0.91,
      };
    default:
      // Return partial generic data for unknown document types
      return {
        success: true,
        data: {
          firmName: 'Extracted Firm Name',
        } as Partial<SF330PartIData>,
        confidence: 0.65,
      };
  }
}

// Get the target form data type based on extraction content
export function getTargetFormType(
  data: Partial<SF330PartIData | SF330PartIIData | SF252Data>
): FormDataType {
  if ('contractAmount' in data || 'deliveryOrderNumber' in data) {
    return 'SF252';
  }
  if ('employeesByDiscipline' in data || 'yearEstablished' in data) {
    return 'SF330_PART_II';
  }
  return 'SF330_PART_I';
}


