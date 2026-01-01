/**
 * Tool Helpers
 *
 * Helper functions for implementing MCP tools that call the Verkada API.
 * These helpers abstract common patterns like path parameter substitution,
 * query parameter building, and API response handling.
 *
 * @see Subtask 3.1.3: callMCPTool Helper Function
 */

import { callVerkadaAPI, type HttpMethod, type QueryParams } from './client.js';
import type { APIResponse } from './types/common.js';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Path parameters for URL substitution
 * Key is the parameter name, value is the value to substitute
 */
export type PathParams = Record<string, string | number>;

/**
 * Options for callMCPTool
 */
export interface CallMCPToolOptions {
  /** HTTP method */
  method: HttpMethod;
  /** API path with optional path parameters (e.g., '/users/{user_id}') */
  path: string;
  /** Path parameters to substitute */
  pathParams?: PathParams;
  /** Query parameters */
  queryParams?: QueryParams;
  /** Request body */
  body?: unknown;
  /** Additional headers */
  headers?: Record<string, string>;
}

/**
 * Simplified options for GET requests
 */
export interface GetToolOptions {
  /** API path with optional path parameters */
  path: string;
  /** Path parameters to substitute */
  pathParams?: PathParams;
  /** Query parameters */
  queryParams?: QueryParams;
}

/**
 * Simplified options for POST/PUT/PATCH requests
 */
export interface MutationToolOptions {
  /** API path with optional path parameters */
  path: string;
  /** Path parameters to substitute */
  pathParams?: PathParams;
  /** Query parameters */
  queryParams?: QueryParams;
  /** Request body */
  body?: unknown;
}

/**
 * Simplified options for DELETE requests
 */
export interface DeleteToolOptions {
  /** API path with optional path parameters */
  path: string;
  /** Path parameters to substitute */
  pathParams?: PathParams;
  /** Query parameters */
  queryParams?: QueryParams;
}

// ============================================================================
// PATH HELPERS
// ============================================================================

/**
 * Substitute path parameters in a URL path
 *
 * @example
 * substitutePathParams('/users/{user_id}/photos/{photo_id}', { user_id: '123', photo_id: '456' })
 * // Returns: '/users/123/photos/456'
 *
 * @param path - Path with parameter placeholders (e.g., '/users/{user_id}')
 * @param params - Parameter values to substitute
 * @returns Path with substituted values
 */
export function substitutePathParams(path: string, params: PathParams): string {
  let result = path;

  for (const [key, value] of Object.entries(params)) {
    // Handle both {param} and {param_name} styles
    const placeholder = new RegExp(`\\{${key}\\}`, 'g');
    result = result.replace(placeholder, encodeURIComponent(String(value)));
  }

  return result;
}

/**
 * Build a query string from parameters
 *
 * @param params - Query parameters
 * @returns Query string (without leading '?') or empty string
 */
export function buildQueryString(params: QueryParams): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      // Handle array parameters
      for (const item of value) {
        if (item !== undefined && item !== null) {
          searchParams.append(key, String(item));
        }
      }
    } else {
      searchParams.append(key, String(value));
    }
  }

  return searchParams.toString();
}

/**
 * Build the full path with query string
 *
 * @param basePath - Base path (may include path parameters)
 * @param pathParams - Path parameters to substitute
 * @param queryParams - Query parameters
 * @returns Full path with substituted params and query string
 */
export function buildFullPath(
  basePath: string,
  pathParams?: PathParams,
  queryParams?: QueryParams
): string {
  // Substitute path parameters
  let path = basePath;
  if (pathParams && Object.keys(pathParams).length > 0) {
    path = substitutePathParams(basePath, pathParams);
  }

  // Add query string
  if (queryParams && Object.keys(queryParams).length > 0) {
    const queryString = buildQueryString(queryParams);
    if (queryString) {
      return `${path}?${queryString}`;
    }
  }

  return path;
}

// ============================================================================
// MAIN HELPER FUNCTION
// ============================================================================

