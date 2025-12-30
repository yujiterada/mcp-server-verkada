/**
 * Token Manager for Verkada API
 *
 * Manages the two-tier token authentication:
 * 1. API Key (long-lived) - provided via environment variable
 * 2. API Token (short-lived, 30 min) - obtained from /token endpoint
 *
 * The token manager automatically refreshes tokens before they expire.
 */

import { getApiBaseUrl, type ApiRegion } from './config.js';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Cached token data
 */
interface CachedToken {
  /** The API token */
  token: string;
  /** Expiration time in epoch milliseconds */
  expiresAt: number;
}

/**
 * Token manager options
 */
export interface TokenManagerOptions {
  /** API key for authentication */
  apiKey: string;
  /** API region */
  region?: ApiRegion;
  /** Token validity duration in minutes (default: 25, max: 30) */
  tokenValidityMinutes?: number;
  /** Enable debug logging */
  debug?: boolean;
}

// ============================================================================
// TOKEN MANAGER CLASS
// ============================================================================

/**
 * Manages Verkada API token lifecycle
 */
export class TokenManager {
  private readonly apiKey: string;
  private readonly region: ApiRegion;
  private readonly tokenValidityMs: number;
  private readonly debug: boolean;
  private cachedToken: CachedToken | null = null;
  private refreshPromise: Promise<string> | null = null;

  constructor(options: TokenManagerOptions) {
    this.apiKey = options.apiKey;
    this.region = options.region || 'api';
    // Default to 25 minutes (25 * 60 * 1000 ms), leaving 5 min buffer before 30 min expiry
    this.tokenValidityMs = (options.tokenValidityMinutes || 25) * 60 * 1000;
    this.debug = options.debug || false;
  }

  /**
   * Get a valid API token, refreshing if necessary
   */
  async getToken(): Promise<string> {
    // Check if we have a valid cached token
    if (this.cachedToken && !this.isTokenExpired()) {
      if (this.debug) {
        const remainingMs = this.cachedToken.expiresAt - Date.now();
        console.error(`[TokenManager] Using cached token (expires in ${Math.round(remainingMs / 1000)}s)`);
      }
      return this.cachedToken.token;
    }

    // If a refresh is already in progress, wait for it
    if (this.refreshPromise) {
      if (this.debug) {
        console.error('[TokenManager] Waiting for in-progress token refresh');
      }
      return this.refreshPromise;
    }

    // Refresh the token
    this.refreshPromise = this.refreshToken();
    try {
      const token = await this.refreshPromise;
      return token;
    } finally {
      this.refreshPromise = null;
    }
  }

  /**
   * Check if the cached token is expired
   */
  private isTokenExpired(): boolean {
    if (!this.cachedToken) {
      return true;
    }
    // Consider expired if current time is past expiration
    return Date.now() >= this.cachedToken.expiresAt;
  }

  /**
   * Refresh the API token using the API key
   */
  private async refreshToken(): Promise<string> {
    if (this.debug) {
      console.error('[TokenManager] Refreshing API token...');
    }

    const baseUrl = getApiBaseUrl(this.region);
    const url = `${baseUrl}/token`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': this.apiKey,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to obtain API token: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json() as { token?: string };

      if (!data.token) {
        throw new Error('API response did not contain a token');
      }

      // Cache the token with expiration time
      const now = Date.now();
      this.cachedToken = {
        token: data.token,
        expiresAt: now + this.tokenValidityMs,
      };

      if (this.debug) {
        console.error(`[TokenManager] Token refreshed, expires at ${new Date(this.cachedToken.expiresAt).toISOString()}`);
      }

      return data.token;
    } catch (error) {
      // Clear any stale cached token on error
      this.cachedToken = null;
      throw error;
    }
  }

  /**
   * Force a token refresh (useful for handling 401 errors)
   */
  async forceRefresh(): Promise<string> {
    this.cachedToken = null;
    return this.getToken();
  }

  /**
   * Clear the cached token
   */
  clearToken(): void {
    this.cachedToken = null;
    this.refreshPromise = null;
  }

  /**
   * Check if a token is currently cached
   */
  hasToken(): boolean {
    return this.cachedToken !== null && !this.isTokenExpired();
  }

  /**
   * Get token expiration time (or null if no token)
   */
  getExpirationTime(): number | null {
    return this.cachedToken?.expiresAt || null;
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

let defaultTokenManager: TokenManager | null = null;

/**
 * Initialize the default token manager
 */
export function initTokenManager(options: TokenManagerOptions): TokenManager {
  defaultTokenManager = new TokenManager(options);
  return defaultTokenManager;
}

/**
 * Get the default token manager (must be initialized first)
 */
export function getTokenManager(): TokenManager {
  if (!defaultTokenManager) {
    throw new Error(
      'TokenManager not initialized. Call initTokenManager() first.'
    );
  }
  return defaultTokenManager;
}

/**
 * Check if token manager is initialized
 */
export function isTokenManagerInitialized(): boolean {
  return defaultTokenManager !== null;
}

/**
 * Reset the token manager (for testing)
 */
export function resetTokenManager(): void {
  if (defaultTokenManager) {
    defaultTokenManager.clearToken();
  }
  defaultTokenManager = null;
}
