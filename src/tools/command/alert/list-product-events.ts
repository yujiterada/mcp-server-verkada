/**
 * ListProductEvents Tool
 *
 * List all product events. Use this to enumerate or search through product events. Supports filtering.
 *
 * @category command/alert
 * @operationId getEventsViewV2
 * @method GET
 * @path /v2/events
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
 * Input parameters for listProductEvents
 */
const ListProductEventsInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The start_time parameter */
    start_time: z.string().optional(),
    /** The end_time parameter */
    end_time: z.string().optional(),
    /** The product_types parameter */
    product_types: z.string().optional(),
    /** The device_ids parameter */
    device_ids: z.string().optional(),
    /** The event_types parameter */
    event_types: z.string().optional(),
    /** The site_ids parameter */
    site_ids: z.string().optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(200).optional(),
    /** The cursor parameter */
    cursor: z.string().optional(),
  }),
});

type ListProductEventsInput = z.infer<typeof ListProductEventsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listProductEvents
 * OK
 */
const ListProductEventsOutputSchema = z.object({
  /** Pagination cursor for retrieving the next page of results */
  cursor: z.string().nullable(),
  /** List of events */
  items: z.array(z.union([z.object({ device_id: z.string().nullable(), device_type: z.enum(['camera']).nullable().optional(), event_id: z.string().nullable(), event_info: z.object({ crowd_threshold: z.number().int().nullable().optional(), detected_objects: z.array(z.string()).nullable().optional(), event_description: z.string().nullable().optional(), license_plate_number: z.string().nullable().optional(), license_plate_state: z.string().nullable().optional(), location: z.string().nullable().optional(), location_lat: z.string().nullable().optional(), location_lon: z.string().nullable().optional(), person_label: z.string().nullable().optional() }).nullable().optional(), event_type: z.string().nullable(), timestamp: z.string().nullable() }), z.object({ device_id: z.string().nullable(), device_type: z.enum(['sensor']).nullable().optional(), event_id: z.string().nullable(), event_info: z.object({ end_time: z.string().nullable().optional(), most_extreme_value: z.number().nullable().optional(), reading: z.string().nullable().optional(), threshold: z.number().nullable().optional() }).nullable().optional(), event_type: z.string().nullable(), timestamp: z.string().nullable() }), z.object({ device_id: z.string().nullable(), device_type: z.enum(['access_control']).nullable().optional(), event_id: z.string().nullable(), event_info: z.object({ accepted: z.boolean().nullable().optional(), access_controller_id: z.string().nullable().optional(), access_controller_name: z.string().nullable().optional(), aux_input_id: z.string().nullable().optional(), aux_input_name: z.string().nullable().optional(), building_id: z.string().nullable().optional(), building_name: z.string().nullable().optional(), direction: z.string().nullable().optional(), door_id: z.string().nullable().optional(), door_name: z.string().nullable().optional(), entity_id: z.string().nullable().optional(), entity_name: z.string().nullable().optional(), entity_type: z.string().nullable().optional(), floor_id: z.string().nullable().optional(), floor_name: z.string().nullable().optional(), floors: z.array(z.object({ door_id: z.string().nullable().optional(), floor_id: z.string().nullable().optional(), uuid: z.string().nullable().optional() })).nullable().optional(), granted: z.boolean().nullable().optional(), input_value: z.string().nullable().optional(), message: z.string().nullable().optional(), raw_card: z.string().nullable().optional(), scenario_info: z.object({ action: z.string().nullable().optional(), scenario: z.unknown().nullable().optional() }).nullable().optional(), user_info: z.object({ email: z.string().nullable().optional(), first_name: z.string().nullable().optional(), last_name: z.string().nullable().optional(), name: z.string().nullable().optional(), phone: z.string().nullable().optional(), user_id: z.string().nullable().optional() }).nullable().optional() }).nullable().optional(), event_type: z.string().nullable(), timestamp: z.string().nullable() }), z.object({ device_id: z.string().nullable(), device_type: z.enum(['intercom']).nullable().optional(), event_id: z.string().nullable(), event_info: z.object({ answered_by_name: z.string().nullable().optional(), answered_timestamp: z.string().nullable().optional(), device_name: z.string().nullable().optional(), end_timestamp: z.string().nullable().optional(), start_timestamp: z.string().nullable().optional() }).nullable().optional(), event_type: z.string().nullable(), timestamp: z.string().nullable() })])).nullable(),
});

type ListProductEventsOutput = z.infer<typeof ListProductEventsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all product events. Use this to enumerate or search through product events. Supports filtering.
 *
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.product_types - The product_types parameter
 * @param input.query.device_ids - The device_ids parameter
 * @param input.query.event_types - The event_types parameter
 * @param input.query.site_ids - The site_ids parameter
 * @param input.query.limit - The limit parameter
 * @param input.query.cursor - The cursor parameter
 * @returns OK
 */
export async function listProductEvents(
  input: ListProductEventsInput
): Promise<APIResponse<ListProductEventsOutput>> {
  // Validate input
  const validated = ListProductEventsInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/events';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
  }
  if (validated.query.product_types !== undefined) {
    queryParams.set('product_types', String(validated.query.product_types));
  }
  if (validated.query.device_ids !== undefined) {
    queryParams.set('device_ids', String(validated.query.device_ids));
  }
  if (validated.query.event_types !== undefined) {
    queryParams.set('event_types', String(validated.query.event_types));
  }
  if (validated.query.site_ids !== undefined) {
    queryParams.set('site_ids', String(validated.query.site_ids));
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
  const response = await callVerkadaAPI<ListProductEventsOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ListProductEventsOutputSchema.parse(response.data);
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
export const listProductEventsMetadata = {
  name: 'list_product_events',
  description: `List all product events. Use this to enumerate or search through product events. Supports filtering.`,
  inputSchema: ListProductEventsInputSchema,
  outputSchema: ListProductEventsOutputSchema,
  category: 'command/alert',
  operationId: 'getEventsViewV2',
  method: 'GET' as const,
  path: '/v2/events',
  requiresAuth: true,
  tags: ['Events'],
};
