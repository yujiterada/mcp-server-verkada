/**
 * GetLPRTimestamps Tool
 *
 * Get a specific l p r timestamps by ID. Returns detailed information about the l p r timestamps. Supports pagination.
 *
 * @category product/camera
 * @operationId getLPRTimestampsViewV2
 * @method GET
 * @path /v2/cameras/{camera_id}/lpr/{license_plate}/timestamps
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
 * Input parameters for getLPRTimestamps
 */
const GetLPRTimestampsInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The license_plate parameter (required) */
    license_plate: z.string(),
  }),
  /** Path parameters */
  query: z.object({
    /** The start_time parameter */
    start_time: z.string().optional(),
    /** The end_time parameter */
    end_time: z.string().optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(200).optional(),
    /** The cursor parameter */
    cursor: z.string().optional(),
  }),
});

type GetLPRTimestampsInput = z.infer<typeof GetLPRTimestampsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getLPRTimestamps
 * OK
 */
const GetLPRTimestampsOutputSchema = z.object({
  /** Pagination cursor for retrieving the next page of results. Null if there are no more results. */
  cursor: z.string().nullable(),
  /** List of detection timestamps for the requested license plate. */
  items: z.array(z.object({ detected_at: z.string().nullable() })).nullable(),
});

type GetLPRTimestampsOutput = z.infer<typeof GetLPRTimestampsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific l p r timestamps by ID. Returns detailed information about the l p r timestamps. Supports pagination.
 *
 * @param input.path.camera_id - The camera_id parameter
 * @param input.path.license_plate - The license_plate parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.limit - The limit parameter
 * @param input.query.cursor - The cursor parameter
 * @returns OK
 */
export async function getLPRTimestamps(
  input: GetLPRTimestampsInput
): Promise<APIResponse<GetLPRTimestampsOutput>> {
  // Validate input
  const validated = GetLPRTimestampsInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/{camera_id}/lpr/{license_plate}/timestamps';
  path = path.replace('{camera_id}', encodeURIComponent(String(validated.path.camera_id)));
  path = path.replace('{license_plate}', encodeURIComponent(String(validated.path.license_plate)));

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
  }
  if (validated.query.limit !== undefined) {
    queryParams.set('limit', String(validated.query.limit));
  }
  if (validated.query.cursor !== undefined) {
    queryParams.set('cursor', String(validated.query.cursor));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetLPRTimestampsOutput>({
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
export const getLPRTimestampsMetadata = {
  name: 'get_l_p_r_timestamps',
  description: `Get a specific l p r timestamps by ID. Returns detailed information about the l p r timestamps. Supports pagination.`,
  inputSchema: GetLPRTimestampsInputSchema,
  outputSchema: GetLPRTimestampsOutputSchema,
  category: 'product/camera',
  operationId: 'getLPRTimestampsViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/{camera_id}/lpr/{license_plate}/timestamps',
  requiresAuth: true,
  tags: ['LPR'],
};
