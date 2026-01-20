/**
 * ListApprovedLists Tool
 *
 * List all approved lists. Use this to enumerate or search through approved lists. Supports pagination. Supports filtering.
 *
 * @category product/guest
 * @operationId getApprovedListsViewV2
 * @method GET
 * @path /v2/guest/approved_lists
 * @tags Approved Lists
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
 * Input parameters for listApprovedLists
 */
const ListApprovedListsInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The site_id parameter */
    site_id: z.string().uuid().optional(),
    /** The cursor parameter */
    cursor: z.string().optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(1000).optional(),
  }),
});

type ListApprovedListsInput = z.infer<typeof ListApprovedListsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listApprovedLists
 * OK
 */
const ListApprovedListsOutputSchema = z.object({
  /** Pagination cursor for retrieving the next page of results. Continue paginating while this field is present. */
  cursor: z.string().nullable(),
  /** List of approved lists. */
  items: z.array(z.object({ approved_list_id: z.string().nullable(), name: z.string().nullable(), site_id: z.string().nullable() })).nullable(),
});

type ListApprovedListsOutput = z.infer<typeof ListApprovedListsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all approved lists. Use this to enumerate or search through approved lists. Supports pagination. Supports filtering.
 *
 * @param input.query.site_id - The site_id parameter
 * @param input.query.cursor - The cursor parameter
 * @param input.query.limit - The limit parameter
 * @returns OK
 */
export async function listApprovedLists(
  input: ListApprovedListsInput
): Promise<APIResponse<ListApprovedListsOutput>> {
  // Validate input
  const validated = ListApprovedListsInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/guest/approved_lists';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.site_id !== undefined) {
    queryParams.set('site_id', String(validated.query.site_id));
  }
  if (validated.query.cursor !== undefined) {
    queryParams.set('cursor', String(validated.query.cursor));
  }
  if (validated.query.limit !== undefined) {
    queryParams.set('limit', String(validated.query.limit));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<ListApprovedListsOutput>({
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
export const listApprovedListsMetadata = {
  name: 'list_approved_lists',
  description: `List all approved lists. Use this to enumerate or search through approved lists. Supports pagination. Supports filtering.`,
  inputSchema: ListApprovedListsInputSchema,
  outputSchema: ListApprovedListsOutputSchema,
  category: 'product/guest',
  operationId: 'getApprovedListsViewV2',
  method: 'GET' as const,
  path: '/v2/guest/approved_lists',
  requiresAuth: true,
  tags: ['Approved Lists'],
};
