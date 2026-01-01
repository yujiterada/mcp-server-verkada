/**
 * DeleteAccessDoorException Tool
 *
 * Delete a access door exception. This action cannot be undone.
 *
 * @category product/access
 * @operationId deleteAccessDoorExceptionViewV1
 * @method DELETE
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
 * Input parameters for deleteAccessDoorException
 */
const DeleteAccessDoorExceptionInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The calendar_id parameter (required) */
    calendar_id: z.string(),
    /** The exception_id parameter (required) */
    exception_id: z.string(),
  }),
});

type DeleteAccessDoorExceptionInput = z.infer<typeof DeleteAccessDoorExceptionInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteAccessDoorException
 * ok
 */
const DeleteAccessDoorExceptionOutputSchema = z.object({
});

type DeleteAccessDoorExceptionOutput = z.infer<typeof DeleteAccessDoorExceptionOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a access door exception. This action cannot be undone.
 *
 * @param input.path.calendar_id - The calendar_id parameter
 * @param input.path.exception_id - The exception_id parameter
 * @returns ok
 */
export async function deleteAccessDoorException(
  input: DeleteAccessDoorExceptionInput
): Promise<APIResponse<DeleteAccessDoorExceptionOutput>> {
  // Validate input
  const validated = DeleteAccessDoorExceptionInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/door/exception_calendar/{calendar_id}/exception/{exception_id}';
  path = path.replace('{calendar_id}', encodeURIComponent(String(validated.path.calendar_id)));
  path = path.replace('{exception_id}', encodeURIComponent(String(validated.path.exception_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<DeleteAccessDoorExceptionOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteAccessDoorExceptionOutputSchema.parse(response.data);
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
export const deleteAccessDoorExceptionMetadata = {
  name: 'delete_access_door_exception',
  description: `Delete a access door exception. This action cannot be undone.`,
  inputSchema: DeleteAccessDoorExceptionInputSchema,
  outputSchema: DeleteAccessDoorExceptionOutputSchema,
  category: 'product/access',
  operationId: 'deleteAccessDoorExceptionViewV1',
  method: 'DELETE' as const,
  path: '/access/v1/door/exception_calendar/{calendar_id}/exception/{exception_id}',
  requiresAuth: true,
  tags: ['Access Door Exception Calendars'],
};
