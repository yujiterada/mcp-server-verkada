/**
 * CreateUser Tool
 *
 * Create a new user. Provide the required fields in the request body.
 *
 * @category command/user
 * @operationId postUserViewV1
 * @method POST
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
 * Input parameters for createUser
 */
const CreateUserInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** The name of the company the user is part of. */
    company_name: z.string().optional(),
    /** The name of the department the user is part of. */
    department: z.string().optional(),
    /** The department ID of the department the user is in. */
    department_id: z.string().optional(),
    /** The email of the user. */
    email: z.string().optional(),
    /** The user&#x27;s employee ID, does not have to be unique. */
    employee_id: z.string().optional(),
    /** The title of employee. */
    employee_title: z.string().optional(),
    /** The type of employee. */
    employee_type: z.string().optional(),
    /** A unique identifier managed externally provided by the consumer. */
    external_id: z.string().optional(),
    /** The first name of the user. */
    first_name: z.string().optional(),
    /** The last name of the user. */
    last_name: z.string().optional(),
    /** The middle name of the user. */
    middle_name: z.string().optional(),
    /** The main phone number of a user, E.164 format preferred. */
    phone: z.string().optional(),
  }),
});

type CreateUserInput = z.infer<typeof CreateUserInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createUser
 * OK
 */
const CreateUserOutputSchema = z.object({
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

type CreateUserOutput = z.infer<typeof CreateUserOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new user. Provide the required fields in the request body.
 *
 * @param input.body.company_name - The name of the company the user is part of.
 * @param input.body.department - The name of the department the user is part of.
 * @param input.body.department_id - The department ID of the department the user is in.
 * @param input.body.email - The email of the user.
 * @param input.body.employee_id - The user&#x27;s employee ID, does not have to be unique.
 * @param input.body.employee_title - The title of employee.
 * @param input.body.employee_type - The type of employee.
 * @param input.body.external_id - A unique identifier managed externally provided by the consumer.
 * @param input.body.first_name - The first name of the user.
 * @param input.body.last_name - The last name of the user.
 * @param input.body.middle_name - The middle name of the user.
 * @param input.body.phone - The main phone number of a user, E.164 format preferred.
 * @returns OK
 */
export async function createUser(
  input: CreateUserInput
): Promise<APIResponse<CreateUserOutput>> {
  // Validate input
  const validated = CreateUserInputSchema.parse(input);

  // Build path with parameters
  const path = '/core/v1/user';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateUserOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      company_name: validated.body.company_name,
      department: validated.body.department,
      department_id: validated.body.department_id,
      email: validated.body.email,
      employee_id: validated.body.employee_id,
      employee_title: validated.body.employee_title,
      employee_type: validated.body.employee_type,
      external_id: validated.body.external_id,
      first_name: validated.body.first_name,
      last_name: validated.body.last_name,
      middle_name: validated.body.middle_name,
      phone: validated.body.phone,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = CreateUserOutputSchema.parse(response.data);
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
export const createUserMetadata = {
  name: 'create_user',
  description: `Create a new user. Provide the required fields in the request body.`,
  inputSchema: CreateUserInputSchema,
  outputSchema: CreateUserOutputSchema,
  category: 'command/user',
  operationId: 'postUserViewV1',
  method: 'POST' as const,
  path: '/core/v1/user',
  requiresAuth: true,
  tags: ['Users'],
};
