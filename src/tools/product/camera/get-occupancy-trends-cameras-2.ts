/**
 * GetOccupancyTrendsCameras_2 Tool
 *
 * Get a specific occupancy trends cameras by ID. Returns detailed information about the occupancy trends cameras. Supports pagination.
 *
 * @category product/camera
 * @operationId getOccupancyTrendsCamerasViewV2
 * @method GET
 * @path /v2/cameras/occupancy_trends
 * @tags Devices
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
 * Input parameters for getOccupancyTrendsCameras_2
 */
const GetOccupancyTrendsCameras_2InputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The cursor parameter */
    cursor: z.string().optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(200).optional(),
  }),
});

type GetOccupancyTrendsCameras_2Input = z.infer<typeof GetOccupancyTrendsCameras_2InputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getOccupancyTrendsCameras_2
 * OK
 */
const GetOccupancyTrendsCameras_2OutputSchema = z.object({
  /** Pagination cursor for the next page of results. Continue paginating while this field is present. */
  cursor: z.string().nullable(),
  /** A page of cameras configured for occupancy trends. */
  items: z.array(z.object({ camera_id: z.string().nullable(), presets: z.array(z.object({ object_class: z.string().nullable(), preset_id: z.string().nullable() })).nullable().optional() })).nullable(),
});

type GetOccupancyTrendsCameras_2Output = z.infer<typeof GetOccupancyTrendsCameras_2OutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific occupancy trends cameras by ID. Returns detailed information about the occupancy trends cameras. Supports pagination.
 *
 * @param input.query.cursor - The cursor parameter
 * @param input.query.limit - The limit parameter
 * @returns OK
 */
export async function getOccupancyTrendsCameras_2(
  input: GetOccupancyTrendsCameras_2Input
): Promise<APIResponse<GetOccupancyTrendsCameras_2Output>> {
  // Validate input
  const validated = GetOccupancyTrendsCameras_2InputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/occupancy_trends';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.cursor !== undefined) {
    queryParams.set('cursor', String(validated.query.cursor));
  }
  if (validated.query.limit !== undefined) {
    queryParams.set('limit', String(validated.query.limit));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetOccupancyTrendsCameras_2Output>({
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
export const getOccupancyTrendsCameras_2Metadata = {
  name: 'get_occupancy_trends_cameras_2',
  description: `Get a specific occupancy trends cameras by ID. Returns detailed information about the occupancy trends cameras. Supports pagination.`,
  inputSchema: GetOccupancyTrendsCameras_2InputSchema,
  outputSchema: GetOccupancyTrendsCameras_2OutputSchema,
  category: 'product/camera',
  operationId: 'getOccupancyTrendsCamerasViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/occupancy_trends',
  requiresAuth: true,
  tags: ['Devices'],
};
