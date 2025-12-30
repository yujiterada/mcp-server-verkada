/**
 * GetSensorData Tool
 *
 * Get a specific sensor data by ID. Returns detailed information about the sensor data.
 *
 * @category product/sensor
 * @operationId getSensorDataViewV1
 * @method GET
 * @path /environment/v1/data
 * @tags Data
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
 * Input parameters for getSensorData
 */
const GetSensorDataInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The device_id parameter (required) */
    device_id: z.string(),
    /** The start_time parameter */
    start_time: z.number().int().optional(),
    /** The end_time parameter */
    end_time: z.number().int().optional(),
    /** The page_token parameter */
    page_token: z.string().optional(),
    /** The page_size parameter */
    page_size: z.number().int().min(0).max(200).optional(),
    /** The fields parameter */
    fields: z.string().optional(),
    /** The interval parameter */
    interval: z.string().optional(),
  }),
});

type GetSensorDataInput = z.infer<typeof GetSensorDataInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getSensorData
 * OK
 */
const GetSensorDataOutputSchema = z.object({
  /**  */
  data: z.array(z.object({})),
  /** The unique identifier of the device. */
  device_id: z.string().uuid(),
  /** The name of the device. */
  device_name: z.string(),
  /** The serial number of the device. */
  device_serial: z.string(),
  /** The time interval of the requested sensor data. */
  interval: z.string(),
  /** The pagination token used to fetch the next page of results. */
  next_page_token: z.string(),
});

type GetSensorDataOutput = z.infer<typeof GetSensorDataOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific sensor data by ID. Returns detailed information about the sensor data.
 *
 * @param input.query.device_id - The device_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.page_token - The page_token parameter
 * @param input.query.page_size - The page_size parameter
 * @param input.query.fields - The fields parameter
 * @param input.query.interval - The interval parameter
 * @returns OK
 */
export async function getSensorData(
  input: GetSensorDataInput
): Promise<APIResponse<GetSensorDataOutput>> {
  // Validate input
  const validated = GetSensorDataInputSchema.parse(input);

  // Build path with parameters
  const path = '/environment/v1/data';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.device_id !== undefined) {
    queryParams.set('device_id', String(validated.query.device_id));
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
  if (validated.query.fields !== undefined) {
    queryParams.set('fields', String(validated.query.fields));
  }
  if (validated.query.interval !== undefined) {
    queryParams.set('interval', String(validated.query.interval));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetSensorDataOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetSensorDataOutputSchema.parse(response.data);
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
export const getSensorDataMetadata = {
  name: 'get_sensor_data',
  description: `Get a specific sensor data by ID. Returns detailed information about the sensor data.`,
  inputSchema: GetSensorDataInputSchema,
  outputSchema: GetSensorDataOutputSchema,
  category: 'product/sensor',
  operationId: 'getSensorDataViewV1',
  method: 'GET' as const,
  path: '/environment/v1/data',
  requiresAuth: true,
  tags: ['Data'],
};
