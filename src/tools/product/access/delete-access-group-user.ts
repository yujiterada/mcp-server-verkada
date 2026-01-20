/**
 * DeleteAccessGroupUser Tool
 *
 * Delete a access group user. This action cannot be undone.
 *
 * @category product/access
 * @operationId deleteAccessGroupUserViewV1
 * @method DELETE
 * @path /access/v1/access_groups/group/user
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
 * Input parameters for deleteAccessGroupUser
 */
const DeleteAccessGroupUserInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The group_id parameter (required) */
    group_id: z.string().uuid(),
    /** The external_id parameter */
    external_id: z.string().optional(),
    /** The user_id parameter */
    user_id: z.string().uuid().optional(),
  }),
});

type DeleteAccessGroupUserInput = z.infer<typeof DeleteAccessGroupUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteAccessGroupUser
 * ok
 */
const DeleteAccessGroupUserOutputSchema = z.object({
});

type DeleteAccessGroupUserOutput = z.infer<typeof DeleteAccessGroupUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a access group user. This action cannot be undone.
 *
 * @param input.query.group_id - The group_id parameter
 * @param input.query.external_id - The external_id parameter
 * @param input.query.user_id - The user_id parameter
 * @returns ok
 */
export async function deleteAccessGroupUser(
  input: DeleteAccessGroupUserInput
): Promise<APIResponse<DeleteAccessGroupUserOutput>> {
  // Validate input
  const validated = DeleteAccessGroupUserInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/access_groups/group/user';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.group_id !== undefined) {
    queryParams.set('group_id', String(validated.query.group_id));
  }
  if (validated.query.external_id !== undefined) {
    queryParams.set('external_id', String(validated.query.external_id));
  }
  if (validated.query.user_id !== undefined) {
    queryParams.set('user_id', String(validated.query.user_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<DeleteAccessGroupUserOutput>({
    method: 'DELETE',
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
export const deleteAccessGroupUserMetadata = {
  name: 'delete_access_group_user',
  description: `Delete a access group user. This action cannot be undone.`,
  inputSchema: DeleteAccessGroupUserInputSchema,
  outputSchema: DeleteAccessGroupUserOutputSchema,
  category: 'product/access',
  operationId: 'deleteAccessGroupUserViewV1',
  method: 'DELETE' as const,
  path: '/access/v1/access_groups/group/user',
  requiresAuth: true,
  tags: ['Access Groups'],
};
