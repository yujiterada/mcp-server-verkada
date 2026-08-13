/**
 * SearchVideoTaggingEventSearch Tool
 *
 * Search for video tagging event search matching the provided criteria. Supports pagination.
 *
 * @category product/camera
 * @operationId postVideoTaggingEventSearchViewV2
 * @method POST
 * @path /v2/cameras/video_tagging/events/query
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
    /** List of unique identifiers of cameras to filter by. */
    camera_ids: z.array(z.string()).optional(),
    /** Pagination cursor from a previous response. Use to fetch the next page of results. Replaces the v1 &#x60;next_token&#x60; field. */
    cursor: z.string().optional(),
    /** Query end time in ISO 8601 format (e.g. 2025-07-17T21:06:20Z). Replaces the v1 &#x60;end_time_ms&#x60; field. */
    end_time: z.string().optional(),
    /** The unique identifier of the event type. */
    event_type_uid: z.string().optional(),
    /** Whether or not an event is flagged. */
    flagged: z.boolean().optional(),
    /** List of search keywords. */
    keywords: z.array(z.string()).optional(),
    /** Maximum number of results to return. Default is 100, maximum is 1000. */
    limit: z.number().int().min(0).max(1000).optional(),
    /** Query start time in ISO 8601 format (e.g. 2025-07-17T21:06:20Z). Replaces the v1 &#x60;start_time_ms&#x60; field. */
    start_time: z.string().optional(),
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
  /** Pagination cursor for retrieving the next page of results. Null if there are no more results. */
  cursor: z.string().nullable(),
  /** The current page of video tagging events matching the search. */
  items: z.array(z.object({ attributes: z.object({}).nullable().optional(), camera_id: z.string().nullable(), event_type_uid: z.string().nullable(), flagged: z.boolean().nullable().optional(), occurred_at: z.string().nullable(), org_id: z.string().nullable() })).nullable(),
});

type SearchVideoTaggingEventSearchOutput = z.infer<typeof SearchVideoTaggingEventSearchOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Search for video tagging event search matching the provided criteria. Supports pagination.
 *
 * @param input.body.attribute_filters - List of search filters.
 * @param input.body.camera_ids - List of unique identifiers of cameras to filter by.
 * @param input.body.cursor - Pagination cursor from a previous response. Use to fetch the next page of results. Replaces the v1 &#x60;next_token&#x60; field.
 * @param input.body.end_time - Query end time in ISO 8601 format (e.g. 2025-07-17T21:06:20Z). Replaces the v1 &#x60;end_time_ms&#x60; field.
 * @param input.body.event_type_uid - The unique identifier of the event type.
 * @param input.body.flagged - Whether or not an event is flagged.
 * @param input.body.keywords - List of search keywords.
 * @param input.body.limit - Maximum number of results to return. Default is 100, maximum is 1000.
 * @param input.body.start_time - Query start time in ISO 8601 format (e.g. 2025-07-17T21:06:20Z). Replaces the v1 &#x60;start_time_ms&#x60; field.
 * @returns OK
 */
export async function searchVideoTaggingEventSearch(
  input: SearchVideoTaggingEventSearchInput
): Promise<APIResponse<SearchVideoTaggingEventSearchOutput>> {
  // Validate input
  const validated = SearchVideoTaggingEventSearchInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/video_tagging/events/query';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<SearchVideoTaggingEventSearchOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      attribute_filters: validated.body.attribute_filters,
      camera_ids: validated.body.camera_ids,
      cursor: validated.body.cursor,
      end_time: validated.body.end_time,
      event_type_uid: validated.body.event_type_uid,
      flagged: validated.body.flagged,
      keywords: validated.body.keywords,
      limit: validated.body.limit,
      start_time: validated.body.start_time,
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
export const searchVideoTaggingEventSearchMetadata = {
  name: 'search_video_tagging_event_search',
  description: `Search for video tagging event search matching the provided criteria. Supports pagination.`,
  inputSchema: SearchVideoTaggingEventSearchInputSchema,
  outputSchema: SearchVideoTaggingEventSearchOutputSchema,
  category: 'product/camera',
  operationId: 'postVideoTaggingEventSearchViewV2',
  method: 'POST' as const,
  path: '/v2/cameras/video_tagging/events/query',
  requiresAuth: true,
  tags: ['Methods'],
};
