/**
 * GetVideoTaggingEvent Tool
 *
 * Get a specific video tagging event by ID. Returns detailed information about the video tagging event.
 *
 * @category command/alert
 * @operationId getVideoTaggingEventViewV1
 * @method GET
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
 * Input parameters for getVideoTaggingEvent
 */
const GetVideoTaggingEventInputSchema = z.object({
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

type GetVideoTaggingEventInput = z.infer<typeof GetVideoTaggingEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getVideoTaggingEvent
 * OK
 */
const GetVideoTaggingEventOutputSchema = z.object({
  /** list of event attributes. */
  attributes: z.object({}),
  /** The unique identifier of the camera. */
  camera_id: z.string(),
  /** The unique identifier of the event type. */
  event_type_uid: z.string(),
  /** Whether or not an event is flagged. */
  flagged: z.boolean(),
  /** The unique identifier of the organization. */
  org_id: z.string(),
  /** The event epoch time in milliseconds. */
  time_ms: z.number().int(),
});

type GetVideoTaggingEventOutput = z.infer<typeof GetVideoTaggingEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific video tagging event by ID. Returns detailed information about the video tagging event.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.time_ms - The time_ms parameter
 * @param input.query.event_type_uid - The event_type_uid parameter
 * @returns OK
 */
export async function getVideoTaggingEvent(
  input: GetVideoTaggingEventInput
): Promise<APIResponse<GetVideoTaggingEventOutput>> {
  // Validate input
  const validated = GetVideoTaggingEventInputSchema.parse(input);

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
  const response = await callVerkadaAPI<GetVideoTaggingEventOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetVideoTaggingEventOutputSchema.parse(response.data);
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
export const getVideoTaggingEventMetadata = {
  name: 'get_video_tagging_event',
  description: `Get a specific video tagging event by ID. Returns detailed information about the video tagging event.`,
  inputSchema: GetVideoTaggingEventInputSchema,
  outputSchema: GetVideoTaggingEventOutputSchema,
  category: 'command/alert',
  operationId: 'getVideoTaggingEventViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/video_tagging/event',
  requiresAuth: true,
  tags: ['Methods'],
};
