/**
 * ListHostsForGuestSite Tool
 *
 * List all hosts for guest site. Use this to enumerate or search through hosts for guest site. Supports pagination.
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
 * Input parameters for listHostsForGuestSite
 */
const ListHostsForGuestSiteInputSchema = z.object({
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

type ListHostsForGuestSiteInput = z.infer<typeof ListHostsForGuestSiteInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listHostsForGuestSite
 * OK
 */
const ListHostsForGuestSiteOutputSchema = z.object({
  /** Pagination cursor for retrieving the next page of results. */
  cursor: z.string().nullable(),
  /** List of hosts. */
  items: z.array(z.object({ email: z.string().nullable().optional(), first_name: z.string().nullable(), full_name: z.string().nullable(), has_delegate: z.boolean().nullable(), host_id: z.string().uuid().nullable(), last_name: z.string().nullable(), original_first_name: z.string().nullable(), phone_number: z.string().nullable().optional(), requires_host_approval: z.boolean().nullable() })).nullable(),
});

type ListHostsForGuestSiteOutput = z.infer<typeof ListHostsForGuestSiteOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all hosts for guest site. Use this to enumerate or search through hosts for guest site. Supports pagination.
 *
 * @param input.query.site_id - The site_id parameter
 * @param input.query.email - The email parameter
 * @param input.query.cursor - The cursor parameter
 * @param input.query.limit - The limit parameter
 * @returns OK
 */
export async function listHostsForGuestSite(
  input: ListHostsForGuestSiteInput
): Promise<APIResponse<ListHostsForGuestSiteOutput>> {
  // Validate input
  const validated = ListHostsForGuestSiteInputSchema.parse(input);

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
  const response = await callVerkadaAPI<ListHostsForGuestSiteOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ListHostsForGuestSiteOutputSchema.parse(response.data);
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
export const listHostsForGuestSiteMetadata = {
  name: 'list_hosts_for_guest_site',
  description: `List all hosts for guest site. Use this to enumerate or search through hosts for guest site. Supports pagination.`,
  inputSchema: ListHostsForGuestSiteInputSchema,
  outputSchema: ListHostsForGuestSiteOutputSchema,
  category: 'product/guest',
  operationId: 'getHostViewV2',
  method: 'GET' as const,
  path: '/v2/guest/hosts',
  requiresAuth: true,
  tags: ['Hosts'],
};
