/**
 * GetThumbnailLink_2 Tool
 *
 * Get a specific thumbnail link by ID. Returns detailed information about the thumbnail link.
 *
 * @category product/camera
 * @operationId getThumbnailLinkViewV2
 * @method GET
 * @path /v2/cameras/footage/thumbnails/link
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
 * Input parameters for getThumbnailLink_2
 */
const GetThumbnailLink_2InputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string().min(1),
    /** The timestamp parameter */
    timestamp: z.string().optional(),
    /** The expiry parameter */
    expiry: z.string().optional(),
  }),
});

type GetThumbnailLink_2Input = z.infer<typeof GetThumbnailLink_2InputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getThumbnailLink_2
 * OK
 */
const GetThumbnailLink_2OutputSchema = z.object({
  /** When the generated link expires, in RFC 3339 format (e.g., 2025-08-05T21:51:53+00:00). */
  expiry: z.string().nullable(),
  /** When the thumbnail was captured, in RFC 3339 format (e.g., 2025-08-04T21:51:53+00:00). */
  timestamp: z.string().nullable(),
  /** The link to the thumbnail image. */
  url: z.string().nullable(),
});

type GetThumbnailLink_2Output = z.infer<typeof GetThumbnailLink_2OutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific thumbnail link by ID. Returns detailed information about the thumbnail link.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.timestamp - The timestamp parameter
 * @param input.query.expiry - The expiry parameter
 * @returns OK
 */
export async function getThumbnailLink_2(
  input: GetThumbnailLink_2Input
): Promise<APIResponse<GetThumbnailLink_2Output>> {
  // Validate input
  const validated = GetThumbnailLink_2InputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/footage/thumbnails/link';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.camera_id !== undefined) {
    queryParams.set('camera_id', String(validated.query.camera_id));
  }
  if (validated.query.timestamp !== undefined) {
    queryParams.set('timestamp', String(validated.query.timestamp));
  }
  if (validated.query.expiry !== undefined) {
    queryParams.set('expiry', String(validated.query.expiry));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetThumbnailLink_2Output>({
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
export const getThumbnailLink_2Metadata = {
  name: 'get_thumbnail_link_2',
  description: `Get a specific thumbnail link by ID. Returns detailed information about the thumbnail link.`,
  inputSchema: GetThumbnailLink_2InputSchema,
  outputSchema: GetThumbnailLink_2OutputSchema,
  category: 'product/camera',
  operationId: 'getThumbnailLinkViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/footage/thumbnails/link',
  requiresAuth: true,
  tags: ['Footage'],
};
