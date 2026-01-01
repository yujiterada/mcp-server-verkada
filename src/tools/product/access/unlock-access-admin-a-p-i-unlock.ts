/**
 * UnlockAccessAdminAPIUnlock Tool
 *
 * Remotely unlock the specified access admin a p i unlock.
 *
 * @category product/access
 * @operationId postAccessAdminAPIUnlockViewV1
 * @method POST
 * @path /access/v1/door/admin_unlock
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
 * Input parameters for unlockAccessAdminAPIUnlock
 */
const UnlockAccessAdminAPIUnlockInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** The UUID of the door to unlock. */
    door_id: z.string().uuid().optional(),
  }),
});

type UnlockAccessAdminAPIUnlockInput = z.infer<typeof UnlockAccessAdminAPIUnlockInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for unlockAccessAdminAPIUnlock
 * OK
 */
const UnlockAccessAdminAPIUnlockOutputSchema = z.object({
  /** The unique identifier of the door that was unlocked. */
  door_id: z.string(),
  /** The duration of the unlock. */
  unlock_duration: z.number().int(),
});

type UnlockAccessAdminAPIUnlockOutput = z.infer<typeof UnlockAccessAdminAPIUnlockOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Remotely unlock the specified access admin a p i unlock.
 *
 * @param input.body.door_id - The UUID of the door to unlock.
 * @returns OK
 */
export async function unlockAccessAdminAPIUnlock(
  input: UnlockAccessAdminAPIUnlockInput
): Promise<APIResponse<UnlockAccessAdminAPIUnlockOutput>> {
  // Validate input
  const validated = UnlockAccessAdminAPIUnlockInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/door/admin_unlock';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UnlockAccessAdminAPIUnlockOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      door_id: validated.body.door_id,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UnlockAccessAdminAPIUnlockOutputSchema.parse(response.data);
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
export const unlockAccessAdminAPIUnlockMetadata = {
  name: 'unlock_access_admin_a_p_i_unlock',
  description: `Remotely unlock the specified access admin a p i unlock.`,
  inputSchema: UnlockAccessAdminAPIUnlockInputSchema,
  outputSchema: UnlockAccessAdminAPIUnlockOutputSchema,
  category: 'product/access',
  operationId: 'postAccessAdminAPIUnlockViewV1',
  method: 'POST' as const,
  path: '/access/v1/door/admin_unlock',
  requiresAuth: true,
  tags: ['Access Doors'],
};
