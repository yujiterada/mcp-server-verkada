/**
 * GetCloudBackup Tool
 *
 * Get a specific cloud backup by ID. Returns detailed information about the cloud backup.
 *
 * @category product/camera
 * @operationId getCloudBackupViewV1
 * @method GET
 * @path /cameras/v1/cloud_backup/settings
 * @tags CloudBackup
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
 * Input parameters for getCloudBackup
 */
const GetCloudBackupInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
  }),
});

type GetCloudBackupInput = z.infer<typeof GetCloudBackupInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getCloudBackup
 * OK
 */
const GetCloudBackupOutputSchema = z.object({
  /** The unique identifier of the camera. */
  camera_id: z.string(),
  /** Array of booleans indicating for which days footage         should be uploaded. In order the elements in the array indicate the following days:         Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday. If value is 1,         cloud backup is on for that day. If value is 0, cloud backup is off for that day */
  days_to_preserve: z.string(),
  /** Status of cloud backup for a camera. It has two possible values: 1, 0. */
  enabled: z.number().int(),
  /** Epoch timestamp of the latest available backup segment in HD quality. */
  last_updated_segment_hq: z.string(),
  /** Epoch timestamp of the latest available backup segment in SD quality. */
  last_updated_segment_sq: z.string(),
  /** Delimited list of &lt;code&gt;start_time, end_time&lt;/code&gt; as timeslot for which a         user wants footage to be backed up to the cloud, start_time and end_time are integers         indicating seconds to midnight, i.e, [3600, 7200] means 1am - 2am */
  time_to_preserve: z.string(),
  /** Delimited list of &lt;code&gt;start_time, end_time&lt;/code&gt; as timeslot for scheduled         time for footage upload, start_time and end_time are integers indicating seconds to         midnight, i.e, [3600, 7200] means 1am - 2am */
  upload_timeslot: z.string(),
  /** Quality of the uploaded video.         Two values are possible: &lt;code&gt;STANDARD_QUALITY&lt;/code&gt; and &lt;code&gt;HIGH_QUALITY&lt;/code&gt;. */
  video_quality: z.string(),
  /** Defines what type of video is backed-up.         Two values are possible: &lt;code&gt;MOTION&lt;/code&gt; and &lt;code&gt;ALL&lt;/code&gt;. */
  video_to_upload: z.string(),
});

type GetCloudBackupOutput = z.infer<typeof GetCloudBackupOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific cloud backup by ID. Returns detailed information about the cloud backup.
 *
 * @param input.query.camera_id - The camera_id parameter
 * @returns OK
 */
export async function getCloudBackup(
  input: GetCloudBackupInput
): Promise<APIResponse<GetCloudBackupOutput>> {
  // Validate input
  const validated = GetCloudBackupInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/cloud_backup/settings';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.camera_id !== undefined) {
    queryParams.set('camera_id', String(validated.query.camera_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetCloudBackupOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetCloudBackupOutputSchema.parse(response.data);
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
export const getCloudBackupMetadata = {
  name: 'get_cloud_backup',
  description: `Get a specific cloud backup by ID. Returns detailed information about the cloud backup.`,
  inputSchema: GetCloudBackupInputSchema,
  outputSchema: GetCloudBackupOutputSchema,
  category: 'product/camera',
  operationId: 'getCloudBackupViewV1',
  method: 'GET' as const,
  path: '/cameras/v1/cloud_backup/settings',
  requiresAuth: true,
  tags: ['CloudBackup'],
};
