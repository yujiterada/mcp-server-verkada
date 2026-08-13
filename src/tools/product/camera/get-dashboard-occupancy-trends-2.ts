/**
 * GetDashboardOccupancyTrends_2 Tool
 *
 * Get a specific dashboard occupancy trends by ID. Returns detailed information about the dashboard occupancy trends.
 *
 * @category product/camera
 * @operationId getDashboardOccupancyTrendsViewV2
 * @method GET
 * @path /v2/analytics/operational_dashboard/{dashboard_id}/occupancy_trends
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
 * Input parameters for getDashboardOccupancyTrends_2
 */
const GetDashboardOccupancyTrends_2InputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The dashboard_id parameter (required) */
    dashboard_id: z.string(),
  }),
  /** Path parameters */
  query: z.object({
    /** The start_time parameter */
    start_time: z.string().optional(),
    /** The end_time parameter */
    end_time: z.string().optional(),
    /** The interval parameter */
    interval: z.enum(['15_minutes', '1_hour', '1_day']).optional(),
  }),
});

type GetDashboardOccupancyTrends_2Input = z.infer<typeof GetDashboardOccupancyTrends_2InputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getDashboardOccupancyTrends_2
 * OK
 */
const GetDashboardOccupancyTrends_2OutputSchema = z.object({
  /** The unique identifier of the dashboard. */
  dashboard_id: z.string().nullable(),
  /** The name of the dashboard. */
  dashboard_name: z.string().nullable(),
  /** The end of the time range of occupancy trends, as an RFC 3339 timestamp. */
  end_time: z.string().nullable(),
  /** Per-bucket counts for the &quot;in&quot; direction. */
  in_counts: z.array(z.object({ count: z.number().int().nullable(), end_time: z.string().nullable(), start_time: z.string().nullable() })).nullable(),
  /** The time interval used for the buckets. */
  interval: z.enum(['15_minutes', '1_hour', '1_day']).nullable(),
  /** Per-bucket net occupancy values. */
  net_occupancy: z.array(z.object({ count: z.number().int().nullable(), end_time: z.string().nullable(), start_time: z.string().nullable() })).nullable(),
  /** Per-bucket counts for the &quot;out&quot; direction. */
  out_counts: z.array(z.object({ count: z.number().int().nullable(), end_time: z.string().nullable(), start_time: z.string().nullable() })).nullable(),
  /** The start of the time range of occupancy trends, as an RFC 3339 timestamp. */
  start_time: z.string().nullable(),
});

type GetDashboardOccupancyTrends_2Output = z.infer<typeof GetDashboardOccupancyTrends_2OutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific dashboard occupancy trends by ID. Returns detailed information about the dashboard occupancy trends.
 *
 * @param input.path.dashboard_id - The dashboard_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.interval - The interval parameter
 * @returns OK
 */
export async function getDashboardOccupancyTrends_2(
  input: GetDashboardOccupancyTrends_2Input
): Promise<APIResponse<GetDashboardOccupancyTrends_2Output>> {
  // Validate input
  const validated = GetDashboardOccupancyTrends_2InputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/analytics/operational_dashboard/{dashboard_id}/occupancy_trends';
  path = path.replace('{dashboard_id}', encodeURIComponent(String(validated.path.dashboard_id)));

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
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetDashboardOccupancyTrends_2Output>({
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
export const getDashboardOccupancyTrends_2Metadata = {
  name: 'get_dashboard_occupancy_trends_2',
  description: `Get a specific dashboard occupancy trends by ID. Returns detailed information about the dashboard occupancy trends.`,
  inputSchema: GetDashboardOccupancyTrends_2InputSchema,
  outputSchema: GetDashboardOccupancyTrends_2OutputSchema,
  category: 'product/camera',
  operationId: 'getDashboardOccupancyTrendsViewV2',
  method: 'GET' as const,
  path: '/v2/analytics/operational_dashboard/{dashboard_id}/occupancy_trends',
  requiresAuth: true,
  tags: ['Analytics'],
};
