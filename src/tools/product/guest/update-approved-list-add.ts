/**
 * UpdateApprovedListAdd Tool
 *
 * Update an existing approved list add. Only the provided fields will be changed. Supports bulk operations.
 *
 * @category product/guest
 * @operationId patchApprovedListAddViewV2
 * @method PATCH
 * @path /v2/guest/approved_lists/add
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
 * Input parameters for updateApprovedListAdd
 */
const UpdateApprovedListAddInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** List of people to add to approved lists. (required) */
    people: z.array(z.object({ address: z.string().optional(), approved_list_ids: z.array(z.string()), date_of_birth: z.string().optional(), email: z.string(), expiration_timestamp: z.string().optional(), external_id: z.string().optional(), full_name: z.string(), phone_number: z.string().optional() })),
  }),
});

type UpdateApprovedListAddInput = z.infer<typeof UpdateApprovedListAddInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateApprovedListAdd
 * OK
 */
const UpdateApprovedListAddOutputSchema = z.object({
  /** Number of records added, removed, or changed by the operation. */
  count: z.number().int().nullable(),
});

type UpdateApprovedListAddOutput = z.infer<typeof UpdateApprovedListAddOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing approved list add. Only the provided fields will be changed. Supports bulk operations.
 *
 * @param input.body.people - List of people to add to approved lists.
 * @returns OK
 */
export async function updateApprovedListAdd(
  input: UpdateApprovedListAddInput
): Promise<APIResponse<UpdateApprovedListAddOutput>> {
  // Validate input
  const validated = UpdateApprovedListAddInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/guest/approved_lists/add';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UpdateApprovedListAddOutput>({
    method: 'PATCH',
    path: fullPath,
    body: {
      people: validated.body.people,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UpdateApprovedListAddOutputSchema.parse(response.data);
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
export const updateApprovedListAddMetadata = {
  name: 'update_approved_list_add',
  description: `Update an existing approved list add. Only the provided fields will be changed. Supports bulk operations.`,
  inputSchema: UpdateApprovedListAddInputSchema,
  outputSchema: UpdateApprovedListAddOutputSchema,
  category: 'product/guest',
  operationId: 'patchApprovedListAddViewV2',
  method: 'PATCH' as const,
  path: '/v2/guest/approved_lists/add',
  requiresAuth: true,
  tags: ['Approved Lists'],
};
