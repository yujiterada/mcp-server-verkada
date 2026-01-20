/**
 * GetCameraFootageUrl Tool
 *
 * Get a specific camera footage url by ID. Returns detailed information about the camera footage url.
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
 * Input parameters for getCameraFootageUrl
 */
const GetCameraFootageUrlInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The timestamp parameter */
    timestamp: z.number().int().optional(),
  }),
});

type GetCameraFootageUrlInput = z.infer<typeof GetCameraFootageUrlInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getCameraFootageUrl
 * OK
 */
const GetCameraFootageUrlOutputSchema = z.object({
  /** The link to the video footage. */
  url: z.string().nullable(),
});

type GetCameraFootageUrlOutput = z.infer<typeof GetCameraFootageUrlOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific camera footage url by ID. Returns detailed information about the camera footage url.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.timestamp - The timestamp parameter
 * @returns OK
 */
export async function getCameraFootageUrl(
  input: GetCameraFootageUrlInput
): Promise<APIResponse<GetCameraFootageUrlOutput>> {
  // Validate input
  const validated = GetCameraFootageUrlInputSchema.parse(input);

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
  const response = await callVerkadaAPI<GetCameraFootageUrlOutput>({
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
export const getCameraFootageUrlMetadata = {
  name: 'get_camera_footage_url',
  description: `Get a specific camera footage url by ID. Returns detailed information about the camera footage url.`,
  inputSchema: GetCameraFootageUrlInputSchema,
  outputSchema: GetCameraFootageUrlOutputSchema,
  category: 'product/camera',
  operationId: 'getHistoryUrlViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/footage/link',
  requiresAuth: true,
  tags: ['Footage'],
};
