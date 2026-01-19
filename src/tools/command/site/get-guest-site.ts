/**
 * GetGuestSite Tool
 *
 * Get a specific guest site by ID. Returns detailed information about the guest site.
 *
 * @category command/site
 * @operationId getGuestSiteView
 * @method GET
 * @path /guest/v1/sites
 * @tags Sites
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
const GetGuestSiteInputSchema = z.object({});


// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getGuestSite
 * OK
 */
const GetGuestSiteOutputSchema = z.object({
  /**  */
  guest_sites: z.array(z.object({ org_id: z.string().uuid().nullable(), site_id: z.string().uuid().nullable(), site_name: z.string().nullable() })).nullable(),
});

type GetGuestSiteOutput = z.infer<typeof GetGuestSiteOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific guest site by ID. Returns detailed information about the guest site.
 *
 * @returns OK
 */
export async function getGuestSite(
): Promise<APIResponse<GetGuestSiteOutput>> {
  // Build path with parameters
  const path = '/guest/v1/sites';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<GetGuestSiteOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetGuestSiteOutputSchema.parse(response.data);
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
export const getGuestSiteMetadata = {
  name: 'get_guest_site',
  description: `Get a specific guest site by ID. Returns detailed information about the guest site.`,
  inputSchema: GetGuestSiteInputSchema,
  outputSchema: GetGuestSiteOutputSchema,
  category: 'command/site',
  operationId: 'getGuestSiteView',
  method: 'GET' as const,
  path: '/guest/v1/sites',
  requiresAuth: true,
  tags: ['Sites'],
};
