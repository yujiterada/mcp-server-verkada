/**
 * GetAccessDoorException Tool
 *
 * Get a specific access door exception by ID. Returns detailed information about the access door exception.
 *
 * @category product/access
 * @operationId getAccessDoorExceptionViewV1
 * @method GET
 * @path /access/v1/door/exception_calendar/{calendar_id}/exception/{exception_id}
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
 * Input parameters for getAccessDoorException
 */
const GetAccessDoorExceptionInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The calendar_id parameter (required) */
    calendar_id: z.string(),
    /** The exception_id parameter (required) */
    exception_id: z.string(),
  }),
});

type GetAccessDoorExceptionInput = z.infer<typeof GetAccessDoorExceptionInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getAccessDoorException
 * OK
 */
const GetAccessDoorExceptionOutputSchema = z.object({
  /** Bool value specifying if Exception is an All Day Default. If &lt;code&gt;TRUE&lt;/code&gt;, then:
- &lt;code&gt;door_status&lt;/code&gt; must be set to &lt;code&gt;access_controlled&lt;/code&gt;
- &lt;code&gt;start_time&lt;/code&gt; and &lt;code&gt;end_time&lt;/code&gt; will automatically be set to &lt;code&gt;00:00:00&lt;/code&gt; and &lt;code&gt;23:59:59&lt;/code&gt;, respectively. Different values should not be provided.
- &lt;code&gt;first_person_in&lt;/code&gt; and &lt;code&gt;double_badge&lt;/code&gt; must be &lt;code&gt;FALSE&lt;/code&gt; */
  all_day_default: z.boolean().nullable(),
  /** Unique ID of the Door Exception Calendar that this Exception belongs to. */
  calendar_id: z.string().nullable(),
  /** Date of the Door Exception formatted as &lt;code&gt;YYYY-MM-DD&lt;/code&gt; (according to ISO 8601). */
  date: z.string().nullable(),
  /** The unique ID of the Door Exception. */
  door_exception_id: z.string().nullable(),
  /** The door status that this Exception should apply to all doors assigned to its Door Exception Calendar.

Possible values are:
- &lt;code&gt;locked&lt;/code&gt;
- &lt;code&gt;card_and_code&lt;/code&gt;
- &lt;code&gt;access_controlled&lt;/code&gt;
- &lt;code&gt;unlocked&lt;/code&gt; */
  door_status: z.enum(['locked', 'card_and_code', 'access_controlled', 'unlocked']).nullable(),
  /** Bool value specifying if the Double Badge setting should be enabled for relevant doors. If &lt;code&gt;TRUE&lt;/code&gt;, &lt;code&gt;door_status&lt;/code&gt; must be set to &lt;code&gt;access_controlled&lt;/code&gt;.

By default, all users with access to relevant doors will be allowed to double badge. */
  double_badge: z.boolean().nullable(),
  /** List of IDs for Access Groups that users must be a member of to be allowed to double badge on relevant doors.

&lt;code&gt;double_badge&lt;/code&gt; must also be set to &lt;code&gt;TRUE&lt;/code&gt; if value is provided. */
  double_badge_group_ids: z.array(z.string()).nullable(),
  /** End time of the Door Exception formatted as &lt;code&gt;hh:mm&lt;/code&gt; (according to ISO 8601). */
  end_time: z.string().time().nullable(),
  /** Bool value specifying if the First Person In setting should be enabled for relevant doors. If &lt;code&gt;TRUE&lt;/code&gt;, &lt;code&gt;door_status&lt;/code&gt; must be set to &lt;code&gt;card_and_code&lt;/code&gt;, &lt;code&gt;access_controlled&lt;/code&gt;, or &lt;code&gt;unlocked&lt;/code&gt;. */
  first_person_in: z.boolean().nullable(),
  /** List of IDs for Access Groups including supervisors used for First Person In mode.

&lt;code&gt;first_person_in&lt;/code&gt; must also be set to &lt;code&gt;TRUE&lt;/code&gt; if this value is provided. */
  first_person_in_group_ids: z.array(z.string()).nullable(),
  /** A recurrence rule object specifying when the exception should repeat. */
  recurrence_rule: z.object({ by_day: z.array(z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'])).nullable().optional(), by_month: z.number().int().nullable().optional(), by_month_day: z.number().int().nullable().optional(), by_set_pos: z.number().int().nullable().optional(), count: z.number().int().nullable().optional(), excluded_dates: z.array(z.string()).nullable().optional(), frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']).nullable(), interval: z.number().int().nullable(), until: z.string().nullable().optional() }).nullable(),
  /** Start time of the Door Exception formatted as &lt;code&gt;hh:mm&lt;/code&gt; (according to ISO 8601). */
  start_time: z.string().time().nullable(),
});

type GetAccessDoorExceptionOutput = z.infer<typeof GetAccessDoorExceptionOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific access door exception by ID. Returns detailed information about the access door exception.
 *
 * @param input.path.calendar_id - The calendar_id parameter
 * @param input.path.exception_id - The exception_id parameter
 * @returns OK
 */
export async function getAccessDoorException(
  input: GetAccessDoorExceptionInput
): Promise<APIResponse<GetAccessDoorExceptionOutput>> {
  // Validate input
  const validated = GetAccessDoorExceptionInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/door/exception_calendar/{calendar_id}/exception/{exception_id}';
  path = path.replace('{calendar_id}', encodeURIComponent(String(validated.path.calendar_id)));
  path = path.replace('{exception_id}', encodeURIComponent(String(validated.path.exception_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<GetAccessDoorExceptionOutput>({
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
export const getAccessDoorExceptionMetadata = {
  name: 'get_access_door_exception',
  description: `Get a specific access door exception by ID. Returns detailed information about the access door exception.`,
  inputSchema: GetAccessDoorExceptionInputSchema,
  outputSchema: GetAccessDoorExceptionOutputSchema,
  category: 'product/access',
  operationId: 'getAccessDoorExceptionViewV1',
  method: 'GET' as const,
  path: '/access/v1/door/exception_calendar/{calendar_id}/exception/{exception_id}',
  requiresAuth: true,
  tags: ['Access Door Exception Calendars'],
};
