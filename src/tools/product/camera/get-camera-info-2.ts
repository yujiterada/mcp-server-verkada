/**
 * GetCameraInfo_2 Tool
 *
 * Get a specific camera info by ID. Returns detailed information about the camera info. Supports pagination.
 *
 * @category product/camera
 * @operationId getCameraInfoViewV2
 * @method GET
 * @path /v2/cameras
 * @tags Devices
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
 * Input parameters for getCameraInfo_2
 */
const GetCameraInfo_2InputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The cursor parameter */
    cursor: z.string().optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(200).optional(),
  }),
});

type GetCameraInfo_2Input = z.infer<typeof GetCameraInfo_2InputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getCameraInfo_2
 * OK
 */
const GetCameraInfo_2OutputSchema = z.object({
  /** Pagination cursor for the next page of results. Continue paginating while this field is present. */
  cursor: z.string().nullable(),
  /** A page of camera devices in the organization. */
  items: z.array(z.object({ camera_id: z.string().uuid().nullable(), cloud_retention_days: z.number().int().nullable().optional(), date_added: z.string().nullable().optional(), device_retention_days: z.number().int().nullable().optional(), firmware: z.string().nullable().optional(), firmware_update_schedule: z.array(z.object({ end_seconds_from_midnight: z.number().int().min(0).nullable(), start_seconds_from_midnight: z.number().int().min(0).nullable() })).nullable().optional(), last_online: z.string().nullable().optional(), local_ip: z.string().nullable().optional(), location: z.string().nullable().optional(), location_angle: z.number().nullable().optional(), location_lat: z.number().nullable().optional(), location_lon: z.number().nullable().optional(), mac: z.string().nullable().optional(), model: z.string().nullable().optional(), name: z.string().nullable().optional(), people_history_enabled: z.boolean().nullable().optional(), serial: z.string().nullable().optional(), site_id: z.string().nullable().optional(), site_name: z.string().nullable().optional(), status: z.string().nullable().optional(), timezone: z.string().nullable().optional(), vehicle_history_enabled: z.boolean().nullable().optional() })).nullable(),
});

type GetCameraInfo_2Output = z.infer<typeof GetCameraInfo_2OutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific camera info by ID. Returns detailed information about the camera info. Supports pagination.
 *
 * @param input.query.cursor - The cursor parameter
 * @param input.query.limit - The limit parameter
 * @returns OK
 */
export async function getCameraInfo_2(
  input: GetCameraInfo_2Input
): Promise<APIResponse<GetCameraInfo_2Output>> {
  // Validate input
  const validated = GetCameraInfo_2InputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.cursor !== undefined) {
    queryParams.set('cursor', String(validated.query.cursor));
  }
  if (validated.query.limit !== undefined) {
    queryParams.set('limit', String(validated.query.limit));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetCameraInfo_2Output>({
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
export const getCameraInfo_2Metadata = {
  name: 'get_camera_info_2',
  description: `Get a specific camera info by ID. Returns detailed information about the camera info. Supports pagination.`,
  inputSchema: GetCameraInfo_2InputSchema,
  outputSchema: GetCameraInfo_2OutputSchema,
  category: 'product/camera',
  operationId: 'getCameraInfoViewV2',
  method: 'GET' as const,
  path: '/v2/cameras',
  requiresAuth: true,
  tags: ['Devices'],
};
