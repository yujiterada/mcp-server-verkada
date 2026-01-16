/**
 * ListApprovedListMembers Tool
 *
 * List all approved list members. Use this to enumerate or search through approved list members. Supports pagination.
 *
 * @category product/guest
 * @operationId getApprovedListMembersViewV2
 * @method GET
 * @path /v2/guest/approved_lists/{approved_list_id}
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
 * Input parameters for listApprovedListMembers
 */
const ListApprovedListMembersInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The approved_list_id parameter (required) */
    approved_list_id: z.string(),
  }),
  /** Path parameters */
  query: z.object({
    /** The cursor parameter */
    cursor: z.string().optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(1000).optional(),
  }),
});

type ListApprovedListMembersInput = z.infer<typeof ListApprovedListMembersInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listApprovedListMembers
 * OK
 */
const ListApprovedListMembersOutputSchema = z.object({
  /** Pagination cursor for retrieving the next page of results. Continue paginating while this field is present. */
  cursor: z.string(),
  /** List of people on the approved list. */
  people: z.array(z.object({ address: z.string().optional(), date_of_birth: z.string().optional(), email: z.string(), expiration_timestamp: z.string().optional(), external_id: z.string().optional(), full_name: z.string(), person_id: z.string(), phone_number: z.string().optional() })),
});

type ListApprovedListMembersOutput = z.infer<typeof ListApprovedListMembersOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all approved list members. Use this to enumerate or search through approved list members. Supports pagination.
 *
 * @param input.path.approved_list_id - The approved_list_id parameter
 * @param input.query.cursor - The cursor parameter
 * @param input.query.limit - The limit parameter
 * @returns OK
 */
export async function listApprovedListMembers(
  input: ListApprovedListMembersInput
): Promise<APIResponse<ListApprovedListMembersOutput>> {
  // Validate input
  const validated = ListApprovedListMembersInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/guest/approved_lists/{approved_list_id}';
  path = path.replace('{approved_list_id}', encodeURIComponent(String(validated.path.approved_list_id)));

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
  const response = await callVerkadaAPI<ListApprovedListMembersOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ListApprovedListMembersOutputSchema.parse(response.data);
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
export const listApprovedListMembersMetadata = {
  name: 'list_approved_list_members',
  description: `List all approved list members. Use this to enumerate or search through approved list members. Supports pagination.`,
  inputSchema: ListApprovedListMembersInputSchema,
  outputSchema: ListApprovedListMembersOutputSchema,
  category: 'product/guest',
  operationId: 'getApprovedListMembersViewV2',
  method: 'GET' as const,
  path: '/v2/guest/approved_lists/{approved_list_id}',
  requiresAuth: true,
  tags: ['Approved Lists'],
};
