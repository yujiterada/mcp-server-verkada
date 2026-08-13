/**
 * GetLPRImages Tool
 *
 * Get a specific l p r images by ID. Returns detailed information about the l p r images. Supports pagination.
 *
 * @category product/camera
 * @operationId getLPRImagesViewV2
 * @method GET
 * @path /v2/cameras/{camera_id}/lpr/images
 * @tags LPR
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
 * Input parameters for getLPRImages
 */
const GetLPRImagesInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
  }),
  /** Path parameters */
  query: z.object({
    /** The license_plate parameter */
    license_plate: z.string().min(1).max(11).optional(),
    /** The start_time parameter */
    start_time: z.string().optional(),
    /** The end_time parameter */
    end_time: z.string().optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(200).optional(),
    /** The cursor parameter */
    cursor: z.string().optional(),
  }),
});

type GetLPRImagesInput = z.infer<typeof GetLPRImagesInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getLPRImages
 * OK
 */
const GetLPRImagesOutputSchema = z.object({
  /** Pagination cursor for retrieving the next page of results. Null if there are no more results. */
  cursor: z.string().nullable(),
  /** List of license plate detections with image URLs. */
  items: z.array(z.object({ detected_at: z.string().nullable(), image_url: z.string().nullable().optional(), license_plate: z.string().nullable(), vehicle_image_url: z.string().nullable().optional() })).nullable(),
});

type GetLPRImagesOutput = z.infer<typeof GetLPRImagesOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific l p r images by ID. Returns detailed information about the l p r images. Supports pagination.
 *
 * @param input.path.camera_id - The camera_id parameter
 * @param input.query.license_plate - The license_plate parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.limit - The limit parameter
 * @param input.query.cursor - The cursor parameter
 * @returns OK
 */
export async function getLPRImages(
  input: GetLPRImagesInput
): Promise<APIResponse<GetLPRImagesOutput>> {
  // Validate input
  const validated = GetLPRImagesInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/{camera_id}/lpr/images';
  path = path.replace('{camera_id}', encodeURIComponent(String(validated.path.camera_id)));

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.license_plate !== undefined) {
    queryParams.set('license_plate', String(validated.query.license_plate));
  }
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
  }
  if (validated.query.limit !== undefined) {
    queryParams.set('limit', String(validated.query.limit));
  }
  if (validated.query.cursor !== undefined) {
    queryParams.set('cursor', String(validated.query.cursor));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetLPRImagesOutput>({
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
export const getLPRImagesMetadata = {
  name: 'get_l_p_r_images',
  description: `Get a specific l p r images by ID. Returns detailed information about the l p r images. Supports pagination.`,
  inputSchema: GetLPRImagesInputSchema,
  outputSchema: GetLPRImagesOutputSchema,
  category: 'product/camera',
  operationId: 'getLPRImagesViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/{camera_id}/lpr/images',
  requiresAuth: true,
  tags: ['LPR'],
};
