/**
 * ListLprTimestampsView Tool
 *
 * List all lpr timestamps view. Use this to enumerate or search through lpr timestamps view. Supports pagination.
 *
 * @category product/camera
 * @operationId getLPRTimestampsView
 * @method GET
 * @path /cameras/v1/analytics/lpr/timestamps
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
 * Input parameters for listLprTimestampsView
 */
const ListLprTimestampsViewInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The license_plate parameter (required) */
    license_plate: z.string(),
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

type ListLprTimestampsViewInput = z.infer<typeof ListLprTimestampsViewInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listLprTimestampsView
 * OK
 */
const ListLprTimestampsViewOutputSchema = z.object({
  /** The unique identifier of the camera. */
  camera_id: z.string().nullable(),
  /** The timestamps when the license plate was detected.
Formatted as a Unix timestamp in seconds. */
  detections: z.array(z.number().int()).nullable(),
  /** The requested license plate number. */
  license_plate: z.string().nullable(),
  /** The pagination token used to fetch the next page of results. */
  next_page_token: z.number().int().nullable(),
});

type ListLprTimestampsViewOutput = z.infer<typeof ListLprTimestampsViewOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all lpr timestamps view. Use this to enumerate or search through lpr timestamps view. Supports pagination.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.license_plate - The license_plate parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.page_size - The page_size parameter
 * @param input.query.page_token - The page_token parameter
 * @returns OK
 */
export async function listLprTimestampsView(
  input: ListLprTimestampsViewInput
): Promise<APIResponse<ListLprTimestampsViewOutput>> {
  // Validate input
  const validated = ListLprTimestampsViewInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/analytics/lpr/timestamps';

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
  const response = await callVerkadaAPI<ListLprTimestampsViewOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ListLprTimestampsViewOutputSchema.parse(response.data);
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
export const listLprTimestampsViewMetadata = {
  name: 'list_lpr_timestamps_view',
  description: `List all lpr timestamps view. Use this to enumerate or search through lpr timestamps view. Supports pagination.`,
  inputSchema: ListLprTimestampsViewInputSchema,
  outputSchema: ListLprTimestampsViewOutputSchema,
  category: 'product/camera',
  operationId: 'getLPRTimestampsView',
  method: 'GET' as const,
  path: '/cameras/v1/analytics/lpr/timestamps',
  requiresAuth: true,
  tags: ['LPR'],
};
