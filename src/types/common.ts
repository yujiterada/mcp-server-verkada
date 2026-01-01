/**
 * Common Types
 * 
 * Shared type definitions used across the server.
 */

// ============================================================================
// PAGINATION
// ============================================================================

/**
 * Standard pagination parameters
 */
export interface PaginationParams {
  /** Maximum number of items to return */
  limit?: number;
  /** Page size (alias for limit) */
  page_size?: number;
  /** Cursor for next page */
  cursor?: string;
  /** Page token (alias for cursor) */
  page_token?: string;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  /** Items in the current page */
  items: T[];
  /** Cursor for the next page (if more items exist) */
  next_cursor?: string;
  /** Page token for the next page (alias for next_cursor) */
  next_page_token?: string;
  /** Total count of items (if available) */
  total_count?: number;
}

// ============================================================================
// API RESPONSES
// ============================================================================

/**
 * Standard error response from Verkada API
 */
export interface ErrorResponse {
  /** Error message */
  message: string;
  /** Error code */
  code?: string;
  /** HTTP status code */
  status?: number;
  /** Additional error details */
  details?: Record<string, unknown>;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  /** Response data */
  data: T;
  /** Response metadata */
  meta?: {
    request_id?: string;
    timestamp?: string;
  };
}

/**
 * API Response wrapper for tool functions
 * Used by generated tool files
 */
export interface APIResponse<T> {
  /** Whether the API call was successful */
  success: boolean;
  /** Response data (present when success is true) */
  data?: T;
  /** Error information (present when success is false) */
  error?: {
    /** HTTP status code */
    status: number;
    /** Error message */
    message: string;
    /** Error code */
    code?: string;
    /** Additional details */
    details?: unknown;
  };
}

// ============================================================================
// TIMESTAMPS
// ============================================================================

/**
 * Time range for querying events/data
 */
export interface TimeRange {
  /** Start time (ISO 8601 or Unix timestamp) */
  start_time: string | number;
  /** End time (ISO 8601 or Unix timestamp) */
  end_time: string | number;
}

// ============================================================================
// COMMON ENTITIES
// ============================================================================

/**
 * Basic identifier type
 */
export type UUID = string;

/**
 * Entity with common fields
 */
export interface BaseEntity {
  /** Unique identifier */
  id: UUID;
  /** Creation timestamp */
  created_at?: string;
  /** Last update timestamp */
  updated_at?: string;
}

// ============================================================================
// TOOL DEFINITIONS
// ============================================================================

/**
 * Tool definition for MCP
 */
export interface ToolDefinition {
  /** Tool name (snake_case) */
  name: string;
  /** Human-readable description */
  description: string;
  /** Input schema (JSON Schema) */
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
  /** Original operation ID from OpenAPI */
  operationId?: string;
  /** Category for grouping */
  category?: string;
  /** HTTP method */
  method?: string;
  /** API path */
  path?: string;
}

/**
 * Tool call request
 */
export interface ToolCallRequest {
  /** Tool name */
  name: string;
  /** Tool arguments */
  arguments: Record<string, unknown>;
}

/**
 * Tool call response
 */
export interface ToolCallResponse<T = unknown> {
  /** Response content */
  content: T;
  /** Whether the call was successful */
  isError?: boolean;
}
