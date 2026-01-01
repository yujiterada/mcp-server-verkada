/**
 * DeleteAccessDoorExceptionCalendar Tool
 *
 * Delete a access door exception calendar. This action cannot be undone.
 *
 * @category product/access
 * @operationId deleteAccessDoorExceptionCalendarViewV1
 * @method DELETE
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
 * Input parameters for deleteAccessDoorExceptionCalendar
 */
const DeleteAccessDoorExceptionCalendarInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The calendar_id parameter (required) */
    calendar_id: z.string(),
  }),
});

type DeleteAccessDoorExceptionCalendarInput = z.infer<typeof DeleteAccessDoorExceptionCalendarInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteAccessDoorExceptionCalendar
 * ok
 */
const DeleteAccessDoorExceptionCalendarOutputSchema = z.object({
});

type DeleteAccessDoorExceptionCalendarOutput = z.infer<typeof DeleteAccessDoorExceptionCalendarOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a access door exception calendar. This action cannot be undone.
 *
 * @param input.path.calendar_id - The calendar_id parameter
 * @returns ok
 */
export async function deleteAccessDoorExceptionCalendar(
  input: DeleteAccessDoorExceptionCalendarInput
): Promise<APIResponse<DeleteAccessDoorExceptionCalendarOutput>> {
  // Validate input
  const validated = DeleteAccessDoorExceptionCalendarInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/door/exception_calendar/{calendar_id}';
  path = path.replace('{calendar_id}', encodeURIComponent(String(validated.path.calendar_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<DeleteAccessDoorExceptionCalendarOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteAccessDoorExceptionCalendarOutputSchema.parse(response.data);
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
export const deleteAccessDoorExceptionCalendarMetadata = {
  name: 'delete_access_door_exception_calendar',
  description: `Delete a access door exception calendar. This action cannot be undone.`,
  inputSchema: DeleteAccessDoorExceptionCalendarInputSchema,
  outputSchema: DeleteAccessDoorExceptionCalendarOutputSchema,
  category: 'product/access',
  operationId: 'deleteAccessDoorExceptionCalendarViewV1',
  method: 'DELETE' as const,
  path: '/access/v1/door/exception_calendar/{calendar_id}',
  requiresAuth: true,
  tags: ['Access Door Exception Calendars'],
};
