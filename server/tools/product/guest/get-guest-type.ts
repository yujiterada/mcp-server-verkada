/**
 * GetGuestType Tool
 *
 * Get a specific guest type by ID. Returns detailed information about the guest type. Supports pagination.
 *
 * @category product/guest
 * @operationId getGuestTypeViewV2
 * @method GET
 * @path /v2/guest/guest_types
 * @tags Guest Types
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
 * Input parameters for getGuestType
 */
const GetGuestTypeInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The site_id parameter (required) */
    site_id: z.string().uuid(),
    /** The cursor parameter */
    cursor: z.string().optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(200).optional(),
  }),
});

type GetGuestTypeInput = z.infer<typeof GetGuestTypeInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getGuestType
 * OK
 */
const GetGuestTypeOutputSchema = z.object({
  /** Pagination cursor for retrieving the next page of results. */
  cursor: z.string(),
  /** List of guest types. */
  items: z.array(z.object({ enabled_for_invites: z.boolean(), guest_type_id: z.string().uuid(), name: z.string() })),
});

type GetGuestTypeOutput = z.infer<typeof GetGuestTypeOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific guest type by ID. Returns detailed information about the guest type. Supports pagination.
 *
 * @param input.query.site_id - The site_id parameter
 * @param input.query.cursor - The cursor parameter
 * @param input.query.limit - The limit parameter
 * @returns OK
 */
export async function getGuestType(
  input: GetGuestTypeInput
): Promise<APIResponse<GetGuestTypeOutput>> {
  // Validate input
  const validated = GetGuestTypeInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/guest/guest_types';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.site_id !== undefined) {
    queryParams.set('site_id', String(validated.query.site_id));
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
  const response = await callVerkadaAPI<GetGuestTypeOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetGuestTypeOutputSchema.parse(response.data);
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
export const getGuestTypeMetadata = {
  name: 'get_guest_type',
  description: `Get a specific guest type by ID. Returns detailed information about the guest type. Supports pagination.`,
  inputSchema: GetGuestTypeInputSchema,
  outputSchema: GetGuestTypeOutputSchema,
  category: 'product/guest',
  operationId: 'getGuestTypeViewV2',
  method: 'GET' as const,
  path: '/v2/guest/guest_types',
  requiresAuth: true,
  tags: ['Guest Types'],
};
