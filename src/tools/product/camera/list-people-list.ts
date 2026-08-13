/**
 * ListPeopleList Tool
 *
 * List all people list. Use this to enumerate or search through people list. Supports bulk operations.
 *
 * @category product/camera
 * @operationId getPeopleListViewV2
 * @method GET
 * @path /v2/cameras/people/people_lists
 * @tags People Lists
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
 * Input parameters for listPeopleList
 */
const ListPeopleListInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The cursor parameter */
    cursor: z.string().optional(),
    /** The limit parameter */
    limit: z.number().int().min(0).max(1000).optional(),
  }),
});

type ListPeopleListInput = z.infer<typeof ListPeopleListInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for listPeopleList
 * OK
 */
const ListPeopleListOutputSchema = z.object({
  /** Pagination cursor for retrieving the next page of results. Continue paginating while this field is present. */
  cursor: z.string().nullable(),
  /** People lists in the organization. */
  items: z.array(z.object({ is_public: z.boolean().nullable(), list_id: z.string().nullable(), name: z.string().nullable(), system_list_category: z.string().nullable().optional() })).nullable(),
});

type ListPeopleListOutput = z.infer<typeof ListPeopleListOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * List all people list. Use this to enumerate or search through people list. Supports bulk operations.
 *
 * @param input.query.cursor - The cursor parameter
 * @param input.query.limit - The limit parameter
 * @returns OK
 */
export async function listPeopleList(
  input: ListPeopleListInput
): Promise<APIResponse<ListPeopleListOutput>> {
  // Validate input
  const validated = ListPeopleListInputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/people/people_lists';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.cursor !== undefined) {
    queryParams.set('cursor', String(validated.query.cursor));
  }
  if (validated.query.limit !== undefined) {
    queryParams.set('limit', String(validated.query.limit));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<ListPeopleListOutput>({
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
export const listPeopleListMetadata = {
  name: 'list_people_list',
  description: `List all people list. Use this to enumerate or search through people list. Supports bulk operations.`,
  inputSchema: ListPeopleListInputSchema,
  outputSchema: ListPeopleListOutputSchema,
  category: 'product/camera',
  operationId: 'getPeopleListViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/people/people_lists',
  requiresAuth: true,
  tags: ['People Lists'],
};
