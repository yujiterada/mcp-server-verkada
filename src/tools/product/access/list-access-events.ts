/**
 * ListAccessEvents Tool
 *
 * List all access events. Use this to enumerate or search through access events.
 *
 * @category product/access
 * @operationId getEventsViewV1
 * @method GET
 * @path /events/v1/access
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
 * Input parameters for listAccessEvents
 */
const ListAccessEventsInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The start_time parameter */
    start_time: z.number().int().optional(),
    /** The end_time parameter */
    end_time: z.number().int().optional(),
    /** The page_token parameter */
    page_token: z.string().optional(),
    /** The page_size parameter */
    page_size: z.number().int().min(0).max(200).optional(),
    /** The event_type parameter */
    event_type: z.string().optional(),
    /** The site_id parameter */
    site_id: z.string().optional(),
    /** The device_id parameter */
    device_id: z.string().optional(),
    /** The user_id parameter */
    user_id: z.string().optional(),
  }),
});

type ListAccessEventsInput = z.infer<typeof ListAccessEventsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listAccessEvents
 * OK
 */
const ListAccessEventsOutputSchema = z.object({
  /** Events */
  events: z.array(z.object({ device_id: z.string().optional(), device_type: z.string().optional(), end_timestamp: z.string().optional(), event_id: z.string().optional(), event_info: z.object({ accepted: z.boolean().optional(), auxInputId: z.string().optional(), auxInputName: z.string().optional(), buildingId: z.string().optional(), buildingName: z.string().optional(), direction: z.string().optional(), doorId: z.string().optional(), doorInfo: z.object({ accessControllerId: z.string().optional(), accessControllerName: z.string().optional(), name: z.string().optional() }).optional(), entityId: z.string().optional(), entityName: z.string().optional(), entityType: z.string().optional(), eventType: z.string().optional(), floorId: z.string().optional(), floorName: z.string().optional(), floors: z.array(z.object({ door_id: z.string().optional(), floor_id: z.string().optional(), uuid: z.string().optional() })).optional(), inputValue: z.string().optional(), lockdownInfo: z.object({ action: z.string().optional(), lockdown: z.unknown().optional() }).optional(), message: z.string().optional(), organizationId: z.string().optional(), rawCard: z.string().optional(), siteId: z.string().optional(), siteName: z.string().optional(), type: z.string().optional(), userId: z.string().optional(), userInfo: z.object({ email: z.string().optional(), first_name: z.string().optional(), last_name: z.string().optional(), name: z.string().optional(), phone: z.string().optional(), user_id: z.string().optional() }).optional(), userName: z.string().optional(), uuid: z.string().optional() }).optional(), event_type: z.string().optional(), organization_id: z.string().optional(), site_id: z.string().optional(), timestamp: z.string().optional() })).nullable(),
  /** The pagination token used to fetch the next page of results. */
  next_page_token: z.string().nullable(),
});

type ListAccessEventsOutput = z.infer<typeof ListAccessEventsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all access events. Use this to enumerate or search through access events.
 *
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.page_token - The page_token parameter
 * @param input.query.page_size - The page_size parameter
 * @param input.query.event_type - The event_type parameter
 * @param input.query.site_id - The site_id parameter
 * @param input.query.device_id - The device_id parameter
 * @param input.query.user_id - The user_id parameter
 * @returns OK
 */
export async function listAccessEvents(
  input: ListAccessEventsInput
): Promise<APIResponse<ListAccessEventsOutput>> {
  // Validate input
  const validated = ListAccessEventsInputSchema.parse(input);

  // Build path with parameters
  const path = '/events/v1/access';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
  }
  if (validated.query.page_token !== undefined) {
    queryParams.set('page_token', String(validated.query.page_token));
  }
  if (validated.query.page_size !== undefined) {
    queryParams.set('page_size', String(validated.query.page_size));
  }
  if (validated.query.event_type !== undefined) {
    queryParams.set('event_type', String(validated.query.event_type));
  }
  if (validated.query.site_id !== undefined) {
    queryParams.set('site_id', String(validated.query.site_id));
  }
  if (validated.query.device_id !== undefined) {
    queryParams.set('device_id', String(validated.query.device_id));
  }
  if (validated.query.user_id !== undefined) {
    queryParams.set('user_id', String(validated.query.user_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<ListAccessEventsOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ListAccessEventsOutputSchema.parse(response.data);
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
export const listAccessEventsMetadata = {
  name: 'list_access_events',
  description: `List all access events. Use this to enumerate or search through access events.`,
  inputSchema: ListAccessEventsInputSchema,
  outputSchema: ListAccessEventsOutputSchema,
  category: 'product/access',
  operationId: 'getEventsViewV1',
  method: 'GET' as const,
  path: '/events/v1/access',
  requiresAuth: true,
  tags: ['Events'],
};
