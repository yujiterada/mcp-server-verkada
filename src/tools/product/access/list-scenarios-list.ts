/**
 * ListScenariosList Tool
 *
 * List all scenarios list. Use this to enumerate or search through scenarios list. Supports pagination.
 *
 * @category product/access
 * @operationId getScenariosListViewV2
 * @method GET
 * @path /v2/access/scenarios
 * @tags Access Scenarios
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
 * Input parameters for listScenariosList
 */
const ListScenariosListInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The scenario_ids parameter */
    scenario_ids: z.array(z.string()).optional(),
    /** The site_ids parameter */
    site_ids: z.array(z.string()).optional(),
    /** The scenario_types parameter */
    scenario_types: z.array(z.string()).optional(),
    /** The cursor parameter */
    cursor: z.string().optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(1000).optional(),
  }),
});

type ListScenariosListInput = z.infer<typeof ListScenariosListInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listScenariosList
 * OK
 */
const ListScenariosListOutputSchema = z.object({
  /** Cursor to fetch the next page. Absent or null when there are no more pages. */
  cursor: z.string().nullable(),
  /** List of scenarios matching the query. */
  items: z.array(z.object({ door_configurations: z.array(z.object({ door_id: z.string().nullable(), door_lock_state: z.string().nullable() })).nullable().optional(), doors_to_lock: z.array(z.string()).nullable().optional(), message: z.string().nullable().optional(), name: z.string().nullable(), scenario_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).nullable().optional(), scenario_id: z.string().nullable(), scenario_message: z.string().nullable().optional(), scenario_type: z.string().nullable(), site_count: z.number().int().min(0).nullable(), sites: z.array(z.string()).nullable().optional(), state: z.enum(['ACTIVE', 'INACTIVE']).nullable(), user_groups_with_disable_access: z.array(z.string()).nullable().optional(), user_groups_with_door_access: z.array(z.string()).nullable().optional(), user_groups_with_enable_access: z.array(z.string()).nullable().optional() })).nullable(),
});

type ListScenariosListOutput = z.infer<typeof ListScenariosListOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all scenarios list. Use this to enumerate or search through scenarios list. Supports pagination.
 *
 * @param input.query.scenario_ids - The scenario_ids parameter
 * @param input.query.site_ids - The site_ids parameter
 * @param input.query.scenario_types - The scenario_types parameter
 * @param input.query.cursor - The cursor parameter
 * @param input.query.limit - The limit parameter
 * @returns OK
 */
export async function listScenariosList(
  input: ListScenariosListInput
): Promise<APIResponse<ListScenariosListOutput>> {
  // Validate input
  const validated = ListScenariosListInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/access/scenarios';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.scenario_ids !== undefined) {
    for (const item of validated.query.scenario_ids) {
      queryParams.append('scenario_ids', String(item));
    }
  }
  if (validated.query.site_ids !== undefined) {
    for (const item of validated.query.site_ids) {
      queryParams.append('site_ids', String(item));
    }
  }
  if (validated.query.scenario_types !== undefined) {
    for (const item of validated.query.scenario_types) {
      queryParams.append('scenario_types', String(item));
    }
  }
  if (validated.query.cursor !== undefined) {
    queryParams.set('cursor', String(validated.query.cursor));
  }
  if (validated.query.limit !== undefined) {
    queryParams.set('limit', String(validated.query.limit));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<ListScenariosListOutput>({
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
export const listScenariosListMetadata = {
  name: 'list_scenarios_list',
  description: `List all scenarios list. Use this to enumerate or search through scenarios list. Supports pagination.`,
  inputSchema: ListScenariosListInputSchema,
  outputSchema: ListScenariosListOutputSchema,
  category: 'product/access',
  operationId: 'getScenariosListViewV2',
  method: 'GET' as const,
  path: '/v2/access/scenarios',
  requiresAuth: true,
  tags: ['Access Scenarios'],
};
