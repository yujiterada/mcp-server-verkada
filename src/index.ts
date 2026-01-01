/**
 * MCP Server for Verkada API
 *
 * This is the main entry point for the MCP server.
 * It handles tool registration, request handling, and response formatting.
 *
 * @see Subtask 3.1.1: MCP Server Initialization
 * @see Subtask 3.1.2: Tool Registration System
 * @see Subtask 3.1.4: Request Handler Implementation
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

import {
  loadServerConfig,
  validateCredentials,
  type ServerConfig,
} from './config.js';

import {
  ToolRegistry,
  type RegisteredTool,
} from './tool-registry.js';

import {
  RequestHandler,
  createRequestHandler,
  type RequestHandlerOptions,
  type HandlerStats,
} from './request-handler.js';

import { registerAllTools, getToolCount } from './tools/index.js';
import { initTokenManager } from './token-manager.js';

// ============================================================================
// TYPES
// ============================================================================

/**
 * MCP Server options
 */
export interface MCPServerOptions {
  /** Server name */
  name?: string;
  /** Server version */
  version?: string;
  /** Server configuration */
  config?: Partial<ServerConfig>;
  /** Skip environment loading */
  skipEnvLoad?: boolean;
  /** Request handler options */
  handlerOptions?: RequestHandlerOptions;
}

// ============================================================================
// MCP SERVER CLASS
// ============================================================================

/**
 * Verkada MCP Server
 *
 * Wraps the MCP SDK Server with Verkada-specific functionality.
 */
export class VerkadaMCPServer {
  private server: Server;
  private config: ServerConfig;
  private registry: ToolRegistry;
  private requestHandler: RequestHandler;
  private isRunning = false;

  constructor(options: MCPServerOptions = {}) {
    // Load configuration
    this.config = loadServerConfig(options.config || {}, {
      loadEnv: !options.skipEnvLoad,
    });

    // Create tool registry
    this.registry = new ToolRegistry();

    // Create request handler
    this.requestHandler = createRequestHandler(
      this.config,
      this.registry,
      options.handlerOptions
    );

    // Create MCP server
    this.server = new Server(
      {
        name: options.name || this.config.serverName,
        version: options.version || this.config.serverVersion,
      },
      {
        capabilities: {
          tools: {
            listChanged: true,
          },
        },
      }
    );

    // Set up request handlers
    this.setupHandlers();
  }

  /**
   * Get the server configuration
   */
  getConfig(): ServerConfig {
    return { ...this.config };
  }

  /**
   * Get the underlying MCP server
   */
  getServer(): Server {
    return this.server;
  }

  /**
   * Get the tool registry
   */
  getRegistry(): ToolRegistry {
    return this.registry;
  }

  /**
   * Check if the server is running
   */
  isServerRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Register a tool
   */
  registerTool(tool: RegisteredTool): void {
    this.registry.register(tool);
  }

  /**
   * Register multiple tools
   */
  registerTools(tools: RegisteredTool[]): void {
    this.registry.registerAll(tools);
  }

  /**
   * Get a registered tool by name
   */
  getTool(name: string): RegisteredTool | undefined {
    return this.registry.get(name);
  }

  /**
   * Get all registered tools
   */
  getAllTools(): RegisteredTool[] {
    return this.registry.getAll();
  }

  /**
   * Get tool count
   */
  getToolCount(): number {
    return this.registry.size;
  }

  /**
   * Clear all registered tools
   */
  clearTools(): void {
    this.registry.clear();
  }

  /**
   * Get tools by category
   */
  getToolsByCategory(category: string): RegisteredTool[] {
    return this.registry.getByCategory(category);
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    return this.registry.getCategories();
  }

  /**
   * Search tools
   */
  searchTools(query: string): RegisteredTool[] {
    return this.registry.search(query);
  }

  /**
   * Get registry summary
   */
  getToolSummary(): {
    totalTools: number;
    categories: Record<string, number>;
    tags: Record<string, number>;
  } {
    return this.registry.getSummary();
  }

  /**
   * Set up MCP request handlers
   */
  private setupHandlers(): void {
    this.requestHandler.setupHandlers(this.server);
  }

  /**
   * Get request handler statistics
   */
  getHandlerStats(): HandlerStats {
    return this.requestHandler.getStats();
  }

  /**
   * Reset request handler statistics
   */
  resetHandlerStats(): void {
    this.requestHandler.resetStats();
  }

  /**
   * Call a tool directly (for testing or programmatic use)
   */
  async callTool(
    name: string,
    args: Record<string, unknown> = {}
  ): Promise<CallToolResult> {
    return this.requestHandler.handleToolCall(name, args);
  }

  /**
   * Validate credentials before starting
   */
  validateCredentials(): { valid: boolean; errors: string[]; warnings: string[] } {
    return validateCredentials(this.config);
  }

  /**
   * Start the server with stdio transport
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      throw new Error('Server is already running');
    }

    // Validate credentials
    const validation = this.validateCredentials();
    if (!validation.valid) {
      throw new Error(
        `Invalid credentials: ${validation.errors.join(', ')}`
      );
    }

    // Log warnings
    for (const warning of validation.warnings) {
      console.warn(`[Warning] ${warning}`);
    }

    // Initialize token manager if API key is provided (2-tier auth)
    if (this.config.apiKey) {
      initTokenManager({
        apiKey: this.config.apiKey,
        region: this.config.region,
        tokenValidityMinutes: 25, // Refresh 5 min before 30 min expiry
        debug: this.config.debug,
      });

      if (this.config.debug) {
        console.error('[Debug] Token manager initialized for 2-tier authentication');
      }
    }

    // Create stdio transport
    const transport = new StdioServerTransport();

    // Connect server to transport
    await this.server.connect(transport);
    this.isRunning = true;

    if (this.config.debug) {
      console.error(`[Debug] Verkada MCP Server started`);
      console.error(`[Debug] Server: ${this.config.serverName} v${this.config.serverVersion}`);
      console.error(`[Debug] Tools registered: ${this.registry.size}`);
    }
  }

  /**
   * Close the server
   */
  async close(): Promise<void> {
    if (this.isRunning) {
      await this.server.close();
      this.isRunning = false;
    }
  }
}

