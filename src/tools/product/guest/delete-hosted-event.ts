/**
 * DeleteHostedEvent Tool
 *
 * Delete a hosted event. This action cannot be undone.
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
 * Input parameters for deleteHostedEvent
 */
const DeleteHostedEventInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The guest_event_id parameter (required) */
    guest_event_id: z.string(),
  }),
});

type DeleteHostedEventInput = z.infer<typeof DeleteHostedEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteHostedEvent
 * ok
 */
const DeleteHostedEventOutputSchema = z.object({
});

type DeleteHostedEventOutput = z.infer<typeof DeleteHostedEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a hosted event. This action cannot be undone.
 *
 * @param input.path.guest_event_id - The guest_event_id parameter
 * @returns ok
 */
export async function deleteHostedEvent(
  input: DeleteHostedEventInput
): Promise<APIResponse<DeleteHostedEventOutput>> {
  // Validate input
  const validated = DeleteHostedEventInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/guest/guest_events/{guest_event_id}';
  path = path.replace('{guest_event_id}', encodeURIComponent(String(validated.path.guest_event_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<DeleteHostedEventOutput>({
    method: 'DELETE',
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
export const deleteHostedEventMetadata = {
  name: 'delete_hosted_event',
  description: `Delete a hosted event. This action cannot be undone.`,
  inputSchema: DeleteHostedEventInputSchema,
  outputSchema: DeleteHostedEventOutputSchema,
  category: 'product/guest',
  operationId: 'deleteGuestSingleEventViewV2',
  method: 'DELETE' as const,
  path: '/v2/guest/guest_events/{guest_event_id}',
  requiresAuth: true,
  tags: ['Events'],
};
