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
  /** Body parameters */
  body: z.object({
    /** Whether to overwrite an existing face credential. Default is false. */
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
 * @param input.body.overwrite - Whether to overwrite an existing face credential. Default is false.
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

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UnlockFaceUnlockUploadPhotoExternalUserOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      overwrite: validated.body.overwrite,
    },
  });

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
