/**
 * CreateOccupancyTrendsMqttConfig Tool
 *
 * Create a new occupancy trends mqtt config. Provide the required fields in the request body.
 *
 * @category product/camera
 * @operationId postOccupancyTrendsMQTTConfigView
 * @method POST
 * @path /cameras/v1/analytics/object_position_mqtt
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
 * Input parameters for createOccupancyTrendsMqttConfig
 */
const CreateOccupancyTrendsMqttConfigInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** A CA signed cert for broker to be used for TLS connection. (required) */
    broker_cert: z.string(),
    /** The host and port for MQTT server. The host could be an IP address or hostname. Port 443 is recommended, and only 443, 123, 53 are supported. (required) */
    broker_host_port: z.string(),
    /** The unique identifier of the camera. (required) */
    camera_id: z.string(),
    /** The optional password for the server. */
    client_password: z.string().optional(),
    /** The optional username for the server. */
    client_username: z.string().optional(),
  }),
});

type CreateOccupancyTrendsMqttConfigInput = z.infer<typeof CreateOccupancyTrendsMqttConfigInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createOccupancyTrendsMqttConfig
 * OK
 */
const CreateOccupancyTrendsMqttConfigOutputSchema = z.object({
  /** The cert set in config. */
  broker_cert: z.string().nullable(),
  /** The host and port set in config. */
  broker_host_port: z.string().nullable(),
  /** The unique identifier of the camera. */
  camera_id: z.string().nullable(),
  /** The password set in config. */
  client_password: z.string().nullable(),
  /** The username set in config. */
  client_username: z.string().nullable(),
});

type CreateOccupancyTrendsMqttConfigOutput = z.infer<typeof CreateOccupancyTrendsMqttConfigOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new occupancy trends mqtt config. Provide the required fields in the request body.
 *
 * @param input.body.broker_cert - A CA signed cert for broker to be used for TLS connection.
 * @param input.body.broker_host_port - The host and port for MQTT server. The host could be an IP address or hostname. Port 443 is recommended, and only 443, 123, 53 are supported.
 * @param input.body.camera_id - The unique identifier of the camera.
 * @param input.body.client_password - The optional password for the server.
 * @param input.body.client_username - The optional username for the server.
 * @returns OK
 */
export async function createOccupancyTrendsMqttConfig(
  input: CreateOccupancyTrendsMqttConfigInput
): Promise<APIResponse<CreateOccupancyTrendsMqttConfigOutput>> {
  // Validate input
  const validated = CreateOccupancyTrendsMqttConfigInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/analytics/object_position_mqtt';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateOccupancyTrendsMqttConfigOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      broker_cert: validated.body.broker_cert,
      broker_host_port: validated.body.broker_host_port,
      camera_id: validated.body.camera_id,
      client_password: validated.body.client_password,
      client_username: validated.body.client_username,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = CreateOccupancyTrendsMqttConfigOutputSchema.parse(response.data);
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
export const createOccupancyTrendsMqttConfigMetadata = {
  name: 'create_occupancy_trends_mqtt_config',
  description: `Create a new occupancy trends mqtt config. Provide the required fields in the request body.`,
  inputSchema: CreateOccupancyTrendsMqttConfigInputSchema,
  outputSchema: CreateOccupancyTrendsMqttConfigOutputSchema,
  category: 'product/camera',
  operationId: 'postOccupancyTrendsMQTTConfigView',
  method: 'POST' as const,
  path: '/cameras/v1/analytics/object_position_mqtt',
  requiresAuth: true,
  tags: ['Analytics'],
};
