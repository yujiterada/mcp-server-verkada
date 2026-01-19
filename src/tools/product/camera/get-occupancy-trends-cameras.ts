/**
 * GetOccupancyTrendsCameras Tool
 *
 * Get a specific occupancy trends cameras by ID. Returns detailed information about the occupancy trends cameras.
 *
 * @category product/camera
 * @operationId getOccupancyTrendsCamerasViewV1
 * @method GET
 * @path /cameras/v1/occupancy_trend_enabled
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
 * This tool takes no input parameters
 */
const GetOccupancyTrendsCamerasInputSchema = z.object({});


// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getOccupancyTrendsCameras
 * OK
 */
const GetOccupancyTrendsCamerasOutputSchema = z.object({
  /**  */
  cameras: z.array(z.object({ camera_id: z.string().optional(), preset_ids: z.array(z.string()).optional(), presets: z.array(z.object({ object_class: z.string().optional(), preset_id: z.string().optional() })).optional() })).nullable(),
});

type GetOccupancyTrendsCamerasOutput = z.infer<typeof GetOccupancyTrendsCamerasOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific occupancy trends cameras by ID. Returns detailed information about the occupancy trends cameras.
 *
 * @returns OK
 */
export async function getOccupancyTrendsCameras(
): Promise<APIResponse<GetOccupancyTrendsCamerasOutput>> {
  // Build path with parameters
  const path = '/cameras/v1/occupancy_trend_enabled';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<GetOccupancyTrendsCamerasOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetOccupancyTrendsCamerasOutputSchema.parse(response.data);
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
export const getOccupancyTrendsCamerasMetadata = {
  name: 'get_occupancy_trends_cameras',
  description: `Get a specific occupancy trends cameras by ID. Returns detailed information about the occupancy trends cameras.`,
  inputSchema: GetOccupancyTrendsCamerasInputSchema,
  outputSchema: GetOccupancyTrendsCamerasOutputSchema,
  category: 'product/camera',
  operationId: 'getOccupancyTrendsCamerasViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/occupancy_trend_enabled',
  requiresAuth: true,
  tags: ['Devices'],
};
