/**
 * CreateLicensePlateOfInterestBulkOperation Tool
 *
 * Create a new license plate of interest bulk operation. Provide the required fields in the request body.
 *
 * @category product/camera
 * @operationId postLicensePlateOfInterestBulkOperationViewV1
 * @method POST
 * @path /cameras/v1/analytics/lpr/license_plate_of_interest/batch
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
 * Input parameters for createLicensePlateOfInterestBulkOperation
 */
const CreateLicensePlateOfInterestBulkOperationInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** The csv file containing license plates to be added to the License Plate of Interest list.            The column headers for the csv file should be &quot;License Plate&quot;, &quot;Name&quot; for creating LPOIs.            The column headers for the csv file should be &quot;License Plate&quot; for deleting LPOIs. */
    file: z.string().optional(),
  }),
});

type CreateLicensePlateOfInterestBulkOperationInput = z.infer<typeof CreateLicensePlateOfInterestBulkOperationInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createLicensePlateOfInterestBulkOperation
 * OK
 */
const CreateLicensePlateOfInterestBulkOperationOutputSchema = z.object({
  /** The time at which the csv file was uploaded. */
  addedMs: z.number().int().nullable(),
});

type CreateLicensePlateOfInterestBulkOperationOutput = z.infer<typeof CreateLicensePlateOfInterestBulkOperationOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new license plate of interest bulk operation. Provide the required fields in the request body.
 *
 * @param input.body.file - The csv file containing license plates to be added to the License Plate of Interest list.            The column headers for the csv file should be &quot;License Plate&quot;, &quot;Name&quot; for creating LPOIs.            The column headers for the csv file should be &quot;License Plate&quot; for deleting LPOIs.
 * @returns OK
 */
export async function createLicensePlateOfInterestBulkOperation(
  input: CreateLicensePlateOfInterestBulkOperationInput
): Promise<APIResponse<CreateLicensePlateOfInterestBulkOperationOutput>> {
  // Validate input
  const validated = CreateLicensePlateOfInterestBulkOperationInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/analytics/lpr/license_plate_of_interest/batch';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateLicensePlateOfInterestBulkOperationOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      file: validated.body.file,
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
export const createLicensePlateOfInterestBulkOperationMetadata = {
  name: 'create_license_plate_of_interest_bulk_operation',
  description: `Create a new license plate of interest bulk operation. Provide the required fields in the request body.`,
  inputSchema: CreateLicensePlateOfInterestBulkOperationInputSchema,
  outputSchema: CreateLicensePlateOfInterestBulkOperationOutputSchema,
  category: 'product/camera',
  operationId: 'postLicensePlateOfInterestBulkOperationViewV1',
  method: 'POST' as const,
  path: '/cameras/v1/analytics/lpr/license_plate_of_interest/batch',
  requiresAuth: true,
  tags: ['LPR'],
};
