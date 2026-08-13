/**
 * DeleteProfilePhotoUser Tool
 *
 * Delete a profile photo user. This action cannot be undone.
 *
 * @category product/access
 * @operationId deleteProfilePhotoUserViewV2
 * @method DELETE
 * @path /v2/access/users/{user_id}/profile_photo
 * @tags Access User Information
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
 * Input parameters for deleteProfilePhotoUser
 */
const DeleteProfilePhotoUserInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The user_id parameter (required) */
    user_id: z.string(),
  }),
});

type DeleteProfilePhotoUserInput = z.infer<typeof DeleteProfilePhotoUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteProfilePhotoUser
 * ok
 */
const DeleteProfilePhotoUserOutputSchema = z.object({
});

type DeleteProfilePhotoUserOutput = z.infer<typeof DeleteProfilePhotoUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a profile photo user. This action cannot be undone.
 *
 * @param input.path.user_id - The user_id parameter
 * @returns ok
 */
export async function deleteProfilePhotoUser(
  input: DeleteProfilePhotoUserInput
): Promise<APIResponse<DeleteProfilePhotoUserOutput>> {
  // Validate input
  const validated = DeleteProfilePhotoUserInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/access/users/{user_id}/profile_photo';
  path = path.replace('{user_id}', encodeURIComponent(String(validated.path.user_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<DeleteProfilePhotoUserOutput>({
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
export const deleteProfilePhotoUserMetadata = {
  name: 'delete_profile_photo_user',
  description: `Delete a profile photo user. This action cannot be undone.`,
  inputSchema: DeleteProfilePhotoUserInputSchema,
  outputSchema: DeleteProfilePhotoUserOutputSchema,
  category: 'product/access',
  operationId: 'deleteProfilePhotoUserViewV2',
  method: 'DELETE' as const,
  path: '/v2/access/users/{user_id}/profile_photo',
  requiresAuth: true,
  tags: ['Access User Information'],
};
