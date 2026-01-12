/**
 * Generator Configuration
 *
 * This file contains all configuration options for the OpenAPI to MCP server generator.
 * Modify these settings to customize the generated output.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Output schema override configuration
 * Allows specifying a custom Zod schema string for operations that need special handling
 */
export interface OutputSchemaOverride {
  /** The Zod schema definition as a string (e.g., "z.object({})") */
  schema: string;
  /** Description for the output schema */
  description: string;
}

/**
 * Input schema override configuration
 * Allows specifying a custom Zod schema string for input parameters that need special handling
 */
export interface InputSchemaOverride {
  /** The Zod schema definition as a string (e.g., "z.object({})") */
  schema: string;
  /** Description for the input schema */
  description: string;
}

export interface GeneratorConfig {
  // Input/Output paths
  input: {
    openapiPath: string;
  };

  output: {
    baseDir: string;
    serverDir: string;
    typesDir: string;
    toolsDir: string;
    schemasDir: string;
  };

  // Transformation settings
  transform: {
    nameOverrides: Record<string, string>;
    descriptionOverrides: Record<string, string>;
    /** Custom input schema overrides by operation ID */
    inputSchemaOverrides: Record<string, InputSchemaOverride>;
    /** Custom output schema overrides by operation ID */
    outputSchemaOverrides: Record<string, OutputSchemaOverride>;
    hiddenParameters: string[];
    defaultParameters: Record<string, unknown>;
  };

  // Category mappings
  categories: {
    rules: CategoryRule[];
    defaultCategory: string;
  };

  // Generation options
  options: {
    generateZodSchemas: boolean;
    generateTests: boolean;
    preserveManualEdits: boolean;
    dryRun: boolean;
    verbose: boolean;
    watch: boolean;
  };
}

export interface CategoryRule {
  pattern: RegExp;
  category: string;
}

// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================

