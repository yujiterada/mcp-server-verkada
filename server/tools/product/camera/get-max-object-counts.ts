/**
 * GetMaxObjectCounts Tool
 *
 * Get a specific max object counts by ID. Returns detailed information about the max object counts.
 *
 * @category product/camera
 * @operationId getMaxObjectCountsViewV1
 * @method GET
 * @path /cameras/v1/analytics/max_object_counts
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
 * Input parameters for getMaxObjectCounts
 */
const GetMaxObjectCountsInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The start_time parameter */
    start_time: z.number().int().optional(),
    /** The end_time parameter */
    end_time: z.number().int().optional(),
    /** The search_zones parameter */
    search_zones: z.array(z.array(z.number().int())).optional(),
  }),
});

type GetMaxObjectCountsInput = z.infer<typeof GetMaxObjectCountsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getMaxObjectCounts
 * OK
 */
const GetMaxObjectCountsOutputSchema = z.object({
  /** The number of people detected. */
  people_count: z.number().int(),
  /** The number of vehicle detected. */
  vehicle_count: z.number().int(),
});

type GetMaxObjectCountsOutput = z.infer<typeof GetMaxObjectCountsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific max object counts by ID. Returns detailed information about the max object counts.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.search_zones - The search_zones parameter
 * @returns OK
 */
export async function getMaxObjectCounts(
  input: GetMaxObjectCountsInput
): Promise<APIResponse<GetMaxObjectCountsOutput>> {
  // Validate input
  const validated = GetMaxObjectCountsInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/analytics/max_object_counts';

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
  if (validated.query.search_zones !== undefined) {
    for (const item of validated.query.search_zones) {
      queryParams.append('search_zones', String(item));
    }
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetMaxObjectCountsOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetMaxObjectCountsOutputSchema.parse(response.data);
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
export const getMaxObjectCountsMetadata = {
  name: 'get_max_object_counts',
  description: `Get a specific max object counts by ID. Returns detailed information about the max object counts.`,
  inputSchema: GetMaxObjectCountsInputSchema,
  outputSchema: GetMaxObjectCountsOutputSchema,
  category: 'product/camera',
  operationId: 'getMaxObjectCountsViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/analytics/max_object_counts',
  requiresAuth: true,
  tags: ['Analytics'],
};
