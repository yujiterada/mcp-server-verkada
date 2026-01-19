/**
 * GetNotifications Tool
 *
 * Get a specific notifications by ID. Returns detailed information about the notifications.
 *
 * @category command/alert
 * @operationId getNotificationsViewV1
 * @method GET
 * @path /cameras/v1/alerts
 * @tags Alerts
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
 * Input parameters for getNotifications
 */
const GetNotificationsInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The start_time parameter */
    start_time: z.number().int().optional(),
    /** The end_time parameter */
    end_time: z.number().int().optional(),
    /** The include_image_url parameter */
    include_image_url: z.boolean().optional(),
    /** The page_token parameter */
    page_token: z.string().optional(),
    /** The page_size parameter */
    page_size: z.number().int().min(0).max(200).optional(),
    /** The notification_type parameter */
    notification_type: z.string().optional(),
  }),
});

type GetNotificationsInput = z.infer<typeof GetNotificationsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getNotifications
 * OK
 */
const GetNotificationsOutputSchema = z.object({
  /** The pagination token used to fetch the next page of results. */
  next_page_token: z.string().nullable(),
  /** Notifications */
  notifications: z.array(z.object({ camera_id: z.string().nullable().optional(), created: z.number().int().nullable().optional(), crowd_threshold: z.number().int().nullable().optional(), image_url: z.string().nullable().optional(), notification_type: z.string().nullable().optional(), objects: z.array(z.string()).nullable().optional(), person_label: z.string().nullable().optional(), video_url: z.string().nullable().optional() })).nullable(),
});

type GetNotificationsOutput = z.infer<typeof GetNotificationsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific notifications by ID. Returns detailed information about the notifications.
 *
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.include_image_url - The include_image_url parameter
 * @param input.query.page_token - The page_token parameter
 * @param input.query.page_size - The page_size parameter
 * @param input.query.notification_type - The notification_type parameter
 * @returns OK
 */
export async function getNotifications(
  input: GetNotificationsInput
): Promise<APIResponse<GetNotificationsOutput>> {
  // Validate input
  const validated = GetNotificationsInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/alerts';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
  }
  if (validated.query.include_image_url !== undefined) {
    queryParams.set('include_image_url', String(validated.query.include_image_url));
  }
  if (validated.query.page_token !== undefined) {
    queryParams.set('page_token', String(validated.query.page_token));
  }
  if (validated.query.page_size !== undefined) {
    queryParams.set('page_size', String(validated.query.page_size));
  }
  if (validated.query.notification_type !== undefined) {
    queryParams.set('notification_type', String(validated.query.notification_type));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetNotificationsOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetNotificationsOutputSchema.parse(response.data);
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
export const getNotificationsMetadata = {
  name: 'get_notifications',
  description: `Get a specific notifications by ID. Returns detailed information about the notifications.`,
  inputSchema: GetNotificationsInputSchema,
  outputSchema: GetNotificationsOutputSchema,
  category: 'command/alert',
  operationId: 'getNotificationsViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/alerts',
  requiresAuth: true,
  tags: ['Alerts'],
};
