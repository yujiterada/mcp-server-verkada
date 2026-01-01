/**
 * GetDashboardOccupancyTrends Tool
 *
 * Get a specific dashboard occupancy trends by ID. Returns detailed information about the dashboard occupancy trends.
 *
 * @category product/camera
 * @operationId getDashboardOccupancyTrendsView
 * @method GET
 * @path /cameras/v1/analytics/dashboard_occupancy_trends
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
 * Input parameters for getDashboardOccupancyTrends
 */
const GetDashboardOccupancyTrendsInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The dashboard_id parameter (required) */
    dashboard_id: z.string(),
    /** The start_time parameter */
    start_time: z.number().int().optional(),
    /** The end_time parameter */
    end_time: z.number().int().optional(),
    /** The interval parameter */
    interval: z.enum(['15_minutes', '1_hour', '1_day']).optional(),
  }),
});

type GetDashboardOccupancyTrendsInput = z.infer<typeof GetDashboardOccupancyTrendsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getDashboardOccupancyTrends
 * OK
 */
const GetDashboardOccupancyTrendsOutputSchema = z.object({
  /** The unique identifier of the dashboard. */
  dashboard_id: z.string(),
  /** The name of the dashboard. */
  dashboard_name: z.string(),
  /** The end of the time range for occupancy trends. */
  end_time: z.number().int(),
  /** An array with range timestamps, and net occupancy. */
  occupancy: z.array(z.array(z.number().int())),
  /** The unique identifier of the organization. */
  org_id: z.string(),
  /** The name of the organization. */
  org_name: z.string(),
  /** The start of the time range of occupancy trends. */
  start_time: z.number().int(),
  /** An array with range timestamps, and count for “in” direction. */
  trend_in: z.array(z.array(z.number().int())),
  /** An array with range timestamps, and count for “out” direction. */
  trend_out: z.array(z.array(z.number().int())),
});

type GetDashboardOccupancyTrendsOutput = z.infer<typeof GetDashboardOccupancyTrendsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific dashboard occupancy trends by ID. Returns detailed information about the dashboard occupancy trends.
 *
 * @param input.query.dashboard_id - The dashboard_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.interval - The interval parameter
 * @returns OK
 */
export async function getDashboardOccupancyTrends(
  input: GetDashboardOccupancyTrendsInput
): Promise<APIResponse<GetDashboardOccupancyTrendsOutput>> {
  // Validate input
  const validated = GetDashboardOccupancyTrendsInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/analytics/dashboard_occupancy_trends';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.dashboard_id !== undefined) {
    queryParams.set('dashboard_id', String(validated.query.dashboard_id));
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
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetDashboardOccupancyTrendsOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetDashboardOccupancyTrendsOutputSchema.parse(response.data);
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
export const getDashboardOccupancyTrendsMetadata = {
  name: 'get_dashboard_occupancy_trends',
  description: `Get a specific dashboard occupancy trends by ID. Returns detailed information about the dashboard occupancy trends.`,
  inputSchema: GetDashboardOccupancyTrendsInputSchema,
  outputSchema: GetDashboardOccupancyTrendsOutputSchema,
  category: 'product/camera',
  operationId: 'getDashboardOccupancyTrendsView',
  method: 'GET' as const,
  path: '/cameras/v1/analytics/dashboard_occupancy_trends',
  requiresAuth: true,
  tags: ['Analytics'],
};
