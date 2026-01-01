/**
 * Request Handler
 *
 * Provides enhanced request handling for the MCP server with:
 * - Request context (timing, request ID)
 * - Structured error handling
 * - Logging middleware
 * - Response formatting utilities
 *
 * @see Subtask 3.1.4: Request Handler Implementation
 */

import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

import type { ToolRegistry, RegisteredTool } from './tool-registry.js';
import type { ServerConfig } from './config.js';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Request context passed to handlers
 */
export interface RequestContext {
  /** Unique request ID */
  requestId: string;
  /** Request start time */
  startTime: number;
  /** Server configuration */
  config: ServerConfig;
  /** Tool registry */
  registry: ToolRegistry;
}

/**
 * Error codes for MCP errors
 */
export enum MCPErrorCode {
  /** Tool not found */
  TOOL_NOT_FOUND = 'TOOL_NOT_FOUND',
  /** Invalid arguments */
  INVALID_ARGUMENTS = 'INVALID_ARGUMENTS',
  /** Validation error */
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  /** Execution error */
  EXECUTION_ERROR = 'EXECUTION_ERROR',
  /** Internal error */
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  /** Timeout error */
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  /** Rate limit error */
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  /** Authentication error */
  AUTH_ERROR = 'AUTH_ERROR',
}

/**
 * Structured MCP error
 */
export interface MCPError {
  /** Error code */
  code: MCPErrorCode;
  /** Error message */
  message: string;
  /** Tool name (if applicable) */
  tool?: string;
  /** Additional details */
  details?: unknown;
  /** Request ID for tracing */
  requestId?: string;
}

/**
 * Request handler options
 */
export interface RequestHandlerOptions {
  /** Enable debug logging */
  debug?: boolean;
  /** Custom logger */
  logger?: Logger;
  /** Request timeout in ms */
  timeout?: number;
}

/**
 * Logger interface
 */
export interface Logger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
}

/**
 * Handler statistics
 */
export interface HandlerStats {
  /** Total requests handled */
  totalRequests: number;
  /** Successful requests */
  successfulRequests: number;
  /** Failed requests */
  failedRequests: number;
  /** Average response time in ms */
  averageResponseTime: number;
  /** Per-tool statistics */
  toolStats: Map<string, ToolStats>;
}

/**
 * Per-tool statistics
 */
export interface ToolStats {
  /** Tool name */
  name: string;
  /** Number of calls */
  calls: number;
  /** Number of errors */
  errors: number;
  /** Average response time in ms */
  averageResponseTime: number;
  /** Last called timestamp */
  lastCalled?: number;
}

// ============================================================================
// DEFAULT LOGGER
// ============================================================================

/**
 * Default console logger
 */
export const defaultLogger: Logger = {
  debug: (message: string, ...args: unknown[]) => {
    if (process.env.DEBUG) {
      console.error(`[DEBUG] ${message}`, ...args);
    }
  },
  info: (message: string, ...args: unknown[]) => {
    console.error(`[INFO] ${message}`, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    console.error(`[WARN] ${message}`, ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
};

// ============================================================================
// ERROR FORMATTING
// ============================================================================

/**
 * Create an MCP error object
 */
export function createMCPError(
  code: MCPErrorCode,
  message: string,
  options: {
    tool?: string;
    details?: unknown;
    requestId?: string;
  } = {}
): MCPError {
  return {
    code,
    message,
    ...options,
  };
}

/**
 * Format an error as a CallToolResult
 */
export function formatErrorResult(error: MCPError): CallToolResult {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(error, null, 2),
      },
    ],
    isError: true,
  };
}

/**
 * Create an error result from an exception
 */
export function createErrorResultFromException(
  error: unknown,
  toolName?: string,
  requestId?: string
): CallToolResult {
  if (error instanceof z.ZodError) {
    return formatErrorResult(
      createMCPError(MCPErrorCode.VALIDATION_ERROR, 'Input validation failed', {
        tool: toolName,
        details: error.errors,
        requestId,
      })
    );
  }

  const message = error instanceof Error ? error.message : 'Unknown error';
  const code = getErrorCodeFromException(error);

  return formatErrorResult(
    createMCPError(code, message, {
      tool: toolName,
      requestId,
    })
  );
}

/**
 * Determine error code from exception type
 */
