/**
 * UpdateAccessDoorException Tool
 *
 * Update an existing access door exception. Only the provided fields will be changed.
 *
 * @category product/access
 * @operationId putAccessDoorExceptionViewV1
 * @method PUT
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
 * Input parameters for updateAccessDoorException
 */
const UpdateAccessDoorExceptionInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The calendar_id parameter (required) */
    calendar_id: z.string(),
    /** The exception_id parameter (required) */
    exception_id: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** Bool value specifying if Exception is an All Day Default. If &lt;code&gt;TRUE&lt;/code&gt;, then:
- &lt;code&gt;door_status&lt;/code&gt; must be set to &lt;code&gt;access_controlled&lt;/code&gt;
- &lt;code&gt;start_time&lt;/code&gt; and &lt;code&gt;end_time&lt;/code&gt; will automatically be set to &lt;code&gt;00:00:00&lt;/code&gt; and &lt;code&gt;23:59:59&lt;/code&gt;, respectively. Different values should not be provided.
- &lt;code&gt;first_person_in&lt;/code&gt; and &lt;code&gt;double_badge&lt;/code&gt; must be &lt;code&gt;FALSE&lt;/code&gt; */
    all_day_default: z.boolean().optional(),
    /** Date of the Door Exception formatted as &lt;code&gt;YYYY-MM-DD&lt;/code&gt; (according to ISO 8601). (required) */
    date: z.string(),
    /** The door status that this Exception should apply to all doors assigned to its Door Exception Calendar.

Possible values are:
- &lt;code&gt;locked&lt;/code&gt;
- &lt;code&gt;card_and_code&lt;/code&gt;
- &lt;code&gt;access_controlled&lt;/code&gt;
- &lt;code&gt;unlocked&lt;/code&gt; */
    door_status: z.enum(['locked', 'card_and_code', 'access_controlled', 'unlocked']).optional(),
    /** Bool value specifying if the Double Badge setting should be enabled for relevant doors. If &lt;code&gt;TRUE&lt;/code&gt;, &lt;code&gt;door_status&lt;/code&gt; must be set to &lt;code&gt;access_controlled&lt;/code&gt;.

By default, all users with access to relevant doors will be allowed to double badge. */
    double_badge: z.boolean().optional(),
    /** List of IDs for Access Groups that users must be a member of to be allowed to double badge on relevant doors.

&lt;code&gt;double_badge&lt;/code&gt; must also be set to &lt;code&gt;TRUE&lt;/code&gt; if value is provided. */
    double_badge_group_ids: z.array(z.string()).optional(),
    /** End time of the Door Exception formatted as &lt;code&gt;hh:mm&lt;/code&gt; (according to ISO 8601). (required) */
    end_time: z.string().time(),
    /** Bool value specifying if the First Person In setting should be enabled for relevant doors. If &lt;code&gt;TRUE&lt;/code&gt;, &lt;code&gt;door_status&lt;/code&gt; must be set to &lt;code&gt;card_and_code&lt;/code&gt;, &lt;code&gt;access_controlled&lt;/code&gt;, or &lt;code&gt;unlocked&lt;/code&gt;. */
    first_person_in: z.boolean().optional(),
    /** List of IDs for Access Groups including supervisors used for First Person In mode.

&lt;code&gt;first_person_in&lt;/code&gt; must also be set to &lt;code&gt;TRUE&lt;/code&gt; if this value is provided. */
    first_person_in_group_ids: z.array(z.string()).optional(),
    /** A recurrence rule object specifying when the exception should repeat. */
    recurrence_rule: z.object({ by_day: z.array(z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'])).optional(), by_month: z.number().int().optional(), by_month_day: z.number().int().optional(), by_set_pos: z.number().int().optional(), count: z.number().int().optional(), excluded_dates: z.array(z.string()).optional(), frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']), interval: z.number().int(), until: z.string().optional() }).optional(),
    /** Start time of the Door Exception formatted as &lt;code&gt;hh:mm&lt;/code&gt; (according to ISO 8601). (required) */
    start_time: z.string().time(),
  }),
});

type UpdateAccessDoorExceptionInput = z.infer<typeof UpdateAccessDoorExceptionInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateAccessDoorException
 * OK
 */
const UpdateAccessDoorExceptionOutputSchema = z.object({
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
  recurrence_rule: z.object({ by_day: z.array(z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'])).optional(), by_month: z.number().int().optional(), by_month_day: z.number().int().optional(), by_set_pos: z.number().int().optional(), count: z.number().int().optional(), excluded_dates: z.array(z.string()).optional(), frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']), interval: z.number().int(), until: z.string().optional() }).nullable(),
  /** Start time of the Door Exception formatted as &lt;code&gt;hh:mm&lt;/code&gt; (according to ISO 8601). */
  start_time: z.string().time().nullable(),
});

