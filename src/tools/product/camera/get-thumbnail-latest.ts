/**
 * GetThumbnailLatest Tool
 *
 * Get a specific thumbnail latest by ID. Returns detailed information about the thumbnail latest.
 *
 * @category product/camera
 * @operationId getThumbnailLatestViewV1
 * @method GET
 * @path /cameras/v1/footage/thumbnails/latest
 * @tags Footage
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
 * Input parameters for getThumbnailLatest
 */
const GetThumbnailLatestInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The resolution parameter */
    resolution: z.enum(['low-res', 'hi-res']).optional(),
  }),
});

type GetThumbnailLatestInput = z.infer<typeof GetThumbnailLatestInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getThumbnailLatest
 * Returns image data in base64 format
 */
const GetThumbnailLatestOutputSchema = z.object({
  type: z.literal('image'),
  data: z.string(),
  mimeType: z.string(),
});

type GetThumbnailLatestOutput = z.infer<typeof GetThumbnailLatestOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific thumbnail latest by ID. Returns detailed information about the thumbnail latest.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.resolution - The resolution parameter
 * @returns ok
 */
export async function getThumbnailLatest(
  input: GetThumbnailLatestInput
): Promise<APIResponse<GetThumbnailLatestOutput>> {
  // Validate input
  const validated = GetThumbnailLatestInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/footage/thumbnails/latest';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.camera_id !== undefined) {
    queryParams.set('camera_id', String(validated.query.camera_id));
  }
  if (validated.query.resolution !== undefined) {
    queryParams.set('resolution', String(validated.query.resolution));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetThumbnailLatestOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetThumbnailLatestOutputSchema.parse(response.data);
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
export const getThumbnailLatestMetadata = {
  name: 'get_thumbnail_latest',
  description: `Get a specific thumbnail latest by ID. Returns detailed information about the thumbnail latest.`,
  inputSchema: GetThumbnailLatestInputSchema,
  outputSchema: GetThumbnailLatestOutputSchema,
  category: 'product/camera',
  operationId: 'getThumbnailLatestViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/footage/thumbnails/latest',
  requiresAuth: true,
  tags: ['Footage'],
};
