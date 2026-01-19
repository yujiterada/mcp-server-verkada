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
  door_exception_calendars: z.array(z.object({ door_exception_calendar_id: z.string().optional(), doors: z.array(z.string()).optional(), exceptions: z.array(z.object({ all_day_default: z.boolean().optional(), calendar_id: z.string().optional(), date: z.string(), door_exception_id: z.string().optional(), door_status: z.enum(['locked', 'card_and_code', 'access_controlled', 'unlocked']).optional(), double_badge: z.boolean().optional(), double_badge_group_ids: z.array(z.string()).optional(), end_time: z.string().time(), first_person_in: z.boolean().optional(), first_person_in_group_ids: z.array(z.string()).optional(), recurrence_rule: z.object({ by_day: z.array(z.unknown()).optional(), by_month: z.number().int().optional(), by_month_day: z.number().int().optional(), by_set_pos: z.number().int().optional(), count: z.number().int().optional(), excluded_dates: z.array(z.string()).optional(), frequency: z.unknown(), interval: z.number().int(), until: z.string().optional() }).optional(), start_time: z.string().time() })).optional(), last_updated_at: z.number().int().optional(), name: z.string() })).nullable(),
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

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetAccessDoorExceptionCalendarsOutputSchema.parse(response.data);
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
