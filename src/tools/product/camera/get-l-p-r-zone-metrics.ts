/**
 * GetLPRZoneMetrics Tool
 *
 * Get a specific l p r zone metrics by ID. Returns detailed information about the l p r zone metrics.
 *
 * @category product/camera
 * @operationId getLPRZoneMetricsViewV2
 * @method GET
 * @path /v2/cameras/lpr/zones/{zone_id}/metrics
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
 * Input parameters for getLPRZoneMetrics
 */
const GetLPRZoneMetricsInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The zone_id parameter (required) */
    zone_id: z.string(),
  }),
  /** Path parameters */
  query: z.object({
    /** The start_time parameter (required) */
    start_time: z.string(),
    /** The end_time parameter (required) */
    end_time: z.string(),
  }),
});

type GetLPRZoneMetricsInput = z.infer<typeof GetLPRZoneMetricsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getLPRZoneMetrics
 * OK
 */
const GetLPRZoneMetricsOutputSchema = z.object({
  /** Average time spent in the zone within the given range, as an ISO 8601 duration (e.g., &#x27;PT17M&#x27;). */
  avg_time_in_zone: z.string().nullable(),
  /** Total number of entries within the given range. */
  entries: z.number().int().nullable(),
  /** Total number of exits within the given range. */
  exits: z.number().int().nullable(),
  /** Maximum time spent in the zone within the given range, as an ISO 8601 duration (e.g., &#x27;PT27M&#x27;). */
  max_time_in_zone: z.string().nullable(),
  /** Median time spent in the zone within the given range, as an ISO 8601 duration (e.g., &#x27;PT15M&#x27;). */
  median_time_in_zone: z.string().nullable(),
  /** Total occupancy at the end of the given range. */
  occupancy: z.number().int().nullable(),
  /** Total number of unique visitors within the given range. */
  unique_visitors: z.number().int().nullable(),
});

type GetLPRZoneMetricsOutput = z.infer<typeof GetLPRZoneMetricsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific l p r zone metrics by ID. Returns detailed information about the l p r zone metrics.
 *
 * @param input.path.zone_id - The zone_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @returns OK
 */
export async function getLPRZoneMetrics(
  input: GetLPRZoneMetricsInput
): Promise<APIResponse<GetLPRZoneMetricsOutput>> {
  // Validate input
  const validated = GetLPRZoneMetricsInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/lpr/zones/{zone_id}/metrics';
  path = path.replace('{zone_id}', encodeURIComponent(String(validated.path.zone_id)));

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetLPRZoneMetricsOutput>({
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
export const getLPRZoneMetricsMetadata = {
  name: 'get_l_p_r_zone_metrics',
  description: `Get a specific l p r zone metrics by ID. Returns detailed information about the l p r zone metrics.`,
  inputSchema: GetLPRZoneMetricsInputSchema,
  outputSchema: GetLPRZoneMetricsOutputSchema,
  category: 'product/camera',
  operationId: 'getLPRZoneMetricsViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/lpr/zones/{zone_id}/metrics',
  requiresAuth: true,
  tags: ['LPR'],
};
