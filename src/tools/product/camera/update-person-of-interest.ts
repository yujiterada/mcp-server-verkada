/**
 * UpdatePersonOfInterest Tool
 *
 * Update an existing person of interest. Only the provided fields will be changed.
 *
 * @category product/camera
 * @operationId patchPersonOfInterestViewV1
 * @method PATCH
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
 * Input parameters for updatePersonOfInterest
 */
const UpdatePersonOfInterestInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The person_id parameter (required) */
    person_id: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** The name/label of the Person of Interest. (required) */
    label: z.string(),
  }),
});

type UpdatePersonOfInterestInput = z.infer<typeof UpdatePersonOfInterestInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updatePersonOfInterest
 * OK
 */
const UpdatePersonOfInterestOutputSchema = z.object({
  /** The timestamp when the Person of Interest was created.
Formatted as a Unix timestamp in seconds. */
  created: z.number().int().nullable(),
  /** The name/label of the Person of Interest. */
  label: z.string().nullable(),
  /** The timestamp when the Person of Interest was last seen.
Formatted as a Unix timestamp in seconds. */
  last_seen: z.number().int().nullable(),
  /** The unique identifier of the Person of Interest. */
  person_id: z.string().uuid().nullable(),
});

type UpdatePersonOfInterestOutput = z.infer<typeof UpdatePersonOfInterestOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing person of interest. Only the provided fields will be changed.
 *
 * @param input.query.person_id - The person_id parameter
 * @param input.body.label - The name/label of the Person of Interest.
 * @returns OK
 */
export async function updatePersonOfInterest(
  input: UpdatePersonOfInterestInput
): Promise<APIResponse<UpdatePersonOfInterestOutput>> {
  // Validate input
  const validated = UpdatePersonOfInterestInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/people/person_of_interest';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.person_id !== undefined) {
    queryParams.set('person_id', String(validated.query.person_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<UpdatePersonOfInterestOutput>({
    method: 'PATCH',
    path: fullPath,
    body: {
      label: validated.body.label,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = UpdatePersonOfInterestOutputSchema.parse(response.data);
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
export const updatePersonOfInterestMetadata = {
  name: 'update_person_of_interest',
  description: `Update an existing person of interest. Only the provided fields will be changed.`,
  inputSchema: UpdatePersonOfInterestInputSchema,
  outputSchema: UpdatePersonOfInterestOutputSchema,
  category: 'product/camera',
  operationId: 'patchPersonOfInterestViewV1',
  method: 'PATCH' as const,
  path: '/cameras/v1/people/person_of_interest',
  requiresAuth: true,
  tags: ['People'],
};
