/**
 * HTTP Client for Verkada API
 *
 * This client handles all HTTP communication with the Verkada API,
 * including authentication, region support, error handling, and retries.
 *
 * @see Subtask 1.2.1: Base HTTP Client
 */

import {
  loadServerConfig,
  getApiBaseUrl,
  type ServerConfig,
} from './config.js';

import {
  isTokenManagerInitialized,
  getTokenManager,
} from './token-manager.js';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Supported HTTP methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Query parameter types
 */
export type QueryParamValue = string | number | boolean | undefined | null;
export type QueryParams = Record<string, QueryParamValue | QueryParamValue[]>;

/**
 * Request options for API calls
 */
export interface RequestOptions {
  /** HTTP method */
  method: HttpMethod;
  /** API endpoint path (e.g., '/access/v1/users') */
  path: string;
  /** Query parameters */
  params?: QueryParams;
  /** Request body (will be JSON stringified) */
  body?: unknown;
  /** Additional headers */
  headers?: Record<string, string>;
  /** Override timeout for this request */
  timeout?: number;
  /** Skip retry logic for this request */
  skipRetry?: boolean;
}

/**
 * API error response structure
 */
export interface ApiError {
  /** HTTP status code */
  status: number;
  /** Error message */
  message: string;
  /** Error code (if provided by API) */
  code?: string;
  /** Additional error details */
  details?: unknown;
}

/**
 * Response metadata
 */
export interface ResponseMeta {
  /** HTTP status code */
  status: number;
  /** Response headers */
  headers: Headers;
  /** Request URL */
  url: string;
  /** Request duration in milliseconds */
  duration: number;
}

/**
 * Full response including data and metadata
 */
export interface ApiResponse<T> {
  /** Response data */
  data: T;
  /** Response metadata */
  meta: ResponseMeta;
}

// ============================================================================
// ERROR CLASSES
// ============================================================================

/**
 * Error thrown when Verkada API returns an error response
 */
export class VerkadaApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'VerkadaApiError';
    Object.setPrototypeOf(this, VerkadaApiError.prototype);
  }

  /**
   * Check if this is a rate limit error
   */
  isRateLimited(): boolean {
    return this.status === 429;
  }

  /**
   * Check if this is a server error
   */
  isServerError(): boolean {
    return this.status >= 500 && this.status < 600;
  }

  /**
   * Check if this is an authentication error
   */
  isAuthError(): boolean {
    return this.status === 401 || this.status === 403;
  }

  /**
   * Check if this is a not found error
   */
  isNotFound(): boolean {
    return this.status === 404;
  }

  /**
   * Check if this is a validation error
   */
  isValidationError(): boolean {
    return this.status === 400 || this.status === 422;
  }

  /**
   * Convert to plain object
   */
  toJSON(): ApiError {
    return {
      status: this.status,
      message: this.message,
      code: this.code,
      details: this.details,
    };
  }
}

/**
 * Error thrown when request times out
 */
