/**
 * SearchLicensePlateSearch Tool
 *
 * Search for license plate search matching the provided criteria. Supports pagination.
 *
 * @category product/camera
 * @operationId postLicensePlateSearchViewV2
 * @method POST
 * @path /v2/cameras/ncic/license_plates/search
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
 * Input parameters for searchLicensePlateSearch
 */
const SearchLicensePlateSearchInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** Pagination cursor for retrieving the next page of results. */
    cursor: z.string().optional(),
    /** End time for the search in ISO 8601 format (e.g., &#x27;2025-01-17T23:59:59Z&#x27;). (required) */
    end_time: z.string(),
    /** Polygon coordinates defining the geographic search area. Must have between 3 and 700 coordinate pairs. Events will only be returned if the camera location falls within this polygon. */
    geo_fence: z.array(z.object({ latitude: z.number().min(-90).max(90), longitude: z.number().min(-180).max(180) })).optional(),
    /** License plate pattern to search for. Supports wildcard (*) for flexible matching:
- &#x60;ABC123&#x60; - Exact match
- &#x60;ABC*&#x60; - Starts with &#x27;ABC&#x27;
- &#x60;*123&#x60; - Ends with &#x27;123&#x27;
- &#x60;*BC1*&#x60; - Contains &#x27;BC1&#x27; */
    license_plate: z.string().optional(),
    /** Maximum number of results to return. Default is 100, maximum is 1000. */
    limit: z.number().int().min(0).max(1000).optional(),
    /** Start time for the search in ISO 8601 format (e.g., &#x27;2025-01-17T00:00:00Z&#x27;). (required) */
    start_time: z.string(),
  }),
});

type SearchLicensePlateSearchInput = z.infer<typeof SearchLicensePlateSearchInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for searchLicensePlateSearch
 * OK
 */
const SearchLicensePlateSearchOutputSchema = z.object({
  /** Pagination cursor for retrieving the next page of results. Null if there are no more results. */
  cursor: z.string().nullable(),
  /** List of license plate detection events matching the search criteria. */
  items: z.array(z.object({ additional_image: z.string().nullable().optional(), agency_name: z.string().nullable().optional(), camera_name: z.string().nullable().optional(), event_time: z.string().nullable(), image_data: z.string().nullable().optional(), lat: z.number().nullable(), lon: z.number().nullable(), ori: z.string().nullable().optional(), plate: z.string().nullable(), plate_state: z.string().nullable().optional(), read_id: z.string().nullable(), site_id: z.string().nullable().optional(), user_id: z.string().nullable().optional() })).nullable(),
});

type SearchLicensePlateSearchOutput = z.infer<typeof SearchLicensePlateSearchOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Search for license plate search matching the provided criteria. Supports pagination.
 *
 * @param input.body.cursor - Pagination cursor for retrieving the next page of results.
 * @param input.body.end_time - End time for the search in ISO 8601 format (e.g., &#x27;2025-01-17T23:59:59Z&#x27;).
 * @param input.body.geo_fence - Polygon coordinates defining the geographic search area. Must have between 3 and 700 coordinate pairs. Events will only be returned if the camera location falls within this polygon.
 * @param input.body.license_plate - License plate pattern to search for. Supports wildcard (*) for flexible matching:
- &#x60;ABC123&#x60; - Exact match
- &#x60;ABC*&#x60; - Starts with &#x27;ABC&#x27;
- &#x60;*123&#x60; - Ends with &#x27;123&#x27;
- &#x60;*BC1*&#x60; - Contains &#x27;BC1&#x27;
 * @param input.body.limit - Maximum number of results to return. Default is 100, maximum is 1000.
 * @param input.body.start_time - Start time for the search in ISO 8601 format (e.g., &#x27;2025-01-17T00:00:00Z&#x27;).
 * @returns OK
 */
export async function searchLicensePlateSearch(
  input: SearchLicensePlateSearchInput
): Promise<APIResponse<SearchLicensePlateSearchOutput>> {
  // Validate input
  const validated = SearchLicensePlateSearchInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/ncic/license_plates/search';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<SearchLicensePlateSearchOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      cursor: validated.body.cursor,
      end_time: validated.body.end_time,
      geo_fence: validated.body.geo_fence,
      license_plate: validated.body.license_plate,
      limit: validated.body.limit,
      start_time: validated.body.start_time,
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
export const searchLicensePlateSearchMetadata = {
  name: 'search_license_plate_search',
  description: `Search for license plate search matching the provided criteria. Supports pagination.`,
  inputSchema: SearchLicensePlateSearchInputSchema,
  outputSchema: SearchLicensePlateSearchOutputSchema,
  category: 'product/camera',
  operationId: 'postLicensePlateSearchViewV2',
  method: 'POST' as const,
  path: '/v2/cameras/ncic/license_plates/search',
  requiresAuth: true,
  tags: ['LPR'],
};
