/**
 * Helix Event Attribute Utilities
 *
 * Helper functions for working with helix event attributes.
 * These are used by generated helix event tools to handle type coercion.
 */

/**
 * Coerce helix event attribute values to appropriate types.
 * Converts numeric strings to numbers (integers or floats) as expected by the Verkada API.
 *
 * This is needed because MCP tool inputs may receive numeric values as strings,
 * but the Verkada API requires actual number types for integer/float fields.
 *
 * @param attributes - The attributes object from the input
 * @returns The attributes with numeric strings converted to numbers
 */
export function coerceHelixAttributeValues(
  attributes: Record<string, string | number | boolean> | undefined
): Record<string, string | number | boolean> | undefined {
  if (!attributes) return attributes;

  const coerced: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(attributes)) {
    if (typeof value === 'string') {
      // Try to convert numeric strings to numbers
      const trimmed = value.trim();
      if (trimmed !== '' && !isNaN(Number(trimmed))) {
        // Convert to number (handles both integers and floats)
        coerced[key] = Number(trimmed);
      } else {
        coerced[key] = value;
      }
    } else {
      coerced[key] = value;
    }
  }
  return coerced;
}
