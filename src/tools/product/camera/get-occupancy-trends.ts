/**
 * GetOccupancyTrends Tool
 *
 * Get a specific occupancy trends by ID. Returns detailed information about the occupancy trends.
 *
 * @category product/camera
 * @operationId getOccupancyTrendsView
 * @method GET
 * @path /cameras/v1/analytics/occupancy_trends
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
 * Input parameters for getOccupancyTrends
 */
const GetOccupancyTrendsInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The start_time parameter */
    start_time: z.number().int().optional(),
    /** The end_time parameter */
    end_time: z.number().int().optional(),
    /** The interval parameter */
    interval: z.enum(['15_minutes', '1_hour', '1_day']).optional(),
    /** The type parameter */
    type: z.enum(['person', 'vehicle']).optional(),
    /** The preset_id parameter */
    preset_id: z.string().optional(),
  }),
});

type GetOccupancyTrendsInput = z.infer<typeof GetOccupancyTrendsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getOccupancyTrends
 * OK
 */
const GetOccupancyTrendsOutputSchema = z.object({
  /** The address of the site for the camera. */
  camera_address: z.string().nullable(),
  /** The unique identifier of the camera. */
  camera_id: z.string().nullable(),
  /** The name of the camera. */
  camera_name: z.string().nullable(),
  /** The name of the site for the camera. */
  camera_site: z.string().nullable(),
  /** The end of the time range for occupancy trends. */
  end_time: z.number().int().nullable(),
  /** The unique identifier of the organization. */
  org_id: z.string().nullable(),
  /** The name of the organization. */
  org_name: z.string().nullable(),
  /** The unique identifier of the camera preset. */
  preset_id: z.string().nullable(),
  /** The start of the time range of occupancy trends. */
  start_time: z.number().int().nullable(),
  /** An array with range timestamps, and count for “in” direction. */
  trend_in: z.array(z.array(z.number().int())).nullable(),
  /** An array with range timestamps, and count for “out” direction. */
  trend_out: z.array(z.array(z.number().int())).nullable(),
  /** The type of the counted object. */
  type: z.enum(['person', 'vehicle']).nullable(),
});

type GetOccupancyTrendsOutput = z.infer<typeof GetOccupancyTrendsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific occupancy trends by ID. Returns detailed information about the occupancy trends.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.interval - The interval parameter
 * @param input.query.type - The type parameter
 * @param input.query.preset_id - The preset_id parameter
 * @returns OK
 */
export async function getOccupancyTrends(
  input: GetOccupancyTrendsInput
): Promise<APIResponse<GetOccupancyTrendsOutput>> {
  // Validate input
  const validated = GetOccupancyTrendsInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/analytics/occupancy_trends';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.camera_id !== undefined) {
    queryParams.set('camera_id', String(validated.query.camera_id));
  }
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
  const response = await callVerkadaAPI<GetOccupancyTrendsOutput>({
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
export const getOccupancyTrendsMetadata = {
  name: 'get_occupancy_trends',
  description: `Get a specific occupancy trends by ID. Returns detailed information about the occupancy trends.`,
  inputSchema: GetOccupancyTrendsInputSchema,
  outputSchema: GetOccupancyTrendsOutputSchema,
  category: 'product/camera',
  operationId: 'getOccupancyTrendsView',
  method: 'GET' as const,
  path: '/cameras/v1/analytics/occupancy_trends',
  requiresAuth: true,
  tags: ['Analytics'],
};
