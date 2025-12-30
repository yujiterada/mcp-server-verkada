/**
 * UnlockFaceUnlockUploadPhotoExternalUser Tool
 *
 * Remotely unlock the specified face unlock upload photo external user.
 *
 * @category product/access
 * @operationId postFaceUnlockUploadPhotoExternalUserViewV2
 * @method POST
 * @path /v2/access/external_users/{external_id}/face_unlock/upload_photo
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
 * Input parameters for unlockFaceUnlockUploadPhotoExternalUser
 */
const UnlockFaceUnlockUploadPhotoExternalUserInputSchema = z.object({
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

type UnlockFaceUnlockUploadPhotoExternalUserInput = z.infer<typeof UnlockFaceUnlockUploadPhotoExternalUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for unlockFaceUnlockUploadPhotoExternalUser
 * ok
 */
const UnlockFaceUnlockUploadPhotoExternalUserOutputSchema = z.object({
});

type UnlockFaceUnlockUploadPhotoExternalUserOutput = z.infer<typeof UnlockFaceUnlockUploadPhotoExternalUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Remotely unlock the specified face unlock upload photo external user.
 *
 * @param input.path.external_id - The external_id parameter
 * @param input.query.overwrite - The overwrite parameter
 * @returns ok
 */
export async function unlockFaceUnlockUploadPhotoExternalUser(
  input: UnlockFaceUnlockUploadPhotoExternalUserInput
): Promise<APIResponse<UnlockFaceUnlockUploadPhotoExternalUserOutput>> {
  // Validate input
  const validated = UnlockFaceUnlockUploadPhotoExternalUserInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/access/external_users/{external_id}/face_unlock/upload_photo';
  path = path.replace('{external_id}', encodeURIComponent(String(validated.path.external_id)));

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.overwrite !== undefined) {
    queryParams.set('overwrite', String(validated.query.overwrite));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<UnlockFaceUnlockUploadPhotoExternalUserOutput>({
    method: 'POST',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UnlockFaceUnlockUploadPhotoExternalUserOutputSchema.parse(response.data);
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
export const unlockFaceUnlockUploadPhotoExternalUserMetadata = {
  name: 'unlock_face_unlock_upload_photo_external_user',
  description: `Remotely unlock the specified face unlock upload photo external user.`,
  inputSchema: UnlockFaceUnlockUploadPhotoExternalUserInputSchema,
  outputSchema: UnlockFaceUnlockUploadPhotoExternalUserOutputSchema,
  category: 'product/access',
  operationId: 'postFaceUnlockUploadPhotoExternalUserViewV2',
  method: 'POST' as const,
  path: '/v2/access/external_users/{external_id}/face_unlock/upload_photo',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
