/**
 * DeleteDenyList Tool
 *
 * Delete a deny list. This action cannot be undone.
 *
 * @category product/guest
 * @operationId deleteDenyListView
 * @method DELETE
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
 * Input parameters for deleteDenyList
 */
const DeleteDenyListInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The site_id parameter */
    site_id: z.string().uuid().optional(),
  }),
});

type DeleteDenyListInput = z.infer<typeof DeleteDenyListInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteDenyList
 * ok
 */
const DeleteDenyListOutputSchema = z.object({
});

type DeleteDenyListOutput = z.infer<typeof DeleteDenyListOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a deny list. This action cannot be undone.
 *
 * @param input.query.site_id - The site_id parameter
 * @returns ok
 */
export async function deleteDenyList(
  input: DeleteDenyListInput
): Promise<APIResponse<DeleteDenyListOutput>> {
  // Validate input
  const validated = DeleteDenyListInputSchema.parse(input);

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
  const response = await callVerkadaAPI<DeleteDenyListOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteDenyListOutputSchema.parse(response.data);
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
export const deleteDenyListMetadata = {
  name: 'delete_deny_list',
  description: `Delete a deny list. This action cannot be undone.`,
  inputSchema: DeleteDenyListInputSchema,
  outputSchema: DeleteDenyListOutputSchema,
  category: 'product/guest',
  operationId: 'deleteDenyListView',
  method: 'DELETE' as const,
  path: '/guest/v1/deny_list',
  requiresAuth: true,
  tags: ['Deny List'],
};
