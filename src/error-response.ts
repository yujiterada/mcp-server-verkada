/**
 * Error Response Handling
 *
 * Provides unified error response handling for the MCP server.
 * Includes error categorization, HTTP status mapping, recovery hints,
 * and consistent error serialization for MCP responses.
 *
 * @see Subtask 3.1.6: Error Response Handling
 */

import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

import { VerkadaApiError, TimeoutError, NetworkError } from './client.js';
import type { ValidationError } from './validation.js';

// ============================================================================
// ERROR CATEGORIES
// ============================================================================

/**
 * Error category for classification
 */
export enum ErrorCategory {
  /** Client-side errors (4xx) */
  CLIENT = 'client',
  /** Server-side errors (5xx) */
  SERVER = 'server',
  /** Input validation errors */
  VALIDATION = 'validation',
  /** Authentication/authorization errors */
  AUTH = 'auth',
  /** Rate limiting errors */
  RATE_LIMIT = 'rate_limit',
  /** Network/connectivity errors */
  NETWORK = 'network',
  /** Timeout errors */
  TIMEOUT = 'timeout',
  /** Resource not found errors */
  NOT_FOUND = 'not_found',
  /** Internal/unknown errors */
  INTERNAL = 'internal',
}

/**
 * Error severity level
 */
export enum ErrorSeverity {
  /** Low severity - informational */
  LOW = 'low',
  /** Medium severity - warning */
  MEDIUM = 'medium',
  /** High severity - error */
  HIGH = 'high',
  /** Critical severity - requires immediate attention */
  CRITICAL = 'critical',
}

// ============================================================================
// ERROR RESPONSE TYPES
// ============================================================================

/**
 * Unified error response structure
 */
export interface ErrorResponse {
  /** Error category */
  category: ErrorCategory;
  /** Error severity */
  severity: ErrorSeverity;
  /** HTTP status code */
  status: number;
  /** Error code (machine-readable) */
  code: string;
  /** Error message (human-readable) */
  message: string;
  /** Detailed description */
  description?: string;
  /** Recovery hints for the user/agent */
  recoveryHints?: string[];
  /** Field-level errors (for validation) */
  fieldErrors?: Array<{
    field: string;
    message: string;
    code?: string;
  }>;
  /** Original error details */
  details?: unknown;
  /** Request ID for tracing */
  requestId?: string;
  /** Timestamp of the error */
  timestamp: string;
  /** Whether the error is retryable */
  retryable: boolean;
  /** Suggested retry delay in ms (if retryable) */
  retryAfter?: number;
}

/**
 * Error response options
 */
export interface ErrorResponseOptions {
  /** Request ID for tracing */
  requestId?: string;
  /** Include detailed error information */
  includeDetails?: boolean;
  /** Include recovery hints */
  includeRecoveryHints?: boolean;
}

// ============================================================================
// ERROR CODE MAPPINGS
// ============================================================================

/**
 * Standard error codes
 */
