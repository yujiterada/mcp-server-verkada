/**
 * ListHelixEventTypes Tool
 *
 * List all helix event types. Use this to enumerate or search through helix event types.
 *
 * @category product/helix
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
 * Input parameters for listHelixEventTypes
 */
const ListHelixEventTypesInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The event_type_uid parameter */
    event_type_uid: z.string().optional(),
    /** The name parameter */
    name: z.string().optional(),
  }),
});

type ListHelixEventTypesInput = z.infer<typeof ListHelixEventTypesInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listHelixEventTypes
 * Returns a list of event types
 */
const ListHelixEventTypesOutputSchema = z.object({
  /** A list of event types. */
  event_types: z.array(
    z.object({
      event_schema: z.record(z.string()),
      event_type_uid: z.string(),
      name: z.string(),
      org_id: z.string()
    })
  ),
});

type ListHelixEventTypesOutput = z.infer<typeof ListHelixEventTypesOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all helix event types. Use this to enumerate or search through helix event types.
 *
 * @param input.query.event_type_uid - The event_type_uid parameter
 * @param input.query.name - The name parameter
 * @returns OK
 */
export async function listHelixEventTypes(
  input: ListHelixEventTypesInput
): Promise<APIResponse<ListHelixEventTypesOutput>> {
  // Validate input
  const validated = ListHelixEventTypesInputSchema.parse(input);

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
  const response = await callVerkadaAPI<ListHelixEventTypesOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ListHelixEventTypesOutputSchema.parse(response.data);
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
export const listHelixEventTypesMetadata = {
  name: 'list_helix_event_types',
  description: `List all helix event types. Use this to enumerate or search through helix event types.`,
  inputSchema: ListHelixEventTypesInputSchema,
  outputSchema: ListHelixEventTypesOutputSchema,
  category: 'product/helix',
  operationId: 'getVideoTaggingEventTypeViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/video_tagging/event_type',
  requiresAuth: true,
  tags: ['Methods'],
};
