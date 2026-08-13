/**
 * GetMaxObjectCounts_2 Tool
 *
 * Get a specific max object counts by ID. Returns detailed information about the max object counts.
 *
 * @category product/camera
 * @operationId getMaxObjectCountsViewV2
 * @method GET
 * @path /v2/cameras/{camera_id}/analytics/max_object_counts
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
 * Input parameters for getMaxObjectCounts_2
 */
const GetMaxObjectCounts_2InputSchema = z.object({
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
    /** The search_zones parameter */
    search_zones: z.array(z.array(z.number().int())).optional(),
  }),
});

type GetMaxObjectCounts_2Input = z.infer<typeof GetMaxObjectCounts_2InputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getMaxObjectCounts_2
 * OK
 */
const GetMaxObjectCounts_2OutputSchema = z.object({
  /** The maximum number of people detected. */
  people_count: z.number().int().nullable(),
  /** The maximum number of vehicles detected. */
  vehicle_count: z.number().int().nullable(),
});

type GetMaxObjectCounts_2Output = z.infer<typeof GetMaxObjectCounts_2OutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific max object counts by ID. Returns detailed information about the max object counts.
 *
 * @param input.path.camera_id - The camera_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.search_zones - The search_zones parameter
 * @returns OK
 */
export async function getMaxObjectCounts_2(
  input: GetMaxObjectCounts_2Input
): Promise<APIResponse<GetMaxObjectCounts_2Output>> {
  // Validate input
  const validated = GetMaxObjectCounts_2InputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/{camera_id}/analytics/max_object_counts';
  path = path.replace('{camera_id}', encodeURIComponent(String(validated.path.camera_id)));

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
  }
  if (validated.query.search_zones !== undefined) {
    for (const item of validated.query.search_zones) {
      queryParams.append('search_zones', String(item));
    }
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetMaxObjectCounts_2Output>({
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
export const getMaxObjectCounts_2Metadata = {
  name: 'get_max_object_counts_2',
  description: `Get a specific max object counts by ID. Returns detailed information about the max object counts.`,
  inputSchema: GetMaxObjectCounts_2InputSchema,
  outputSchema: GetMaxObjectCounts_2OutputSchema,
  category: 'product/camera',
  operationId: 'getMaxObjectCountsViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/{camera_id}/analytics/max_object_counts',
  requiresAuth: true,
  tags: ['Analytics'],
};
