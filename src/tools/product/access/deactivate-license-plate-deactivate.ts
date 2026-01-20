/**
 * DeactivateLicensePlateDeactivate Tool
 *
 * Disable this feature for the specified license plate deactivate.
 *
 * @category product/access
 * @operationId putLicensePlateDeactivateViewV1
 * @method PUT
 * @path /access/v1/credentials/license_plate/deactivate
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
 * Input parameters for deactivateLicensePlateDeactivate
 */
const DeactivateLicensePlateDeactivateInputSchema = z.object({
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

type DeactivateLicensePlateDeactivateInput = z.infer<typeof DeactivateLicensePlateDeactivateInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deactivateLicensePlateDeactivate
 * OK
 */
const DeactivateLicensePlateDeactivateOutputSchema = z.object({
  /** Bool value specifying if the license plate credential is currently active. Default value is False. */
  active: z.boolean().nullable(),
  /** The unique license plate number identifying a license plate credential for a user. */
  license_plate_number: z.string().nullable(),
  /** The name to be given to the license plate credential. */
  name: z.string().nullable(),
});

type DeactivateLicensePlateDeactivateOutput = z.infer<typeof DeactivateLicensePlateDeactivateOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Disable this feature for the specified license plate deactivate.
 *
 * @param input.query.external_id - The external_id parameter
 * @param input.query.user_id - The user_id parameter
 * @param input.query.license_plate_number - The license_plate_number parameter
 * @returns OK
 */
export async function deactivateLicensePlateDeactivate(
  input: DeactivateLicensePlateDeactivateInput
): Promise<APIResponse<DeactivateLicensePlateDeactivateOutput>> {
  // Validate input
  const validated = DeactivateLicensePlateDeactivateInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/credentials/license_plate/deactivate';

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
  const response = await callVerkadaAPI<DeactivateLicensePlateDeactivateOutput>({
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
export const deactivateLicensePlateDeactivateMetadata = {
  name: 'deactivate_license_plate_deactivate',
  description: `Disable this feature for the specified license plate deactivate.`,
  inputSchema: DeactivateLicensePlateDeactivateInputSchema,
  outputSchema: DeactivateLicensePlateDeactivateOutputSchema,
  category: 'product/access',
  operationId: 'putLicensePlateDeactivateViewV1',
  method: 'PUT' as const,
  path: '/access/v1/credentials/license_plate/deactivate',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