export const defaultConfig: GeneratorConfig = {
  input: {
    openapiPath: './openapi_transformed_compressed.json',
  },

  output: {
    baseDir: '.',
    serverDir: './src',
    typesDir: './src/types',
    toolsDir: './src/tools',
    schemasDir: './src/types/schemas',
  },

  transform: {
    nameOverrides: {
      'postLoginApiKeyViewV2': 'get_login_api_token',
      'putActivateBLEMethodViewV1': 'activate_activate_ble_method',
      'putDeactivateBLEMethodViewV1': 'deactivate_deactivate_ble_method',
      'postOccupancyTrendsMQTTConfigView': 'create_occupancy_trends_mqtt_config',
      'getLPRImagesView': 'list_lpr_images',
      'getLPRTimestampsView': 'list_lpr_timestamps_view',
      'postMFACodeViewV1': 'post_mfa_code_view_v1',
      'deleteMFACodeViewV1': 'delete_mfa_code_view_v1',
      'getEventsViewV2': 'list_product_events',
      'getEventsViewV1': 'list_access_events',
      "postAccessAdminAPIUnlockViewV1": "unlock_access_admin_api_unlock",
      "postAccessUserAPIUnlockViewV1": "unlock_access_user_api_unlock",
      "getThumbnailImageViewV1": "get_camera_snapshot",
      "getVideoTaggingEventTypeViewV1": "list_helix_event_types",
      "postVideoTaggingEventTypeViewV1": "create_helix_event_type",
      "deleteVideoTaggingEventTypeViewV1": "delete_helix_event_type",
      "patchVideoTaggingEventTypeViewV1": "update_helix_event_type",
      "getVideoTaggingEventViewV1": "get_helix_event",
      "postVideoTaggingEventSearchViewV1": "search_helix_event",
      "postVideoTaggingEventViewV1": "create_helix_event",
      "patchVideoTaggingEventViewV1": "update_helix_event",
      "deleteVideoTaggingEventViewV1": "delete_helix_event",
      "getCloudBackupViewV1": "get_cloud_backup_configuration",
      "postCloudBackupViewV1": "update_cloud_backup_configuration",
      "getHostViewV2": "list_hosts_for_guest_site",
      "getGuestTypeViewV2": "list_guest_types",
      "getGuestEventViewV2": "list_hosted_events",
      "postGuestEventViewV2": "create_hosted_event",
      "getGuestSingleEventViewV2": "get_hosted_event",
      "deleteGuestSingleEventViewV2": "delete_hosted_event"
    },
    descriptionOverrides: {
      // Examples:
      // 'getAccessUsersViewV1': 'List all access users in your organization. Supports pagination and filtering.',
    },
    // Input schema overrides for operations that need custom input schemas
    inputSchemaOverrides: {
      'patchVideoTaggingEventTypeViewV1' : {
        schema: `z.object({
  /** Path parameters */
  query: z.object({
    /** The event_type_uid parameter (required) */
    event_type_uid: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** The schema of the event type. */
    event_schema: z.record(z.enum(['string', 'integer', 'float', 'boolean'])).optional(),
    /** The name of the event type. */
    name: z.string().optional(),
  }),
})`,
        description: 'Input schema for patchVideoTaggingEventTypeViewV1',
      },
      'postVideoTaggingEventTypeViewV1': {
        schema: `z.object({
  /** Body parameters */
  body: z.object({
    /** The schema of the event type. */
    event_schema: z.record(z.enum(['string', 'integer', 'float', 'boolean'])).optional(),
    /** The name of the event type. (required) */
    name: z.string(),
  }),
})`,
        description: '',
      },
      'patchVideoTaggingEventViewV1': {
        schema: `z.object({
  /** Path parameters */
  query: z.object({
    /** The camera_id parameter (required) */
    camera_id: z.string(),
    /** The time_ms parameter (required) */
    time_ms: z.number().int(),
    /** The event_type_uid parameter (required) */
    event_type_uid: z.string(),
  }),
  /** Body parameters */
  body: z.object({
    /** list of event attributes (key-value pairs matching the event type schema). */
    attributes: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
    /** Whether or not an event is flagged. */
    flagged: z.boolean().optional(),
  }),
})`,
       description: '',
      },
      'postVideoTaggingEventViewV1': {
        schema: `z.object({
  /** Body parameters */
  body: z.object({
    /** List of event attributes (key-value pairs matching the event type schema). */
    attributes: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
    /** The unique identifier of the camera. (required) */
    camera_id: z.string(),
    /** The unique identifier of the event type. (required) */
    event_type_uid: z.string(),
    /** Whether or not an event is flagged. */
    flagged: z.boolean().optional(),
    /** The event epoch time in milliseconds. Must be within the last 30 days. (required) */
    time_ms: z.number().int().refine(
      (val) => val >= Date.now() - 30 * 24 * 60 * 60 * 1000,
      { message: 'time_ms must be within the last 30 days' }
    ),
  }),
})`,
        description: '',
      },
      'postGuestEventViewV2': {
        schema: `z.object({
  /** Body parameters */
  body: z.object({
    /** The location of the event. */
    event_address: z.string().optional(),
    /** A description of the event. */
    event_description: z.string().optional(),
    /** The name of the Guest event. If not specified, defaults to &#x27;New Event&#x27;. */
    event_name: z.string().optional(),
    /** A list of start and end times for each event part. If only one time span specified, will be treated as a single day event. A maximum of 30 time spans may be specified and must occur in the future within 1 year. (required) */
    event_times: z.array(z.object({ end_time: z.string(), start_time: z.string() })),
    /** The unique identifier of the Guest type for this event. Guest types must be eligible and allowed for invites in visibility controls. Guest types can be retrieved with the Guest Type API. (required) */
    guest_type_id: z.string().uuid(),
    /** The unique identifier of the host. Valid hosts can be retrieved with the Guest Host API. (required) */
    host_id: z.string().uuid(),
    /** List of invitees for the event. */
    invitees: z.array(z.object({ email: z.string().optional(), full_name: z.string(), notes: z.string().max(100).optional(), phone_number: z.string().optional() })).min(0),
    /** Whether a RSVP link should be generated. */
    rsvp_enabled: z.boolean().optional(),
    /** The unique identifier of the Guest site. Valid sites can be retrieved with the Guest Site API. (required) */
    site_id: z.string().uuid(),
    /** Whether walk-ins are allowed to the event. */
    walk_in_enabled: z.boolean().optional(),
  }),
})`,
        description: '',
      }
      // Examples:
      // 'postSomeOperationV1': {
      //   schema: `z.object({ customField: z.string() })`,
      //   description: 'Custom input schema for this operation',
      // },
    },
    // Output schema overrides for operations that need custom output schemas
    outputSchemaOverrides: {
      'getThumbnailImageViewV1': {
        schema: `z.object({
  type: z.literal('image'),
  data: z.string(),
  mimeType: z.string(),
})`,
        description: 'Returns image data in base64 format',
      },
      'getThumbnailLatestViewV1': {
        schema: `z.object({
  type: z.literal('image'),
  data: z.string(),
  mimeType: z.string(),
})`,
        description: 'Returns image data in base64 format',
      },
      'getVideoTaggingEventTypeViewV1': {
        schema: `z.object({
  /** A list of event types. */
  event_types: z.array(
    z.object({
      event_schema: z.record(z.string()),
      event_type_uid: z.string(),
      name: z.string(),
      org_id: z.string()
    })
  ),
})`,
        description: 'Returns a list of event types',
      },
      'postVideoTaggingEventTypeViewV1': {
        schema: `z.object({
  /** The schema of the event type. */
  event_schema: z.record(z.enum(['string', 'integer', 'float', 'boolean'])),
  /** The unique identifier of the event type. */
  event_type_uid: z.string(),
  /** The name of the event type. */
  name: z.string(),
  /** The unique identifier of the organization. */
  org_id: z.string(),
})`,
        description: 'Return the create event type',
      },
      'postVideoTaggingEventSearchViewV1': {
        schema: `z.object({
  /** A list of events. */
  events: z.array(z.object({ attributes: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(), camera_id: z.string(), event_type_uid: z.string(), flagged: z.boolean().optional(), org_id: z.string(), time_ms: z.number().int() })),
  /** Next token for pagination. */
  next_token: z.number().int(),
})`,
        description: 'OK',
      },
      'getVideoTaggingEventViewV1': {
        schema: `z.object({
  /** list of event attributes. */
  attributes: z.record(z.string()),
  //attributes: z.record(z.union([z.string(), z.number(), z.boolean()])),
  /** The unique identifier of the camera. */
  camera_id: z.string(),
  /** The unique identifier of the event type. */
  event_type_uid: z.string(),
  /** Whether or not an event is flagged. */
  flagged: z.boolean(),
  /** The unique identifier of the organization. */
  org_id: z.string(),
  /** The event epoch time in milliseconds. */
  time_ms: z.number().int(),
})`,
        description: 'OK',
      },
      'getSensorDataViewV1': {
        schema: `z.object({
  /** Array of sensor data points */
  data: z.array(z.object({
    /** Ambient light level in lux */
    ambient_light: z.number().optional(),
    /** Barometric pressure in Pascals */
    barometric_pressure: z.number().optional(),
    /** Carbon dioxide level in ppm */
    carbon_dioxide: z.number().optional(),
    /** Carbon monoxide level in ppm */
    carbon_monoxide: z.number().optional(),
    /** Formaldehyde level */
    formaldehyde: z.number().optional(),
    /** Heat index temperature */
    heat_index: z.number().optional(),
    /** Relative humidity percentage */
    humidity: z.number().optional(),
    /** Motion detection (0 = no motion, 1 = motion detected) */
    motion: z.number().optional(),
    /** Noise level in decibels */
    noise_level: z.number().optional(),
    /** Particulate matter 1.0 µm concentration */
    pm_1_0_0: z.number().optional(),
    /** Particulate matter 2.5 µm concentration */
    pm_2_5: z.number().optional(),
    /** Particulate matter 4.0 µm concentration */
    pm_4_0: z.number().optional(),
    /** Tamper detection (0 = no tamper, 1 = tamper detected) */
    tamper: z.number().optional(),
    /** Temperature in Celsius */
    temperature: z.number().optional(),
    /** Unix timestamp of the data point */
    time: z.number().optional(),
    /** Total Volatile Organic Compounds index */
    tvoc_index: z.number().optional(),
    /** USA Air Quality Index */
    usa_air_quality_index: z.number().optional(),
    /** Vape detection index */
    vape_index: z.number().optional(),
  }))
})`,
        description: 'Returns a list of sensor data points',
      }
    },

    // Parameters to hide from the tool interface (use defaults)
    hiddenParameters: [
      'x-verkada-user-id',
    ],

    // Default values for parameters
    defaultParameters: {
      page_size: 100,
      limit: 100,
    },
  },

  categories: {
    // Rules for assigning operations to categories
    // Evaluated in order, first match wins
    rules: [
      { pattern: /^\/token/, category: 'command/authentication' },
      { pattern: /^\/access\/v1\/access_groups/, category: 'product/access' },
      { pattern: /^\/access\/v1\/access_users/, category: 'product/access' },
      { pattern: /^\/access\/v1\/credentials/, category: 'product/access' },
      { pattern: /^\/v2\/access\/external_users/, category: 'product/access' },
      { pattern: /^\/v2\/access\/users/, category: 'product/access' },
      { pattern: /^\/access\/v1\/door/, category: 'product/access' },
      { pattern: /^\/access\/v1\/scenarios/, category: 'product/access' },
      { pattern: /^\/alarms\/v1\/devices/, category: 'command/device' },
      { pattern: /^\/cameras\/v1\/devices/, category: 'command/device' },
      { pattern: /^\/cameras\/v1\/occupancy_trend_enabled/, category: 'product/camera' },
      { pattern: /^\/viewing_station\/v1\/devices/, category: 'command/device' },
      { pattern: /^\/alarms\/v1\/sites/, category: 'command/site' },
      { pattern: /^\/guest\/v1\/sites/, category: 'command/site' },
      { pattern: /^\/cameras\/v1\/alerts/, category: 'command/alert' },
      { pattern: /^\/environment\/v1\/alerts/, category: 'command/alert' },
      { pattern: /^\/caneras\/v1\/analytics/, category: 'product/camera' },
      { pattern: /^\/v2\/analytics\/operational_dashboard/, category: 'product/camera' },
      { pattern: /^\/cameras\/v1\/analytics/, category: 'product/camera' },
      { pattern: /^\/cameras\/v1\/audio/, category: 'product/camera' },
      { pattern: /^\/cameras\/v1\/cloud_backup/, category: 'product/camera' },
      { pattern: /^\/cameras\/v1\/footage/, category: 'product/camera' },
      { pattern: /^\/stream\/cameras\/v1/, category: 'product/camera' },
      { pattern: /^\/cameras\/v1\/people/, category: 'product/camera' },
      { pattern: /^\/cameras\/v1\/video_tagging/, category: 'product/helix' },
      { pattern: /^\/core\/v1\/audit_log/, category: 'command/audit-log' },
      { pattern: /^\/core\/v1\/user/, category: 'command/user' },
      { pattern: /^\/environment\/v1\/data/, category: 'product/sensor' },
      { pattern: /^\/events\/v1\/access/, category: 'product/access' },
      { pattern: /^\/v2\/events/, category: 'command/alert' },
      { pattern: /^\/v2\/guest\/guest_events/, category: 'product/guest' },
      { pattern: /^\/guest\/v1\/deny_list/, category: 'product/guest' },
      { pattern: /^\/guest\/v1\/visits/, category: 'product/guest' },
      { pattern: /^\/v2\/guest\/guest_types/, category: 'product/guest' },
      { pattern: /^\/v2\/guest\/hosts/, category: 'product/guest' }
    ],
    defaultCategory: 'misc',
  },

  options: {
    generateZodSchemas: true,
    generateTests: false,
    preserveManualEdits: true,
    dryRun: false,
    verbose: false,
    watch: false,
  },
};

