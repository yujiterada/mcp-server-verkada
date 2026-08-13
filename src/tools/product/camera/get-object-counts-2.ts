/**
 * GetObjectCounts_2 Tool
 *
 * Get a specific object counts by ID. Returns detailed information about the object counts. Supports pagination.
 *
 * @category product/camera
 * @operationId getObjectCountsViewV2
 * @method GET
 * @path /v2/cameras/{camera_id}/analytics/object_counts
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
 * Input parameters for getObjectCounts_2
 */
const GetObjectCounts_2InputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
  }),
  /** Path parameters */
  query: z.object({
    /** The start_time parameter */
    start_time: z.string().optional(),
    /** The end_time parameter */
    end_time: z.string().optional(),
    /** The cursor parameter */
    cursor: z.string().optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(200).optional(),
  }),
});

type GetObjectCounts_2Input = z.infer<typeof GetObjectCounts_2InputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getObjectCounts_2
 * OK
 */
const GetObjectCounts_2OutputSchema = z.object({
  /** Pagination cursor for the next page of results. Continue paginating while this field is present. */
  cursor: z.string().nullable(),
  /** A page of object-count samples ordered by detection time. */
  items: z.array(z.object({ detected_at: z.string().nullable(), people_count: z.number().int().nullable(), vehicle_count: z.number().int().nullable() })).nullable(),
});

type GetObjectCounts_2Output = z.infer<typeof GetObjectCounts_2OutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific object counts by ID. Returns detailed information about the object counts. Supports pagination.
 *
 * @param input.path.camera_id - The camera_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.cursor - The cursor parameter
 * @param input.query.limit - The limit parameter
 * @returns OK
 */
export async function getObjectCounts_2(
  input: GetObjectCounts_2Input
): Promise<APIResponse<GetObjectCounts_2Output>> {
  // Validate input
  const validated = GetObjectCounts_2InputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/{camera_id}/analytics/object_counts';
  path = path.replace('{camera_id}', encodeURIComponent(String(validated.path.camera_id)));

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
  }
  if (validated.query.cursor !== undefined) {
    queryParams.set('cursor', String(validated.query.cursor));
  }
  if (validated.query.limit !== undefined) {
    queryParams.set('limit', String(validated.query.limit));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetObjectCounts_2Output>({
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
export const getObjectCounts_2Metadata = {
  name: 'get_object_counts_2',
  description: `Get a specific object counts by ID. Returns detailed information about the object counts. Supports pagination.`,
  inputSchema: GetObjectCounts_2InputSchema,
  outputSchema: GetObjectCounts_2OutputSchema,
  category: 'product/camera',
  operationId: 'getObjectCountsViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/{camera_id}/analytics/object_counts',
  requiresAuth: true,
  tags: ['Analytics'],
};
