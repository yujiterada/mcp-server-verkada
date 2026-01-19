/**
 * GetAccessLevelDetail Tool
 *
 * Get a specific access level detail by ID. Returns detailed information about the access level detail.
 *
 * @category product/access
 * @operationId getAccessLevelDetailView
 * @method GET
 * @path /access/v1/door/access_level/{access_level_id}
 * @tags Access Levels
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
 * Input parameters for getAccessLevelDetail
 */
const GetAccessLevelDetailInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The access_level_id parameter (required) */
    access_level_id: z.string(),
  }),
});

type GetAccessLevelDetailInput = z.infer<typeof GetAccessLevelDetailInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getAccessLevelDetail
 * OK
 */
const GetAccessLevelDetailOutputSchema = z.object({
  /** IDs of Access Groups granted door access via this Access Level */
  access_groups: z.array(z.string()).nullable(),
  /** Unique identifier for the Access Level */
  access_level_id: z.string().nullable(),
  /** List of Access Schedule Events associated with this Access Level */
  access_schedule_events: z.array(z.object({ access_schedule_event_id: z.string().optional(), door_status: z.enum(['access_granted']).optional(), end_time: z.string(), start_time: z.string(), weekday: z.enum(['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']) })).nullable(),
  /** IDs of Doors accessible under this Access Level */
  doors: z.array(z.string()).nullable(),
  /** Last updated timestamp of the Access Level (Unix timestamp in seconds) */
  last_updated_at: z.number().int().nullable(),
  /** Name of the Access Level */
  name: z.string().nullable(),
  /** IDs of Sites containing the Doors this Access Level applies to */
  sites: z.array(z.string()).nullable(),
});

type GetAccessLevelDetailOutput = z.infer<typeof GetAccessLevelDetailOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific access level detail by ID. Returns detailed information about the access level detail.
 *
 * @param input.path.access_level_id - The access_level_id parameter
 * @returns OK
 */
export async function getAccessLevelDetail(
  input: GetAccessLevelDetailInput
): Promise<APIResponse<GetAccessLevelDetailOutput>> {
  // Validate input
  const validated = GetAccessLevelDetailInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/door/access_level/{access_level_id}';
  path = path.replace('{access_level_id}', encodeURIComponent(String(validated.path.access_level_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<GetAccessLevelDetailOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetAccessLevelDetailOutputSchema.parse(response.data);
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
export const getAccessLevelDetailMetadata = {
  name: 'get_access_level_detail',
  description: `Get a specific access level detail by ID. Returns detailed information about the access level detail.`,
  inputSchema: GetAccessLevelDetailInputSchema,
  outputSchema: GetAccessLevelDetailOutputSchema,
  category: 'product/access',
  operationId: 'getAccessLevelDetailView',
  method: 'GET' as const,
  path: '/access/v1/door/access_level/{access_level_id}',
  requiresAuth: true,
  tags: ['Access Levels'],
};
