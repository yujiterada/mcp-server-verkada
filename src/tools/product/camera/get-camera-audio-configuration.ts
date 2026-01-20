/**
 * GetCameraAudioConfiguration Tool
 *
 * Get a specific camera audio configuration by ID. Returns detailed information about the camera audio configuration.
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
 * Input parameters for getCameraAudioConfiguration
 */
const GetCameraAudioConfigurationInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
  }),
});

type GetCameraAudioConfigurationInput = z.infer<typeof GetCameraAudioConfigurationInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getCameraAudioConfiguration
 * OK
 */
const GetCameraAudioConfigurationOutputSchema = z.object({
  /** The unique identifier of the camera. */
  camera_id: z.string().nullable(),
  /** The status of audio for the camera. If value is True, audio is turned on for the camera. */
  enabled: z.boolean().nullable(),
});

type GetCameraAudioConfigurationOutput = z.infer<typeof GetCameraAudioConfigurationOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific camera audio configuration by ID. Returns detailed information about the camera audio configuration.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @returns OK
 */
export async function getCameraAudioConfiguration(
  input: GetCameraAudioConfigurationInput
): Promise<APIResponse<GetCameraAudioConfigurationOutput>> {
  // Validate input
  const validated = GetCameraAudioConfigurationInputSchema.parse(input);

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
  const response = await callVerkadaAPI<GetCameraAudioConfigurationOutput>({
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
export const getCameraAudioConfigurationMetadata = {
  name: 'get_camera_audio_configuration',
  description: `Get a specific camera audio configuration by ID. Returns detailed information about the camera audio configuration.`,
  inputSchema: GetCameraAudioConfigurationInputSchema,
  outputSchema: GetCameraAudioConfigurationOutputSchema,
  category: 'product/camera',
  operationId: 'getCameraAudioViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/audio/status',
  requiresAuth: true,
  tags: ['Audio'],
};
