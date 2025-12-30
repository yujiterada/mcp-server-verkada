/**
 * CreateVideoTaggingEventType Tool
 *
 * Create a new video tagging event type. Provide the required fields in the request body.
 *
 * @category command/alert
 * @operationId postVideoTaggingEventTypeViewV1
 * @method POST
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
 * Input parameters for createVideoTaggingEventType
 */
const CreateVideoTaggingEventTypeInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** The schema of the event type. (required) */
    event_schema: z.object({}),
    /** The name of the event type. (required) */
    name: z.string(),
  }),
});

type CreateVideoTaggingEventTypeInput = z.infer<typeof CreateVideoTaggingEventTypeInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createVideoTaggingEventType
 * OK
 */
const CreateVideoTaggingEventTypeOutputSchema = z.object({
  /** The schema of the event type. */
  event_schema: z.object({}),
  /** The unique identifier of the event type. */
  event_type_uid: z.string(),
  /** The name of the event type. */
  name: z.string(),
  /** The unique identifier of the organization. */
  org_id: z.string(),
});

type CreateVideoTaggingEventTypeOutput = z.infer<typeof CreateVideoTaggingEventTypeOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new video tagging event type. Provide the required fields in the request body.
 *
 * @param input.body.event_schema - The schema of the event type.
 * @param input.body.name - The name of the event type.
 * @returns OK
 */
export async function createVideoTaggingEventType(
  input: CreateVideoTaggingEventTypeInput
): Promise<APIResponse<CreateVideoTaggingEventTypeOutput>> {
  // Validate input
  const validated = CreateVideoTaggingEventTypeInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/video_tagging/event_type';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateVideoTaggingEventTypeOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      event_schema: validated.body.event_schema,
      name: validated.body.name,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = CreateVideoTaggingEventTypeOutputSchema.parse(response.data);
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
export const createVideoTaggingEventTypeMetadata = {
  name: 'create_video_tagging_event_type',
  description: `Create a new video tagging event type. Provide the required fields in the request body.`,
  inputSchema: CreateVideoTaggingEventTypeInputSchema,
  outputSchema: CreateVideoTaggingEventTypeOutputSchema,
  category: 'command/alert',
  operationId: 'postVideoTaggingEventTypeViewV1',
  method: 'POST' as const,
  path: '/cameras/v1/video_tagging/event_type',
  requiresAuth: true,
  tags: ['Methods'],
};
