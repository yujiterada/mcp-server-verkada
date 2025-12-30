/**
 * CreateAccessScenarioRelease Tool
 *
 * Create a new access scenario release. Provide the required fields in the request body.
 *
 * @category product/access
 * @operationId postAccessScenarioReleaseViewV1
 * @method POST
 * @path /access/v1/scenarios/{scenario_id}/release
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
 * Input parameters for createAccessScenarioRelease
 */
const CreateAccessScenarioReleaseInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The scenario_id parameter (required) */
    scenario_id: z.string(),
  }),
});

type CreateAccessScenarioReleaseInput = z.infer<typeof CreateAccessScenarioReleaseInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createAccessScenarioRelease
 * OK
 */
const CreateAccessScenarioReleaseOutputSchema = z.object({
});

type CreateAccessScenarioReleaseOutput = z.infer<typeof CreateAccessScenarioReleaseOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new access scenario release. Provide the required fields in the request body.
 *
 * @param input.path.scenario_id - The scenario_id parameter
 * @returns OK
 */
export async function createAccessScenarioRelease(
  input: CreateAccessScenarioReleaseInput
): Promise<APIResponse<CreateAccessScenarioReleaseOutput>> {
  // Validate input
  const validated = CreateAccessScenarioReleaseInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/scenarios/{scenario_id}/release';
  path = path.replace('{scenario_id}', encodeURIComponent(String(validated.path.scenario_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateAccessScenarioReleaseOutput>({
    method: 'POST',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = CreateAccessScenarioReleaseOutputSchema.parse(response.data);
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
export const createAccessScenarioReleaseMetadata = {
  name: 'create_access_scenario_release',
  description: `Create a new access scenario release. Provide the required fields in the request body.`,
  inputSchema: CreateAccessScenarioReleaseInputSchema,
  outputSchema: CreateAccessScenarioReleaseOutputSchema,
  category: 'product/access',
  operationId: 'postAccessScenarioReleaseViewV1',
  method: 'POST' as const,
  path: '/access/v1/scenarios/{scenario_id}/release',
  requiresAuth: true,
  tags: ['Access Scenarios'],
};
