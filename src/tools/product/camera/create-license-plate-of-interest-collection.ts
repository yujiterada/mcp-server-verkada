/**
 * CreateLicensePlateOfInterestCollection Tool
 *
 * Create a new license plate of interest collection. Provide the required fields in the request body.
 *
 * @category product/camera
 * @operationId postLicensePlateOfInterestCollectionViewV2
 * @method POST
 * @path /v2/cameras/lpr/license_plates_of_interest
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
 * Input parameters for createLicensePlateOfInterestCollection
 */
const CreateLicensePlateOfInterestCollectionInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** The description for the License Plate of Interest. (required) */
    description: z.string(),
    /** The license plate number of the License Plate of Interest. (required) */
    license_plate: z.string().min(1).max(11),
  }),
});

type CreateLicensePlateOfInterestCollectionInput = z.infer<typeof CreateLicensePlateOfInterestCollectionInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createLicensePlateOfInterestCollection
 * ok
 */
const CreateLicensePlateOfInterestCollectionOutputSchema = z.object({
});

type CreateLicensePlateOfInterestCollectionOutput = z.infer<typeof CreateLicensePlateOfInterestCollectionOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new license plate of interest collection. Provide the required fields in the request body.
 *
 * @param input.body.description - The description for the License Plate of Interest.
 * @param input.body.license_plate - The license plate number of the License Plate of Interest.
 * @returns ok
 */
export async function createLicensePlateOfInterestCollection(
  input: CreateLicensePlateOfInterestCollectionInput
): Promise<APIResponse<CreateLicensePlateOfInterestCollectionOutput>> {
  // Validate input
  const validated = CreateLicensePlateOfInterestCollectionInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/lpr/license_plates_of_interest';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateLicensePlateOfInterestCollectionOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      description: validated.body.description,
      license_plate: validated.body.license_plate,
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
export const createLicensePlateOfInterestCollectionMetadata = {
  name: 'create_license_plate_of_interest_collection',
  description: `Create a new license plate of interest collection. Provide the required fields in the request body.`,
  inputSchema: CreateLicensePlateOfInterestCollectionInputSchema,
  outputSchema: CreateLicensePlateOfInterestCollectionOutputSchema,
  category: 'product/camera',
  operationId: 'postLicensePlateOfInterestCollectionViewV2',
  method: 'POST' as const,
  path: '/v2/cameras/lpr/license_plates_of_interest',
  requiresAuth: true,
  tags: ['LPR'],
};
