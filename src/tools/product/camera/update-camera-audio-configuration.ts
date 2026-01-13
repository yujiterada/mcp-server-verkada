/**
 * UpdateCameraAudioConfiguration Tool
 *
 * Update an existing camera audio configuration. Only the provided fields will be changed.
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
 * Input parameters for updateCameraAudioConfiguration
 */
const UpdateCameraAudioConfigurationInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** The unique identifier of the camera. (required) */
    camera_id: z.string(),
    /** The status of audio for the camera. If value is True, audio is turned on for the camera. (required) */
    enabled: z.boolean(),
  }),
});

type UpdateCameraAudioConfigurationInput = z.infer<typeof UpdateCameraAudioConfigurationInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for updateCameraAudioConfiguration
 * ok
 */
const UpdateCameraAudioConfigurationOutputSchema = z.object({
});

type UpdateCameraAudioConfigurationOutput = z.infer<typeof UpdateCameraAudioConfigurationOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Update an existing camera audio configuration. Only the provided fields will be changed.
 *
 * @param input.body.camera_id - The unique identifier of the camera.
 * @param input.body.enabled - The status of audio for the camera. If value is True, audio is turned on for the camera.
 * @returns ok
 */
export async function updateCameraAudioConfiguration(
  input: UpdateCameraAudioConfigurationInput
): Promise<APIResponse<UpdateCameraAudioConfigurationOutput>> {
  // Validate input
  const validated = UpdateCameraAudioConfigurationInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/audio/status';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<UpdateCameraAudioConfigurationOutput>({
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
      response.data = UpdateCameraAudioConfigurationOutputSchema.parse(response.data);
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
export const updateCameraAudioConfigurationMetadata = {
  name: 'update_camera_audio_configuration',
  description: `Update an existing camera audio configuration. Only the provided fields will be changed.`,
  inputSchema: UpdateCameraAudioConfigurationInputSchema,
  outputSchema: UpdateCameraAudioConfigurationOutputSchema,
  category: 'product/camera',
  operationId: 'postCameraAudioViewV1',
  method: 'POST' as const,
  path: '/cameras/v1/audio/status',
  requiresAuth: true,
  tags: ['Audio'],
};
