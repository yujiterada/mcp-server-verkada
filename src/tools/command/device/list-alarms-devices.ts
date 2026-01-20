/**
 * ListAlarmsDevices Tool
 *
 * List all alarms devices. Use this to enumerate or search through alarms devices.
 *
 * @category command/device
 * @operationId getAlarmsDevicesViewV1
 * @method GET
 * @path /alarms/v1/devices
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
 * Input parameters for listAlarmsDevices
 */
const ListAlarmsDevicesInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The site_id parameter (required) */
    site_id: z.string(),
    /** The device_ids parameter */
    device_ids: z.string().optional(),
  }),
});

type ListAlarmsDevicesInput = z.infer<typeof ListAlarmsDevicesInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listAlarmsDevices
 * OK
 */
const ListAlarmsDevicesOutputSchema = z.object({
  /** Detailed information about device(s) */
  devices: z.array(z.object({ device_id: z.string().nullable(), device_type: z.enum(['door_contact_sensor', 'glass_break_sensor', 'motion_sensor', 'panic_button', 'water_sensor', 'wired_door_contact_sensor', 'wired_generic_sensor', 'wired_glass_break_sensor', 'wired_motion_sensor', 'wired_panic_button', 'wired_smoke_sensor', 'wired_water_sensor', 'wireless_relay']).nullable(), site_id: z.string().nullable() })).nullable(),
});

type ListAlarmsDevicesOutput = z.infer<typeof ListAlarmsDevicesOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all alarms devices. Use this to enumerate or search through alarms devices.
 *
 * @param input.query.site_id - The site_id parameter
 * @param input.query.device_ids - The device_ids parameter
 * @returns OK
 */
export async function listAlarmsDevices(
  input: ListAlarmsDevicesInput
): Promise<APIResponse<ListAlarmsDevicesOutput>> {
  // Validate input
  const validated = ListAlarmsDevicesInputSchema.parse(input);

  // Build path with parameters
  const path = '/alarms/v1/devices';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.site_id !== undefined) {
    queryParams.set('site_id', String(validated.query.site_id));
  }
  if (validated.query.device_ids !== undefined) {
    queryParams.set('device_ids', String(validated.query.device_ids));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<ListAlarmsDevicesOutput>({
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
export const listAlarmsDevicesMetadata = {
  name: 'list_alarms_devices',
  description: `List all alarms devices. Use this to enumerate or search through alarms devices.`,
  inputSchema: ListAlarmsDevicesInputSchema,
  outputSchema: ListAlarmsDevicesOutputSchema,
  category: 'command/device',
  operationId: 'getAlarmsDevicesViewV1',
  method: 'GET' as const,
  path: '/alarms/v1/devices',
  requiresAuth: true,
  tags: ['Devices'],
};
