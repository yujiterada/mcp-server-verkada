/**
 * Input Validation
 *
 * Provides Zod-based input validation utilities for MCP tools.
 * Includes common validators for Verkada API types and
 * user-friendly error formatting.
 *
 * @see Subtask 3.1.5: Input Validation with Zod
 */

import { z, type ZodTypeAny, type ZodError, type ZodIssue } from 'zod';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Validation result for successful validation
 */
export interface ValidationSuccess<T> {
  success: true;
  data: T;
}

/**
 * Validation result for failed validation
 */
export interface ValidationFailure {
  success: false;
  error: ValidationError;
}

/**
 * Validation result (discriminated union)
 */
export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

/**
 * Structured validation error
 */
export interface ValidationError {
  /** Error message */
  message: string;
  /** Field-level errors */
  fieldErrors: FieldError[];
  /** Original Zod error */
  zodError?: ZodError;
}

/**
 * Field-level error
 */
export interface FieldError {
  /** Field path (e.g., 'user.email') */
  path: string;
  /** Error message for this field */
  message: string;
  /** Error code */
  code: string;
  /** Expected value/type */
  expected?: string;
  /** Received value/type */
  received?: string;
}

/**
 * Validation options
 */
export interface ValidationOptions {
  /** Strip unknown keys from objects */
  stripUnknown?: boolean;
  /** Allow partial validation (all fields optional) */
  partial?: boolean;
  /** Custom error messages */
  errorMessages?: Record<string, string>;
}

// ============================================================================
// CORE VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate input against a Zod schema
 *
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @param options - Validation options
 * @returns Validation result with typed data or error
 *
 * @example
 * const schema = z.object({ name: z.string(), age: z.number() });
 * const result = validateInput(schema, { name: 'John', age: 30 });
 * if (result.success) {
 *   console.log(result.data.name);
 * } else {
 *   console.log(result.error.fieldErrors);
 * }
 */
export function validateInput<T extends ZodTypeAny>(
  schema: T,
  data: unknown,
  options: ValidationOptions = {}
): ValidationResult<z.infer<T>> {
  try {
    let effectiveSchema = schema;

    // Apply strip unknown if requested
    if (options.stripUnknown && schema._def.typeName === 'ZodObject') {
      effectiveSchema = (schema as unknown as z.ZodObject<z.ZodRawShape>).strip() as unknown as T;
    }

    // Apply partial if requested
    if (options.partial && schema._def.typeName === 'ZodObject') {
      effectiveSchema = (schema as unknown as z.ZodObject<z.ZodRawShape>).partial() as unknown as T;
    }

    const result = effectiveSchema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: formatZodError(error, options.errorMessages),
      };
    }
    throw error;
  }
}

/**
 * Validate input and throw on failure
 *
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @param options - Validation options
 * @returns Validated and typed data
 * @throws ValidationError if validation fails
 */
export function validateInputOrThrow<T extends ZodTypeAny>(
  schema: T,
  data: unknown,
  options: ValidationOptions = {}
): z.infer<T> {
  const result = validateInput(schema, data, options);
  if (!result.success) {
    const error = new Error(result.error.message);
    error.name = 'ValidationError';
    (error as Error & { validationError: ValidationError }).validationError = result.error;
    throw error;
  }
  return result.data;
}

/**
 * Check if data is valid against a schema (boolean result)
 */
export function isValid<T extends ZodTypeAny>(schema: T, data: unknown): boolean {
  return schema.safeParse(data).success;
}

/**
 * Validate multiple inputs at once
 */
export function validateMany<T extends ZodTypeAny>(
  schema: T,
  items: unknown[]
): { valid: z.infer<T>[]; invalid: Array<{ index: number; error: ValidationError }> } {
  const valid: z.infer<T>[] = [];
  const invalid: Array<{ index: number; error: ValidationError }> = [];

  items.forEach((item, index) => {
    const result = validateInput(schema, item);
    if (result.success) {
      valid.push(result.data);
    } else {
      invalid.push({ index, error: result.error });
    }
  });

  return { valid, invalid };
}

// ============================================================================
// ERROR FORMATTING
// ============================================================================

/**
 * Format a Zod error into a user-friendly ValidationError
 */
export function formatZodError(
  error: ZodError,
  customMessages?: Record<string, string>
): ValidationError {
  const fieldErrors = error.issues.map((issue) => formatZodIssue(issue, customMessages));
  const message = formatErrorMessage(fieldErrors);

  return {
    message,
    fieldErrors,
    zodError: error,
  };
}

/**
 * Format a single Zod issue into a FieldError
 */
