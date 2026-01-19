/**
 * GetFootageToken Tool
 *
 * Get a specific footage token by ID. Returns detailed information about the footage token.
 *
 * @category product/camera
 * @operationId getFootageTokenViewV1
 * @method GET
 * @path /cameras/v1/footage/token
 * @tags Footage
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
const GetFootageTokenInputSchema = z.object({});


// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getFootageToken
 * OK
 */
const GetFootageTokenOutputSchema = z.object({
  /** Allowed cameras for footage streaming for the JWT based on the provided API key. */
  accessibleCameras: z.array(z.string()).nullable(),
  /** Allowed sites for footage streaming for the JWT based on the provided API key. */
  accessibleSites: z.array(z.string()).nullable(),
  /** The expiration time for the JWT in seconds from now. */
  expiration: z.number().int().nullable(),
  /** The expiration time for the JWT in as an epoch timestamp (in seconds). */
  expiresAt: z.number().int().nullable(),
  /** The JWT used to to stream footage.
The token will expire after the expiration timestamp specified in the request.
The token has permission to view streams that are live, history, or both based on the configuration of the API key provided.
The token has permission to stream from certain cameras based on the configuration of the API key. */
  jwt: z.string().nullable(),
  /** Footage streaming permissions for the JWT based on the provided API key. */
  permission: z.array(z.string()).nullable(),
});

type GetFootageTokenOutput = z.infer<typeof GetFootageTokenOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific footage token by ID. Returns detailed information about the footage token.
 *
 * @returns OK
 */
export async function getFootageToken(
): Promise<APIResponse<GetFootageTokenOutput>> {
  // Build path with parameters
  const path = '/cameras/v1/footage/token';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<GetFootageTokenOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetFootageTokenOutputSchema.parse(response.data);
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
export const getFootageTokenMetadata = {
  name: 'get_footage_token',
  description: `Get a specific footage token by ID. Returns detailed information about the footage token.`,
  inputSchema: GetFootageTokenInputSchema,
  outputSchema: GetFootageTokenOutputSchema,
  category: 'product/camera',
  operationId: 'getFootageTokenViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/footage/token',
  requiresAuth: true,
  tags: ['Footage'],
};
