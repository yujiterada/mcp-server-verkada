/**
 * GetFootageStream Tool
 *
 * Get a specific footage stream by ID. Returns detailed information about the footage stream.
 *
 * @category product/camera
 * @operationId getFootageStreamViewV1
 * @method GET
 * @path /stream/cameras/v1/footage/stream/{key}
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
 * Input parameters for getFootageStream
 */
const GetFootageStreamInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The key parameter (required) */
    key: z.string(),
  }),
  /** Path parameters */
  query: z.object({
    /** The org_id parameter (required) */
    org_id: z.string(),
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The start_time parameter */
    start_time: z.number().int().optional(),
    /** The end_time parameter */
    end_time: z.number().int().optional(),
    /** The codec parameter */
    codec: z.string().optional(),
    /** The resolution parameter */
    resolution: z.string().optional(),
    /** The type parameter */
    type: z.string().optional(),
    /** The jwt parameter (required) */
    jwt: z.string(),
    /** The file parameter */
    file: z.string().optional(),
    /** The prefetch parameter */
    prefetch: z.string().optional(),
    /** The camera parameter */
    camera: z.string().optional(),
    /** The source parameter */
    source: z.string().optional(),
    /** The source_encrypted parameter */
    source_encrypted: z.string().optional(),
    /** The bucket parameter */
    bucket: z.string().optional(),
    /** The start_ts parameter */
    start_ts: z.string().optional(),
    /** The ts parameter */
    ts: z.string().optional(),
    /** The offset parameter */
    offset: z.string().optional(),
    /** The transcode parameter */
    transcode: z.boolean().optional(),
    /** The data_location parameter */
    data_location: z.string().optional(),
    /** The byte_range parameter */
    byte_range: z.string().optional(),
    /** The init_byte_range parameter */
    init_byte_range: z.string().optional(),
    /** The iv parameter */
    iv: z.string().optional(),
    /** The key_name parameter */
    key_name: z.string().optional(),
    /** The init parameter */
    init: z.string().optional(),
    /** The stream_id parameter */
    stream_id: z.string().optional(),
  }),
});

type GetFootageStreamInput = z.infer<typeof GetFootageStreamInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getFootageStream
 * ok
 */
const GetFootageStreamOutputSchema = z.object({
});

type GetFootageStreamOutput = z.infer<typeof GetFootageStreamOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific footage stream by ID. Returns detailed information about the footage stream.
 *
 * @param input.path.key - The key parameter
 * @param input.query.org_id - The org_id parameter
 * @param input.query.camera_id - The camera_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.codec - The codec parameter
 * @param input.query.resolution - The resolution parameter
 * @param input.query.type - The type parameter
 * @param input.query.jwt - The jwt parameter
 * @param input.query.file - The file parameter
 * @param input.query.prefetch - The prefetch parameter
 * @param input.query.camera - The camera parameter
 * @param input.query.source - The source parameter
 * @param input.query.source_encrypted - The source_encrypted parameter
 * @param input.query.bucket - The bucket parameter
 * @param input.query.start_ts - The start_ts parameter
 * @param input.query.ts - The ts parameter
 * @param input.query.offset - The offset parameter
 * @param input.query.transcode - The transcode parameter
 * @param input.query.data_location - The data_location parameter
 * @param input.query.byte_range - The byte_range parameter
 * @param input.query.init_byte_range - The init_byte_range parameter
 * @param input.query.iv - The iv parameter
 * @param input.query.key_name - The key_name parameter
 * @param input.query.init - The init parameter
 * @param input.query.stream_id - The stream_id parameter
 * @returns ok
 */
export async function getFootageStream(
  input: GetFootageStreamInput
): Promise<APIResponse<GetFootageStreamOutput>> {
  // Validate input
  const validated = GetFootageStreamInputSchema.parse(input);

  // Build path with parameters
  let path = '/stream/cameras/v1/footage/stream/{key}';
  path = path.replace('{key}', encodeURIComponent(String(validated.path.key)));

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.org_id !== undefined) {
    queryParams.set('org_id', String(validated.query.org_id));
  }
  if (validated.query.camera_id !== undefined) {
    queryParams.set('camera_id', String(validated.query.camera_id));
  }
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
  }
  if (validated.query.codec !== undefined) {
    queryParams.set('codec', String(validated.query.codec));
  }
  if (validated.query.resolution !== undefined) {
    queryParams.set('resolution', String(validated.query.resolution));
  }
  if (validated.query.type !== undefined) {
    queryParams.set('type', String(validated.query.type));
  }
  if (validated.query.jwt !== undefined) {
    queryParams.set('jwt', String(validated.query.jwt));
  }
  if (validated.query.file !== undefined) {
    queryParams.set('file', String(validated.query.file));
  }
  if (validated.query.prefetch !== undefined) {
    queryParams.set('prefetch', String(validated.query.prefetch));
  }
  if (validated.query.camera !== undefined) {
    queryParams.set('camera', String(validated.query.camera));
  }
  if (validated.query.source !== undefined) {
    queryParams.set('source', String(validated.query.source));
  }
  if (validated.query.source_encrypted !== undefined) {
    queryParams.set('source_encrypted', String(validated.query.source_encrypted));
  }
  if (validated.query.bucket !== undefined) {
    queryParams.set('bucket', String(validated.query.bucket));
  }
  if (validated.query.start_ts !== undefined) {
    queryParams.set('start_ts', String(validated.query.start_ts));
  }
  if (validated.query.ts !== undefined) {
    queryParams.set('ts', String(validated.query.ts));
  }
  if (validated.query.offset !== undefined) {
    queryParams.set('offset', String(validated.query.offset));
  }
  if (validated.query.transcode !== undefined) {
    queryParams.set('transcode', String(validated.query.transcode));
  }
  if (validated.query.data_location !== undefined) {
    queryParams.set('data_location', String(validated.query.data_location));
  }
  if (validated.query.byte_range !== undefined) {
    queryParams.set('byte_range', String(validated.query.byte_range));
  }
  if (validated.query.init_byte_range !== undefined) {
    queryParams.set('init_byte_range', String(validated.query.init_byte_range));
  }
  if (validated.query.iv !== undefined) {
    queryParams.set('iv', String(validated.query.iv));
  }
  if (validated.query.key_name !== undefined) {
    queryParams.set('key_name', String(validated.query.key_name));
  }
  if (validated.query.init !== undefined) {
    queryParams.set('init', String(validated.query.init));
  }
  if (validated.query.stream_id !== undefined) {
    queryParams.set('stream_id', String(validated.query.stream_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetFootageStreamOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetFootageStreamOutputSchema.parse(response.data);
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
export const getFootageStreamMetadata = {
  name: 'get_footage_stream',
  description: `Get a specific footage stream by ID. Returns detailed information about the footage stream.`,
  inputSchema: GetFootageStreamInputSchema,
  outputSchema: GetFootageStreamOutputSchema,
  category: 'product/camera',
  operationId: 'getFootageStreamViewV1',
  method: 'GET' as const,
  path: '/stream/cameras/v1/footage/stream/{key}',
  requiresAuth: false,
  tags: ['Footage'],
};
