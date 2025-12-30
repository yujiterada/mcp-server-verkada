/**
 * GetAlarmsSites Tool
 *
 * Get a specific alarms sites by ID. Returns detailed information about the alarms sites.
 *
 * @category command/site
 * @operationId getAlarmsSitesViewV1
 * @method GET
 * @path /alarms/v1/sites
 * @tags Sites
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
 * Input parameters for getAlarmsSites
 */
const GetAlarmsSitesInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The site_ids parameter */
    site_ids: z.string().optional(),
  }),
});

type GetAlarmsSitesInput = z.infer<typeof GetAlarmsSitesInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getAlarmsSites
 * OK
 */
const GetAlarmsSitesOutputSchema = z.object({
  /** A list containing information about alarm sites */
  sites: z.array(z.object({ site_id: z.string(), site_name: z.string(), site_security_level: z.enum(['high', 'low', 'custom']).optional(), site_state: z.enum(['disarmed', 'armed', 'alarm', 'silent_alarm']).optional() })),
});

type GetAlarmsSitesOutput = z.infer<typeof GetAlarmsSitesOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific alarms sites by ID. Returns detailed information about the alarms sites.
 *
 * @param input.query.site_ids - The site_ids parameter
 * @returns OK
 */
export async function getAlarmsSites(
  input: GetAlarmsSitesInput
): Promise<APIResponse<GetAlarmsSitesOutput>> {
  // Validate input
  const validated = GetAlarmsSitesInputSchema.parse(input);

  // Build path with parameters
  const path = '/alarms/v1/sites';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.site_ids !== undefined) {
    queryParams.set('site_ids', String(validated.query.site_ids));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetAlarmsSitesOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetAlarmsSitesOutputSchema.parse(response.data);
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
export const getAlarmsSitesMetadata = {
  name: 'get_alarms_sites',
  description: `Get a specific alarms sites by ID. Returns detailed information about the alarms sites.`,
  inputSchema: GetAlarmsSitesInputSchema,
  outputSchema: GetAlarmsSitesOutputSchema,
  category: 'command/site',
  operationId: 'getAlarmsSitesViewV1',
  method: 'GET' as const,
  path: '/alarms/v1/sites',
  requiresAuth: true,
  tags: ['Sites'],
};
