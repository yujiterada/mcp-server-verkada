/**
 * GetAccessDoorExceptionCalendar Tool
 *
 * Get a specific access door exception calendar by ID. Returns detailed information about the access door exception calendar.
 *
 * @category product/access
 * @operationId getAccessDoorExceptionCalendarViewV1
 * @method GET
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
 * Input parameters for getAccessDoorExceptionCalendar
 */
const GetAccessDoorExceptionCalendarInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The calendar_id parameter (required) */
    calendar_id: z.string(),
  }),
});

type GetAccessDoorExceptionCalendarInput = z.infer<typeof GetAccessDoorExceptionCalendarInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getAccessDoorExceptionCalendar
 * OK
 */
const GetAccessDoorExceptionCalendarOutputSchema = z.object({
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

type GetAccessDoorExceptionCalendarOutput = z.infer<typeof GetAccessDoorExceptionCalendarOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific access door exception calendar by ID. Returns detailed information about the access door exception calendar.
 *
 * @param input.path.calendar_id - The calendar_id parameter
 * @returns OK
 */
export async function getAccessDoorExceptionCalendar(
  input: GetAccessDoorExceptionCalendarInput
): Promise<APIResponse<GetAccessDoorExceptionCalendarOutput>> {
  // Validate input
  const validated = GetAccessDoorExceptionCalendarInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/door/exception_calendar/{calendar_id}';
  path = path.replace('{calendar_id}', encodeURIComponent(String(validated.path.calendar_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<GetAccessDoorExceptionCalendarOutput>({
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
export const getAccessDoorExceptionCalendarMetadata = {
  name: 'get_access_door_exception_calendar',
  description: `Get a specific access door exception calendar by ID. Returns detailed information about the access door exception calendar.`,
  inputSchema: GetAccessDoorExceptionCalendarInputSchema,
  outputSchema: GetAccessDoorExceptionCalendarOutputSchema,
  category: 'product/access',
  operationId: 'getAccessDoorExceptionCalendarViewV1',
  method: 'GET' as const,
  path: '/access/v1/door/exception_calendar/{calendar_id}',
  requiresAuth: true,
  tags: ['Access Door Exception Calendars'],
};
