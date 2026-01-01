/**
 * ActivateAccessScenarioActivate Tool
 *
 * Enable this feature for the specified access scenario activate.
 *
 * @category product/access
 * @operationId postAccessScenarioActivateViewV1
 * @method POST
 * @path /access/v1/scenarios/{scenario_id}/activate
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
 * Input parameters for activateAccessScenarioActivate
 */
const ActivateAccessScenarioActivateInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The scenario_id parameter (required) */
    scenario_id: z.string(),
  }),
});

type ActivateAccessScenarioActivateInput = z.infer<typeof ActivateAccessScenarioActivateInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for activateAccessScenarioActivate
 * OK
 */
const ActivateAccessScenarioActivateOutputSchema = z.object({
});

type ActivateAccessScenarioActivateOutput = z.infer<typeof ActivateAccessScenarioActivateOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Enable this feature for the specified access scenario activate.
 *
 * @param input.path.scenario_id - The scenario_id parameter
 * @returns OK
 */
export async function activateAccessScenarioActivate(
  input: ActivateAccessScenarioActivateInput
): Promise<APIResponse<ActivateAccessScenarioActivateOutput>> {
  // Validate input
  const validated = ActivateAccessScenarioActivateInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/scenarios/{scenario_id}/activate';
  path = path.replace('{scenario_id}', encodeURIComponent(String(validated.path.scenario_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<ActivateAccessScenarioActivateOutput>({
    method: 'POST',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ActivateAccessScenarioActivateOutputSchema.parse(response.data);
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
export const activateAccessScenarioActivateMetadata = {
  name: 'activate_access_scenario_activate',
  description: `Enable this feature for the specified access scenario activate.`,
  inputSchema: ActivateAccessScenarioActivateInputSchema,
  outputSchema: ActivateAccessScenarioActivateOutputSchema,
  category: 'product/access',
  operationId: 'postAccessScenarioActivateViewV1',
  method: 'POST' as const,
  path: '/access/v1/scenarios/{scenario_id}/activate',
  requiresAuth: true,
  tags: ['Access Scenarios'],
};
