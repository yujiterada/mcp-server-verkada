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
  events: z.array(z.object({ device_id: z.string().nullable().optional(), device_type: z.string().nullable().optional(), end_timestamp: z.string().nullable().optional(), event_id: z.string().nullable().optional(), event_info: z.object({ accepted: z.boolean().nullable().optional(), auxInputId: z.string().nullable().optional(), auxInputName: z.string().nullable().optional(), buildingId: z.string().nullable().optional(), buildingName: z.string().nullable().optional(), direction: z.string().nullable().optional(), doorId: z.string().nullable().optional(), doorInfo: z.object({ accessControllerId: z.string().nullable().optional(), accessControllerName: z.string().nullable().optional(), name: z.string().nullable().optional() }).nullable().optional(), entityId: z.string().nullable().optional(), entityName: z.string().nullable().optional(), entityType: z.string().nullable().optional(), eventType: z.string().nullable().optional(), floorId: z.string().nullable().optional(), floorName: z.string().nullable().optional(), floors: z.array(z.object({ door_id: z.string().nullable().optional(), floor_id: z.string().nullable().optional(), uuid: z.string().nullable().optional() })).nullable().optional(), inputValue: z.string().nullable().optional(), lockdownInfo: z.object({ action: z.string().nullable().optional(), lockdown: z.unknown().nullable().optional() }).nullable().optional(), message: z.string().nullable().optional(), organizationId: z.string().nullable().optional(), rawCard: z.string().nullable().optional(), siteId: z.string().nullable().optional(), siteName: z.string().nullable().optional(), type: z.string().nullable().optional(), userId: z.string().nullable().optional(), userInfo: z.object({ email: z.string().nullable().optional(), first_name: z.string().nullable().optional(), last_name: z.string().nullable().optional(), name: z.string().nullable().optional(), phone: z.string().nullable().optional(), user_id: z.string().nullable().optional() }).nullable().optional(), userName: z.string().nullable().optional(), uuid: z.string().nullable().optional() }).nullable().optional(), event_type: z.string().nullable().optional(), organization_id: z.string().nullable().optional(), site_id: z.string().nullable().optional(), timestamp: z.string().nullable().optional() })).nullable(),
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
