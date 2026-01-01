/**
 * DeleteGuestSingleEvent Tool
 *
 * Delete a guest single event. This action cannot be undone.
 *
 * @category product/guest
 * @operationId deleteGuestSingleEventViewV2
 * @method DELETE
 * @path /v2/guest/guest_events/{guest_event_id}
 * @tags Events
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
 * Input parameters for deleteGuestSingleEvent
 */
const DeleteGuestSingleEventInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The guest_event_id parameter (required) */
    guest_event_id: z.string(),
  }),
});

type DeleteGuestSingleEventInput = z.infer<typeof DeleteGuestSingleEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteGuestSingleEvent
 * ok
 */
const DeleteGuestSingleEventOutputSchema = z.object({
});

type DeleteGuestSingleEventOutput = z.infer<typeof DeleteGuestSingleEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a guest single event. This action cannot be undone.
 *
 * @param input.path.guest_event_id - The guest_event_id parameter
 * @returns ok
 */
export async function deleteGuestSingleEvent(
  input: DeleteGuestSingleEventInput
): Promise<APIResponse<DeleteGuestSingleEventOutput>> {
  // Validate input
  const validated = DeleteGuestSingleEventInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/guest/guest_events/{guest_event_id}';
  path = path.replace('{guest_event_id}', encodeURIComponent(String(validated.path.guest_event_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<DeleteGuestSingleEventOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteGuestSingleEventOutputSchema.parse(response.data);
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
export const deleteGuestSingleEventMetadata = {
  name: 'delete_guest_single_event',
  description: `Delete a guest single event. This action cannot be undone.`,
  inputSchema: DeleteGuestSingleEventInputSchema,
  outputSchema: DeleteGuestSingleEventOutputSchema,
  category: 'product/guest',
  operationId: 'deleteGuestSingleEventViewV2',
  method: 'DELETE' as const,
  path: '/v2/guest/guest_events/{guest_event_id}',
  requiresAuth: true,
  tags: ['Events'],
};
