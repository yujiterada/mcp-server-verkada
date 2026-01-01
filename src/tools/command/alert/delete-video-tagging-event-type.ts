/**
 * DeleteVideoTaggingEventType Tool
 *
 * Delete a video tagging event type. This action cannot be undone.
 *
 * @category command/alert
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
 * Input parameters for deleteVideoTaggingEventType
 */
const DeleteVideoTaggingEventTypeInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The event_type_uid parameter (required) */
    event_type_uid: z.string(),
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
  const path = '/cameras/v1/video_tagging/event_type';

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

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteVideoTaggingEventTypeOutputSchema.parse(response.data);
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
export const deleteVideoTaggingEventTypeMetadata = {
  name: 'delete_video_tagging_event_type',
  description: `Delete a video tagging event type. This action cannot be undone.`,
  inputSchema: DeleteVideoTaggingEventTypeInputSchema,
  outputSchema: DeleteVideoTaggingEventTypeOutputSchema,
  category: 'command/alert',
  operationId: 'deleteVideoTaggingEventTypeViewV1',
  method: 'DELETE' as const,
  path: '/cameras/v1/video_tagging/event_type',
  requiresAuth: true,
  tags: ['Methods'],
};
