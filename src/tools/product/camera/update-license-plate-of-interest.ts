/**
 * UpdateLicensePlateOfInterest Tool
 *
 * Update an existing license plate of interest. Only the provided fields will be changed.
 *
 * @category product/camera
 * @operationId patchLicensePlateOfInterestViewV1
 * @method PATCH
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
 * Input parameters for updateLicensePlateOfInterest
 */
const UpdateLicensePlateOfInterestInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The license_plate parameter (required) */
    license_plate: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** The description for this License Plate of Interest. (required) */
    description: z.string(),
  }),
});

type UpdateLicensePlateOfInterestInput = z.infer<typeof UpdateLicensePlateOfInterestInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateLicensePlateOfInterest
 * OK
 */
const UpdateLicensePlateOfInterestOutputSchema = z.object({
  /** The creation time of the License Plate of Interest. */
  creation_time: z.number().int().nullable(),
  /** The description of the License Plate of Interest. */
  description: z.string().nullable(),
  /** The license plate number of the License Plate of Interest. */
  license_plate: z.string().nullable(),
});

type UpdateLicensePlateOfInterestOutput = z.infer<typeof UpdateLicensePlateOfInterestOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing license plate of interest. Only the provided fields will be changed.
 *
 * @param input.query.license_plate - The license_plate parameter
 * @param input.body.description - The description for this License Plate of Interest.
 * @returns OK
 */
export async function updateLicensePlateOfInterest(
  input: UpdateLicensePlateOfInterestInput
): Promise<APIResponse<UpdateLicensePlateOfInterestOutput>> {
  // Validate input
  const validated = UpdateLicensePlateOfInterestInputSchema.parse(input);

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
  const response = await callVerkadaAPI<UpdateLicensePlateOfInterestOutput>({
    method: 'PATCH',
    path: fullPath,
    body: {
      description: validated.body.description,
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
export const updateLicensePlateOfInterestMetadata = {
  name: 'update_license_plate_of_interest',
  description: `Update an existing license plate of interest. Only the provided fields will be changed.`,
  inputSchema: UpdateLicensePlateOfInterestInputSchema,
  outputSchema: UpdateLicensePlateOfInterestOutputSchema,
  category: 'product/camera',
  operationId: 'patchLicensePlateOfInterestViewV1',
  method: 'PATCH' as const,
  path: '/cameras/v1/analytics/lpr/license_plate_of_interest',
  requiresAuth: true,
  tags: ['LPR'],
};