export const ErrorCodes = {
  // Client errors
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  CONFLICT: 'CONFLICT',
  GONE: 'GONE',
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',

  // Server errors
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NOT_IMPLEMENTED: 'NOT_IMPLEMENTED',
  BAD_GATEWAY: 'BAD_GATEWAY',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  GATEWAY_TIMEOUT: 'GATEWAY_TIMEOUT',

  // Custom errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  TOOL_NOT_FOUND: 'TOOL_NOT_FOUND',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

/**
 * HTTP status to error code mapping
 */
const statusToCode: Record<number, ErrorCode> = {
  400: ErrorCodes.BAD_REQUEST,
  401: ErrorCodes.UNAUTHORIZED,
  403: ErrorCodes.FORBIDDEN,
  404: ErrorCodes.NOT_FOUND,
  405: ErrorCodes.METHOD_NOT_ALLOWED,
  409: ErrorCodes.CONFLICT,
  410: ErrorCodes.GONE,
  422: ErrorCodes.UNPROCESSABLE_ENTITY,
  429: ErrorCodes.TOO_MANY_REQUESTS,
  500: ErrorCodes.INTERNAL_SERVER_ERROR,
  501: ErrorCodes.NOT_IMPLEMENTED,
  502: ErrorCodes.BAD_GATEWAY,
  503: ErrorCodes.SERVICE_UNAVAILABLE,
  504: ErrorCodes.GATEWAY_TIMEOUT,
};

/**
 * Get error code from HTTP status
 */
export function getErrorCodeFromStatus(status: number): ErrorCode {
  return statusToCode[status] || ErrorCodes.UNKNOWN_ERROR;
}

// ============================================================================
// RECOVERY HINTS
// ============================================================================

/**
 * Recovery hints for different error types
 */
const recoveryHintsByCode: Record<string, string[]> = {
  [ErrorCodes.UNAUTHORIZED]: [
    'Check that your API key or token is valid',
    'Ensure the API key has not expired',
    'Verify you are using the correct authentication method',
  ],
  [ErrorCodes.FORBIDDEN]: [
    'Check that your API key has the required permissions',
    'Verify you have access to this resource',
    'Contact your administrator if you need additional permissions',
  ],
  [ErrorCodes.NOT_FOUND]: [
    'Check that the resource ID is correct',
    'Verify the resource exists and has not been deleted',
    'Ensure you are using the correct API endpoint',
  ],
  [ErrorCodes.TOO_MANY_REQUESTS]: [
    'Wait before retrying the request',
    'Reduce the frequency of API calls',
    'Consider implementing request batching',
  ],
  [ErrorCodes.VALIDATION_ERROR]: [
    'Check the input parameters for errors',
    'Ensure all required fields are provided',
    'Verify the format of date, UUID, and other typed fields',
  ],
  [ErrorCodes.TIMEOUT_ERROR]: [
    'The request took too long to complete',
    'Try again with a smaller request',
    'Check your network connection',
  ],
  [ErrorCodes.NETWORK_ERROR]: [
    'Check your internet connection',
    'Verify the API endpoint is accessible',
    'Try again in a few moments',
  ],
  [ErrorCodes.INTERNAL_SERVER_ERROR]: [
    'This is a server-side error',
    'Try again in a few moments',
    'If the problem persists, contact support',
  ],
  [ErrorCodes.SERVICE_UNAVAILABLE]: [
    'The service is temporarily unavailable',
    'Try again in a few moments',
    'Check the Verkada status page for updates',
  ],
};

/**
 * Get recovery hints for an error code
 */
export function getRecoveryHints(code: string): string[] {
  return recoveryHintsByCode[code] || [
    'Check the error message for details',
    'Verify your input parameters',
    'Try the request again',
  ];
}

// ============================================================================
// ERROR CATEGORIZATION
// ============================================================================

/**
 * Get error category from HTTP status
 */
export function getCategoryFromStatus(status: number): ErrorCategory {
  if (status === 401 || status === 403) {
    return ErrorCategory.AUTH;
  }
  if (status === 404) {
    return ErrorCategory.NOT_FOUND;
  }
  if (status === 429) {
    return ErrorCategory.RATE_LIMIT;
  }
  if (status >= 400 && status < 500) {
    return ErrorCategory.CLIENT;
  }
  if (status >= 500) {
    return ErrorCategory.SERVER;
  }
  return ErrorCategory.INTERNAL;
}

/**
 * Get error severity from category
 */
export function getSeverityFromCategory(category: ErrorCategory): ErrorSeverity {
  switch (category) {
    case ErrorCategory.VALIDATION:
      return ErrorSeverity.LOW;
    case ErrorCategory.NOT_FOUND:
    case ErrorCategory.CLIENT:
      return ErrorSeverity.MEDIUM;
    case ErrorCategory.AUTH:
    case ErrorCategory.RATE_LIMIT:
    case ErrorCategory.TIMEOUT:
    case ErrorCategory.NETWORK:
      return ErrorSeverity.HIGH;
    case ErrorCategory.SERVER:
    case ErrorCategory.INTERNAL:
      return ErrorSeverity.CRITICAL;
    default:
      return ErrorSeverity.MEDIUM;
  }
}

/**
 * Check if an error is retryable
 */
export function isRetryable(category: ErrorCategory, status?: number): boolean {
  // Rate limit and server errors are retryable
  if (category === ErrorCategory.RATE_LIMIT) {
    return true;
  }
  if (category === ErrorCategory.SERVER) {
    return true;
  }
  if (category === ErrorCategory.NETWORK) {
    return true;
  }
  if (category === ErrorCategory.TIMEOUT) {
    return true;
  }

  // Specific status codes
  if (status === 429 || status === 503 || status === 504) {
    return true;
  }

  return false;
}

/**
 * Get suggested retry delay based on error
 */
export function getRetryDelay(category: ErrorCategory, attempt: number = 0): number {
  const baseDelay = category === ErrorCategory.RATE_LIMIT ? 5000 : 1000;
  // Exponential backoff with jitter
  const delay = baseDelay * Math.pow(2, attempt);
  const jitter = delay * 0.1 * Math.random();
  return Math.min(delay + jitter, 30000); // Cap at 30 seconds
}

// ============================================================================
// ERROR RESPONSE CREATION
// ============================================================================

/**
 * Create an error response from a VerkadaApiError
 */
export function fromVerkadaApiError(
  error: VerkadaApiError,
  options: ErrorResponseOptions = {}
): ErrorResponse {
  const category = getCategoryFromStatus(error.status);
  const code = error.code || getErrorCodeFromStatus(error.status);
  const retryable = isRetryable(category, error.status);

  return {
    category,
    severity: getSeverityFromCategory(category),
    status: error.status,
    code,
    message: error.message,
    recoveryHints: options.includeRecoveryHints !== false ? getRecoveryHints(code) : undefined,
    details: options.includeDetails !== false ? error.details : undefined,
    requestId: options.requestId,
    timestamp: new Date().toISOString(),
    retryable,
    retryAfter: retryable ? getRetryDelay(category) : undefined,
  };
}

/**
 * Create an error response from a TimeoutError
 */
export function fromTimeoutError(
  error: TimeoutError,
  options: ErrorResponseOptions = {}
): ErrorResponse {
  return {
    category: ErrorCategory.TIMEOUT,
    severity: ErrorSeverity.HIGH,
    status: 408,
    code: ErrorCodes.TIMEOUT_ERROR,
    message: error.message,
    description: `Request timed out after ${error.timeoutMs}ms`,
    recoveryHints: options.includeRecoveryHints !== false
      ? getRecoveryHints(ErrorCodes.TIMEOUT_ERROR)
      : undefined,
    details: options.includeDetails !== false ? { url: error.url, timeoutMs: error.timeoutMs } : undefined,
    requestId: options.requestId,
    timestamp: new Date().toISOString(),
    retryable: true,
    retryAfter: getRetryDelay(ErrorCategory.TIMEOUT),
  };
}

/**
 * Create an error response from a NetworkError
 */
export function fromNetworkError(
  error: NetworkError,
  options: ErrorResponseOptions = {}
): ErrorResponse {
  return {
    category: ErrorCategory.NETWORK,
    severity: ErrorSeverity.HIGH,
    status: 0,
    code: ErrorCodes.NETWORK_ERROR,
    message: error.message,
    recoveryHints: options.includeRecoveryHints !== false
      ? getRecoveryHints(ErrorCodes.NETWORK_ERROR)
      : undefined,
    details: options.includeDetails !== false && error.cause
      ? { cause: error.cause.message }
      : undefined,
    requestId: options.requestId,
    timestamp: new Date().toISOString(),
    retryable: true,
    retryAfter: getRetryDelay(ErrorCategory.NETWORK),
  };
}

/**
 * Create an error response from a ValidationError
 */
export function fromValidationError(
  error: ValidationError,
  options: ErrorResponseOptions = {}
): ErrorResponse {
  return {
    category: ErrorCategory.VALIDATION,
    severity: ErrorSeverity.LOW,
    status: 422,
    code: ErrorCodes.VALIDATION_ERROR,
    message: error.message,
    recoveryHints: options.includeRecoveryHints !== false
      ? getRecoveryHints(ErrorCodes.VALIDATION_ERROR)
      : undefined,
    fieldErrors: error.fieldErrors.map((fe) => ({
      field: fe.path,
      message: fe.message,
      code: fe.code,
    })),
    requestId: options.requestId,
    timestamp: new Date().toISOString(),
    retryable: false,
  };
}

/**
 * Create an error response from a ZodError
 */
export function fromZodError(
  error: z.ZodError,
  options: ErrorResponseOptions = {}
): ErrorResponse {
  const fieldErrors = error.issues.map((issue) => ({
    field: issue.path.join('.') || '(root)',
    message: issue.message,
    code: issue.code,
  }));

  const message = fieldErrors.length === 1
    ? `Validation error: ${fieldErrors[0].field}: ${fieldErrors[0].message}`
    : `Validation failed with ${fieldErrors.length} errors`;

  return {
    category: ErrorCategory.VALIDATION,
    severity: ErrorSeverity.LOW,
    status: 422,
    code: ErrorCodes.VALIDATION_ERROR,
    message,
    recoveryHints: options.includeRecoveryHints !== false
      ? getRecoveryHints(ErrorCodes.VALIDATION_ERROR)
      : undefined,
    fieldErrors,
    requestId: options.requestId,
    timestamp: new Date().toISOString(),
    retryable: false,
  };
}

/**
 * Create an error response from any error
 */
export function fromError(
  error: unknown,
  options: ErrorResponseOptions = {}
): ErrorResponse {
  if (error instanceof VerkadaApiError) {
    return fromVerkadaApiError(error, options);
  }
  if (error instanceof TimeoutError) {
    return fromTimeoutError(error, options);
  }
  if (error instanceof NetworkError) {
    return fromNetworkError(error, options);
  }
  if (error instanceof z.ZodError) {
    return fromZodError(error, options);
  }

  // Handle generic errors
  const message = error instanceof Error ? error.message : String(error);
  return {
    category: ErrorCategory.INTERNAL,
    severity: ErrorSeverity.CRITICAL,
    status: 500,
    code: ErrorCodes.INTERNAL_SERVER_ERROR,
    message,
    recoveryHints: options.includeRecoveryHints !== false
      ? getRecoveryHints(ErrorCodes.INTERNAL_SERVER_ERROR)
      : undefined,
    details: options.includeDetails !== false && error instanceof Error
      ? { name: error.name, stack: error.stack }
      : undefined,
    requestId: options.requestId,
    timestamp: new Date().toISOString(),
    retryable: false,
  };
}

// ============================================================================
// MCP RESPONSE FORMATTING
// ============================================================================

/**
 * Format an error response as an MCP CallToolResult
 */
export function toCallToolResult(response: ErrorResponse): CallToolResult {
  // Create a clean error object for the response
  const errorObject: Record<string, unknown> = {
    error: true,
    category: response.category,
    code: response.code,
    message: response.message,
    status: response.status,
  };

  if (response.description) {
    errorObject.description = response.description;
  }

  if (response.fieldErrors && response.fieldErrors.length > 0) {
    errorObject.fieldErrors = response.fieldErrors;
  }

  if (response.recoveryHints && response.recoveryHints.length > 0) {
    errorObject.recoveryHints = response.recoveryHints;
  }

  if (response.retryable) {
    errorObject.retryable = true;
    if (response.retryAfter) {
      errorObject.retryAfter = response.retryAfter;
    }
  }

  if (response.requestId) {
    errorObject.requestId = response.requestId;
  }

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(errorObject, null, 2),
      },
    ],
    isError: true,
  };
}

