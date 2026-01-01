/**
 * UnlockFaceUnlockCopyUserPhotoExternalUser Tool
 *
 * Remotely unlock the specified face unlock copy user photo external user.
 *
 * @category product/access
 * @operationId postFaceUnlockCopyUserPhotoExternalUserViewV2
 * @method POST
 * @path /v2/access/external_users/{external_id}/face_unlock/copy_user_photo
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
 * Input parameters for unlockFaceUnlockCopyUserPhotoExternalUser
 */
const UnlockFaceUnlockCopyUserPhotoExternalUserInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The external_id parameter (required) */
    external_id: z.string(),
  }),
  /** Path parameters */
  query: z.object({
    /** The overwrite parameter */
    overwrite: z.boolean().optional(),
  }),
});

type UnlockFaceUnlockCopyUserPhotoExternalUserInput = z.infer<typeof UnlockFaceUnlockCopyUserPhotoExternalUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for unlockFaceUnlockCopyUserPhotoExternalUser
 * ok
 */
const UnlockFaceUnlockCopyUserPhotoExternalUserOutputSchema = z.object({
});

type UnlockFaceUnlockCopyUserPhotoExternalUserOutput = z.infer<typeof UnlockFaceUnlockCopyUserPhotoExternalUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Remotely unlock the specified face unlock copy user photo external user.
 *
 * @param input.path.external_id - The external_id parameter
 * @param input.query.overwrite - The overwrite parameter
 * @returns ok
 */
export async function unlockFaceUnlockCopyUserPhotoExternalUser(
  input: UnlockFaceUnlockCopyUserPhotoExternalUserInput
): Promise<APIResponse<UnlockFaceUnlockCopyUserPhotoExternalUserOutput>> {
  // Validate input
  const validated = UnlockFaceUnlockCopyUserPhotoExternalUserInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/access/external_users/{external_id}/face_unlock/copy_user_photo';
  path = path.replace('{external_id}', encodeURIComponent(String(validated.path.external_id)));

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.overwrite !== undefined) {
    queryParams.set('overwrite', String(validated.query.overwrite));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<UnlockFaceUnlockCopyUserPhotoExternalUserOutput>({
    method: 'POST',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UnlockFaceUnlockCopyUserPhotoExternalUserOutputSchema.parse(response.data);
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
export const unlockFaceUnlockCopyUserPhotoExternalUserMetadata = {
  name: 'unlock_face_unlock_copy_user_photo_external_user',
  description: `Remotely unlock the specified face unlock copy user photo external user.`,
  inputSchema: UnlockFaceUnlockCopyUserPhotoExternalUserInputSchema,
  outputSchema: UnlockFaceUnlockCopyUserPhotoExternalUserOutputSchema,
  category: 'product/access',
  operationId: 'postFaceUnlockCopyUserPhotoExternalUserViewV2',
  method: 'POST' as const,
  path: '/v2/access/external_users/{external_id}/face_unlock/copy_user_photo',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
