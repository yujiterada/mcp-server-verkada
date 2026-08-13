/**
 * GetLPRZoneRecords Tool
 *
 * Get a specific l p r zone records by ID. Returns detailed information about the l p r zone records. Supports pagination.
 *
 * @category product/camera
 * @operationId getLPRZoneRecordsViewV2
 * @method GET
 * @path /v2/cameras/lpr/zones/{zone_id}/records
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
 * Input parameters for getLPRZoneRecords
 */
const GetLPRZoneRecordsInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The zone_id parameter (required) */
    zone_id: z.string(),
  }),
  /** Path parameters */
  query: z.object({
    /** The start_time parameter */
    start_time: z.string().optional(),
    /** The end_time parameter */
    end_time: z.string().optional(),
    /** The vehicle_status parameter */
    vehicle_status: z.enum(['still_in', 'departed']).optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(100).optional(),
    /** The cursor parameter */
    cursor: z.string().optional(),
  }),
});

type GetLPRZoneRecordsInput = z.infer<typeof GetLPRZoneRecordsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getLPRZoneRecords
 * OK
 */
const GetLPRZoneRecordsOutputSchema = z.object({
  /** Pagination cursor from a previous response. Use to fetch the next page of results. */
  cursor: z.string().nullable(),
  /** List of LPR Zone visit records. */
  items: z.array(z.object({ dwell_time: z.string().nullable().optional(), entry_camera_id: z.string().nullable().optional(), entry_time: z.string().nullable().optional(), exit_camera_id: z.string().nullable().optional(), exit_time: z.string().nullable().optional(), invalid: z.boolean().nullable(), invalid_reason: z.string().nullable().optional(), license_plate: z.string().nullable(), plate_thumbnail_url: z.string().nullable().optional(), vehicle_status: z.enum(['still_in', 'departed']).nullable(), vehicle_thumbnail_url: z.string().nullable().optional() })).nullable(),
});

type GetLPRZoneRecordsOutput = z.infer<typeof GetLPRZoneRecordsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific l p r zone records by ID. Returns detailed information about the l p r zone records. Supports pagination.
 *
 * @param input.path.zone_id - The zone_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.vehicle_status - The vehicle_status parameter
 * @param input.query.limit - The limit parameter
 * @param input.query.cursor - The cursor parameter
 * @returns OK
 */
export async function getLPRZoneRecords(
  input: GetLPRZoneRecordsInput
): Promise<APIResponse<GetLPRZoneRecordsOutput>> {
  // Validate input
  const validated = GetLPRZoneRecordsInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/lpr/zones/{zone_id}/records';
  path = path.replace('{zone_id}', encodeURIComponent(String(validated.path.zone_id)));

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
  }
  if (validated.query.vehicle_status !== undefined) {
    queryParams.set('vehicle_status', String(validated.query.vehicle_status));
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
  const response = await callVerkadaAPI<GetLPRZoneRecordsOutput>({
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
export const getLPRZoneRecordsMetadata = {
  name: 'get_l_p_r_zone_records',
  description: `Get a specific l p r zone records by ID. Returns detailed information about the l p r zone records. Supports pagination.`,
  inputSchema: GetLPRZoneRecordsInputSchema,
  outputSchema: GetLPRZoneRecordsOutputSchema,
  category: 'product/camera',
  operationId: 'getLPRZoneRecordsViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/lpr/zones/{zone_id}/records',
  requiresAuth: true,
  tags: ['LPR'],
};
