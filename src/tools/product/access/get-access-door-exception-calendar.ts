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
  exceptions: z.array(z.object({ all_day_default: z.boolean().optional(), calendar_id: z.string().optional(), date: z.string(), door_exception_id: z.string().optional(), door_status: z.enum(['locked', 'card_and_code', 'access_controlled', 'unlocked']).optional(), double_badge: z.boolean().optional(), double_badge_group_ids: z.array(z.string()).optional(), end_time: z.string().time(), first_person_in: z.boolean().optional(), first_person_in_group_ids: z.array(z.string()).optional(), recurrence_rule: z.object({ by_day: z.array(z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'])).optional(), by_month: z.number().int().optional(), by_month_day: z.number().int().optional(), by_set_pos: z.number().int().optional(), count: z.number().int().optional(), excluded_dates: z.array(z.string()).optional(), frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']), interval: z.number().int(), until: z.string().optional() }).optional(), start_time: z.string().time() })).nullable(),
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

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetAccessDoorExceptionCalendarOutputSchema.parse(response.data);
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
