/**
 * GetObjectCounts Tool
 *
 * Get a specific object counts by ID. Returns detailed information about the object counts.
 *
 * @category product/camera
 * @operationId getObjectCountsViewV1
 * @method GET
 * @path /cameras/v1/analytics/object_counts
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
 * Input parameters for getObjectCounts
 */
const GetObjectCountsInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The start_time parameter */
    start_time: z.number().int().optional(),
    /** The end_time parameter */
    end_time: z.number().int().optional(),
    /** The page_token parameter */
    page_token: z.string().optional(),
    /** The page_size parameter */
    page_size: z.number().int().min(0).max(200).optional(),
  }),
});

type GetObjectCountsInput = z.infer<typeof GetObjectCountsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getObjectCounts
 * OK
 */
const GetObjectCountsOutputSchema = z.object({
  /** The pagination token used to fetch the next page of results. */
  next_page_token: z.string(),
  /** Object counts */
  object_counts: z.array(z.object({ detected_time: z.number().int().optional(), people_count: z.number().int().optional(), vehicle_count: z.number().int().optional() })),
});

type GetObjectCountsOutput = z.infer<typeof GetObjectCountsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific object counts by ID. Returns detailed information about the object counts.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.page_token - The page_token parameter
 * @param input.query.page_size - The page_size parameter
 * @returns OK
 */
export async function getObjectCounts(
  input: GetObjectCountsInput
): Promise<APIResponse<GetObjectCountsOutput>> {
  // Validate input
  const validated = GetObjectCountsInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/analytics/object_counts';

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
  if (validated.query.page_token !== undefined) {
    queryParams.set('page_token', String(validated.query.page_token));
  }
  if (validated.query.page_size !== undefined) {
    queryParams.set('page_size', String(validated.query.page_size));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetObjectCountsOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetObjectCountsOutputSchema.parse(response.data);
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
export const getObjectCountsMetadata = {
  name: 'get_object_counts',
  description: `Get a specific object counts by ID. Returns detailed information about the object counts.`,
  inputSchema: GetObjectCountsInputSchema,
  outputSchema: GetObjectCountsOutputSchema,
  category: 'product/camera',
  operationId: 'getObjectCountsViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/analytics/object_counts',
  requiresAuth: true,
  tags: ['Analytics'],
};
