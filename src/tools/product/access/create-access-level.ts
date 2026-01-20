/**
 * CreateAccessLevel Tool
 *
 * Create a new access level. Provide the required fields in the request body.
 *
 * @category product/access
 * @operationId postAccessLevelView
 * @method POST
 * @path /access/v1/door/access_level
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
 * Input parameters for createAccessLevel
 */
const CreateAccessLevelInputSchema = z.object({
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

type CreateAccessLevelInput = z.infer<typeof CreateAccessLevelInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createAccessLevel
 * ok
 */
const CreateAccessLevelOutputSchema = z.object({
});

type CreateAccessLevelOutput = z.infer<typeof CreateAccessLevelOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new access level. Provide the required fields in the request body.
 *
 * @param input.body.access_groups - IDs of Access Groups granted door access via this Access Level
 * @param input.body.access_schedule_events - List of Access Schedule Events associated with this Access Level
 * @param input.body.doors - IDs of Doors accessible under this Access Level
 * @param input.body.name - Name of the Access Level
 * @param input.body.sites - IDs of Sites containing the Doors this Access Level applies to
 * @returns ok
 */
export async function createAccessLevel(
  input: CreateAccessLevelInput
): Promise<APIResponse<CreateAccessLevelOutput>> {
  // Validate input
  const validated = CreateAccessLevelInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/door/access_level';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateAccessLevelOutput>({
    method: 'POST',
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
export const createAccessLevelMetadata = {
  name: 'create_access_level',
  description: `Create a new access level. Provide the required fields in the request body.`,
  inputSchema: CreateAccessLevelInputSchema,
  outputSchema: CreateAccessLevelOutputSchema,
  category: 'product/access',
  operationId: 'postAccessLevelView',
  method: 'POST' as const,
  path: '/access/v1/door/access_level',
  requiresAuth: true,
  tags: ['Access Levels'],
};
