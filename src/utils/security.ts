/**
 * Security utilities for input validation and sanitization
 */

// Sanitize string input to prevent XSS
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number (basic US format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\(\)\+\.]+$/;
  return phone.length >= 10 && phoneRegex.test(phone);
}

// Validate ZIP code (US format)
export function isValidZipCode(zip: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
}

// Validate that a number is within range
export function isValidNumber(value: number, min?: number, max?: number): boolean {
  if (typeof value !== 'number' || isNaN(value)) return false;
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
}

// Validate year (reasonable range for business purposes)
export function isValidYear(year: string): boolean {
  const yearNum = parseInt(year, 10);
  const currentYear = new Date().getFullYear();
  return !isNaN(yearNum) && yearNum >= 1800 && yearNum <= currentYear + 1;
}

// Validate date format (YYYY-MM-DD)
export function isValidDate(date: string): boolean {
  if (!date) return false;
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime());
}

// Validate URL format
export function isValidUrl(url: string): boolean {
  if (!url) return true; // Empty is okay for optional fields
  try {
    // Add protocol if missing for validation
    const urlToTest = url.startsWith('http') ? url : `https://${url}`;
    new URL(urlToTest);
    return true;
  } catch {
    return false;
  }
}

// Sanitize object recursively
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj } as Record<string, unknown>;
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeString(sanitized[key] as string);
    } else if (Array.isArray(sanitized[key])) {
      sanitized[key] = (sanitized[key] as unknown[]).map((item) => {
        if (typeof item === 'string') return sanitizeString(item);
        if (typeof item === 'object' && item !== null) {
          return sanitizeObject(item as Record<string, unknown>);
        }
        return item;
      });
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeObject(sanitized[key] as Record<string, unknown>);
    }
  }
  
  return sanitized as T;
}

// Rate limiting helper (simple in-memory)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(action: string, maxAttempts: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(action);
  
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(action, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (entry.count >= maxAttempts) {
    return false;
  }
  
  entry.count++;
  return true;
}

// File validation
export function isValidFileType(fileName: string, allowedTypes: string[]): boolean {
  const ext = fileName.split('.').pop()?.toLowerCase();
  return ext ? allowedTypes.includes(ext) : false;
}

export function isValidFileSize(sizeBytes: number, maxSizeMB: number = 10): boolean {
  return sizeBytes <= maxSizeMB * 1024 * 1024;
}

// Contract/ID number format validation
export function isValidContractNumber(contractNo: string): boolean {
  // Allow alphanumeric, hyphens, and underscores
  const contractRegex = /^[A-Za-z0-9\-_]+$/;
  return contractNo.length >= 3 && contractRegex.test(contractNo);
}

// DUNS number validation (9 digits)
export function isValidDunsNumber(duns: string): boolean {
  if (!duns) return true; // Optional field
  const dunsRegex = /^\d{9}$/;
  return dunsRegex.test(duns.replace(/\D/g, ''));
}

// Tax ID (EIN) validation (XX-XXXXXXX format)
export function isValidTaxId(taxId: string): boolean {
  if (!taxId) return true; // Optional field
  const taxIdRegex = /^\d{2}-?\d{7}$/;
  return taxIdRegex.test(taxId);
}

// Validate percentage (0-100)
export function isValidPercentage(value: number): boolean {
  return isValidNumber(value, 0, 100);
}

// Validate currency amount (non-negative)
export function isValidCurrency(amount: number): boolean {
  return isValidNumber(amount, 0);
}

// Combine validation errors
export interface ValidationResult {
  isValid: boolean;
  errors: { field: string; message: string }[];
}

export function createValidationResult(errors: { field: string; message: string }[] = []): ValidationResult {
  return {
    isValid: errors.length === 0,
    errors,
  };
}

