/**
 * CreateAccessCard Tool
 *
 * Create a new access card. Provide the required fields in the request body.
 *
 * @category product/access
 * @operationId postAccessCardViewV1
 * @method POST
 * @path /access/v1/credentials/card
 * @tags Access Credentials
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
 * Input parameters for createAccessCard
 */
const CreateAccessCardInputSchema = z.object({
  /** Path parameters */
  query: z.object({
    /** The external_id parameter */
    external_id: z.string().optional(),
    /** The user_id parameter */
    user_id: z.string().uuid().optional(),
  }),
  /** Body parameters */
  body: z.object({
    /** Bool value specifying if the credential is currently active. Can be True or False. Default value is False. */
    active: z.boolean().optional(),
    /** The card number used to grant or deny access to a door. */
    card_number: z.string().optional(),
    /** The card number in base36 used to grant or deny access to a door. */
    card_number_base36: z.string().optional(),
    /** The card number in hexadecimal used to grant or deny access to a door. */
    card_number_hex: z.string().optional(),
    /** The facility code used to grant or deny access to a door. */
    facility_code: z.string().optional(),
    /** One of the following supported card types, &lt;code&gt;Standard 26-bit Wiegand&lt;/code&gt;,&lt;code&gt;HID 37-bit&lt;/code&gt;, &lt;code&gt;HID 37-bit No Facility Code&lt;/code&gt;, &lt;code&gt;HID 34-bit&lt;/code&gt;,&lt;code&gt;Casi Rusco 40-Bit&lt;/code&gt;, &lt;code&gt;HID Corporate 1000-35&lt;/code&gt;, &lt;code&gt;HID Corporate 1000-48&lt;/code&gt;,&lt;code&gt;HID iClass&lt;/code&gt;, &lt;code&gt;DESFire CSN&lt;/code&gt;, &lt;code&gt;Verkada DESFire&lt;/code&gt;, &lt;code&gt;Third Party DESFire 40X&lt;/code&gt;,&lt;code&gt;Apple Wallet Pass&lt;/code&gt;, &lt;code&gt;MiFare 4-Byte (32 bit) CSN&lt;/code&gt;, &lt;code&gt;MDC Custom 64-bit&lt;/code&gt;,&lt;code&gt;HID 36-bit Keyscan&lt;/code&gt;, &lt;code&gt;HID 33-bit DSX&lt;/code&gt;, &lt;code&gt;HID 33-bit RS2&lt;/code&gt;,&lt;code&gt;HID 36-bit Simplex&lt;/code&gt;, &lt;code&gt;Cansec 37-bit&lt;/code&gt;, &lt;code&gt;Credit Card BIN Number&lt;/code&gt;,&lt;code&gt;Kantech XSF&lt;/code&gt;, &lt;code&gt;Schlage 34-bit&lt;/code&gt;, &lt;code&gt;Schlage 37-bit&lt;/code&gt;, &lt;code&gt;RBH 50-bit&lt;/code&gt;,&lt;code&gt;Guardall G-Prox II 36-bit&lt;/code&gt;, &lt;code&gt;AMAG 32-bit&lt;/code&gt;, &lt;code&gt;Securitas 37-bit&lt;/code&gt;,&lt;code&gt;Kastle 32-bit&lt;/code&gt;, &lt;code&gt;PointGuard MDI 37-bit&lt;/code&gt;, &lt;code&gt;Blackboard 64-bit&lt;/code&gt;,&lt;code&gt;IDm 64-bit&lt;/code&gt;, &lt;code&gt;Continental 36-bit&lt;/code&gt;, &lt;code&gt;AWID 34-bit&lt;/code&gt;, &lt;code&gt;License Plate&lt;/code&gt;,&lt;code&gt;HID Infinity 37-bit&lt;/code&gt;, &lt;code&gt;HID Ceridian 26-bit&lt;/code&gt;, &lt;code&gt;iClass 35-bit&lt;/code&gt;,&lt;code&gt;Andover Controls 37-bit&lt;/code&gt;. (required) */
    type: z.string(),
  }),
});

type CreateAccessCardInput = z.infer<typeof CreateAccessCardInputSchema>;

// ============================================================================
// OUTPUT SCHEMA
// ============================================================================

/**
 * Output schema for createAccessCard
 * OK
 */
const CreateAccessCardOutputSchema = z.object({
  /** Bool value specifying if the credential is currently active. Can be True or False. Default value is False. */
  active: z.boolean(),
  /** The unique identifier of the Access Card managed by Verkada. */
  card_id: z.string(),
  /** The card number  used to grant or deny access to a door. */
  card_number: z.string(),
  /** The card number in base36 used to grant or deny access to a door. */
  card_number_base36: z.string(),
  /** The card number in hexadecimal used to grant or deny access to a door. */
  card_number_hex: z.string(),
  /** The facility code used to grant or deny access to a door. */
  facility_code: z.string(),
  /** The type of card used during the credential evaluation process. */
  type: z.string(),
});

type CreateAccessCardOutput = z.infer<typeof CreateAccessCardOutputSchema>;

// ============================================================================
// TOOL FUNCTION
// ============================================================================

