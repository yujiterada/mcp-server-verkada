/**
 * ActivateScenariosActivate Tool
 *
 * Enable this feature for the specified scenarios activate.
 *
 * @category product/access
 * @operationId postScenariosActivateViewV2
 * @method POST
 * @path /v2/access/scenarios/{scenario_id}/activate
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
 * Input parameters for activateScenariosActivate
 */
const ActivateScenariosActivateInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The scenario_id parameter (required) */
    scenario_id: z.string(),
  }),
});

type ActivateScenariosActivateInput = z.infer<typeof ActivateScenariosActivateInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for activateScenariosActivate
 * OK
 */
const ActivateScenariosActivateOutputSchema = z.object({
});

type ActivateScenariosActivateOutput = z.infer<typeof ActivateScenariosActivateOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Enable this feature for the specified scenarios activate.
 *
 * @param input.path.scenario_id - The scenario_id parameter
 * @returns OK
 */
export async function activateScenariosActivate(
  input: ActivateScenariosActivateInput
): Promise<APIResponse<ActivateScenariosActivateOutput>> {
  // Validate input
  const validated = ActivateScenariosActivateInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/access/scenarios/{scenario_id}/activate';
  path = path.replace('{scenario_id}', encodeURIComponent(String(validated.path.scenario_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<ActivateScenariosActivateOutput>({
    method: 'POST',
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
export const activateScenariosActivateMetadata = {
  name: 'activate_scenarios_activate',
  description: `Enable this feature for the specified scenarios activate.`,
  inputSchema: ActivateScenariosActivateInputSchema,
  outputSchema: ActivateScenariosActivateOutputSchema,
  category: 'product/access',
  operationId: 'postScenariosActivateViewV2',
  method: 'POST' as const,
  path: '/v2/access/scenarios/{scenario_id}/activate',
  requiresAuth: true,
  tags: ['Access Scenarios'],
};
