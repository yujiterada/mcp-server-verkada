/**
 * ListViewingStationDevices Tool
 *
 * List all viewing station devices. Use this to enumerate or search through viewing station devices.
 *
 * @category command/device
 * @operationId getViewingStationDevicesViewV1
 * @method GET
 * @path /viewing_station/v1/devices
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
const ListViewingStationDevicesInputSchema = z.object({});


// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listViewingStationDevices
 * OK
 */
const ListViewingStationDevicesOutputSchema = z.object({
  /** Detailed information about Viewing Station devices. */
  devices: z.array(z.object({ app_version: z.string().nullable().optional(), claimed_serial_number: z.string().nullable(), device_id: z.string().uuid().nullable(), ip_address: z.string().nullable().optional(), last_seen_at: z.string().nullable().optional(), last_status: z.string().nullable(), location: z.string().nullable().optional(), location_lat: z.number().nullable().optional(), location_lon: z.number().nullable().optional(), name: z.string().nullable().optional(), site_id: z.string().uuid().nullable().optional(), timezone: z.string().nullable().optional() })).nullable(),
});

type ListViewingStationDevicesOutput = z.infer<typeof ListViewingStationDevicesOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all viewing station devices. Use this to enumerate or search through viewing station devices.
 *
 * @returns OK
 */
export async function listViewingStationDevices(
): Promise<APIResponse<ListViewingStationDevicesOutput>> {
  // Build path with parameters
  const path = '/viewing_station/v1/devices';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<ListViewingStationDevicesOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ListViewingStationDevicesOutputSchema.parse(response.data);
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
export const listViewingStationDevicesMetadata = {
  name: 'list_viewing_station_devices',
  description: `List all viewing station devices. Use this to enumerate or search through viewing station devices.`,
  inputSchema: ListViewingStationDevicesInputSchema,
  outputSchema: ListViewingStationDevicesOutputSchema,
  category: 'command/device',
  operationId: 'getViewingStationDevicesViewV1',
  method: 'GET' as const,
  path: '/viewing_station/v1/devices',
  requiresAuth: true,
  tags: ['Devices'],
};
