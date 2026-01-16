/**
 * UpdateApprovedListRemove Tool
 *
 * Update an existing approved list remove. Only the provided fields will be changed.
 *
 * @category misc
 * @operationId patchApprovedListRemoveViewV2
 * @method PATCH
 * @path /v2/guest/approved_lists/remove
 * @tags Approved Lists
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
 * Input parameters for updateApprovedListRemove
 */
const UpdateApprovedListRemoveInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** List of people to remove from approved lists. (required) */
    people: z.array(z.object({ approved_list_ids: z.array(z.string()).optional(), external_id: z.string().optional(), person_id: z.string().optional() })),
  }),
});

type UpdateApprovedListRemoveInput = z.infer<typeof UpdateApprovedListRemoveInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateApprovedListRemove
 * OK
 */
const UpdateApprovedListRemoveOutputSchema = z.object({
  /** Number of records added, removed, or changed by the operation. */
  count: z.number().int(),
});

type UpdateApprovedListRemoveOutput = z.infer<typeof UpdateApprovedListRemoveOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing approved list remove. Only the provided fields will be changed.
 *
 * @param input.body.people - List of people to remove from approved lists.
 * @returns OK
 */
export async function updateApprovedListRemove(
  input: UpdateApprovedListRemoveInput
): Promise<APIResponse<UpdateApprovedListRemoveOutput>> {
  // Validate input
  const validated = UpdateApprovedListRemoveInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/guest/approved_lists/remove';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UpdateApprovedListRemoveOutput>({
    method: 'PATCH',
    path: fullPath,
    body: {
      people: validated.body.people,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UpdateApprovedListRemoveOutputSchema.parse(response.data);
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
export const updateApprovedListRemoveMetadata = {
  name: 'update_approved_list_remove',
  description: `Update an existing approved list remove. Only the provided fields will be changed.`,
  inputSchema: UpdateApprovedListRemoveInputSchema,
  outputSchema: UpdateApprovedListRemoveOutputSchema,
  category: 'misc',
  operationId: 'patchApprovedListRemoveViewV2',
  method: 'PATCH' as const,
  path: '/v2/guest/approved_lists/remove',
  requiresAuth: true,
  tags: ['Approved Lists'],
};