function getErrorCodeFromException(error: unknown): MCPErrorCode {
  if (!(error instanceof Error)) {
    return MCPErrorCode.INTERNAL_ERROR;
  }

  const message = error.message.toLowerCase();

  if (message.includes('timeout') || error.name === 'TimeoutError') {
    return MCPErrorCode.TIMEOUT_ERROR;
  }

  if (message.includes('rate limit') || message.includes('429')) {
    return MCPErrorCode.RATE_LIMIT_ERROR;
  }

  if (
    message.includes('unauthorized') ||
    message.includes('forbidden') ||
    message.includes('401') ||
    message.includes('403')
  ) {
    return MCPErrorCode.AUTH_ERROR;
  }

  if (message.includes('validation') || error.name === 'ZodError') {
    return MCPErrorCode.VALIDATION_ERROR;
  }

  return MCPErrorCode.EXECUTION_ERROR;
}

// ============================================================================
// REQUEST ID GENERATION
// ============================================================================

let requestCounter = 0;

/**
 * Generate a unique request ID
 */
export function generateRequestId(): string {
  const timestamp = Date.now().toString(36);
  const counter = (++requestCounter).toString(36).padStart(4, '0');
  const random = Math.random().toString(36).substring(2, 6);
  return `req_${timestamp}_${counter}_${random}`;
}

/**
 * Reset request counter (for testing)
 */
export function resetRequestCounter(): void {
  requestCounter = 0;
}

// ============================================================================
// REQUEST HANDLER CLASS
// ============================================================================

/**
 * Enhanced request handler for MCP server
 */
export class RequestHandler {
  private readonly config: ServerConfig;
  private readonly registry: ToolRegistry;
  private readonly logger: Logger;
  private readonly debug: boolean;
  private readonly timeout: number;
  private stats: HandlerStats;

  constructor(
    config: ServerConfig,
    registry: ToolRegistry,
    options: RequestHandlerOptions = {}
  ) {
    this.config = config;
    this.registry = registry;
    this.logger = options.logger || defaultLogger;
    this.debug = options.debug || config.debug || false;
    this.timeout = options.timeout || config.timeout || 30000;
    this.stats = this.initStats();
  }

  /**
   * Initialize statistics
   */
  private initStats(): HandlerStats {
    return {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      toolStats: new Map(),
    };
  }

  /**
   * Get current statistics
   */
  getStats(): HandlerStats {
    return { ...this.stats };
  }

  /**
   * Reset statistics
   */
  resetStats(): void {
    this.stats = this.initStats();
  }

  /**
   * Create request context
   */
  private createContext(): RequestContext {
    return {
      requestId: generateRequestId(),
      startTime: Date.now(),
      config: this.config,
      registry: this.registry,
    };
  }

  /**
   * Update statistics after a request
   */
  private updateStats(
    context: RequestContext,
    success: boolean,
    toolName?: string
  ): void {
    const duration = Date.now() - context.startTime;

    // Update global stats
    this.stats.totalRequests++;
    if (success) {
      this.stats.successfulRequests++;
    } else {
      this.stats.failedRequests++;
    }

    // Update average response time
    const totalTime =
      this.stats.averageResponseTime * (this.stats.totalRequests - 1) + duration;
    this.stats.averageResponseTime = totalTime / this.stats.totalRequests;

    // Update tool-specific stats
    if (toolName) {
      let toolStats = this.stats.toolStats.get(toolName);
      if (!toolStats) {
        toolStats = {
          name: toolName,
          calls: 0,
          errors: 0,
          averageResponseTime: 0,
        };
        this.stats.toolStats.set(toolName, toolStats);
      }

      toolStats.calls++;
      if (!success) {
        toolStats.errors++;
      }
      toolStats.lastCalled = Date.now();

      // Update average response time for tool
      const toolTotalTime =
        toolStats.averageResponseTime * (toolStats.calls - 1) + duration;
      toolStats.averageResponseTime = toolTotalTime / toolStats.calls;
    }
  }

  /**
   * Set up all request handlers on the server
   */
  setupHandlers(server: Server): void {
    this.setupListToolsHandler(server);
    this.setupCallToolHandler(server);
  }

