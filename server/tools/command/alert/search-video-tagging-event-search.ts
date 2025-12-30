/**
 * SearchVideoTaggingEventSearch Tool
 *
 * Search for video tagging event search matching the provided criteria.
 *
 * @category command/alert
 * @operationId postVideoTaggingEventSearchViewV1
 * @method POST
 * @path /cameras/v1/video_tagging/event/search
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
 * Input parameters for searchVideoTaggingEventSearch
 */
const SearchVideoTaggingEventSearchInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** List of search filters. */
    attribute_filters: z.array(z.object({ attribute_key: z.string(), attribute_value: z.unknown(), op: z.enum(['eq', 'gt', 'lt']) })).optional(),
    /** List of unique identifiers of cameras */
    camera_ids: z.array(z.string()).optional(),
    /** Query end epoch time in milliseconds. */
    end_time_ms: z.number().int().optional(),
    /** The unique identifier of the event type. */
    event_type_uid: z.string().optional(),
    /** Whether or not an event is flagged. */
    flagged: z.boolean().optional(),
    /** List of search keywords. */
    keywords: z.array(z.string()).optional(),
    /** Query start epoch time in milliseconds. */
    start_time_ms: z.number().int().optional(),
  }),
});

type SearchVideoTaggingEventSearchInput = z.infer<typeof SearchVideoTaggingEventSearchInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for searchVideoTaggingEventSearch
 * OK
 */
const SearchVideoTaggingEventSearchOutputSchema = z.object({
  /** A list of events. */
  events: z.array(z.object({ attributes: z.object({}).optional(), camera_id: z.string(), event_type_uid: z.string(), flagged: z.boolean().optional(), org_id: z.string(), time_ms: z.number().int() })),
  /** Next token for pagination. */
  next_token: z.number().int(),
});

type SearchVideoTaggingEventSearchOutput = z.infer<typeof SearchVideoTaggingEventSearchOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Search for video tagging event search matching the provided criteria.
 *
 * @param input.body.attribute_filters - List of search filters.
 * @param input.body.camera_ids - List of unique identifiers of cameras
 * @param input.body.end_time_ms - Query end epoch time in milliseconds.
 * @param input.body.event_type_uid - The unique identifier of the event type.
 * @param input.body.flagged - Whether or not an event is flagged.
 * @param input.body.keywords - List of search keywords.
 * @param input.body.start_time_ms - Query start epoch time in milliseconds.
 * @returns OK
 */
export async function searchVideoTaggingEventSearch(
  input: SearchVideoTaggingEventSearchInput
): Promise<APIResponse<SearchVideoTaggingEventSearchOutput>> {
  // Validate input
  const validated = SearchVideoTaggingEventSearchInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/video_tagging/event/search';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<SearchVideoTaggingEventSearchOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      attribute_filters: validated.body.attribute_filters,
      camera_ids: validated.body.camera_ids,
      end_time_ms: validated.body.end_time_ms,
      event_type_uid: validated.body.event_type_uid,
      flagged: validated.body.flagged,
      keywords: validated.body.keywords,
      start_time_ms: validated.body.start_time_ms,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = SearchVideoTaggingEventSearchOutputSchema.parse(response.data);
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
export const searchVideoTaggingEventSearchMetadata = {
  name: 'search_video_tagging_event_search',
  description: `Search for video tagging event search matching the provided criteria.`,
  inputSchema: SearchVideoTaggingEventSearchInputSchema,
  outputSchema: SearchVideoTaggingEventSearchOutputSchema,
  category: 'command/alert',
  operationId: 'postVideoTaggingEventSearchViewV1',
  method: 'POST' as const,
  path: '/cameras/v1/video_tagging/event/search',
  requiresAuth: true,
  tags: ['Methods'],
};
