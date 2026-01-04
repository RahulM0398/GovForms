import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb, PDFForm } from 'pdf-lib';
import type { SF330PartIData, SF330PartIIData, SF254Data, SF255Data, SF252Data, UnifiedFormData } from '@/types';

// PDF dimensions and styling constants
const PAGE_WIDTH = 612; // Letter size width in points
const PAGE_HEIGHT = 792; // Letter size height in points
const MARGIN = 50;
const FIELD_HEIGHT = 20;
const SECTION_SPACING = 25;

interface FieldConfig {
  name: string;
  label: string;
  value: string;
  x: number;
  y: number;
  width: number;
  height?: number;
  multiline?: boolean;
}

// Helper function to add a text field to the form
function addTextField(
  form: PDFForm,
  page: PDFPage,
  font: PDFFont,
  config: FieldConfig
): void {
  const { name, label, value, x, y, width, height = FIELD_HEIGHT, multiline = false } = config;

  // Add label
  page.drawText(label, {
    x,
    y: y + height + 3,
    size: 8,
    font,
    color: rgb(0.4, 0.4, 0.4),
  });

  // Create text field
  const textField = form.createTextField(name);
  textField.setText(value || '');
  textField.addToPage(page, {
    x,
    y,
    width,
    height,
    borderWidth: 1,
    borderColor: rgb(0.8, 0.8, 0.8),
  });

  if (multiline) {
    textField.enableMultiline();
  }
}

// Helper function to add a section header
function addSectionHeader(
  page: PDFPage,
  _font: PDFFont,
  boldFont: PDFFont,
  title: string,
  y: number
): number {
  page.drawRectangle({
    x: MARGIN - 5,
    y: y - 5,
    width: PAGE_WIDTH - 2 * MARGIN + 10,
    height: 22,
    color: rgb(0.95, 0.95, 0.98),
    borderColor: rgb(0.85, 0.85, 0.9),
    borderWidth: 1,
  });

  page.drawText(title, {
    x: MARGIN,
    y: y,
    size: 11,
    font: boldFont,
    color: rgb(0.2, 0.2, 0.3),
  });

  return y - SECTION_SPACING - 10;
}

