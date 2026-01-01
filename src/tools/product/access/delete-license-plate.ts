/**
 * DeleteLicensePlate Tool
 *
 * Delete a license plate. This action cannot be undone.
 *
 * @category product/access
 * @operationId deleteLicensePlateViewV1
 * @method DELETE
 * @path /access/v1/credentials/license_plate
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
 * Input parameters for deleteLicensePlate
 */
const DeleteLicensePlateInputSchema = z.object({
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

type DeleteLicensePlateInput = z.infer<typeof DeleteLicensePlateInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteLicensePlate
 * ok
 */
const DeleteLicensePlateOutputSchema = z.object({
});

type DeleteLicensePlateOutput = z.infer<typeof DeleteLicensePlateOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a license plate. This action cannot be undone.
 *
 * @param input.query.external_id - The external_id parameter
 * @param input.query.user_id - The user_id parameter
 * @param input.query.license_plate_number - The license_plate_number parameter
 * @returns ok
 */
export async function deleteLicensePlate(
  input: DeleteLicensePlateInput
): Promise<APIResponse<DeleteLicensePlateOutput>> {
  // Validate input
  const validated = DeleteLicensePlateInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/credentials/license_plate';

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
  const response = await callVerkadaAPI<DeleteLicensePlateOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteLicensePlateOutputSchema.parse(response.data);
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
export const deleteLicensePlateMetadata = {
  name: 'delete_license_plate',
  description: `Delete a license plate. This action cannot be undone.`,
  inputSchema: DeleteLicensePlateInputSchema,
  outputSchema: DeleteLicensePlateOutputSchema,
  category: 'product/access',
  operationId: 'deleteLicensePlateViewV1',
  method: 'DELETE' as const,
  path: '/access/v1/credentials/license_plate',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
