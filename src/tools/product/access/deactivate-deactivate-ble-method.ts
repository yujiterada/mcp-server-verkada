/**
 * DeactivateDeactivateBleMethod Tool
 *
 * Disable BLE unlock for the specified deactivate ble method.
 *
 * @category product/access
 * @operationId putDeactivateBLEMethodViewV1
 * @method PUT
 * @path /access/v1/access_users/user/ble/deactivate
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
 * Input parameters for deactivateDeactivateBleMethod
 */
const DeactivateDeactivateBleMethodInputSchema = z.object({
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

type DeactivateDeactivateBleMethodInput = z.infer<typeof DeactivateDeactivateBleMethodInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deactivateDeactivateBleMethod
 * OK
 */
const DeactivateDeactivateBleMethodOutputSchema = z.object({
  /** Access Groups to which a user belongs. */
  access_groups: z.array(z.object({ group_id: z.string().uuid().optional(), name: z.string().optional() })).nullable(),
  /** The permission state of a user&#x27;s ability to perform a Bluetooth Unlock. Format is a boolean True or False. Default is False. */
  ble_unlock: z.boolean().nullable(),
  /** Access cards associated with the user. */
  cards: z.array(z.object({ active: z.boolean().optional(), card_id: z.string().optional(), card_number: z.string().optional(), card_number_base36: z.string().optional(), card_number_hex: z.string().optional(), facility_code: z.string().optional(), type: z.string().optional() })).nullable(),
  /** The end time value of the time range controlling when a users credentials are active. Formatted as a Unix timestamp in seconds. Default is Null. */
  end_date: z.string().nullable(),
  /** The access pin code used for keypad readers alone or in 2FA mode. Formatted as a string of digits between 4 and 16 in length. Must be unique within the organization. */
  entry_code: z.string().nullable(),
  /** A unique identifier managed externally provided by the customer. */
  external_id: z.string().nullable(),
  /** The face credential of the user. */
  face_credential: z.object({ source: z.string().optional(), status: z.string() }).nullable(),
  /** A flag that states whether or not the user has a profile photo. */
  has_profile_photo: z.boolean().nullable(),
  /** License plates associated with the user. */
  license_plates: z.array(z.object({ active: z.boolean().optional(), license_plate_number: z.string().optional(), name: z.string() })).nullable(),
  /** MFA codes associated with the user. */
  mfa_codes: z.array(z.object({ code: z.string() })).nullable(),
  /** The timestamp when the user&#x27;s profile photo was last updated. */
  profile_photo_last_updated: z.string().datetime().nullable(),
  /** QR codes associated with the user. */
  qr_codes: z.array(z.object({ activation_state: z.string().optional(), active: z.boolean().optional(), card_number: z.string().optional(), card_number_base36: z.string().optional(), card_number_hex: z.string().optional(), encoding_type: z.string(), facility_code: z.string().optional(), qr_code: z.string().optional() })).nullable(),
  /** The permission state of a user&#x27;s ability to perform a Remote Unlock. Format is a boolean True or False. Default is False. */
  remote_unlock: z.boolean().nullable(),
  /** The start time value of the time range controlling when a users credentials are active. Formatted as a Unix timestamp in seconds. Default is Null. */
  start_date: z.string().nullable(),
  /** The unique identifier of the user managed by Verkada. */
  user_id: z.string().uuid().nullable(),
});

type DeactivateDeactivateBleMethodOutput = z.infer<typeof DeactivateDeactivateBleMethodOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Disable BLE unlock for the specified deactivate ble method.
 *
 * @param input.query.user_id - The user_id parameter
 * @param input.query.external_id - The external_id parameter
 * @param input.query.email - The email parameter
 * @param input.query.employee_id - The employee_id parameter
 * @returns OK
 */
export async function deactivateDeactivateBleMethod(
  input: DeactivateDeactivateBleMethodInput
): Promise<APIResponse<DeactivateDeactivateBleMethodOutput>> {
  // Validate input
  const validated = DeactivateDeactivateBleMethodInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/access_users/user/ble/deactivate';

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
  const response = await callVerkadaAPI<DeactivateDeactivateBleMethodOutput>({
    method: 'PUT',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeactivateDeactivateBleMethodOutputSchema.parse(response.data);
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
export const deactivateDeactivateBleMethodMetadata = {
  name: 'deactivate_deactivate_ble_method',
  description: `Disable BLE unlock for the specified deactivate ble method.`,
  inputSchema: DeactivateDeactivateBleMethodInputSchema,
  outputSchema: DeactivateDeactivateBleMethodOutputSchema,
  category: 'product/access',
  operationId: 'putDeactivateBLEMethodViewV1',
  method: 'PUT' as const,
  path: '/access/v1/access_users/user/ble/deactivate',
  requiresAuth: true,
  tags: ['Access User Information'],
};