export class TimeoutError extends Error {
  constructor(
    public readonly url: string,
    public readonly timeoutMs: number
  ) {
    super(`Request to ${url} timed out after ${timeoutMs}ms`);
    this.name = 'TimeoutError';
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

/**
 * Error thrown on network failures
 */
export class NetworkError extends Error {
  constructor(
    message: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

// ============================================================================
// HTTP CLIENT
// ============================================================================

/**
 * Client options for initialization
 */
export interface VerkadaClientOptions {
  /** Configuration overrides */
  config?: Partial<ServerConfig>;
  /** Skip loading .env file */
  skipEnvLoad?: boolean;
}

/**
 * HTTP client for Verkada API
 */
export class VerkadaClient {
  private readonly config: ServerConfig;
  private readonly baseUrl: string;

  constructor(options: VerkadaClientOptions = {}) {
    this.config = loadServerConfig(options.config || {}, {
      loadEnv: !options.skipEnvLoad,
    });
    this.baseUrl = getApiBaseUrl(this.config.region);
  }

  /**
   * Get the current configuration
   */
  getConfig(): ServerConfig {
    return { ...this.config };
  }

  /**
   * Get the base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Make an HTTP request to the Verkada API
   */
  async request<T>(options: RequestOptions): Promise<T> {
    const response = await this.requestWithMeta<T>(options);
    return response.data;
  }

  /**
   * Make an HTTP request and return response with metadata
   */
  async requestWithMeta<T>(options: RequestOptions): Promise<ApiResponse<T>> {
    const url = this.buildUrl(options.path, options.params);
    const headers = await this.buildHeaders(options.headers);
    const timeout = options.timeout ?? this.config.timeout;

    const fetchOptions: RequestInit = {
      method: options.method,
      headers,
    };

    if (options.body !== undefined) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    const maxRetries = options.skipRetry ? 0 : this.config.maxRetries;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const startTime = Date.now();

      try {
        const response = await this.fetchWithTimeout(url, fetchOptions, timeout);
        const duration = Date.now() - startTime;

        if (!response.ok) {
          const error = await this.parseErrorResponse(response);

          // Handle 401 by refreshing token and retrying (only once)
          if (response.status === 401 && isTokenManagerInitialized() && attempt === 0) {
            try {
              const tokenManager = getTokenManager();
              await tokenManager.forceRefresh();
              // Rebuild headers with new token and retry
              const newHeaders = await this.buildHeaders(options.headers);
              Object.assign(fetchOptions.headers as Record<string, string>, newHeaders);
              continue;
            } catch {
              // If token refresh fails, throw the original auth error
            }
          }

          // Retry on certain status codes
          if (this.shouldRetry(response.status) && attempt < maxRetries) {
            await this.delay(this.calculateRetryDelay(attempt));
            continue;
          }

          throw new VerkadaApiError(
            error.status,
            error.message,
            error.code,
            error.details
          );
        }

        // Parse response body
        const data = await this.parseResponseBody<T>(response);

        return {
          data,
          meta: {
            status: response.status,
            headers: response.headers,
            url,
            duration,
          },
        };
      } catch (error) {
        lastError = error as Error;

        // Don't retry VerkadaApiError (already handled above)
        if (error instanceof VerkadaApiError) {
          throw error;
        }

        // Handle timeout
        if (this.isAbortError(error)) {
          throw new TimeoutError(url, timeout);
        }

        // Retry on network errors
        if (this.isNetworkError(error) && attempt < maxRetries) {
          await this.delay(this.calculateRetryDelay(attempt));
          continue;
        }

        // Wrap network errors
        if (this.isNetworkError(error)) {
          throw new NetworkError(
            `Network error while calling ${url}`,
            error as Error
          );
        }

        throw error;
      }
    }

    throw lastError || new Error('Unknown error');
  }

  // ============================================================================
  // CONVENIENCE METHODS
  // ============================================================================

  /**
   * Make a GET request
   */
  async get<T>(path: string, params?: QueryParams): Promise<T> {
    return this.request<T>({ method: 'GET', path, params });
  }

  /**
   * Make a POST request
   */
  async post<T>(path: string, body?: unknown, params?: QueryParams): Promise<T> {
    return this.request<T>({ method: 'POST', path, body, params });
  }

  /**
   * Make a PUT request
   */
  async put<T>(path: string, body?: unknown, params?: QueryParams): Promise<T> {
    return this.request<T>({ method: 'PUT', path, body, params });
  }

  /**
   * Make a PATCH request
   */
  async patch<T>(path: string, body?: unknown, params?: QueryParams): Promise<T> {
    return this.request<T>({ method: 'PATCH', path, body, params });
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(path: string, params?: QueryParams): Promise<T> {
    return this.request<T>({ method: 'DELETE', path, params });
  }

  // ============================================================================
  // PRIVATE METHODS
  // ============================================================================

  /**
   * Build the full URL with query parameters
   */
  private buildUrl(path: string, params?: QueryParams): string {
    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const url = new URL(normalizedPath, this.baseUrl);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) {
          continue;
        }

        if (Array.isArray(value)) {
          // Handle array parameters
          for (const item of value) {
            if (item !== undefined && item !== null) {
              url.searchParams.append(key, String(item));
            }
          }
        } else {
          url.searchParams.append(key, String(value));
        }
      }
    }

    return url.toString();
  }

  /**
   * Build request headers (without auth - auth added separately)
   */
  private buildBaseHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'mcp-server-verkada',
    };
    return {
      ...headers,
      ...customHeaders,
    };
  }

  /**
   * Build request headers with authentication
   */
  private async buildHeaders(customHeaders?: Record<string, string>): Promise<Record<string, string>> {
    const headers = this.buildBaseHeaders(customHeaders);

    // Use token manager if initialized (preferred for 2-tier auth)
    if (isTokenManagerInitialized()) {
      const tokenManager = getTokenManager();
      const token = await tokenManager.getToken();
      headers['x-verkada-auth'] = token;
      return headers;
    }

    // Fallback to direct token/key from config
    if (this.config.apiToken) {
      headers['Authorization'] = `Bearer ${this.config.apiToken}`;
    } else if (this.config.apiKey) {
      headers['x-api-key'] = this.config.apiKey;
    }

    return headers;
  }

  /**
   * Fetch with timeout support
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      return await fetch(url, {
        ...options,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Parse response body
   */
  private async parseResponseBody<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type') || '';

    // Handle images FIRST (before consuming the body)
    if (contentType.startsWith('image/')) {
      try {
        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');

        // Return in MCP-compatible format for images
        return {
          type: 'image',
          data: base64,
          mimeType: contentType,
        } as T;
      } catch (error) {
        console.error('Failed to parse image response:', error);
        throw error;
      }
    }

    // For non-images, read as text
    const text = await response.text();

    if (!text) {
      return {} as T;
    }

    if (contentType.includes('application/json')) {
      try {
        return JSON.parse(text) as T;
      } catch {
        // Fall through to return text as-is
        console.error('Failed to parse JSON response');
      }
    }

    // Return text wrapped in object for non-JSON responses
    return { data: text } as T;
  }

  /**
   * Parse error response
   */
  private async parseErrorResponse(response: Response): Promise<ApiError> {
    try {
      const text = await response.text();
      if (!text) {
        return {
          status: response.status,
          message: response.statusText || 'Unknown error',
        };
      }

      const body = JSON.parse(text);
      return {
        status: response.status,
        message: body.message || body.error || response.statusText,
        code: body.code || body.error_code,
        details: body,
      };
    } catch {
      return {
        status: response.status,
        message: response.statusText || 'Unknown error',
      };
    }
  }

  /**
   * Check if status code should trigger retry
   */
  private shouldRetry(status: number): boolean {
    // Retry on rate limiting and server errors
    return status === 429 || (status >= 500 && status <= 599);
  }

  /**
   * Calculate retry delay with exponential backoff
   */
  private calculateRetryDelay(attempt: number): number {
    // Exponential backoff: delay * 2^attempt
    const delay = this.config.retryDelay * Math.pow(2, attempt);
    // Add jitter (±10%)
    const jitter = delay * 0.1 * (Math.random() * 2 - 1);
    return Math.min(delay + jitter, 30000); // Cap at 30 seconds
  }

  /**
   * Check if error is an abort error (timeout)
   */
  private isAbortError(error: unknown): boolean {
    return (
      error instanceof Error &&
      (error.name === 'AbortError' || error.message.includes('aborted'))
    );
  }

  /**
   * Check if error is a network error
   */
  private isNetworkError(error: unknown): boolean {
    if (!(error instanceof Error)) return false;

    return (
      error instanceof TypeError ||
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('ECONNREFUSED') ||
      error.message.includes('ENOTFOUND')
    );
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// ============================================================================
// SINGLETON CLIENT
// ============================================================================

let defaultClient: VerkadaClient | null = null;

/**
 * Get or create the default client instance
 */
export function getClient(options?: VerkadaClientOptions): VerkadaClient {
  if (!defaultClient) {
    defaultClient = new VerkadaClient(options);
  }
  return defaultClient;
}

/**
 * Create a new client instance (not the singleton)
 */
export function createClient(options?: VerkadaClientOptions): VerkadaClient {
  return new VerkadaClient(options);
}

/**
 * Reset the default client (useful for testing)
 */
export function resetClient(): void {
  defaultClient = null;
}

// ============================================================================
// VERKADA API HELPER
// ============================================================================

/**
 * Options for calling the Verkada API
 */
export interface CallVerkadaAPIOptions {
  /** HTTP method */
  method: HttpMethod;
  /** API endpoint path */
  path: string;
  /** Query parameters */
  params?: QueryParams;
  /** Request body */
  body?: unknown;
  /** Additional headers */
  headers?: Record<string, string>;
}

/**
 * API Response wrapper for tool functions
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

/**
 * Call the Verkada API
 *
 * This is the helper function that generated tool files use
 * to call the Verkada API. It wraps the VerkadaClient and
 * returns a standardized APIResponse.
 *
 * @param options - Request options
 * @returns APIResponse with success/error information
 */
export async function callVerkadaAPI<T>(
  options: CallVerkadaAPIOptions
): Promise<APIResponse<T>> {
  try {
    const client = getClient();
    const data = await client.request<T>({
      method: options.method,
      path: options.path,
      params: options.params,
      body: options.body,
      headers: options.headers,
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof VerkadaApiError) {
      return {
        success: false,
        error: {
          status: error.status,
          message: error.message,
          code: error.code,
          details: error.details,
        },
      };
    }

    if (error instanceof TimeoutError) {
      return {
        success: false,
        error: {
          status: 408,
          message: error.message,
          code: 'TIMEOUT',
        },
      };
    }

    if (error instanceof NetworkError) {
      return {
        success: false,
        error: {
          status: 0,
          message: error.message,
          code: 'NETWORK_ERROR',
        },
      };
    }

    // Unknown error
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: {
        status: 500,
        message,
        code: 'UNKNOWN_ERROR',
      },
    };
  }
}
