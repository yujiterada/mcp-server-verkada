/**
 * DeleteFaceUnlockDisableUser Tool
 *
 * Delete a face unlock disable user. This action cannot be undone.
 *
 * @category product/access
 * @operationId deleteFaceUnlockDisableUserViewV2
 * @method DELETE
 * @path /v2/access/users/{user_id}/face_unlock
 * @tags Access Credentials
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
 * Input parameters for deleteFaceUnlockDisableUser
 */
const DeleteFaceUnlockDisableUserInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The user_id parameter (required) */
    user_id: z.string(),
  }),
});

type DeleteFaceUnlockDisableUserInput = z.infer<typeof DeleteFaceUnlockDisableUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteFaceUnlockDisableUser
 * ok
 */
const DeleteFaceUnlockDisableUserOutputSchema = z.object({
});

type DeleteFaceUnlockDisableUserOutput = z.infer<typeof DeleteFaceUnlockDisableUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a face unlock disable user. This action cannot be undone.
 *
 * @param input.path.user_id - The user_id parameter
 * @returns ok
 */
export async function deleteFaceUnlockDisableUser(
  input: DeleteFaceUnlockDisableUserInput
): Promise<APIResponse<DeleteFaceUnlockDisableUserOutput>> {
  // Validate input
  const validated = DeleteFaceUnlockDisableUserInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/access/users/{user_id}/face_unlock';
  path = path.replace('{user_id}', encodeURIComponent(String(validated.path.user_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<DeleteFaceUnlockDisableUserOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteFaceUnlockDisableUserOutputSchema.parse(response.data);
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
export const deleteFaceUnlockDisableUserMetadata = {
  name: 'delete_face_unlock_disable_user',
  description: `Delete a face unlock disable user. This action cannot be undone.`,
  inputSchema: DeleteFaceUnlockDisableUserInputSchema,
  outputSchema: DeleteFaceUnlockDisableUserOutputSchema,
  category: 'product/access',
  operationId: 'deleteFaceUnlockDisableUserViewV2',
  method: 'DELETE' as const,
  path: '/v2/access/users/{user_id}/face_unlock',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
