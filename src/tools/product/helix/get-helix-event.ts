/**
 * GetHelixEvent Tool
 *
 * Get a specific helix event by ID. Returns detailed information about the helix event.
 *
 * @category product/helix
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
 * Input parameters for getHelixEvent
 */
const GetHelixEventInputSchema = z.object({
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

type GetHelixEventInput = z.infer<typeof GetHelixEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getHelixEvent
 * OK
 */
const GetHelixEventOutputSchema = z.object({
  /** list of event attributes. */
  attributes: z.record(z.string()),
  //attributes: z.record(z.union([z.string(), z.number(), z.boolean()])),
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

type GetHelixEventOutput = z.infer<typeof GetHelixEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific helix event by ID. Returns detailed information about the helix event.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.time_ms - The time_ms parameter
 * @param input.query.event_type_uid - The event_type_uid parameter
 * @returns OK
 */
export async function getHelixEvent(
  input: GetHelixEventInput
): Promise<APIResponse<GetHelixEventOutput>> {
  // Validate input
  const validated = GetHelixEventInputSchema.parse(input);

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
  const response = await callVerkadaAPI<GetHelixEventOutput>({
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
export const getHelixEventMetadata = {
  name: 'get_helix_event',
  description: `Get a specific helix event by ID. Returns detailed information about the helix event.`,
  inputSchema: GetHelixEventInputSchema,
  outputSchema: GetHelixEventOutputSchema,
  category: 'product/helix',
  operationId: 'getVideoTaggingEventViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/video_tagging/event',
  requiresAuth: true,
  tags: ['Methods'],
};
