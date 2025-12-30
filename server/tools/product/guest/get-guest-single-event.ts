/**
 * GetGuestSingleEvent Tool
 *
 * Get a specific guest single event by ID. Returns detailed information about the guest single event.
 *
 * @category product/guest
 * @operationId getGuestSingleEventViewV2
 * @method GET
 * @path /v2/guest/guest_events/{guest_event_id}
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
 * Input parameters for getGuestSingleEvent
 */
const GetGuestSingleEventInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The guest_event_id parameter (required) */
    guest_event_id: z.string(),
  }),
});

type GetGuestSingleEventInput = z.infer<typeof GetGuestSingleEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getGuestSingleEvent
 * OK
 */
const GetGuestSingleEventOutputSchema = z.object({
  /** The ending time of the event. This will be for the last event part of multi-part events in RFC 3339 format (e.g., &#x27;2025-01-17T21:06:20+00:00&#x27;). */
  end_time: z.string(),
  /** The location of the event taking place. */
  event_address: z.string(),
  /** A description of the Guest event. */
  event_description: z.string(),
  /** The name of the Guest event. If not specified, defaults to &#x27;New Event&#x27;. */
  event_name: z.string(),
  /** List of event parts for multi-part events. */
  event_parts: z.array(z.object({ end_time: z.string(), event_part_id: z.string().uuid().optional(), start_time: z.string() })),
  /** The source at which the event was created from. */
  event_source: z.string(),
  /** The unique identifier of the Guest event. */
  guest_event_id: z.string().uuid(),
  /** The unique identifier of the Guest type for this event. Guest types can be retrieved with the Guest Type API. */
  guest_type_id: z.string().uuid(),
  /** The unique identifier of the host. Hosts can be retrieved with the Guest Host API. */
  host_id: z.string().uuid(),
  /** List of invitees for the event. */
  invitees: z.array(z.object({ guest_email: z.string().optional(), guest_full_name: z.string(), guest_phone_number: z.string().optional(), invited_guest_id: z.string().uuid(), notes: z.string().optional(), registered_time: z.string().optional(), visit_id: z.string().uuid().optional() })),
  /** The RSVP link of the event if generated. */
  rsvp_link: z.string(),
  /** The unique identifier of the Guest site. Valid sites can be retrieved with the Guest Site API. */
  site_id: z.string().uuid(),
  /** The starting time of the event. This will be for the first event part of multi-part events in RFC 3339 format (e.g., &#x27;2025-01-17T21:06:20+00:00&#x27;). */
  start_time: z.string(),
  /** The status of the event (active, canceled or rescheduled). */
  status: z.string(),
  /** Whether walk-ins are allowed to the event. */
  walk_in_enabled: z.boolean(),
});

type GetGuestSingleEventOutput = z.infer<typeof GetGuestSingleEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific guest single event by ID. Returns detailed information about the guest single event.
 *
 * @param input.path.guest_event_id - The guest_event_id parameter
 * @returns OK
 */
export async function getGuestSingleEvent(
  input: GetGuestSingleEventInput
): Promise<APIResponse<GetGuestSingleEventOutput>> {
  // Validate input
  const validated = GetGuestSingleEventInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/guest/guest_events/{guest_event_id}';
  path = path.replace('{guest_event_id}', encodeURIComponent(String(validated.path.guest_event_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<GetGuestSingleEventOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetGuestSingleEventOutputSchema.parse(response.data);
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
export const getGuestSingleEventMetadata = {
  name: 'get_guest_single_event',
  description: `Get a specific guest single event by ID. Returns detailed information about the guest single event.`,
  inputSchema: GetGuestSingleEventInputSchema,
  outputSchema: GetGuestSingleEventOutputSchema,
  category: 'product/guest',
  operationId: 'getGuestSingleEventViewV2',
  method: 'GET' as const,
  path: '/v2/guest/guest_events/{guest_event_id}',
  requiresAuth: true,
  tags: ['Events'],
};
