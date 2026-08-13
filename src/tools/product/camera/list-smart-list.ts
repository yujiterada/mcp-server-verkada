/**
 * ListSmartList Tool
 *
 * List all smart list. Use this to enumerate or search through smart list. Supports bulk operations.
 *
 * @category product/camera
 * @operationId getSmartListViewV2
 * @method GET
 * @path /v2/cameras/people/smart_lists
 * @tags Smart Lists
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
 * Input parameters for listSmartList
 */
const ListSmartListInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The cursor parameter */
    cursor: z.string().optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(1000).optional(),
  }),
});

type ListSmartListInput = z.infer<typeof ListSmartListInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listSmartList
 * OK
 */
const ListSmartListOutputSchema = z.object({
  /** Pagination cursor for retrieving the next page of results. Continue paginating while this field is present. */
  cursor: z.string().nullable(),
  /** Smart lists in the organization. */
  items: z.array(z.object({ allowed_people_list_ids: z.array(z.string()).nullable().optional(), camera_ids: z.array(z.string()).nullable().optional(), is_public: z.boolean().nullable(), list_id: z.string().nullable(), name: z.string().nullable(), onboarding_complete: z.boolean().nullable().optional() })).nullable(),
});

type ListSmartListOutput = z.infer<typeof ListSmartListOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all smart list. Use this to enumerate or search through smart list. Supports bulk operations.
 *
 * @param input.query.cursor - The cursor parameter
 * @param input.query.limit - The limit parameter
 * @returns OK
 */
export async function listSmartList(
  input: ListSmartListInput
): Promise<APIResponse<ListSmartListOutput>> {
  // Validate input
  const validated = ListSmartListInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/people/smart_lists';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.cursor !== undefined) {
    queryParams.set('cursor', String(validated.query.cursor));
  }
  if (validated.query.limit !== undefined) {
    queryParams.set('limit', String(validated.query.limit));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<ListSmartListOutput>({
    method: 'GET',
    path: fullPath,
  });

  return response;
}

// ============================================================================
// TOOL METADATA
// ============================================================================

/**
 * Metadata for MCP tool registration
 */
export const listSmartListMetadata = {
  name: 'list_smart_list',
  description: `List all smart list. Use this to enumerate or search through smart list. Supports bulk operations.`,
  inputSchema: ListSmartListInputSchema,
  outputSchema: ListSmartListOutputSchema,
  category: 'product/camera',
  operationId: 'getSmartListViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/people/smart_lists',
  requiresAuth: true,
  tags: ['Smart Lists'],
};
