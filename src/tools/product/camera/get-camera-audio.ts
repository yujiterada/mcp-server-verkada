/**
 * GetCameraAudio Tool
 *
 * Get a specific camera audio by ID. Returns detailed information about the camera audio.
 *
 * @category product/camera
 * @operationId getCameraAudioViewV2
 * @method GET
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
 * Input parameters for getCameraAudio
 */
const GetCameraAudioInputSchema = z.object({
  /** Path parameters */
  path: z.object({
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
  camera_id: z.string().nullable(),
  /** The status of audio for the camera. If True, audio is enabled for the camera. */
  enabled: z.boolean().nullable(),
});

type GetCameraAudioOutput = z.infer<typeof GetCameraAudioOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific camera audio by ID. Returns detailed information about the camera audio.
 *
 * @param input.path.camera_id - The camera_id parameter
 * @returns OK
 */
export async function getCameraAudio(
  input: GetCameraAudioInput
): Promise<APIResponse<GetCameraAudioOutput>> {
  // Validate input
  const validated = GetCameraAudioInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/cameras/{camera_id}/audio';
  path = path.replace('{camera_id}', encodeURIComponent(String(validated.path.camera_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<GetCameraAudioOutput>({
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
export const getCameraAudioMetadata = {
  name: 'get_camera_audio',
  description: `Get a specific camera audio by ID. Returns detailed information about the camera audio.`,
  inputSchema: GetCameraAudioInputSchema,
  outputSchema: GetCameraAudioOutputSchema,
  category: 'product/camera',
  operationId: 'getCameraAudioViewV2',
  method: 'GET' as const,
  path: '/v2/cameras/{camera_id}/audio',
  requiresAuth: true,
  tags: ['Audio'],
};
