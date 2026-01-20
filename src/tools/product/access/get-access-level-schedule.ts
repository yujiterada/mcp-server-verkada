/**
 * GetAccessLevelSchedule Tool
 *
 * Get a specific access level schedule by ID. Returns detailed information about the access level schedule.
 *
 * @category product/access
 * @operationId getAccessLevelScheduleView
 * @method GET
 * @path /access/v1/door/access_level/{access_level_id}/access_schedule_event/{event_id}
 * @tags Access Levels
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
 * Input parameters for getAccessLevelSchedule
 */
const GetAccessLevelScheduleInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The access_level_id parameter (required) */
    access_level_id: z.string(),
    /** The event_id parameter (required) */
    event_id: z.string(),
  }),
});

type GetAccessLevelScheduleInput = z.infer<typeof GetAccessLevelScheduleInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getAccessLevelSchedule
 * OK
 */
const GetAccessLevelScheduleOutputSchema = z.object({
  /** Unique identifier for the Access Schedule Event */
  access_schedule_event_id: z.string().nullable(),
  /** Status of the door during the event */
  door_status: z.enum(['access_granted']).nullable(),
  /** End time of the event in hh:mm format (ISO 8601) */
  end_time: z.string().nullable(),
  /** Start time of the event in hh:mm format (ISO 8601) */
  start_time: z.string().nullable(),
  /** Day of the week for the event */
  weekday: z.enum(['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']).nullable(),
});

type GetAccessLevelScheduleOutput = z.infer<typeof GetAccessLevelScheduleOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific access level schedule by ID. Returns detailed information about the access level schedule.
 *
 * @param input.path.access_level_id - The access_level_id parameter
 * @param input.path.event_id - The event_id parameter
 * @returns OK
 */
export async function getAccessLevelSchedule(
  input: GetAccessLevelScheduleInput
): Promise<APIResponse<GetAccessLevelScheduleOutput>> {
  // Validate input
  const validated = GetAccessLevelScheduleInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/door/access_level/{access_level_id}/access_schedule_event/{event_id}';
  path = path.replace('{access_level_id}', encodeURIComponent(String(validated.path.access_level_id)));
  path = path.replace('{event_id}', encodeURIComponent(String(validated.path.event_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<GetAccessLevelScheduleOutput>({
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
export const getAccessLevelScheduleMetadata = {
  name: 'get_access_level_schedule',
  description: `Get a specific access level schedule by ID. Returns detailed information about the access level schedule.`,
  inputSchema: GetAccessLevelScheduleInputSchema,
  outputSchema: GetAccessLevelScheduleOutputSchema,
  category: 'product/access',
  operationId: 'getAccessLevelScheduleView',
  method: 'GET' as const,
  path: '/access/v1/door/access_level/{access_level_id}/access_schedule_event/{event_id}',
  requiresAuth: true,
  tags: ['Access Levels'],
};
