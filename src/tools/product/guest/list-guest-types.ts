/**
 * ListGuestTypes Tool
 *
 * List all guest types. Use this to enumerate or search through guest types. Supports pagination.
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
 * Input parameters for listGuestTypes
 */
const ListGuestTypesInputSchema = z.object({
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

type ListGuestTypesInput = z.infer<typeof ListGuestTypesInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listGuestTypes
 * OK
 */
const ListGuestTypesOutputSchema = z.object({
  /** Pagination cursor for retrieving the next page of results. */
  cursor: z.string(),
  /** List of guest types. */
  items: z.array(z.object({ enabled_for_invites: z.boolean(), guest_type_id: z.string().uuid(), name: z.string() })),
});

type ListGuestTypesOutput = z.infer<typeof ListGuestTypesOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all guest types. Use this to enumerate or search through guest types. Supports pagination.
 *
 * @param input.query.site_id - The site_id parameter
 * @param input.query.cursor - The cursor parameter
 * @param input.query.limit - The limit parameter
 * @returns OK
 */
export async function listGuestTypes(
  input: ListGuestTypesInput
): Promise<APIResponse<ListGuestTypesOutput>> {
  // Validate input
  const validated = ListGuestTypesInputSchema.parse(input);

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
  const response = await callVerkadaAPI<ListGuestTypesOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ListGuestTypesOutputSchema.parse(response.data);
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
export const listGuestTypesMetadata = {
  name: 'list_guest_types',
  description: `List all guest types. Use this to enumerate or search through guest types. Supports pagination.`,
  inputSchema: ListGuestTypesInputSchema,
  outputSchema: ListGuestTypesOutputSchema,
  category: 'product/guest',
  operationId: 'getGuestTypeViewV2',
  method: 'GET' as const,
  path: '/v2/guest/guest_types',
  requiresAuth: true,
  tags: ['Guest Types'],
};
