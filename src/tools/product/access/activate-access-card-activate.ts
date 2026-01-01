/**
 * ActivateAccessCardActivate Tool
 *
 * Enable this feature for the specified access card activate.
 *
 * @category product/access
 * @operationId putAccessCardActivateViewV1
 * @method PUT
 * @path /access/v1/credentials/card/activate
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
 * Input parameters for activateAccessCardActivate
 */
const ActivateAccessCardActivateInputSchema = z.object({
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

type ActivateAccessCardActivateInput = z.infer<typeof ActivateAccessCardActivateInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for activateAccessCardActivate
 * OK
 */
const ActivateAccessCardActivateOutputSchema = z.object({
  /** Bool value specifying if the credential is currently active. Can be True or False. Default value is False. */
  active: z.boolean(),
  /** The unique identifier of the Access Card managed by Verkada. */
  card_id: z.string(),
  /** The card number  used to grant or deny access to a door. */
  card_number: z.string(),
  /** The card number in base36 used to grant or deny access to a door. */
  card_number_base36: z.string(),
  /** The card number in hexadecimal used to grant or deny access to a door. */
  card_number_hex: z.string(),
  /** The facility code used to grant or deny access to a door. */
  facility_code: z.string(),
  /** The type of card used during the credential evaluation process. */
  type: z.string(),
});

type ActivateAccessCardActivateOutput = z.infer<typeof ActivateAccessCardActivateOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Enable this feature for the specified access card activate.
 *
 * @param input.query.external_id - The external_id parameter
 * @param input.query.user_id - The user_id parameter
 * @param input.query.card_id - The card_id parameter
 * @returns OK
 */
export async function activateAccessCardActivate(
  input: ActivateAccessCardActivateInput
): Promise<APIResponse<ActivateAccessCardActivateOutput>> {
  // Validate input
  const validated = ActivateAccessCardActivateInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/credentials/card/activate';

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
  const response = await callVerkadaAPI<ActivateAccessCardActivateOutput>({
    method: 'PUT',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = ActivateAccessCardActivateOutputSchema.parse(response.data);
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
export const activateAccessCardActivateMetadata = {
  name: 'activate_access_card_activate',
  description: `Enable this feature for the specified access card activate.`,
  inputSchema: ActivateAccessCardActivateInputSchema,
  outputSchema: ActivateAccessCardActivateOutputSchema,
  category: 'product/access',
  operationId: 'putAccessCardActivateViewV1',
  method: 'PUT' as const,
  path: '/access/v1/credentials/card/activate',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
