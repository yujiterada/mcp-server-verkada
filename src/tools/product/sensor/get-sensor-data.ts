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
 * Returns a list of sensor data points
 */
const GetSensorDataOutputSchema = z.object({
  /** Array of sensor data points */
  data: z.array(z.object({
    /** Ambient light level in lux */
    ambient_light: z.number().optional(),
    /** Barometric pressure in Pascals */
    barometric_pressure: z.number().optional(),
    /** Carbon dioxide level in ppm */
    carbon_dioxide: z.number().optional(),
    /** Carbon monoxide level in ppm */
    carbon_monoxide: z.number().optional(),
    /** Formaldehyde level */
    formaldehyde: z.number().optional(),
    /** Heat index temperature */
    heat_index: z.number().optional(),
    /** Relative humidity percentage */
    humidity: z.number().optional(),
    /** Motion detection (0 = no motion, 1 = motion detected) */
    motion: z.number().optional(),
    /** Noise level in decibels */
    noise_level: z.number().optional(),
    /** Particulate matter 1.0 µm concentration */
    pm_1_0_0: z.number().optional(),
    /** Particulate matter 2.5 µm concentration */
    pm_2_5: z.number().optional(),
    /** Particulate matter 4.0 µm concentration */
    pm_4_0: z.number().optional(),
    /** Tamper detection (0 = no tamper, 1 = tamper detected) */
    tamper: z.number().optional(),
    /** Temperature in Celsius */
    temperature: z.number().optional(),
    /** Unix timestamp of the data point */
    time: z.number().optional(),
    /** Total Volatile Organic Compounds index */
    tvoc_index: z.number().optional(),
    /** USA Air Quality Index */
    usa_air_quality_index: z.number().optional(),
    /** Vape detection index */
    vape_index: z.number().optional(),
  }))
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
