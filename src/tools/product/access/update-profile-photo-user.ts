/**
 * UpdateProfilePhotoUser Tool
 *
 * Update an existing profile photo user. Only the provided fields will be changed.
 *
 * @category product/access
 * @operationId putProfilePhotoUserViewV2
 * @method PUT
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
 * Input parameters for updateProfilePhotoUser
 */
const UpdateProfilePhotoUserInputSchema = z.object({
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
  /** Body parameters */
  body: z.object({
    /** Profile photo file. Submit as multipart/form-data with the field name &#x27;file&#x27;. */
    file: z.string().optional(),
  }),
});

type UpdateProfilePhotoUserInput = z.infer<typeof UpdateProfilePhotoUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateProfilePhotoUser
 * OK
 */
const UpdateProfilePhotoUserOutputSchema = z.object({
});

type UpdateProfilePhotoUserOutput = z.infer<typeof UpdateProfilePhotoUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing profile photo user. Only the provided fields will be changed.
 *
 * @param input.path.user_id - The user_id parameter
 * @param input.query.overwrite - The overwrite parameter
 * @param input.body.file - Profile photo file. Submit as multipart/form-data with the field name &#x27;file&#x27;.
 * @returns OK
 */
export async function updateProfilePhotoUser(
  input: UpdateProfilePhotoUserInput
): Promise<APIResponse<UpdateProfilePhotoUserOutput>> {
  // Validate input
  const validated = UpdateProfilePhotoUserInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/access/users/{user_id}/profile_photo';
  path = path.replace('{user_id}', encodeURIComponent(String(validated.path.user_id)));

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.overwrite !== undefined) {
    queryParams.set('overwrite', String(validated.query.overwrite));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<UpdateProfilePhotoUserOutput>({
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
export const updateProfilePhotoUserMetadata = {
  name: 'update_profile_photo_user',
  description: `Update an existing profile photo user. Only the provided fields will be changed.`,
  inputSchema: UpdateProfilePhotoUserInputSchema,
  outputSchema: UpdateProfilePhotoUserOutputSchema,
  category: 'product/access',
  operationId: 'putProfilePhotoUserViewV2',
  method: 'PUT' as const,
  path: '/v2/access/users/{user_id}/profile_photo',
  requiresAuth: true,
  tags: ['Access User Information'],
};
