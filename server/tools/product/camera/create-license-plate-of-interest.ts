/**
 * CreateLicensePlateOfInterest Tool
 *
 * Create a new license plate of interest. Provide the required fields in the request body.
 *
 * @category product/camera
 * @operationId postLicensePlateOfInterestViewV1
 * @method POST
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
 * Input parameters for createLicensePlateOfInterest
 */
const CreateLicensePlateOfInterestInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** The description for the License Plate of Interest. (required) */
    description: z.string(),
    /** The license plate number of the License Plate of Interest. (required) */
    license_plate: z.string(),
  }),
});

type CreateLicensePlateOfInterestInput = z.infer<typeof CreateLicensePlateOfInterestInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createLicensePlateOfInterest
 * OK
 */
const CreateLicensePlateOfInterestOutputSchema = z.object({
  /** The creation time of the License Plate of Interest. */
  creation_time: z.number().int(),
  /** The description of the License Plate of Interest. */
  description: z.string(),
  /** The license plate number of the License Plate of Interest. */
  license_plate: z.string(),
});

type CreateLicensePlateOfInterestOutput = z.infer<typeof CreateLicensePlateOfInterestOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new license plate of interest. Provide the required fields in the request body.
 *
 * @param input.body.description - The description for the License Plate of Interest.
 * @param input.body.license_plate - The license plate number of the License Plate of Interest.
 * @returns OK
 */
export async function createLicensePlateOfInterest(
  input: CreateLicensePlateOfInterestInput
): Promise<APIResponse<CreateLicensePlateOfInterestOutput>> {
  // Validate input
  const validated = CreateLicensePlateOfInterestInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/analytics/lpr/license_plate_of_interest';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateLicensePlateOfInterestOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      description: validated.body.description,
      license_plate: validated.body.license_plate,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = CreateLicensePlateOfInterestOutputSchema.parse(response.data);
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
export const createLicensePlateOfInterestMetadata = {
  name: 'create_license_plate_of_interest',
  description: `Create a new license plate of interest. Provide the required fields in the request body.`,
  inputSchema: CreateLicensePlateOfInterestInputSchema,
  outputSchema: CreateLicensePlateOfInterestOutputSchema,
  category: 'product/camera',
  operationId: 'postLicensePlateOfInterestViewV1',
  method: 'POST' as const,
  path: '/cameras/v1/analytics/lpr/license_plate_of_interest',
  requiresAuth: true,
  tags: ['LPR'],
};
