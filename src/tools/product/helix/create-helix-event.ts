/**
 * CreateHelixEvent Tool
 *
 * Create a new helix event. Provide the required fields in the request body.
 *
 * @category product/helix
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
import { coerceHelixAttributeValues } from '../../../utils/helix-attributes.js';

// ============================================================================
// INPUT SCHEMA
// ============================================================================

/**
 * Input parameters for createHelixEvent
 * 
 */
const CreateHelixEventInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** List of event attributes (key-value pairs matching the event type schema). */
    attributes: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
    /** The unique identifier of the camera. (required) */
    camera_id: z.string(),
    /** The unique identifier of the event type. (required) */
    event_type_uid: z.string(),
    /** Whether or not an event is flagged. */
    flagged: z.boolean().optional(),
    /** The event epoch time in milliseconds. Must be within the last 30 days. (required) */
    time_ms: z.number().int().refine(
      (val) => val >= Date.now() - 30 * 24 * 60 * 60 * 1000,
      { message: 'time_ms must be within the last 30 days' }
    ),
  }),
});

type CreateHelixEventInput = z.infer<typeof CreateHelixEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createHelixEvent
 * ok
 */
const CreateHelixEventOutputSchema = z.object({
});

type CreateHelixEventOutput = z.infer<typeof CreateHelixEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new helix event. Provide the required fields in the request body.
 *
 * @param input.body.attributes - List of event attributes.
 * @param input.body.camera_id - The unique identifier of the camera.
 * @param input.body.event_type_uid - The unique identifier of the event type.
 * @param input.body.flagged - Whether or not an event is flagged.
 * @param input.body.time_ms - The event epoch time in milliseconds.
 * @returns ok
 */
export async function createHelixEvent(
  input: CreateHelixEventInput
): Promise<APIResponse<CreateHelixEventOutput>> {
  // Validate input
  const validated = CreateHelixEventInputSchema.parse(input);

  // Coerce attribute values to appropriate types (convert numeric strings to numbers)
  const coercedAttributes = coerceHelixAttributeValues(validated.body.attributes);

  // Build path with parameters
  const path = '/cameras/v1/video_tagging/event';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateHelixEventOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      attributes: coercedAttributes,
      camera_id: validated.body.camera_id,
      event_type_uid: validated.body.event_type_uid,
      flagged: validated.body.flagged,
      time_ms: validated.body.time_ms,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = CreateHelixEventOutputSchema.parse(response.data);
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
export const createHelixEventMetadata = {
  name: 'create_helix_event',
  description: `Create a new helix event. Provide the required fields in the request body.`,
  inputSchema: CreateHelixEventInputSchema,
  outputSchema: CreateHelixEventOutputSchema,
  category: 'product/helix',
  operationId: 'postVideoTaggingEventViewV1',
  method: 'POST' as const,
  path: '/cameras/v1/video_tagging/event',
  requiresAuth: true,
  tags: ['Methods'],
};
