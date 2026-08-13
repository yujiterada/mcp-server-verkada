/**
 * DeleteSmartList Tool
 *
 * Delete a smart list. This action cannot be undone.
 *
 * @category product/camera
 * @operationId deleteSmartListViewV2
 * @method DELETE
 * @path /v2/cameras/people/smart_list/{list_id}
 * @tags Smart Lists
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
 * Input parameters for deleteSmartList
 */
const DeleteSmartListInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The list_id parameter (required) */
    list_id: z.string(),
  }),
});

type DeleteSmartListInput = z.infer<typeof DeleteSmartListInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteSmartList
 * ok
 */
const DeleteSmartListOutputSchema = z.object({
});

type DeleteSmartListOutput = z.infer<typeof DeleteSmartListOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a smart list. This action cannot be undone.
 *
 * @param input.path.list_id - The list_id parameter
 * @returns ok
 */
export async function deleteSmartList(
  input: DeleteSmartListInput
): Promise<APIResponse<DeleteSmartListOutput>> {
  // Validate input
  const validated = DeleteSmartListInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/people/smart_list/{list_id}';
  path = path.replace('{list_id}', encodeURIComponent(String(validated.path.list_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<DeleteSmartListOutput>({
    method: 'DELETE',
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
export const deleteSmartListMetadata = {
  name: 'delete_smart_list',
  description: `Delete a smart list. This action cannot be undone.`,
  inputSchema: DeleteSmartListInputSchema,
  outputSchema: DeleteSmartListOutputSchema,
  category: 'product/camera',
  operationId: 'deleteSmartListViewV2',
  method: 'DELETE' as const,
  path: '/v2/cameras/people/smart_list/{list_id}',
  requiresAuth: true,
  tags: ['Smart Lists'],
};
