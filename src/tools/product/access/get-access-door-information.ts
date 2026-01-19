/**
 * GetAccessDoorInformation Tool
 *
 * Get a specific access door information by ID. Returns detailed information about the access door information.
 *
 * @category product/access
 * @operationId getAccessDoorInformationViewV1
 * @method GET
 * @path /access/v1/doors
 * @tags Access Doors
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
 * Input parameters for getAccessDoorInformation
 */
const GetAccessDoorInformationInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The door_ids parameter */
    door_ids: z.string().optional(),
    /** The site_ids parameter */
    site_ids: z.string().optional(),
  }),
});

type GetAccessDoorInformationInput = z.infer<typeof GetAccessDoorInformationInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getAccessDoorInformation
 * OK
 */
const GetAccessDoorInformationOutputSchema = z.object({
  /** A DoorInformationObject per requested door. */
  doors: z.array(z.object({ accessControllerId: z.string().optional(), accessControllerName: z.string().optional(), name: z.string().optional() })).nullable(),
});

type GetAccessDoorInformationOutput = z.infer<typeof GetAccessDoorInformationOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific access door information by ID. Returns detailed information about the access door information.
 *
 * @param input.query.door_ids - The door_ids parameter
 * @param input.query.site_ids - The site_ids parameter
 * @returns OK
 */
export async function getAccessDoorInformation(
  input: GetAccessDoorInformationInput
): Promise<APIResponse<GetAccessDoorInformationOutput>> {
  // Validate input
  const validated = GetAccessDoorInformationInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/doors';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.door_ids !== undefined) {
    queryParams.set('door_ids', String(validated.query.door_ids));
  }
  if (validated.query.site_ids !== undefined) {
    queryParams.set('site_ids', String(validated.query.site_ids));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetAccessDoorInformationOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetAccessDoorInformationOutputSchema.parse(response.data);
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
export const getAccessDoorInformationMetadata = {
  name: 'get_access_door_information',
  description: `Get a specific access door information by ID. Returns detailed information about the access door information.`,
  inputSchema: GetAccessDoorInformationInputSchema,
  outputSchema: GetAccessDoorInformationOutputSchema,
  category: 'product/access',
  operationId: 'getAccessDoorInformationViewV1',
  method: 'GET' as const,
  path: '/access/v1/doors',
  requiresAuth: true,
  tags: ['Access Doors'],
};
