/**
 * DeleteProfilePhoto Tool
 *
 * Delete a profile photo. This action cannot be undone.
 *
 * @category product/access
 * @operationId deleteProfilePhotoViewV1
 * @method DELETE
 * @path /access/v1/access_users/user/profile_photo
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
 * Input parameters for deleteProfilePhoto
 */
const DeleteProfilePhotoInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The user_id parameter */
    user_id: z.string().uuid().optional(),
    /** The external_id parameter */
    external_id: z.string().optional(),
  }),
});

type DeleteProfilePhotoInput = z.infer<typeof DeleteProfilePhotoInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteProfilePhoto
 * OK
 */
const DeleteProfilePhotoOutputSchema = z.object({
});

type DeleteProfilePhotoOutput = z.infer<typeof DeleteProfilePhotoOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a profile photo. This action cannot be undone.
 *
 * @param input.query.user_id - The user_id parameter
 * @param input.query.external_id - The external_id parameter
 * @returns OK
 */
export async function deleteProfilePhoto(
  input: DeleteProfilePhotoInput
): Promise<APIResponse<DeleteProfilePhotoOutput>> {
  // Validate input
  const validated = DeleteProfilePhotoInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/access_users/user/profile_photo';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.user_id !== undefined) {
    queryParams.set('user_id', String(validated.query.user_id));
  }
  if (validated.query.external_id !== undefined) {
    queryParams.set('external_id', String(validated.query.external_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<DeleteProfilePhotoOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteProfilePhotoOutputSchema.parse(response.data);
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
export const deleteProfilePhotoMetadata = {
  name: 'delete_profile_photo',
  description: `Delete a profile photo. This action cannot be undone.`,
  inputSchema: DeleteProfilePhotoInputSchema,
  outputSchema: DeleteProfilePhotoOutputSchema,
  category: 'product/access',
  operationId: 'deleteProfilePhotoViewV1',
  method: 'DELETE' as const,
  path: '/access/v1/access_users/user/profile_photo',
  requiresAuth: true,
  tags: ['Access User Information'],
};
