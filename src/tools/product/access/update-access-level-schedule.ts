/**
 * UpdateAccessLevelSchedule Tool
 *
 * Update an existing access level schedule. Only the provided fields will be changed.
 *
 * @category product/access
 * @operationId putAccessLevelScheduleView
 * @method PUT
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
 * Input parameters for updateAccessLevelSchedule
 */
const UpdateAccessLevelScheduleInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The access_level_id parameter (required) */
    access_level_id: z.string(),
    /** The event_id parameter (required) */
    event_id: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** Status of the door during the event. Always set to &#x27;access_granted&#x27; and does not need to be specified. */
    door_status: z.enum(['access_granted']).optional(),
    /** End time of the event in HH:MM format (00:00 to 23:59) with required leading zeros (required) */
    end_time: z.string(),
    /** Start time of the event in HH:MM format (00:00 to 23:59) with required leading zeros (required) */
    start_time: z.string(),
    /** Day of the week for the event (required) */
    weekday: z.enum(['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']),
  }),
});

type UpdateAccessLevelScheduleInput = z.infer<typeof UpdateAccessLevelScheduleInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateAccessLevelSchedule
 * OK
 */
const UpdateAccessLevelScheduleOutputSchema = z.object({
  /** Unique identifier for the Access Schedule Event */
  access_schedule_event_id: z.string(),
  /** Status of the door during the event */
  door_status: z.enum(['access_granted']),
  /** End time of the event in hh:mm format (ISO 8601) */
  end_time: z.string(),
  /** Start time of the event in hh:mm format (ISO 8601) */
  start_time: z.string(),
  /** Day of the week for the event */
  weekday: z.enum(['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']),
});

type UpdateAccessLevelScheduleOutput = z.infer<typeof UpdateAccessLevelScheduleOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing access level schedule. Only the provided fields will be changed.
 *
 * @param input.path.access_level_id - The access_level_id parameter
 * @param input.path.event_id - The event_id parameter
 * @param input.body.door_status - Status of the door during the event. Always set to &#x27;access_granted&#x27; and does not need to be specified.
 * @param input.body.end_time - End time of the event in HH:MM format (00:00 to 23:59) with required leading zeros
 * @param input.body.start_time - Start time of the event in HH:MM format (00:00 to 23:59) with required leading zeros
 * @param input.body.weekday - Day of the week for the event
 * @returns OK
 */
export async function updateAccessLevelSchedule(
  input: UpdateAccessLevelScheduleInput
): Promise<APIResponse<UpdateAccessLevelScheduleOutput>> {
  // Validate input
  const validated = UpdateAccessLevelScheduleInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/door/access_level/{access_level_id}/access_schedule_event/{event_id}';
  path = path.replace('{access_level_id}', encodeURIComponent(String(validated.path.access_level_id)));
  path = path.replace('{event_id}', encodeURIComponent(String(validated.path.event_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UpdateAccessLevelScheduleOutput>({
    method: 'PUT',
    path: fullPath,
    body: {
      door_status: validated.body.door_status,
      end_time: validated.body.end_time,
      start_time: validated.body.start_time,
      weekday: validated.body.weekday,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UpdateAccessLevelScheduleOutputSchema.parse(response.data);
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
export const updateAccessLevelScheduleMetadata = {
  name: 'update_access_level_schedule',
  description: `Update an existing access level schedule. Only the provided fields will be changed.`,
  inputSchema: UpdateAccessLevelScheduleInputSchema,
  outputSchema: UpdateAccessLevelScheduleOutputSchema,
  category: 'product/access',
  operationId: 'putAccessLevelScheduleView',
  method: 'PUT' as const,
  path: '/access/v1/door/access_level/{access_level_id}/access_schedule_event/{event_id}',
  requiresAuth: true,
  tags: ['Access Levels'],
};
