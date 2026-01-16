/**
 * GetLicensePlateOfInterest Tool
 *
 * Get a specific license plate of interest by ID. Returns detailed information about the license plate of interest.
 *
 * @category product/camera
 * @operationId getLicensePlateOfInterestViewV1
 * @method GET
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
 * Input parameters for getLicensePlateOfInterest
 */
const GetLicensePlateOfInterestInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The page_size parameter */
    page_size: z.number().int().min(0).max(10000).optional(),
    /** The page_token parameter */
    page_token: z.string().optional(),
  }),
});

type GetLicensePlateOfInterestInput = z.infer<typeof GetLicensePlateOfInterestInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getLicensePlateOfInterest
 * OK
 */
const GetLicensePlateOfInterestOutputSchema = z.object({
  /** A list of License Plates of Interest. */
  license_plate_of_interest: z.array(z.object({ creation_time: z.number().int().optional(), description: z.string().optional(), license_plate: z.string().optional() })),
  /** The pagination token used to fetch the next page of results. */
  next_page_token: z.string().nullable(),
});

type GetLicensePlateOfInterestOutput = z.infer<typeof GetLicensePlateOfInterestOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific license plate of interest by ID. Returns detailed information about the license plate of interest.
 *
 * @param input.query.page_size - The page_size parameter
 * @param input.query.page_token - The page_token parameter
 * @returns OK
 */
export async function getLicensePlateOfInterest(
  input: GetLicensePlateOfInterestInput
): Promise<APIResponse<GetLicensePlateOfInterestOutput>> {
  // Validate input
  const validated = GetLicensePlateOfInterestInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/analytics/lpr/license_plate_of_interest';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.page_size !== undefined) {
    queryParams.set('page_size', String(validated.query.page_size));
  }
  if (validated.query.page_token !== undefined) {
    queryParams.set('page_token', String(validated.query.page_token));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetLicensePlateOfInterestOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetLicensePlateOfInterestOutputSchema.parse(response.data);
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
export const getLicensePlateOfInterestMetadata = {
  name: 'get_license_plate_of_interest',
  description: `Get a specific license plate of interest by ID. Returns detailed information about the license plate of interest.`,
  inputSchema: GetLicensePlateOfInterestInputSchema,
  outputSchema: GetLicensePlateOfInterestOutputSchema,
  category: 'product/camera',
  operationId: 'getLicensePlateOfInterestViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/analytics/lpr/license_plate_of_interest',
  requiresAuth: true,
  tags: ['LPR'],
};
