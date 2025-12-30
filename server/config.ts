/**
 * Server Configuration
 *
 * This file handles runtime configuration for the MCP server,
 * including API credentials and region settings.
 *
 * @see Subtask 1.1.3: Environment Configuration
 */

import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';
import { resolve } from 'path';

// ============================================================================
// CONFIGURATION SCHEMA
// ============================================================================

/**
 * Valid API regions for Verkada
 */
export const API_REGIONS = ['api', 'api.eu', 'api.au'] as const;
export type ApiRegion = (typeof API_REGIONS)[number];

/**
 * Valid log levels
 */
export const LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

/**
 * Zod schema for server configuration
 */
export const configSchema = z.object({
  // Verkada API credentials
  apiToken: z.string().optional(),
  apiKey: z.string().optional(),

  // API region
  region: z.enum(API_REGIONS).default('api'),

  // Server settings
  serverName: z.string().default('verkada-mcp-server'),
  serverVersion: z.string().default('0.1.0'),

  // HTTP client settings
  timeout: z.number().min(1000).max(300000).default(30000),
  maxRetries: z.number().min(0).max(10).default(3),
  retryDelay: z.number().min(100).max(30000).default(1000),

  // Logging
  logLevel: z.enum(LOG_LEVELS).default('info'),

  // Development settings
  debug: z.boolean().default(false),
});

export type ServerConfig = z.infer<typeof configSchema>;

// ============================================================================
// ENVIRONMENT LOADING
// ============================================================================

let envLoaded = false;

/**
 * Load environment variables from .env file
 *
 * @param envPath - Optional path to .env file (defaults to project root)
 * @returns True if .env file was loaded, false if not found
 */
