/**
 * UnlockFaceUnlockCopyUserPhotoUser Tool
 *
 * Remotely unlock the specified face unlock copy user photo user.
 *
 * @category product/access
 * @operationId postFaceUnlockCopyUserPhotoUserViewV2
 * @method POST
 * @path /v2/access/users/{user_id}/face_unlock/copy_user_photo
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
 * Input parameters for unlockFaceUnlockCopyUserPhotoUser
 */
const UnlockFaceUnlockCopyUserPhotoUserInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The user_id parameter (required) */
    user_id: z.string(),
  }),
  /** Path parameters */
  query: z.object({
    /** The overwrite parameter */
    overwrite: z.boolean().optional(),
  }),
});

type UnlockFaceUnlockCopyUserPhotoUserInput = z.infer<typeof UnlockFaceUnlockCopyUserPhotoUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for unlockFaceUnlockCopyUserPhotoUser
 * ok
 */
const UnlockFaceUnlockCopyUserPhotoUserOutputSchema = z.object({
});

type UnlockFaceUnlockCopyUserPhotoUserOutput = z.infer<typeof UnlockFaceUnlockCopyUserPhotoUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Remotely unlock the specified face unlock copy user photo user.
 *
 * @param input.path.user_id - The user_id parameter
 * @param input.query.overwrite - The overwrite parameter
 * @returns ok
 */
export async function unlockFaceUnlockCopyUserPhotoUser(
  input: UnlockFaceUnlockCopyUserPhotoUserInput
): Promise<APIResponse<UnlockFaceUnlockCopyUserPhotoUserOutput>> {
  // Validate input
  const validated = UnlockFaceUnlockCopyUserPhotoUserInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/access/users/{user_id}/face_unlock/copy_user_photo';
  path = path.replace('{user_id}', encodeURIComponent(String(validated.path.user_id)));

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.overwrite !== undefined) {
    queryParams.set('overwrite', String(validated.query.overwrite));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<UnlockFaceUnlockCopyUserPhotoUserOutput>({
    method: 'POST',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UnlockFaceUnlockCopyUserPhotoUserOutputSchema.parse(response.data);
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
export const unlockFaceUnlockCopyUserPhotoUserMetadata = {
  name: 'unlock_face_unlock_copy_user_photo_user',
  description: `Remotely unlock the specified face unlock copy user photo user.`,
  inputSchema: UnlockFaceUnlockCopyUserPhotoUserInputSchema,
  outputSchema: UnlockFaceUnlockCopyUserPhotoUserOutputSchema,
  category: 'product/access',
  operationId: 'postFaceUnlockCopyUserPhotoUserViewV2',
  method: 'POST' as const,
  path: '/v2/access/users/{user_id}/face_unlock/copy_user_photo',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
