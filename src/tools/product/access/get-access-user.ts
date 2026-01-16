/**
 * GetAccessUser Tool
 *
 * Get a specific access user by ID. Returns detailed information about the access user.
 *
 * @category product/access
 * @operationId getAccessUserViewV1
 * @method GET
 * @path /access/v1/access_users/user
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
 * Input parameters for getAccessUser
 */
const GetAccessUserInputSchema = z.object({
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

type GetAccessUserInput = z.infer<typeof GetAccessUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getAccessUser
 * OK
 */
const GetAccessUserOutputSchema = z.object({
  /** Access Groups to which a user belongs. */
  access_groups: z.array(z.object({ group_id: z.string().uuid().optional(), name: z.string().optional() })),
  /** The permission state of a user&#x27;s ability to perform a Bluetooth Unlock. Format is a boolean True or False. Default is False. */
  ble_unlock: z.boolean(),
  /** Access cards associated with the user. */
  cards: z.array(z.object({ active: z.boolean().optional(), card_id: z.string().optional(), card_number: z.string().optional(), card_number_base36: z.string().optional(), card_number_hex: z.string().optional(), facility_code: z.string().optional(), type: z.string().optional() })),
  /** The end time value of the time range controlling when a users credentials are active. Formatted as a Unix timestamp in seconds. Default is Null. */
  end_date: z.string(),
  /** The access pin code used for keypad readers alone or in 2FA mode. Formatted as a string of digits between 4 and 16 in length. Must be unique within the organization. */
  entry_code: z.string(),
  /** A unique identifier managed externally provided by the customer. */
  external_id: z.string(),
  /** The face credential of the user. */
  face_credential: z.object({ source: z.string().optional(), status: z.string() }),
  /** A flag that states whether or not the user has a profile photo. */
  has_profile_photo: z.boolean(),
  /** License plates associated with the user. */
  license_plates: z.array(z.object({ active: z.boolean().optional(), license_plate_number: z.string().optional(), name: z.string() })),
  /** MFA codes associated with the user. */
  mfa_codes: z.array(z.object({ code: z.string() })),
  /** The timestamp when the user&#x27;s profile photo was last updated. */
  profile_photo_last_updated: z.string().datetime(),
  /** QR codes associated with the user. */
  qr_codes: z.array(z.object({ activation_state: z.string().optional(), active: z.boolean().optional(), card_number: z.string().optional(), card_number_base36: z.string().optional(), card_number_hex: z.string().optional(), encoding_type: z.string(), facility_code: z.string().optional(), qr_code: z.string().optional() })),
  /** The permission state of a user&#x27;s ability to perform a Remote Unlock. Format is a boolean True or False. Default is False. */
  remote_unlock: z.boolean(),
  /** The start time value of the time range controlling when a users credentials are active. Formatted as a Unix timestamp in seconds. Default is Null. */
  start_date: z.string(),
  /** The unique identifier of the user managed by Verkada. */
  user_id: z.string().uuid(),
});

type GetAccessUserOutput = z.infer<typeof GetAccessUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific access user by ID. Returns detailed information about the access user.
 *
 * @param input.query.user_id - The user_id parameter
 * @param input.query.external_id - The external_id parameter
 * @param input.query.email - The email parameter
 * @param input.query.employee_id - The employee_id parameter
 * @returns OK
 */
export async function getAccessUser(
  input: GetAccessUserInput
): Promise<APIResponse<GetAccessUserOutput>> {
  // Validate input
  const validated = GetAccessUserInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/access_users/user';

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
  const response = await callVerkadaAPI<GetAccessUserOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetAccessUserOutputSchema.parse(response.data);
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
export const getAccessUserMetadata = {
  name: 'get_access_user',
  description: `Get a specific access user by ID. Returns detailed information about the access user.`,
  inputSchema: GetAccessUserInputSchema,
  outputSchema: GetAccessUserOutputSchema,
  category: 'product/access',
  operationId: 'getAccessUserViewV1',
  method: 'GET' as const,
  path: '/access/v1/access_users/user',
  requiresAuth: true,
  tags: ['Access User Information'],
};
