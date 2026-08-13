/**
 * DeletePeopleList Tool
 *
 * Delete a people list. This action cannot be undone. Note: This endpoint may be deprecated. Supports bulk operations.
 *
 * @category product/camera
 * @operationId deletePeopleListViewV2
 * @method DELETE
 * @path /v2/cameras/people/people_list/{list_id}
 * @tags People Lists
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
 * Input parameters for deletePeopleList
 */
const DeletePeopleListInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The list_id parameter (required) */
    list_id: z.string(),
  }),
});

type DeletePeopleListInput = z.infer<typeof DeletePeopleListInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deletePeopleList
 * ok
 */
const DeletePeopleListOutputSchema = z.object({
});

type DeletePeopleListOutput = z.infer<typeof DeletePeopleListOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a people list. This action cannot be undone. Note: This endpoint may be deprecated. Supports bulk operations.
 *
 * @param input.path.list_id - The list_id parameter
 * @returns ok
 */
export async function deletePeopleList(
  input: DeletePeopleListInput
): Promise<APIResponse<DeletePeopleListOutput>> {
  // Validate input
  const validated = DeletePeopleListInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/people/people_list/{list_id}';
  path = path.replace('{list_id}', encodeURIComponent(String(validated.path.list_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<DeletePeopleListOutput>({
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
export const deletePeopleListMetadata = {
  name: 'delete_people_list',
  description: `Delete a people list. This action cannot be undone. Note: This endpoint may be deprecated. Supports bulk operations.`,
  inputSchema: DeletePeopleListInputSchema,
  outputSchema: DeletePeopleListOutputSchema,
  category: 'product/camera',
  operationId: 'deletePeopleListViewV2',
  method: 'DELETE' as const,
  path: '/v2/cameras/people/people_list/{list_id}',
  requiresAuth: true,
  tags: ['People Lists'],
};