// Helper function to add form title
function addFormTitle(
  page: PDFPage,
  boldFont: PDFFont,
  title: string,
  subtitle: string
): void {
  // Title background
  page.drawRectangle({
    x: 0,
    y: PAGE_HEIGHT - 80,
    width: PAGE_WIDTH,
    height: 80,
    color: rgb(0.4, 0.35, 0.6),
  });

  page.drawText(title, {
    x: MARGIN,
    y: PAGE_HEIGHT - 45,
    size: 20,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  page.drawText(subtitle, {
    x: MARGIN,
    y: PAGE_HEIGHT - 65,
    size: 10,
    font: boldFont,
    color: rgb(0.9, 0.9, 0.95),
  });
}

// Export SF330 to fillable PDF
export async function exportSF330ToPDF(
  partI: SF330PartIData,
  partII: SF330PartIIData
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Page 1 - Part I
  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const form = pdfDoc.getForm();
  
  addFormTitle(page, boldFont, 'SF330 - Part I', 'Architect-Engineer Qualifications');

  let y = PAGE_HEIGHT - 110;

  // Section A - Contract Information
  y = addSectionHeader(page, font, boldFont, 'Section A — Contract Information', y);
  
  const col1Width = (PAGE_WIDTH - 2 * MARGIN - 20) / 2;
  
  addTextField(form, page, font, {
    name: 'contractNumber',
    label: 'Contract Number',
    value: partI.contractNumber,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'taskOrderNumber',
    label: 'Task Order Number',
    value: partI.taskOrderNumber,
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  y -= 60;

  // Section B - Firm Information
  y = addSectionHeader(page, font, boldFont, 'Section B — Architect-Engineer Point of Contact', y);

  addTextField(form, page, font, {
    name: 'firmName',
    label: 'Firm Name',
    value: partI.firmName,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: PAGE_WIDTH - 2 * MARGIN,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'streetAddress',
    label: 'Street Address',
    value: partI.streetAddress,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: PAGE_WIDTH - 2 * MARGIN,
  });

  y -= 55;

  const col3Width = (PAGE_WIDTH - 2 * MARGIN - 40) / 3;
  
  addTextField(form, page, font, {
    name: 'city',
    label: 'City',
    value: partI.city,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  addTextField(form, page, font, {
    name: 'state',
    label: 'State',
    value: partI.state,
    x: MARGIN + col3Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  addTextField(form, page, font, {
    name: 'zipCode',
    label: 'ZIP Code',
    value: partI.zipCode,
    x: MARGIN + 2 * (col3Width + 20),
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  y -= 60;

  // Contact Information
  addTextField(form, page, font, {
    name: 'pointOfContactName',
    label: 'Point of Contact Name',
    value: partI.pointOfContactName,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'pointOfContactTitle',
    label: 'Title',
    value: partI.pointOfContactTitle,
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'pointOfContactPhone',
    label: 'Phone',
    value: partI.pointOfContactPhone,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'pointOfContactEmail',
    label: 'Email',
    value: partI.pointOfContactEmail,
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  // Page 2 - Part II
  page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addFormTitle(page, boldFont, 'SF330 - Part II', 'General Qualifications');

  y = PAGE_HEIGHT - 110;

  // Section 4 - Firm Information
  y = addSectionHeader(page, font, boldFont, 'Section 4 — Firm Information', y);

  addTextField(form, page, font, {
    name: 'firmNamePartII',
    label: 'Firm Name',
    value: partII.firmName,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'yearEstablished',
    label: 'Year Established',
    value: partII.yearEstablished,
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'dunsNumber',
    label: 'DUNS Number',
    value: partII.dunsNumber,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'taxIdNumber',
    label: 'Tax ID Number',
    value: partII.taxIdNumber,
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  y -= 70;

  // Section 5 - Ownership
  y = addSectionHeader(page, font, boldFont, 'Section 5 — Ownership', y);

  addTextField(form, page, font, {
    name: 'ownershipType',
    label: 'Ownership Type',
    value: partII.ownershipType,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'smallBusinessStatus',
    label: 'Small Business Status',
    value: partII.smallBusinessStatus,
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  y -= 70;

  // Section 6 - Principal Office
  y = addSectionHeader(page, font, boldFont, 'Section 6 — Principal Office', y);

  addTextField(form, page, font, {
    name: 'principalOfficeName',
    label: 'Office Name',
    value: partII.principalOfficeName,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: PAGE_WIDTH - 2 * MARGIN,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'principalOfficeAddress',
    label: 'Address',
    value: partII.principalOfficeAddress,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: PAGE_WIDTH - 2 * MARGIN,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'principalOfficeCity',
    label: 'City',
    value: partII.principalOfficeCity,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  addTextField(form, page, font, {
    name: 'principalOfficeState',
    label: 'State',
    value: partII.principalOfficeState,
    x: MARGIN + col3Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  addTextField(form, page, font, {
    name: 'principalOfficeZipCode',
    label: 'ZIP Code',
    value: partII.principalOfficeZipCode,
    x: MARGIN + 2 * (col3Width + 20),
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  y -= 70;

  // Section 8 - Total Personnel
  y = addSectionHeader(page, font, boldFont, 'Section 8 — Total Personnel', y);

  const col5Width = (PAGE_WIDTH - 2 * MARGIN - 80) / 5;

  addTextField(form, page, font, {
    name: 'totalEmployees',
    label: 'Total',
    value: String(partII.totalEmployees),
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col5Width,
  });

  addTextField(form, page, font, {
    name: 'totalArchitects',
    label: 'Architects',
    value: String(partII.totalArchitects),
    x: MARGIN + col5Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col5Width,
  });

  addTextField(form, page, font, {
    name: 'totalEngineers',
    label: 'Engineers',
    value: String(partII.totalEngineers),
    x: MARGIN + 2 * (col5Width + 20),
    y: y - FIELD_HEIGHT - 15,
    width: col5Width,
  });

  addTextField(form, page, font, {
    name: 'totalOtherProfessionals',
    label: 'Other Prof.',
    value: String(partII.totalOtherProfessionals),
    x: MARGIN + 3 * (col5Width + 20),
    y: y - FIELD_HEIGHT - 15,
    width: col5Width,
  });

  addTextField(form, page, font, {
    name: 'totalAdministrative',
    label: 'Admin',
    value: String(partII.totalAdministrative),
    x: MARGIN + 4 * (col5Width + 20),
    y: y - FIELD_HEIGHT - 15,
    width: col5Width,
  });

  // Add footer
  page.drawText('Generated by VForms Document Intelligence', {
    x: MARGIN,
    y: 30,
    size: 8,
    font,
    color: rgb(0.6, 0.6, 0.6),
  });

  page.drawText(new Date().toLocaleDateString(), {
    x: PAGE_WIDTH - MARGIN - 60,
    y: 30,
    size: 8,
    font,
    color: rgb(0.6, 0.6, 0.6),
  });

  return pdfDoc.save();
}

// Export SF254 to fillable PDF
export async function exportSF254ToPDF(data: SF254Data): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const form = pdfDoc.getForm();

  addFormTitle(page, boldFont, 'SF254', 'Architect-Engineer and Related Services Questionnaire');

  let y = PAGE_HEIGHT - 110;
  const col1Width = (PAGE_WIDTH - 2 * MARGIN - 20) / 2;
  const col3Width = (PAGE_WIDTH - 2 * MARGIN - 40) / 3;

  // Firm Information Section
  y = addSectionHeader(page, font, boldFont, 'Firm Information', y);

  addTextField(form, page, font, {
    name: 'firmName',
    label: 'Firm Name',
    value: data.firmName,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: PAGE_WIDTH - 2 * MARGIN,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'streetAddress',
    label: 'Street Address',
    value: data.streetAddress,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: PAGE_WIDTH - 2 * MARGIN,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'city',
    label: 'City',
    value: data.city,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  addTextField(form, page, font, {
    name: 'state',
    label: 'State',
    value: data.state,
    x: MARGIN + col3Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  addTextField(form, page, font, {
    name: 'zipCode',
    label: 'ZIP Code',
    value: data.zipCode,
    x: MARGIN + 2 * (col3Width + 20),
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  y -= 70;

  // Contact Information Section
  y = addSectionHeader(page, font, boldFont, 'Contact Information', y);

  addTextField(form, page, font, {
    name: 'contactName',
    label: 'Contact Name',
    value: data.contactName,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'contactTitle',
    label: 'Title',
    value: data.contactTitle,
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'contactPhone',
    label: 'Phone',
    value: data.contactPhone,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'contactEmail',
    label: 'Email',
    value: data.contactEmail,
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  y -= 70;

  // Business Information Section
  y = addSectionHeader(page, font, boldFont, 'Business Information', y);

  addTextField(form, page, font, {
    name: 'yearEstablished',
    label: 'Year Established',
    value: data.yearEstablished,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  addTextField(form, page, font, {
    name: 'dateSubmitted',
    label: 'Date Submitted',
    value: data.dateSubmitted,
    x: MARGIN + col3Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  addTextField(form, page, font, {
    name: 'totalPersonnel',
    label: 'Total Personnel',
    value: String(data.totalPersonnel),
    x: MARGIN + 2 * (col3Width + 20),
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  y -= 70;

  // Revenue Information
  y = addSectionHeader(page, font, boldFont, 'Revenue Information', y);

  addTextField(form, page, font, {
    name: 'annualAverageRevenue',
    label: 'Annual Average Revenue ($)',
    value: String(data.annualAverageRevenue),
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  addTextField(form, page, font, {
    name: 'federalWorkPercentage',
    label: 'Federal Work (%)',
    value: String(data.federalWorkPercentage),
    x: MARGIN + col3Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  addTextField(form, page, font, {
    name: 'nonFederalWorkPercentage',
    label: 'Non-Federal Work (%)',
    value: String(data.nonFederalWorkPercentage),
    x: MARGIN + 2 * (col3Width + 20),
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  // Footer
  page.drawText('Generated by VForms Document Intelligence', {
    x: MARGIN,
    y: 30,
    size: 8,
    font,
    color: rgb(0.6, 0.6, 0.6),
  });

  page.drawText(new Date().toLocaleDateString(), {
    x: PAGE_WIDTH - MARGIN - 60,
    y: 30,
    size: 8,
    font,
    color: rgb(0.6, 0.6, 0.6),
  });

  return pdfDoc.save();
}

// Export SF255 to fillable PDF
export async function exportSF255ToPDF(data: SF255Data): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const form = pdfDoc.getForm();

  addFormTitle(page, boldFont, 'SF255', 'Project-Specific Questionnaire');

  let y = PAGE_HEIGHT - 110;
  const col1Width = (PAGE_WIDTH - 2 * MARGIN - 20) / 2;
  const col3Width = (PAGE_WIDTH - 2 * MARGIN - 40) / 3;

  // Project Information Section
  y = addSectionHeader(page, font, boldFont, 'Project Information', y);

  addTextField(form, page, font, {
    name: 'projectTitle',
    label: 'Project Title',
    value: data.projectTitle,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: PAGE_WIDTH - 2 * MARGIN,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'projectLocation',
    label: 'Project Location',
    value: data.projectLocation,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'solicitationNumber',
    label: 'Solicitation Number',
    value: data.solicitationNumber,
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  y -= 70;

  // Submitting Firm Section
  y = addSectionHeader(page, font, boldFont, 'Submitting Firm', y);

  addTextField(form, page, font, {
    name: 'firmName',
    label: 'Firm Name',
    value: data.firmName,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: PAGE_WIDTH - 2 * MARGIN,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'firmAddress',
    label: 'Address',
    value: data.firmAddress,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: PAGE_WIDTH - 2 * MARGIN,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'firmCity',
    label: 'City',
    value: data.firmCity,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  addTextField(form, page, font, {
    name: 'firmState',
    label: 'State',
    value: data.firmState,
    x: MARGIN + col3Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  addTextField(form, page, font, {
    name: 'firmZipCode',
    label: 'ZIP Code',
    value: data.firmZipCode,
    x: MARGIN + 2 * (col3Width + 20),
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  y -= 70;

  // Point of Contact Section
  y = addSectionHeader(page, font, boldFont, 'Point of Contact', y);

  addTextField(form, page, font, {
    name: 'pocName',
    label: 'Name',
    value: data.pocName,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'pocTitle',
    label: 'Title',
    value: data.pocTitle,
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'pocPhone',
    label: 'Phone',
    value: data.pocPhone,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'pocEmail',
    label: 'Email',
    value: data.pocEmail,
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  y -= 70;

  // Authorization Section
  y = addSectionHeader(page, font, boldFont, 'Authorization', y);

  addTextField(form, page, font, {
    name: 'authorizedRepName',
    label: 'Authorized Representative',
    value: data.authorizedRepName,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'authorizedRepTitle',
    label: 'Title',
    value: data.authorizedRepTitle,
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'authorizedRepDate',
    label: 'Date',
    value: data.authorizedRepDate,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  // Footer
  page.drawText('Generated by VForms Document Intelligence', {
    x: MARGIN,
    y: 30,
    size: 8,
    font,
    color: rgb(0.6, 0.6, 0.6),
  });

  page.drawText(new Date().toLocaleDateString(), {
    x: PAGE_WIDTH - MARGIN - 60,
    y: 30,
    size: 8,
    font,
    color: rgb(0.6, 0.6, 0.6),
  });

  return pdfDoc.save();
}

// Export SF252 to fillable PDF
export async function exportSF252ToPDF(data: SF252Data): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const form = pdfDoc.getForm();

  addFormTitle(page, boldFont, 'SF252', 'Architect-Engineer Contract');

  let y = PAGE_HEIGHT - 110;
  const col1Width = (PAGE_WIDTH - 2 * MARGIN - 20) / 2;
  const col3Width = (PAGE_WIDTH - 2 * MARGIN - 40) / 3;
  const col4Width = (PAGE_WIDTH - 2 * MARGIN - 60) / 4;

  // Contract Identification Section
  y = addSectionHeader(page, font, boldFont, 'Contract Identification', y);

  addTextField(form, page, font, {
    name: 'contractNumber',
    label: 'Contract Number',
    value: data.contractNumber,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  addTextField(form, page, font, {
    name: 'deliveryOrderNumber',
    label: 'Delivery Order No.',
    value: data.deliveryOrderNumber,
    x: MARGIN + col3Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  addTextField(form, page, font, {
    name: 'amendmentNumber',
    label: 'Amendment No.',
    value: data.amendmentNumber,
    x: MARGIN + 2 * (col3Width + 20),
    y: y - FIELD_HEIGHT - 15,
    width: col3Width,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'contractDate',
    label: 'Contract Date',
    value: data.contractDate,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'effectiveDate',
    label: 'Effective Date',
    value: data.effectiveDate,
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  y -= 70;

  // Contractor Information Section
  y = addSectionHeader(page, font, boldFont, 'Contractor Information', y);

  addTextField(form, page, font, {
    name: 'contractorName',
    label: 'Contractor Name',
    value: data.contractorName,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: PAGE_WIDTH - 2 * MARGIN,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'contractorAddress',
    label: 'Address',
    value: data.contractorAddress,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: PAGE_WIDTH - 2 * MARGIN,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'contractorCity',
    label: 'City',
    value: data.contractorCity,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col4Width,
  });

  addTextField(form, page, font, {
    name: 'contractorState',
    label: 'State',
    value: data.contractorState,
    x: MARGIN + col4Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col4Width,
  });

  addTextField(form, page, font, {
    name: 'contractorZipCode',
    label: 'ZIP Code',
    value: data.contractorZipCode,
    x: MARGIN + 2 * (col4Width + 20),
    y: y - FIELD_HEIGHT - 15,
    width: col4Width,
  });

  addTextField(form, page, font, {
    name: 'contractorPhone',
    label: 'Phone',
    value: data.contractorPhone,
    x: MARGIN + 3 * (col4Width + 20),
    y: y - FIELD_HEIGHT - 15,
    width: col4Width,
  });

  y -= 70;

  // Contract Details Section
  y = addSectionHeader(page, font, boldFont, 'Contract Details', y);

  addTextField(form, page, font, {
    name: 'contractAmount',
    label: 'Contract Amount ($)',
    value: String(data.contractAmount),
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'obligatedAmount',
    label: 'Obligated Amount ($)',
    value: String(data.obligatedAmount),
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'periodOfPerformanceStart',
    label: 'Performance Start',
    value: data.periodOfPerformanceStart,
    x: MARGIN,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  addTextField(form, page, font, {
    name: 'periodOfPerformanceEnd',
    label: 'Performance End',
    value: data.periodOfPerformanceEnd,
    x: MARGIN + col1Width + 20,
    y: y - FIELD_HEIGHT - 15,
    width: col1Width,
  });

  y -= 55;

  addTextField(form, page, font, {
    name: 'servicesDescription',
    label: 'Services Description',
    value: data.servicesDescription,
    x: MARGIN,
    y: y - 40 - 15,
    width: PAGE_WIDTH - 2 * MARGIN,
    height: 40,
    multiline: true,
  });

  // Footer
  page.drawText('Generated by VForms Document Intelligence', {
    x: MARGIN,
    y: 30,
    size: 8,
    font,
    color: rgb(0.6, 0.6, 0.6),
  });

  page.drawText(new Date().toLocaleDateString(), {
    x: PAGE_WIDTH - MARGIN - 60,
    y: 30,
    size: 8,
    font,
    color: rgb(0.6, 0.6, 0.6),
  });

  return pdfDoc.save();
}

// Main export function
export async function exportFormToPDF(
  formType: string,
  formData: UnifiedFormData
): Promise<{ blob: Blob; filename: string }> {
  let pdfBytes: Uint8Array;
  let filename: string;

  switch (formType) {
    case 'SF330':
      pdfBytes = await exportSF330ToPDF(formData.sf330PartI, formData.sf330PartII);
      filename = `SF330_${new Date().toISOString().split('T')[0]}.pdf`;
      break;
    case 'SF254':
      pdfBytes = await exportSF254ToPDF(formData.sf254);
      filename = `SF254_${new Date().toISOString().split('T')[0]}.pdf`;
      break;
    case 'SF255':
      pdfBytes = await exportSF255ToPDF(formData.sf255);
      filename = `SF255_${new Date().toISOString().split('T')[0]}.pdf`;
      break;
    case 'SF252':
      pdfBytes = await exportSF252ToPDF(formData.sf252);
      filename = `SF252_${new Date().toISOString().split('T')[0]}.pdf`;
      break;
    default:
      throw new Error(`Unknown form type: ${formType}`);
  }

  // Convert Uint8Array to ArrayBuffer for Blob compatibility
  const arrayBuffer = new ArrayBuffer(pdfBytes.length);
  new Uint8Array(arrayBuffer).set(pdfBytes);
  const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
  return { blob, filename };
}

// Utility to trigger download
export function downloadPDF(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

