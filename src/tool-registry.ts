/**
 * Tool Registry
 *
 * Provides utilities for registering and managing MCP tools.
 * Includes Zod schema to JSON Schema conversion.
 *
 * @see Subtask 3.1.2: Tool Registration System
 */

import { z, type ZodTypeAny } from 'zod';
import type { Tool, CallToolResult } from '@modelcontextprotocol/sdk/types.js';

// ============================================================================
// TYPES
// ============================================================================

/**
 * JSON Schema type for MCP tool input
 */
export interface JSONSchema {
  type: 'object';
  properties?: Record<string, JSONSchemaProperty>;
  required?: string[];
  description?: string;
  additionalProperties?: boolean;
}

/**
 * JSON Schema property definition
 */
export interface JSONSchemaProperty {
  type?: string | string[];
  description?: string;
  format?: string;
  enum?: (string | number | boolean | null)[];
  items?: JSONSchemaProperty;
  properties?: Record<string, JSONSchemaProperty>;
  required?: string[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  default?: unknown;
  nullable?: boolean;
  oneOf?: JSONSchemaProperty[];
  anyOf?: JSONSchemaProperty[];
  allOf?: JSONSchemaProperty[];
  additionalProperties?: boolean | JSONSchemaProperty;
}

/**
 * Tool metadata from generated tool files
 */
export interface ToolMetadata {
  /** Tool name (snake_case) */
  name: string;
  /** Tool description */
  description: string;
  /** Zod input schema */
  inputSchema: ZodTypeAny;
  /** Zod output schema */
  outputSchema?: ZodTypeAny;
  /** Tool category */
  category?: string;
  /** Original OpenAPI operation ID */
  operationId?: string;
  /** HTTP method */
  method?: string;
  /** API path */
  path?: string;
  /** Whether auth is required */
  requiresAuth?: boolean;
  /** Tags */
  tags?: string[];
}

/**
 * Tool handler function type
 */
export type ToolHandler<TInput = unknown, TOutput = unknown> = (
  input: TInput
) => Promise<TOutput>;

/**
 * Registered tool with handler
 */
export interface RegisteredTool {
  /** Tool definition for MCP */
  definition: Tool;
  /** Handler function */
  handler: (args: Record<string, unknown>) => Promise<CallToolResult>;
  /** Original metadata */
  metadata?: ToolMetadata;
}

/**
 * Options for tool registration
 */
export interface ToolRegistrationOptions {
  /** Validate input with Zod before calling handler */
  validateInput?: boolean;
  /** Include tool in specific category */
  category?: string;
}

// ============================================================================
// ZOD TO JSON SCHEMA CONVERSION
// ============================================================================

/**
 * Convert a Zod schema to JSON Schema
 *
 * This is a simplified converter that handles the most common Zod types
 * used in the generated tool files.
 */
export function zodToJsonSchema(schema: ZodTypeAny): JSONSchema {
  const properties: Record<string, JSONSchemaProperty> = {};
  const required: string[] = [];

  // Handle ZodObject
  if (schema._def.typeName === 'ZodObject') {
    const shape = schema._def.shape();
    for (const [key, value] of Object.entries(shape)) {
      const zodSchema = value as ZodTypeAny;
      properties[key] = zodPropertyToJsonSchema(zodSchema);

      // Check if required (not optional)
      if (!isOptional(zodSchema)) {
        required.push(key);
      }
    }
  }

  return {
    type: 'object',
    properties: Object.keys(properties).length > 0 ? properties : undefined,
    required: required.length > 0 ? required : undefined,
  };
}

/**
 * Convert a Zod property to JSON Schema property
 */
function zodPropertyToJsonSchema(schema: ZodTypeAny): JSONSchemaProperty {
  const def = schema._def;
  const typeName = def.typeName;

  // Handle optional/nullable wrappers
  if (typeName === 'ZodOptional') {
    return zodPropertyToJsonSchema(def.innerType);
  }

  if (typeName === 'ZodNullable') {
    const inner = zodPropertyToJsonSchema(def.innerType);
    return { ...inner, nullable: true };
  }

  if (typeName === 'ZodDefault') {
    const inner = zodPropertyToJsonSchema(def.innerType);
    return { ...inner, default: def.defaultValue() };
  }

  // Handle basic types
  switch (typeName) {
    case 'ZodString': {
      const prop: JSONSchemaProperty = { type: 'string' };
      if (def.checks) {
        for (const check of def.checks) {
          switch (check.kind) {
            case 'min':
              prop.minLength = check.value;
              break;
            case 'max':
              prop.maxLength = check.value;
              break;
            case 'regex':
              prop.pattern = check.regex.source;
              break;
            case 'uuid':
              prop.format = 'uuid';
              break;
            case 'email':
              prop.format = 'email';
              break;
            case 'url':
              prop.format = 'uri';
              break;
            case 'datetime':
              prop.format = 'date-time';
              break;
          }
        }
      }
      if (def.description) {
        prop.description = def.description;
      }
      return prop;
    }

    case 'ZodNumber': {
      const prop: JSONSchemaProperty = { type: 'number' };
      if (def.checks) {
        for (const check of def.checks) {
          switch (check.kind) {
            case 'min':
              prop.minimum = check.value;
              break;
            case 'max':
              prop.maximum = check.value;
              break;
            case 'int':
              prop.type = 'integer';
              break;
          }
        }
      }
      if (def.description) {
        prop.description = def.description;
      }
      return prop;
    }

    case 'ZodBoolean':
      return { type: 'boolean', description: def.description };

    case 'ZodArray': {
      const items = zodPropertyToJsonSchema(def.type);
      return { type: 'array', items, description: def.description };
    }

    case 'ZodObject': {
      const objSchema = zodToJsonSchema(schema);
      return {
        type: 'object',
        properties: objSchema.properties,
        required: objSchema.required,
        description: def.description,
      };
    }

    case 'ZodEnum': {
      return {
        type: 'string',
        enum: def.values,
        description: def.description,
      };
    }

    case 'ZodLiteral': {
      const value = def.value;
      const type = typeof value;
      return {
        type: type === 'number' ? 'number' : type === 'boolean' ? 'boolean' : 'string',
        enum: [value],
        description: def.description,
      };
    }

    case 'ZodUnion': {
      const options = def.options.map((opt: ZodTypeAny) => zodPropertyToJsonSchema(opt));
      // Check if it's a nullable union (type | null)
      const nullIndex = options.findIndex((o: JSONSchemaProperty) => o.type === 'null');
      if (nullIndex >= 0 && options.length === 2) {
        const other = options[1 - nullIndex];
        return { ...other, nullable: true };
      }
      return { anyOf: options };
    }

    case 'ZodIntersection': {
      const left = zodPropertyToJsonSchema(def.left);
      const right = zodPropertyToJsonSchema(def.right);
      return { allOf: [left, right] };
    }

    case 'ZodRecord': {
      return {
        type: 'object',
        additionalProperties: zodPropertyToJsonSchema(def.valueType),
        description: def.description,
      };
    }

    case 'ZodAny':
    case 'ZodUnknown':
      return { description: def.description };

    case 'ZodNull':
      return { type: 'null' };

    case 'ZodVoid':
    case 'ZodUndefined':
      return {};

    default:
      // Fallback for unknown types
      return { description: def.description };
  }
}

/**
 * Check if a Zod schema is optional
 */
function isOptional(schema: ZodTypeAny): boolean {
  const typeName = schema._def.typeName;
  if (typeName === 'ZodOptional') {
    return true;
  }
  if (typeName === 'ZodDefault') {
    return true;
  }
  return false;
}

// ============================================================================
// TOOL RESULT HELPERS
// ============================================================================

/**
 * Create a successful tool result
 */
export function createToolResult(data: unknown): CallToolResult {
  // Check if the data is in image format (from API client)
  if (
    data &&
    typeof data === 'object' &&
    'type' in data &&
    data.type === 'image' &&
    'data' in data &&
    'mimeType' in data
  ) {
    // Return image content for MCP
    return {
      content: [
        {
          type: 'image' as const,
          data: (data as { data: string }).data,
          mimeType: (data as { mimeType: string }).mimeType,
        },
      ],
    };
  }

  // Default: return as text
  return {
    content: [
      {
        type: 'text' as const,
        text: typeof data === 'string' ? data : JSON.stringify(data, null, 2),
      },
    ],
  };
}

/**
 * Create an error tool result
 */
export function createErrorResult(error: string | Error): CallToolResult {
  const message = error instanceof Error ? error.message : error;
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({ error: message }),
      },
    ],
    isError: true,
  };
}

