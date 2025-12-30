/**
 * GetGuestEvent Tool
 *
 * Get a specific guest event by ID. Returns detailed information about the guest event. Supports pagination.
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
 * Input parameters for getGuestEvent
 */
const GetGuestEventInputSchema = z.object({
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

type GetGuestEventInput = z.infer<typeof GetGuestEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getGuestEvent
 * OK
 */
const GetGuestEventOutputSchema = z.object({
  /** Pagination cursor for retrieving the next page of results. */
  cursor: z.string(),
  /** List of events, their event parts and invitees. */
  items: z.array(z.object({ end_time: z.string(), event_name: z.string(), event_part_id: z.string().uuid().optional(), guest_event_id: z.string().uuid(), is_multipart: z.boolean(), start_time: z.string() })),
});

type GetGuestEventOutput = z.infer<typeof GetGuestEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific guest event by ID. Returns detailed information about the guest event. Supports pagination.
 *
 * @param input.query.site_id - The site_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.limit - The limit parameter
 * @param input.query.cursor - The cursor parameter
 * @returns OK
 */
export async function getGuestEvent(
  input: GetGuestEventInput
): Promise<APIResponse<GetGuestEventOutput>> {
  // Validate input
  const validated = GetGuestEventInputSchema.parse(input);

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
  const response = await callVerkadaAPI<GetGuestEventOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetGuestEventOutputSchema.parse(response.data);
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
export const getGuestEventMetadata = {
  name: 'get_guest_event',
  description: `Get a specific guest event by ID. Returns detailed information about the guest event. Supports pagination.`,
  inputSchema: GetGuestEventInputSchema,
  outputSchema: GetGuestEventOutputSchema,
  category: 'product/guest',
  operationId: 'getGuestEventViewV2',
  method: 'GET' as const,
  path: '/v2/guest/guest_events',
  requiresAuth: true,
  tags: ['Events'],
};
