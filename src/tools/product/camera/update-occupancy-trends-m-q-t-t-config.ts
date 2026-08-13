/**
 * UpdateOccupancyTrendsMQTTConfig Tool
 *
 * Update an existing occupancy trends m q t t config. Only the provided fields will be changed.
 *
 * @category product/camera
 * @operationId putOccupancyTrendsMQTTConfigViewV2
 * @method PUT
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
 * Input parameters for updateOccupancyTrendsMQTTConfig
 */
const UpdateOccupancyTrendsMQTTConfigInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** A CA-signed certificate for the MQTT broker, used for the TLS connection. (required) */
    broker_cert: z.string(),
    /** The host and port for the MQTT broker. The host may be an IP address or hostname. Port 443 is recommended; only ports 443, 123, and 53 are supported. (required) */
    broker_host_port: z.string(),
    /** The optional MQTT client password. This value is never returned in any response. */
    client_password: z.string().optional(),
    /** The optional MQTT client username. */
    client_username: z.string().optional(),
  }),
});

type UpdateOccupancyTrendsMQTTConfigInput = z.infer<typeof UpdateOccupancyTrendsMQTTConfigInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateOccupancyTrendsMQTTConfig
 * OK
 */
const UpdateOccupancyTrendsMQTTConfigOutputSchema = z.object({
  /** The certificate set in the MQTT config. */
  broker_cert: z.string().nullable(),
  /** The host and port set in the MQTT config. */
  broker_host_port: z.string().nullable(),
  /** The unique identifier of the camera. */
  camera_id: z.string().nullable(),
  /** The client username set in the MQTT config, if any. */
  client_username: z.string().nullable(),
});

type UpdateOccupancyTrendsMQTTConfigOutput = z.infer<typeof UpdateOccupancyTrendsMQTTConfigOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing occupancy trends m q t t config. Only the provided fields will be changed.
 *
 * @param input.path.camera_id - The camera_id parameter
 * @param input.body.broker_cert - A CA-signed certificate for the MQTT broker, used for the TLS connection.
 * @param input.body.broker_host_port - The host and port for the MQTT broker. The host may be an IP address or hostname. Port 443 is recommended; only ports 443, 123, and 53 are supported.
 * @param input.body.client_password - The optional MQTT client password. This value is never returned in any response.
 * @param input.body.client_username - The optional MQTT client username.
 * @returns OK
 */
export async function updateOccupancyTrendsMQTTConfig(
  input: UpdateOccupancyTrendsMQTTConfigInput
): Promise<APIResponse<UpdateOccupancyTrendsMQTTConfigOutput>> {
  // Validate input
  const validated = UpdateOccupancyTrendsMQTTConfigInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/analytics/cameras/{camera_id}/mqtt_configs';
  path = path.replace('{camera_id}', encodeURIComponent(String(validated.path.camera_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UpdateOccupancyTrendsMQTTConfigOutput>({
    method: 'PUT',
    path: fullPath,
    body: {
      broker_cert: validated.body.broker_cert,
      broker_host_port: validated.body.broker_host_port,
      client_password: validated.body.client_password,
      client_username: validated.body.client_username,
    },
  });

  return response;
}

// ============================================================================
// TOOL METADATA
// ============================================================================

/**
 * Metadata for MCP tool registration
 */
export const updateOccupancyTrendsMQTTConfigMetadata = {
  name: 'update_occupancy_trends_m_q_t_t_config',
  description: `Update an existing occupancy trends m q t t config. Only the provided fields will be changed.`,
  inputSchema: UpdateOccupancyTrendsMQTTConfigInputSchema,
  outputSchema: UpdateOccupancyTrendsMQTTConfigOutputSchema,
  category: 'product/camera',
  operationId: 'putOccupancyTrendsMQTTConfigViewV2',
  method: 'PUT' as const,
  path: '/v2/analytics/cameras/{camera_id}/mqtt_configs',
  requiresAuth: true,
  tags: ['Analytics'],
};
