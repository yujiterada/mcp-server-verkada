/**
 * DeleteHelixEventType Tool
 *
 * Delete a helix event type. This action cannot be undone.
 *
 * @category product/helix
 * @operationId deleteVideoTaggingEventTypeViewV1
 * @method DELETE
 * @path /cameras/v1/video_tagging/event_type
 * @tags Methods
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
 * Input parameters for deleteHelixEventType
 */
const DeleteHelixEventTypeInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The event_type_uid parameter (required) */
    event_type_uid: z.string(),
  }),
});

type DeleteHelixEventTypeInput = z.infer<typeof DeleteHelixEventTypeInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteHelixEventType
 * ok
 */
const DeleteHelixEventTypeOutputSchema = z.object({
});

type DeleteHelixEventTypeOutput = z.infer<typeof DeleteHelixEventTypeOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a helix event type. This action cannot be undone.
 *
 * @param input.query.event_type_uid - The event_type_uid parameter
 * @returns ok
 */
export async function deleteHelixEventType(
  input: DeleteHelixEventTypeInput
): Promise<APIResponse<DeleteHelixEventTypeOutput>> {
  // Validate input
  const validated = DeleteHelixEventTypeInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/video_tagging/event_type';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.event_type_uid !== undefined) {
    queryParams.set('event_type_uid', String(validated.query.event_type_uid));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<DeleteHelixEventTypeOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteHelixEventTypeOutputSchema.parse(response.data);
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
export const deleteHelixEventTypeMetadata = {
  name: 'delete_helix_event_type',
  description: `Delete a helix event type. This action cannot be undone.`,
  inputSchema: DeleteHelixEventTypeInputSchema,
  outputSchema: DeleteHelixEventTypeOutputSchema,
  category: 'product/helix',
  operationId: 'deleteVideoTaggingEventTypeViewV1',
  method: 'DELETE' as const,
  path: '/cameras/v1/video_tagging/event_type',
  requiresAuth: true,
  tags: ['Methods'],
};
