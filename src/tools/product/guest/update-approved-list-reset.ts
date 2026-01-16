/**
 * UpdateApprovedListReset Tool
 *
 * Update an existing approved list reset. Only the provided fields will be changed.
 *
 * @category product/guest
 * @operationId patchApprovedListResetViewV2
 * @method PATCH
 * @path /v2/guest/approved_lists/{approved_list_id}/reset
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
 * Input parameters for updateApprovedListReset
 */
const UpdateApprovedListResetInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The approved_list_id parameter (required) */
    approved_list_id: z.string(),
  }),
});

type UpdateApprovedListResetInput = z.infer<typeof UpdateApprovedListResetInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateApprovedListReset
 * OK
 */
const UpdateApprovedListResetOutputSchema = z.object({
  /** Number of records added, removed, or changed by the operation. */
  count: z.number().int(),
});

type UpdateApprovedListResetOutput = z.infer<typeof UpdateApprovedListResetOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing approved list reset. Only the provided fields will be changed.
 *
 * @param input.path.approved_list_id - The approved_list_id parameter
 * @returns OK
 */
export async function updateApprovedListReset(
  input: UpdateApprovedListResetInput
): Promise<APIResponse<UpdateApprovedListResetOutput>> {
  // Validate input
  const validated = UpdateApprovedListResetInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/guest/approved_lists/{approved_list_id}/reset';
  path = path.replace('{approved_list_id}', encodeURIComponent(String(validated.path.approved_list_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UpdateApprovedListResetOutput>({
    method: 'PATCH',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UpdateApprovedListResetOutputSchema.parse(response.data);
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
export const updateApprovedListResetMetadata = {
  name: 'update_approved_list_reset',
  description: `Update an existing approved list reset. Only the provided fields will be changed.`,
  inputSchema: UpdateApprovedListResetInputSchema,
  outputSchema: UpdateApprovedListResetOutputSchema,
  category: 'product/guest',
  operationId: 'patchApprovedListResetViewV2',
  method: 'PATCH' as const,
  path: '/v2/guest/approved_lists/{approved_list_id}/reset',
  requiresAuth: true,
  tags: ['Approved Lists'],
};
