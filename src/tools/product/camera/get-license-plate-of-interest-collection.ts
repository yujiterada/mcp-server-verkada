/**
 * GetLicensePlateOfInterestCollection Tool
 *
 * Get a specific license plate of interest collection by ID. Returns detailed information about the license plate of interest collection. Supports pagination.
 *
 * @category product/camera
 * @operationId getLicensePlateOfInterestCollectionViewV2
 * @method GET
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
 * Input parameters for getLicensePlateOfInterestCollection
 */
const GetLicensePlateOfInterestCollectionInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The limit parameter */
    limit: z.number().int().min(0).max(10000).optional(),
    /** The cursor parameter */
    cursor: z.string().optional(),
  }),
});

type GetLicensePlateOfInterestCollectionInput = z.infer<typeof GetLicensePlateOfInterestCollectionInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getLicensePlateOfInterestCollection
 * OK
 */
const GetLicensePlateOfInterestCollectionOutputSchema = z.object({
  /** Pagination cursor for the next page of results. Null if no more pages. */
  cursor: z.string().nullable(),
  /** List of License Plates of Interest. */
  items: z.array(z.object({ created_at: z.string().nullable().optional(), description: z.string().nullable().optional(), license_plate: z.string().nullable().optional() })).nullable(),
});

type GetLicensePlateOfInterestCollectionOutput = z.infer<typeof GetLicensePlateOfInterestCollectionOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific license plate of interest collection by ID. Returns detailed information about the license plate of interest collection. Supports pagination.
 *
 * @param input.query.limit - The limit parameter
 * @param input.query.cursor - The cursor parameter
 * @returns OK
 */
export async function getLicensePlateOfInterestCollection(
  input: GetLicensePlateOfInterestCollectionInput
): Promise<APIResponse<GetLicensePlateOfInterestCollectionOutput>> {
  // Validate input
  const validated = GetLicensePlateOfInterestCollectionInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/lpr/license_plates_of_interest';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.limit !== undefined) {
    queryParams.set('limit', String(validated.query.limit));
  }
  if (validated.query.cursor !== undefined) {
    queryParams.set('cursor', String(validated.query.cursor));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetLicensePlateOfInterestCollectionOutput>({
    method: 'GET',
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
export const getLicensePlateOfInterestCollectionMetadata = {
  name: 'get_license_plate_of_interest_collection',
  description: `Get a specific license plate of interest collection by ID. Returns detailed information about the license plate of interest collection. Supports pagination.`,
  inputSchema: GetLicensePlateOfInterestCollectionInputSchema,
  outputSchema: GetLicensePlateOfInterestCollectionOutputSchema,
  category: 'product/camera',
  operationId: 'getLicensePlateOfInterestCollectionViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/lpr/license_plates_of_interest',
  requiresAuth: true,
  tags: ['LPR'],
};
