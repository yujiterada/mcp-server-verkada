/**
 * CreateCameraPtzPosition Tool
 *
 * Create a new camera ptz position. Provide the required fields in the request body.
 *
 * @category product/camera
 * @operationId postCameraPtzPositionViewV2
 * @method POST
 * @path /v2/cameras/{camera_id}/ptz/position
 * @tags PTZ
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
 * Input parameters for createCameraPtzPosition
 */
const CreateCameraPtzPositionInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** The unique identifier of the PTZ preset position to move the camera to. (required) */
    preset_id: z.string().min(1),
  }),
});

type CreateCameraPtzPositionInput = z.infer<typeof CreateCameraPtzPositionInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createCameraPtzPosition
 * ok
 */
const CreateCameraPtzPositionOutputSchema = z.object({
});

type CreateCameraPtzPositionOutput = z.infer<typeof CreateCameraPtzPositionOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new camera ptz position. Provide the required fields in the request body.
 *
 * @param input.path.camera_id - The camera_id parameter
 * @param input.body.preset_id - The unique identifier of the PTZ preset position to move the camera to.
 * @returns ok
 */
export async function createCameraPtzPosition(
  input: CreateCameraPtzPositionInput
): Promise<APIResponse<CreateCameraPtzPositionOutput>> {
  // Validate input
  const validated = CreateCameraPtzPositionInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/{camera_id}/ptz/position';
  path = path.replace('{camera_id}', encodeURIComponent(String(validated.path.camera_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateCameraPtzPositionOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      preset_id: validated.body.preset_id,
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
export const createCameraPtzPositionMetadata = {
  name: 'create_camera_ptz_position',
  description: `Create a new camera ptz position. Provide the required fields in the request body.`,
  inputSchema: CreateCameraPtzPositionInputSchema,
  outputSchema: CreateCameraPtzPositionOutputSchema,
  category: 'product/camera',
  operationId: 'postCameraPtzPositionViewV2',
  method: 'POST' as const,
  path: '/v2/cameras/{camera_id}/ptz/position',
  requiresAuth: true,
  tags: ['PTZ'],
};
