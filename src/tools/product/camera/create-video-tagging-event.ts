/**
 * CreateVideoTaggingEvent Tool
 *
 * Create a new video tagging event. Provide the required fields in the request body.
 *
 * @category product/camera
 * @operationId postVideoTaggingEventViewV2
 * @method POST
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
 * Input parameters for createVideoTaggingEvent
 */
const CreateVideoTaggingEventInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** A map of event attributes. */
    attributes: z.object({}).optional(),
    /** The unique identifier of the camera. (required) */
    camera_id: z.string().min(1),
    /** The unique identifier of the event type. (required) */
    event_type_uid: z.string().min(1),
    /** Whether or not an event is flagged. */
    flagged: z.boolean().optional(),
    /** The time at which the event occurred, in ISO 8601 format (e.g. 2025-07-17T21:06:20Z). Replaces the v1 &#x60;time_ms&#x60; field. (required) */
    occurred_at: z.string(),
  }),
});

type CreateVideoTaggingEventInput = z.infer<typeof CreateVideoTaggingEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createVideoTaggingEvent
 * ok
 */
const CreateVideoTaggingEventOutputSchema = z.object({
});

type CreateVideoTaggingEventOutput = z.infer<typeof CreateVideoTaggingEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new video tagging event. Provide the required fields in the request body.
 *
 * @param input.body.attributes - A map of event attributes.
 * @param input.body.camera_id - The unique identifier of the camera.
 * @param input.body.event_type_uid - The unique identifier of the event type.
 * @param input.body.flagged - Whether or not an event is flagged.
 * @param input.body.occurred_at - The time at which the event occurred, in ISO 8601 format (e.g. 2025-07-17T21:06:20Z). Replaces the v1 &#x60;time_ms&#x60; field.
 * @returns ok
 */
export async function createVideoTaggingEvent(
  input: CreateVideoTaggingEventInput
): Promise<APIResponse<CreateVideoTaggingEventOutput>> {
  // Validate input
  const validated = CreateVideoTaggingEventInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/video_tagging/events';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateVideoTaggingEventOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      attributes: validated.body.attributes,
      camera_id: validated.body.camera_id,
      event_type_uid: validated.body.event_type_uid,
      flagged: validated.body.flagged,
      occurred_at: validated.body.occurred_at,
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
export const createVideoTaggingEventMetadata = {
  name: 'create_video_tagging_event',
  description: `Create a new video tagging event. Provide the required fields in the request body.`,
  inputSchema: CreateVideoTaggingEventInputSchema,
  outputSchema: CreateVideoTaggingEventOutputSchema,
  category: 'product/camera',
  operationId: 'postVideoTaggingEventViewV2',
  method: 'POST' as const,
  path: '/v2/cameras/video_tagging/events',
  requiresAuth: true,
  tags: ['Methods'],
};
