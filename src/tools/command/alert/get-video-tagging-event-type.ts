/**
 * GetVideoTaggingEventType Tool
 *
 * Get a specific video tagging event type by ID. Returns detailed information about the video tagging event type.
 *
 * @category command/alert
 * @operationId getVideoTaggingEventTypeViewV1
 * @method GET
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
 * Input parameters for getVideoTaggingEventType
 */
const GetVideoTaggingEventTypeInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The event_type_uid parameter */
    event_type_uid: z.string().optional(),
    /** The name parameter */
    name: z.string().optional(),
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
  /** A list of event types. */
  event_types: z.array(z.object({ event_schema: z.object({}), event_type_uid: z.string(), name: z.string(), org_id: z.string() })),
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
 * @returns OK
 */
export async function getVideoTaggingEventType(
  input: GetVideoTaggingEventTypeInput
): Promise<APIResponse<GetVideoTaggingEventTypeOutput>> {
  // Validate input
  const validated = GetVideoTaggingEventTypeInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/video_tagging/event_type';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.event_type_uid !== undefined) {
    queryParams.set('event_type_uid', String(validated.query.event_type_uid));
  }
  if (validated.query.name !== undefined) {
    queryParams.set('name', String(validated.query.name));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetVideoTaggingEventTypeOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetVideoTaggingEventTypeOutputSchema.parse(response.data);
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
export const getVideoTaggingEventTypeMetadata = {
  name: 'get_video_tagging_event_type',
  description: `Get a specific video tagging event type by ID. Returns detailed information about the video tagging event type.`,
  inputSchema: GetVideoTaggingEventTypeInputSchema,
  outputSchema: GetVideoTaggingEventTypeOutputSchema,
  category: 'command/alert',
  operationId: 'getVideoTaggingEventTypeViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/video_tagging/event_type',
  requiresAuth: true,
  tags: ['Methods'],
};
