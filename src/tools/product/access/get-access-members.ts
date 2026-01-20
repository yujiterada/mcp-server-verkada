/**
 * GetAccessMembers Tool
 *
 * Get a specific access members by ID. Returns detailed information about the access members.
 *
 * @category product/access
 * @operationId getAccessMembersViewV1
 * @method GET
 * @path /access/v1/access_users
 * @tags Access User Information
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
 * Input parameters for getAccessMembers
 */
const GetAccessMembersInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The include_visitors parameter */
    include_visitors: z.boolean().optional(),
  }),
});

type GetAccessMembersInput = z.infer<typeof GetAccessMembersInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getAccessMembers
 * OK
 */
const GetAccessMembersOutputSchema = z.object({
  /** The list of access members in an organization. */
  access_members: z.array(z.object({ company_name: z.string().nullable().optional(), department: z.string().nullable().optional(), department_id: z.string().nullable().optional(), email: z.string().nullable().optional(), employee_id: z.string().nullable().optional(), employee_title: z.string().nullable().optional(), external_id: z.string().nullable().optional(), full_name: z.string().nullable().optional(), has_profile_photo: z.boolean().nullable().optional(), is_visitor: z.boolean().nullable().optional(), profile_photo_last_updated: z.string().datetime().nullable().optional(), user_id: z.string().nullable().optional() })).nullable(),
});

type GetAccessMembersOutput = z.infer<typeof GetAccessMembersOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific access members by ID. Returns detailed information about the access members.
 *
 * @param input.query.include_visitors - The include_visitors parameter
 * @returns OK
 */
export async function getAccessMembers(
  input: GetAccessMembersInput
): Promise<APIResponse<GetAccessMembersOutput>> {
  // Validate input
  const validated = GetAccessMembersInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/access_users';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.include_visitors !== undefined) {
    queryParams.set('include_visitors', String(validated.query.include_visitors));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetAccessMembersOutput>({
    method: 'GET',
    path: fullPath,
  });

  return response;
}

// ============================================================================
// TOOL METADATA
// ============================================================================

/**
 * Metadata for MCP tool registration
 */
export const getAccessMembersMetadata = {
  name: 'get_access_members',
  description: `Get a specific access members by ID. Returns detailed information about the access members.`,
  inputSchema: GetAccessMembersInputSchema,
  outputSchema: GetAccessMembersOutputSchema,
  category: 'product/access',
  operationId: 'getAccessMembersViewV1',
  method: 'GET' as const,
  path: '/access/v1/access_users',
  requiresAuth: true,
  tags: ['Access User Information'],
};
