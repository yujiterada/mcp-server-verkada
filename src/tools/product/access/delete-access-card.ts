/**
 * DeleteAccessCard Tool
 *
 * Delete a access card. This action cannot be undone.
 *
 * @category product/access
 * @operationId deleteAccessCardViewV1
 * @method DELETE
 * @path /access/v1/credentials/card
 * @tags Access Credentials
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
 * Input parameters for deleteAccessCard
 */
const DeleteAccessCardInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The external_id parameter */
    external_id: z.string().optional(),
    /** The user_id parameter */
    user_id: z.string().uuid().optional(),
    /** The card_id parameter (required) */
    card_id: z.string(),
  }),
});

type DeleteAccessCardInput = z.infer<typeof DeleteAccessCardInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteAccessCard
 * ok
 */
const DeleteAccessCardOutputSchema = z.object({
});

type DeleteAccessCardOutput = z.infer<typeof DeleteAccessCardOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a access card. This action cannot be undone.
 *
 * @param input.query.external_id - The external_id parameter
 * @param input.query.user_id - The user_id parameter
 * @param input.query.card_id - The card_id parameter
 * @returns ok
 */
export async function deleteAccessCard(
  input: DeleteAccessCardInput
): Promise<APIResponse<DeleteAccessCardOutput>> {
  // Validate input
  const validated = DeleteAccessCardInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/credentials/card';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.external_id !== undefined) {
    queryParams.set('external_id', String(validated.query.external_id));
  }
  if (validated.query.user_id !== undefined) {
    queryParams.set('user_id', String(validated.query.user_id));
  }
  if (validated.query.card_id !== undefined) {
    queryParams.set('card_id', String(validated.query.card_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<DeleteAccessCardOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteAccessCardOutputSchema.parse(response.data);
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
export const deleteAccessCardMetadata = {
  name: 'delete_access_card',
  description: `Delete a access card. This action cannot be undone.`,
  inputSchema: DeleteAccessCardInputSchema,
  outputSchema: DeleteAccessCardOutputSchema,
  category: 'product/access',
  operationId: 'deleteAccessCardViewV1',
  method: 'DELETE' as const,
  path: '/access/v1/credentials/card',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
