/**
 * DeleteVideoTaggingEvent Tool
 *
 * Delete a video tagging event. This action cannot be undone.
 *
 * @category product/camera
 * @operationId deleteVideoTaggingEventViewV2
 * @method DELETE
 * @path /v2/cameras/video_tagging/events
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
 * Input parameters for deleteVideoTaggingEvent
 */
const DeleteVideoTaggingEventInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string().min(1),
    /** The occurred_at parameter (required) */
    occurred_at: z.string(),
    /** The event_type_uid parameter (required) */
    event_type_uid: z.string().min(1),
  }),
});

type DeleteVideoTaggingEventInput = z.infer<typeof DeleteVideoTaggingEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteVideoTaggingEvent
 * ok
 */
const DeleteVideoTaggingEventOutputSchema = z.object({
});

type DeleteVideoTaggingEventOutput = z.infer<typeof DeleteVideoTaggingEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a video tagging event. This action cannot be undone.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.occurred_at - The occurred_at parameter
 * @param input.query.event_type_uid - The event_type_uid parameter
 * @returns ok
 */
export async function deleteVideoTaggingEvent(
  input: DeleteVideoTaggingEventInput
): Promise<APIResponse<DeleteVideoTaggingEventOutput>> {
  // Validate input
  const validated = DeleteVideoTaggingEventInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/video_tagging/events';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.camera_id !== undefined) {
    queryParams.set('camera_id', String(validated.query.camera_id));
  }
  if (validated.query.occurred_at !== undefined) {
    queryParams.set('occurred_at', String(validated.query.occurred_at));
  }
  if (validated.query.event_type_uid !== undefined) {
    queryParams.set('event_type_uid', String(validated.query.event_type_uid));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<DeleteVideoTaggingEventOutput>({
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
export const deleteVideoTaggingEventMetadata = {
  name: 'delete_video_tagging_event',
  description: `Delete a video tagging event. This action cannot be undone.`,
  inputSchema: DeleteVideoTaggingEventInputSchema,
  outputSchema: DeleteVideoTaggingEventOutputSchema,
  category: 'product/camera',
  operationId: 'deleteVideoTaggingEventViewV2',
  method: 'DELETE' as const,
  path: '/v2/cameras/video_tagging/events',
  requiresAuth: true,
  tags: ['Methods'],
};
