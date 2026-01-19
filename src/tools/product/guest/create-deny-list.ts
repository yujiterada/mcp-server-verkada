/**
 * CreateDenyList Tool
 *
 * Create a new deny list. Provide the required fields in the request body.
 *
 * @category product/guest
 * @operationId postDenyListView
 * @method POST
 * @path /guest/v1/deny_list
 * @tags Deny List
 *
 * Auto-generated from OpenAPI spec. Do not edit manually.
 */

import { z } from 'zod';
import { callVerkadaAPI } from '../../../client.js';
import type { APIResponse } from '../../../types/common.js';

// ============================================================================
// INPUT SCHEMA
// ============================================================================

/**
 * Input parameters for createDenyList
 */
const CreateDenyListInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The site_id parameter */
    site_id: z.string().uuid().optional(),
  }),
  /** Body parameters */
  body: z.object({
    /** Base64 encoded (ASCII) deny list CSV data. (required) */
    base64_ascii_deny_list_csv: z.string(),
  }),
});

type CreateDenyListInput = z.infer<typeof CreateDenyListInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createDenyList
 * OK
 */
const CreateDenyListOutputSchema = z.object({
  /** Base64 encoded (ASCII) deny list CSV data. */
  base64_ascii_error_csv: z.string().nullable(),
  /** The unique identifier of the organization to which the Guest site belongs. */
  org_id: z.string().uuid().nullable(),
  /** The unique identifier of the Guest site. */
  site_id: z.string().uuid().nullable(),
});

type CreateDenyListOutput = z.infer<typeof CreateDenyListOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new deny list. Provide the required fields in the request body.
 *
 * @param input.query.site_id - The site_id parameter
 * @param input.body.base64_ascii_deny_list_csv - Base64 encoded (ASCII) deny list CSV data.
 * @returns OK
 */
export async function createDenyList(
  input: CreateDenyListInput
): Promise<APIResponse<CreateDenyListOutput>> {
  // Validate input
  const validated = CreateDenyListInputSchema.parse(input);

  // Build path with parameters
  const path = '/guest/v1/deny_list';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.site_id !== undefined) {
    queryParams.set('site_id', String(validated.query.site_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<CreateDenyListOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      base64_ascii_deny_list_csv: validated.body.base64_ascii_deny_list_csv,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = CreateDenyListOutputSchema.parse(response.data);
    } catch (error) {
      // Log validation warning but don't fail
      console.warn('Response validation warning:', error);
    }
  }

  return response;
}

// ============================================================================
// TOOL METADATA
// ============================================================================

/**
 * Metadata for MCP tool registration
 */
export const createDenyListMetadata = {
  name: 'create_deny_list',
  description: `Create a new deny list. Provide the required fields in the request body.`,
  inputSchema: CreateDenyListInputSchema,
  outputSchema: CreateDenyListOutputSchema,
  category: 'product/guest',
  operationId: 'postDenyListView',
  method: 'POST' as const,
  path: '/guest/v1/deny_list',
  requiresAuth: true,
  tags: ['Deny List'],
};
