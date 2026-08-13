/**
 * DeleteVideoTaggingEventType Tool
 *
 * Delete a video tagging event type. This action cannot be undone.
 *
 * @category product/camera
 * @operationId deleteVideoTaggingEventTypeViewV2
 * @method DELETE
 * @path /v2/cameras/video_tagging/event_types
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
 * Input parameters for deleteVideoTaggingEventType
 */
const DeleteVideoTaggingEventTypeInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The event_type_uid parameter (required) */
    event_type_uid: z.string().min(1),
  }),
});

type DeleteVideoTaggingEventTypeInput = z.infer<typeof DeleteVideoTaggingEventTypeInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteVideoTaggingEventType
 * ok
 */
const DeleteVideoTaggingEventTypeOutputSchema = z.object({
});

type DeleteVideoTaggingEventTypeOutput = z.infer<typeof DeleteVideoTaggingEventTypeOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a video tagging event type. This action cannot be undone.
 *
 * @param input.query.event_type_uid - The event_type_uid parameter
 * @returns ok
 */
export async function deleteVideoTaggingEventType(
  input: DeleteVideoTaggingEventTypeInput
): Promise<APIResponse<DeleteVideoTaggingEventTypeOutput>> {
  // Validate input
  const validated = DeleteVideoTaggingEventTypeInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/video_tagging/event_types';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.event_type_uid !== undefined) {
    queryParams.set('event_type_uid', String(validated.query.event_type_uid));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<DeleteVideoTaggingEventTypeOutput>({
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
export const deleteVideoTaggingEventTypeMetadata = {
  name: 'delete_video_tagging_event_type',
  description: `Delete a video tagging event type. This action cannot be undone.`,
  inputSchema: DeleteVideoTaggingEventTypeInputSchema,
  outputSchema: DeleteVideoTaggingEventTypeOutputSchema,
  category: 'product/camera',
  operationId: 'deleteVideoTaggingEventTypeViewV2',
  method: 'DELETE' as const,
  path: '/v2/cameras/video_tagging/event_types',
  requiresAuth: true,
  tags: ['Methods'],
};