/**
 * Create a new access card. Provide the required fields in the request body.
 *
 * @param input.query.external_id - The external_id parameter
 * @param input.query.user_id - The user_id parameter
 * @param input.body.active - Bool value specifying if the credential is currently active. Can be True or False. Default value is False.
 * @param input.body.card_number - The card number used to grant or deny access to a door.
 * @param input.body.card_number_base36 - The card number in base36 used to grant or deny access to a door.
 * @param input.body.card_number_hex - The card number in hexadecimal used to grant or deny access to a door.
 * @param input.body.facility_code - The facility code used to grant or deny access to a door.
 * @param input.body.type - One of the following supported card types, &lt;code&gt;Standard 26-bit Wiegand&lt;/code&gt;,&lt;code&gt;HID 37-bit&lt;/code&gt;, &lt;code&gt;HID 37-bit No Facility Code&lt;/code&gt;, &lt;code&gt;HID 34-bit&lt;/code&gt;,&lt;code&gt;Casi Rusco 40-Bit&lt;/code&gt;, &lt;code&gt;HID Corporate 1000-35&lt;/code&gt;, &lt;code&gt;HID Corporate 1000-48&lt;/code&gt;,&lt;code&gt;HID iClass&lt;/code&gt;, &lt;code&gt;DESFire CSN&lt;/code&gt;, &lt;code&gt;Verkada DESFire&lt;/code&gt;, &lt;code&gt;Third Party DESFire 40X&lt;/code&gt;,&lt;code&gt;Apple Wallet Pass&lt;/code&gt;, &lt;code&gt;MiFare 4-Byte (32 bit) CSN&lt;/code&gt;, &lt;code&gt;MDC Custom 64-bit&lt;/code&gt;,&lt;code&gt;HID 36-bit Keyscan&lt;/code&gt;, &lt;code&gt;HID 33-bit DSX&lt;/code&gt;, &lt;code&gt;HID 33-bit RS2&lt;/code&gt;,&lt;code&gt;HID 36-bit Simplex&lt;/code&gt;, &lt;code&gt;Cansec 37-bit&lt;/code&gt;, &lt;code&gt;Credit Card BIN Number&lt;/code&gt;,&lt;code&gt;Kantech XSF&lt;/code&gt;, &lt;code&gt;Schlage 34-bit&lt;/code&gt;, &lt;code&gt;Schlage 37-bit&lt;/code&gt;, &lt;code&gt;RBH 50-bit&lt;/code&gt;,&lt;code&gt;Guardall G-Prox II 36-bit&lt;/code&gt;, &lt;code&gt;AMAG 32-bit&lt;/code&gt;, &lt;code&gt;Securitas 37-bit&lt;/code&gt;,&lt;code&gt;Kastle 32-bit&lt;/code&gt;, &lt;code&gt;PointGuard MDI 37-bit&lt;/code&gt;, &lt;code&gt;Blackboard 64-bit&lt;/code&gt;,&lt;code&gt;IDm 64-bit&lt;/code&gt;, &lt;code&gt;Continental 36-bit&lt;/code&gt;, &lt;code&gt;AWID 34-bit&lt;/code&gt;, &lt;code&gt;License Plate&lt;/code&gt;,&lt;code&gt;HID Infinity 37-bit&lt;/code&gt;, &lt;code&gt;HID Ceridian 26-bit&lt;/code&gt;, &lt;code&gt;iClass 35-bit&lt;/code&gt;,&lt;code&gt;Andover Controls 37-bit&lt;/code&gt;.
 * @returns OK
 */
export async function createAccessCard(
  input: CreateAccessCardInput
): Promise<APIResponse<CreateAccessCardOutput>> {
  // Validate input
  const validated = CreateAccessCardInputSchema.parse(input);

  // Build path with parameters
  const path = '/access/v1/credentials/card';

  // Build query string
  const queryParams = new URLSearchParams();
  if (validated.query.external_id !== undefined) {
    queryParams.set('external_id', String(validated.query.external_id));
  }
  if (validated.query.user_id !== undefined) {
    queryParams.set('user_id', String(validated.query.user_id));
  }
  const queryString = queryParams.toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  // Make API request
  const response = await callVerkadaAPI<CreateAccessCardOutput>({
    method: 'POST',
    path: fullPath,
    body: {
      active: validated.body.active,
      card_number: validated.body.card_number,
      card_number_base36: validated.body.card_number_base36,
      card_number_hex: validated.body.card_number_hex,
      facility_code: validated.body.facility_code,
      type: validated.body.type,
    },
  });

  // Validate response
  if (response.success && response.data) {
    try {
      response.data = CreateAccessCardOutputSchema.parse(response.data);
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
export const createAccessCardMetadata = {
  name: 'create_access_card',
  description: `Create a new access card. Provide the required fields in the request body.`,
  inputSchema: CreateAccessCardInputSchema,
  outputSchema: CreateAccessCardOutputSchema,
  category: 'product/access',
  operationId: 'postAccessCardViewV1',
  method: 'POST' as const,
  path: '/access/v1/credentials/card',
  requiresAuth: true,
  tags: ['Access Credentials'],
};
