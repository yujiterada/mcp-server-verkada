/**
 * DeleteLicensePlateOfInterest Tool
 *
 * Delete a license plate of interest. This action cannot be undone.
 *
 * @category product/camera
 * @operationId deleteLicensePlateOfInterestViewV1
 * @method DELETE
 * @path /cameras/v1/analytics/lpr/license_plate_of_interest
 * @tags LPR
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
 * Input parameters for deleteLicensePlateOfInterest
 */
const DeleteLicensePlateOfInterestInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The license_plate parameter (required) */
    license_plate: z.string(),
  }),
});

type DeleteLicensePlateOfInterestInput = z.infer<typeof DeleteLicensePlateOfInterestInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteLicensePlateOfInterest
 * OK
 */
const DeleteLicensePlateOfInterestOutputSchema = z.object({
  /** The creation time of the License Plate of Interest. */
  creation_time: z.number().int().nullable(),
  /** The description of the License Plate of Interest. */
  description: z.string().nullable(),
  /** The license plate number of the License Plate of Interest. */
  license_plate: z.string().nullable(),
});

type DeleteLicensePlateOfInterestOutput = z.infer<typeof DeleteLicensePlateOfInterestOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a license plate of interest. This action cannot be undone.
 *
 * @param input.query.license_plate - The license_plate parameter
 * @returns OK
 */
export async function deleteLicensePlateOfInterest(
  input: DeleteLicensePlateOfInterestInput
): Promise<APIResponse<DeleteLicensePlateOfInterestOutput>> {
  // Validate input
  const validated = DeleteLicensePlateOfInterestInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/analytics/lpr/license_plate_of_interest';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.license_plate !== undefined) {
    queryParams.set('license_plate', String(validated.query.license_plate));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<DeleteLicensePlateOfInterestOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeleteLicensePlateOfInterestOutputSchema.parse(response.data);
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
export const deleteLicensePlateOfInterestMetadata = {
  name: 'delete_license_plate_of_interest',
  description: `Delete a license plate of interest. This action cannot be undone.`,
  inputSchema: DeleteLicensePlateOfInterestInputSchema,
  outputSchema: DeleteLicensePlateOfInterestOutputSchema,
  category: 'product/camera',
  operationId: 'deleteLicensePlateOfInterestViewV1',
  method: 'DELETE' as const,
  path: '/cameras/v1/analytics/lpr/license_plate_of_interest',
  requiresAuth: true,
  tags: ['LPR'],
};
