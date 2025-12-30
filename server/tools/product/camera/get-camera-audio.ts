/**
 * GetCameraAudio Tool
 *
 * Get a specific camera audio by ID. Returns detailed information about the camera audio.
 *
 * @category product/camera
 * @operationId getCameraAudioViewV1
 * @method GET
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
 * Input parameters for getCameraAudio
 */
const GetCameraAudioInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
  }),
});

type GetCameraAudioInput = z.infer<typeof GetCameraAudioInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getCameraAudio
 * OK
 */
const GetCameraAudioOutputSchema = z.object({
  /** The unique identifier of the camera. */
  camera_id: z.string(),
  /** The status of audio for the camera. If value is True, audio is turned on for the camera. */
  enabled: z.boolean(),
});

type GetCameraAudioOutput = z.infer<typeof GetCameraAudioOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific camera audio by ID. Returns detailed information about the camera audio.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @returns OK
 */
export async function getCameraAudio(
  input: GetCameraAudioInput
): Promise<APIResponse<GetCameraAudioOutput>> {
  // Validate input
  const validated = GetCameraAudioInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/audio/status';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.camera_id !== undefined) {
    queryParams.set('camera_id', String(validated.query.camera_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetCameraAudioOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetCameraAudioOutputSchema.parse(response.data);
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
export const getCameraAudioMetadata = {
  name: 'get_camera_audio',
  description: `Get a specific camera audio by ID. Returns detailed information about the camera audio.`,
  inputSchema: GetCameraAudioInputSchema,
  outputSchema: GetCameraAudioOutputSchema,
  category: 'product/camera',
  operationId: 'getCameraAudioViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/audio/status',
  requiresAuth: true,
  tags: ['Audio'],
};
