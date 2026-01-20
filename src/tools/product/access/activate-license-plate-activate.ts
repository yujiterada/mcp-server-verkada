/**
 * ActivateLicensePlateActivate Tool
 *
 * Enable this feature for the specified license plate activate.
 *
 * @category product/access
 * @operationId putLicensePlateActivateViewV1
 * @method PUT
 * @path /access/v1/credentials/license_plate/activate
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
 * Input parameters for activateLicensePlateActivate
 */
const ActivateLicensePlateActivateInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The external_id parameter */
    external_id: z.string().optional(),
    /** The user_id parameter */
    user_id: z.string().uuid().optional(),
    /** The license_plate_number parameter (required) */
    license_plate_number: z.string(),
  }),
});

type ActivateLicensePlateActivateInput = z.infer<typeof ActivateLicensePlateActivateInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for activateLicensePlateActivate
 * OK
 */
const ActivateLicensePlateActivateOutputSchema = z.object({
  /** Bool value specifying if the license plate credential is currently active. Default value is False. */
  active: z.boolean().nullable(),
  /** The unique license plate number identifying a license plate credential for a user. */
  license_plate_number: z.string().nullable(),
  /** The name to be given to the license plate credential. */
  name: z.string().nullable(),
});

type ActivateLicensePlateActivateOutput = z.infer<typeof ActivateLicensePlateActivateOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Enable this feature for the specified license plate activate.
 *
 * @param input.query.external_id - The external_id parameter
 * @param input.query.user_id - The user_id parameter
 * @param input.query.license_plate_number - The license_plate_number parameter
 * @returns OK
 */
export async function activateLicensePlateActivate(
  input: ActivateLicensePlateActivateInput
): Promise<APIResponse<ActivateLicensePlateActivateOutput>> {
  // Validate input
  const validated = ActivateLicensePlateActivateInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/credentials/license_plate/activate';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.external_id !== undefined) {
    queryParams.set('external_id', String(validated.query.external_id));
  }
  if (validated.query.user_id !== undefined) {
    queryParams.set('user_id', String(validated.query.user_id));
  }
  if (validated.query.license_plate_number !== undefined) {
    queryParams.set('license_plate_number', String(validated.query.license_plate_number));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<ActivateLicensePlateActivateOutput>({
    method: 'PUT',
    path: fullPath,
  });

  return response;
}

// ============================================================================
// TOOL METADATA
// ============================================================================

/**
 * Metadata for MCP tool registration
 */
export const activateLicensePlateActivateMetadata = {
  name: 'activate_license_plate_activate',
  description: `Enable this feature for the specified license plate activate.`,
  inputSchema: ActivateLicensePlateActivateInputSchema,
  outputSchema: ActivateLicensePlateActivateOutputSchema,
  category: 'product/access',
  operationId: 'putLicensePlateActivateViewV1',
  method: 'PUT' as const,
  path: '/access/v1/credentials/license_plate/activate',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
