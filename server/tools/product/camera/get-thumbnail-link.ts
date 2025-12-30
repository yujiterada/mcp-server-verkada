/**
 * GetThumbnailLink Tool
 *
 * Get a specific thumbnail link by ID. Returns detailed information about the thumbnail link.
 *
 * @category product/camera
 * @operationId getThumbnailLinkViewV1
 * @method GET
 * @path /cameras/v1/footage/thumbnails/link
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
 * Input parameters for getThumbnailLink
 */
const GetThumbnailLinkInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The timestamp parameter */
    timestamp: z.number().int().optional(),
    /** The expiry parameter */
    expiry: z.number().int().optional(),
  }),
});

type GetThumbnailLinkInput = z.infer<typeof GetThumbnailLinkInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getThumbnailLink
 * OK
 */
const GetThumbnailLinkOutputSchema = z.object({
  /** The expiry duration for the generated link. */
  expiry: z.number().int(),
  /** The timestamp when thumbnail was captured.
Formatted as a Unix timestamp in seconds. */
  timestamp: z.number().int(),
  /** The link to the thumbnail. */
  url: z.string(),
});

type GetThumbnailLinkOutput = z.infer<typeof GetThumbnailLinkOutputSchema>;

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
export async function getThumbnailLink(
  input: GetThumbnailLinkInput
): Promise<APIResponse<GetThumbnailLinkOutput>> {
  // Validate input
  const validated = GetThumbnailLinkInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/footage/thumbnails/link';

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
  const response = await callVerkadaAPI<GetThumbnailLinkOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetThumbnailLinkOutputSchema.parse(response.data);
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
export const getThumbnailLinkMetadata = {
  name: 'get_thumbnail_link',
  description: `Get a specific thumbnail link by ID. Returns detailed information about the thumbnail link.`,
  inputSchema: GetThumbnailLinkInputSchema,
  outputSchema: GetThumbnailLinkOutputSchema,
  category: 'product/camera',
  operationId: 'getThumbnailLinkViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/footage/thumbnails/link',
  requiresAuth: true,
  tags: ['Footage'],
};