// ============================================================================
// TOOL REGISTRATION HELPERS
// ============================================================================

/**
 * Create a RegisteredTool from tool metadata and handler
 */
export function createRegisteredTool<TInput, TOutput>(
  metadata: ToolMetadata,
  handler: ToolHandler<TInput, TOutput>,
  options: ToolRegistrationOptions = {}
): RegisteredTool {
  const { validateInput = true } = options;

  // Convert Zod schema to JSON Schema
  const inputSchema = zodToJsonSchema(metadata.inputSchema);

  // Create MCP tool definition
  const definition: Tool = {
    name: metadata.name,
    description: metadata.description,
    inputSchema: {
      type: 'object',
      properties: inputSchema.properties,
      required: inputSchema.required,
    },
  };

  // Create wrapped handler
  const wrappedHandler = async (args: Record<string, unknown>): Promise<CallToolResult> => {
    try {
      // Validate input if enabled
      let validatedInput = args as TInput;
      if (validateInput) {
        validatedInput = metadata.inputSchema.parse(args) as TInput;
      }

      // Call handler
      const result = await handler(validatedInput);

      // Return result
      return createToolResult(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return createErrorResult(`Validation error: ${error.message}`);
      }
      return createErrorResult(error instanceof Error ? error : String(error));
    }
  };

  return {
    definition,
    handler: wrappedHandler,
    metadata,
  };
}

