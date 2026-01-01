/**
 * CreateAccessLevelSchedule Tool
 *
 * Create a new access level schedule. Provide the required fields in the request body.
 *
 * @category product/access
 * @operationId postAccessLevelScheduleView
 * @method POST
 * @path /access/v1/door/access_level/{access_level_id}/access_schedule_event
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
 * Input parameters for createAccessLevelSchedule
 */
const CreateAccessLevelScheduleInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The access_level_id parameter (required) */
    access_level_id: z.string(),
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

type CreateAccessLevelScheduleInput = z.infer<typeof CreateAccessLevelScheduleInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createAccessLevelSchedule
 * ok
 */
const CreateAccessLevelScheduleOutputSchema = z.object({
});

type CreateAccessLevelScheduleOutput = z.infer<typeof CreateAccessLevelScheduleOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new access level schedule. Provide the required fields in the request body.
 *
 * @param input.path.access_level_id - The access_level_id parameter
 * @param input.body.door_status - Status of the door during the event. Always set to &#x27;access_granted&#x27; and does not need to be specified.
 * @param input.body.end_time - End time of the event in HH:MM format (00:00 to 23:59) with required leading zeros
 * @param input.body.start_time - Start time of the event in HH:MM format (00:00 to 23:59) with required leading zeros
 * @param input.body.weekday - Day of the week for the event
 * @returns ok
 */
export async function createAccessLevelSchedule(
  input: CreateAccessLevelScheduleInput
): Promise<APIResponse<CreateAccessLevelScheduleOutput>> {
  // Validate input
  const validated = CreateAccessLevelScheduleInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/door/access_level/{access_level_id}/access_schedule_event';
  path = path.replace('{access_level_id}', encodeURIComponent(String(validated.path.access_level_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateAccessLevelScheduleOutput>({
    method: 'POST',
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
      response.data = CreateAccessLevelScheduleOutputSchema.parse(response.data);
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
export const createAccessLevelScheduleMetadata = {
  name: 'create_access_level_schedule',
  description: `Create a new access level schedule. Provide the required fields in the request body.`,
  inputSchema: CreateAccessLevelScheduleInputSchema,
  outputSchema: CreateAccessLevelScheduleOutputSchema,
  category: 'product/access',
  operationId: 'postAccessLevelScheduleView',
  method: 'POST' as const,
  path: '/access/v1/door/access_level/{access_level_id}/access_schedule_event',
  requiresAuth: true,
  tags: ['Access Levels'],
};
