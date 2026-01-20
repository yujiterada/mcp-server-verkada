/**
 * UnlockAccessUserApiUnlock Tool
 *
 * Remotely unlock the specified access user api unlock.
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
 * Input parameters for unlockAccessUserApiUnlock
 */
const UnlockAccessUserApiUnlockInputSchema = z.object({
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

type UnlockAccessUserApiUnlockInput = z.infer<typeof UnlockAccessUserApiUnlockInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for unlockAccessUserApiUnlock
 * OK
 */
const UnlockAccessUserApiUnlockOutputSchema = z.object({
  /** The unique identifier of the door that was unlocked. */
  door_id: z.string().nullable(),
  /** The duration of the unlock. */
  unlock_duration: z.number().int().nullable(),
});

type UnlockAccessUserApiUnlockOutput = z.infer<typeof UnlockAccessUserApiUnlockOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Remotely unlock the specified access user api unlock.
 *
 * @param input.body.door_id - The UUID of the door to unlock.
 * @param input.body.external_id - An externally defined unique identifier provided by the customer.
 * @param input.body.user_id - The unique identifier of the user managed by Verkada.
 * @returns OK
 */
export async function unlockAccessUserApiUnlock(
  input: UnlockAccessUserApiUnlockInput
): Promise<APIResponse<UnlockAccessUserApiUnlockOutput>> {
  // Validate input
  const validated = UnlockAccessUserApiUnlockInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/door/user_unlock';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UnlockAccessUserApiUnlockOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      door_id: validated.body.door_id,
      external_id: validated.body.external_id,
      user_id: validated.body.user_id,
    },
  });

  return response;
}

// ============================================================================
// TOOL METADATA
// ============================================================================

/**
 * Metadata for MCP tool registration
 */
export const unlockAccessUserApiUnlockMetadata = {
  name: 'unlock_access_user_api_unlock',
  description: `Remotely unlock the specified access user api unlock.`,
  inputSchema: UnlockAccessUserApiUnlockInputSchema,
  outputSchema: UnlockAccessUserApiUnlockOutputSchema,
  category: 'product/access',
  operationId: 'postAccessUserAPIUnlockViewV1',
  method: 'POST' as const,
  path: '/access/v1/door/user_unlock',
  requiresAuth: true,
  tags: ['Access Doors'],
};
