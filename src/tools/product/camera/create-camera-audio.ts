/**
 * CreateCameraAudio Tool
 *
 * Create a new camera audio. Provide the required fields in the request body.
 *
 * @category product/camera
 * @operationId postCameraAudioViewV2
 * @method POST
 * @path /v2/cameras/{camera_id}/audio
 * @tags Audio
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
 * Input parameters for createCameraAudio
 */
const CreateCameraAudioInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** The status of audio for the camera. If True, audio is enabled for the camera. (required) */
    enabled: z.boolean(),
  }),
});

type CreateCameraAudioInput = z.infer<typeof CreateCameraAudioInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createCameraAudio
 * ok
 */
const CreateCameraAudioOutputSchema = z.object({
});

type CreateCameraAudioOutput = z.infer<typeof CreateCameraAudioOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new camera audio. Provide the required fields in the request body.
 *
 * @param input.path.camera_id - The camera_id parameter
 * @param input.body.enabled - The status of audio for the camera. If True, audio is enabled for the camera.
 * @returns ok
 */
export async function createCameraAudio(
  input: CreateCameraAudioInput
): Promise<APIResponse<CreateCameraAudioOutput>> {
  // Validate input
  const validated = CreateCameraAudioInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/{camera_id}/audio';
  path = path.replace('{camera_id}', encodeURIComponent(String(validated.path.camera_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateCameraAudioOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      enabled: validated.body.enabled,
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
export const createCameraAudioMetadata = {
  name: 'create_camera_audio',
  description: `Create a new camera audio. Provide the required fields in the request body.`,
  inputSchema: CreateCameraAudioInputSchema,
  outputSchema: CreateCameraAudioOutputSchema,
  category: 'product/camera',
  operationId: 'postCameraAudioViewV2',
  method: 'POST' as const,
  path: '/v2/cameras/{camera_id}/audio',
  requiresAuth: true,
  tags: ['Audio'],
};
