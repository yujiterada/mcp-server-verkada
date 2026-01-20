/**
 * DeleteMfaCodeViewV1 Tool
 *
 * Delete a mfa code view v1. This action cannot be undone.
 *
 * @category product/access
 * @operationId deleteMFACodeViewV1
 * @method DELETE
 * @path /access/v1/credentials/mfa_code
 * @tags Access Credentials
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
 * Input parameters for deleteMfaCodeViewV1
 */
const DeleteMfaCodeViewV1InputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The external_id parameter */
    external_id: z.string().optional(),
    /** The user_id parameter */
    user_id: z.string().uuid().optional(),
    /** The code parameter (required) */
    code: z.string(),
  }),
});

type DeleteMfaCodeViewV1Input = z.infer<typeof DeleteMfaCodeViewV1InputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteMfaCodeViewV1
 * ok
 */
const DeleteMfaCodeViewV1OutputSchema = z.object({
});

type DeleteMfaCodeViewV1Output = z.infer<typeof DeleteMfaCodeViewV1OutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a mfa code view v1. This action cannot be undone.
 *
 * @param input.query.external_id - The external_id parameter
 * @param input.query.user_id - The user_id parameter
 * @param input.query.code - The code parameter
 * @returns ok
 */
export async function deleteMfaCodeViewV1(
  input: DeleteMfaCodeViewV1Input
): Promise<APIResponse<DeleteMfaCodeViewV1Output>> {
  // Validate input
  const validated = DeleteMfaCodeViewV1InputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/credentials/mfa_code';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.external_id !== undefined) {
    queryParams.set('external_id', String(validated.query.external_id));
  }
  if (validated.query.user_id !== undefined) {
    queryParams.set('user_id', String(validated.query.user_id));
  }
  if (validated.query.code !== undefined) {
    queryParams.set('code', String(validated.query.code));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<DeleteMfaCodeViewV1Output>({
    method: 'DELETE',
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
export const deleteMfaCodeViewV1Metadata = {
  name: 'delete_mfa_code_view_v1',
  description: `Delete a mfa code view v1. This action cannot be undone.`,
  inputSchema: DeleteMfaCodeViewV1InputSchema,
  outputSchema: DeleteMfaCodeViewV1OutputSchema,
  category: 'product/access',
  operationId: 'deleteMFACodeViewV1',
  method: 'DELETE' as const,
  path: '/access/v1/credentials/mfa_code',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
