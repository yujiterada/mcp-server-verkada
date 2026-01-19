/**
 * CreatePersonOfInterest Tool
 *
 * Create a new person of interest. Provide the required fields in the request body.
 *
 * @category product/camera
 * @operationId postPersonOfInterestViewV1
 * @method POST
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
 * Input parameters for createPersonOfInterest
 */
const CreatePersonOfInterestInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** The base64 encoded string of the face image of the Person of Interest. (required) */
    base64_image: z.string(),
    /** The name/label of the Person of Interest. (required) */
    label: z.string(),
  }),
});

type CreatePersonOfInterestInput = z.infer<typeof CreatePersonOfInterestInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createPersonOfInterest
 * OK
 */
const CreatePersonOfInterestOutputSchema = z.object({
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

type CreatePersonOfInterestOutput = z.infer<typeof CreatePersonOfInterestOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new person of interest. Provide the required fields in the request body.
 *
 * @param input.body.base64_image - The base64 encoded string of the face image of the Person of Interest.
 * @param input.body.label - The name/label of the Person of Interest.
 * @returns OK
 */
export async function createPersonOfInterest(
  input: CreatePersonOfInterestInput
): Promise<APIResponse<CreatePersonOfInterestOutput>> {
  // Validate input
  const validated = CreatePersonOfInterestInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/people/person_of_interest';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreatePersonOfInterestOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      base64_image: validated.body.base64_image,
      label: validated.body.label,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = CreatePersonOfInterestOutputSchema.parse(response.data);
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
export const createPersonOfInterestMetadata = {
  name: 'create_person_of_interest',
  description: `Create a new person of interest. Provide the required fields in the request body.`,
  inputSchema: CreatePersonOfInterestInputSchema,
  outputSchema: CreatePersonOfInterestOutputSchema,
  category: 'product/camera',
  operationId: 'postPersonOfInterestViewV1',
  method: 'POST' as const,
  path: '/cameras/v1/people/person_of_interest',
  requiresAuth: true,
  tags: ['People'],
};
