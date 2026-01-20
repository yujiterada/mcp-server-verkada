/**
 * GetHostedEvent Tool
 *
 * Get a specific hosted event by ID. Returns detailed information about the hosted event.
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
 * Input parameters for getHostedEvent
 */
const GetHostedEventInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The guest_event_id parameter (required) */
    guest_event_id: z.string(),
  }),
});

type GetHostedEventInput = z.infer<typeof GetHostedEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getHostedEvent
 * OK
 */
const GetHostedEventOutputSchema = z.object({
  /** The ending time of the event. This will be for the last event part of multi-part events in RFC 3339 format (e.g., &#x27;2025-01-17T21:06:20+00:00&#x27;). */
  end_time: z.string().nullable(),
  /** The location of the event taking place. */
  event_address: z.string().nullable(),
  /** A description of the Guest event. */
  event_description: z.string().nullable(),
  /** The name of the Guest event. If not specified, defaults to &#x27;New Event&#x27;. */
  event_name: z.string().nullable(),
  /** List of event parts for multi-part events. */
  event_parts: z.array(z.object({ end_time: z.string().nullable(), event_part_id: z.string().uuid().nullable().optional(), start_time: z.string().nullable() })).nullable(),
  /** The source at which the event was created from. */
  event_source: z.string().nullable(),
  /** The unique identifier of the Guest event. */
  guest_event_id: z.string().uuid().nullable(),
  /** The unique identifier of the Guest type for this event. Guest types can be retrieved with the Guest Type API. */
  guest_type_id: z.string().uuid().nullable(),
  /** The unique identifier of the host. Hosts can be retrieved with the Guest Host API. */
  host_id: z.string().uuid().nullable(),
  /** List of invitees for the event. */
  invitees: z.array(z.object({ guest_email: z.string().nullable().optional(), guest_full_name: z.string().nullable(), guest_phone_number: z.string().nullable().optional(), invited_guest_id: z.string().uuid().nullable(), notes: z.string().nullable().optional(), registered_time: z.string().nullable().optional(), visit_id: z.string().uuid().nullable().optional() })).nullable(),
  /** The RSVP link of the event if generated. */
  rsvp_link: z.string().nullable(),
  /** The unique identifier of the Guest site. Valid sites can be retrieved with the Guest Site API. */
  site_id: z.string().uuid().nullable(),
  /** The starting time of the event. This will be for the first event part of multi-part events in RFC 3339 format (e.g., &#x27;2025-01-17T21:06:20+00:00&#x27;). */
  start_time: z.string().nullable(),
  /** The status of the event (active, canceled or rescheduled). */
  status: z.string().nullable(),
  /** Whether walk-ins are allowed to the event. */
  walk_in_enabled: z.boolean().nullable(),
});

type GetHostedEventOutput = z.infer<typeof GetHostedEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific hosted event by ID. Returns detailed information about the hosted event.
 *
 * @param input.path.guest_event_id - The guest_event_id parameter
 * @returns OK
 */
export async function getHostedEvent(
  input: GetHostedEventInput
): Promise<APIResponse<GetHostedEventOutput>> {
  // Validate input
  const validated = GetHostedEventInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/guest/guest_events/{guest_event_id}';
  path = path.replace('{guest_event_id}', encodeURIComponent(String(validated.path.guest_event_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<GetHostedEventOutput>({
    method: 'GET',
    path: fullPath,
  });

  return response;
}

// ============================================================================
// TOOL METADATA
// ============================================================================

/**
 * Metadata for MCP tool registration
 */
export const getHostedEventMetadata = {
  name: 'get_hosted_event',
  description: `Get a specific hosted event by ID. Returns detailed information about the hosted event.`,
  inputSchema: GetHostedEventInputSchema,
  outputSchema: GetHostedEventOutputSchema,
  category: 'product/guest',
  operationId: 'getGuestSingleEventViewV2',
  method: 'GET' as const,
  path: '/v2/guest/guest_events/{guest_event_id}',
  requiresAuth: true,
  tags: ['Events'],
};
