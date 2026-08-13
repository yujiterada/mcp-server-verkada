/**
 * GetBatchJobStatus Tool
 *
 * Get a specific batch job status by ID. Returns detailed information about the batch job status.
 *
 * @category command/batch
 * @operationId getBatchJobStatusView
 * @method GET
 * @path /v2/batch/jobs/{job_id}
 * @tags Batch
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
 * Input parameters for getBatchJobStatus
 */
const GetBatchJobStatusInputSchema = z.object({
  /** Path parameters */
  path: z.object({
    /** The job_id parameter (required) */
    job_id: z.string(),
  }),
});

type GetBatchJobStatusInput = z.infer<typeof GetBatchJobStatusInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getBatchJobStatus
 * OK
 */
const GetBatchJobStatusOutputSchema = z.object({
  /** ISO 8601 timestamp when job completed (only in final response) */
  completed_at: z.string().nullable(),
  /** ISO 8601 timestamp when job was created */
  created_at: z.string().nullable(),
  /** Error message if the job failed at the job level */
  error_message: z.string().nullable(),
  /** Number of items that failed */
  failed_items: z.number().int().nullable(),
  /** Pre-signed S3 URL to download failure details (if any failures) */
  failure_file_url: z.string().nullable(),
  /** Unique identifier for the batch job */
  job_id: z.string().nullable(),
  /** Number of items processed so far */
  processed_items: z.number().int().nullable(),
  /** Current status: pending, processing, completed, or failed */
  status: z.string().nullable(),
  /** Number of items successfully processed (only in final response) */
  successful_items: z.number().int().nullable(),
  /** Total number of items in the batch */
  total_items: z.number().int().nullable(),
  /** ISO 8601 timestamp of last progress update */
  updated_at: z.string().nullable(),
});

type GetBatchJobStatusOutput = z.infer<typeof GetBatchJobStatusOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific batch job status by ID. Returns detailed information about the batch job status.
 *
 * @param input.path.job_id - The job_id parameter
 * @returns OK
 */
export async function getBatchJobStatus(
  input: GetBatchJobStatusInput
): Promise<APIResponse<GetBatchJobStatusOutput>> {
  // Validate input
  const validated = GetBatchJobStatusInputSchema.parse(input);

  // Build path with parameters
  let path = '/v2/batch/jobs/{job_id}';
  path = path.replace('{job_id}', encodeURIComponent(String(validated.path.job_id)));

  const fullPath = path;

  // Make API request
  const response = await callVerkadaAPI<GetBatchJobStatusOutput>({
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
export const getBatchJobStatusMetadata = {
  name: 'get_batch_job_status',
  description: `Get a specific batch job status by ID. Returns detailed information about the batch job status.`,
  inputSchema: GetBatchJobStatusInputSchema,
  outputSchema: GetBatchJobStatusOutputSchema,
  category: 'command/batch',
  operationId: 'getBatchJobStatusView',
  method: 'GET' as const,
  path: '/v2/batch/jobs/{job_id}',
  requiresAuth: true,
  tags: ['Batch'],
};
