/**
 * UpdateProfilePhoto Tool
 *
 * Update an existing profile photo. Only the provided fields will be changed.
 *
 * @category product/access
 * @operationId putProfilePhotoViewV1
 * @method PUT
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
 * Input parameters for updateProfilePhoto
 */
const UpdateProfilePhotoInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The user_id parameter */
    user_id: z.string().uuid().optional(),
    /** The external_id parameter */
    external_id: z.string().optional(),
    /** The overwrite parameter */
    overwrite: z.boolean().optional(),
  }),
  /** Body parameters */
  body: z.object({
    /** Profile photo file path (formatted @/&lt;image-path&gt;) */
    file: z.string().optional(),
  }),
});

type UpdateProfilePhotoInput = z.infer<typeof UpdateProfilePhotoInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateProfilePhoto
 * OK
 */
const UpdateProfilePhotoOutputSchema = z.object({
});

type UpdateProfilePhotoOutput = z.infer<typeof UpdateProfilePhotoOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing profile photo. Only the provided fields will be changed.
 *
 * @param input.query.user_id - The user_id parameter
 * @param input.query.external_id - The external_id parameter
 * @param input.query.overwrite - The overwrite parameter
 * @param input.body.file - Profile photo file path (formatted @/&lt;image-path&gt;)
 * @returns OK
 */
export async function updateProfilePhoto(
  input: UpdateProfilePhotoInput
): Promise<APIResponse<UpdateProfilePhotoOutput>> {
  // Validate input
  const validated = UpdateProfilePhotoInputSchema.parse(input);

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
  if (validated.query.overwrite !== undefined) {
    queryParams.set('overwrite', String(validated.query.overwrite));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<UpdateProfilePhotoOutput>({
    method: 'PUT',
    path: fullPath,
    body: {
      file: validated.body.file,
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
export const updateProfilePhotoMetadata = {
  name: 'update_profile_photo',
  description: `Update an existing profile photo. Only the provided fields will be changed.`,
  inputSchema: UpdateProfilePhotoInputSchema,
  outputSchema: UpdateProfilePhotoOutputSchema,
  category: 'product/access',
  operationId: 'putProfilePhotoViewV1',
  method: 'PUT' as const,
  path: '/access/v1/access_users/user/profile_photo',
  requiresAuth: true,
  tags: ['Access User Information'],
};
