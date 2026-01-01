/**
 * DeleteAccessLevelDetail Tool
 *
 * Delete a access level detail. This action cannot be undone.
 *
 * @category product/access
 * @operationId deleteAccessLevelDetailView
 * @method DELETE
 * @path /access/v1/door/access_level/{access_level_id}
 * @tags Access Levels
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
 * Input parameters for deleteAccessLevelDetail
 */
const DeleteAccessLevelDetailInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The access_level_id parameter (required) */
    access_level_id: z.string(),
  }),
});

type DeleteAccessLevelDetailInput = z.infer<typeof DeleteAccessLevelDetailInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteAccessLevelDetail
 * ok
 */
const DeleteAccessLevelDetailOutputSchema = z.object({
});

type DeleteAccessLevelDetailOutput = z.infer<typeof DeleteAccessLevelDetailOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a access level detail. This action cannot be undone.
 *
 * @param input.path.access_level_id - The access_level_id parameter
 * @returns ok
 */
export async function deleteAccessLevelDetail(
  input: DeleteAccessLevelDetailInput
): Promise<APIResponse<DeleteAccessLevelDetailOutput>> {
  // Validate input
  const validated = DeleteAccessLevelDetailInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/door/access_level/{access_level_id}';
  path = path.replace('{access_level_id}', encodeURIComponent(String(validated.path.access_level_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<DeleteAccessLevelDetailOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteAccessLevelDetailOutputSchema.parse(response.data);
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
export const deleteAccessLevelDetailMetadata = {
  name: 'delete_access_level_detail',
  description: `Delete a access level detail. This action cannot be undone.`,
  inputSchema: DeleteAccessLevelDetailInputSchema,
  outputSchema: DeleteAccessLevelDetailOutputSchema,
  category: 'product/access',
  operationId: 'deleteAccessLevelDetailView',
  method: 'DELETE' as const,
  path: '/access/v1/door/access_level/{access_level_id}',
  requiresAuth: true,
  tags: ['Access Levels'],
};
