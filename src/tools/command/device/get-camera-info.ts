/**
 * GetCameraInfo Tool
 *
 * Get a specific camera info by ID. Returns detailed information about the camera info.
 *
 * @category command/device
 * @operationId getCameraInfoViewV1
 * @method GET
 * @path /cameras/v1/devices
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
 * Input parameters for getCameraInfo
 */
const GetCameraInfoInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The page_token parameter */
    page_token: z.string().optional(),
    /** The page_size parameter */
    page_size: z.number().int().min(0).max(200).optional(),
  }),
});

type GetCameraInfoInput = z.infer<typeof GetCameraInfoInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getCameraInfo
 * OK
 */
const GetCameraInfoOutputSchema = z.object({
  /** A list of camera device information. */
  cameras: z.array(z.object({ camera_id: z.string().uuid().optional(), cloud_retention: z.number().int().optional(), date_added: z.number().int().optional(), device_retention: z.number().int().optional(), firmware: z.string().optional(), firmware_update_schedule: z.string().optional(), last_online: z.number().int().optional(), local_ip: z.string().optional(), location: z.string().optional(), location_angle: z.number().optional(), location_lat: z.number().optional(), location_lon: z.number().optional(), mac: z.string().optional(), model: z.string().optional(), name: z.string().optional(), people_history_enabled: z.boolean().optional(), serial: z.string().optional(), site: z.string().optional(), site_id: z.string().optional(), status: z.string().optional(), timezone: z.string().optional(), vehicle_history_enabled: z.boolean().optional() })),
  /** The pagination token used to fetch the next page of results. */
  next_page_token: z.string(),
});

type GetCameraInfoOutput = z.infer<typeof GetCameraInfoOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific camera info by ID. Returns detailed information about the camera info.
 *
 * @param input.query.page_token - The page_token parameter
 * @param input.query.page_size - The page_size parameter
 * @returns OK
 */
export async function getCameraInfo(
  input: GetCameraInfoInput
): Promise<APIResponse<GetCameraInfoOutput>> {
  // Validate input
  const validated = GetCameraInfoInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/devices';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.page_token !== undefined) {
    queryParams.set('page_token', String(validated.query.page_token));
  }
  if (validated.query.page_size !== undefined) {
    queryParams.set('page_size', String(validated.query.page_size));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetCameraInfoOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetCameraInfoOutputSchema.parse(response.data);
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
export const getCameraInfoMetadata = {
  name: 'get_camera_info',
  description: `Get a specific camera info by ID. Returns detailed information about the camera info.`,
  inputSchema: GetCameraInfoInputSchema,
  outputSchema: GetCameraInfoOutputSchema,
  category: 'command/device',
  operationId: 'getCameraInfoViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/devices',
  requiresAuth: true,
  tags: ['Devices'],
};
