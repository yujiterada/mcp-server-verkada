/**
 * UpdateAccessDoorExceptionCalendar Tool
 *
 * Update an existing access door exception calendar. Only the provided fields will be changed.
 *
 * @category product/access
 * @operationId putAccessDoorExceptionCalendarViewV1
 * @method PUT
 * @path /access/v1/door/exception_calendar/{calendar_id}
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
 * Input parameters for updateAccessDoorExceptionCalendar
 */
const UpdateAccessDoorExceptionCalendarInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The calendar_id parameter (required) */
    calendar_id: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** Door IDs of Doors that the calendar’s Door Exceptions are being applied to. */
    doors: z.array(z.string()).optional(),
    /** Door Exceptions for this Door Exception Calendar. */
    exceptions: z.array(z.union([z.object({ all_day_default: z.boolean().optional(), calendar_id: z.string().optional(), date: z.string(), door_exception_id: z.string().optional(), door_status: z.enum(['locked', 'card_and_code', 'access_controlled', 'unlocked']).optional(), double_badge: z.boolean().optional(), double_badge_group_ids: z.array(z.string()).optional(), end_time: z.string().time(), first_person_in: z.boolean().optional(), first_person_in_group_ids: z.array(z.string()).optional(), recurrence_rule: z.object({ by_day: z.array(z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'])).optional(), by_month: z.number().int().optional(), by_month_day: z.number().int().optional(), by_set_pos: z.number().int().optional(), count: z.number().int().optional(), excluded_dates: z.array(z.string()).optional(), frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']), interval: z.number().int(), until: z.string().optional() }).optional(), start_time: z.string().time() }), z.object({ all_day_default: z.boolean().optional(), date: z.string(), door_status: z.enum(['locked', 'card_and_code', 'access_controlled', 'unlocked']).optional(), double_badge: z.boolean().optional(), double_badge_group_ids: z.array(z.string()).optional(), end_time: z.string().time(), first_person_in: z.boolean().optional(), first_person_in_group_ids: z.array(z.string()).optional(), recurrence_rule: z.object({ by_day: z.array(z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'])).optional(), by_month: z.number().int().optional(), by_month_day: z.number().int().optional(), by_set_pos: z.number().int().optional(), count: z.number().int().optional(), excluded_dates: z.array(z.string()).optional(), frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']), interval: z.number().int(), until: z.string().optional() }).optional(), start_time: z.string().time() })])).optional(),
    /** Name of the Door Exception Calendar. (required) */
    name: z.string(),
  }),
});

type UpdateAccessDoorExceptionCalendarInput = z.infer<typeof UpdateAccessDoorExceptionCalendarInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateAccessDoorExceptionCalendar
 * OK
 */
const UpdateAccessDoorExceptionCalendarOutputSchema = z.object({
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

type UpdateAccessDoorExceptionCalendarOutput = z.infer<typeof UpdateAccessDoorExceptionCalendarOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing access door exception calendar. Only the provided fields will be changed.
 *
 * @param input.path.calendar_id - The calendar_id parameter
 * @param input.body.doors - Door IDs of Doors that the calendar’s Door Exceptions are being applied to.
 * @param input.body.exceptions - Door Exceptions for this Door Exception Calendar.
 * @param input.body.name - Name of the Door Exception Calendar.
 * @returns OK
 */
export async function updateAccessDoorExceptionCalendar(
  input: UpdateAccessDoorExceptionCalendarInput
): Promise<APIResponse<UpdateAccessDoorExceptionCalendarOutput>> {
  // Validate input
  const validated = UpdateAccessDoorExceptionCalendarInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/door/exception_calendar/{calendar_id}';
  path = path.replace('{calendar_id}', encodeURIComponent(String(validated.path.calendar_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UpdateAccessDoorExceptionCalendarOutput>({
    method: 'PUT',
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
export const updateAccessDoorExceptionCalendarMetadata = {
  name: 'update_access_door_exception_calendar',
  description: `Update an existing access door exception calendar. Only the provided fields will be changed.`,
  inputSchema: UpdateAccessDoorExceptionCalendarInputSchema,
  outputSchema: UpdateAccessDoorExceptionCalendarOutputSchema,
  category: 'product/access',
  operationId: 'putAccessDoorExceptionCalendarViewV1',
  method: 'PUT' as const,
  path: '/access/v1/door/exception_calendar/{calendar_id}',
  requiresAuth: true,
  tags: ['Access Door Exception Calendars'],
};