/**
 * Create an MCP error result directly from an error
 */
export function errorToCallToolResult(
  error: unknown,
  options: ErrorResponseOptions = {}
): CallToolResult {
  const response = fromError(error, options);
  return toCallToolResult(response);
}

// ============================================================================
// ERROR RESPONSE BUILDERS
// ============================================================================

/**
 * Create a not found error response
 */
export function notFound(
  resource: string,
  id?: string,
  options: ErrorResponseOptions = {}
): ErrorResponse {
  const message = id
    ? `${resource} with ID "${id}" not found`
    : `${resource} not found`;

  return {
    category: ErrorCategory.NOT_FOUND,
    severity: ErrorSeverity.MEDIUM,
    status: 404,
    code: ErrorCodes.NOT_FOUND,
    message,
    recoveryHints: options.includeRecoveryHints !== false
      ? getRecoveryHints(ErrorCodes.NOT_FOUND)
      : undefined,
    requestId: options.requestId,
    timestamp: new Date().toISOString(),
    retryable: false,
  };
}

/**
 * Create an unauthorized error response
 */
export function unauthorized(
  message: string = 'Authentication required',
  options: ErrorResponseOptions = {}
): ErrorResponse {
  return {
    category: ErrorCategory.AUTH,
    severity: ErrorSeverity.HIGH,
    status: 401,
    code: ErrorCodes.UNAUTHORIZED,
    message,
    recoveryHints: options.includeRecoveryHints !== false
      ? getRecoveryHints(ErrorCodes.UNAUTHORIZED)
      : undefined,
    requestId: options.requestId,
    timestamp: new Date().toISOString(),
    retryable: false,
  };
}

