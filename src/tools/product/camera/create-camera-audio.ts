/**
 * CreateCameraAudio Tool
 *
 * Create a new camera audio. Provide the required fields in the request body.
 *
 * @category product/camera
 * @operationId postCameraAudioViewV1
 * @method POST
 * @path /cameras/v1/audio/status
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
  /** Body parameters */
  body: z.object({
    /** The unique identifier of the camera. (required) */
    camera_id: z.string(),
    /** The status of audio for the camera. If value is True, audio is turned on for the camera. (required) */
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
 * @param input.body.camera_id - The unique identifier of the camera.
 * @param input.body.enabled - The status of audio for the camera. If value is True, audio is turned on for the camera.
 * @returns ok
 */
export async function createCameraAudio(
  input: CreateCameraAudioInput
): Promise<APIResponse<CreateCameraAudioOutput>> {
  // Validate input
  const validated = CreateCameraAudioInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/audio/status';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateCameraAudioOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      camera_id: validated.body.camera_id,
      enabled: validated.body.enabled,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = CreateCameraAudioOutputSchema.parse(response.data);
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
export const createCameraAudioMetadata = {
  name: 'create_camera_audio',
  description: `Create a new camera audio. Provide the required fields in the request body.`,
  inputSchema: CreateCameraAudioInputSchema,
  outputSchema: CreateCameraAudioOutputSchema,
  category: 'product/camera',
  operationId: 'postCameraAudioViewV1',
  method: 'POST' as const,
  path: '/cameras/v1/audio/status',
  requiresAuth: true,
  tags: ['Audio'],
};
