/**
 * GetOccupancyTrends_2 Tool
 *
 * Get a specific occupancy trends by ID. Returns detailed information about the occupancy trends.
 *
 * @category product/camera
 * @operationId getOccupancyTrendsViewV2
 * @method GET
 * @path /v2/cameras/{camera_id}/occupancy_trends
 * @tags Analytics
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
 * Input parameters for getOccupancyTrends_2
 */
const GetOccupancyTrends_2InputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
  }),
  /** Path parameters */
  query: z.object({
    /** The start_time parameter */
    start_time: z.string().datetime().optional(),
    /** The end_time parameter */
    end_time: z.string().datetime().optional(),
    /** The interval parameter */
    interval: z.enum(['15_minutes', '1_hour', '1_day']).optional(),
    /** The type parameter */
    type: z.enum(['person', 'vehicle']).optional(),
    /** The preset_id parameter */
    preset_id: z.string().optional(),
  }),
});

type GetOccupancyTrends_2Input = z.infer<typeof GetOccupancyTrends_2InputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getOccupancyTrends_2
 * OK
 */
const GetOccupancyTrends_2OutputSchema = z.object({
  /** The unique identifier of the camera. */
  camera_id: z.string().nullable(),
  /** The end of the queried time range as an RFC 3339 timestamp. */
  end_time: z.string().nullable(),
  /** The width of each returned bucket. */
  interval: z.enum(['15_minutes', '1_hour', '1_day']).nullable(),
  /** The unique identifier of the camera line preset. */
  preset_id: z.string().nullable(),
  /** The start of the queried time range as an RFC 3339 timestamp. */
  start_time: z.string().nullable(),
  /** The directional occupancy trend readings for the time range. */
  trends: z.object({ trend_in: z.array(z.object({ count: z.number().int().nullable(), end_time: z.string().nullable(), start_time: z.string().nullable() })).nullable().optional(), trend_out: z.array(z.object({ count: z.number().int().nullable(), end_time: z.string().nullable(), start_time: z.string().nullable() })).nullable().optional() }).nullable(),
  /** The class of the counted object. */
  type: z.enum(['person', 'vehicle']).nullable(),
});

type GetOccupancyTrends_2Output = z.infer<typeof GetOccupancyTrends_2OutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific occupancy trends by ID. Returns detailed information about the occupancy trends.
 *
 * @param input.path.camera_id - The camera_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.interval - The interval parameter
 * @param input.query.type - The type parameter
 * @param input.query.preset_id - The preset_id parameter
 * @returns OK
 */
export async function getOccupancyTrends_2(
  input: GetOccupancyTrends_2Input
): Promise<APIResponse<GetOccupancyTrends_2Output>> {
  // Validate input
  const validated = GetOccupancyTrends_2InputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/{camera_id}/occupancy_trends';
  path = path.replace('{camera_id}', encodeURIComponent(String(validated.path.camera_id)));

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
  }
  if (validated.query.interval !== undefined) {
    queryParams.set('interval', String(validated.query.interval));
  }
  if (validated.query.type !== undefined) {
    queryParams.set('type', String(validated.query.type));
  }
  if (validated.query.preset_id !== undefined) {
    queryParams.set('preset_id', String(validated.query.preset_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetOccupancyTrends_2Output>({
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
export const getOccupancyTrends_2Metadata = {
  name: 'get_occupancy_trends_2',
  description: `Get a specific occupancy trends by ID. Returns detailed information about the occupancy trends.`,
  inputSchema: GetOccupancyTrends_2InputSchema,
  outputSchema: GetOccupancyTrends_2OutputSchema,
  category: 'product/camera',
  operationId: 'getOccupancyTrendsViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/{camera_id}/occupancy_trends',
  requiresAuth: true,
  tags: ['Analytics'],
};
