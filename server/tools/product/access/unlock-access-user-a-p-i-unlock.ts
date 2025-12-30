/**
 * UnlockAccessUserAPIUnlock Tool
 *
 * Remotely unlock the specified access user a p i unlock.
 *
 * @category product/access
 * @operationId postAccessUserAPIUnlockViewV1
 * @method POST
 * @path /access/v1/door/user_unlock
 * @tags Access Doors
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
 * Input parameters for unlockAccessUserAPIUnlock
 */
const UnlockAccessUserAPIUnlockInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** The UUID of the door to unlock. */
    door_id: z.string().uuid().optional(),
    /** An externally defined unique identifier provided by the customer. */
    external_id: z.string().optional(),
    /** The unique identifier of the user managed by Verkada. */
    user_id: z.string().uuid().optional(),
  }),
});

type UnlockAccessUserAPIUnlockInput = z.infer<typeof UnlockAccessUserAPIUnlockInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for unlockAccessUserAPIUnlock
 * OK
 */
const UnlockAccessUserAPIUnlockOutputSchema = z.object({
  /** The unique identifier of the door that was unlocked. */
  door_id: z.string(),
  /** The duration of the unlock. */
  unlock_duration: z.number().int(),
});

type UnlockAccessUserAPIUnlockOutput = z.infer<typeof UnlockAccessUserAPIUnlockOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Remotely unlock the specified access user a p i unlock.
 *
 * @param input.body.door_id - The UUID of the door to unlock.
 * @param input.body.external_id - An externally defined unique identifier provided by the customer.
 * @param input.body.user_id - The unique identifier of the user managed by Verkada.
 * @returns OK
 */
export async function unlockAccessUserAPIUnlock(
  input: UnlockAccessUserAPIUnlockInput
): Promise<APIResponse<UnlockAccessUserAPIUnlockOutput>> {
  // Validate input
  const validated = UnlockAccessUserAPIUnlockInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/door/user_unlock';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UnlockAccessUserAPIUnlockOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      door_id: validated.body.door_id,
      external_id: validated.body.external_id,
      user_id: validated.body.user_id,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UnlockAccessUserAPIUnlockOutputSchema.parse(response.data);
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
export const unlockAccessUserAPIUnlockMetadata = {
  name: 'unlock_access_user_a_p_i_unlock',
  description: `Remotely unlock the specified access user a p i unlock.`,
  inputSchema: UnlockAccessUserAPIUnlockInputSchema,
  outputSchema: UnlockAccessUserAPIUnlockOutputSchema,
  category: 'product/access',
  operationId: 'postAccessUserAPIUnlockViewV1',
  method: 'POST' as const,
  path: '/access/v1/door/user_unlock',
  requiresAuth: true,
  tags: ['Access Doors'],
};
