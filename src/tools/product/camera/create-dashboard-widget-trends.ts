/**
 * CreateDashboardWidgetTrends Tool
 *
 * Create a new dashboard widget trends. Provide the required fields in the request body.
 *
 * @category product/camera
 * @operationId postDashboardWidgetTrendsView
 * @method POST
 * @path /v2/analytics/operational_dashboard/{dashboard_id}/widget_trends/query
 * @tags Analytics
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
 * Input parameters for createDashboardWidgetTrends
 */
const CreateDashboardWidgetTrendsInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The dashboard_id parameter (required) */
    dashboard_id: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** The end of the time range for dashboard trends.
Formatted as an IS0 8601 string.
Defaults to the end of the last full bucket of data. */
    end_time: z.string().optional(),
    /** The time interval for each array in &lt;code&gt;trend_in&lt;/code&gt; and &lt;code&gt;trend_out&lt;/code&gt;.
Options available are: &lt;code&gt;PT15M&lt;/code&gt;, &lt;code&gt;PT1H&lt;/code&gt;, &lt;code&gt;PT1D&lt;/code&gt;.
Defaults to &lt;code&gt;PT1H&lt;/code&gt;. */
    interval: z.enum(['PT15M', 'PT1H', 'PT1D']).optional(),
    /** The unique site identifiers to filter on.
Each value must be a valid site UID.
Defaults to all sites in the dashboard. */
    site_ids: z.array(z.string()).optional(),
    /** The start of the time range for dashboard trends.
Formatted as an IS0 8601 string.
Defaults to beginning of the last full bucket of data. */
    start_time: z.string().optional(),
    /** The unique widget identifiers to filter on.
Each value must be a valid widget UID.
Defaults to all widgets in the dashboard. */
    widget_ids: z.array(z.string()).optional(),
    /** The widget types to filter on.
One or multiple values from &lt;code&gt;occupancy&lt;/code&gt;, &lt;code&gt;helix&lt;/code&gt;, &lt;code&gt;conversion&lt;/code&gt;, &lt;code&gt;queue&lt;/code&gt;, &lt;code&gt;deviceAlerts&lt;/code&gt;.

Defaults to all widget types. */
    widget_types: z.array(z.enum(['occupancy', 'helix', 'conversion', 'queue', 'deviceAlerts'])).optional(),
  }),
});

type CreateDashboardWidgetTrendsInput = z.infer<typeof CreateDashboardWidgetTrendsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createDashboardWidgetTrends
 * OK
 */
const CreateDashboardWidgetTrendsOutputSchema = z.object({
  /** The unique identifier of the dashboard. */
  dashboard_id: z.string().nullable(),
  /** The name of the dashboard. */
  dashboard_name: z.string().nullable(),
  /** The end of the time range for dashboard trends. */
  end_time: z.string().nullable(),
  /** The time interval used. */
  interval: z.enum(['PT15M', 'PT1H', 'PT1D']).nullable(),
  /** The start of the time range of dashboard trends. */
  start_time: z.string().nullable(),
  /** List of widgets found. */
  widgets: z.array(z.object({ conversion_data: z.object({ conversion_rates: z.record(z.string(), z.number()).nullable().optional(), helix_cameras_used: z.array(z.string()).nullable().optional(), helix_counts: z.record(z.string(), z.number()).nullable().optional(), occupancy_camera_presets_used: z.array(z.object({})).nullable().optional(), occupancy_in: z.record(z.string(), z.number()).nullable().optional() }).nullable().optional(), device_alerts_data: z.object({ alert_count: z.record(z.string(), z.number()).nullable().optional() }).nullable().optional(), helix_data: z.object({ cameras_used: z.array(z.string()).nullable().optional(), helix_stats: z.record(z.string(), z.number()).nullable().optional() }).nullable().optional(), occupancy_data: z.object({ camera_presets_used: z.array(z.object({})).nullable().optional(), in_counts: z.record(z.string(), z.number()).nullable().optional(), net_occupancy: z.record(z.string(), z.number()).nullable().optional(), out_counts: z.record(z.string(), z.number()).nullable().optional() }).nullable().optional(), queue_data: z.object({ avg_queue_length: z.record(z.string(), z.number()).nullable().optional(), avg_wait_time: z.record(z.string(), z.number()).nullable().optional(), camera_presets_used: z.array(z.object({})).nullable().optional(), max_queue_length: z.record(z.string(), z.number()).nullable().optional(), max_wait_time: z.record(z.string(), z.number()).nullable().optional() }).nullable().optional(), widget_id: z.string().nullable(), widget_name: z.string().nullable(), widget_type: z.enum(['occupancy', 'helix', 'conversion', 'queue', 'deviceAlerts']).nullable() })).nullable(),
});

