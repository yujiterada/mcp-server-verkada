/**
 * CreateAccessGroup Tool
 *
 * Create a new access group. Provide the required fields in the request body.
 *
 * @category product/access
 * @operationId postAccessGroupViewV1
 * @method POST
 * @path /access/v1/access_groups/group
 * @tags Access Groups
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
 * Input parameters for createAccessGroup
 */
const CreateAccessGroupInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** The unique name of the Access Group to be created. (required) */
    name: z.string(),
  }),
});

type CreateAccessGroupInput = z.infer<typeof CreateAccessGroupInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createAccessGroup
 * OK
 */
const CreateAccessGroupOutputSchema = z.object({
  /** The unique identifier of the Access Group managed by Verkada. */
  group_id: z.string().uuid().nullable(),
  /** The unique name of the Access Group provided by the customer. */
  name: z.string().nullable(),
  /** The list of Verkada-defined user identifiers within the access group. */
  user_ids: z.array(z.string().uuid()).nullable(),
});

type CreateAccessGroupOutput = z.infer<typeof CreateAccessGroupOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new access group. Provide the required fields in the request body.
 *
 * @param input.body.name - The unique name of the Access Group to be created.
 * @returns OK
 */
export async function createAccessGroup(
  input: CreateAccessGroupInput
): Promise<APIResponse<CreateAccessGroupOutput>> {
  // Validate input
  const validated = CreateAccessGroupInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/access_groups/group';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateAccessGroupOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      name: validated.body.name,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = CreateAccessGroupOutputSchema.parse(response.data);
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
export const createAccessGroupMetadata = {
  name: 'create_access_group',
  description: `Create a new access group. Provide the required fields in the request body.`,
  inputSchema: CreateAccessGroupInputSchema,
  outputSchema: CreateAccessGroupOutputSchema,
  category: 'product/access',
  operationId: 'postAccessGroupViewV1',
  method: 'POST' as const,
  path: '/access/v1/access_groups/group',
  requiresAuth: true,
  tags: ['Access Groups'],
};
