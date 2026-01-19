/**
 * ListSensorAlerts Tool
 *
 * List all sensor alerts. Use this to enumerate or search through sensor alerts.
 *
 * @category command/alert
 * @operationId getSensorAlertsViewV1
 * @method GET
 * @path /environment/v1/alerts
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
 * Input parameters for listSensorAlerts
 */
const ListSensorAlertsInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The device_ids parameter (required) */
    device_ids: z.string(),
    /** The start_time parameter */
    start_time: z.number().int().optional(),
    /** The end_time parameter */
    end_time: z.number().int().optional(),
    /** The page_size parameter */
    page_size: z.number().int().min(0).max(200).optional(),
    /** The page_token parameter */
    page_token: z.string().optional(),
    /** The fields parameter */
    fields: z.string().optional(),
  }),
});

type ListSensorAlertsInput = z.infer<typeof ListSensorAlertsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listSensorAlerts
 * OK
 */
const ListSensorAlertsOutputSchema = z.object({
  /** A list of sensor alert events. */
  alert_events: z.array(z.object({ alert_event_id: z.string().uuid().nullable().optional(), device_id: z.string().uuid().nullable().optional(), device_name: z.string().nullable().optional(), device_serial: z.string().nullable().optional(), end_time: z.number().int().nullable().optional(), is_above_max_event: z.boolean().nullable().optional(), most_extreme_value: z.number().nullable().optional(), reading: z.string().nullable().optional(), start_time: z.number().int().nullable().optional(), threshold: z.number().nullable().optional() })).nullable(),
  /** The pagination token used to fetch the next page of results. */
  next_page_token: z.string().nullable(),
});

type ListSensorAlertsOutput = z.infer<typeof ListSensorAlertsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all sensor alerts. Use this to enumerate or search through sensor alerts.
 *
 * @param input.query.device_ids - The device_ids parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.page_size - The page_size parameter
 * @param input.query.page_token - The page_token parameter
 * @param input.query.fields - The fields parameter
 * @returns OK
 */
export async function listSensorAlerts(
  input: ListSensorAlertsInput
): Promise<APIResponse<ListSensorAlertsOutput>> {
  // Validate input
  const validated = ListSensorAlertsInputSchema.parse(input);

  // Build path with parameters
  const path = '/environment/v1/alerts';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.device_ids !== undefined) {
    queryParams.set('device_ids', String(validated.query.device_ids));
  }
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
  }
  if (validated.query.page_size !== undefined) {
    queryParams.set('page_size', String(validated.query.page_size));
  }
  if (validated.query.page_token !== undefined) {
    queryParams.set('page_token', String(validated.query.page_token));
  }
  if (validated.query.fields !== undefined) {
    queryParams.set('fields', String(validated.query.fields));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<ListSensorAlertsOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ListSensorAlertsOutputSchema.parse(response.data);
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
export const listSensorAlertsMetadata = {
  name: 'list_sensor_alerts',
  description: `List all sensor alerts. Use this to enumerate or search through sensor alerts.`,
  inputSchema: ListSensorAlertsInputSchema,
  outputSchema: ListSensorAlertsOutputSchema,
  category: 'command/alert',
  operationId: 'getSensorAlertsViewV1',
  method: 'GET' as const,
  path: '/environment/v1/alerts',
  requiresAuth: true,
  tags: ['Alerts'],
};
