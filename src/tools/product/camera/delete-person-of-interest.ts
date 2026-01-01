/**
 * DeletePersonOfInterest Tool
 *
 * Delete a person of interest. This action cannot be undone.
 *
 * @category product/camera
 * @operationId deletePersonOfInterestViewV1
 * @method DELETE
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
 * Input parameters for deletePersonOfInterest
 */
const DeletePersonOfInterestInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The person_id parameter (required) */
    person_id: z.string(),
  }),
});

type DeletePersonOfInterestInput = z.infer<typeof DeletePersonOfInterestInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for deletePersonOfInterest
 * OK
 */
const DeletePersonOfInterestOutputSchema = z.object({
  /** The timestamp when the Person of Interest was created.
Formatted as a Unix timestamp in seconds. */
  created: z.number().int(),
  /** The name/label of the Person of Interest. */
  label: z.string(),
  /** The timestamp when the Person of Interest was last seen.
Formatted as a Unix timestamp in seconds. */
  last_seen: z.number().int(),
  /** The unique identifier of the Person of Interest. */
  person_id: z.string().uuid(),
});

type DeletePersonOfInterestOutput = z.infer<typeof DeletePersonOfInterestOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Delete a person of interest. This action cannot be undone.
 *
 * @param input.query.person_id - The person_id parameter
 * @returns OK
 */
export async function deletePersonOfInterest(
  input: DeletePersonOfInterestInput
): Promise<APIResponse<DeletePersonOfInterestOutput>> {
  // Validate input
  const validated = DeletePersonOfInterestInputSchema.parse(input);

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
  const response = await callVerkadaAPI<DeletePersonOfInterestOutput>({
    method: 'DELETE',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = DeletePersonOfInterestOutputSchema.parse(response.data);
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
export const deletePersonOfInterestMetadata = {
  name: 'delete_person_of_interest',
  description: `Delete a person of interest. This action cannot be undone.`,
  inputSchema: DeletePersonOfInterestInputSchema,
  outputSchema: DeletePersonOfInterestOutputSchema,
  category: 'product/camera',
  operationId: 'deletePersonOfInterestViewV1',
  method: 'DELETE' as const,
  path: '/cameras/v1/people/person_of_interest',
  requiresAuth: true,
  tags: ['People'],
};
