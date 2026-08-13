/**
 * GetVideoTaggingEvent Tool
 *
 * Get a specific video tagging event by ID. Returns detailed information about the video tagging event.
 *
 * @category product/camera
 * @operationId getVideoTaggingEventViewV2
 * @method GET
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
 * Input parameters for getVideoTaggingEvent
 */
const GetVideoTaggingEventInputSchema = z.object({
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

type GetVideoTaggingEventInput = z.infer<typeof GetVideoTaggingEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getVideoTaggingEvent
 * OK
 */
const GetVideoTaggingEventOutputSchema = z.object({
  /** A map of event attributes. */
  attributes: z.object({}).nullable(),
  /** The unique identifier of the camera. */
  camera_id: z.string().nullable(),
  /** The unique identifier of the event type. */
  event_type_uid: z.string().nullable(),
  /** Whether or not an event is flagged. */
  flagged: z.boolean().nullable(),
  /** The time at which the event occurred, in RFC 3339 format with millisecond precision (e.g. 2025-08-04T21:51:53.123+00:00). */
  occurred_at: z.string().nullable(),
  /** The unique identifier of the organization. */
  org_id: z.string().nullable(),
});

type GetVideoTaggingEventOutput = z.infer<typeof GetVideoTaggingEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific video tagging event by ID. Returns detailed information about the video tagging event.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.occurred_at - The occurred_at parameter
 * @param input.query.event_type_uid - The event_type_uid parameter
 * @returns OK
 */
export async function getVideoTaggingEvent(
  input: GetVideoTaggingEventInput
): Promise<APIResponse<GetVideoTaggingEventOutput>> {
  // Validate input
  const validated = GetVideoTaggingEventInputSchema.parse(input);

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
  const response = await callVerkadaAPI<GetVideoTaggingEventOutput>({
    method: 'GET',
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
export const getVideoTaggingEventMetadata = {
  name: 'get_video_tagging_event',
  description: `Get a specific video tagging event by ID. Returns detailed information about the video tagging event.`,
  inputSchema: GetVideoTaggingEventInputSchema,
  outputSchema: GetVideoTaggingEventOutputSchema,
  category: 'product/camera',
  operationId: 'getVideoTaggingEventViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/video_tagging/events',
  requiresAuth: true,
  tags: ['Methods'],
};
