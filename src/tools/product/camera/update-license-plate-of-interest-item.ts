/**
 * UpdateLicensePlateOfInterestItem Tool
 *
 * Update an existing license plate of interest item. Only the provided fields will be changed.
 *
 * @category product/camera
 * @operationId patchLicensePlateOfInterestItemViewV2
 * @method PATCH
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
 * Input parameters for updateLicensePlateOfInterestItem
 */
const UpdateLicensePlateOfInterestItemInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The license_plate parameter (required) */
    license_plate: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** The updated description for this License Plate of Interest. (required) */
    description: z.string(),
  }),
});

type UpdateLicensePlateOfInterestItemInput = z.infer<typeof UpdateLicensePlateOfInterestItemInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateLicensePlateOfInterestItem
 * OK
 */
const UpdateLicensePlateOfInterestItemOutputSchema = z.object({
  /** When the License Plate of Interest was created, in RFC 3339 format (e.g., 2025-08-04T21:51:53+00:00). */
  created_at: z.string().nullable(),
  /** The description of the License Plate of Interest. */
  description: z.string().nullable(),
  /** The license plate number of the License Plate of Interest. */
  license_plate: z.string().nullable(),
});

type UpdateLicensePlateOfInterestItemOutput = z.infer<typeof UpdateLicensePlateOfInterestItemOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing license plate of interest item. Only the provided fields will be changed.
 *
 * @param input.path.license_plate - The license_plate parameter
 * @param input.body.description - The updated description for this License Plate of Interest.
 * @returns OK
 */
export async function updateLicensePlateOfInterestItem(
  input: UpdateLicensePlateOfInterestItemInput
): Promise<APIResponse<UpdateLicensePlateOfInterestItemOutput>> {
  // Validate input
  const validated = UpdateLicensePlateOfInterestItemInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/lpr/license_plates_of_interest/{license_plate}';
  path = path.replace('{license_plate}', encodeURIComponent(String(validated.path.license_plate)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UpdateLicensePlateOfInterestItemOutput>({
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
export const updateLicensePlateOfInterestItemMetadata = {
  name: 'update_license_plate_of_interest_item',
  description: `Update an existing license plate of interest item. Only the provided fields will be changed.`,
  inputSchema: UpdateLicensePlateOfInterestItemInputSchema,
  outputSchema: UpdateLicensePlateOfInterestItemOutputSchema,
  category: 'product/camera',
  operationId: 'patchLicensePlateOfInterestItemViewV2',
  method: 'PATCH' as const,
  path: '/v2/cameras/lpr/license_plates_of_interest/{license_plate}',
  requiresAuth: true,
  tags: ['LPR'],
};
