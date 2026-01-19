/**
 * GetAccessLevel Tool
 *
 * Get a specific access level by ID. Returns detailed information about the access level.
 *
 * @category product/access
 * @operationId getAccessLevelView
 * @method GET
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
 * This tool takes no input parameters
 */
const GetAccessLevelInputSchema = z.object({});


// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getAccessLevel
 * OK
 */
const GetAccessLevelOutputSchema = z.object({
  /**  */
  access_levels: z.array(z.object({ access_groups: z.array(z.string()).nullable(), access_level_id: z.string().nullable(), access_schedule_events: z.array(z.object({ access_schedule_event_id: z.string().nullable().optional(), door_status: z.enum(['access_granted']).nullable().optional(), end_time: z.string().nullable(), start_time: z.string().nullable(), weekday: z.enum(['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']).nullable() })).nullable(), doors: z.array(z.string()).nullable(), last_updated_at: z.number().int().nullable(), name: z.string().nullable(), sites: z.array(z.string()).nullable() })).nullable(),
});

type GetAccessLevelOutput = z.infer<typeof GetAccessLevelOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific access level by ID. Returns detailed information about the access level.
 *
 * @returns OK
 */
export async function getAccessLevel(
): Promise<APIResponse<GetAccessLevelOutput>> {
  // Build path with parameters
  const path = '/access/v1/door/access_level';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<GetAccessLevelOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetAccessLevelOutputSchema.parse(response.data);
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
export const getAccessLevelMetadata = {
  name: 'get_access_level',
  description: `Get a specific access level by ID. Returns detailed information about the access level.`,
  inputSchema: GetAccessLevelInputSchema,
  outputSchema: GetAccessLevelOutputSchema,
  category: 'product/access',
  operationId: 'getAccessLevelView',
  method: 'GET' as const,
  path: '/access/v1/door/access_level',
  requiresAuth: true,
  tags: ['Access Levels'],
};
