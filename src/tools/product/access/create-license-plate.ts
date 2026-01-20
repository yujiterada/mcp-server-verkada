/**
 * CreateLicensePlate Tool
 *
 * Create a new license plate. Provide the required fields in the request body.
 *
 * @category product/access
 * @operationId postLicensePlateViewV1
 * @method POST
 * @path /access/v1/credentials/license_plate
 * @tags Access Credentials
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
 * Input parameters for createLicensePlate
 */
const CreateLicensePlateInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The external_id parameter */
    external_id: z.string().optional(),
    /** The user_id parameter */
    user_id: z.string().uuid().optional(),
  }),
  /** Body parameters */
  body: z.object({
    /** Bool value specifying if the license plate credential is currently active. Default value is False. */
    active: z.boolean().optional(),
    /** The unique license plate number identifying a license plate credential for a user. (required) */
    license_plate_number: z.string(),
    /** The name to be given to the license plate credential. */
    name: z.string().optional(),
  }),
});

type CreateLicensePlateInput = z.infer<typeof CreateLicensePlateInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createLicensePlate
 * OK
 */
const CreateLicensePlateOutputSchema = z.object({
  /** Bool value specifying if the license plate credential is currently active. Default value is False. */
  active: z.boolean().nullable(),
  /** The unique license plate number identifying a license plate credential for a user. */
  license_plate_number: z.string().nullable(),
  /** The name to be given to the license plate credential. */
  name: z.string().nullable(),
});

type CreateLicensePlateOutput = z.infer<typeof CreateLicensePlateOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new license plate. Provide the required fields in the request body.
 *
 * @param input.query.external_id - The external_id parameter
 * @param input.query.user_id - The user_id parameter
 * @param input.body.active - Bool value specifying if the license plate credential is currently active. Default value is False.
 * @param input.body.license_plate_number - The unique license plate number identifying a license plate credential for a user.
 * @param input.body.name - The name to be given to the license plate credential.
 * @returns OK
 */
export async function createLicensePlate(
  input: CreateLicensePlateInput
): Promise<APIResponse<CreateLicensePlateOutput>> {
  // Validate input
  const validated = CreateLicensePlateInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/credentials/license_plate';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.external_id !== undefined) {
    queryParams.set('external_id', String(validated.query.external_id));
  }
  if (validated.query.user_id !== undefined) {
    queryParams.set('user_id', String(validated.query.user_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<CreateLicensePlateOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      active: validated.body.active,
      license_plate_number: validated.body.license_plate_number,
      name: validated.body.name,
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
export const createLicensePlateMetadata = {
  name: 'create_license_plate',
  description: `Create a new license plate. Provide the required fields in the request body.`,
  inputSchema: CreateLicensePlateInputSchema,
  outputSchema: CreateLicensePlateOutputSchema,
  category: 'product/access',
  operationId: 'postLicensePlateViewV1',
  method: 'POST' as const,
  path: '/access/v1/credentials/license_plate',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
