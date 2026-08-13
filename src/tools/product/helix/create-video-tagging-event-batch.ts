/**
 * CreateVideoTaggingEventBatch Tool
 *
 * Create a new video tagging event batch. Provide the required fields in the request body.
 *
 * @category product/helix
 * @operationId postVideoTaggingEventBatchViewV1
 * @method POST
 * @path /cameras/v1/video_tagging/event/batch
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
 * Input parameters for createVideoTaggingEventBatch
 */
const CreateVideoTaggingEventBatchInputSchema = z.object({
  /** Body parameters */
  body: z.object({
    /** List of items to process (required) */
    items: z.array(z.object({ attributes: z.object({}).optional(), camera_id: z.string(), event_type_uid: z.string(), flagged: z.boolean().optional(), time_ms: z.number().int() })),
  }),
});

type CreateVideoTaggingEventBatchInput = z.infer<typeof CreateVideoTaggingEventBatchInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createVideoTaggingEventBatch
 * ok
 */
const CreateVideoTaggingEventBatchOutputSchema = z.object({
});

type CreateVideoTaggingEventBatchOutput = z.infer<typeof CreateVideoTaggingEventBatchOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new video tagging event batch. Provide the required fields in the request body.
 *
 * @param input.body.items - List of items to process
 * @returns ok
 */
export async function createVideoTaggingEventBatch(
  input: CreateVideoTaggingEventBatchInput
): Promise<APIResponse<CreateVideoTaggingEventBatchOutput>> {
  // Validate input
  const validated = CreateVideoTaggingEventBatchInputSchema.parse(input);

  // Build path with parameters
  const path = '/cameras/v1/video_tagging/event/batch';

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<CreateVideoTaggingEventBatchOutput>({
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
export const createVideoTaggingEventBatchMetadata = {
  name: 'create_video_tagging_event_batch',
  description: `Create a new video tagging event batch. Provide the required fields in the request body.`,
  inputSchema: CreateVideoTaggingEventBatchInputSchema,
  outputSchema: CreateVideoTaggingEventBatchOutputSchema,
  category: 'product/helix',
  operationId: 'postVideoTaggingEventBatchViewV1',
  method: 'POST' as const,
  path: '/cameras/v1/video_tagging/event/batch',
  requiresAuth: true,
  tags: ['Methods'],
};
