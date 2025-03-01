// local errors
export const CONNECTION_ERROR					= 0;
export const CONNECTION_ABORTED					= 1;

// Information responses
export const HTTP_CONTINUE						= 100;
export const HTTP_SWITCHING_PROTO				= 101;
export const HTTP_PROCESSING					= 102;
export const HTTP_EARLY_HINTS					= 103;
// Successful responses
export const HTTP_OK							= 200;
export const HTTP_CREATED						= 201;
export const HTTP_ACCTEPTED						= 202;
export const HTTP_NON_AUTHORITATIVE_INFO		= 203;
export const HTTP_NO_CONTENT					= 204;
export const HTTP_RESET_CONTENT					= 205;
export const HTTP_PARTIAL_CONTENT				= 206;
export const HTTP_MULTY_STATUS					= 207;
export const HTTP_ALREADY_REPORTED				= 208;
export const HTTP_IM_USED						= 226;
// Redirection messages
export const HTTP_MULTIPLE_CHOISES				= 300;
export const HTTP_MOVED_PERMANENTLY				= 301;
export const HTTP_FOUND							= 302;
export const HTTP_SEE_OTHER						= 303;
export const HTTP_NOT_MODIFIED					= 304;
export const HTTP_TEMPORARY_REDIRECT			= 307;
export const HTTP_PERMANENT_REDIRECT			= 308;
// Client error responses
export const HTTP_BAD_REQUEST					= 400;
export const HTTP_UNAUTHORIZED					= 401;
export const HTTP_PAYMENT_REQUIRED				= 402;
export const HTTP_FORBIDDEN						= 403;
export const HTTP_NOT_FOUND						= 404;
export const HTTP_METHOD_NOT_ALLOWED			= 405;
export const HTTP_NOT_ACCEPTABLE				= 406;
export const HTTP_PROXY_AUTH_REQUIRED			= 407;
export const HTTP_REQUEST_TIMEOUT				= 408;
export const HTTP_CONFLICT						= 409;
export const HTTP_GONE							= 410;
export const HTTP_LENGTH_REQUIRED				= 411;
export const HTTP_PRECODITION_FAILED			= 412;
export const HTTP_PAYLOAD_TOO_LARGE				= 413;
export const HTTP_URI_TOO_LONG					= 414;
export const HTTP_UNSUPORTED_MEDIA_TYPE			= 415;
export const HTTP_RANGE_NOT_SATISFIABLE			= 416;
export const HTTP_EXPECTATION_FAILED			= 417;
export const HTTP_MISDIRECTED_REQUEST			= 421;
export const HTTP_UNPROCESSABLE_CONTENT			= 422;
export const HTTP_LOCKED						= 423;
export const HTTP_FAILED_DEPENDENCY				= 424;
export const HTTP_TOO_EARLY						= 425;
export const HTTP_UPGRADE_REQUIRED				= 426;
export const HTTP_PRECONDITION_REQUIRED			= 428;
export const HTTP_TOO_MANY_REQUESTS				= 429;
export const HTTP_RQST_HEADER_FIELDS_LARGE		= 431;
export const HTTP_UNAVAILABLE_FOR_LEGAL_REASONS = 451;
// Server error responses
export const HTTP_SERVER_ERROR					= 500;
export const HTTP_NOT_IMPLEMENTED				= 501;
export const HTTP_BAD_GATEWAY					= 502;
export const HTTP_SERVICE_UNAVAILABLE			= 503;
export const HTTP_GATEWAY_TIMEOUT				= 504;
export const HTTP_VERSION_NOT_SUPPORTED			= 505;
export const HTTP_VARIANT_ALSO_NEGOTIATES		= 506;
export const HTTP_INSUFFICIENT_STORAGE			= 507;
export const HTTP_LOOP_DETECTED					= 508;
export const HTTP_NOT_EXTENDED					= 510;
export const HTTP_NETWORK_AUTH_REQUIRED			= 511;
