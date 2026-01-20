/**
 * GetAuditLogs Tool
 *
 * Get a specific audit logs by ID. Returns detailed information about the audit logs.
 *
 * @category command/audit-log
 * @operationId getAuditLogsViewV1
 * @method GET
 * @path /core/v1/audit_log
 * @tags Audit Log
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
 * Input parameters for getAuditLogs
 */
const GetAuditLogsInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The start_time parameter */
    start_time: z.number().int().optional(),
    /** The end_time parameter */
    end_time: z.number().int().optional(),
    /** The use_processed_timestamp parameter */
    use_processed_timestamp: z.boolean().optional(),
    /** The page_token parameter */
    page_token: z.string().optional(),
    /** The page_size parameter */
    page_size: z.number().int().min(0).max(200).optional(),
  }),
});

type GetAuditLogsInput = z.infer<typeof GetAuditLogsInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getAuditLogs
 * OK
 */
const GetAuditLogsOutputSchema = z.object({
  /** A list of audit logs. */
  audit_logs: z.array(z.object({ details: z.object({}).nullable().optional(), devices: z.array(z.object({ details: z.object({}).nullable().optional(), device_id: z.string().nullable().optional(), device_name: z.string().nullable().optional(), device_site_name: z.string().nullable().optional(), device_type: z.string().nullable().optional() })).nullable().optional(), event_description: z.string().nullable().optional(), event_name: z.string().nullable().optional(), ip_address: z.string().nullable().optional(), organization_id: z.string().uuid().nullable().optional(), processed_timestamp: z.string().nullable().optional(), timestamp: z.string().nullable().optional(), user_email: z.string().nullable().optional(), user_id: z.string().uuid().nullable().optional(), user_name: z.string().nullable().optional(), verkada_support_id: z.string().nullable().optional() })).nullable(),
  /** The pagination token used to fetch the next page of results. */
  next_page_token: z.string().nullable(),
});

type GetAuditLogsOutput = z.infer<typeof GetAuditLogsOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific audit logs by ID. Returns detailed information about the audit logs.
 *
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.use_processed_timestamp - The use_processed_timestamp parameter
 * @param input.query.page_token - The page_token parameter
 * @param input.query.page_size - The page_size parameter
 * @returns OK
 */
export async function getAuditLogs(
  input: GetAuditLogsInput
): Promise<APIResponse<GetAuditLogsOutput>> {
  // Validate input
  const validated = GetAuditLogsInputSchema.parse(input);

  // Build path with parameters
  const path = '/core/v1/audit_log';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
  }
  if (validated.query.use_processed_timestamp !== undefined) {
    queryParams.set('use_processed_timestamp', String(validated.query.use_processed_timestamp));
  }
  if (validated.query.page_token !== undefined) {
    queryParams.set('page_token', String(validated.query.page_token));
  }
  if (validated.query.page_size !== undefined) {
    queryParams.set('page_size', String(validated.query.page_size));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<GetAuditLogsOutput>({
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
export const getAuditLogsMetadata = {
  name: 'get_audit_logs',
  description: `Get a specific audit logs by ID. Returns detailed information about the audit logs.`,
  inputSchema: GetAuditLogsInputSchema,
  outputSchema: GetAuditLogsOutputSchema,
  category: 'command/audit-log',
  operationId: 'getAuditLogsViewV1',
  method: 'GET' as const,
  path: '/core/v1/audit_log',
  requiresAuth: true,
  tags: ['Audit Log'],
};
