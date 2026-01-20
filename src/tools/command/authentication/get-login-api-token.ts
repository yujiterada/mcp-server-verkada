/**
 * GetLoginApiToken Tool
 *
 * Get a specific login api token by ID. Returns detailed information about the login api token.
 *
 * @category command/authentication
 * @operationId postLoginApiKeyViewV2
 * @method POST
 * @path /token
 * @tags API Login
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
 * This tool takes no input parameters
 */
const GetLoginApiTokenInputSchema = z.object({});


// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getLoginApiToken
 * OK
 */
const GetLoginApiTokenOutputSchema = z.object({
  /** Token to use for API requests */
  token: z.string().nullable(),
});

type GetLoginApiTokenOutput = z.infer<typeof GetLoginApiTokenOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific login api token by ID. Returns detailed information about the login api token.
 *
 * @returns OK
 */
export async function getLoginApiToken(
): Promise<APIResponse<GetLoginApiTokenOutput>> {
  // Build path with parameters
  const path = '/token';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<GetLoginApiTokenOutput>({
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
export const getLoginApiTokenMetadata = {
  name: 'get_login_api_token',
  description: `Get a specific login api token by ID. Returns detailed information about the login api token.`,
  inputSchema: GetLoginApiTokenInputSchema,
  outputSchema: GetLoginApiTokenOutputSchema,
  category: 'command/authentication',
  operationId: 'postLoginApiKeyViewV2',
  method: 'POST' as const,
  path: '/token',
  requiresAuth: true,
  tags: ['API Login'],
};
