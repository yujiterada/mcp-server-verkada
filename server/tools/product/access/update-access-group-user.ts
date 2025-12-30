/**
 * UpdateAccessGroupUser Tool
 *
 * Update an existing access group user. Only the provided fields will be changed.
 *
 * @category product/access
 * @operationId putAccessGroupUserViewV1
 * @method PUT
 * @path /access/v1/access_groups/group/user
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
 * Input parameters for updateAccessGroupUser
 */
const UpdateAccessGroupUserInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The group_id parameter (required) */
    group_id: z.string().uuid(),
  }),
  /** Body parameters */
  body: z.object({
    /** A unique identifier managed externally provided by the customer. */
    external_id: z.string().optional(),
    /** The unique identifier of the user managed by Verkada. */
    user_id: z.string().uuid().optional(),
  }),
});

type UpdateAccessGroupUserInput = z.infer<typeof UpdateAccessGroupUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateAccessGroupUser
 * OK
 */
const UpdateAccessGroupUserOutputSchema = z.object({
  /** The unique identifier of the Access Group managed by Verkada. */
  group_id: z.string().uuid(),
  /** The unique name of the Access Group provided by the customer. */
  name: z.string(),
  /** The list of successfully added Verkada-defined user identifiers. */
  successful_adds: z.array(z.string().uuid()),
  /** The list of unsuccessfully added Verkada-defined user identifiers. */
  unsuccessful_adds: z.array(z.string().uuid()),
});

type UpdateAccessGroupUserOutput = z.infer<typeof UpdateAccessGroupUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing access group user. Only the provided fields will be changed.
 *
 * @param input.query.group_id - The group_id parameter
 * @param input.body.external_id - A unique identifier managed externally provided by the customer.
 * @param input.body.user_id - The unique identifier of the user managed by Verkada.
 * @returns OK
 */
export async function updateAccessGroupUser(
  input: UpdateAccessGroupUserInput
): Promise<APIResponse<UpdateAccessGroupUserOutput>> {
  // Validate input
  const validated = UpdateAccessGroupUserInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/access_groups/group/user';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.group_id !== undefined) {
    queryParams.set('group_id', String(validated.query.group_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<UpdateAccessGroupUserOutput>({
    method: 'PUT',
    path: fullPath,
    body: {
      external_id: validated.body.external_id,
      user_id: validated.body.user_id,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UpdateAccessGroupUserOutputSchema.parse(response.data);
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
export const updateAccessGroupUserMetadata = {
  name: 'update_access_group_user',
  description: `Update an existing access group user. Only the provided fields will be changed.`,
  inputSchema: UpdateAccessGroupUserInputSchema,
  outputSchema: UpdateAccessGroupUserOutputSchema,
  category: 'product/access',
  operationId: 'putAccessGroupUserViewV1',
  method: 'PUT' as const,
  path: '/access/v1/access_groups/group/user',
  requiresAuth: true,
  tags: ['Access Groups'],
};