/**
 * Create a forbidden error response
 */
export function forbidden(
  message: string = 'Access denied',
  options: ErrorResponseOptions = {}
): ErrorResponse {
  return {
    category: ErrorCategory.AUTH,
    severity: ErrorSeverity.HIGH,
    status: 403,
    code: ErrorCodes.FORBIDDEN,
    message,
    recoveryHints: options.includeRecoveryHints !== false
      ? getRecoveryHints(ErrorCodes.FORBIDDEN)
      : undefined,
    requestId: options.requestId,
    timestamp: new Date().toISOString(),
    retryable: false,
  };
}

/**
 * Create a bad request error response
 */
export function badRequest(
  message: string,
  details?: unknown,
  options: ErrorResponseOptions = {}
): ErrorResponse {
  return {
    category: ErrorCategory.CLIENT,
    severity: ErrorSeverity.MEDIUM,
    status: 400,
    code: ErrorCodes.BAD_REQUEST,
    message,
    details: options.includeDetails !== false ? details : undefined,
    recoveryHints: options.includeRecoveryHints !== false
      ? getRecoveryHints(ErrorCodes.BAD_REQUEST)
      : undefined,
    requestId: options.requestId,
    timestamp: new Date().toISOString(),
    retryable: false,
  };
}

/**
 * Create a rate limit error response
 */