// ============================================================================
// NAME TRANSFORMATION RULES
// ============================================================================

/**
 * Rules for transforming operation IDs to tool names
 */
export const nameTransformRules = {
  // Suffixes to remove from operation IDs
  suffixesToRemove: [
    'ViewV1',
    'ViewV2',
    'V1',
    'V2',
  ],

  // Verb mappings: HTTP method + context -> tool verb
  verbMappings: {
    get: {
      list: ['list', 'all', 'users', 'groups', 'devices', 'events', 'alerts'],
      default: 'get',
    },
    post: {
      default: 'create',
      exceptions: {
        unlock: 'unlock',
        activate: 'activate',
        invite: 'invite',
        search: 'search',
        query: 'query',
      },
    },
    put: {
      default: 'update',
      exceptions: {
        activate: 'activate',
        deactivate: 'deactivate',
      },
    },
    patch: {
      default: 'update',
    },
    delete: {
      default: 'delete',
    },
  },
};

// ============================================================================
// DESCRIPTION TEMPLATES
// ============================================================================

/**
 * Templates for generating LLM-friendly descriptions
 */
export const descriptionTemplates = {
  list: 'List all {resource}. Use this to enumerate or search through {resource}.',
  get: 'Get a specific {resource} by ID. Returns detailed information about the {resource}.',
  create: 'Create a new {resource}. Provide the required fields in the request body.',
  update: 'Update an existing {resource}. Only the provided fields will be changed.',
  delete: 'Delete a {resource}. This action cannot be undone.',
  activate: 'Enable {feature} for the specified {resource}.',
  deactivate: 'Disable {feature} for the specified {resource}.',
  unlock: 'Remotely unlock the specified {resource}.',
  invite: 'Send an invitation to enable {feature} for the specified {resource}.',
  search: 'Search for {resource} matching the provided criteria.',
  query: 'Query {resource} data with the specified parameters.',
};

