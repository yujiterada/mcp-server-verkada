/**
 * UnlockFaceUnlockUploadPhotoUser Tool
 *
 * Remotely unlock the specified face unlock upload photo user.
 *
 * @category product/access
 * @operationId postFaceUnlockUploadPhotoUserViewV2
 * @method POST
 * @path /v2/access/users/{user_id}/face_unlock/upload_photo
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
 * Input parameters for unlockFaceUnlockUploadPhotoUser
 */
const UnlockFaceUnlockUploadPhotoUserInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The user_id parameter (required) */
    user_id: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** Whether to overwrite an existing face credential. Default is false. */
    overwrite: z.boolean().optional(),
  }),
});

type UnlockFaceUnlockUploadPhotoUserInput = z.infer<typeof UnlockFaceUnlockUploadPhotoUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for unlockFaceUnlockUploadPhotoUser
 * ok
 */
const UnlockFaceUnlockUploadPhotoUserOutputSchema = z.object({
});

type UnlockFaceUnlockUploadPhotoUserOutput = z.infer<typeof UnlockFaceUnlockUploadPhotoUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Remotely unlock the specified face unlock upload photo user.
 *
 * @param input.path.user_id - The user_id parameter
 * @param input.body.overwrite - Whether to overwrite an existing face credential. Default is false.
 * @returns ok
 */
export async function unlockFaceUnlockUploadPhotoUser(
  input: UnlockFaceUnlockUploadPhotoUserInput
): Promise<APIResponse<UnlockFaceUnlockUploadPhotoUserOutput>> {
  // Validate input
  const validated = UnlockFaceUnlockUploadPhotoUserInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/access/users/{user_id}/face_unlock/upload_photo';
  path = path.replace('{user_id}', encodeURIComponent(String(validated.path.user_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UnlockFaceUnlockUploadPhotoUserOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      overwrite: validated.body.overwrite,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UnlockFaceUnlockUploadPhotoUserOutputSchema.parse(response.data);
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
export const unlockFaceUnlockUploadPhotoUserMetadata = {
  name: 'unlock_face_unlock_upload_photo_user',
  description: `Remotely unlock the specified face unlock upload photo user.`,
  inputSchema: UnlockFaceUnlockUploadPhotoUserInputSchema,
  outputSchema: UnlockFaceUnlockUploadPhotoUserOutputSchema,
  category: 'product/access',
  operationId: 'postFaceUnlockUploadPhotoUserViewV2',
  method: 'POST' as const,
  path: '/v2/access/users/{user_id}/face_unlock/upload_photo',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
