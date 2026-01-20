/**
 * UpdateAccessLevelDetail Tool
 *
 * Update an existing access level detail. Only the provided fields will be changed.
 *
 * @category product/access
 * @operationId putAccessLevelDetailView
 * @method PUT
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
 * Input parameters for updateAccessLevelDetail
 */
const UpdateAccessLevelDetailInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The access_level_id parameter (required) */
    access_level_id: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** IDs of Access Groups granted door access via this Access Level (required) */
    access_groups: z.array(z.string()),
    /** List of Access Schedule Events associated with this Access Level (required) */
    access_schedule_events: z.array(z.object({ access_schedule_event_id: z.string().optional(), door_status: z.enum(['access_granted']).optional(), end_time: z.string(), start_time: z.string(), weekday: z.enum(['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']) })),
    /** IDs of Doors accessible under this Access Level (required) */
    doors: z.array(z.string()),
    /** Name of the Access Level (required) */
    name: z.string(),
    /** IDs of Sites containing the Doors this Access Level applies to (required) */
    sites: z.array(z.string()),
  }),
});

type UpdateAccessLevelDetailInput = z.infer<typeof UpdateAccessLevelDetailInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateAccessLevelDetail
 * OK
 */
const UpdateAccessLevelDetailOutputSchema = z.object({
  /** IDs of Access Groups granted door access via this Access Level */
  access_groups: z.array(z.string()).nullable(),
  /** Unique identifier for the Access Level */
  access_level_id: z.string().nullable(),
  /** List of Access Schedule Events associated with this Access Level */
  access_schedule_events: z.array(z.object({ access_schedule_event_id: z.string().nullable().optional(), door_status: z.enum(['access_granted']).nullable().optional(), end_time: z.string().nullable(), start_time: z.string().nullable(), weekday: z.enum(['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']).nullable() })).nullable(),
  /** IDs of Doors accessible under this Access Level */
  doors: z.array(z.string()).nullable(),
  /** Last updated timestamp of the Access Level (Unix timestamp in seconds) */
  last_updated_at: z.number().int().nullable(),
  /** Name of the Access Level */
  name: z.string().nullable(),
  /** IDs of Sites containing the Doors this Access Level applies to */
  sites: z.array(z.string()).nullable(),
});

type UpdateAccessLevelDetailOutput = z.infer<typeof UpdateAccessLevelDetailOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing access level detail. Only the provided fields will be changed.
 *
 * @param input.path.access_level_id - The access_level_id parameter
 * @param input.body.access_groups - IDs of Access Groups granted door access via this Access Level
 * @param input.body.access_schedule_events - List of Access Schedule Events associated with this Access Level
 * @param input.body.doors - IDs of Doors accessible under this Access Level
 * @param input.body.name - Name of the Access Level
 * @param input.body.sites - IDs of Sites containing the Doors this Access Level applies to
 * @returns OK
 */
export async function updateAccessLevelDetail(
  input: UpdateAccessLevelDetailInput
): Promise<APIResponse<UpdateAccessLevelDetailOutput>> {
  // Validate input
  const validated = UpdateAccessLevelDetailInputSchema.parse(input);

  // Build path with parameters
  let path = '/access/v1/door/access_level/{access_level_id}';
  path = path.replace('{access_level_id}', encodeURIComponent(String(validated.path.access_level_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UpdateAccessLevelDetailOutput>({
    method: 'PUT',
    path: fullPath,
    body: {
      access_groups: validated.body.access_groups,
      access_schedule_events: validated.body.access_schedule_events,
      doors: validated.body.doors,
      name: validated.body.name,
      sites: validated.body.sites,
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
export const updateAccessLevelDetailMetadata = {
  name: 'update_access_level_detail',
  description: `Update an existing access level detail. Only the provided fields will be changed.`,
  inputSchema: UpdateAccessLevelDetailInputSchema,
  outputSchema: UpdateAccessLevelDetailOutputSchema,
  category: 'product/access',
  operationId: 'putAccessLevelDetailView',
  method: 'PUT' as const,
  path: '/access/v1/door/access_level/{access_level_id}',
  requiresAuth: true,
  tags: ['Access Levels'],
};
