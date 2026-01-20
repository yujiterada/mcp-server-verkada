/**
 * PostMfaCodeViewV1 Tool
 *
 * Get a specific mfa code view v1 by ID. Returns detailed information about the mfa code view v1.
 *
 * @category product/access
 * @operationId postMFACodeViewV1
 * @method POST
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
 * Input parameters for postMfaCodeViewV1
 */
const PostMfaCodeViewV1InputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The external_id parameter */
    external_id: z.string().optional(),
    /** The user_id parameter */
    user_id: z.string().uuid().optional(),
  }),
  /** Body parameters */
  body: z.object({
    /** The unique mfa code identifying a mfa code credential for a user. (required) */
    code: z.string(),
  }),
});

type PostMfaCodeViewV1Input = z.infer<typeof PostMfaCodeViewV1InputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for postMfaCodeViewV1
 * OK
 */
const PostMfaCodeViewV1OutputSchema = z.object({
  /** The code corresponding to a user&#x27;s MFA code credential. */
  code: z.string().nullable(),
});

type PostMfaCodeViewV1Output = z.infer<typeof PostMfaCodeViewV1OutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific mfa code view v1 by ID. Returns detailed information about the mfa code view v1.
 *
 * @param input.query.external_id - The external_id parameter
 * @param input.query.user_id - The user_id parameter
 * @param input.body.code - The unique mfa code identifying a mfa code credential for a user.
 * @returns OK
 */
export async function postMfaCodeViewV1(
  input: PostMfaCodeViewV1Input
): Promise<APIResponse<PostMfaCodeViewV1Output>> {
  // Validate input
  const validated = PostMfaCodeViewV1InputSchema.parse(input);

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
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<PostMfaCodeViewV1Output>({
    method: 'POST',
    path: fullPath,
    body: {
      code: validated.body.code,
    },
  });

  return response;
}

// ============================================================================
// TOOL METADATA
// ============================================================================

/**
 * Metadata for MCP tool registration
 */
export const postMfaCodeViewV1Metadata = {
  name: 'post_mfa_code_view_v1',
  description: `Get a specific mfa code view v1 by ID. Returns detailed information about the mfa code view v1.`,
  inputSchema: PostMfaCodeViewV1InputSchema,
  outputSchema: PostMfaCodeViewV1OutputSchema,
  category: 'product/access',
  operationId: 'postMFACodeViewV1',
  method: 'POST' as const,
  path: '/access/v1/credentials/mfa_code',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
