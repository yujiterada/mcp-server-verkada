/**
 * GetOccupancyTrendsMQTTConfig Tool
 *
 * Get a specific occupancy trends m q t t config by ID. Returns detailed information about the occupancy trends m q t t config.
 *
 * @category product/camera
 * @operationId getOccupancyTrendsMQTTConfigViewV2
 * @method GET
 * @path /v2/analytics/cameras/{camera_id}/mqtt_configs
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
 * Input parameters for getOccupancyTrendsMQTTConfig
 */
const GetOccupancyTrendsMQTTConfigInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
  }),
});

type GetOccupancyTrendsMQTTConfigInput = z.infer<typeof GetOccupancyTrendsMQTTConfigInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getOccupancyTrendsMQTTConfig
 * OK
 */
const GetOccupancyTrendsMQTTConfigOutputSchema = z.object({
  /** The CA-signed certificate of the MQTT broker used for the TLS connection. Returns null if no certificate has been configured. */
  broker_cert: z.string().nullable(),
  /** The host and port of the MQTT broker currently configured for the camera. Returns null if no broker has been configured. */
  broker_host_port: z.string().nullable(),
  /** The unique identifier of the camera. */
  camera_id: z.string().nullable(),
  /** The MQTT client username configured for the camera. Returns null if no username has been configured. */
  client_username: z.string().nullable(),
});

type GetOccupancyTrendsMQTTConfigOutput = z.infer<typeof GetOccupancyTrendsMQTTConfigOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific occupancy trends m q t t config by ID. Returns detailed information about the occupancy trends m q t t config.
 *
 * @param input.path.camera_id - The camera_id parameter
 * @returns OK
 */
export async function getOccupancyTrendsMQTTConfig(
  input: GetOccupancyTrendsMQTTConfigInput
): Promise<APIResponse<GetOccupancyTrendsMQTTConfigOutput>> {
  // Validate input
  const validated = GetOccupancyTrendsMQTTConfigInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/analytics/cameras/{camera_id}/mqtt_configs';
  path = path.replace('{camera_id}', encodeURIComponent(String(validated.path.camera_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<GetOccupancyTrendsMQTTConfigOutput>({
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
export const getOccupancyTrendsMQTTConfigMetadata = {
  name: 'get_occupancy_trends_m_q_t_t_config',
  description: `Get a specific occupancy trends m q t t config by ID. Returns detailed information about the occupancy trends m q t t config.`,
  inputSchema: GetOccupancyTrendsMQTTConfigInputSchema,
  outputSchema: GetOccupancyTrendsMQTTConfigOutputSchema,
  category: 'product/camera',
  operationId: 'getOccupancyTrendsMQTTConfigViewV2',
  method: 'GET' as const,
  path: '/v2/analytics/cameras/{camera_id}/mqtt_configs',
  requiresAuth: true,
  tags: ['Analytics'],
};
