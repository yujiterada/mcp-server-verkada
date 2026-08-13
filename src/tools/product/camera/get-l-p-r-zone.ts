/**
 * GetLPRZone Tool
 *
 * Get a specific l p r zone by ID. Returns detailed information about the l p r zone. Supports pagination. Note: This is a beta feature.
 *
 * @category product/camera
 * @operationId getLPRZoneViewV2
 * @method GET
 * @path /v2/cameras/lpr/zones
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
 * Input parameters for getLPRZone
 */
const GetLPRZoneInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The limit parameter */
    limit: z.number().int().min(0).max(200).optional(),
    /** The cursor parameter */
    cursor: z.string().optional(),
  }),
});

type GetLPRZoneInput = z.infer<typeof GetLPRZoneInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getLPRZone
 * OK
 */
const GetLPRZoneOutputSchema = z.object({
  /** Pagination cursor for the next page of results. Null if no more pages. */
  cursor: z.string().nullable(),
  /** List of LPR Zones. */
  items: z.array(z.object({ created_at: z.string().nullable(), preview_camera_id: z.string().nullable(), updated_at: z.string().nullable(), zone_id: z.string().nullable(), zone_name: z.string().nullable() })).nullable(),
});

type GetLPRZoneOutput = z.infer<typeof GetLPRZoneOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific l p r zone by ID. Returns detailed information about the l p r zone. Supports pagination. Note: This is a beta feature.
 *
 * @param input.query.limit - The limit parameter
 * @param input.query.cursor - The cursor parameter
 * @returns OK
 */
export async function getLPRZone(
  input: GetLPRZoneInput
): Promise<APIResponse<GetLPRZoneOutput>> {
  // Validate input
  const validated = GetLPRZoneInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/lpr/zones';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.limit !== undefined) {
    queryParams.set('limit', String(validated.query.limit));
  }
  if (validated.query.cursor !== undefined) {
    queryParams.set('cursor', String(validated.query.cursor));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetLPRZoneOutput>({
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
export const getLPRZoneMetadata = {
  name: 'get_l_p_r_zone',
  description: `Get a specific l p r zone by ID. Returns detailed information about the l p r zone. Supports pagination. Note: This is a beta feature.`,
  inputSchema: GetLPRZoneInputSchema,
  outputSchema: GetLPRZoneOutputSchema,
  category: 'product/camera',
  operationId: 'getLPRZoneViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/lpr/zones',
  requiresAuth: true,
  tags: ['LPR'],
};
