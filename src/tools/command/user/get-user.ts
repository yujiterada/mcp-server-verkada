/**
 * GetUser Tool
 *
 * Get a specific user by ID. Returns detailed information about the user.
 *
 * @category command/user
 * @operationId getUserViewV1
 * @method GET
 * @path /core/v1/user
 * @tags Users
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
 * Input parameters for getUser
 */
const GetUserInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The user_id parameter */
    user_id: z.string().optional(),
    /** The external_id parameter */
    external_id: z.string().optional(),
  }),
});

type GetUserInput = z.infer<typeof GetUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getUser
 * OK
 */
const GetUserOutputSchema = z.object({
  /** Whether the user is active in the system. */
  active: z.boolean().nullable(),
  /** The name of the company the user is part of. */
  company_name: z.string().nullable(),
  /** The name of the department the user is part of. */
  department: z.string().nullable(),
  /** The department ID of the department the user is in. */
  department_id: z.string().nullable(),
  /** The email of the user. */
  email: z.string().nullable(),
  /** The user&#x27;s employee ID, does not have to be unique. */
  employee_id: z.string().nullable(),
  /** The title of employee. */
  employee_title: z.string().nullable(),
  /** The type of employee. */
  employee_type: z.string().nullable(),
  /** A unique identifier managed externally provided by the consumer. */
  external_id: z.string().nullable(),
  /** The first name of the user. */
  first_name: z.string().nullable(),
  /** The last name of the user. */
  last_name: z.string().nullable(),
  /** The middle name of the user. */
  middle_name: z.string().nullable(),
  /** The main phone number of a user, E.164 format preferred. */
  phone: z.string().nullable(),
  /** The unique identifier of the user managed by Verkada. */
  user_id: z.string().nullable(),
});

type GetUserOutput = z.infer<typeof GetUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific user by ID. Returns detailed information about the user.
 *
 * @param input.query.user_id - The user_id parameter
 * @param input.query.external_id - The external_id parameter
 * @returns OK
 */
export async function getUser(
  input: GetUserInput
): Promise<APIResponse<GetUserOutput>> {
  // Validate input
  const validated = GetUserInputSchema.parse(input);

  // Build path with parameters
  const path = '/core/v1/user';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.user_id !== undefined) {
    queryParams.set('user_id', String(validated.query.user_id));
  }
  if (validated.query.external_id !== undefined) {
    queryParams.set('external_id', String(validated.query.external_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetUserOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetUserOutputSchema.parse(response.data);
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
export const getUserMetadata = {
  name: 'get_user',
  description: `Get a specific user by ID. Returns detailed information about the user.`,
  inputSchema: GetUserInputSchema,
  outputSchema: GetUserOutputSchema,
  category: 'command/user',
  operationId: 'getUserViewV1',
  method: 'GET' as const,
  path: '/core/v1/user',
  requiresAuth: true,
  tags: ['Users'],
};
