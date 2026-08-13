/**
 * CreateVideoTaggingEventType Tool
 *
 * Create a new video tagging event type. Provide the required fields in the request body.
 *
 * @category product/camera
 * @operationId postVideoTaggingEventTypeViewV2
 * @method POST
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
 * Input parameters for createVideoTaggingEventType
 */
const CreateVideoTaggingEventTypeInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** The schema of the event type. (required) */
    event_schema: z.object({}),
    /** The name of the event type. (required) */
    name: z.string().min(1),
  }),
});

type CreateVideoTaggingEventTypeInput = z.infer<typeof CreateVideoTaggingEventTypeInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createVideoTaggingEventType
 * ok
 */
const CreateVideoTaggingEventTypeOutputSchema = z.object({
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
 * @returns ok
 */
export async function createVideoTaggingEventType(
  input: CreateVideoTaggingEventTypeInput
): Promise<APIResponse<CreateVideoTaggingEventTypeOutput>> {
  // Validate input
  const validated = CreateVideoTaggingEventTypeInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/video_tagging/event_types';

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
  category: 'product/camera',
  operationId: 'postVideoTaggingEventTypeViewV2',
  method: 'POST' as const,
  path: '/v2/cameras/video_tagging/event_types',
  requiresAuth: true,
  tags: ['Methods'],
};
