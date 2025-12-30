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
  cursor: z.string(),
  /** List of events */
  items: z.array(z.union([z.object({ device_id: z.string(), device_type: z.enum(['camera']).optional(), event_id: z.string(), event_info: z.object({ crowd_threshold: z.number().int().optional(), detected_objects: z.array(z.string()).optional(), event_description: z.string().optional(), license_plate_number: z.string().optional(), license_plate_state: z.string().optional(), location: z.string().optional(), location_lat: z.string().optional(), location_lon: z.string().optional(), person_label: z.string().optional() }).optional(), event_type: z.string(), timestamp: z.string() }), z.object({ device_id: z.string(), device_type: z.enum(['sensor']).optional(), event_id: z.string(), event_info: z.object({ end_time: z.string().optional(), most_extreme_value: z.number().optional(), reading: z.string().optional(), threshold: z.number().optional() }).optional(), event_type: z.string(), timestamp: z.string() }), z.object({ device_id: z.string(), device_type: z.enum(['access_control']).optional(), event_id: z.string(), event_info: z.object({ accepted: z.boolean().optional(), access_controller_id: z.string().optional(), access_controller_name: z.string().optional(), aux_input_id: z.string().optional(), aux_input_name: z.string().optional(), building_id: z.string().optional(), building_name: z.string().optional(), direction: z.string().optional(), door_id: z.string().optional(), door_name: z.string().optional(), entity_id: z.string().optional(), entity_name: z.string().optional(), entity_type: z.string().optional(), floor_id: z.string().optional(), floor_name: z.string().optional(), floors: z.array(z.object({ door_id: z.string().optional(), floor_id: z.string().optional(), uuid: z.string().optional() })).optional(), granted: z.boolean().optional(), input_value: z.string().optional(), message: z.string().optional(), raw_card: z.string().optional(), scenario_info: z.object({ action: z.string().optional(), scenario: z.unknown().optional() }).optional(), user_info: z.object({ email: z.string().optional(), first_name: z.string().optional(), last_name: z.string().optional(), name: z.string().optional(), phone: z.string().optional(), user_id: z.string().optional() }).optional() }).optional(), event_type: z.string(), timestamp: z.string() }), z.object({ device_id: z.string(), device_type: z.enum(['intercom']).optional(), event_id: z.string(), event_info: z.object({ answered_by_name: z.string().optional(), answered_timestamp: z.string().optional(), device_name: z.string().optional(), end_timestamp: z.string().optional(), start_timestamp: z.string().optional() }).optional(), event_type: z.string(), timestamp: z.string() })])),
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