function formatZodIssue(
  issue: ZodIssue,
  customMessages?: Record<string, string>
): FieldError {
  const path = issue.path.join('.');
  const customKey = `${path}.${issue.code}`;

  // Check for custom message
  if (customMessages && customMessages[customKey]) {
    return {
      path,
      message: customMessages[customKey],
      code: issue.code,
    };
  }

  // Format based on issue type
  let message = issue.message;
  let expected: string | undefined;
  let received: string | undefined;

  switch (issue.code) {
    case 'invalid_type':
      expected = issue.expected;
      received = issue.received;
      message = `Expected ${issue.expected}, received ${issue.received}`;
      break;
    case 'invalid_literal':
      expected = JSON.stringify(issue.expected);
      message = `Expected ${expected}`;
      break;
    case 'invalid_enum_value':
      expected = issue.options.join(' | ');
      received = JSON.stringify(issue.received);
      message = `Expected one of: ${expected}`;
      break;
    case 'invalid_string':
      if (issue.validation === 'email') {
        message = 'Invalid email address';
      } else if (issue.validation === 'uuid') {
        message = 'Invalid UUID format';
      } else if (issue.validation === 'url') {
        message = 'Invalid URL format';
      } else if (issue.validation === 'datetime') {
        message = 'Invalid datetime format';
      } else if (issue.validation === 'regex') {
        message = 'Invalid format';
      }
      break;
    case 'too_small':
      if (issue.type === 'string') {
        message = issue.minimum === 1
          ? 'Required'
          : `Must be at least ${issue.minimum} characters`;
      } else if (issue.type === 'number') {
        message = `Must be at least ${issue.minimum}`;
      } else if (issue.type === 'array') {
        message = `Must have at least ${issue.minimum} item(s)`;
      }
      break;
    case 'too_big':
      if (issue.type === 'string') {
        message = `Must be at most ${issue.maximum} characters`;
      } else if (issue.type === 'number') {
        message = `Must be at most ${issue.maximum}`;
      } else if (issue.type === 'array') {
        message = `Must have at most ${issue.maximum} item(s)`;
      }
      break;
    case 'custom':
      // Use the custom message as-is
      break;
  }

  return {
    path: path || '(root)',
    message,
    code: issue.code,
    expected,
    received,
  };
}

/**
 * Format field errors into a single error message
 */
function formatErrorMessage(fieldErrors: FieldError[]): string {
  if (fieldErrors.length === 0) {
    return 'Validation failed';
  }

  if (fieldErrors.length === 1) {
    const err = fieldErrors[0];
    return err.path === '(root)'
      ? err.message
      : `${err.path}: ${err.message}`;
  }

  const messages = fieldErrors.map((err) =>
    err.path === '(root)' ? err.message : `${err.path}: ${err.message}`
  );
  return `Validation failed: ${messages.join('; ')}`;
}

/**
 * Get a simple error summary
 */
export function getErrorSummary(error: ValidationError): string {
  return error.message;
}

/**
 * Get field-level errors as a record
 */
export function getFieldErrorMap(error: ValidationError): Record<string, string> {
  const map: Record<string, string> = {};
  for (const fieldError of error.fieldErrors) {
    map[fieldError.path] = fieldError.message;
  }
  return map;
}

// ============================================================================
// COMMON VERKADA API VALIDATORS
// ============================================================================

/**
 * UUID validator (Verkada IDs are typically UUIDs)
 */
export const verkadaId = z.string().uuid('Invalid Verkada ID format');

/**
 * Optional UUID validator
 */
export const optionalVerkadaId = verkadaId.optional();

/**
 * Array of UUIDs
 */
export const verkadaIdArray = z.array(verkadaId);

/**
 * API key validator (basic format check)
 */
export const apiKey = z
  .string()
  .min(1, 'API key is required')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid API key format');

/**
 * API token validator (Bearer token format)
 */
export const apiToken = z
  .string()
  .min(1, 'API token is required');

/**
 * Email validator
 */
export const email = z.string().email('Invalid email address');

/**
 * Optional email validator
 */
export const optionalEmail = email.optional();

/**
 * Phone number validator (basic international format)
 */
export const phoneNumber = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');

/**
 * ISO 8601 timestamp validator
 */
export const isoTimestamp = z.string().datetime('Invalid ISO 8601 timestamp');

/**
 * Unix timestamp validator (seconds)
 */
export const unixTimestamp = z
  .number()
  .int('Timestamp must be an integer')
  .min(0, 'Timestamp must be positive');

/**
 * Unix timestamp in milliseconds
 */
export const unixTimestampMs = z
  .number()
  .int('Timestamp must be an integer')
  .min(0, 'Timestamp must be positive');

/**
 * Flexible timestamp (ISO string or Unix)
 */
export const flexibleTimestamp = z.union([
  isoTimestamp,
  unixTimestamp,
  z.string().regex(/^\d+$/).transform(Number),
]);

/**
 * Page size validator (common pagination)
 */
