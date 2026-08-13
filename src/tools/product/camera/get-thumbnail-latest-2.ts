/**
 * GetThumbnailLatest_2 Tool
 *
 * Get a specific thumbnail latest by ID. Returns detailed information about the thumbnail latest.
 *
 * @category product/camera
 * @operationId getThumbnailLatestViewV2
 * @method GET
 * @path /v2/cameras/{camera_id}/footage/thumbnails/latest
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
 * Input parameters for getThumbnailLatest_2
 */
const GetThumbnailLatest_2InputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
  }),
  /** Path parameters */
  query: z.object({
    /** The resolution parameter */
    resolution: z.enum(['low-res', 'hi-res']).optional(),
  }),
});

type GetThumbnailLatest_2Input = z.infer<typeof GetThumbnailLatest_2InputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getThumbnailLatest_2
 * ok
 */
const GetThumbnailLatest_2OutputSchema = z.object({
});

type GetThumbnailLatest_2Output = z.infer<typeof GetThumbnailLatest_2OutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific thumbnail latest by ID. Returns detailed information about the thumbnail latest.
 *
 * @param input.path.camera_id - The camera_id parameter
 * @param input.query.resolution - The resolution parameter
 * @returns ok
 */
export async function getThumbnailLatest_2(
  input: GetThumbnailLatest_2Input
): Promise<APIResponse<GetThumbnailLatest_2Output>> {
  // Validate input
  const validated = GetThumbnailLatest_2InputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/{camera_id}/footage/thumbnails/latest';
  path = path.replace('{camera_id}', encodeURIComponent(String(validated.path.camera_id)));

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.resolution !== undefined) {
    queryParams.set('resolution', String(validated.query.resolution));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetThumbnailLatest_2Output>({
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
export const getThumbnailLatest_2Metadata = {
  name: 'get_thumbnail_latest_2',
  description: `Get a specific thumbnail latest by ID. Returns detailed information about the thumbnail latest.`,
  inputSchema: GetThumbnailLatest_2InputSchema,
  outputSchema: GetThumbnailLatest_2OutputSchema,
  category: 'product/camera',
  operationId: 'getThumbnailLatestViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/{camera_id}/footage/thumbnails/latest',
  requiresAuth: true,
  tags: ['Footage'],
};
