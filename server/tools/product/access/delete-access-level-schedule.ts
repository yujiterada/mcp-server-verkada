/**
 * DeleteAccessLevelSchedule Tool
 *
 * Delete a access level schedule. This action cannot be undone.
 *
 * @category product/access
 * @operationId deleteAccessLevelScheduleView
 * @method DELETE
 * @path /access/v1/door/access_level/{access_level_id}/access_schedule_event/{event_id}
 * @tags Access Levels
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
 * Input parameters for deleteAccessLevelSchedule
 */
const DeleteAccessLevelScheduleInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The access_level_id parameter (required) */
    access_level_id: z.string(),
    /** The event_id parameter (required) */
    event_id: z.string(),
  }),
});

type DeleteAccessLevelScheduleInput = z.infer<typeof DeleteAccessLevelScheduleInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteAccessLevelSchedule
 * ok
 */
const DeleteAccessLevelScheduleOutputSchema = z.object({
});

type DeleteAccessLevelScheduleOutput = z.infer<typeof DeleteAccessLevelScheduleOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a access level schedule. This action cannot be undone.
 *
 * @param input.path.access_level_id - The access_level_id parameter
 * @param input.path.event_id - The event_id parameter
 * @returns ok
 */
export async function deleteAccessLevelSchedule(
  input: DeleteAccessLevelScheduleInput
): Promise<APIResponse<DeleteAccessLevelScheduleOutput>> {
  // Validate input
  const validated = DeleteAccessLevelScheduleInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/door/access_level/{access_level_id}/access_schedule_event/{event_id}';
  path = path.replace('{access_level_id}', encodeURIComponent(String(validated.path.access_level_id)));
  path = path.replace('{event_id}', encodeURIComponent(String(validated.path.event_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<DeleteAccessLevelScheduleOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteAccessLevelScheduleOutputSchema.parse(response.data);
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
export const deleteAccessLevelScheduleMetadata = {
  name: 'delete_access_level_schedule',
  description: `Delete a access level schedule. This action cannot be undone.`,
  inputSchema: DeleteAccessLevelScheduleInputSchema,
  outputSchema: DeleteAccessLevelScheduleOutputSchema,
  category: 'product/access',
  operationId: 'deleteAccessLevelScheduleView',
  method: 'DELETE' as const,
  path: '/access/v1/door/access_level/{access_level_id}/access_schedule_event/{event_id}',
  requiresAuth: true,
  tags: ['Access Levels'],
};
