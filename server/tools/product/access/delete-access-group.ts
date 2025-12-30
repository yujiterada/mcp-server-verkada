/**
 * DeleteAccessGroup Tool
 *
 * Delete a access group. This action cannot be undone.
 *
 * @category product/access
 * @operationId deleteAccessGroupViewV1
 * @method DELETE
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
 * Input parameters for deleteAccessGroup
 */
const DeleteAccessGroupInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The group_id parameter (required) */
    group_id: z.string().uuid(),
  }),
});

type DeleteAccessGroupInput = z.infer<typeof DeleteAccessGroupInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteAccessGroup
 * ok
 */
const DeleteAccessGroupOutputSchema = z.object({
});

type DeleteAccessGroupOutput = z.infer<typeof DeleteAccessGroupOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a access group. This action cannot be undone.
 *
 * @param input.query.group_id - The group_id parameter
 * @returns ok
 */
export async function deleteAccessGroup(
  input: DeleteAccessGroupInput
): Promise<APIResponse<DeleteAccessGroupOutput>> {
  // Validate input
  const validated = DeleteAccessGroupInputSchema.parse(input);

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
  const response = await callVerkadaAPI<DeleteAccessGroupOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteAccessGroupOutputSchema.parse(response.data);
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
export const deleteAccessGroupMetadata = {
  name: 'delete_access_group',
  description: `Delete a access group. This action cannot be undone.`,
  inputSchema: DeleteAccessGroupInputSchema,
  outputSchema: DeleteAccessGroupOutputSchema,
  category: 'product/access',
  operationId: 'deleteAccessGroupViewV1',
  method: 'DELETE' as const,
  path: '/access/v1/access_groups/group',
  requiresAuth: true,
  tags: ['Access Groups'],
};
