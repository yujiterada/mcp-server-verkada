/**
 * ListAccessGroups Tool
 *
 * List all access groups. Use this to enumerate or search through access groups.
 *
 * @category product/access
 * @operationId getAccessGroupsViewV1
 * @method GET
 * @path /access/v1/access_groups
 * @tags Access Groups
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
const ListAccessGroupsInputSchema = z.object({});


// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listAccessGroups
 * OK
 */
const ListAccessGroupsOutputSchema = z.object({
  /** The List of Access Group Objects a user belongs to. */
  access_groups: z.array(z.object({ group_id: z.string().uuid().optional(), name: z.string().optional() })).nullable(),
});

type ListAccessGroupsOutput = z.infer<typeof ListAccessGroupsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all access groups. Use this to enumerate or search through access groups.
 *
 * @returns OK
 */
export async function listAccessGroups(
): Promise<APIResponse<ListAccessGroupsOutput>> {
  // Build path with parameters
  const path = '/access/v1/access_groups';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<ListAccessGroupsOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ListAccessGroupsOutputSchema.parse(response.data);
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
export const listAccessGroupsMetadata = {
  name: 'list_access_groups',
  description: `List all access groups. Use this to enumerate or search through access groups.`,
  inputSchema: ListAccessGroupsInputSchema,
  outputSchema: ListAccessGroupsOutputSchema,
  category: 'product/access',
  operationId: 'getAccessGroupsViewV1',
  method: 'GET' as const,
  path: '/access/v1/access_groups',
  requiresAuth: true,
  tags: ['Access Groups'],
};
