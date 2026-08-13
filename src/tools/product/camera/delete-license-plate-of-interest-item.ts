/**
 * DeleteLicensePlateOfInterestItem Tool
 *
 * Delete a license plate of interest item. This action cannot be undone.
 *
 * @category product/camera
 * @operationId deleteLicensePlateOfInterestItemViewV2
 * @method DELETE
 * @path /v2/cameras/lpr/license_plates_of_interest/{license_plate}
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
 * Input parameters for deleteLicensePlateOfInterestItem
 */
const DeleteLicensePlateOfInterestItemInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The license_plate parameter (required) */
    license_plate: z.string(),
  }),
});

type DeleteLicensePlateOfInterestItemInput = z.infer<typeof DeleteLicensePlateOfInterestItemInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deleteLicensePlateOfInterestItem
 * ok
 */
const DeleteLicensePlateOfInterestItemOutputSchema = z.object({
});

type DeleteLicensePlateOfInterestItemOutput = z.infer<typeof DeleteLicensePlateOfInterestItemOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a license plate of interest item. This action cannot be undone.
 *
 * @param input.path.license_plate - The license_plate parameter
 * @returns ok
 */
export async function deleteLicensePlateOfInterestItem(
  input: DeleteLicensePlateOfInterestItemInput
): Promise<APIResponse<DeleteLicensePlateOfInterestItemOutput>> {
  // Validate input
  const validated = DeleteLicensePlateOfInterestItemInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/lpr/license_plates_of_interest/{license_plate}';
  path = path.replace('{license_plate}', encodeURIComponent(String(validated.path.license_plate)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<DeleteLicensePlateOfInterestItemOutput>({
    method: 'DELETE',
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
export const deleteLicensePlateOfInterestItemMetadata = {
  name: 'delete_license_plate_of_interest_item',
  description: `Delete a license plate of interest item. This action cannot be undone.`,
  inputSchema: DeleteLicensePlateOfInterestItemInputSchema,
  outputSchema: DeleteLicensePlateOfInterestItemOutputSchema,
  category: 'product/camera',
  operationId: 'deleteLicensePlateOfInterestItemViewV2',
  method: 'DELETE' as const,
  path: '/v2/cameras/lpr/license_plates_of_interest/{license_plate}',
  requiresAuth: true,
  tags: ['LPR'],
};
