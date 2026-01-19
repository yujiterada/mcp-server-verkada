/**
 * ListHostedEvents Tool
 *
 * List all hosted events. Use this to enumerate or search through hosted events. Supports pagination.
 *
 * @category product/guest
 * @operationId getGuestEventViewV2
 * @method GET
 * @path /v2/guest/guest_events
 * @tags Events
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
 * Input parameters for listHostedEvents
 */
const ListHostedEventsInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The site_id parameter (required) */
    site_id: z.string().uuid(),
    /** The start_time parameter (required) */
    start_time: z.string(),
    /** The end_time parameter (required) */
    end_time: z.string(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(200).optional(),
    /** The cursor parameter */
    cursor: z.string().optional(),
  }),
});

type ListHostedEventsInput = z.infer<typeof ListHostedEventsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listHostedEvents
 * OK
 */
const ListHostedEventsOutputSchema = z.object({
  /** Pagination cursor for retrieving the next page of results. */
  cursor: z.string().nullable(),
  /** List of events, their event parts and invitees. */
  items: z.array(z.object({ end_time: z.string().nullable(), event_name: z.string().nullable(), event_part_id: z.string().uuid().nullable().optional(), guest_event_id: z.string().uuid().nullable(), is_multipart: z.boolean().nullable(), start_time: z.string().nullable() })).nullable(),
});

type ListHostedEventsOutput = z.infer<typeof ListHostedEventsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all hosted events. Use this to enumerate or search through hosted events. Supports pagination.
 *
 * @param input.query.site_id - The site_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.limit - The limit parameter
 * @param input.query.cursor - The cursor parameter
 * @returns OK
 */
export async function listHostedEvents(
  input: ListHostedEventsInput
): Promise<APIResponse<ListHostedEventsOutput>> {
  // Validate input
  const validated = ListHostedEventsInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/guest/guest_events';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.site_id !== undefined) {
    queryParams.set('site_id', String(validated.query.site_id));
  }
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
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
  const response = await callVerkadaAPI<ListHostedEventsOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ListHostedEventsOutputSchema.parse(response.data);
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
export const listHostedEventsMetadata = {
  name: 'list_hosted_events',
  description: `List all hosted events. Use this to enumerate or search through hosted events. Supports pagination.`,
  inputSchema: ListHostedEventsInputSchema,
  outputSchema: ListHostedEventsOutputSchema,
  category: 'product/guest',
  operationId: 'getGuestEventViewV2',
  method: 'GET' as const,
  path: '/v2/guest/guest_events',
  requiresAuth: true,
  tags: ['Events'],
};
