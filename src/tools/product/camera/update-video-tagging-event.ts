/**
 * UpdateVideoTaggingEvent Tool
 *
 * Update an existing video tagging event. Only the provided fields will be changed.
 *
 * @category product/camera
 * @operationId patchVideoTaggingEventViewV2
 * @method PATCH
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
 * Input parameters for updateVideoTaggingEvent
 */
const UpdateVideoTaggingEventInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string().min(1),
    /** The occurred_at parameter (required) */
    occurred_at: z.string(),
    /** The event_type_uid parameter (required) */
    event_type_uid: z.string().min(1),
  }),
  /** Body parameters */
  body: z.object({
    /** A map of event attributes. */
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
 * @param input.query.occurred_at - The occurred_at parameter
 * @param input.query.event_type_uid - The event_type_uid parameter
 * @param input.body.attributes - A map of event attributes.
 * @param input.body.flagged - Whether or not an event is flagged.
 * @returns ok
 */
export async function updateVideoTaggingEvent(
  input: UpdateVideoTaggingEventInput
): Promise<APIResponse<UpdateVideoTaggingEventOutput>> {
  // Validate input
  const validated = UpdateVideoTaggingEventInputSchema.parse(input);

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
  const response = await callVerkadaAPI<UpdateVideoTaggingEventOutput>({
    method: 'PATCH',
    path: fullPath,
    body: {
      attributes: validated.body.attributes,
      flagged: validated.body.flagged,
    },
  });

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
  category: 'product/camera',
  operationId: 'patchVideoTaggingEventViewV2',
  method: 'PATCH' as const,
  path: '/v2/cameras/video_tagging/events',
  requiresAuth: true,
  tags: ['Methods'],
};
