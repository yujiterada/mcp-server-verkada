/**
 * GetProfilePhoto Tool
 *
 * Get a specific profile photo by ID. Returns detailed information about the profile photo.
 *
 * @category product/access
 * @operationId getProfilePhotoViewV1
 * @method GET
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
 * Input parameters for getProfilePhoto
 */
const GetProfilePhotoInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The user_id parameter */
    user_id: z.string().uuid().optional(),
    /** The external_id parameter */
    external_id: z.string().optional(),
    /** The original parameter */
    original: z.boolean().optional(),
  }),
});

type GetProfilePhotoInput = z.infer<typeof GetProfilePhotoInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getProfilePhoto
 * OK
 */
const GetProfilePhotoOutputSchema = z.object({
});

type GetProfilePhotoOutput = z.infer<typeof GetProfilePhotoOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific profile photo by ID. Returns detailed information about the profile photo.
 *
 * @param input.query.user_id - The user_id parameter
 * @param input.query.external_id - The external_id parameter
 * @param input.query.original - The original parameter
 * @returns OK
 */
export async function getProfilePhoto(
  input: GetProfilePhotoInput
): Promise<APIResponse<GetProfilePhotoOutput>> {
  // Validate input
  const validated = GetProfilePhotoInputSchema.parse(input);

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
  if (validated.query.original !== undefined) {
    queryParams.set('original', String(validated.query.original));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetProfilePhotoOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetProfilePhotoOutputSchema.parse(response.data);
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
export const getProfilePhotoMetadata = {
  name: 'get_profile_photo',
  description: `Get a specific profile photo by ID. Returns detailed information about the profile photo.`,
  inputSchema: GetProfilePhotoInputSchema,
  outputSchema: GetProfilePhotoOutputSchema,
  category: 'product/access',
  operationId: 'getProfilePhotoViewV1',
  method: 'GET' as const,
  path: '/access/v1/access_users/user/profile_photo',
  requiresAuth: true,
  tags: ['Access User Information'],
};
