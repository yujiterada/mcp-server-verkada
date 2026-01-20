/**
 * UnlockFaceUnlockInviteExternalUser Tool
 *
 * Remotely unlock the specified face unlock invite external user.
 *
 * @category product/access
 * @operationId postFaceUnlockInviteExternalUserViewV2
 * @method POST
 * @path /v2/access/external_users/{external_id}/face_unlock/invite
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
 * Input parameters for unlockFaceUnlockInviteExternalUser
 */
const UnlockFaceUnlockInviteExternalUserInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The external_id parameter (required) */
    external_id: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** Methods to send invitation through (email, sms). Default is [&quot;email&quot;, &quot;sms&quot;]. */
    invitation_methods: z.array(z.string()).optional(),
    /** Whether to overwrite an existing face credential. Default is false. */
    overwrite: z.boolean().optional(),
  }),
});

type UnlockFaceUnlockInviteExternalUserInput = z.infer<typeof UnlockFaceUnlockInviteExternalUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for unlockFaceUnlockInviteExternalUser
 * ok
 */
const UnlockFaceUnlockInviteExternalUserOutputSchema = z.object({
});

type UnlockFaceUnlockInviteExternalUserOutput = z.infer<typeof UnlockFaceUnlockInviteExternalUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Remotely unlock the specified face unlock invite external user.
 *
 * @param input.path.external_id - The external_id parameter
 * @param input.body.invitation_methods - Methods to send invitation through (email, sms). Default is [&quot;email&quot;, &quot;sms&quot;].
 * @param input.body.overwrite - Whether to overwrite an existing face credential. Default is false.
 * @returns ok
 */
export async function unlockFaceUnlockInviteExternalUser(
  input: UnlockFaceUnlockInviteExternalUserInput
): Promise<APIResponse<UnlockFaceUnlockInviteExternalUserOutput>> {
  // Validate input
  const validated = UnlockFaceUnlockInviteExternalUserInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/access/external_users/{external_id}/face_unlock/invite';
  path = path.replace('{external_id}', encodeURIComponent(String(validated.path.external_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UnlockFaceUnlockInviteExternalUserOutput>({
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
export const unlockFaceUnlockInviteExternalUserMetadata = {
  name: 'unlock_face_unlock_invite_external_user',
  description: `Remotely unlock the specified face unlock invite external user.`,
  inputSchema: UnlockFaceUnlockInviteExternalUserInputSchema,
  outputSchema: UnlockFaceUnlockInviteExternalUserOutputSchema,
  category: 'product/access',
  operationId: 'postFaceUnlockInviteExternalUserViewV2',
  method: 'POST' as const,
  path: '/v2/access/external_users/{external_id}/face_unlock/invite',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
