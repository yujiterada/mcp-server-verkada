/**
 * CreateAccessDoorExceptionCalendars Tool
 *
 * Create a new access door exception calendars. Provide the required fields in the request body.
 *
 * @category product/access
 * @operationId postAccessDoorExceptionCalendarsViewV1
 * @method POST
 * @path /access/v1/door/exception_calendar
 * @tags Access Door Exception Calendars
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
 * Input parameters for createAccessDoorExceptionCalendars
 */
const CreateAccessDoorExceptionCalendarsInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** Door IDs of Doors that the calendar’s Door Exceptions are being applied to. */
    doors: z.array(z.string()).optional(),
    /** Door Exceptions for this Door Exception Calendar. */
    exceptions: z.array(z.object({ all_day_default: z.boolean().optional(), date: z.string(), door_status: z.enum(['locked', 'card_and_code', 'access_controlled', 'unlocked']).optional(), double_badge: z.boolean().optional(), double_badge_group_ids: z.array(z.string()).optional(), end_time: z.string().time(), first_person_in: z.boolean().optional(), first_person_in_group_ids: z.array(z.string()).optional(), recurrence_rule: z.object({ by_day: z.array(z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'])).optional(), by_month: z.number().int().optional(), by_month_day: z.number().int().optional(), by_set_pos: z.number().int().optional(), count: z.number().int().optional(), excluded_dates: z.array(z.string()).optional(), frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']), interval: z.number().int(), until: z.string().optional() }).optional(), start_time: z.string().time() })).optional(),
    /** Name of the Door Exception Calendar. (required) */
    name: z.string(),
  }),
});

type CreateAccessDoorExceptionCalendarsInput = z.infer<typeof CreateAccessDoorExceptionCalendarsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createAccessDoorExceptionCalendars
 * OK
 */
const CreateAccessDoorExceptionCalendarsOutputSchema = z.object({
  /** Unique ID of the Door Exception Calendar. */
  door_exception_calendar_id: z.string().nullable(),
  /** Door IDs of Doors that the calendar’s Door Exceptions are being applied to. */
  doors: z.array(z.string()).nullable(),
  /** Door Exceptions for this Door Exception Calendar. */
  exceptions: z.array(z.object({ all_day_default: z.boolean().nullable().optional(), calendar_id: z.string().nullable().optional(), date: z.string().nullable(), door_exception_id: z.string().nullable().optional(), door_status: z.enum(['locked', 'card_and_code', 'access_controlled', 'unlocked']).nullable().optional(), double_badge: z.boolean().nullable().optional(), double_badge_group_ids: z.array(z.string()).nullable().optional(), end_time: z.string().time().nullable(), first_person_in: z.boolean().nullable().optional(), first_person_in_group_ids: z.array(z.string()).nullable().optional(), recurrence_rule: z.object({ by_day: z.array(z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'])).nullable().optional(), by_month: z.number().int().nullable().optional(), by_month_day: z.number().int().nullable().optional(), by_set_pos: z.number().int().nullable().optional(), count: z.number().int().nullable().optional(), excluded_dates: z.array(z.string()).nullable().optional(), frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']).nullable(), interval: z.number().int().nullable(), until: z.string().nullable().optional() }).nullable().optional(), start_time: z.string().time().nullable() })).nullable(),
  /** The last time the Door Exception Calendar was updated. Formatted as a Unix timestamp in seconds. */
  last_updated_at: z.number().int().nullable(),
  /** Name of the Door Exception Calendar. */
  name: z.string().nullable(),
});

type CreateAccessDoorExceptionCalendarsOutput = z.infer<typeof CreateAccessDoorExceptionCalendarsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new access door exception calendars. Provide the required fields in the request body.
 *
 * @param input.body.doors - Door IDs of Doors that the calendar’s Door Exceptions are being applied to.
 * @param input.body.exceptions - Door Exceptions for this Door Exception Calendar.
 * @param input.body.name - Name of the Door Exception Calendar.
 * @returns OK
 */
export async function createAccessDoorExceptionCalendars(
  input: CreateAccessDoorExceptionCalendarsInput
): Promise<APIResponse<CreateAccessDoorExceptionCalendarsOutput>> {
  // Validate input
  const validated = CreateAccessDoorExceptionCalendarsInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/door/exception_calendar';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateAccessDoorExceptionCalendarsOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      doors: validated.body.doors,
      exceptions: validated.body.exceptions,
      name: validated.body.name,
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
export const createAccessDoorExceptionCalendarsMetadata = {
  name: 'create_access_door_exception_calendars',
  description: `Create a new access door exception calendars. Provide the required fields in the request body.`,
  inputSchema: CreateAccessDoorExceptionCalendarsInputSchema,
  outputSchema: CreateAccessDoorExceptionCalendarsOutputSchema,
  category: 'product/access',
  operationId: 'postAccessDoorExceptionCalendarsViewV1',
  method: 'POST' as const,
  path: '/access/v1/door/exception_calendar',
  requiresAuth: true,
  tags: ['Access Door Exception Calendars'],
};
