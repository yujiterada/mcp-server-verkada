/**
 * GetVisit Tool
 *
 * Get a specific visit by ID. Returns detailed information about the visit.
 *
 * @category product/guest
 * @operationId getVisitView
 * @method GET
 * @path /guest/v1/visits
 * @tags Visits
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
 * Input parameters for getVisit
 */
const GetVisitInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The site_id parameter (required) */
    site_id: z.string().uuid(),
    /** The start_time parameter (required) */
    start_time: z.number().int(),
    /** The end_time parameter (required) */
    end_time: z.number().int(),
    /** The page_token parameter */
    page_token: z.string().optional(),
    /** The page_size parameter */
    page_size: z.number().int().min(0).max(200).optional(),
  }),
});

type GetVisitInput = z.infer<typeof GetVisitInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for getVisit
 * OK
 */
const GetVisitOutputSchema = z.object({
  /**  */
  visits: z.array(z.object({ approval_status: z.string().nullable(), check_in_time: z.number().int().nullable(), deleted: z.boolean().nullable(), device_name: z.string().nullable(), guest: z.object({ created: z.number().int().nullable(), email: z.string().nullable(), full_name: z.string().nullable(), guest_id: z.string().uuid().nullable(), has_photo: z.boolean().nullable(), image_url: z.string().nullable().optional(), is_sign_urls: z.boolean().nullable().optional(), person_id: z.string().nullable(), phone_number: z.string().nullable() }).nullable().optional(), host: z.object({ delivery_location: z.string().nullable(), first_name: z.string().nullable(), full_name: z.string().nullable(), has_delegate: z.boolean().nullable(), has_email: z.boolean().nullable(), has_phone_number: z.boolean().nullable(), host_id: z.string().uuid().nullable(), last_name: z.string().nullable(), original_first_name: z.string().nullable(), requires_host_approval: z.boolean().nullable(), student_id: z.string().nullable().optional(), student_number: z.string().nullable().optional() }).nullable().optional(), host_approval_status: z.string().nullable(), hosts: z.array(z.object({ delivery_location: z.string().nullable(), first_name: z.string().nullable(), full_name: z.string().nullable(), has_delegate: z.boolean().nullable(), has_email: z.boolean().nullable(), has_phone_number: z.boolean().nullable(), host_id: z.string().uuid().nullable(), last_name: z.string().nullable(), original_first_name: z.string().nullable(), requires_host_approval: z.boolean().nullable(), student_id: z.string().nullable().optional(), student_number: z.string().nullable().optional() })).nullable().optional(), is_contactless: z.boolean().nullable(), next_page_token: z.string().nullable().optional(), open_ended_responses: z.array(z.object({ chosen_answers: z.array(z.string()).nullable().optional(), question: z.string().nullable(), response: z.string().nullable() })).nullable(), questionnaires: z.array(z.object({ passed: z.boolean().nullable(), questionnaire: z.string().nullable() })).nullable(), security_screen_status: z.string().nullable(), sign_out_time: z.number().int().nullable(), signatures: z.array(z.object({ doc_signature_id: z.string().uuid().nullable(), document_id: z.string().uuid().nullable(), pdf_url: z.string().nullable(), visit_id: z.string().uuid().nullable() })).nullable(), site_id: z.string().uuid().nullable(), visit_id: z.string().uuid().nullable(), visit_type: z.string().nullable() })).nullable(),
});

type GetVisitOutput = z.infer<typeof GetVisitOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Get a specific visit by ID. Returns detailed information about the visit.
 *
 * @param input.query.site_id - The site_id parameter
 * @param input.query.start_time - The start_time parameter
 * @param input.query.end_time - The end_time parameter
 * @param input.query.page_token - The page_token parameter
 * @param input.query.page_size - The page_size parameter
 * @returns OK
 */
export async function getVisit(
  input: GetVisitInput
): Promise<APIResponse<GetVisitOutput>> {
  // Validate input
  const validated = GetVisitInputSchema.parse(input);

  // Build path with parameters
  const path = '/guest/v1/visits';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.site_id !== undefined) {
    queryParams.set('site_id', String(validated.query.site_id));
  }
  if (validated.query.start_time !== undefined) {
    queryParams.set('start_time', String(validated.query.start_time));
  }
  if (validated.query.end_time !== undefined) {
    queryParams.set('end_time', String(validated.query.end_time));
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
  const response = await callVerkadaAPI<GetVisitOutput>({
    method: 'GET',
    path: fullPath,
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = GetVisitOutputSchema.parse(response.data);
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
export const getVisitMetadata = {
  name: 'get_visit',
  description: `Get a specific visit by ID. Returns detailed information about the visit.`,
  inputSchema: GetVisitInputSchema,
  outputSchema: GetVisitOutputSchema,
  category: 'product/guest',
  operationId: 'getVisitView',
  method: 'GET' as const,
  path: '/guest/v1/visits',
  requiresAuth: true,
  tags: ['Visits'],
};
