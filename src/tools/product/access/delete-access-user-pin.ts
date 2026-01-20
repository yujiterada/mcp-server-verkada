/**
 * DeleteAccessUserPin Tool
 *
 * Delete a access user pin. This action cannot be undone.
 *
 * @category product/access
 * @operationId deleteAccessUserPinViewV1
 * @method DELETE
 * @path /access/v1/access_users/user/entry_code
 * @tags Access User Information
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
 * Input parameters for deleteAccessUserPin
 */
const DeleteAccessUserPinInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The user_id parameter */
    user_id: z.string().uuid().optional(),
    /** The external_id parameter */
    external_id: z.string().optional(),
    /** The email parameter */
    email: z.string().optional(),
    /** The employee_id parameter */
    employee_id: z.string().optional(),
  }),
});

type DeleteAccessUserPinInput = z.infer<typeof DeleteAccessUserPinInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteAccessUserPin
 * ok
 */
const DeleteAccessUserPinOutputSchema = z.object({
});

type DeleteAccessUserPinOutput = z.infer<typeof DeleteAccessUserPinOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a access user pin. This action cannot be undone.
 *
 * @param input.query.user_id - The user_id parameter
 * @param input.query.external_id - The external_id parameter
 * @param input.query.email - The email parameter
 * @param input.query.employee_id - The employee_id parameter
 * @returns ok
 */
export async function deleteAccessUserPin(
  input: DeleteAccessUserPinInput
): Promise<APIResponse<DeleteAccessUserPinOutput>> {
  // Validate input
  const validated = DeleteAccessUserPinInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/access_users/user/entry_code';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.user_id !== undefined) {
    queryParams.set('user_id', String(validated.query.user_id));
  }
  if (validated.query.external_id !== undefined) {
    queryParams.set('external_id', String(validated.query.external_id));
  }
  if (validated.query.email !== undefined) {
    queryParams.set('email', String(validated.query.email));
  }
  if (validated.query.employee_id !== undefined) {
    queryParams.set('employee_id', String(validated.query.employee_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<DeleteAccessUserPinOutput>({
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
export const deleteAccessUserPinMetadata = {
  name: 'delete_access_user_pin',
  description: `Delete a access user pin. This action cannot be undone.`,
  inputSchema: DeleteAccessUserPinInputSchema,
  outputSchema: DeleteAccessUserPinOutputSchema,
  category: 'product/access',
  operationId: 'deleteAccessUserPinViewV1',
  method: 'DELETE' as const,
  path: '/access/v1/access_users/user/entry_code',
  requiresAuth: true,
  tags: ['Access User Information'],
};