// ============================================================================
// TOOL FILE GROUPING
// ============================================================================

/**
 * Defines how tools are grouped into files within each category
 */
export const toolGroupings: Record<string, ToolGroupConfig[]> = {
  access: [
    { file: 'groups', patterns: [/access.?group/i] },
    { file: 'users-basic', patterns: [/access.?user(?!.*(?:ble|unlock|entry|pass|photo))/i] },
    { file: 'users-unlock', patterns: [/ble|remote.?unlock/i] },
    { file: 'users-credentials', patterns: [/entry.?code|pass.*invite/i] },
    { file: 'users-photo', patterns: [/profile.?photo/i] },
    { file: 'credentials-card', patterns: [/credential.*card|card.*credential/i] },
    { file: 'credentials-plate', patterns: [/license.?plate/i] },
    { file: 'credentials-mfa', patterns: [/mfa/i] },
    { file: 'doors', patterns: [/door(?!.*(?:access.?level|exception|calendar))/i] },
    { file: 'levels', patterns: [/access.?level(?!.*schedule)/i] },
    { file: 'schedule-events', patterns: [/schedule.?event/i] },
    { file: 'calendars', patterns: [/exception.?calendar(?!.*exception)/i] },
    { file: 'calendar-exceptions', patterns: [/calendar.*exception/i] },
    { file: 'scenarios', patterns: [/scenario/i] },
  ],
  cameras: [
    { file: 'devices', patterns: [/^(?=.*camera)(?=.*device)/i, /^list.*camera/i] },
    { file: 'alerts', patterns: [/alert/i] },
    { file: 'footage-access', patterns: [/footage.*(?:link|token)|stream/i] },
    { file: 'thumbnails', patterns: [/thumbnail/i] },
    { file: 'analytics-occupancy', patterns: [/occupancy|dashboard.*trend/i] },
    { file: 'analytics-objects', patterns: [/object.?count/i] },
    { file: 'analytics-mqtt', patterns: [/mqtt/i] },
    { file: 'lpr-data', patterns: [/lpr.*(?:image|timestamp)/i] },
    { file: 'lpr-poi', patterns: [/plate.?of.?interest(?!.*batch)/i] },
    { file: 'lpr-batch', patterns: [/plate.?of.?interest.*batch|batch.*plate/i] },
    { file: 'audio', patterns: [/audio/i] },
    { file: 'cloud-backup', patterns: [/cloud.?backup/i] },
    { file: 'people', patterns: [/person.?of.?interest|people/i] },
    { file: 'video-tagging-events', patterns: [/video.?tag.*event(?!.*type)/i] },
    { file: 'video-tagging-types', patterns: [/video.?tag.*(?:type|search)/i] },
  ],
  guest: [
    { file: 'sites', patterns: [/guest.*site/i] },
    { file: 'visits', patterns: [/visit/i] },
    { file: 'deny-list', patterns: [/deny/i] },
    { file: 'events', patterns: [/guest.*event/i] },
    { file: 'types', patterns: [/guest.?type/i] },
    { file: 'hosts', patterns: [/host/i] },
  ],
  events: [
    { file: 'access-events', patterns: [/access.*event/i] },
    { file: 'unified-events', patterns: [/^(?!.*access).*event/i] },
  ],
  core: [
    { file: 'users', patterns: [/user/i] },
    { file: 'audit-log', patterns: [/audit/i] },
  ],
  auth: [
    { file: 'token', patterns: [/token/i] },
  ],
  alarms: [
    { file: 'devices', patterns: [/device/i] },
    { file: 'sites', patterns: [/site/i] },
  ],
  environment: [
    { file: 'alerts', patterns: [/alert/i] },
    { file: 'data', patterns: [/data/i] },
  ],
  'viewing-station': [
    { file: 'devices', patterns: [/device/i] },
  ],
  'face-unlock': [
    { file: 'user-operations', patterns: [/user.*face/i] },
    { file: 'external-operations', patterns: [/external.*face/i] },
  ],
};

