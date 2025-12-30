/**
 * ListAccessScenarioList Tool
 *
 * List all access scenario list. Use this to enumerate or search through access scenario list.
 *
 * @category product/access
 * @operationId getAccessScenarioListViewV1
 * @method GET
 * @path /access/v1/scenarios
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
 * Input parameters for listAccessScenarioList
 */
const ListAccessScenarioListInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The scenario_ids parameter */
    scenario_ids: z.array(z.string()).optional(),
    /** The site_ids parameter */
    site_ids: z.array(z.string()).optional(),
    /** The types parameter */
    types: z.array(z.string()).optional(),
  }),
});

type ListAccessScenarioListInput = z.infer<typeof ListAccessScenarioListInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listAccessScenarioList
 * OK
 */
const ListAccessScenarioListOutputSchema = z.object({
  /** List of scenarios. */
  scenarios: z.array(z.object({ doors_to_lock: z.array(z.string()).optional(), message: z.string().optional(), name: z.string(), scenario_id: z.string(), site_count: z.number().int(), sites: z.array(z.string()).optional(), state: z.enum(['ACTIVE', 'INACTIVE']), type: z.enum(['lockdown']), user_groups_with_disable_access: z.array(z.string()).optional(), user_groups_with_door_access: z.array(z.string()).optional(), user_groups_with_enable_access: z.array(z.string()).optional() })),
});

type ListAccessScenarioListOutput = z.infer<typeof ListAccessScenarioListOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all access scenario list. Use this to enumerate or search through access scenario list.
 *
 * @param input.query.scenario_ids - The scenario_ids parameter
 * @param input.query.site_ids - The site_ids parameter
 * @param input.query.types - The types parameter
 * @returns OK
 */
export async function listAccessScenarioList(
  input: ListAccessScenarioListInput
): Promise<APIResponse<ListAccessScenarioListOutput>> {
  // Validate input
  const validated = ListAccessScenarioListInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/scenarios';

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
  if (validated.query.types !== undefined) {
    for (const item of validated.query.types) {
      queryParams.append('types', String(item));
    }
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<ListAccessScenarioListOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ListAccessScenarioListOutputSchema.parse(response.data);
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
export const listAccessScenarioListMetadata = {
  name: 'list_access_scenario_list',
  description: `List all access scenario list. Use this to enumerate or search through access scenario list.`,
  inputSchema: ListAccessScenarioListInputSchema,
  outputSchema: ListAccessScenarioListOutputSchema,
  category: 'product/access',
  operationId: 'getAccessScenarioListViewV1',
  method: 'GET' as const,
  path: '/access/v1/scenarios',
  requiresAuth: true,
  tags: ['Access Scenarios'],
};
