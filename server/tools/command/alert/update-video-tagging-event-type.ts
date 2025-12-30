/**
 * UpdateVideoTaggingEventType Tool
 *
 * Update an existing video tagging event type. Only the provided fields will be changed.
 *
 * @category command/alert
 * @operationId patchVideoTaggingEventTypeViewV1
 * @method PATCH
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
 * Input parameters for updateVideoTaggingEventType
 */
const UpdateVideoTaggingEventTypeInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The event_type_uid parameter (required) */
    event_type_uid: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** The schema of the event type. */
    event_schema: z.object({}).optional(),
    /** The name of the event type. */
    name: z.string().optional(),
  }),
});

type UpdateVideoTaggingEventTypeInput = z.infer<typeof UpdateVideoTaggingEventTypeInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateVideoTaggingEventType
 * ok
 */
const UpdateVideoTaggingEventTypeOutputSchema = z.object({
});

type UpdateVideoTaggingEventTypeOutput = z.infer<typeof UpdateVideoTaggingEventTypeOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing video tagging event type. Only the provided fields will be changed.
 *
 * @param input.query.event_type_uid - The event_type_uid parameter
 * @param input.body.event_schema - The schema of the event type.
 * @param input.body.name - The name of the event type.
 * @returns ok
 */
export async function updateVideoTaggingEventType(
  input: UpdateVideoTaggingEventTypeInput
): Promise<APIResponse<UpdateVideoTaggingEventTypeOutput>> {
  // Validate input
  const validated = UpdateVideoTaggingEventTypeInputSchema.parse(input);

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
  const response = await callVerkadaAPI<UpdateVideoTaggingEventTypeOutput>({
    method: 'PATCH',
    path: fullPath,
    body: {
      event_schema: validated.body.event_schema,
      name: validated.body.name,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UpdateVideoTaggingEventTypeOutputSchema.parse(response.data);
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
export const updateVideoTaggingEventTypeMetadata = {
  name: 'update_video_tagging_event_type',
  description: `Update an existing video tagging event type. Only the provided fields will be changed.`,
  inputSchema: UpdateVideoTaggingEventTypeInputSchema,
  outputSchema: UpdateVideoTaggingEventTypeOutputSchema,
  category: 'command/alert',
  operationId: 'patchVideoTaggingEventTypeViewV1',
  method: 'PATCH' as const,
  path: '/cameras/v1/video_tagging/event_type',
  requiresAuth: true,
  tags: ['Methods'],
};
