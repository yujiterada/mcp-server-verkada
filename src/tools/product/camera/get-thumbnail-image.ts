/**
 * GetThumbnailImage Tool
 *
 * Get a specific thumbnail image by ID. Returns detailed information about the thumbnail image.
 *
 * @category product/camera
 * @operationId getThumbnailImageViewV1
 * @method GET
 * @path /cameras/v1/footage/thumbnails
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
 * Input parameters for getThumbnailImage
 */
const GetThumbnailImageInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The timestamp parameter */
    timestamp: z.number().int().optional(),
    /** The resolution parameter */
    resolution: z.enum(['low-res', 'hi-res']).optional(),
  }),
});

type GetThumbnailImageInput = z.infer<typeof GetThumbnailImageInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getThumbnailImage
 * Returns image data in base64 format
 */
const GetThumbnailImageOutputSchema = z.object({
});

type GetThumbnailImageOutput = z.infer<typeof GetThumbnailImageOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific thumbnail image by ID. Returns detailed information about the thumbnail image.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.timestamp - The timestamp parameter
 * @param input.query.resolution - The resolution parameter
 * @returns ok
 */
export async function getThumbnailImage(
  input: GetThumbnailImageInput
): Promise<APIResponse<GetThumbnailImageOutput>> {
  // Validate input
  const validated = GetThumbnailImageInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/footage/thumbnails';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.camera_id !== undefined) {
    queryParams.set('camera_id', String(validated.query.camera_id));
  }
  if (validated.query.timestamp !== undefined) {
    queryParams.set('timestamp', String(validated.query.timestamp));
  }
  if (validated.query.resolution !== undefined) {
    queryParams.set('resolution', String(validated.query.resolution));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetThumbnailImageOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetThumbnailImageOutputSchema.parse(response.data);
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
export const getThumbnailImageMetadata = {
  name: 'get_thumbnail_image',
  description: `Get a specific thumbnail image by ID. Returns detailed information about the thumbnail image.`,
  inputSchema: GetThumbnailImageInputSchema,
  outputSchema: GetThumbnailImageOutputSchema,
  category: 'product/camera',
  operationId: 'getThumbnailImageViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/footage/thumbnails',
  requiresAuth: true,
  tags: ['Footage'],
};