type CreateDashboardWidgetTrendsOutput = z.infer<typeof CreateDashboardWidgetTrendsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new dashboard widget trends. Provide the required fields in the request body.
 *
 * @param input.path.dashboard_id - The dashboard_id parameter
 * @param input.body.end_time - The end of the time range for dashboard trends.
Formatted as an IS0 8601 string.
Defaults to the end of the last full bucket of data.
 * @param input.body.interval - The time interval for each array in &lt;code&gt;trend_in&lt;/code&gt; and &lt;code&gt;trend_out&lt;/code&gt;.
Options available are: &lt;code&gt;PT15M&lt;/code&gt;, &lt;code&gt;PT1H&lt;/code&gt;, &lt;code&gt;PT1D&lt;/code&gt;.
Defaults to &lt;code&gt;PT1H&lt;/code&gt;.
 * @param input.body.site_ids - The unique site identifiers to filter on.
Each value must be a valid site UID.
Defaults to all sites in the dashboard.
 * @param input.body.start_time - The start of the time range for dashboard trends.
Formatted as an IS0 8601 string.
Defaults to beginning of the last full bucket of data.
 * @param input.body.widget_ids - The unique widget identifiers to filter on.
Each value must be a valid widget UID.
Defaults to all widgets in the dashboard.
 * @param input.body.widget_types - The widget types to filter on.
One or multiple values from &lt;code&gt;occupancy&lt;/code&gt;, &lt;code&gt;helix&lt;/code&gt;, &lt;code&gt;conversion&lt;/code&gt;, &lt;code&gt;queue&lt;/code&gt;, &lt;code&gt;deviceAlerts&lt;/code&gt;.

Defaults to all widget types.
 * @returns OK
 */
export async function createDashboardWidgetTrends(
  input: CreateDashboardWidgetTrendsInput
): Promise<APIResponse<CreateDashboardWidgetTrendsOutput>> {
  // Validate input
  const validated = CreateDashboardWidgetTrendsInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/analytics/operational_dashboard/{dashboard_id}/widget_trends/query';
  path = path.replace('{dashboard_id}', encodeURIComponent(String(validated.path.dashboard_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateDashboardWidgetTrendsOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      end_time: validated.body.end_time,
      interval: validated.body.interval,
      site_ids: validated.body.site_ids,
      start_time: validated.body.start_time,
      widget_ids: validated.body.widget_ids,
      widget_types: validated.body.widget_types,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = CreateDashboardWidgetTrendsOutputSchema.parse(response.data);
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
export const createDashboardWidgetTrendsMetadata = {
  name: 'create_dashboard_widget_trends',
  description: `Create a new dashboard widget trends. Provide the required fields in the request body.`,
  inputSchema: CreateDashboardWidgetTrendsInputSchema,
  outputSchema: CreateDashboardWidgetTrendsOutputSchema,
  category: 'product/camera',
  operationId: 'postDashboardWidgetTrendsView',
  method: 'POST' as const,
  path: '/v2/analytics/operational_dashboard/{dashboard_id}/widget_trends/query',
  requiresAuth: true,
  tags: ['Analytics'],
};
