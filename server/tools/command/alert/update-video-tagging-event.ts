/**
 * UpdateVideoTaggingEvent Tool
 *
 * Update an existing video tagging event. Only the provided fields will be changed.
 *
 * @category command/alert
 * @operationId patchVideoTaggingEventViewV1
 * @method PATCH
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
 * Input parameters for updateVideoTaggingEvent
 */
const UpdateVideoTaggingEventInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The time_ms parameter (required) */
    time_ms: z.number().int(),
    /** The event_type_uid parameter (required) */
    event_type_uid: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** list of event attributes. */
    attributes: z.object({}).optional(),
    /** Whether or not an event is flagged. */
    flagged: z.boolean().optional(),
  }),
});

type UpdateVideoTaggingEventInput = z.infer<typeof UpdateVideoTaggingEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateVideoTaggingEvent
 * ok
 */
const UpdateVideoTaggingEventOutputSchema = z.object({
});

type UpdateVideoTaggingEventOutput = z.infer<typeof UpdateVideoTaggingEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing video tagging event. Only the provided fields will be changed.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.time_ms - The time_ms parameter
 * @param input.query.event_type_uid - The event_type_uid parameter
 * @param input.body.attributes - list of event attributes.
 * @param input.body.flagged - Whether or not an event is flagged.
 * @returns ok
 */
export async function updateVideoTaggingEvent(
  input: UpdateVideoTaggingEventInput
): Promise<APIResponse<UpdateVideoTaggingEventOutput>> {
  // Validate input
  const validated = UpdateVideoTaggingEventInputSchema.parse(input);

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
  const response = await callVerkadaAPI<UpdateVideoTaggingEventOutput>({
    method: 'PATCH',
    path: fullPath,
    body: {
      attributes: validated.body.attributes,
      flagged: validated.body.flagged,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UpdateVideoTaggingEventOutputSchema.parse(response.data);
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
export const updateVideoTaggingEventMetadata = {
  name: 'update_video_tagging_event',
  description: `Update an existing video tagging event. Only the provided fields will be changed.`,
  inputSchema: UpdateVideoTaggingEventInputSchema,
  outputSchema: UpdateVideoTaggingEventOutputSchema,
  category: 'command/alert',
  operationId: 'patchVideoTaggingEventViewV1',
  method: 'PATCH' as const,
  path: '/cameras/v1/video_tagging/event',
  requiresAuth: true,
  tags: ['Methods'],
};
