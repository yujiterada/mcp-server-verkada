/**
 * GetAccessGroup Tool
 *
 * Get a specific access group by ID. Returns detailed information about the access group.
 *
 * @category product/access
 * @operationId getAccessGroupViewV1
 * @method GET
 * @path /access/v1/access_groups/group
 * @tags Access Groups
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
 * Input parameters for getAccessGroup
 */
const GetAccessGroupInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The group_id parameter (required) */
    group_id: z.string().uuid(),
  }),
});

type GetAccessGroupInput = z.infer<typeof GetAccessGroupInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getAccessGroup
 * OK
 */
const GetAccessGroupOutputSchema = z.object({
  /** The unique identifier of the Access Group managed by Verkada. */
  group_id: z.string().uuid().nullable(),
  /** The unique name of the Access Group provided by the customer. */
  name: z.string().nullable(),
  /** The list of Verkada-defined user identifiers within the access group. */
  user_ids: z.array(z.string().uuid()).nullable(),
});

type GetAccessGroupOutput = z.infer<typeof GetAccessGroupOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific access group by ID. Returns detailed information about the access group.
 *
 * @param input.query.group_id - The group_id parameter
 * @returns OK
 */
export async function getAccessGroup(
  input: GetAccessGroupInput
): Promise<APIResponse<GetAccessGroupOutput>> {
  // Validate input
  const validated = GetAccessGroupInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/access_groups/group';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.group_id !== undefined) {
    queryParams.set('group_id', String(validated.query.group_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetAccessGroupOutput>({
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
export const getAccessGroupMetadata = {
  name: 'get_access_group',
  description: `Get a specific access group by ID. Returns detailed information about the access group.`,
  inputSchema: GetAccessGroupInputSchema,
  outputSchema: GetAccessGroupOutputSchema,
  category: 'product/access',
  operationId: 'getAccessGroupViewV1',
  method: 'GET' as const,
  path: '/access/v1/access_groups/group',
  requiresAuth: true,
  tags: ['Access Groups'],
};