type UpdateAccessDoorExceptionOutput = z.infer<typeof UpdateAccessDoorExceptionOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing access door exception. Only the provided fields will be changed.
 *
 * @param input.path.calendar_id - The calendar_id parameter
 * @param input.path.exception_id - The exception_id parameter
 * @param input.body.all_day_default - Bool value specifying if Exception is an All Day Default. If &lt;code&gt;TRUE&lt;/code&gt;, then:
- &lt;code&gt;door_status&lt;/code&gt; must be set to &lt;code&gt;access_controlled&lt;/code&gt;
- &lt;code&gt;start_time&lt;/code&gt; and &lt;code&gt;end_time&lt;/code&gt; will automatically be set to &lt;code&gt;00:00:00&lt;/code&gt; and &lt;code&gt;23:59:59&lt;/code&gt;, respectively. Different values should not be provided.
- &lt;code&gt;first_person_in&lt;/code&gt; and &lt;code&gt;double_badge&lt;/code&gt; must be &lt;code&gt;FALSE&lt;/code&gt;
 * @param input.body.date - Date of the Door Exception formatted as &lt;code&gt;YYYY-MM-DD&lt;/code&gt; (according to ISO 8601).
 * @param input.body.door_status - The door status that this Exception should apply to all doors assigned to its Door Exception Calendar.

Possible values are:
- &lt;code&gt;locked&lt;/code&gt;
- &lt;code&gt;card_and_code&lt;/code&gt;
- &lt;code&gt;access_controlled&lt;/code&gt;
- &lt;code&gt;unlocked&lt;/code&gt;
 * @param input.body.double_badge - Bool value specifying if the Double Badge setting should be enabled for relevant doors. If &lt;code&gt;TRUE&lt;/code&gt;, &lt;code&gt;door_status&lt;/code&gt; must be set to &lt;code&gt;access_controlled&lt;/code&gt;.

By default, all users with access to relevant doors will be allowed to double badge.
 * @param input.body.double_badge_group_ids - List of IDs for Access Groups that users must be a member of to be allowed to double badge on relevant doors.

&lt;code&gt;double_badge&lt;/code&gt; must also be set to &lt;code&gt;TRUE&lt;/code&gt; if value is provided.
 * @param input.body.end_time - End time of the Door Exception formatted as &lt;code&gt;hh:mm&lt;/code&gt; (according to ISO 8601).
 * @param input.body.first_person_in - Bool value specifying if the First Person In setting should be enabled for relevant doors. If &lt;code&gt;TRUE&lt;/code&gt;, &lt;code&gt;door_status&lt;/code&gt; must be set to &lt;code&gt;card_and_code&lt;/code&gt;, &lt;code&gt;access_controlled&lt;/code&gt;, or &lt;code&gt;unlocked&lt;/code&gt;.
 * @param input.body.first_person_in_group_ids - List of IDs for Access Groups including supervisors used for First Person In mode.

&lt;code&gt;first_person_in&lt;/code&gt; must also be set to &lt;code&gt;TRUE&lt;/code&gt; if this value is provided.
 * @param input.body.recurrence_rule - A recurrence rule object specifying when the exception should repeat.
 * @param input.body.start_time - Start time of the Door Exception formatted as &lt;code&gt;hh:mm&lt;/code&gt; (according to ISO 8601).
 * @returns OK
 */
export async function updateAccessDoorException(
  input: UpdateAccessDoorExceptionInput
): Promise<APIResponse<UpdateAccessDoorExceptionOutput>> {
  // Validate input
  const validated = UpdateAccessDoorExceptionInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/door/exception_calendar/{calendar_id}/exception/{exception_id}';
  path = path.replace('{calendar_id}', encodeURIComponent(String(validated.path.calendar_id)));
  path = path.replace('{exception_id}', encodeURIComponent(String(validated.path.exception_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UpdateAccessDoorExceptionOutput>({
    method: 'PUT',
    path: fullPath,
    body: {
      all_day_default: validated.body.all_day_default,
      date: validated.body.date,
      door_status: validated.body.door_status,
      double_badge: validated.body.double_badge,
      double_badge_group_ids: validated.body.double_badge_group_ids,
      end_time: validated.body.end_time,
      first_person_in: validated.body.first_person_in,
      first_person_in_group_ids: validated.body.first_person_in_group_ids,
      recurrence_rule: validated.body.recurrence_rule,
      start_time: validated.body.start_time,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UpdateAccessDoorExceptionOutputSchema.parse(response.data);
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
export const updateAccessDoorExceptionMetadata = {
  name: 'update_access_door_exception',
  description: `Update an existing access door exception. Only the provided fields will be changed.`,
  inputSchema: UpdateAccessDoorExceptionInputSchema,
  outputSchema: UpdateAccessDoorExceptionOutputSchema,
  category: 'product/access',
  operationId: 'putAccessDoorExceptionViewV1',
  method: 'PUT' as const,
  path: '/access/v1/door/exception_calendar/{calendar_id}/exception/{exception_id}',
  requiresAuth: true,
  tags: ['Access Door Exception Calendars'],
};
