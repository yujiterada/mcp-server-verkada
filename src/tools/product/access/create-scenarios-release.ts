/**
 * CreateScenariosRelease Tool
 *
 * Create a new scenarios release. Provide the required fields in the request body.
 *
 * @category product/access
 * @operationId postScenariosReleaseViewV2
 * @method POST
 * @path /v2/access/scenarios/{scenario_id}/release
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
 * Input parameters for createScenariosRelease
 */
const CreateScenariosReleaseInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The scenario_id parameter (required) */
    scenario_id: z.string(),
  }),
});

type CreateScenariosReleaseInput = z.infer<typeof CreateScenariosReleaseInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createScenariosRelease
 * OK
 */
const CreateScenariosReleaseOutputSchema = z.object({
});

type CreateScenariosReleaseOutput = z.infer<typeof CreateScenariosReleaseOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new scenarios release. Provide the required fields in the request body.
 *
 * @param input.path.scenario_id - The scenario_id parameter
 * @returns OK
 */
export async function createScenariosRelease(
  input: CreateScenariosReleaseInput
): Promise<APIResponse<CreateScenariosReleaseOutput>> {
  // Validate input
  const validated = CreateScenariosReleaseInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/access/scenarios/{scenario_id}/release';
  path = path.replace('{scenario_id}', encodeURIComponent(String(validated.path.scenario_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateScenariosReleaseOutput>({
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
export const createScenariosReleaseMetadata = {
  name: 'create_scenarios_release',
  description: `Create a new scenarios release. Provide the required fields in the request body.`,
  inputSchema: CreateScenariosReleaseInputSchema,
  outputSchema: CreateScenariosReleaseOutputSchema,
  category: 'product/access',
  operationId: 'postScenariosReleaseViewV2',
  method: 'POST' as const,
  path: '/v2/access/scenarios/{scenario_id}/release',
  requiresAuth: true,
  tags: ['Access Scenarios'],
};
