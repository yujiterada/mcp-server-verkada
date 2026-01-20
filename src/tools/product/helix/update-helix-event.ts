/**
 * UpdateHelixEvent Tool
 *
 * Update an existing helix event. Only the provided fields will be changed.
 *
 * @category product/helix
 * @operationId patchVideoTaggingEventViewV1
 * @method PATCH
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
 * Input parameters for updateHelixEvent
 * 
 */
const UpdateHelixEventInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The time_ms parameter (required) */
    time_ms: z.number().int(),
    /** The event_type_uid parameter (required) */
    event_type_uid: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** list of event attributes (key-value pairs matching the event type schema). */
    attributes: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
    /** Whether or not an event is flagged. */
    flagged: z.boolean().optional(),
  }),
});

type UpdateHelixEventInput = z.infer<typeof UpdateHelixEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateHelixEvent
 * ok
 */
const UpdateHelixEventOutputSchema = z.object({
});

type UpdateHelixEventOutput = z.infer<typeof UpdateHelixEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing helix event. Only the provided fields will be changed.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.time_ms - The time_ms parameter
 * @param input.query.event_type_uid - The event_type_uid parameter
 * @param input.body.attributes - list of event attributes.
 * @param input.body.flagged - Whether or not an event is flagged.
 * @returns ok
 */
export async function updateHelixEvent(
  input: UpdateHelixEventInput
): Promise<APIResponse<UpdateHelixEventOutput>> {
  // Validate input
  const validated = UpdateHelixEventInputSchema.parse(input);

  // Coerce attribute values to appropriate types (convert numeric strings to numbers)
  const coercedAttributes = coerceHelixAttributeValues(validated.body.attributes);

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
  const response = await callVerkadaAPI<UpdateHelixEventOutput>({
    method: 'PATCH',
    path: fullPath,
    body: {
      attributes: coercedAttributes,
      flagged: validated.body.flagged,
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
export const updateHelixEventMetadata = {
  name: 'update_helix_event',
  description: `Update an existing helix event. Only the provided fields will be changed.`,
  inputSchema: UpdateHelixEventInputSchema,
  outputSchema: UpdateHelixEventOutputSchema,
  category: 'product/helix',
  operationId: 'patchVideoTaggingEventViewV1',
  method: 'PATCH' as const,
  path: '/cameras/v1/video_tagging/event',
  requiresAuth: true,
  tags: ['Methods'],
};