export function loadEnvFile(envPath?: string): boolean {
  if (envLoaded) {
    return true;
  }

  const path = envPath || resolve(process.cwd(), '.env');
  const result = dotenvConfig({ path });

  if (result.error) {
    // .env file not found is not an error - env vars might be set directly
    if ((result.error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.warn(`Warning: Error loading .env file: ${result.error.message}`);
    }
    return false;
  }

  envLoaded = true;
  return true;
}

/**
 * Reset the env loaded state (for testing)
 */
export function resetEnvLoaded(): void {
  envLoaded = false;
}

// ============================================================================
// CONFIGURATION LOADING
// ============================================================================

/**
 * Load configuration from environment variables
 *
 * @param overrides - Optional configuration overrides
 * @param options - Loading options
 * @returns Validated server configuration
 */
export function loadServerConfig(
  overrides: Partial<ServerConfig> = {},
  options: { loadEnv?: boolean; envPath?: string } = {}
): ServerConfig {
  // Load .env file if requested (default: true)
  if (options.loadEnv !== false) {
    loadEnvFile(options.envPath);
  }

  const envConfig: Record<string, unknown> = {};

  // Load string values
  if (process.env.VERKADA_API_TOKEN) {
    envConfig.apiToken = process.env.VERKADA_API_TOKEN;
  }
  if (process.env.VERKADA_API_KEY) {
    envConfig.apiKey = process.env.VERKADA_API_KEY;
  }
  if (process.env.VERKADA_REGION) {
    envConfig.region = process.env.VERKADA_REGION;
  }
  if (process.env.LOG_LEVEL) {
    envConfig.logLevel = process.env.LOG_LEVEL;
  }
  if (process.env.SERVER_NAME) {
    envConfig.serverName = process.env.SERVER_NAME;
  }
  if (process.env.SERVER_VERSION) {
    envConfig.serverVersion = process.env.SERVER_VERSION;
  }

  // Load numeric values
  if (process.env.VERKADA_TIMEOUT) {
    const timeout = parseInt(process.env.VERKADA_TIMEOUT, 10);
    if (!isNaN(timeout)) {
      envConfig.timeout = timeout;
    }
  }
  if (process.env.VERKADA_MAX_RETRIES) {
    const maxRetries = parseInt(process.env.VERKADA_MAX_RETRIES, 10);
    if (!isNaN(maxRetries)) {
      envConfig.maxRetries = maxRetries;
    }
  }
  if (process.env.VERKADA_RETRY_DELAY) {
    const retryDelay = parseInt(process.env.VERKADA_RETRY_DELAY, 10);
    if (!isNaN(retryDelay)) {
      envConfig.retryDelay = retryDelay;
    }
  }

  // Load boolean values
  if (process.env.DEBUG) {
    envConfig.debug = process.env.DEBUG === 'true' || process.env.DEBUG === '1';
  }

  // Merge configurations (overrides take precedence)
  const merged = {
    ...envConfig,
    ...overrides,
  };

  // Validate and return
  const result = configSchema.safeParse(merged);

  if (!result.success) {
    const errors = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid configuration:\n${errors}`);
  }

  return result.data;
}

// ============================================================================
// URL HELPERS
// ============================================================================

/**
 * Get the base URL for the Verkada API
 */
export function getApiBaseUrl(region: ApiRegion): string {
  return `https://${region}.verkada.com`;
}

/**
 * Get the full API URL for an endpoint
 */
export function getApiUrl(region: ApiRegion, endpoint: string): string {
  const baseUrl = getApiBaseUrl(region);
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${normalizedEndpoint}`;
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate that required credentials are present
 */
export function validateCredentials(config: ServerConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for credentials
  if (!config.apiToken && !config.apiKey) {
    errors.push(
      'Either VERKADA_API_TOKEN or VERKADA_API_KEY must be set. ' +
        'See .env.example for configuration.'
    );
  }

  // Warn if both are set
  if (config.apiToken && config.apiKey) {
    warnings.push(
      'Both VERKADA_API_TOKEN and VERKADA_API_KEY are set. ' +
        'API Token will be used.'
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate the full configuration
 */
export function validateConfig(config: ServerConfig): ValidationResult {
  const credentialResult = validateCredentials(config);
  const errors = [...credentialResult.errors];
  const warnings = [...credentialResult.warnings];

  // Validate timeout is reasonable
  if (config.timeout < 5000) {
    warnings.push('Timeout is very short (< 5s). API calls may timeout frequently.');
  }

  // Validate retry settings
  if (config.maxRetries > 5) {
    warnings.push('Max retries is high (> 5). This may cause slow failure recovery.');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate credentials and throw if invalid
 */
export function requireValidCredentials(config: ServerConfig): void {
  const result = validateCredentials(config);

  if (!result.valid) {
    throw new Error(result.errors.join('\n'));
  }

  // Log warnings
  for (const warning of result.warnings) {
    console.warn(`Warning: ${warning}`);
  }
}

// ============================================================================
// AUTH HEADER HELPERS
// ============================================================================

/**
 * Get the authorization header value for API requests
 */
export function getAuthHeader(config: ServerConfig): string {
  if (config.apiToken) {
    return `Bearer ${config.apiToken}`;
  }
  if (config.apiKey) {
    return config.apiKey;
  }
  throw new Error('No API credentials configured');
}

/**
 * Get headers for API requests
 */
export function getApiHeaders(config: ServerConfig): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (config.apiToken) {
    headers['Authorization'] = `Bearer ${config.apiToken}`;
  } else if (config.apiKey) {
    headers['x-api-key'] = config.apiKey;
  }

  return headers;
}

// ============================================================================
// SINGLETON CONFIG
// ============================================================================

let globalConfig: ServerConfig | null = null;

/**
 * Initialize the global configuration
 */
export function initConfig(
  overrides: Partial<ServerConfig> = {},
  options: { loadEnv?: boolean; envPath?: string } = {}
): ServerConfig {
  globalConfig = loadServerConfig(overrides, options);
  return globalConfig;
}

/**
 * Get the global configuration (must be initialized first)
 */
export function getConfig(): ServerConfig {
  if (!globalConfig) {
    throw new Error(
      'Configuration not initialized. Call initConfig() first.'
    );
  }
  return globalConfig;
}

/**
 * Check if global configuration is initialized
 */
export function isConfigInitialized(): boolean {
  return globalConfig !== null;
}

/**
 * Reset global configuration (for testing)
 */
export function resetConfig(): void {
  globalConfig = null;
}
