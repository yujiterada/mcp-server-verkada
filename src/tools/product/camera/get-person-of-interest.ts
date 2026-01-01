/**
 * GetPersonOfInterest Tool
 *
 * Get a specific person of interest by ID. Returns detailed information about the person of interest.
 *
 * @category product/camera
 * @operationId getPersonOfInterestViewV1
 * @method GET
 * @path /cameras/v1/people/person_of_interest
 * @tags People
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
 * Input parameters for getPersonOfInterest
 */
const GetPersonOfInterestInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The page_size parameter */
    page_size: z.number().int().min(0).max(200).optional(),
    /** The page_token parameter */
    page_token: z.string().optional(),
  }),
});

type GetPersonOfInterestInput = z.infer<typeof GetPersonOfInterestInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getPersonOfInterest
 * OK
 */
const GetPersonOfInterestOutputSchema = z.object({
  /** The pagination token used to fetch the next page of results. */
  next_token: z.string(),
  /** A list of Persons of Interest. */
  persons_of_interest: z.array(z.object({ created: z.number().int().optional(), label: z.string().optional(), last_seen: z.number().int().optional(), person_id: z.string().uuid().optional() })),
});

type GetPersonOfInterestOutput = z.infer<typeof GetPersonOfInterestOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific person of interest by ID. Returns detailed information about the person of interest.
 *
 * @param input.query.page_size - The page_size parameter
 * @param input.query.page_token - The page_token parameter
 * @returns OK
 */
export async function getPersonOfInterest(
  input: GetPersonOfInterestInput
): Promise<APIResponse<GetPersonOfInterestOutput>> {
  // Validate input
  const validated = GetPersonOfInterestInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/people/person_of_interest';

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
  const response = await callVerkadaAPI<GetPersonOfInterestOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetPersonOfInterestOutputSchema.parse(response.data);
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
export const getPersonOfInterestMetadata = {
  name: 'get_person_of_interest',
  description: `Get a specific person of interest by ID. Returns detailed information about the person of interest.`,
  inputSchema: GetPersonOfInterestInputSchema,
  outputSchema: GetPersonOfInterestOutputSchema,
  category: 'product/camera',
  operationId: 'getPersonOfInterestViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/people/person_of_interest',
  requiresAuth: true,
  tags: ['People'],
};
