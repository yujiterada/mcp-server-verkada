/**
 * CreateVideoTaggingEvent Tool
 *
 * Create a new video tagging event. Provide the required fields in the request body.
 *
 * @category command/alert
 * @operationId postVideoTaggingEventViewV1
 * @method POST
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
 * Input parameters for createVideoTaggingEvent
 */
const CreateVideoTaggingEventInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** List of event attributes. */
    attributes: z.object({}).optional(),
    /** The unique identifier of the camera. (required) */
    camera_id: z.string(),
    /** The unique identifier of the event type. (required) */
    event_type_uid: z.string(),
    /** Whether or not an event is flagged. */
    flagged: z.boolean().optional(),
    /** The event epoch time in milliseconds. (required) */
    time_ms: z.number().int(),
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
 * @param input.body.attributes - List of event attributes.
 * @param input.body.camera_id - The unique identifier of the camera.
 * @param input.body.event_type_uid - The unique identifier of the event type.
 * @param input.body.flagged - Whether or not an event is flagged.
 * @param input.body.time_ms - The event epoch time in milliseconds.
 * @returns ok
 */
export async function createVideoTaggingEvent(
  input: CreateVideoTaggingEventInput
): Promise<APIResponse<CreateVideoTaggingEventOutput>> {
  // Validate input
  const validated = CreateVideoTaggingEventInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/video_tagging/event';

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
      time_ms: validated.body.time_ms,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = CreateVideoTaggingEventOutputSchema.parse(response.data);
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
export const createVideoTaggingEventMetadata = {
  name: 'create_video_tagging_event',
  description: `Create a new video tagging event. Provide the required fields in the request body.`,
  inputSchema: CreateVideoTaggingEventInputSchema,
  outputSchema: CreateVideoTaggingEventOutputSchema,
  category: 'command/alert',
  operationId: 'postVideoTaggingEventViewV1',
  method: 'POST' as const,
  path: '/cameras/v1/video_tagging/event',
  requiresAuth: true,
  tags: ['Methods'],
};
