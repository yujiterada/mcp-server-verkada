/**
 * ListLprImages Tool
 *
 * List all lpr images. Use this to enumerate or search through lpr images. Supports pagination.
 *
 * @category product/camera
 * @operationId getLPRImagesView
 * @method GET
 * @path /cameras/v1/analytics/lpr/images
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
 * Input parameters for listLprImages
 */
const ListLprImagesInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The license_plate parameter */
    license_plate: z.string().optional(),
    /** The start_time parameter */
    start_time: z.number().int().optional(),
    /** The end_time parameter */
    end_time: z.number().int().optional(),
    /** The page_size parameter */
    page_size: z.number().int().min(0).max(200).optional(),
    /** The page_token parameter */
    page_token: z.number().int().optional(),
  }),
});

type ListLprImagesInput = z.infer<typeof ListLprImagesInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listLprImages
 * OK
 */
const ListLprImagesOutputSchema = z.object({
  /** The unique identifier of the camera. */
  camera_id: z.string().nullable(),
  /** The detected license plates */
  detections: z.array(z.object({ image_url: z.string().nullable().optional(), license_plate: z.string().nullable().optional(), timestamp: z.number().int().nullable().optional(), vehicle_image_url: z.string().nullable().optional() })).nullable(),
  /** The pagination token used to fetch the next page of results. */
  next_page_token: z.number().int().nullable(),
});

type ListLprImagesOutput = z.infer<typeof ListLprImagesOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all lpr images. Use this to enumerate or search through lpr images. Supports pagination.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.license_plate - The license_plate parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.page_size - The page_size parameter
 * @param input.query.page_token - The page_token parameter
 * @returns OK
 */
export async function listLprImages(
  input: ListLprImagesInput
): Promise<APIResponse<ListLprImagesOutput>> {
  // Validate input
  const validated = ListLprImagesInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/analytics/lpr/images';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.camera_id !== undefined) {
    queryParams.set('camera_id', String(validated.query.camera_id));
  }
  if (validated.query.license_plate !== undefined) {
    queryParams.set('license_plate', String(validated.query.license_plate));
  }
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
  }
  if (validated.query.page_size !== undefined) {
    queryParams.set('page_size', String(validated.query.page_size));
  }
  if (validated.query.page_token !== undefined) {
    queryParams.set('page_token', String(validated.query.page_token));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<ListLprImagesOutput>({
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
export const listLprImagesMetadata = {
  name: 'list_lpr_images',
  description: `List all lpr images. Use this to enumerate or search through lpr images. Supports pagination.`,
  inputSchema: ListLprImagesInputSchema,
  outputSchema: ListLprImagesOutputSchema,
  category: 'product/camera',
  operationId: 'getLPRImagesView',
  method: 'GET' as const,
  path: '/cameras/v1/analytics/lpr/images',
  requiresAuth: true,
  tags: ['LPR'],
};