/**
 * Call an MCP tool that makes a Verkada API request
 *
 * This is the main helper function that generated tool files use.
 * It handles:
 * - Path parameter substitution
 * - Query parameter building
 * - Making the API request
 * - Returning a standardized APIResponse
 *
 * @example
 * // GET request with path params
 * const result = await callMCPTool<User>({
 *   method: 'GET',
 *   path: '/access/v1/users/{user_id}',
 *   pathParams: { user_id: '12345' },
 *   queryParams: { include_groups: true }
 * });
 *
 * @example
 * // POST request with body
 * const result = await callMCPTool<CreateUserResponse>({
 *   method: 'POST',
 *   path: '/access/v1/users',
 *   body: { name: 'John Doe', email: 'john@example.com' }
 * });
 *
 * @param options - Request options
 * @returns APIResponse with success/error information
 */
export async function callMCPTool<T>(
  options: CallMCPToolOptions
): Promise<APIResponse<T>> {
  const { method, path, pathParams, queryParams, body, headers } = options;

  // Build the full path with params
  const fullPath = buildFullPath(path, pathParams, queryParams);

  // Make the API call
  return callVerkadaAPI<T>({
    method,
    path: fullPath,
    body,
    headers,
  });
}

// ============================================================================
// CONVENIENCE METHODS
// ============================================================================

/**
 * Make a GET request
 *
 * @example
 * const users = await getMCPTool<User[]>({
 *   path: '/access/v1/users',
 *   queryParams: { page_size: 100 }
 * });
 */
export async function getMCPTool<T>(options: GetToolOptions): Promise<APIResponse<T>> {
  return callMCPTool<T>({
    method: 'GET',
    ...options,
  });
}

/**
 * Make a POST request
 *
 * @example
 * const result = await postMCPTool<CreateUserResponse>({
 *   path: '/access/v1/users',
 *   body: { name: 'John Doe' }
 * });
 */
export async function postMCPTool<T>(options: MutationToolOptions): Promise<APIResponse<T>> {
  return callMCPTool<T>({
    method: 'POST',
    ...options,
  });
}

/**
 * Make a PUT request
 *
 * @example
 * const result = await putMCPTool<UpdateUserResponse>({
 *   path: '/access/v1/users/{user_id}',
 *   pathParams: { user_id: '12345' },
 *   body: { name: 'Jane Doe' }
 * });
 */
export async function putMCPTool<T>(options: MutationToolOptions): Promise<APIResponse<T>> {
  return callMCPTool<T>({
    method: 'PUT',
    ...options,
  });
}

/**
 * Make a PATCH request
 *
 * @example
 * const result = await patchMCPTool<UpdateUserResponse>({
 *   path: '/access/v1/users/{user_id}',
 *   pathParams: { user_id: '12345' },
 *   body: { name: 'Jane Doe' }
 * });
 */
export async function patchMCPTool<T>(options: MutationToolOptions): Promise<APIResponse<T>> {
  return callMCPTool<T>({
    method: 'PATCH',
    ...options,
  });
}

/**
 * Make a DELETE request
 *
 * @example
 * const result = await deleteMCPTool<void>({
 *   path: '/access/v1/users/{user_id}',
 *   pathParams: { user_id: '12345' }
 * });
 */
export async function deleteMCPTool<T>(options: DeleteToolOptions): Promise<APIResponse<T>> {
  return callMCPTool<T>({
    method: 'DELETE',
    ...options,
  });
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate that all required path parameters are provided
 *
 * @param path - Path with parameter placeholders
 * @param params - Provided parameters
 * @returns Array of missing parameter names
 */
export function getMissingPathParams(path: string, params: PathParams = {}): string[] {
  const placeholderRegex = /\{([^}]+)\}/g;
  const missing: string[] = [];
  let match;

  while ((match = placeholderRegex.exec(path)) !== null) {
    const paramName = match[1];
    if (!(paramName in params)) {
      missing.push(paramName);
    }
  }

  return missing;
}

/**
 * Check if all required path parameters are provided
 *
 * @param path - Path with parameter placeholders
 * @param params - Provided parameters
 * @returns True if all required params are present
 */
export function hasAllPathParams(path: string, params: PathParams = {}): boolean {
  return getMissingPathParams(path, params).length === 0;
}

/**
 * Extract path parameter names from a path
 *
 * @param path - Path with parameter placeholders
 * @returns Array of parameter names
 */
export function extractPathParamNames(path: string): string[] {
  const placeholderRegex = /\{([^}]+)\}/g;
  const names: string[] = [];
  let match;

  while ((match = placeholderRegex.exec(path)) !== null) {
    names.push(match[1]);
  }

  return names;
}