  /**
   * Set up tools/list handler
   */
  private setupListToolsHandler(server: Server): void {
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      const context = this.createContext();

      if (this.debug) {
        this.logger.debug(`[${context.requestId}] tools/list request`);
      }

      try {
        const tools = this.registry.getAll().map((t) => t.definition);

        if (this.debug) {
          const duration = Date.now() - context.startTime;
          this.logger.debug(
            `[${context.requestId}] tools/list completed in ${duration}ms, returned ${tools.length} tools`
          );
        }

        this.updateStats(context, true);
        return { tools };
      } catch (error) {
        this.logger.error(
          `[${context.requestId}] tools/list error:`,
          error instanceof Error ? error.message : error
        );
        this.updateStats(context, false);
        throw error;
      }
    });
  }

  /**
   * Set up tools/call handler
   */
  private setupCallToolHandler(server: Server): void {
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const context = this.createContext();
      const { name, arguments: args } = request.params;

      if (this.debug) {
        this.logger.debug(
          `[${context.requestId}] tools/call: ${name}`,
          args ? JSON.stringify(args).substring(0, 200) : '(no args)'
        );
      }

      // Check if tool exists
      const tool = this.registry.get(name);
      if (!tool) {
        this.logger.warn(
          `[${context.requestId}] Tool not found: ${name}`
        );
        this.updateStats(context, false, name);

        return formatErrorResult(
          createMCPError(MCPErrorCode.TOOL_NOT_FOUND, `Tool "${name}" not found`, {
            tool: name,
            details: {
              availableTools: this.registry.getAll().map((t) => t.definition.name),
            },
            requestId: context.requestId,
          })
        );
      }

      try {
        // Execute the tool handler
        const result = await this.executeWithTimeout(
          () => tool.handler(args || {}),
          this.timeout
        );

        const duration = Date.now() - context.startTime;
        if (this.debug) {
          this.logger.debug(
            `[${context.requestId}] tools/call: ${name} completed in ${duration}ms`
          );
        }

        this.updateStats(context, true, name);
        return result;
      } catch (error) {
        const duration = Date.now() - context.startTime;
        this.logger.error(
          `[${context.requestId}] tools/call: ${name} failed after ${duration}ms:`,
          error instanceof Error ? error.message : error
        );

        this.updateStats(context, false, name);
        return createErrorResultFromException(error, name, context.requestId);
      }
    });
  }

  /**
   * Execute a function with timeout
   */
  private async executeWithTimeout<T>(
    fn: () => Promise<T>,
    timeout: number
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Request timed out after ${timeout}ms`));
      }, timeout);

      fn()
        .then((result) => {
          clearTimeout(timeoutId);
          resolve(result);
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  }

  /**
   * Handle a tool call directly (for testing or programmatic use)
   */
  async handleToolCall(
    name: string,
    args: Record<string, unknown> = {}
  ): Promise<CallToolResult> {
    const context = this.createContext();

    const tool = this.registry.get(name);
    if (!tool) {
      this.updateStats(context, false, name);
      return formatErrorResult(
        createMCPError(MCPErrorCode.TOOL_NOT_FOUND, `Tool "${name}" not found`, {
          tool: name,
          requestId: context.requestId,
        })
      );
    }

    try {
      const result = await this.executeWithTimeout(
        () => tool.handler(args),
        this.timeout
      );
      this.updateStats(context, true, name);
      return result;
    } catch (error) {
      this.updateStats(context, false, name);
      return createErrorResultFromException(error, name, context.requestId);
    }
  }
}

// ============================================================================
// FACTORY FUNCTION
// ============================================================================

/**
 * Create a request handler
 */
export function createRequestHandler(
  config: ServerConfig,
  registry: ToolRegistry,
  options?: RequestHandlerOptions
): RequestHandler {
  return new RequestHandler(config, registry, options);
}

// ============================================================================
// TOOL FILTERING UTILITIES
// ============================================================================

/**
 * Filter tools by category
 */
export function filterToolsByCategory(
  tools: RegisteredTool[],
  category: string
): RegisteredTool[] {
  return tools.filter((tool) => tool.metadata?.category === category);
}

/**
 * Filter tools by tags
 */
export function filterToolsByTags(
  tools: RegisteredTool[],
  tags: string[]
): RegisteredTool[] {
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));
  return tools.filter((tool) => {
    const toolTags = tool.metadata?.tags || [];
    return toolTags.some((t) => tagSet.has(t.toLowerCase()));
  });
}

/**
 * Search tools by name or description
 */
export function searchTools(
  tools: RegisteredTool[],
  query: string
): RegisteredTool[] {
  const lowerQuery = query.toLowerCase();
  return tools.filter((tool) => {
    const name = tool.definition.name.toLowerCase();
    const description = (tool.definition.description || '').toLowerCase();
    return name.includes(lowerQuery) || description.includes(lowerQuery);
  });
}

/**
 * Paginate tools list
 */
export function paginateTools(
  tools: RegisteredTool[],
  cursor?: string,
  limit: number = 50
): { tools: RegisteredTool[]; nextCursor?: string } {
  let startIndex = 0;

  if (cursor) {
    // Cursor is base64 encoded index
    try {
      const decoded = parseInt(Buffer.from(cursor, 'base64').toString(), 10);
      startIndex = isNaN(decoded) ? 0 : decoded;
    } catch {
      startIndex = 0;
    }
  }

  const endIndex = startIndex + limit;
  const paginatedTools = tools.slice(startIndex, endIndex);
  const hasMore = endIndex < tools.length;

  return {
    tools: paginatedTools,
    nextCursor: hasMore
      ? Buffer.from(endIndex.toString()).toString('base64')
      : undefined,
  };
}
