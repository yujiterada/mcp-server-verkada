/**
 * CreateHostedEvent Tool
 *
 * Create a new hosted event. Provide the required fields in the request body. Supports bulk operations.
 *
 * @category product/guest
 * @operationId postGuestEventViewV2
 * @method POST
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
 * Input parameters for createHostedEvent
 * 
 */
const CreateHostedEventInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** The location of the event. */
    event_address: z.string().optional(),
    /** A description of the event. */
    event_description: z.string().optional(),
    /** The name of the Guest event. If not specified, defaults to &#x27;New Event&#x27;. */
    event_name: z.string().optional(),
    /** A list of start and end times for each event part. If only one time span specified, will be treated as a single day event. A maximum of 30 time spans may be specified and must occur in the future within 1 year. (required) */
    event_times: z.array(z.object({ end_time: z.string(), start_time: z.string() })),
    /** The unique identifier of the Guest type for this event. Guest types must be eligible and allowed for invites in visibility controls. Guest types can be retrieved with the Guest Type API. (required) */
    guest_type_id: z.string().uuid(),
    /** The unique identifier of the host. Valid hosts can be retrieved with the Guest Host API. (required) */
    host_id: z.string().uuid(),
    /** List of invitees for the event. */
    invitees: z.array(z.object({ email: z.string().optional(), full_name: z.string(), notes: z.string().max(100).optional(), phone_number: z.string().optional() })).min(0),
    /** Whether a RSVP link should be generated. */
    rsvp_enabled: z.boolean().optional(),
    /** The unique identifier of the Guest site. Valid sites can be retrieved with the Guest Site API. (required) */
    site_id: z.string().uuid(),
    /** Whether walk-ins are allowed to the event. */
    walk_in_enabled: z.boolean().optional(),
  }),
});

type CreateHostedEventInput = z.infer<typeof CreateHostedEventInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createHostedEvent
 * OK
 */
const CreateHostedEventOutputSchema = z.object({
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

type CreateHostedEventOutput = z.infer<typeof CreateHostedEventOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new hosted event. Provide the required fields in the request body. Supports bulk operations.
 *
 * @param input.body.event_address - The location of the event.
 * @param input.body.event_description - A description of the event.
 * @param input.body.event_name - The name of the Guest event. If not specified, defaults to &#x27;New Event&#x27;.
 * @param input.body.event_times - A list of start and end times for each event part. If only one time span specified, will be treated as a single day event. A maximum of 30 time spans may be specified and must occur in the future within 1 year.
 * @param input.body.guest_type_id - The unique identifier of the Guest type for this event. Guest types must be eligible and allowed for invites in visibility controls. Guest types can be retrieved with the Guest Type API.
 * @param input.body.host_id - The unique identifier of the host. Valid hosts can be retrieved with the Guest Host API.
 * @param input.body.invitees - List of invitees for the event.
 * @param input.body.rsvp_enabled - Whether a RSVP link should be generated.
 * @param input.body.site_id - The unique identifier of the Guest site. Valid sites can be retrieved with the Guest Site API.
 * @param input.body.walk_in_enabled - Whether walk-ins are allowed to the event.
 * @returns OK
 */
export async function createHostedEvent(
  input: CreateHostedEventInput
): Promise<APIResponse<CreateHostedEventOutput>> {
  // Validate input
  const validated = CreateHostedEventInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/guest/guest_events';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateHostedEventOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      event_address: validated.body.event_address,
      event_description: validated.body.event_description,
      event_name: validated.body.event_name,
      event_times: validated.body.event_times,
      guest_type_id: validated.body.guest_type_id,
      host_id: validated.body.host_id,
      invitees: validated.body.invitees,
      rsvp_enabled: validated.body.rsvp_enabled,
      site_id: validated.body.site_id,
      walk_in_enabled: validated.body.walk_in_enabled,
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
export const createHostedEventMetadata = {
  name: 'create_hosted_event',
  description: `Create a new hosted event. Provide the required fields in the request body. Supports bulk operations.`,
  inputSchema: CreateHostedEventInputSchema,
  outputSchema: CreateHostedEventOutputSchema,
  category: 'product/guest',
  operationId: 'postGuestEventViewV2',
  method: 'POST' as const,
  path: '/v2/guest/guest_events',
  requiresAuth: true,
  tags: ['Events'],
};