export interface ToolGroupConfig {
  file: string;
  patterns: RegExp[];
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Configuration validation error
 */
export class ConfigValidationError extends Error {
  constructor(
    message: string,
    public readonly field: string,
    public readonly value: unknown
  ) {
    super(message);
    this.name = 'ConfigValidationError';
  }
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: ConfigValidationError[];
}

/**
 * Validate a configuration object
 */
export function validateConfig(config: GeneratorConfig): ValidationResult {
  const errors: ConfigValidationError[] = [];

  // Validate input paths
  if (!config.input.openapiPath || typeof config.input.openapiPath !== 'string') {
    errors.push(
      new ConfigValidationError(
        'OpenAPI path must be a non-empty string',
        'input.openapiPath',
        config.input.openapiPath
      )
    );
  }

  // Validate output paths
  const outputPaths = ['baseDir', 'serverDir', 'typesDir', 'toolsDir', 'schemasDir'] as const;
  for (const pathKey of outputPaths) {
    const value = config.output[pathKey];
    if (!value || typeof value !== 'string') {
      errors.push(
        new ConfigValidationError(
          `Output ${pathKey} must be a non-empty string`,
          `output.${pathKey}`,
          value
        )
      );
    }
  }

  // Validate transform settings
  if (typeof config.transform.nameOverrides !== 'object' || config.transform.nameOverrides === null) {
    errors.push(
      new ConfigValidationError(
        'Name overrides must be an object',
        'transform.nameOverrides',
        config.transform.nameOverrides
      )
    );
  }

  if (typeof config.transform.descriptionOverrides !== 'object' || config.transform.descriptionOverrides === null) {
    errors.push(
      new ConfigValidationError(
        'Description overrides must be an object',
        'transform.descriptionOverrides',
        config.transform.descriptionOverrides
      )
    );
  }

  if (!Array.isArray(config.transform.hiddenParameters)) {
    errors.push(
      new ConfigValidationError(
        'Hidden parameters must be an array',
        'transform.hiddenParameters',
        config.transform.hiddenParameters
      )
    );
  }

  if (typeof config.transform.defaultParameters !== 'object' || config.transform.defaultParameters === null) {
    errors.push(
      new ConfigValidationError(
        'Default parameters must be an object',
        'transform.defaultParameters',
        config.transform.defaultParameters
      )
    );
  }

  if (typeof config.transform.inputSchemaOverrides !== 'object' || config.transform.inputSchemaOverrides === null) {
    errors.push(
      new ConfigValidationError(
        'Input schema overrides must be an object',
        'transform.inputSchemaOverrides',
        config.transform.inputSchemaOverrides
      )
    );
  }

  if (typeof config.transform.outputSchemaOverrides !== 'object' || config.transform.outputSchemaOverrides === null) {
    errors.push(
      new ConfigValidationError(
        'Output schema overrides must be an object',
        'transform.outputSchemaOverrides',
        config.transform.outputSchemaOverrides
      )
    );
  }

  // Validate categories
  if (!Array.isArray(config.categories.rules)) {
    errors.push(
      new ConfigValidationError(
        'Category rules must be an array',
        'categories.rules',
        config.categories.rules
      )
    );
  } else {
    for (let i = 0; i < config.categories.rules.length; i++) {
      const rule = config.categories.rules[i];
      if (!(rule.pattern instanceof RegExp)) {
        errors.push(
          new ConfigValidationError(
            `Category rule ${i} pattern must be a RegExp`,
            `categories.rules[${i}].pattern`,
            rule.pattern
          )
        );
      }
      if (!rule.category || typeof rule.category !== 'string') {
        errors.push(
          new ConfigValidationError(
            `Category rule ${i} category must be a non-empty string`,
            `categories.rules[${i}].category`,
            rule.category
          )
        );
      }
    }
  }

  if (!config.categories.defaultCategory || typeof config.categories.defaultCategory !== 'string') {
    errors.push(
      new ConfigValidationError(
        'Default category must be a non-empty string',
        'categories.defaultCategory',
        config.categories.defaultCategory
      )
    );
  }

  // Validate options (all must be booleans)
  const booleanOptions = [
    'generateZodSchemas',
    'generateTests',
    'preserveManualEdits',
    'dryRun',
    'verbose',
    'watch',
  ] as const;

  for (const optionKey of booleanOptions) {
    const value = config.options[optionKey];
    if (typeof value !== 'boolean') {
      errors.push(
        new ConfigValidationError(
          `Option ${optionKey} must be a boolean`,
          `options.${optionKey}`,
          value
        )
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate config and throw if invalid
 */
export function assertValidConfig(config: GeneratorConfig): void {
  const result = validateConfig(config);
  if (!result.valid) {
    const messages = result.errors.map((e) => `  - ${e.field}: ${e.message}`).join('\n');
    throw new Error(`Invalid configuration:\n${messages}`);
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Load and merge configuration from file
 */
export function loadConfig(overrides: Partial<GeneratorConfig> = {}): GeneratorConfig {
  const config: GeneratorConfig = {
    ...defaultConfig,
    ...overrides,
    input: { ...defaultConfig.input, ...overrides.input },
    output: { ...defaultConfig.output, ...overrides.output },
    transform: { ...defaultConfig.transform, ...overrides.transform },
    categories: { ...defaultConfig.categories, ...overrides.categories },
    options: { ...defaultConfig.options, ...overrides.options },
  };

  return config;
}

/**
 * Load and validate configuration
 */
export function loadAndValidateConfig(overrides: Partial<GeneratorConfig> = {}): GeneratorConfig {
  const config = loadConfig(overrides);
  assertValidConfig(config);
  return config;
}

/**
 * Get category for a given path
 */
export function getCategoryForPath(path: string, config: GeneratorConfig = defaultConfig): string {
  for (const rule of config.categories.rules) {
    if (rule.pattern.test(path)) {
      return rule.category;
    }
  }
  return config.categories.defaultCategory;
}

/**
 * Get tool file grouping for a category
 */
export function getToolGrouping(category: string): ToolGroupConfig[] {
  return toolGroupings[category] || [{ file: 'index', patterns: [/.*/] }];
}
