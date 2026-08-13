/**
 * GetVideoTaggingEventType Tool
 *
 * Get a specific video tagging event type by ID. Returns detailed information about the video tagging event type.
 *
 * @category product/camera
 * @operationId getVideoTaggingEventTypeViewV2
 * @method GET
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
 * Input parameters for getVideoTaggingEventType
 */
const GetVideoTaggingEventTypeInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The event_type_uid parameter */
    event_type_uid: z.string().min(1).optional(),
    /** The name parameter */
    name: z.string().min(1).optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(1000).optional(),
    /** The cursor parameter */
    cursor: z.string().optional(),
  }),
});

type GetVideoTaggingEventTypeInput = z.infer<typeof GetVideoTaggingEventTypeInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getVideoTaggingEventType
 * OK
 */
const GetVideoTaggingEventTypeOutputSchema = z.object({
  /** Base62-encoded pagination cursor for the next page of results. Null if there are no more pages. */
  cursor: z.string().nullable(),
  /** The current page of event types. */
  items: z.array(z.object({ event_schema: z.object({}).nullable(), event_type_uid: z.string().nullable(), name: z.string().nullable(), org_id: z.string().nullable() })).nullable(),
});

type GetVideoTaggingEventTypeOutput = z.infer<typeof GetVideoTaggingEventTypeOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific video tagging event type by ID. Returns detailed information about the video tagging event type.
 *
 * @param input.query.event_type_uid - The event_type_uid parameter
 * @param input.query.name - The name parameter
 * @param input.query.limit - The limit parameter
 * @param input.query.cursor - The cursor parameter
 * @returns OK
 */
export async function getVideoTaggingEventType(
  input: GetVideoTaggingEventTypeInput
): Promise<APIResponse<GetVideoTaggingEventTypeOutput>> {
  // Validate input
  const validated = GetVideoTaggingEventTypeInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/video_tagging/event_types';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.event_type_uid !== undefined) {
    queryParams.set('event_type_uid', String(validated.query.event_type_uid));
  }
  if (validated.query.name !== undefined) {
    queryParams.set('name', String(validated.query.name));
  }
  if (validated.query.limit !== undefined) {
    queryParams.set('limit', String(validated.query.limit));
  }
  if (validated.query.cursor !== undefined) {
    queryParams.set('cursor', String(validated.query.cursor));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetVideoTaggingEventTypeOutput>({
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
export const getVideoTaggingEventTypeMetadata = {
  name: 'get_video_tagging_event_type',
  description: `Get a specific video tagging event type by ID. Returns detailed information about the video tagging event type.`,
  inputSchema: GetVideoTaggingEventTypeInputSchema,
  outputSchema: GetVideoTaggingEventTypeOutputSchema,
  category: 'product/camera',
  operationId: 'getVideoTaggingEventTypeViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/video_tagging/event_types',
  requiresAuth: true,
  tags: ['Methods'],
};