export function rateLimited(
  retryAfter?: number,
  options: ErrorResponseOptions = {}
): ErrorResponse {
  const delay = retryAfter || getRetryDelay(ErrorCategory.RATE_LIMIT);
  return {
    category: ErrorCategory.RATE_LIMIT,
    severity: ErrorSeverity.HIGH,
    status: 429,
    code: ErrorCodes.TOO_MANY_REQUESTS,
    message: 'Rate limit exceeded',
    description: `Please wait ${Math.ceil(delay / 1000)} seconds before retrying`,
    recoveryHints: options.includeRecoveryHints !== false
      ? getRecoveryHints(ErrorCodes.TOO_MANY_REQUESTS)
      : undefined,
    requestId: options.requestId,
    timestamp: new Date().toISOString(),
    retryable: true,
    retryAfter: delay,
  };
}

/**
 * Create an internal server error response
 */
export function internalError(
  message: string = 'An internal error occurred',
  options: ErrorResponseOptions = {}
): ErrorResponse {
  return {
    category: ErrorCategory.INTERNAL,
    severity: ErrorSeverity.CRITICAL,
    status: 500,
    code: ErrorCodes.INTERNAL_SERVER_ERROR,
    message,
    recoveryHints: options.includeRecoveryHints !== false
      ? getRecoveryHints(ErrorCodes.INTERNAL_SERVER_ERROR)
      : undefined,
    requestId: options.requestId,
    timestamp: new Date().toISOString(),
    retryable: true,
    retryAfter: getRetryDelay(ErrorCategory.SERVER),
  };
}

/**
 * Create a tool not found error response
 */
export function toolNotFound(
  toolName: string,
  availableTools?: string[],
  options: ErrorResponseOptions = {}
): ErrorResponse {
  return {
    category: ErrorCategory.NOT_FOUND,
    severity: ErrorSeverity.MEDIUM,
    status: 404,
    code: ErrorCodes.TOOL_NOT_FOUND,
    message: `Tool "${toolName}" not found`,
    details: availableTools ? { availableTools } : undefined,
    recoveryHints: [
      'Check that the tool name is spelled correctly',
      'Use the tools/list endpoint to see available tools',
      availableTools ? `Available tools: ${availableTools.slice(0, 5).join(', ')}${availableTools.length > 5 ? '...' : ''}` : '',
    ].filter(Boolean),
    requestId: options.requestId,
    timestamp: new Date().toISOString(),
    retryable: false,
  };
}

// ============================================================================
// ERROR RESPONSE SERIALIZATION
// ============================================================================

/**
 * Serialize an error response to JSON string
 */
export function serializeErrorResponse(response: ErrorResponse): string {
  return JSON.stringify(response);
}

/**
 * Deserialize a JSON string to an error response
 */
export function deserializeErrorResponse(json: string): ErrorResponse | null {
  try {
    const parsed = JSON.parse(json);
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'category' in parsed &&
      'status' in parsed &&
      'code' in parsed &&
      'message' in parsed
    ) {
      return parsed as ErrorResponse;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Check if an object is an ErrorResponse
 */
export function isErrorResponse(value: unknown): value is ErrorResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'category' in value &&
    'status' in value &&
    'code' in value &&
    'message' in value &&
    'timestamp' in value
  );
}
