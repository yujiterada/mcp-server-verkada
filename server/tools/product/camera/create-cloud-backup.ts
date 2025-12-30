/**
 * CreateCloudBackup Tool
 *
 * Create a new cloud backup. Provide the required fields in the request body.
 *
 * @category product/camera
 * @operationId postCloudBackupViewV1
 * @method POST
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
 * Input parameters for createCloudBackup
 */
const CreateCloudBackupInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** The unique identifier of the camera. (required) */
    camera_id: z.string(),
    /** Delimited list of booleans indicating which days footage         should be uploaded. The elements in the array indicate the following days in order:         Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday. If value is 1,         cloud backup is on for that day. If value is 0, cloud backup is off for that day.        For example, &lt;code&gt;0,1,1,1,1,1,0&lt;/code&gt; means only backup on weekdays. (required) */
    days_to_preserve: z.string(),
    /** Status of cloud backup for a camera.         If value is 1, cloud backup is enabled. If value is 0, cloud backup is disabled. (required) */
    enabled: z.number().int(),
    /** Delimited list of &lt;code&gt;start_time, end_time&lt;/code&gt; as timeslot for which a         user wants footage to be backed up to the cloud, start_time and end_time are integers         indicating seconds to midnight, i.e, &lt;code&gt;3600,7200&lt;/code&gt; means 1am - 2am (required) */
    time_to_preserve: z.string(),
    /** Delimited list of &lt;code&gt;start_time, end_time&lt;/code&gt; as timeslot for scheduled         time for footage upload, start_time and end_time are integers indicating seconds to         midnight, i.e, &lt;code&gt;3600,7200&lt;/code&gt; means 1am - 2am (required) */
    upload_timeslot: z.string(),
    /** Quality of the uploaded video.         Two values are possible: &lt;code&gt;STANDARD_QUALITY&lt;/code&gt; and &lt;code&gt;HIGH_QUALITY&lt;/code&gt;. (required) */
    video_quality: z.string(),
    /** The type of video that is backed-up.         Two values are possible: &lt;code&gt;MOTION&lt;/code&gt; and &lt;code&gt;ALL&lt;/code&gt;. (required) */
    video_to_upload: z.string(),
  }),
});

type CreateCloudBackupInput = z.infer<typeof CreateCloudBackupInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createCloudBackup
 * ok
 */
const CreateCloudBackupOutputSchema = z.object({
});

type CreateCloudBackupOutput = z.infer<typeof CreateCloudBackupOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new cloud backup. Provide the required fields in the request body.
 *
 * @param input.body.camera_id - The unique identifier of the camera.
 * @param input.body.days_to_preserve - Delimited list of booleans indicating which days footage         should be uploaded. The elements in the array indicate the following days in order:         Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday. If value is 1,         cloud backup is on for that day. If value is 0, cloud backup is off for that day.        For example, &lt;code&gt;0,1,1,1,1,1,0&lt;/code&gt; means only backup on weekdays.
 * @param input.body.enabled - Status of cloud backup for a camera.         If value is 1, cloud backup is enabled. If value is 0, cloud backup is disabled.
 * @param input.body.time_to_preserve - Delimited list of &lt;code&gt;start_time, end_time&lt;/code&gt; as timeslot for which a         user wants footage to be backed up to the cloud, start_time and end_time are integers         indicating seconds to midnight, i.e, &lt;code&gt;3600,7200&lt;/code&gt; means 1am - 2am
 * @param input.body.upload_timeslot - Delimited list of &lt;code&gt;start_time, end_time&lt;/code&gt; as timeslot for scheduled         time for footage upload, start_time and end_time are integers indicating seconds to         midnight, i.e, &lt;code&gt;3600,7200&lt;/code&gt; means 1am - 2am
 * @param input.body.video_quality - Quality of the uploaded video.         Two values are possible: &lt;code&gt;STANDARD_QUALITY&lt;/code&gt; and &lt;code&gt;HIGH_QUALITY&lt;/code&gt;.
 * @param input.body.video_to_upload - The type of video that is backed-up.         Two values are possible: &lt;code&gt;MOTION&lt;/code&gt; and &lt;code&gt;ALL&lt;/code&gt;.
 * @returns ok
 */
export async function createCloudBackup(
  input: CreateCloudBackupInput
): Promise<APIResponse<CreateCloudBackupOutput>> {
  // Validate input
  const validated = CreateCloudBackupInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/cloud_backup/settings';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateCloudBackupOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      camera_id: validated.body.camera_id,
      days_to_preserve: validated.body.days_to_preserve,
      enabled: validated.body.enabled,
      time_to_preserve: validated.body.time_to_preserve,
      upload_timeslot: validated.body.upload_timeslot,
      video_quality: validated.body.video_quality,
      video_to_upload: validated.body.video_to_upload,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = CreateCloudBackupOutputSchema.parse(response.data);
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
export const createCloudBackupMetadata = {
  name: 'create_cloud_backup',
  description: `Create a new cloud backup. Provide the required fields in the request body.`,
  inputSchema: CreateCloudBackupInputSchema,
  outputSchema: CreateCloudBackupOutputSchema,
  category: 'product/camera',
  operationId: 'postCloudBackupViewV1',
  method: 'POST' as const,
  path: '/cameras/v1/cloud_backup/settings',
  requiresAuth: true,
  tags: ['CloudBackup'],
};
