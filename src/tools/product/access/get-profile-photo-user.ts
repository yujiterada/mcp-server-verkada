/**
 * GetProfilePhotoUser Tool
 *
 * Get a specific profile photo user by ID. Returns detailed information about the profile photo user.
 *
 * @category product/access
 * @operationId getProfilePhotoUserViewV2
 * @method GET
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
 * Input parameters for getProfilePhotoUser
 */
const GetProfilePhotoUserInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The user_id parameter (required) */
    user_id: z.string(),
  }),
  /** Path parameters */
  query: z.object({
    /** The original parameter */
    original: z.boolean().optional(),
  }),
});

type GetProfilePhotoUserInput = z.infer<typeof GetProfilePhotoUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getProfilePhotoUser
 * OK
 */
const GetProfilePhotoUserOutputSchema = z.object({
});

type GetProfilePhotoUserOutput = z.infer<typeof GetProfilePhotoUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific profile photo user by ID. Returns detailed information about the profile photo user.
 *
 * @param input.path.user_id - The user_id parameter
 * @param input.query.original - The original parameter
 * @returns OK
 */
export async function getProfilePhotoUser(
  input: GetProfilePhotoUserInput
): Promise<APIResponse<GetProfilePhotoUserOutput>> {
  // Validate input
  const validated = GetProfilePhotoUserInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/access/users/{user_id}/profile_photo';
  path = path.replace('{user_id}', encodeURIComponent(String(validated.path.user_id)));

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.original !== undefined) {
    queryParams.set('original', String(validated.query.original));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetProfilePhotoUserOutput>({
    method: 'GET',
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
export const getProfilePhotoUserMetadata = {
  name: 'get_profile_photo_user',
  description: `Get a specific profile photo user by ID. Returns detailed information about the profile photo user.`,
  inputSchema: GetProfilePhotoUserInputSchema,
  outputSchema: GetProfilePhotoUserOutputSchema,
  category: 'product/access',
  operationId: 'getProfilePhotoUserViewV2',
  method: 'GET' as const,
  path: '/v2/access/users/{user_id}/profile_photo',
  requiresAuth: true,
  tags: ['Access User Information'],
};