export const pageSize = z
  .number()
  .int('Page size must be an integer')
  .min(1, 'Page size must be at least 1')
  .max(1000, 'Page size must be at most 1000')
  .default(100);

/**
 * Pagination cursor validator
 */
export const paginationCursor = z.string().optional();

/**
 * Common pagination params schema
 */
export const paginationParams = z.object({
  page_size: pageSize.optional(),
  cursor: paginationCursor,
});

/**
 * Verkada region validator
 */
export const verkadaRegion = z.enum(['api', 'api.eu', 'api.au']);

/**
 * HTTP method validator
 */
export const httpMethod = z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);

/**
 * Boolean from string (handles 'true'/'false' strings)
 */
export const booleanFromString = z
  .union([z.boolean(), z.string()])
  .transform((val) => {
    if (typeof val === 'boolean') return val;
    return val.toLowerCase() === 'true';
  });

/**
 * Number from string
 */
export const numberFromString = z
  .union([z.number(), z.string()])
  .transform((val) => {
    if (typeof val === 'number') return val;
    const num = Number(val);
    if (isNaN(num)) throw new Error('Invalid number');
    return num;
  });

/**
 * Integer from string
 */
export const integerFromString = z
  .union([z.number().int(), z.string()])
  .transform((val) => {
    if (typeof val === 'number') return val;
    const num = parseInt(val, 10);
    if (isNaN(num)) throw new Error('Invalid integer');
    return num;
  });

// ============================================================================
// SCHEMA BUILDERS
// ============================================================================

/**
 * Create a schema for a required string field with min length
 */
export function requiredString(fieldName: string, minLength = 1): z.ZodString {
  return z
    .string({ required_error: `${fieldName} is required` })
    .min(minLength, `${fieldName} is required`);
}

/**
 * Create a schema for an optional string field
 */
export function optionalString(): z.ZodOptional<z.ZodString> {
  return z.string().optional();
}

/**
 * Create a schema for a required number field
 */
export function requiredNumber(
  fieldName: string,
  options: { min?: number; max?: number; integer?: boolean } = {}
): z.ZodNumber {
  let schema = z.number({ required_error: `${fieldName} is required` });

  if (options.integer) {
    schema = schema.int(`${fieldName} must be an integer`);
  }
  if (options.min !== undefined) {
    schema = schema.min(options.min, `${fieldName} must be at least ${options.min}`);
  }
  if (options.max !== undefined) {
    schema = schema.max(options.max, `${fieldName} must be at most ${options.max}`);
  }

  return schema;
}

/**
 * Create a schema for an enum field
 */
export function enumField<T extends [string, ...string[]]>(
  fieldName: string,
  values: T
): z.ZodEnum<T> {
  return z.enum(values, {
    errorMap: () => ({
      message: `${fieldName} must be one of: ${values.join(', ')}`,
    }),
  });
}

/**
 * Create a schema that allows null or the given type
 */
export function nullable<T extends ZodTypeAny>(schema: T): z.ZodNullable<T> {
  return schema.nullable();
}

/**
 * Create a schema for a date range
 */
export const dateRange = z.object({
  start_time: flexibleTimestamp,
  end_time: flexibleTimestamp,
}).refine(
  (data) => {
    const start = typeof data.start_time === 'number' ? data.start_time : Date.parse(data.start_time);
    const end = typeof data.end_time === 'number' ? data.end_time : Date.parse(data.end_time);
    return start <= end;
  },
  { message: 'start_time must be before or equal to end_time' }
);

// ============================================================================
// VALIDATION MIDDLEWARE
// ============================================================================

/**
 * Create a validation wrapper for tool handlers
 */
export function withValidation<TInput, TOutput>(
  schema: z.ZodType<TInput>,
  handler: (input: TInput) => Promise<TOutput>
): (input: unknown) => Promise<TOutput> {
  return async (input: unknown) => {
    const result = validateInput(schema, input);
    if (!result.success) {
      throw new Error(result.error.message);
    }
    return handler(result.data);
  };
}

/**
 * Create a pre-validation hook for request handlers
 */
export function createValidationHook<T extends ZodTypeAny>(
  schema: T
): (input: unknown) => ValidationResult<z.infer<T>> {
  return (input: unknown) => validateInput(schema, input);
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Check if a value is a valid UUID
 */
export function isUUID(value: unknown): value is string {
  return isValid(z.string().uuid(), value);
}

/**
 * Check if a value is a valid email
 */
export function isEmail(value: unknown): value is string {
  return isValid(email, value);
}

/**
 * Check if a value is a valid ISO timestamp
 */
export function isISOTimestamp(value: unknown): value is string {
  return isValid(isoTimestamp, value);
}

/**
 * Check if a value is a valid Verkada region
 */
export function isVerkadaRegion(value: unknown): value is 'api' | 'api.eu' | 'api.au' {
  return isValid(verkadaRegion, value);
}