/**
 * Create a RegisteredTool directly from a generated tool file's exports
 *
 * This helper simplifies registration by accepting the metadata and handler
 * directly as exported from generated tool files.
 */
export function registerToolFromMetadata<TInput, TOutput>(
  metadata: ToolMetadata,
  handler: (input: TInput) => Promise<{ success: boolean; data?: TOutput; error?: unknown }>
): RegisteredTool {
  // Create wrapper that extracts data from APIResponse
  const wrappedHandler: ToolHandler<TInput, TOutput | { error: unknown }> = async (input) => {
    const response = await handler(input);
    if (response.success && response.data !== undefined) {
      return response.data;
    }
    return { error: response.error };
  };

  return createRegisteredTool(metadata, wrappedHandler);
}

// ============================================================================
// TOOL REGISTRY
// ============================================================================

/**
 * Registry for managing MCP tools
 */
export class ToolRegistry {
  private tools: Map<string, RegisteredTool> = new Map();
  private categories: Map<string, Set<string>> = new Map();

  /**
   * Register a tool
   */
  register(tool: RegisteredTool): void {
    const name = tool.definition.name;
    if (this.tools.has(name)) {
      throw new Error(`Tool "${name}" is already registered`);
    }

    this.tools.set(name, tool);

    // Track category
    const category = tool.metadata?.category || 'uncategorized';
    if (!this.categories.has(category)) {
      this.categories.set(category, new Set());
    }
    this.categories.get(category)!.add(name);
  }

  /**
   * Register multiple tools
   */
  registerAll(tools: RegisteredTool[]): void {
    for (const tool of tools) {
      this.register(tool);
    }
  }

  /**
   * Get a tool by name
   */
  get(name: string): RegisteredTool | undefined {
    return this.tools.get(name);
  }

  /**
   * Check if a tool exists
   */
  has(name: string): boolean {
    return this.tools.has(name);
  }

  /**
   * Get all registered tools
   */
  getAll(): RegisteredTool[] {
    return Array.from(this.tools.values());
  }

  /**
   * Get all tool definitions (for MCP tools/list)
   */
  getAllDefinitions(): Tool[] {
    return this.getAll().map((t) => t.definition);
  }

  /**
   * Get tools by category
   */
  getByCategory(category: string): RegisteredTool[] {
    const toolNames = this.categories.get(category);
    if (!toolNames) {
      return [];
    }
    return Array.from(toolNames)
      .map((name) => this.tools.get(name))
      .filter((t): t is RegisteredTool => t !== undefined);
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    return Array.from(this.categories.keys());
  }

  /**
   * Get tool count
   */
  get size(): number {
    return this.tools.size;
  }

  /**
   * Get category counts
   */
  getCategoryCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const [category, tools] of this.categories) {
      counts[category] = tools.size;
    }
    return counts;
  }

  /**
   * Clear all tools
   */
  clear(): void {
    this.tools.clear();
    this.categories.clear();
  }

  /**
   * Remove a tool
   */
  remove(name: string): boolean {
    const tool = this.tools.get(name);
    if (!tool) {
      return false;
    }

    this.tools.delete(name);

    // Remove from category
    const category = tool.metadata?.category || 'uncategorized';
    const categoryTools = this.categories.get(category);
    if (categoryTools) {
      categoryTools.delete(name);
      if (categoryTools.size === 0) {
        this.categories.delete(category);
      }
    }

    return true;
  }

  /**
   * Search tools by name or description
   */
  search(query: string): RegisteredTool[] {
    const lowerQuery = query.toLowerCase();
    return this.getAll().filter((tool) => {
      const name = tool.definition.name.toLowerCase();
      const description = (tool.definition.description || '').toLowerCase();
      return name.includes(lowerQuery) || description.includes(lowerQuery);
    });
  }

  /**
   * Get tools by tag
   */
  getByTag(tag: string): RegisteredTool[] {
    const lowerTag = tag.toLowerCase();
    return this.getAll().filter((tool) => {
      const tags = tool.metadata?.tags || [];
      return tags.some((t) => t.toLowerCase() === lowerTag);
    });
  }

  /**
   * Get summary information
   */
  getSummary(): {
    totalTools: number;
    categories: Record<string, number>;
    tags: Record<string, number>;
  } {
    const tagCounts: Record<string, number> = {};

    for (const tool of this.getAll()) {
      const tags = tool.metadata?.tags || [];
      for (const tag of tags) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }
    }

    return {
      totalTools: this.size,
      categories: this.getCategoryCounts(),
      tags: tagCounts,
    };
  }
}

// ============================================================================
// SINGLETON REGISTRY
// ============================================================================

let defaultRegistry: ToolRegistry | null = null;

/**
 * Get the default tool registry
 */
export function getRegistry(): ToolRegistry {
  if (!defaultRegistry) {
    defaultRegistry = new ToolRegistry();
  }
  return defaultRegistry;
}

/**
 * Reset the default registry (useful for testing)
 */
export function resetRegistry(): void {
  defaultRegistry = null;
}
