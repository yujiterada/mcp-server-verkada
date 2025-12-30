/**
 * GetHost Tool
 *
 * Get a specific host by ID. Returns detailed information about the host. Supports pagination.
 *
 * @category product/guest
 * @operationId getHostViewV2
 * @method GET
 * @path /v2/guest/hosts
 * @tags Hosts
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
 * Input parameters for getHost
 */
const GetHostInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The site_id parameter (required) */
    site_id: z.string().uuid(),
    /** The email parameter */
    email: z.string().optional(),
    /** The cursor parameter */
    cursor: z.string().optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(200).optional(),
  }),
});

type GetHostInput = z.infer<typeof GetHostInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getHost
 * OK
 */
const GetHostOutputSchema = z.object({
  /** Pagination cursor for retrieving the next page of results. */
  cursor: z.string(),
  /** List of hosts. */
  items: z.array(z.object({ email: z.string().optional(), first_name: z.string(), full_name: z.string(), has_delegate: z.boolean(), host_id: z.string().uuid(), last_name: z.string(), original_first_name: z.string(), phone_number: z.string().optional(), requires_host_approval: z.boolean() })),
});

type GetHostOutput = z.infer<typeof GetHostOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific host by ID. Returns detailed information about the host. Supports pagination.
 *
 * @param input.query.site_id - The site_id parameter
 * @param input.query.email - The email parameter
 * @param input.query.cursor - The cursor parameter
 * @param input.query.limit - The limit parameter
 * @returns OK
 */
export async function getHost(
  input: GetHostInput
): Promise<APIResponse<GetHostOutput>> {
  // Validate input
  const validated = GetHostInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/guest/hosts';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.site_id !== undefined) {
    queryParams.set('site_id', String(validated.query.site_id));
  }
  if (validated.query.email !== undefined) {
    queryParams.set('email', String(validated.query.email));
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
  const response = await callVerkadaAPI<GetHostOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetHostOutputSchema.parse(response.data);
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
export const getHostMetadata = {
  name: 'get_host',
  description: `Get a specific host by ID. Returns detailed information about the host. Supports pagination.`,
  inputSchema: GetHostInputSchema,
  outputSchema: GetHostOutputSchema,
  category: 'product/guest',
  operationId: 'getHostViewV2',
  method: 'GET' as const,
  path: '/v2/guest/hosts',
  requiresAuth: true,
  tags: ['Hosts'],
};
