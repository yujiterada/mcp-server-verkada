/**
 * GetAccessDoorExceptionCalendars Tool
 *
 * Get a specific access door exception calendars by ID. Returns detailed information about the access door exception calendars.
 *
 * @category product/access
 * @operationId getAccessDoorExceptionCalendarsViewV1
 * @method GET
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
 * Input parameters for getAccessDoorExceptionCalendars
 */
const GetAccessDoorExceptionCalendarsInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The last_updated_after parameter */
    last_updated_after: z.number().int().optional(),
  }),
});

type GetAccessDoorExceptionCalendarsInput = z.infer<typeof GetAccessDoorExceptionCalendarsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getAccessDoorExceptionCalendars
 * OK
 */
const GetAccessDoorExceptionCalendarsOutputSchema = z.object({
  /** List of Door Exception Calendars. */
  door_exception_calendars: z.array(z.object({ door_exception_calendar_id: z.string().nullable().optional(), doors: z.array(z.string()).nullable().optional(), exceptions: z.array(z.object({ all_day_default: z.boolean().nullable().optional(), calendar_id: z.string().nullable().optional(), date: z.string().nullable(), door_exception_id: z.string().nullable().optional(), door_status: z.enum(['locked', 'card_and_code', 'access_controlled', 'unlocked']).nullable().optional(), double_badge: z.boolean().nullable().optional(), double_badge_group_ids: z.array(z.string()).nullable().optional(), end_time: z.string().time().nullable(), first_person_in: z.boolean().nullable().optional(), first_person_in_group_ids: z.array(z.string()).nullable().optional(), recurrence_rule: z.object({ by_day: z.array(z.unknown()).nullable().optional(), by_month: z.number().int().nullable().optional(), by_month_day: z.number().int().nullable().optional(), by_set_pos: z.number().int().nullable().optional(), count: z.number().int().nullable().optional(), excluded_dates: z.array(z.string()).nullable().optional(), frequency: z.unknown().nullable(), interval: z.number().int().nullable(), until: z.string().nullable().optional() }).nullable().optional(), start_time: z.string().time().nullable() })).nullable().optional(), last_updated_at: z.number().int().nullable().optional(), name: z.string().nullable() })).nullable(),
});

type GetAccessDoorExceptionCalendarsOutput = z.infer<typeof GetAccessDoorExceptionCalendarsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific access door exception calendars by ID. Returns detailed information about the access door exception calendars.
 *
 * @param input.query.last_updated_after - The last_updated_after parameter
 * @returns OK
 */
export async function getAccessDoorExceptionCalendars(
  input: GetAccessDoorExceptionCalendarsInput
): Promise<APIResponse<GetAccessDoorExceptionCalendarsOutput>> {
  // Validate input
  const validated = GetAccessDoorExceptionCalendarsInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/door/exception_calendar';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.last_updated_after !== undefined) {
    queryParams.set('last_updated_after', String(validated.query.last_updated_after));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetAccessDoorExceptionCalendarsOutput>({
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
export const getAccessDoorExceptionCalendarsMetadata = {
  name: 'get_access_door_exception_calendars',
  description: `Get a specific access door exception calendars by ID. Returns detailed information about the access door exception calendars.`,
  inputSchema: GetAccessDoorExceptionCalendarsInputSchema,
  outputSchema: GetAccessDoorExceptionCalendarsOutputSchema,
  category: 'product/access',
  operationId: 'getAccessDoorExceptionCalendarsViewV1',
  method: 'GET' as const,
  path: '/access/v1/door/exception_calendar',
  requiresAuth: true,
  tags: ['Access Door Exception Calendars'],
};
