/**
 * GetHistoryUrl Tool
 *
 * Get a specific history url by ID. Returns detailed information about the history url.
 *
 * @category product/camera
 * @operationId getHistoryUrlViewV1
 * @method GET
 * @path /cameras/v1/footage/link
 * @tags Footage
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
 * Input parameters for getHistoryUrl
 */
const GetHistoryUrlInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The timestamp parameter */
    timestamp: z.number().int().optional(),
  }),
});

type GetHistoryUrlInput = z.infer<typeof GetHistoryUrlInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getHistoryUrl
 * OK
 */
const GetHistoryUrlOutputSchema = z.object({
  /** The link to the video footage. */
  url: z.string(),
});

type GetHistoryUrlOutput = z.infer<typeof GetHistoryUrlOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific history url by ID. Returns detailed information about the history url.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.timestamp - The timestamp parameter
 * @returns OK
 */
export async function getHistoryUrl(
  input: GetHistoryUrlInput
): Promise<APIResponse<GetHistoryUrlOutput>> {
  // Validate input
  const validated = GetHistoryUrlInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/footage/link';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.camera_id !== undefined) {
    queryParams.set('camera_id', String(validated.query.camera_id));
  }
  if (validated.query.timestamp !== undefined) {
    queryParams.set('timestamp', String(validated.query.timestamp));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetHistoryUrlOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetHistoryUrlOutputSchema.parse(response.data);
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
export const getHistoryUrlMetadata = {
  name: 'get_history_url',
  description: `Get a specific history url by ID. Returns detailed information about the history url.`,
  inputSchema: GetHistoryUrlInputSchema,
  outputSchema: GetHistoryUrlOutputSchema,
  category: 'product/camera',
  operationId: 'getHistoryUrlViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/footage/link',
  requiresAuth: true,
  tags: ['Footage'],
};
