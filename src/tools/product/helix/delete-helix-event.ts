/**
 * DeleteHelixEvent Tool
 *
 * Delete a helix event. This action cannot be undone.
 *
 * @category product/helix
 * @operationId deleteVideoTaggingEventViewV1
 * @method DELETE
 * @path /cameras/v1/video_tagging/event
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
 * Input parameters for deleteHelixEvent
 */
const DeleteHelixEventInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The time_ms parameter (required) */
    time_ms: z.number().int(),
    /** The event_type_uid parameter (required) */
    event_type_uid: z.string(),
  }),
});

type DeleteHelixEventInput = z.infer<typeof DeleteHelixEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteHelixEvent
 * ok
 */
const DeleteHelixEventOutputSchema = z.object({
});

type DeleteHelixEventOutput = z.infer<typeof DeleteHelixEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a helix event. This action cannot be undone.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.time_ms - The time_ms parameter
 * @param input.query.event_type_uid - The event_type_uid parameter
 * @returns ok
 */
export async function deleteHelixEvent(
  input: DeleteHelixEventInput
): Promise<APIResponse<DeleteHelixEventOutput>> {
  // Validate input
  const validated = DeleteHelixEventInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/video_tagging/event';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.camera_id !== undefined) {
    queryParams.set('camera_id', String(validated.query.camera_id));
  }
  if (validated.query.time_ms !== undefined) {
    queryParams.set('time_ms', String(validated.query.time_ms));
  }
  if (validated.query.event_type_uid !== undefined) {
    queryParams.set('event_type_uid', String(validated.query.event_type_uid));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<DeleteHelixEventOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteHelixEventOutputSchema.parse(response.data);
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
export const deleteHelixEventMetadata = {
  name: 'delete_helix_event',
  description: `Delete a helix event. This action cannot be undone.`,
  inputSchema: DeleteHelixEventInputSchema,
  outputSchema: DeleteHelixEventOutputSchema,
  category: 'product/helix',
  operationId: 'deleteVideoTaggingEventViewV1',
  method: 'DELETE' as const,
  path: '/cameras/v1/video_tagging/event',
  requiresAuth: true,
  tags: ['Methods'],
};
