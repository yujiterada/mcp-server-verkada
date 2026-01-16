/**
 * DeleteFaceUnlockDisableExternalUser Tool
 *
 * Delete a face unlock disable external user. This action cannot be undone.
 *
 * @category product/access
 * @operationId deleteFaceUnlockDisableExternalUserViewV2
 * @method DELETE
 * @path /v2/access/external_users/{external_id}/face_unlock
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
 * Input parameters for deleteFaceUnlockDisableExternalUser
 */
const DeleteFaceUnlockDisableExternalUserInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The external_id parameter (required) */
    external_id: z.string(),
  }),
});

type DeleteFaceUnlockDisableExternalUserInput = z.infer<typeof DeleteFaceUnlockDisableExternalUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteFaceUnlockDisableExternalUser
 * ok
 */
const DeleteFaceUnlockDisableExternalUserOutputSchema = z.object({
});

type DeleteFaceUnlockDisableExternalUserOutput = z.infer<typeof DeleteFaceUnlockDisableExternalUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a face unlock disable external user. This action cannot be undone.
 *
 * @param input.path.external_id - The external_id parameter
 * @returns ok
 */
export async function deleteFaceUnlockDisableExternalUser(
  input: DeleteFaceUnlockDisableExternalUserInput
): Promise<APIResponse<DeleteFaceUnlockDisableExternalUserOutput>> {
  // Validate input
  const validated = DeleteFaceUnlockDisableExternalUserInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/access/external_users/{external_id}/face_unlock';
  path = path.replace('{external_id}', encodeURIComponent(String(validated.path.external_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<DeleteFaceUnlockDisableExternalUserOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteFaceUnlockDisableExternalUserOutputSchema.parse(response.data);
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
export const deleteFaceUnlockDisableExternalUserMetadata = {
  name: 'delete_face_unlock_disable_external_user',
  description: `Delete a face unlock disable external user. This action cannot be undone.`,
  inputSchema: DeleteFaceUnlockDisableExternalUserInputSchema,
  outputSchema: DeleteFaceUnlockDisableExternalUserOutputSchema,
  category: 'product/access',
  operationId: 'deleteFaceUnlockDisableExternalUserViewV2',
  method: 'DELETE' as const,
  path: '/v2/access/external_users/{external_id}/face_unlock',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
