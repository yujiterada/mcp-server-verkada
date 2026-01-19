/**
 * ListDenyList Tool
 *
 * List all deny list. Use this to enumerate or search through deny list.
 *
 * @category product/guest
 * @operationId getDenyListView
 * @method GET
 * @path /guest/v1/deny_list
 * @tags Deny List
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
 * Input parameters for listDenyList
 */
const ListDenyListInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The site_id parameter */
    site_id: z.string().uuid().optional(),
  }),
});

type ListDenyListInput = z.infer<typeof ListDenyListInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listDenyList
 * OK
 */
const ListDenyListOutputSchema = z.object({
  /** A list of Deny List Entry objects. */
  deny_list_entries: z.array(z.object({ date_of_birth: z.string().nullable().optional(), deny_list_entry_id: z.string().uuid().nullable(), description: z.string().nullable().optional(), first_name: z.string().nullable(), last_name: z.string().nullable(), presigned_url: z.string().nullable().optional() })).nullable(),
  /** The unique identifier of the organization to which the Guest site belongs. */
  org_id: z.string().uuid().nullable(),
  /** The unique identifier of the Guest site. */
  site_id: z.string().uuid().nullable(),
  /** The time the deny list was uploaded. */
  upload_time: z.number().int().nullable(),
});

type ListDenyListOutput = z.infer<typeof ListDenyListOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all deny list. Use this to enumerate or search through deny list.
 *
 * @param input.query.site_id - The site_id parameter
 * @returns OK
 */
export async function listDenyList(
  input: ListDenyListInput
): Promise<APIResponse<ListDenyListOutput>> {
  // Validate input
  const validated = ListDenyListInputSchema.parse(input);

  // Build path with parameters
  const path = '/guest/v1/deny_list';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.site_id !== undefined) {
    queryParams.set('site_id', String(validated.query.site_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<ListDenyListOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ListDenyListOutputSchema.parse(response.data);
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
export const listDenyListMetadata = {
  name: 'list_deny_list',
  description: `List all deny list. Use this to enumerate or search through deny list.`,
  inputSchema: ListDenyListInputSchema,
  outputSchema: ListDenyListOutputSchema,
  category: 'product/guest',
  operationId: 'getDenyListView',
  method: 'GET' as const,
  path: '/guest/v1/deny_list',
  requiresAuth: true,
  tags: ['Deny List'],
};
