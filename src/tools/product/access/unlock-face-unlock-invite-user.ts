/**
 * UnlockFaceUnlockInviteUser Tool
 *
 * Remotely unlock the specified face unlock invite user.
 *
 * @category product/access
 * @operationId postFaceUnlockInviteUserViewV2
 * @method POST
 * @path /v2/access/users/{user_id}/face_unlock/invite
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
 * Input parameters for unlockFaceUnlockInviteUser
 */
const UnlockFaceUnlockInviteUserInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The user_id parameter (required) */
    user_id: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** Methods to send invitation through (email, sms). Default is [&quot;email&quot;, &quot;sms&quot;]. */
    invitation_methods: z.array(z.string()).optional(),
    /** Whether to overwrite an existing face credential. Default is false. */
    overwrite: z.boolean().optional(),
  }),
});

type UnlockFaceUnlockInviteUserInput = z.infer<typeof UnlockFaceUnlockInviteUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for unlockFaceUnlockInviteUser
 * ok
 */
const UnlockFaceUnlockInviteUserOutputSchema = z.object({
});

type UnlockFaceUnlockInviteUserOutput = z.infer<typeof UnlockFaceUnlockInviteUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Remotely unlock the specified face unlock invite user.
 *
 * @param input.path.user_id - The user_id parameter
 * @param input.body.invitation_methods - Methods to send invitation through (email, sms). Default is [&quot;email&quot;, &quot;sms&quot;].
 * @param input.body.overwrite - Whether to overwrite an existing face credential. Default is false.
 * @returns ok
 */
export async function unlockFaceUnlockInviteUser(
  input: UnlockFaceUnlockInviteUserInput
): Promise<APIResponse<UnlockFaceUnlockInviteUserOutput>> {
  // Validate input
  const validated = UnlockFaceUnlockInviteUserInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/access/users/{user_id}/face_unlock/invite';
  path = path.replace('{user_id}', encodeURIComponent(String(validated.path.user_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UnlockFaceUnlockInviteUserOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      invitation_methods: validated.body.invitation_methods,
      overwrite: validated.body.overwrite,
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
export const unlockFaceUnlockInviteUserMetadata = {
  name: 'unlock_face_unlock_invite_user',
  description: `Remotely unlock the specified face unlock invite user.`,
  inputSchema: UnlockFaceUnlockInviteUserInputSchema,
  outputSchema: UnlockFaceUnlockInviteUserOutputSchema,
  category: 'product/access',
  operationId: 'postFaceUnlockInviteUserViewV2',
  method: 'POST' as const,
  path: '/v2/access/users/{user_id}/face_unlock/invite',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