// ============================================================================
// FACTORY FUNCTIONS
// ============================================================================

/**
 * Create a new MCP server instance
 */
export function createMCPServer(options?: MCPServerOptions): VerkadaMCPServer {
  return new VerkadaMCPServer(options);
}

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Main function - starts the MCP server
 */
async function main(): Promise<void> {
  const server = createMCPServer();

  // Register all generated tools
  registerAllTools(server.getRegistry());

  if (server.getConfig().debug) {
    console.error(`[Debug] Registered ${getToolCount()} tools`);
  }

  try {
    await server.start();
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Run if this is the main module
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  main().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

// ============================================================================
// EXPORTS
// ============================================================================

// Re-export from config
export { loadServerConfig, validateCredentials } from './config.js';
export type { ServerConfig, ApiRegion, LogLevel } from './config.js';

// Re-export from client
export { getClient, createClient, resetClient, callVerkadaAPI } from './client.js';
export type { VerkadaClient, RequestOptions, QueryParams, HttpMethod } from './client.js';

// Re-export from tool-registry
export {
  ToolRegistry,
  createToolResult,
  createErrorResult,
  createRegisteredTool,
  registerToolFromMetadata,
  zodToJsonSchema,
  getRegistry,
  resetRegistry,
} from './tool-registry.js';
export type {
  RegisteredTool,
  ToolMetadata,
  ToolHandler,
  ToolRegistrationOptions,
  JSONSchema,
  JSONSchemaProperty,
} from './tool-registry.js';

// Re-export from tool-helpers
export {
  callMCPTool,
  getMCPTool,
  postMCPTool,
  putMCPTool,
  patchMCPTool,
  deleteMCPTool,
  substitutePathParams,
  buildQueryString,
  buildFullPath,
  getMissingPathParams,
  hasAllPathParams,
  extractPathParamNames,
} from './tool-helpers.js';
export type {
  PathParams,
  CallMCPToolOptions,
  GetToolOptions,
  MutationToolOptions,
  DeleteToolOptions,
} from './tool-helpers.js';

// Re-export from request-handler
export {
  RequestHandler,
  createRequestHandler,
  createMCPError,
  formatErrorResult,
  createErrorResultFromException,
  generateRequestId,
  resetRequestCounter,
  filterToolsByCategory,
  filterToolsByTags,
  searchTools,
  paginateTools,
  defaultLogger,
  MCPErrorCode,
} from './request-handler.js';
export type {
  RequestContext,
  MCPError,
  RequestHandlerOptions,
  Logger,
  HandlerStats,
  ToolStats,
} from './request-handler.js';

// Re-export from validation
export {
  // Core validation functions
  validateInput,
  validateInputOrThrow,
  isValid,
  validateMany,
  // Error formatting
  formatZodError,
  getErrorSummary,
  getFieldErrorMap,
  // Common validators
  verkadaId,
  optionalVerkadaId,
  verkadaIdArray,
  apiKey,
  apiToken,
  email,
  optionalEmail,
  phoneNumber,
  isoTimestamp,
  unixTimestamp,
  unixTimestampMs,
  flexibleTimestamp,
  pageSize,
  paginationCursor,
  paginationParams,
  verkadaRegion,
  httpMethod,
  booleanFromString,
  numberFromString,
  integerFromString,
  // Schema builders
  requiredString,
  optionalString,
  requiredNumber,
  enumField,
  nullable,
  dateRange,
  // Validation middleware
  withValidation,
  createValidationHook,
  // Type guards
  isUUID,
  isEmail,
  isISOTimestamp,
  isVerkadaRegion,
} from './validation.js';
export type {
  ValidationSuccess,
  ValidationFailure,
  ValidationResult,
  ValidationError,
  FieldError,
  ValidationOptions,
} from './validation.js';

// Re-export from error-response
export {
  // Enums
  ErrorCategory,
  ErrorSeverity,
  ErrorCodes,
  // Category/status helpers
  getErrorCodeFromStatus,
  getRecoveryHints,
  getCategoryFromStatus,
  getSeverityFromCategory,
  isRetryable,
  getRetryDelay,
  // Error response creators
  fromVerkadaApiError,
  fromTimeoutError,
  fromNetworkError,
  fromValidationError,
  fromZodError,
  fromError,
  // MCP formatting
  toCallToolResult,
  errorToCallToolResult,
  // Response builders
  notFound,
  unauthorized,
  forbidden,
  badRequest,
  rateLimited,
  internalError,
  toolNotFound,
  // Serialization
  serializeErrorResponse,
  deserializeErrorResponse,
  isErrorResponse,
} from './error-response.js';
export type {
  ErrorResponse,
  ErrorResponseOptions,
  ErrorCode,
} from './error-response.js';

// Re-export from tools
export {
  registerAllTools,
  getToolCount,
  getToolsByCategory,
  allTools,
} from './tools/index.js';

// Re-export from token-manager
export {
  TokenManager,
  initTokenManager,
  getTokenManager,
  isTokenManagerInitialized,
  resetTokenManager,
} from './token-manager.js';
export type { TokenManagerOptions } from './token-manager.js';
