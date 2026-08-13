/**
 * CreateVideoTaggingEventBatch_2 Tool
 *
 * Create a new video tagging event batch. Provide the required fields in the request body. This operation may run asynchronously. Supports bulk operations.
 *
 * @category product/camera
 * @operationId postVideoTaggingEventBatchViewV2
 * @method POST
 * @path /v2/cameras/video_tagging/events/batch
 * @tags Methods
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
 * Input parameters for createVideoTaggingEventBatch_2
 */
const CreateVideoTaggingEventBatch_2InputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** List of items to process (required) */
    items: z.array(z.object({ attributes: z.object({}).optional(), camera_id: z.string().min(1), event_type_uid: z.string().min(1), flagged: z.boolean().optional(), occurred_at: z.string() })),
  }),
});

type CreateVideoTaggingEventBatch_2Input = z.infer<typeof CreateVideoTaggingEventBatch_2InputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createVideoTaggingEventBatch_2
 * ok
 */
const CreateVideoTaggingEventBatch_2OutputSchema = z.object({
});

type CreateVideoTaggingEventBatch_2Output = z.infer<typeof CreateVideoTaggingEventBatch_2OutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new video tagging event batch. Provide the required fields in the request body. This operation may run asynchronously. Supports bulk operations.
 *
 * @param input.body.items - List of items to process
 * @returns ok
 */
export async function createVideoTaggingEventBatch_2(
  input: CreateVideoTaggingEventBatch_2Input
): Promise<APIResponse<CreateVideoTaggingEventBatch_2Output>> {
  // Validate input
  const validated = CreateVideoTaggingEventBatch_2InputSchema.parse(input);

  // Build path with parameters
  const path = '/v2/cameras/video_tagging/events/batch';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateVideoTaggingEventBatch_2Output>({
    method: 'POST',
    path: fullPath,
    body: {
      items: validated.body.items,
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
export const createVideoTaggingEventBatch_2Metadata = {
  name: 'create_video_tagging_event_batch_2',
  description: `Create a new video tagging event batch. Provide the required fields in the request body. This operation may run asynchronously. Supports bulk operations.`,
  inputSchema: CreateVideoTaggingEventBatch_2InputSchema,
  outputSchema: CreateVideoTaggingEventBatch_2OutputSchema,
  category: 'product/camera',
  operationId: 'postVideoTaggingEventBatchViewV2',
  method: 'POST' as const,
  path: '/v2/cameras/video_tagging/events/batch',
  requiresAuth: true,
  tags: ['Methods'],
};
