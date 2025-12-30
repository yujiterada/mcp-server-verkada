/**
 * DeleteUser Tool
 *
 * Delete a user. This action cannot be undone.
 *
 * @category command/user
 * @operationId deleteUserViewV1
 * @method DELETE
 * @path /core/v1/user
 * @tags Users
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
 * Input parameters for deleteUser
 */
const DeleteUserInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The user_id parameter */
    user_id: z.string().optional(),
    /** The external_id parameter */
    external_id: z.string().optional(),
  }),
});

type DeleteUserInput = z.infer<typeof DeleteUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteUser
 * OK
 */
const DeleteUserOutputSchema = z.object({
});

type DeleteUserOutput = z.infer<typeof DeleteUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a user. This action cannot be undone.
 *
 * @param input.query.user_id - The user_id parameter
 * @param input.query.external_id - The external_id parameter
 * @returns OK
 */
export async function deleteUser(
  input: DeleteUserInput
): Promise<APIResponse<DeleteUserOutput>> {
  // Validate input
  const validated = DeleteUserInputSchema.parse(input);

  // Build path with parameters
  const path = '/core/v1/user';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.user_id !== undefined) {
    queryParams.set('user_id', String(validated.query.user_id));
  }
  if (validated.query.external_id !== undefined) {
    queryParams.set('external_id', String(validated.query.external_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<DeleteUserOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteUserOutputSchema.parse(response.data);
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
export const deleteUserMetadata = {
  name: 'delete_user',
  description: `Delete a user. This action cannot be undone.`,
  inputSchema: DeleteUserInputSchema,
  outputSchema: DeleteUserOutputSchema,
  category: 'command/user',
  operationId: 'deleteUserViewV1',
  method: 'DELETE' as const,
  path: '/core/v1/user',
  requiresAuth: true,
  tags: ['Users'],
};
