/**
 * UnlockAccessAdminApiUnlock Tool
 *
 * Remotely unlock the specified access admin api unlock.
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
 * Input parameters for unlockAccessAdminApiUnlock
 */
const UnlockAccessAdminApiUnlockInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** The UUID of the door to unlock. */
    door_id: z.string().uuid().optional(),
  }),
});

type UnlockAccessAdminApiUnlockInput = z.infer<typeof UnlockAccessAdminApiUnlockInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for unlockAccessAdminApiUnlock
 * OK
 */
const UnlockAccessAdminApiUnlockOutputSchema = z.object({
  /** The unique identifier of the door that was unlocked. */
  door_id: z.string().nullable(),
  /** The duration of the unlock. */
  unlock_duration: z.number().int().nullable(),
});

type UnlockAccessAdminApiUnlockOutput = z.infer<typeof UnlockAccessAdminApiUnlockOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Remotely unlock the specified access admin api unlock.
 *
 * @param input.body.door_id - The UUID of the door to unlock.
 * @returns OK
 */
export async function unlockAccessAdminApiUnlock(
  input: UnlockAccessAdminApiUnlockInput
): Promise<APIResponse<UnlockAccessAdminApiUnlockOutput>> {
  // Validate input
  const validated = UnlockAccessAdminApiUnlockInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/door/admin_unlock';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UnlockAccessAdminApiUnlockOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      door_id: validated.body.door_id,
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
export const unlockAccessAdminApiUnlockMetadata = {
  name: 'unlock_access_admin_api_unlock',
  description: `Remotely unlock the specified access admin api unlock.`,
  inputSchema: UnlockAccessAdminApiUnlockInputSchema,
  outputSchema: UnlockAccessAdminApiUnlockOutputSchema,
  category: 'product/access',
  operationId: 'postAccessAdminAPIUnlockViewV1',
  method: 'POST' as const,
  path: '/access/v1/door/admin_unlock',
  requiresAuth: true,
  tags: ['Access Doors'],
};
