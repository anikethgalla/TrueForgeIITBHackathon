"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/cli/trueforgeCli.ts
var readline = __toESM(require("readline"));

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/json.mjs
var toJson = (value, replacer, space) => {
  return JSON.stringify(value, replacer, space);
};
function fromJson(text, reviver) {
  return JSON.parse(text, reviver);
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/errors/TrueForgeError.mjs
var TrueForgeError = class extends Error {
  constructor({ message, statusCode, body, rawResponse, cause }) {
    super(buildMessage({ message, statusCode, body }));
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "TrueForgeError";
    this.statusCode = statusCode;
    this.body = body;
    this.rawResponse = rawResponse;
    if (cause != null) {
      this.cause = cause;
    }
  }
  get requestId() {
    var _a, _b, _c;
    return (_c = (_b = (_a = this.rawResponse) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.get("x-request-id")) !== null && _c !== void 0 ? _c : void 0;
  }
};
function buildMessage({ message, statusCode, body }) {
  const lines = [];
  if (message != null) {
    lines.push(message);
  }
  if (statusCode != null) {
    lines.push(`Status code: ${statusCode.toString()}`);
  }
  if (body != null) {
    lines.push(`Body: ${toJson(body, void 0, 2)}`);
  }
  return lines.join("\n");
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/errors/TrueForgeTimeoutError.mjs
var TrueForgeTimeoutError = class extends TrueForgeError {
  constructor(message, opts) {
    super({
      message,
      cause: opts === null || opts === void 0 ? void 0 : opts.cause
    });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "TrueForgeTimeoutError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/errors/BadGatewayError.mjs
var BadGatewayError = class extends TrueForgeError {
  constructor(body, rawResponse) {
    super({
      message: "BadGatewayError",
      statusCode: 502,
      body,
      rawResponse
    });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "BadGatewayError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/errors/BadRequestError.mjs
var BadRequestError = class extends TrueForgeError {
  constructor(body, rawResponse) {
    super({
      message: "BadRequestError",
      statusCode: 400,
      body,
      rawResponse
    });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "BadRequestError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/errors/ConflictError.mjs
var ConflictError = class extends TrueForgeError {
  constructor(body, rawResponse) {
    super({
      message: "ConflictError",
      statusCode: 409,
      body,
      rawResponse
    });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "ConflictError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/errors/ContentTooLargeError.mjs
var ContentTooLargeError = class extends TrueForgeError {
  constructor(body, rawResponse) {
    super({
      message: "ContentTooLargeError",
      statusCode: 413,
      body,
      rawResponse
    });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "ContentTooLargeError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/errors/FailedDependencyError.mjs
var FailedDependencyError = class extends TrueForgeError {
  constructor(body, rawResponse) {
    super({
      message: "FailedDependencyError",
      statusCode: 424,
      body,
      rawResponse
    });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "FailedDependencyError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/errors/ForbiddenError.mjs
var ForbiddenError = class extends TrueForgeError {
  constructor(body, rawResponse) {
    super({
      message: "ForbiddenError",
      statusCode: 403,
      body,
      rawResponse
    });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "ForbiddenError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/errors/GoneError.mjs
var GoneError = class extends TrueForgeError {
  constructor(body, rawResponse) {
    super({
      message: "GoneError",
      statusCode: 410,
      body,
      rawResponse
    });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "GoneError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/errors/InternalServerError.mjs
var InternalServerError = class extends TrueForgeError {
  constructor(body, rawResponse) {
    super({
      message: "InternalServerError",
      statusCode: 500,
      body,
      rawResponse
    });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "InternalServerError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/errors/NotFoundError.mjs
var NotFoundError = class extends TrueForgeError {
  constructor(body, rawResponse) {
    super({
      message: "NotFoundError",
      statusCode: 404,
      body,
      rawResponse
    });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "NotFoundError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/errors/PreconditionFailedError.mjs
var PreconditionFailedError = class extends TrueForgeError {
  constructor(body, rawResponse) {
    super({
      message: "PreconditionFailedError",
      statusCode: 412,
      body,
      rawResponse
    });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "PreconditionFailedError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/errors/UnauthorizedError.mjs
var UnauthorizedError = class extends TrueForgeError {
  constructor(body, rawResponse) {
    super({
      message: "UnauthorizedError",
      statusCode: 401,
      body,
      rawResponse
    });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "UnauthorizedError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/errors/UnprocessableEntityError.mjs
var UnprocessableEntityError = class extends TrueForgeError {
  constructor(body, rawResponse) {
    super({
      message: "UnprocessableEntityError",
      statusCode: 422,
      body,
      rawResponse
    });
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "UnprocessableEntityError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/auth/AuthProvider.mjs
function isAuthProvider(value) {
  return typeof value === "object" && value !== null && "getAuthRequest" in value && typeof value.getAuthRequest === "function";
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/auth/NoOpAuthProvider.mjs
var NoOpAuthProvider = class {
  getAuthRequest() {
    return Promise.resolve({ headers: {} });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/EndpointSupplier.mjs
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var EndpointSupplier = {
  get: (supplier, arg) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof supplier === "function") {
      return supplier(arg);
    } else {
      return supplier;
    }
  })
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/logging/logger.mjs
var LogLevel = {
  Debug: "debug",
  Info: "info",
  Warn: "warn",
  Error: "error"
};
var logLevelMap = {
  [LogLevel.Debug]: 1,
  [LogLevel.Info]: 2,
  [LogLevel.Warn]: 3,
  [LogLevel.Error]: 4
};
var ConsoleLogger = class {
  debug(message, ...args) {
    console.debug(message, ...args);
  }
  info(message, ...args) {
    console.info(message, ...args);
  }
  warn(message, ...args) {
    console.warn(message, ...args);
  }
  error(message, ...args) {
    console.error(message, ...args);
  }
};
var Logger = class {
  /**
   * Creates a new logger instance.
   * @param config - Logger configuration
   */
  constructor(config2) {
    this.level = logLevelMap[config2.level];
    this.logger = config2.logger;
    this.silent = config2.silent;
  }
  /**
   * Checks if a log level should be output based on configuration.
   * @param level - The log level to check
   * @returns True if the level should be logged
   */
  shouldLog(level) {
    return !this.silent && this.level <= logLevelMap[level];
  }
  /**
   * Checks if debug logging is enabled.
   * @returns True if debug logs should be output
   */
  isDebug() {
    return this.shouldLog(LogLevel.Debug);
  }
  /**
   * Logs a debug message if debug logging is enabled.
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  debug(message, ...args) {
    if (this.isDebug()) {
      this.logger.debug(message, ...args);
    }
  }
  /**
   * Checks if info logging is enabled.
   * @returns True if info logs should be output
   */
  isInfo() {
    return this.shouldLog(LogLevel.Info);
  }
  /**
   * Logs an info message if info logging is enabled.
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  info(message, ...args) {
    if (this.isInfo()) {
      this.logger.info(message, ...args);
    }
  }
  /**
   * Checks if warning logging is enabled.
   * @returns True if warning logs should be output
   */
  isWarn() {
    return this.shouldLog(LogLevel.Warn);
  }
  /**
   * Logs a warning message if warning logging is enabled.
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  warn(message, ...args) {
    if (this.isWarn()) {
      this.logger.warn(message, ...args);
    }
  }
  /**
   * Checks if error logging is enabled.
   * @returns True if error logs should be output
   */
  isError() {
    return this.shouldLog(LogLevel.Error);
  }
  /**
   * Logs an error message if error logging is enabled.
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  error(message, ...args) {
    if (this.isError()) {
      this.logger.error(message, ...args);
    }
  }
};
function createLogger(config2) {
  var _a, _b, _c;
  if (config2 == null) {
    return defaultLogger;
  }
  if (config2 instanceof Logger) {
    return config2;
  }
  config2 = config2 !== null && config2 !== void 0 ? config2 : {};
  (_a = config2.level) !== null && _a !== void 0 ? _a : config2.level = LogLevel.Info;
  (_b = config2.logger) !== null && _b !== void 0 ? _b : config2.logger = new ConsoleLogger();
  (_c = config2.silent) !== null && _c !== void 0 ? _c : config2.silent = true;
  return new Logger(config2);
}
var defaultLogger = new Logger({
  level: LogLevel.Info,
  logger: new ConsoleLogger(),
  silent: true
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/url/qs.mjs
var defaultQsOptions = {
  arrayFormat: "indices",
  encode: true
};
function encodeValue(value, shouldEncode) {
  if (value === void 0) {
    return "";
  }
  if (value === null) {
    return "";
  }
  const stringValue = String(value);
  return shouldEncode ? encodeURIComponent(stringValue) : stringValue;
}
function stringifyObject(obj, prefix = "", options) {
  const parts = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}[${key}]` : key;
    if (value == null) {
      continue;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        continue;
      }
      const effectiveFormat = options.arrayFormat;
      if (effectiveFormat === "comma") {
        const encodedKey = options.encode ? encodeURIComponent(fullKey) : fullKey;
        const encodedValues = value.filter((item) => item !== void 0 && item !== null).map((item) => encodeValue(item, options.encode));
        if (encodedValues.length > 0) {
          parts.push(`${encodedKey}=${encodedValues.join(",")}`);
        }
      } else {
        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          if (item == null) {
            continue;
          }
          if (typeof item === "object" && !Array.isArray(item) && item !== null) {
            const arrayKey = effectiveFormat === "indices" ? `${fullKey}[${i}]` : fullKey;
            parts.push(...stringifyObject(item, arrayKey, options));
          } else {
            const arrayKey = effectiveFormat === "indices" ? `${fullKey}[${i}]` : fullKey;
            const encodedKey = options.encode ? encodeURIComponent(arrayKey) : arrayKey;
            parts.push(`${encodedKey}=${encodeValue(item, options.encode)}`);
          }
        }
      }
    } else if (typeof value === "object" && value !== null) {
      if (Object.keys(value).length === 0) {
        continue;
      }
      parts.push(...stringifyObject(value, fullKey, options));
    } else {
      const encodedKey = options.encode ? encodeURIComponent(fullKey) : fullKey;
      parts.push(`${encodedKey}=${encodeValue(value, options.encode)}`);
    }
  }
  return parts;
}
function toQueryString(obj, options) {
  if (obj == null || typeof obj !== "object") {
    return "";
  }
  const parts = stringifyObject(obj, "", Object.assign(Object.assign({}, defaultQsOptions), options));
  return parts.join("&");
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/createRequestUrl.mjs
function createRequestUrl(baseUrl, queryParameters) {
  const queryString = toQueryString(queryParameters, { arrayFormat: "repeat" });
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/BinaryResponse.mjs
function getBinaryResponse(response) {
  const binaryResponse = {
    get bodyUsed() {
      return response.bodyUsed;
    },
    stream: () => response.body,
    arrayBuffer: response.arrayBuffer.bind(response),
    blob: response.blob.bind(response)
  };
  if ("bytes" in response && typeof response.bytes === "function") {
    binaryResponse.bytes = response.bytes.bind(response);
  }
  return binaryResponse;
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/getResponseBody.mjs
var __awaiter2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function retainResponse(target, response) {
  Object.defineProperty(target, "__fern_response_ref", {
    value: response,
    enumerable: false,
    configurable: true,
    writable: false
  });
}
function getResponseBody(response, responseType) {
  return __awaiter2(this, void 0, void 0, function* () {
    switch (responseType) {
      case "binary-response":
        return getBinaryResponse(response);
      case "blob":
        return yield response.blob();
      case "arrayBuffer":
        return yield response.arrayBuffer();
      case "sse":
        if (response.body == null) {
          return {
            ok: false,
            error: {
              reason: "body-is-null",
              statusCode: response.status
            }
          };
        }
        retainResponse(response.body, response);
        return response.body;
      case "streaming":
        if (response.body == null) {
          return {
            ok: false,
            error: {
              reason: "body-is-null",
              statusCode: response.status
            }
          };
        }
        retainResponse(response.body, response);
        return response.body;
      case "text":
        return yield response.text();
    }
    const text = yield response.text();
    if (text.length > 0) {
      try {
        const responseBody = fromJson(text);
        return responseBody;
      } catch (_err) {
        return {
          ok: false,
          error: {
            reason: "non-json",
            statusCode: response.status,
            rawBody: text
          }
        };
      }
    }
    return void 0;
  });
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/getErrorResponseBody.mjs
var __awaiter3 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function getErrorResponseBody(response) {
  return __awaiter3(this, void 0, void 0, function* () {
    var _a, _b, _c;
    let contentType = (_a = response.headers.get("Content-Type")) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (contentType == null || contentType.length === 0) {
      return getResponseBody(response);
    }
    if (contentType.indexOf(";") !== -1) {
      contentType = (_c = (_b = contentType.split(";")[0]) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : "";
    }
    switch (contentType) {
      case "application/hal+json":
      case "application/json":
      case "application/ld+json":
      case "application/problem+json":
      case "application/vnd.api+json":
      case "text/json": {
        const text = yield response.text();
        return text.length > 0 ? fromJson(text) : void 0;
      }
      default:
        if (contentType.startsWith("application/vnd.") && contentType.endsWith("+json")) {
          const text = yield response.text();
          return text.length > 0 ? fromJson(text) : void 0;
        }
        return yield response.text();
    }
  });
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/getFetchFn.mjs
var __awaiter4 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function getFetchFn() {
  return __awaiter4(this, void 0, void 0, function* () {
    return fetch;
  });
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/getRequestBody.mjs
var __awaiter5 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function getRequestBody(_a) {
  return __awaiter5(this, arguments, void 0, function* ({ body, type }) {
    if (type === "form") {
      return toQueryString(body, { arrayFormat: "repeat", encode: true });
    }
    if (type.includes("json")) {
      return toJson(body);
    } else {
      return body;
    }
  });
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/Headers.mjs
var Headers2;
if (typeof globalThis.Headers !== "undefined") {
  Headers2 = globalThis.Headers;
} else {
  Headers2 = class Headers3 {
    constructor(init) {
      this.headers = /* @__PURE__ */ new Map();
      if (init) {
        if (init instanceof Headers3) {
          init.forEach((value, key) => this.append(key, value));
        } else if (Array.isArray(init)) {
          for (const [key, value] of init) {
            if (typeof key === "string" && typeof value === "string") {
              this.append(key, value);
            } else {
              throw new TypeError("Each header entry must be a [string, string] tuple");
            }
          }
        } else {
          for (const [key, value] of Object.entries(init)) {
            if (typeof value === "string") {
              this.append(key, value);
            } else {
              throw new TypeError("Header values must be strings");
            }
          }
        }
      }
    }
    append(name, value) {
      const key = name.toLowerCase();
      const existing = this.headers.get(key) || [];
      this.headers.set(key, [...existing, value]);
    }
    delete(name) {
      const key = name.toLowerCase();
      this.headers.delete(key);
    }
    get(name) {
      const key = name.toLowerCase();
      const values = this.headers.get(key);
      return values ? values.join(", ") : null;
    }
    has(name) {
      const key = name.toLowerCase();
      return this.headers.has(key);
    }
    set(name, value) {
      const key = name.toLowerCase();
      this.headers.set(key, [value]);
    }
    forEach(callbackfn, thisArg) {
      const boundCallback = thisArg ? callbackfn.bind(thisArg) : callbackfn;
      this.headers.forEach((values, key) => boundCallback(values.join(", "), key, this));
    }
    getSetCookie() {
      return this.headers.get("set-cookie") || [];
    }
    *entries() {
      for (const [key, values] of this.headers.entries()) {
        yield [key, values.join(", ")];
      }
    }
    *keys() {
      yield* this.headers.keys();
    }
    *values() {
      for (const values of this.headers.values()) {
        yield values.join(", ");
      }
    }
    [Symbol.iterator]() {
      return this.entries();
    }
  };
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/signals.mjs
var TIMEOUT = "timeout";
function getTimeoutSignal(timeoutMs) {
  const controller = new AbortController();
  const abortId = setTimeout(() => controller.abort(TIMEOUT), timeoutMs);
  return { signal: controller.signal, abortId };
}
function anySignal(...args) {
  const signals = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
  const controller = new AbortController();
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal === null || signal === void 0 ? void 0 : signal.reason);
      return controller.signal;
    }
    signal.addEventListener("abort", () => controller.abort(signal === null || signal === void 0 ? void 0 : signal.reason), {
      signal: controller.signal
    });
    if (signal.aborted) {
      controller.abort(signal === null || signal === void 0 ? void 0 : signal.reason);
      return controller.signal;
    }
  }
  return controller.signal;
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/makeRequest.mjs
var __awaiter6 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var _cacheNoStoreSupported;
function isCacheNoStoreSupported() {
  if (_cacheNoStoreSupported != null) {
    return _cacheNoStoreSupported;
  }
  try {
    new Request("http://localhost", { cache: "no-store" });
    _cacheNoStoreSupported = true;
  } catch (_a) {
    _cacheNoStoreSupported = false;
  }
  return _cacheNoStoreSupported;
}
var makeRequest = (fetchFn, url, method, headers, requestBody, timeoutMs, abortSignal, withCredentials, duplex, disableCache) => __awaiter6(void 0, void 0, void 0, function* () {
  const signals = [];
  let timeoutAbortId;
  if (timeoutMs != null) {
    const { signal, abortId } = getTimeoutSignal(timeoutMs);
    timeoutAbortId = abortId;
    signals.push(signal);
  }
  if (abortSignal != null) {
    signals.push(abortSignal);
  }
  const newSignals = anySignal(signals);
  const response = yield fetchFn(url, Object.assign({
    method,
    headers,
    body: requestBody,
    signal: newSignals,
    credentials: withCredentials ? "include" : void 0,
    // @ts-ignore
    duplex
  }, disableCache && isCacheNoStoreSupported() ? { cache: "no-store" } : {}));
  if (timeoutAbortId != null) {
    clearTimeout(timeoutAbortId);
  }
  return response;
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/RawResponse.mjs
var abortRawResponse = {
  headers: new Headers2(),
  redirected: false,
  status: 499,
  statusText: "Client Closed Request",
  type: "error",
  url: ""
};
var unknownRawResponse = {
  headers: new Headers2(),
  redirected: false,
  status: 0,
  statusText: "Unknown Error",
  type: "error",
  url: ""
};
function toRawResponse(response) {
  return {
    headers: response.headers,
    redirected: response.redirected,
    status: response.status,
    statusText: response.statusText,
    type: response.type,
    url: response.url
  };
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/redactUrl.mjs
var SENSITIVE_QUERY_PARAMS = /* @__PURE__ */ new Set([
  "api_key",
  "api-key",
  "apikey",
  "token",
  "access_token",
  "access-token",
  "auth_token",
  "auth-token",
  "password",
  "passwd",
  "secret",
  "api_secret",
  "api-secret",
  "apisecret",
  "key",
  "session",
  "session_id",
  "session-id"
]);
function redactUrl(url) {
  const protocolIndex = url.indexOf("://");
  if (protocolIndex === -1)
    return url;
  const afterProtocol = protocolIndex + 3;
  const pathStart = url.indexOf("/", afterProtocol);
  let queryStart = url.indexOf("?", afterProtocol);
  let fragmentStart = url.indexOf("#", afterProtocol);
  const firstDelimiter = Math.min(pathStart === -1 ? url.length : pathStart, queryStart === -1 ? url.length : queryStart, fragmentStart === -1 ? url.length : fragmentStart);
  let atIndex = -1;
  for (let i = afterProtocol; i < firstDelimiter; i++) {
    if (url[i] === "@") {
      atIndex = i;
    }
  }
  if (atIndex !== -1) {
    url = `${url.slice(0, afterProtocol)}[REDACTED]@${url.slice(atIndex + 1)}`;
  }
  queryStart = url.indexOf("?");
  if (queryStart === -1)
    return url;
  fragmentStart = url.indexOf("#", queryStart);
  const queryEnd = fragmentStart !== -1 ? fragmentStart : url.length;
  const queryString = url.slice(queryStart + 1, queryEnd);
  if (queryString.length === 0)
    return url;
  const lower = queryString.toLowerCase();
  const hasSensitive = lower.includes("token") || lower.includes("key") || lower.includes("password") || lower.includes("passwd") || lower.includes("secret") || lower.includes("session") || lower.includes("auth");
  if (!hasSensitive) {
    return url;
  }
  const redactedParams = [];
  const params = queryString.split("&");
  for (const param of params) {
    const equalIndex = param.indexOf("=");
    if (equalIndex === -1) {
      redactedParams.push(param);
      continue;
    }
    const key = param.slice(0, equalIndex);
    let shouldRedact = SENSITIVE_QUERY_PARAMS.has(key.toLowerCase());
    if (!shouldRedact && key.includes("%")) {
      try {
        const decodedKey = decodeURIComponent(key);
        shouldRedact = SENSITIVE_QUERY_PARAMS.has(decodedKey.toLowerCase());
      } catch (_a) {
      }
    }
    redactedParams.push(shouldRedact ? `${key}=[REDACTED]` : param);
  }
  return url.slice(0, queryStart + 1) + redactedParams.join("&") + url.slice(queryEnd);
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/requestWithRetries.mjs
var __awaiter7 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var INITIAL_RETRY_DELAY = 1e3;
var MAX_RETRY_DELAY = 6e4;
var DEFAULT_MAX_RETRIES = 2;
var JITTER_FACTOR = 0.2;
function isRetryableStatusCode(statusCode) {
  return [408, 429].includes(statusCode) || statusCode >= 500;
}
function addPositiveJitter(delay) {
  const jitterMultiplier = 1 + Math.random() * JITTER_FACTOR;
  return delay * jitterMultiplier;
}
function addSymmetricJitter(delay) {
  const jitterMultiplier = 1 + (Math.random() - 0.5) * JITTER_FACTOR;
  return delay * jitterMultiplier;
}
function getRetryDelayFromHeaders(response, retryAttempt) {
  const retryAfter = response.headers.get("Retry-After");
  if (retryAfter) {
    const retryAfterSeconds = parseInt(retryAfter, 10);
    if (!Number.isNaN(retryAfterSeconds) && retryAfterSeconds > 0) {
      return Math.min(retryAfterSeconds * 1e3, MAX_RETRY_DELAY);
    }
    const retryAfterDate = new Date(retryAfter);
    if (!Number.isNaN(retryAfterDate.getTime())) {
      const delay = retryAfterDate.getTime() - Date.now();
      if (delay > 0) {
        return Math.min(Math.max(delay, 0), MAX_RETRY_DELAY);
      }
    }
  }
  const rateLimitReset = response.headers.get("X-RateLimit-Reset");
  if (rateLimitReset) {
    const resetTime = parseInt(rateLimitReset, 10);
    if (!Number.isNaN(resetTime)) {
      const delay = resetTime * 1e3 - Date.now();
      if (delay > 0) {
        return addPositiveJitter(Math.min(delay, MAX_RETRY_DELAY));
      }
    }
  }
  return addSymmetricJitter(Math.min(INITIAL_RETRY_DELAY * Math.pow(2, retryAttempt), MAX_RETRY_DELAY));
}
function requestWithRetries(requestFn_1) {
  return __awaiter7(this, arguments, void 0, function* (requestFn, maxRetries = DEFAULT_MAX_RETRIES) {
    let response = yield requestFn();
    for (let i = 0; i < maxRetries; ++i) {
      if (isRetryableStatusCode(response.status)) {
        const delay = getRetryDelayFromHeaders(response, i);
        yield new Promise((resolve) => setTimeout(resolve, delay));
        response = yield requestFn();
      } else {
        break;
      }
    }
    return response;
  });
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/Fetcher.mjs
var __awaiter8 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SENSITIVE_HEADERS = /* @__PURE__ */ new Set([
  "authorization",
  "www-authenticate",
  "x-api-key",
  "api-key",
  "apikey",
  "x-api-token",
  "x-auth-token",
  "auth-token",
  "cookie",
  "set-cookie",
  "proxy-authorization",
  "proxy-authenticate",
  "x-csrf-token",
  "x-xsrf-token",
  "x-session-token",
  "x-access-token"
]);
function redactHeaders(headers) {
  const filtered = {};
  for (const [key, value] of headers instanceof Headers2 ? headers.entries() : Object.entries(headers)) {
    if (SENSITIVE_HEADERS.has(key.toLowerCase())) {
      filtered[key] = "[REDACTED]";
    } else {
      filtered[key] = value;
    }
  }
  return filtered;
}
function redactQueryParameters(queryParameters) {
  if (queryParameters == null) {
    return void 0;
  }
  const redacted = {};
  for (const [key, value] of Object.entries(queryParameters)) {
    redacted[key] = SENSITIVE_QUERY_PARAMS.has(key.toLowerCase()) ? "[REDACTED]" : value;
  }
  return redacted;
}
function getHeaders(args) {
  return __awaiter8(this, void 0, void 0, function* () {
    var _a;
    const newHeaders = new Headers2();
    newHeaders.set("Accept", args.responseType === "json" ? "application/json" : args.responseType === "text" ? "text/plain" : args.responseType === "sse" ? "text/event-stream" : "*/*");
    if (args.body !== void 0 && args.contentType != null) {
      newHeaders.set("Content-Type", args.contentType);
    }
    if (args.headers == null) {
      return newHeaders;
    }
    for (const [key, value] of Object.entries(args.headers)) {
      const result = yield EndpointSupplier.get(value, { endpointMetadata: (_a = args.endpointMetadata) !== null && _a !== void 0 ? _a : {} });
      if (typeof result === "string") {
        newHeaders.set(key, result);
        continue;
      }
      if (result == null) {
        continue;
      }
      newHeaders.set(key, `${result}`);
    }
    return newHeaders;
  });
}
function fetcherImpl(args) {
  return __awaiter8(this, void 0, void 0, function* () {
    var _a, _b, _c;
    let url = args.url;
    if (args.queryString != null && args.queryString.length > 0) {
      url = `${url}?${args.queryString}`;
    } else {
      url = createRequestUrl(args.url, args.queryParameters);
    }
    const requestBody = yield getRequestBody({
      body: args.body,
      type: (_a = args.requestType) !== null && _a !== void 0 ? _a : "other"
    });
    const fetchFn = (_b = args.fetchFn) !== null && _b !== void 0 ? _b : yield getFetchFn();
    const headers = yield getHeaders(args);
    const logger = createLogger(args.logging);
    if (logger.isDebug()) {
      const metadata = {
        method: args.method,
        url: redactUrl(url),
        headers: redactHeaders(headers),
        queryParameters: redactQueryParameters(args.queryParameters),
        hasBody: requestBody != null
      };
      logger.debug("Making HTTP request", metadata);
    }
    try {
      const response = yield requestWithRetries(() => __awaiter8(this, void 0, void 0, function* () {
        return makeRequest(fetchFn, url, args.method, headers, requestBody, args.timeoutMs, args.abortSignal, args.withCredentials, args.duplex, args.responseType === "streaming" || args.responseType === "sse");
      }), args.maxRetries);
      if (response.status >= 200 && response.status < 400) {
        if (logger.isDebug()) {
          const metadata = {
            method: args.method,
            url: redactUrl(url),
            statusCode: response.status,
            responseHeaders: redactHeaders(response.headers)
          };
          logger.debug("HTTP request succeeded", metadata);
        }
        const body = yield getResponseBody(response, args.responseType);
        return {
          ok: true,
          body,
          headers: response.headers,
          rawResponse: toRawResponse(response)
        };
      } else {
        if (logger.isError()) {
          const metadata = {
            method: args.method,
            url: redactUrl(url),
            statusCode: response.status,
            responseHeaders: redactHeaders(Object.fromEntries(response.headers.entries()))
          };
          logger.error("HTTP request failed with error status", metadata);
        }
        return {
          ok: false,
          error: {
            reason: "status-code",
            statusCode: response.status,
            body: yield getErrorResponseBody(response)
          },
          rawResponse: toRawResponse(response)
        };
      }
    } catch (error) {
      if ((_c = args.abortSignal) === null || _c === void 0 ? void 0 : _c.aborted) {
        if (logger.isError()) {
          const metadata = {
            method: args.method,
            url: redactUrl(url)
          };
          logger.error("HTTP request was aborted", metadata);
        }
        return {
          ok: false,
          error: {
            reason: "unknown",
            errorMessage: "The user aborted a request",
            cause: error
          },
          rawResponse: abortRawResponse
        };
      } else if (error instanceof Error && error.name === "AbortError") {
        if (logger.isError()) {
          const metadata = {
            method: args.method,
            url: redactUrl(url),
            timeoutMs: args.timeoutMs
          };
          logger.error("HTTP request timed out", metadata);
        }
        return {
          ok: false,
          error: {
            reason: "timeout",
            cause: error
          },
          rawResponse: abortRawResponse
        };
      } else if (error instanceof Error) {
        if (logger.isError()) {
          const metadata = {
            method: args.method,
            url: redactUrl(url),
            errorMessage: error.message
          };
          logger.error("HTTP request failed with error", metadata);
        }
        return {
          ok: false,
          error: {
            reason: "unknown",
            errorMessage: error.message,
            cause: error
          },
          rawResponse: unknownRawResponse
        };
      }
      if (logger.isError()) {
        const metadata = {
          method: args.method,
          url: redactUrl(url),
          error: toJson(error)
        };
        logger.error("HTTP request failed with unknown error", metadata);
      }
      return {
        ok: false,
        error: {
          reason: "unknown",
          errorMessage: toJson(error),
          cause: error
        },
        rawResponse: unknownRawResponse
      };
    }
  });
}
var fetcher = fetcherImpl;

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/HttpResponsePromise.mjs
var __awaiter9 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var HttpResponsePromise = class _HttpResponsePromise extends Promise {
  constructor(promise) {
    super((resolve) => {
      resolve(void 0);
    });
    this.innerPromise = promise;
  }
  /**
   * Creates an `HttpResponsePromise` from a function that returns a promise.
   *
   * @param fn - A function that returns a promise resolving to a `WithRawResponse` object.
   * @param args - Arguments to pass to the function.
   * @returns An `HttpResponsePromise` instance.
   */
  static fromFunction(fn, ...args) {
    return new _HttpResponsePromise(fn(...args));
  }
  /**
   * Creates a function that returns an `HttpResponsePromise` from a function that returns a promise.
   *
   * @param fn - A function that returns a promise resolving to a `WithRawResponse` object.
   * @returns A function that returns an `HttpResponsePromise` instance.
   */
  static interceptFunction(fn) {
    return (...args) => {
      return _HttpResponsePromise.fromPromise(fn(...args));
    };
  }
  /**
   * Creates an `HttpResponsePromise` from an existing promise.
   *
   * @param promise - A promise resolving to a `WithRawResponse` object.
   * @returns An `HttpResponsePromise` instance.
   */
  static fromPromise(promise) {
    return new _HttpResponsePromise(promise);
  }
  /**
   * Creates an `HttpResponsePromise` from an executor function.
   *
   * @param executor - A function that takes resolve and reject callbacks to create a promise.
   * @returns An `HttpResponsePromise` instance.
   */
  static fromExecutor(executor) {
    const promise = new Promise(executor);
    return new _HttpResponsePromise(promise);
  }
  /**
   * Creates an `HttpResponsePromise` from a resolved result.
   *
   * @param result - A `WithRawResponse` object to resolve immediately.
   * @returns An `HttpResponsePromise` instance.
   */
  static fromResult(result) {
    const promise = Promise.resolve(result);
    return new _HttpResponsePromise(promise);
  }
  unwrap() {
    if (!this.unwrappedPromise) {
      this.unwrappedPromise = this.innerPromise.then(({ data }) => data);
    }
    return this.unwrappedPromise;
  }
  /** @inheritdoc */
  then(onfulfilled, onrejected) {
    return this.unwrap().then(onfulfilled, onrejected);
  }
  /** @inheritdoc */
  catch(onrejected) {
    return this.unwrap().catch(onrejected);
  }
  /** @inheritdoc */
  finally(onfinally) {
    return this.unwrap().finally(onfinally);
  }
  /**
   * Retrieves the data and raw response.
   *
   * @returns A promise resolving to a `WithRawResponse` object.
   */
  withRawResponse() {
    return __awaiter9(this, void 0, void 0, function* () {
      return yield this.innerPromise;
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/url/join.mjs
function join(base, ...segments) {
  if (!base) {
    return "";
  }
  if (segments.length === 0) {
    return base;
  }
  if (base.includes("://")) {
    let url;
    try {
      url = new URL(base);
    } catch (_a) {
      return joinPath(base, ...segments);
    }
    const lastSegment = segments[segments.length - 1];
    const shouldPreserveTrailingSlash = lastSegment === null || lastSegment === void 0 ? void 0 : lastSegment.endsWith("/");
    for (const segment of segments) {
      const cleanSegment = trimSlashes(segment);
      if (cleanSegment) {
        url.pathname = joinPathSegments(url.pathname, cleanSegment);
      }
    }
    if (shouldPreserveTrailingSlash && !url.pathname.endsWith("/")) {
      url.pathname += "/";
    }
    return url.toString();
  }
  return joinPath(base, ...segments);
}
function joinPath(base, ...segments) {
  if (segments.length === 0) {
    return base;
  }
  let result = base;
  const lastSegment = segments[segments.length - 1];
  const shouldPreserveTrailingSlash = lastSegment === null || lastSegment === void 0 ? void 0 : lastSegment.endsWith("/");
  for (const segment of segments) {
    const cleanSegment = trimSlashes(segment);
    if (cleanSegment) {
      result = joinPathSegments(result, cleanSegment);
    }
  }
  if (shouldPreserveTrailingSlash && !result.endsWith("/")) {
    result += "/";
  }
  return result;
}
function joinPathSegments(left, right) {
  if (left.endsWith("/")) {
    return left + right;
  }
  return `${left}/${right}`;
}
function trimSlashes(str) {
  if (!str)
    return str;
  let start = 0;
  let end = str.length;
  if (str.startsWith("/"))
    start = 1;
  if (str.endsWith("/"))
    end = str.length - 1;
  return start === 0 && end === str.length ? str : str.slice(start, end);
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/Supplier.mjs
var __awaiter10 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var Supplier = {
  get: (supplier) => __awaiter10(void 0, void 0, void 0, function* () {
    if (typeof supplier === "function") {
      return supplier();
    } else {
      return supplier;
    }
  })
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/fetcher/makePassthroughRequest.mjs
var __awaiter11 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function makePassthroughRequest(input, init, clientOptions, requestOptions) {
  return __awaiter11(this, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const logger = createLogger(clientOptions.logging);
    let url;
    let effectiveInit = init;
    if (input instanceof Request) {
      url = input.url;
      if (init == null) {
        effectiveInit = {
          method: input.method,
          headers: Object.fromEntries(input.headers.entries()),
          body: input.body,
          signal: input.signal,
          credentials: input.credentials,
          cache: input.cache,
          redirect: input.redirect,
          referrer: input.referrer,
          integrity: input.integrity,
          mode: input.mode
        };
      }
    } else {
      url = input instanceof URL ? input.toString() : input;
    }
    const baseUrl = (_a = clientOptions.baseUrl != null ? yield Supplier.get(clientOptions.baseUrl) : void 0) !== null && _a !== void 0 ? _a : clientOptions.environment != null ? yield Supplier.get(clientOptions.environment) : void 0;
    let fullUrl;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      fullUrl = url;
    } else if (baseUrl != null) {
      fullUrl = join(baseUrl, url);
    } else {
      fullUrl = url;
    }
    const mergedHeaders = {};
    if (clientOptions.headers != null) {
      for (const [key, value] of Object.entries(clientOptions.headers)) {
        const resolved = yield EndpointSupplier.get(value, { endpointMetadata: {} });
        if (resolved != null) {
          mergedHeaders[key.toLowerCase()] = `${resolved}`;
        }
      }
    }
    if (clientOptions.getAuthHeaders != null && targetsBaseUrl(fullUrl, baseUrl)) {
      const authHeaders = yield clientOptions.getAuthHeaders();
      for (const [key, value] of Object.entries(authHeaders)) {
        mergedHeaders[key.toLowerCase()] = value;
      }
    }
    if ((effectiveInit === null || effectiveInit === void 0 ? void 0 : effectiveInit.headers) != null) {
      const initHeaders = effectiveInit.headers instanceof Headers ? Object.fromEntries(effectiveInit.headers.entries()) : Array.isArray(effectiveInit.headers) ? Object.fromEntries(effectiveInit.headers) : effectiveInit.headers;
      for (const [key, value] of Object.entries(initHeaders)) {
        if (value != null) {
          mergedHeaders[key.toLowerCase()] = value;
        }
      }
    }
    if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers) != null) {
      for (const [key, value] of Object.entries(requestOptions.headers)) {
        mergedHeaders[key.toLowerCase()] = value;
      }
    }
    const method = (_b = effectiveInit === null || effectiveInit === void 0 ? void 0 : effectiveInit.method) !== null && _b !== void 0 ? _b : "GET";
    const body = effectiveInit === null || effectiveInit === void 0 ? void 0 : effectiveInit.body;
    const timeoutInSeconds = (_c = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _c !== void 0 ? _c : clientOptions.timeoutInSeconds;
    const timeoutMs = timeoutInSeconds != null ? timeoutInSeconds * 1e3 : void 0;
    const maxRetries = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _d !== void 0 ? _d : clientOptions.maxRetries;
    const abortSignal = (_f = (_e = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal) !== null && _e !== void 0 ? _e : effectiveInit === null || effectiveInit === void 0 ? void 0 : effectiveInit.signal) !== null && _f !== void 0 ? _f : void 0;
    const fetchFn = (_g = clientOptions.fetch) !== null && _g !== void 0 ? _g : yield getFetchFn();
    if (logger.isDebug()) {
      logger.debug("Making passthrough HTTP request", {
        method,
        url: redactUrl(fullUrl),
        hasBody: body != null
      });
    }
    const response = yield requestWithRetries(() => __awaiter11(this, void 0, void 0, function* () {
      return makeRequest(
        fetchFn,
        fullUrl,
        method,
        mergedHeaders,
        body !== null && body !== void 0 ? body : void 0,
        timeoutMs,
        abortSignal,
        (effectiveInit === null || effectiveInit === void 0 ? void 0 : effectiveInit.credentials) === "include",
        void 0,
        // duplex
        false
      );
    }), maxRetries);
    if (logger.isDebug()) {
      logger.debug("Passthrough HTTP request completed", {
        method,
        url: redactUrl(fullUrl),
        statusCode: response.status
      });
    }
    return response;
  });
}
function targetsBaseUrl(fullUrl, baseUrl) {
  if (baseUrl == null) {
    return false;
  }
  try {
    return new URL(fullUrl).origin === new URL(baseUrl).origin;
  } catch (_a) {
    return false;
  }
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/logging/index.mjs
var logging_exports = {};
__export(logging_exports, {
  ConsoleLogger: () => ConsoleLogger,
  LogLevel: () => LogLevel,
  Logger: () => Logger,
  createLogger: () => createLogger
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/pagination/Page.mjs
var __awaiter12 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __await = function(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
};
var __asyncGenerator = function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
};
var __asyncValues = function(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
};
var Page = class {
  constructor({ response, rawResponse, hasNextPage, getItems, loadPage }) {
    this.response = response;
    this.rawResponse = rawResponse;
    this.data = getItems(response);
    this._hasNextPage = hasNextPage;
    this.getItems = getItems;
    this.loadNextPage = loadPage;
  }
  /**
   * Retrieves the next page
   * @returns this
   */
  getNextPage() {
    return __awaiter12(this, void 0, void 0, function* () {
      const { data, rawResponse } = yield this.loadNextPage(this.response).withRawResponse();
      this.response = data;
      this.rawResponse = rawResponse;
      this.data = this.getItems(this.response);
      return this;
    });
  }
  /**
   * @returns whether there is a next page to load
   */
  hasNextPage() {
    return this._hasNextPage(this.response);
  }
  iterMessages() {
    return __asyncGenerator(this, arguments, function* iterMessages_1() {
      for (const item of this.data) {
        yield yield __await(item);
      }
      while (this.hasNextPage()) {
        yield __await(this.getNextPage());
        for (const item of this.data) {
          yield yield __await(item);
        }
      }
    });
  }
  [Symbol.asyncIterator]() {
    return __asyncGenerator(this, arguments, function* _a() {
      var _b, e_1, _c, _d;
      try {
        for (var _e = true, _f = __asyncValues(this.iterMessages()), _g; _g = yield __await(_f.next()), _b = _g.done, !_b; _e = true) {
          _d = _g.value;
          _e = false;
          const message = _d;
          yield yield __await(message);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (!_e && !_b && (_c = _f.return)) yield __await(_c.call(_f));
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/runtime/runtime.mjs
var RUNTIME = evaluateRuntime();
function evaluateRuntime() {
  var _a, _b, _c, _d, _e, _f, _g;
  const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
  if (isBrowser) {
    return {
      type: "browser",
      version: window.navigator.userAgent
    };
  }
  const isCloudflare = typeof globalThis !== "undefined" && ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) === "Cloudflare-Workers";
  if (isCloudflare) {
    return {
      type: "workerd"
    };
  }
  const isEdgeRuntime = typeof EdgeRuntime === "string";
  if (isEdgeRuntime) {
    return {
      type: "edge-runtime"
    };
  }
  const isWebWorker = typeof self === "object" && typeof (self === null || self === void 0 ? void 0 : self.importScripts) === "function" && (((_b = self.constructor) === null || _b === void 0 ? void 0 : _b.name) === "DedicatedWorkerGlobalScope" || ((_c = self.constructor) === null || _c === void 0 ? void 0 : _c.name) === "ServiceWorkerGlobalScope" || ((_d = self.constructor) === null || _d === void 0 ? void 0 : _d.name) === "SharedWorkerGlobalScope");
  if (isWebWorker) {
    return {
      type: "web-worker"
    };
  }
  const isDeno = typeof Deno !== "undefined" && typeof Deno.version !== "undefined" && typeof Deno.version.deno !== "undefined";
  if (isDeno) {
    return {
      type: "deno",
      version: Deno.version.deno,
      os: (_e = Deno.build) === null || _e === void 0 ? void 0 : _e.os,
      arch: (_f = Deno.build) === null || _f === void 0 ? void 0 : _f.arch
    };
  }
  const isBun = typeof Bun !== "undefined" && typeof Bun.version !== "undefined";
  if (isBun) {
    return {
      type: "bun",
      version: Bun.version,
      os: typeof process !== "undefined" ? process.platform : void 0,
      arch: typeof process !== "undefined" ? process.arch : void 0
    };
  }
  const isReactNative = typeof navigator !== "undefined" && (navigator === null || navigator === void 0 ? void 0 : navigator.product) === "ReactNative";
  if (isReactNative) {
    return {
      type: "react-native"
    };
  }
  const _process = typeof process !== "undefined" ? process : void 0;
  const isNode = typeof _process !== "undefined" && typeof ((_g = _process.versions) === null || _g === void 0 ? void 0 : _g.node) === "string";
  if (isNode) {
    return {
      type: "node",
      version: _process.versions.node,
      parsedVersion: Number(_process.versions.node.split(".")[0]),
      os: _process.platform,
      arch: _process.arch
    };
  }
  return {
    type: "unknown"
  };
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/index.mjs
var schemas_exports = {};
__export(schemas_exports, {
  JsonError: () => JsonError,
  ParseError: () => ParseError,
  any: () => any,
  bigint: () => bigint,
  boolean: () => boolean,
  booleanLiteral: () => booleanLiteral,
  date: () => date,
  discriminant: () => discriminant,
  enum_: () => enum_,
  forwardCompatibleEnum_: () => forwardCompatibleEnum_,
  getObjectLikeUtils: () => getObjectLikeUtils,
  getObjectUtils: () => getObjectUtils,
  getSchemaUtils: () => getSchemaUtils,
  isProperty: () => isProperty,
  lazy: () => lazy,
  lazyObject: () => lazyObject,
  list: () => list,
  never: () => never,
  number: () => number,
  object: () => object,
  objectWithoutOptionalProperties: () => objectWithoutOptionalProperties,
  optional: () => optional,
  partialRecord: () => partialRecord,
  property: () => property,
  record: () => record,
  set: () => set,
  string: () => string,
  stringLiteral: () => stringLiteral,
  transform: () => transform,
  undiscriminatedUnion: () => undiscriminatedUnion,
  union: () => union,
  unknown: () => unknown,
  withParsedProperties: () => withParsedProperties
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/Schema.mjs
var SchemaType = {
  BIGINT: "bigint",
  DATE: "date",
  ENUM: "enum",
  LIST: "list",
  STRING_LITERAL: "stringLiteral",
  BOOLEAN_LITERAL: "booleanLiteral",
  OBJECT: "object",
  ANY: "any",
  BOOLEAN: "boolean",
  NUMBER: "number",
  STRING: "string",
  UNKNOWN: "unknown",
  NEVER: "never",
  RECORD: "record",
  SET: "set",
  UNION: "union",
  UNDISCRIMINATED_UNION: "undiscriminatedUnion",
  NULLABLE: "nullable",
  OPTIONAL: "optional",
  OPTIONAL_NULLABLE: "optionalNullable"
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/utils/getErrorMessageForIncorrectType.mjs
function getErrorMessageForIncorrectType(value, expectedType) {
  return `Expected ${expectedType}. Received ${getTypeAsString(value)}.`;
}
function getTypeAsString(value) {
  if (Array.isArray(value)) {
    return "list";
  }
  if (value === null) {
    return "null";
  }
  if (value instanceof BigInt) {
    return "BigInt";
  }
  switch (typeof value) {
    case "string":
      return `"${value}"`;
    case "bigint":
    case "number":
    case "boolean":
    case "undefined":
      return `${value}`;
  }
  return typeof value;
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/utils/maybeSkipValidation.mjs
function maybeSkipValidation(schema) {
  return Object.assign(Object.assign({}, schema), { json: transformAndMaybeSkipValidation(schema.json), parse: transformAndMaybeSkipValidation(schema.parse) });
}
function transformAndMaybeSkipValidation(transform2) {
  return (value, opts) => {
    const transformed = transform2(value, opts);
    const { skipValidation = false } = opts !== null && opts !== void 0 ? opts : {};
    if (!transformed.ok && skipValidation) {
      console.warn([
        "Failed to validate.",
        ...transformed.errors.map((error) => "  - " + (error.path.length > 0 ? `${error.path.join(".")}: ${error.message}` : error.message))
      ].join("\n"));
      return {
        ok: true,
        value
      };
    } else {
      return transformed;
    }
  };
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/schema-utils/stringifyValidationErrors.mjs
function stringifyValidationError(error) {
  if (error.path.length === 0) {
    return error.message;
  }
  return `${error.path.join(" -> ")}: ${error.message}`;
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/schema-utils/JsonError.mjs
var JsonError = class _JsonError extends Error {
  constructor(errors) {
    super(errors.map(stringifyValidationError).join("; "));
    this.errors = errors;
    Object.setPrototypeOf(this, _JsonError.prototype);
    this.name = "JsonError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/schema-utils/ParseError.mjs
var ParseError = class _ParseError extends Error {
  constructor(errors) {
    super(errors.map(stringifyValidationError).join("; "));
    this.errors = errors;
    Object.setPrototypeOf(this, _ParseError.prototype);
    this.name = "ParseError";
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/schema-utils/getSchemaUtils.mjs
function getSchemaUtils(schema) {
  return {
    nullable: () => nullable(schema),
    optional: () => optional(schema),
    optionalNullable: () => optionalNullable(schema),
    transform: (transformer) => transform(schema, transformer),
    parseOrThrow: (raw, opts) => {
      const parsed = schema.parse(raw, opts);
      if (parsed.ok) {
        return parsed.value;
      }
      throw new ParseError(parsed.errors);
    },
    jsonOrThrow: (parsed, opts) => {
      const raw = schema.json(parsed, opts);
      if (raw.ok) {
        return raw.value;
      }
      throw new JsonError(raw.errors);
    }
  };
}
function nullable(schema) {
  const baseSchema = {
    parse: (raw, opts) => {
      if (raw == null) {
        return {
          ok: true,
          value: null
        };
      }
      return schema.parse(raw, opts);
    },
    json: (parsed, opts) => {
      if (parsed == null) {
        return {
          ok: true,
          value: null
        };
      }
      return schema.json(parsed, opts);
    },
    getType: () => SchemaType.NULLABLE
  };
  return Object.assign(Object.assign({}, baseSchema), getSchemaUtils(baseSchema));
}
function optional(schema) {
  const baseSchema = {
    parse: (raw, opts) => {
      if (raw == null) {
        return {
          ok: true,
          value: void 0
        };
      }
      return schema.parse(raw, opts);
    },
    json: (parsed, opts) => {
      if ((opts === null || opts === void 0 ? void 0 : opts.omitUndefined) && parsed === void 0) {
        return {
          ok: true,
          value: void 0
        };
      }
      if (parsed == null) {
        return {
          ok: true,
          value: null
        };
      }
      return schema.json(parsed, opts);
    },
    getType: () => SchemaType.OPTIONAL
  };
  return Object.assign(Object.assign({}, baseSchema), getSchemaUtils(baseSchema));
}
function optionalNullable(schema) {
  const baseSchema = {
    parse: (raw, opts) => {
      if (raw === void 0) {
        return {
          ok: true,
          value: void 0
        };
      }
      if (raw === null) {
        return {
          ok: true,
          value: null
        };
      }
      return schema.parse(raw, opts);
    },
    json: (parsed, opts) => {
      if (parsed === void 0) {
        return {
          ok: true,
          value: void 0
        };
      }
      if (parsed === null) {
        return {
          ok: true,
          value: null
        };
      }
      return schema.json(parsed, opts);
    },
    getType: () => SchemaType.OPTIONAL_NULLABLE
  };
  return Object.assign(Object.assign({}, baseSchema), getSchemaUtils(baseSchema));
}
function transform(schema, transformer) {
  const baseSchema = {
    parse: (raw, opts) => {
      const parsed = schema.parse(raw, opts);
      if (!parsed.ok) {
        return parsed;
      }
      return {
        ok: true,
        value: transformer.transform(parsed.value)
      };
    },
    json: (transformed, opts) => {
      const parsed = transformer.untransform(transformed);
      return schema.json(parsed, opts);
    },
    getType: () => schema.getType()
  };
  return Object.assign(Object.assign({}, baseSchema), getSchemaUtils(baseSchema));
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/bigint/bigint.mjs
function bigint() {
  const baseSchema = {
    parse: (raw, { breadcrumbsPrefix = [] } = {}) => {
      if (typeof raw === "bigint") {
        return {
          ok: true,
          value: raw
        };
      }
      if (typeof raw === "number") {
        return {
          ok: true,
          value: BigInt(raw)
        };
      }
      return {
        ok: false,
        errors: [
          {
            path: breadcrumbsPrefix,
            message: getErrorMessageForIncorrectType(raw, "bigint | number")
          }
        ]
      };
    },
    json: (bigint2, { breadcrumbsPrefix = [] } = {}) => {
      if (typeof bigint2 !== "bigint") {
        return {
          ok: false,
          errors: [
            {
              path: breadcrumbsPrefix,
              message: getErrorMessageForIncorrectType(bigint2, "bigint")
            }
          ]
        };
      }
      return {
        ok: true,
        value: bigint2
      };
    },
    getType: () => SchemaType.BIGINT
  };
  return Object.assign(Object.assign({}, maybeSkipValidation(baseSchema)), getSchemaUtils(baseSchema));
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/date/date.mjs
var ISO_8601_REGEX = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
function date() {
  const baseSchema = {
    parse: (raw, { breadcrumbsPrefix = [] } = {}) => {
      if (typeof raw !== "string") {
        return {
          ok: false,
          errors: [
            {
              path: breadcrumbsPrefix,
              message: getErrorMessageForIncorrectType(raw, "string")
            }
          ]
        };
      }
      if (!ISO_8601_REGEX.test(raw)) {
        return {
          ok: false,
          errors: [
            {
              path: breadcrumbsPrefix,
              message: getErrorMessageForIncorrectType(raw, "ISO 8601 date string")
            }
          ]
        };
      }
      return {
        ok: true,
        value: new Date(raw)
      };
    },
    json: (date2, { breadcrumbsPrefix = [] } = {}) => {
      if (date2 instanceof Date) {
        return {
          ok: true,
          value: date2.toISOString()
        };
      } else {
        return {
          ok: false,
          errors: [
            {
              path: breadcrumbsPrefix,
              message: getErrorMessageForIncorrectType(date2, "Date object")
            }
          ]
        };
      }
    },
    getType: () => SchemaType.DATE
  };
  return Object.assign(Object.assign({}, maybeSkipValidation(baseSchema)), getSchemaUtils(baseSchema));
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/utils/createIdentitySchemaCreator.mjs
function createIdentitySchemaCreator(schemaType, validate) {
  return () => {
    const baseSchema = {
      parse: validate,
      json: validate,
      getType: () => schemaType
    };
    return Object.assign(Object.assign({}, maybeSkipValidation(baseSchema)), getSchemaUtils(baseSchema));
  };
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/enum/enum.mjs
function enum_(values) {
  const validValues = new Set(values);
  const schemaCreator = createIdentitySchemaCreator(SchemaType.ENUM, (value, { allowUnrecognizedEnumValues, breadcrumbsPrefix = [] } = {}) => {
    if (typeof value !== "string") {
      return {
        ok: false,
        errors: [
          {
            path: breadcrumbsPrefix,
            message: getErrorMessageForIncorrectType(value, "string")
          }
        ]
      };
    }
    if (!validValues.has(value) && !allowUnrecognizedEnumValues) {
      return {
        ok: false,
        errors: [
          {
            path: breadcrumbsPrefix,
            message: getErrorMessageForIncorrectType(value, "enum")
          }
        ]
      };
    }
    return {
      ok: true,
      value
    };
  });
  return schemaCreator();
}
function forwardCompatibleEnum_(values) {
  return enum_(values).transform({
    transform: (val) => val,
    untransform: (val) => val
  });
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/lazy/lazy.mjs
function lazy(getter) {
  const baseSchema = constructLazyBaseSchema(getter);
  return Object.assign(Object.assign({}, baseSchema), getSchemaUtils(baseSchema));
}
function constructLazyBaseSchema(getter) {
  return {
    parse: (raw, opts) => getMemoizedSchema(getter).parse(raw, opts),
    json: (parsed, opts) => getMemoizedSchema(getter).json(parsed, opts),
    getType: () => getMemoizedSchema(getter).getType()
  };
}
function getMemoizedSchema(getter) {
  const castedGetter = getter;
  if (castedGetter.__zurg_memoized == null) {
    castedGetter.__zurg_memoized = getter();
  }
  return castedGetter.__zurg_memoized;
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/utils/entries.mjs
function entries(object2) {
  return Object.entries(object2);
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/utils/filterObject.mjs
function filterObject(obj, keysToInclude) {
  const keysToIncludeSet = new Set(keysToInclude);
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (keysToIncludeSet.has(key)) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/utils/isPlainObject.mjs
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  return Object.getPrototypeOf(proto) === null;
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/utils/keys.mjs
function keys(object2) {
  return Object.keys(object2);
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/utils/partition.mjs
function partition(items, predicate) {
  const trueItems = [], falseItems = [];
  for (const item of items) {
    if (predicate(item)) {
      trueItems.push(item);
    } else {
      falseItems.push(item);
    }
  }
  return [trueItems, falseItems];
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/object-like/getObjectLikeUtils.mjs
var _hasOwn = Object.prototype.hasOwnProperty;
function getObjectLikeUtils(schema) {
  return {
    withParsedProperties: (properties) => withParsedProperties(schema, properties)
  };
}
function withParsedProperties(objectLike, properties) {
  const objectSchema = {
    parse: (raw, opts) => {
      const parsedObject = objectLike.parse(raw, opts);
      if (!parsedObject.ok) {
        return parsedObject;
      }
      const additionalProperties = {};
      for (const key in properties) {
        if (_hasOwn.call(properties, key)) {
          const value = properties[key];
          additionalProperties[key] = typeof value === "function" ? value(parsedObject.value) : value;
        }
      }
      return {
        ok: true,
        value: Object.assign(Object.assign({}, parsedObject.value), additionalProperties)
      };
    },
    json: (parsed, opts) => {
      var _a;
      if (!isPlainObject(parsed)) {
        return {
          ok: false,
          errors: [
            {
              path: (_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
              message: getErrorMessageForIncorrectType(parsed, "object")
            }
          ]
        };
      }
      const addedPropertyKeys = new Set(Object.keys(properties));
      const parsedWithoutAddedProperties = filterObject(parsed, Object.keys(parsed).filter((key) => !addedPropertyKeys.has(key)));
      return objectLike.json(parsedWithoutAddedProperties, opts);
    },
    getType: () => objectLike.getType()
  };
  return Object.assign(Object.assign(Object.assign({}, objectSchema), getSchemaUtils(objectSchema)), getObjectLikeUtils(objectSchema));
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/object/property.mjs
function property(rawKey, valueSchema) {
  return {
    rawKey,
    valueSchema,
    isProperty: true
  };
}
function isProperty(maybeProperty) {
  return maybeProperty.isProperty;
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/object/object.mjs
var _hasOwn2 = Object.prototype.hasOwnProperty;
function object(schemas) {
  let _rawKeyToProperty;
  function getRawKeyToProperty() {
    if (_rawKeyToProperty == null) {
      _rawKeyToProperty = {};
      for (const [parsedKey, schemaOrObjectProperty] of entries(schemas)) {
        const rawKey = isProperty(schemaOrObjectProperty) ? schemaOrObjectProperty.rawKey : parsedKey;
        const valueSchema = isProperty(schemaOrObjectProperty) ? schemaOrObjectProperty.valueSchema : schemaOrObjectProperty;
        _rawKeyToProperty[rawKey] = {
          rawKey,
          parsedKey,
          valueSchema
        };
      }
    }
    return _rawKeyToProperty;
  }
  let _parseRequiredKeys;
  let _jsonRequiredKeys;
  let _parseRequiredKeysSet;
  let _jsonRequiredKeysSet;
  function getParseRequiredKeys() {
    if (_parseRequiredKeys == null) {
      _parseRequiredKeys = [];
      _jsonRequiredKeys = [];
      for (const [parsedKey, schemaOrObjectProperty] of entries(schemas)) {
        const rawKey = isProperty(schemaOrObjectProperty) ? schemaOrObjectProperty.rawKey : parsedKey;
        const valueSchema = isProperty(schemaOrObjectProperty) ? schemaOrObjectProperty.valueSchema : schemaOrObjectProperty;
        if (isSchemaRequired(valueSchema)) {
          _parseRequiredKeys.push(rawKey);
          _jsonRequiredKeys.push(parsedKey);
        }
      }
      _parseRequiredKeysSet = new Set(_parseRequiredKeys);
      _jsonRequiredKeysSet = new Set(_jsonRequiredKeys);
    }
    return _parseRequiredKeys;
  }
  function getJsonRequiredKeys() {
    if (_jsonRequiredKeys == null) {
      getParseRequiredKeys();
    }
    return _jsonRequiredKeys;
  }
  function getParseRequiredKeysSet() {
    if (_parseRequiredKeysSet == null) {
      getParseRequiredKeys();
    }
    return _parseRequiredKeysSet;
  }
  function getJsonRequiredKeysSet() {
    if (_jsonRequiredKeysSet == null) {
      getParseRequiredKeys();
    }
    return _jsonRequiredKeysSet;
  }
  const baseSchema = {
    _getRawProperties: () => Object.entries(schemas).map(([parsedKey, propertySchema]) => isProperty(propertySchema) ? propertySchema.rawKey : parsedKey),
    _getParsedProperties: () => keys(schemas),
    parse: (raw, opts) => {
      var _a;
      const breadcrumbsPrefix = (_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [];
      return validateAndTransformObject({
        value: raw,
        requiredKeys: getParseRequiredKeys(),
        requiredKeysSet: getParseRequiredKeysSet(),
        getProperty: (rawKey) => {
          const property2 = getRawKeyToProperty()[rawKey];
          if (property2 == null) {
            return void 0;
          }
          return {
            transformedKey: property2.parsedKey,
            transform: (propertyValue) => {
              const childBreadcrumbs = [...breadcrumbsPrefix, rawKey];
              return property2.valueSchema.parse(propertyValue, Object.assign(Object.assign({}, opts), { breadcrumbsPrefix: childBreadcrumbs }));
            }
          };
        },
        unrecognizedObjectKeys: opts === null || opts === void 0 ? void 0 : opts.unrecognizedObjectKeys,
        skipValidation: opts === null || opts === void 0 ? void 0 : opts.skipValidation,
        breadcrumbsPrefix,
        omitUndefined: opts === null || opts === void 0 ? void 0 : opts.omitUndefined
      });
    },
    json: (parsed, opts) => {
      var _a;
      const breadcrumbsPrefix = (_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [];
      return validateAndTransformObject({
        value: parsed,
        requiredKeys: getJsonRequiredKeys(),
        requiredKeysSet: getJsonRequiredKeysSet(),
        getProperty: (parsedKey) => {
          const property2 = schemas[parsedKey];
          if (property2 == null) {
            return void 0;
          }
          if (isProperty(property2)) {
            return {
              transformedKey: property2.rawKey,
              transform: (propertyValue) => {
                const childBreadcrumbs = [...breadcrumbsPrefix, parsedKey];
                return property2.valueSchema.json(propertyValue, Object.assign(Object.assign({}, opts), { breadcrumbsPrefix: childBreadcrumbs }));
              }
            };
          } else {
            return {
              transformedKey: parsedKey,
              transform: (propertyValue) => {
                const childBreadcrumbs = [...breadcrumbsPrefix, parsedKey];
                return property2.json(propertyValue, Object.assign(Object.assign({}, opts), { breadcrumbsPrefix: childBreadcrumbs }));
              }
            };
          }
        },
        unrecognizedObjectKeys: opts === null || opts === void 0 ? void 0 : opts.unrecognizedObjectKeys,
        skipValidation: opts === null || opts === void 0 ? void 0 : opts.skipValidation,
        breadcrumbsPrefix,
        omitUndefined: opts === null || opts === void 0 ? void 0 : opts.omitUndefined
      });
    },
    getType: () => SchemaType.OBJECT
  };
  return Object.assign(Object.assign(Object.assign(Object.assign({}, maybeSkipValidation(baseSchema)), getSchemaUtils(baseSchema)), getObjectLikeUtils(baseSchema)), getObjectUtils(baseSchema));
}
function validateAndTransformObject({ value, requiredKeys, requiredKeysSet, getProperty, unrecognizedObjectKeys = "fail", skipValidation = false, breadcrumbsPrefix = [] }) {
  if (!isPlainObject(value)) {
    return {
      ok: false,
      errors: [
        {
          path: breadcrumbsPrefix,
          message: getErrorMessageForIncorrectType(value, "object")
        }
      ]
    };
  }
  let missingRequiredCount = requiredKeys.length;
  const errors = [];
  const transformed = {};
  for (const preTransformedKey in value) {
    if (!_hasOwn2.call(value, preTransformedKey)) {
      continue;
    }
    const preTransformedItemValue = value[preTransformedKey];
    const property2 = getProperty(preTransformedKey);
    if (property2 != null) {
      if (missingRequiredCount > 0 && requiredKeysSet.has(preTransformedKey)) {
        missingRequiredCount--;
      }
      const value2 = property2.transform(preTransformedItemValue);
      if (value2.ok) {
        transformed[property2.transformedKey] = value2.value;
      } else {
        transformed[preTransformedKey] = preTransformedItemValue;
        errors.push(...value2.errors);
      }
    } else {
      switch (unrecognizedObjectKeys) {
        case "fail":
          errors.push({
            path: [...breadcrumbsPrefix, preTransformedKey],
            message: `Unexpected key "${preTransformedKey}"`
          });
          break;
        case "strip":
          break;
        case "passthrough":
          transformed[preTransformedKey] = preTransformedItemValue;
          break;
      }
    }
  }
  if (missingRequiredCount > 0) {
    for (const key of requiredKeys) {
      if (!(key in value)) {
        errors.push({
          path: breadcrumbsPrefix,
          message: `Missing required key "${key}"`
        });
      }
    }
  }
  if (errors.length === 0 || skipValidation) {
    return {
      ok: true,
      value: transformed
    };
  } else {
    return {
      ok: false,
      errors
    };
  }
}
function getObjectUtils(schema) {
  return {
    extend: (extension) => {
      const baseSchema = {
        _getParsedProperties: () => [...schema._getParsedProperties(), ...extension._getParsedProperties()],
        _getRawProperties: () => [...schema._getRawProperties(), ...extension._getRawProperties()],
        parse: (raw, opts) => {
          return validateAndTransformExtendedObject({
            extensionKeys: extension._getRawProperties(),
            value: raw,
            transformBase: (rawBase) => schema.parse(rawBase, opts),
            transformExtension: (rawExtension) => extension.parse(rawExtension, opts),
            breadcrumbsPrefix: opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix
          });
        },
        json: (parsed, opts) => {
          return validateAndTransformExtendedObject({
            extensionKeys: extension._getParsedProperties(),
            value: parsed,
            transformBase: (parsedBase) => schema.json(parsedBase, opts),
            transformExtension: (parsedExtension) => extension.json(parsedExtension, opts),
            breadcrumbsPrefix: opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix
          });
        },
        getType: () => SchemaType.OBJECT
      };
      return Object.assign(Object.assign(Object.assign(Object.assign({}, baseSchema), getSchemaUtils(baseSchema)), getObjectLikeUtils(baseSchema)), getObjectUtils(baseSchema));
    },
    passthrough: () => {
      const knownRawKeys = new Set(schema._getRawProperties());
      const knownParsedKeys = new Set(schema._getParsedProperties());
      const baseSchema = {
        _getParsedProperties: () => schema._getParsedProperties(),
        _getRawProperties: () => schema._getRawProperties(),
        parse: (raw, opts) => {
          const transformed = schema.parse(raw, Object.assign(Object.assign({}, opts), { unrecognizedObjectKeys: "passthrough" }));
          if (!transformed.ok) {
            return transformed;
          }
          const extraProperties = {};
          if (typeof raw === "object" && raw != null) {
            for (const [key, value] of Object.entries(raw)) {
              if (!knownRawKeys.has(key)) {
                extraProperties[key] = value;
              }
            }
          }
          return {
            ok: true,
            value: Object.assign(Object.assign({}, extraProperties), transformed.value)
          };
        },
        json: (parsed, opts) => {
          const transformed = schema.json(parsed, Object.assign(Object.assign({}, opts), { unrecognizedObjectKeys: "passthrough" }));
          if (!transformed.ok) {
            return transformed;
          }
          const extraProperties = {};
          if (typeof parsed === "object" && parsed != null) {
            for (const [key, value] of Object.entries(parsed)) {
              if (!knownParsedKeys.has(key)) {
                extraProperties[key] = value;
              }
            }
          }
          return {
            ok: true,
            value: Object.assign(Object.assign({}, extraProperties), transformed.value)
          };
        },
        getType: () => SchemaType.OBJECT
      };
      return Object.assign(Object.assign(Object.assign(Object.assign({}, baseSchema), getSchemaUtils(baseSchema)), getObjectLikeUtils(baseSchema)), getObjectUtils(baseSchema));
    }
  };
}
function validateAndTransformExtendedObject({ extensionKeys, value, transformBase, transformExtension, breadcrumbsPrefix = [] }) {
  if (!isPlainObject(value)) {
    return {
      ok: false,
      errors: [
        {
          path: breadcrumbsPrefix,
          message: getErrorMessageForIncorrectType(value, "object")
        }
      ]
    };
  }
  const extensionPropertiesSet = new Set(extensionKeys);
  const [extensionProperties, baseProperties] = partition(keys(value), (key) => extensionPropertiesSet.has(key));
  const transformedBase = transformBase(filterObject(value, baseProperties));
  const transformedExtension = transformExtension(filterObject(value, extensionProperties));
  if (transformedBase.ok && transformedExtension.ok) {
    return {
      ok: true,
      value: Object.assign(Object.assign({}, transformedBase.value), transformedExtension.value)
    };
  } else {
    return {
      ok: false,
      errors: [
        ...transformedBase.ok ? [] : transformedBase.errors,
        ...transformedExtension.ok ? [] : transformedExtension.errors
      ]
    };
  }
}
function isSchemaRequired(schema) {
  return !isSchemaOptional(schema);
}
function isSchemaOptional(schema) {
  switch (schema.getType()) {
    case SchemaType.ANY:
    case SchemaType.UNKNOWN:
    case SchemaType.OPTIONAL:
    case SchemaType.OPTIONAL_NULLABLE:
      return true;
    default:
      return false;
  }
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/object/objectWithoutOptionalProperties.mjs
function objectWithoutOptionalProperties(schemas) {
  return object(schemas);
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/lazy/lazyObject.mjs
function lazyObject(getter) {
  const baseSchema = Object.assign(Object.assign({}, constructLazyBaseSchema(getter)), { _getRawProperties: () => getMemoizedSchema(getter)._getRawProperties(), _getParsedProperties: () => getMemoizedSchema(getter)._getParsedProperties() });
  return Object.assign(Object.assign(Object.assign(Object.assign({}, baseSchema), getSchemaUtils(baseSchema)), getObjectLikeUtils(baseSchema)), getObjectUtils(baseSchema));
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/list/list.mjs
function list(schema) {
  const baseSchema = {
    parse: (raw, opts) => validateAndTransformArray(raw, (item, index) => {
      var _a;
      return schema.parse(item, Object.assign(Object.assign({}, opts), { breadcrumbsPrefix: [...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [], `[${index}]`] }));
    }),
    json: (parsed, opts) => validateAndTransformArray(parsed, (item, index) => {
      var _a;
      return schema.json(item, Object.assign(Object.assign({}, opts), { breadcrumbsPrefix: [...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [], `[${index}]`] }));
    }),
    getType: () => SchemaType.LIST
  };
  return Object.assign(Object.assign({}, maybeSkipValidation(baseSchema)), getSchemaUtils(baseSchema));
}
function validateAndTransformArray(value, transformItem) {
  if (!Array.isArray(value)) {
    return {
      ok: false,
      errors: [
        {
          message: getErrorMessageForIncorrectType(value, "list"),
          path: []
        }
      ]
    };
  }
  const result = [];
  const errors = [];
  for (let i = 0; i < value.length; i++) {
    const item = transformItem(value[i], i);
    if (item.ok) {
      result.push(item.value);
    } else {
      errors.push(...item.errors);
    }
  }
  if (errors.length === 0) {
    return { ok: true, value: result };
  }
  return { ok: false, errors };
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/literals/booleanLiteral.mjs
function booleanLiteral(literal) {
  const schemaCreator = createIdentitySchemaCreator(SchemaType.BOOLEAN_LITERAL, (value, { breadcrumbsPrefix = [] } = {}) => {
    if (value === literal) {
      return {
        ok: true,
        value: literal
      };
    } else {
      return {
        ok: false,
        errors: [
          {
            path: breadcrumbsPrefix,
            message: getErrorMessageForIncorrectType(value, `${literal.toString()}`)
          }
        ]
      };
    }
  });
  return schemaCreator();
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/literals/stringLiteral.mjs
function stringLiteral(literal) {
  const schemaCreator = createIdentitySchemaCreator(SchemaType.STRING_LITERAL, (value, { breadcrumbsPrefix = [] } = {}) => {
    if (value === literal) {
      return {
        ok: true,
        value: literal
      };
    } else {
      return {
        ok: false,
        errors: [
          {
            path: breadcrumbsPrefix,
            message: getErrorMessageForIncorrectType(value, `"${literal}"`)
          }
        ]
      };
    }
  });
  return schemaCreator();
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/primitives/any.mjs
var any = createIdentitySchemaCreator(SchemaType.ANY, (value) => ({
  ok: true,
  value
}));

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/primitives/boolean.mjs
var boolean = createIdentitySchemaCreator(SchemaType.BOOLEAN, (value, { breadcrumbsPrefix = [] } = {}) => {
  if (typeof value === "boolean") {
    return {
      ok: true,
      value
    };
  } else {
    return {
      ok: false,
      errors: [
        {
          path: breadcrumbsPrefix,
          message: getErrorMessageForIncorrectType(value, "boolean")
        }
      ]
    };
  }
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/primitives/never.mjs
var never = createIdentitySchemaCreator(SchemaType.NEVER, (_value, { breadcrumbsPrefix = [] } = {}) => ({
  ok: false,
  errors: [
    {
      path: breadcrumbsPrefix,
      message: "Expected never"
    }
  ]
}));

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/primitives/number.mjs
var number = createIdentitySchemaCreator(SchemaType.NUMBER, (value, { breadcrumbsPrefix = [] } = {}) => {
  if (typeof value === "number") {
    return {
      ok: true,
      value
    };
  } else {
    return {
      ok: false,
      errors: [
        {
          path: breadcrumbsPrefix,
          message: getErrorMessageForIncorrectType(value, "number")
        }
      ]
    };
  }
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/primitives/string.mjs
var string = createIdentitySchemaCreator(SchemaType.STRING, (value, { breadcrumbsPrefix = [] } = {}) => {
  if (typeof value === "string") {
    return {
      ok: true,
      value
    };
  } else {
    return {
      ok: false,
      errors: [
        {
          path: breadcrumbsPrefix,
          message: getErrorMessageForIncorrectType(value, "string")
        }
      ]
    };
  }
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/primitives/unknown.mjs
var unknown = createIdentitySchemaCreator(SchemaType.UNKNOWN, (value) => ({ ok: true, value }));

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/record/record.mjs
var _hasOwn3 = Object.prototype.hasOwnProperty;
function record(keySchema, valueSchema) {
  const baseSchema = {
    parse: (raw, opts) => {
      return validateAndTransformRecord({
        value: raw,
        isKeyNumeric: keySchema.getType() === SchemaType.NUMBER,
        transformKey: (key) => {
          var _a;
          return keySchema.parse(key, Object.assign(Object.assign({}, opts), { breadcrumbsPrefix: [...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [], `${key} (key)`] }));
        },
        transformValue: (value, key) => {
          var _a;
          return valueSchema.parse(value, Object.assign(Object.assign({}, opts), { breadcrumbsPrefix: [...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [], `${key}`] }));
        },
        breadcrumbsPrefix: opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix
      });
    },
    json: (parsed, opts) => {
      return validateAndTransformRecord({
        value: parsed,
        isKeyNumeric: keySchema.getType() === SchemaType.NUMBER,
        transformKey: (key) => {
          var _a;
          return keySchema.json(key, Object.assign(Object.assign({}, opts), { breadcrumbsPrefix: [...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [], `${key} (key)`] }));
        },
        transformValue: (value, key) => {
          var _a;
          return valueSchema.json(value, Object.assign(Object.assign({}, opts), { breadcrumbsPrefix: [...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [], `${key}`] }));
        },
        breadcrumbsPrefix: opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix
      });
    },
    getType: () => SchemaType.RECORD
  };
  return Object.assign(Object.assign({}, maybeSkipValidation(baseSchema)), getSchemaUtils(baseSchema));
}
function partialRecord(keySchema, valueSchema) {
  const baseSchema = {
    parse: (raw, opts) => {
      return validateAndTransformRecord({
        value: raw,
        isKeyNumeric: keySchema.getType() === SchemaType.NUMBER,
        transformKey: (key) => {
          var _a;
          return keySchema.parse(key, Object.assign(Object.assign({}, opts), { breadcrumbsPrefix: [...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [], `${key} (key)`] }));
        },
        transformValue: (value, key) => {
          var _a;
          return valueSchema.parse(value, Object.assign(Object.assign({}, opts), { breadcrumbsPrefix: [...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [], `${key}`] }));
        },
        breadcrumbsPrefix: opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix
      });
    },
    json: (parsed, opts) => {
      return validateAndTransformRecord({
        value: parsed,
        isKeyNumeric: keySchema.getType() === SchemaType.NUMBER,
        transformKey: (key) => {
          var _a;
          return keySchema.json(key, Object.assign(Object.assign({}, opts), { breadcrumbsPrefix: [...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [], `${key} (key)`] }));
        },
        transformValue: (value, key) => {
          var _a;
          return valueSchema.json(value, Object.assign(Object.assign({}, opts), { breadcrumbsPrefix: [...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [], `${key}`] }));
        },
        breadcrumbsPrefix: opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix
      });
    },
    getType: () => SchemaType.RECORD
  };
  return Object.assign(Object.assign({}, maybeSkipValidation(baseSchema)), getSchemaUtils(baseSchema));
}
function validateAndTransformRecord({ value, isKeyNumeric, transformKey, transformValue, breadcrumbsPrefix = [] }) {
  if (!isPlainObject(value)) {
    return {
      ok: false,
      errors: [
        {
          path: breadcrumbsPrefix,
          message: getErrorMessageForIncorrectType(value, "object")
        }
      ]
    };
  }
  const result = {};
  const errors = [];
  for (const stringKey in value) {
    if (!_hasOwn3.call(value, stringKey)) {
      continue;
    }
    const entryValue = value[stringKey];
    if (entryValue === void 0) {
      continue;
    }
    let key = stringKey;
    if (isKeyNumeric) {
      const numberKey = stringKey.length > 0 ? Number(stringKey) : NaN;
      if (!Number.isNaN(numberKey)) {
        key = numberKey;
      }
    }
    const transformedKey = transformKey(key);
    const transformedValue = transformValue(entryValue, key);
    if (transformedKey.ok && transformedValue.ok) {
      result[transformedKey.value] = transformedValue.value;
    } else {
      if (!transformedKey.ok) {
        errors.push(...transformedKey.errors);
      }
      if (!transformedValue.ok) {
        errors.push(...transformedValue.errors);
      }
    }
  }
  if (errors.length === 0) {
    return { ok: true, value: result };
  }
  return { ok: false, errors };
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/set/set.mjs
function set(schema) {
  const listSchema = list(schema);
  const baseSchema = {
    parse: (raw, opts) => {
      const parsedList = listSchema.parse(raw, opts);
      if (parsedList.ok) {
        return {
          ok: true,
          value: new Set(parsedList.value)
        };
      } else {
        return parsedList;
      }
    },
    json: (parsed, opts) => {
      var _a;
      if (!(parsed instanceof Set)) {
        return {
          ok: false,
          errors: [
            {
              path: (_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [],
              message: getErrorMessageForIncorrectType(parsed, "Set")
            }
          ]
        };
      }
      const jsonList = listSchema.json([...parsed], opts);
      return jsonList;
    },
    getType: () => SchemaType.SET
  };
  return Object.assign(Object.assign({}, maybeSkipValidation(baseSchema)), getSchemaUtils(baseSchema));
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/undiscriminated-union/undiscriminatedUnion.mjs
function undiscriminatedUnion(schemas) {
  const baseSchema = {
    parse: (raw, opts) => {
      return validateAndTransformUndiscriminatedUnion((schema, opts2) => schema.parse(raw, opts2), schemas, opts);
    },
    json: (parsed, opts) => {
      return validateAndTransformUndiscriminatedUnion((schema, opts2) => schema.json(parsed, opts2), schemas, opts);
    },
    getType: () => SchemaType.UNDISCRIMINATED_UNION
  };
  return Object.assign(Object.assign({}, maybeSkipValidation(baseSchema)), getSchemaUtils(baseSchema));
}
function validateAndTransformUndiscriminatedUnion(transform2, schemas, opts) {
  const errors = [];
  for (const [index, schema] of schemas.entries()) {
    const transformed = transform2(schema, Object.assign(Object.assign({}, opts), { skipValidation: false }));
    if (transformed.ok) {
      return transformed;
    } else {
      for (const error of transformed.errors) {
        errors.push({
          path: error.path,
          message: `[Variant ${index}] ${error.message}`
        });
      }
    }
  }
  return {
    ok: false,
    errors
  };
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/union/discriminant.mjs
function discriminant(parsedDiscriminant, rawDiscriminant) {
  return {
    parsedDiscriminant,
    rawDiscriminant
  };
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/schemas/builders/union/union.mjs
var _hasOwn4 = Object.prototype.hasOwnProperty;
function union(discriminant2, union2) {
  const rawDiscriminant = typeof discriminant2 === "string" ? discriminant2 : discriminant2.rawDiscriminant;
  const parsedDiscriminant = typeof discriminant2 === "string" ? discriminant2 : discriminant2.parsedDiscriminant;
  const discriminantValueSchema = enum_(keys(union2));
  const baseSchema = {
    parse: (raw, opts) => {
      return transformAndValidateUnion({
        value: raw,
        discriminant: rawDiscriminant,
        transformedDiscriminant: parsedDiscriminant,
        transformDiscriminantValue: (discriminantValue) => {
          var _a;
          return discriminantValueSchema.parse(discriminantValue, {
            allowUnrecognizedEnumValues: opts === null || opts === void 0 ? void 0 : opts.allowUnrecognizedUnionMembers,
            breadcrumbsPrefix: [...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [], rawDiscriminant]
          });
        },
        getAdditionalPropertiesSchema: (discriminantValue) => union2[discriminantValue],
        allowUnrecognizedUnionMembers: opts === null || opts === void 0 ? void 0 : opts.allowUnrecognizedUnionMembers,
        transformAdditionalProperties: (additionalProperties, additionalPropertiesSchema) => additionalPropertiesSchema.parse(additionalProperties, opts),
        breadcrumbsPrefix: opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix
      });
    },
    json: (parsed, opts) => {
      return transformAndValidateUnion({
        value: parsed,
        discriminant: parsedDiscriminant,
        transformedDiscriminant: rawDiscriminant,
        transformDiscriminantValue: (discriminantValue) => {
          var _a;
          return discriminantValueSchema.json(discriminantValue, {
            allowUnrecognizedEnumValues: opts === null || opts === void 0 ? void 0 : opts.allowUnrecognizedUnionMembers,
            breadcrumbsPrefix: [...(_a = opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix) !== null && _a !== void 0 ? _a : [], parsedDiscriminant]
          });
        },
        getAdditionalPropertiesSchema: (discriminantValue) => union2[discriminantValue],
        allowUnrecognizedUnionMembers: opts === null || opts === void 0 ? void 0 : opts.allowUnrecognizedUnionMembers,
        transformAdditionalProperties: (additionalProperties, additionalPropertiesSchema) => additionalPropertiesSchema.json(additionalProperties, opts),
        breadcrumbsPrefix: opts === null || opts === void 0 ? void 0 : opts.breadcrumbsPrefix
      });
    },
    getType: () => SchemaType.UNION
  };
  return Object.assign(Object.assign(Object.assign({}, maybeSkipValidation(baseSchema)), getSchemaUtils(baseSchema)), getObjectLikeUtils(baseSchema));
}
function transformAndValidateUnion({ value, discriminant: discriminant2, transformedDiscriminant, transformDiscriminantValue, getAdditionalPropertiesSchema, allowUnrecognizedUnionMembers = false, transformAdditionalProperties, breadcrumbsPrefix = [] }) {
  if (!isPlainObject(value)) {
    return {
      ok: false,
      errors: [
        {
          path: breadcrumbsPrefix,
          message: getErrorMessageForIncorrectType(value, "object")
        }
      ]
    };
  }
  const discriminantValue = value[discriminant2];
  const additionalProperties = {};
  for (const key in value) {
    if (_hasOwn4.call(value, key) && key !== discriminant2) {
      additionalProperties[key] = value[key];
    }
  }
  if (discriminantValue == null) {
    return {
      ok: false,
      errors: [
        {
          path: breadcrumbsPrefix,
          message: `Missing discriminant ("${discriminant2}")`
        }
      ]
    };
  }
  const transformedDiscriminantValue = transformDiscriminantValue(discriminantValue);
  if (!transformedDiscriminantValue.ok) {
    return {
      ok: false,
      errors: transformedDiscriminantValue.errors
    };
  }
  const additionalPropertiesSchema = getAdditionalPropertiesSchema(transformedDiscriminantValue.value);
  if (additionalPropertiesSchema == null) {
    if (allowUnrecognizedUnionMembers) {
      return {
        ok: true,
        value: Object.assign({ [transformedDiscriminant]: transformedDiscriminantValue.value }, additionalProperties)
      };
    } else {
      return {
        ok: false,
        errors: [
          {
            path: [...breadcrumbsPrefix, discriminant2],
            message: "Unexpected discriminant value"
          }
        ]
      };
    }
  }
  const transformedAdditionalProperties = transformAdditionalProperties(additionalProperties, additionalPropertiesSchema);
  if (!transformedAdditionalProperties.ok) {
    return transformedAdditionalProperties;
  }
  return {
    ok: true,
    value: Object.assign({ [transformedDiscriminant]: discriminantValue }, transformedAdditionalProperties.value)
  };
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/stream/Stream.mjs
var __awaiter13 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __asyncValues2 = function(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
};
var __await2 = function(v) {
  return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
};
var __asyncDelegator = function(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await2(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
};
var __asyncGenerator2 = function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
};
var DATA_PREFIX = "data:";
var EVENT_PREFIX = "event:";
var ID_PREFIX = "id:";
var RETRY_PREFIX = "retry:";
var DEFAULT_MAX_RECONNECTION_ATTEMPTS = 5;
var DEFAULT_RECONNECT_DELAY_MS = 1e3;
var MAX_RECONNECT_DELAY_MS = 3e4;
var Stream = class {
  constructor({ stream, parse, eventShape, signal, reconnectionEnabled, maxReconnectionAttempts, reconnect }) {
    var _a;
    this.controller = new AbortController();
    this.stream = stream;
    this.parse = parse;
    if (eventShape.type === "sse") {
      this.prefix = DATA_PREFIX;
      this.messageTerminator = "\n";
      this.streamTerminator = eventShape.streamTerminator;
      this.eventDiscriminator = eventShape.eventDiscriminator;
      this.resumable = (_a = eventShape.resumable) !== null && _a !== void 0 ? _a : false;
    } else {
      this.messageTerminator = eventShape.messageTerminator;
      this.resumable = false;
    }
    this.reconnectionEnabled = reconnectionEnabled !== null && reconnectionEnabled !== void 0 ? reconnectionEnabled : true;
    this.maxReconnectionAttempts = maxReconnectionAttempts !== null && maxReconnectionAttempts !== void 0 ? maxReconnectionAttempts : DEFAULT_MAX_RECONNECTION_ATTEMPTS;
    this.reconnect = reconnect;
    if (signal != null) {
      this.externalSignal = signal;
      this.onExternalAbort = () => this.controller.abort();
      signal.addEventListener("abort", this.onExternalAbort, { once: true });
    }
    if (typeof TextDecoder !== "undefined") {
      this.decoder = new TextDecoder("utf-8");
    }
  }
  iterMessages() {
    return __asyncGenerator2(this, arguments, function* iterMessages_1() {
      if (this.eventDiscriminator != null) {
        yield __await2(yield* __asyncDelegator(__asyncValues2(this.iterSseEvents())));
      } else {
        yield __await2(yield* __asyncDelegator(__asyncValues2(this.iterDataMessages())));
      }
    });
  }
  iterDataMessages() {
    return __asyncGenerator2(this, arguments, function* iterDataMessages_1() {
      var _a, e_1, _b, _c;
      let reconnectAttempts = 0;
      let currentStream = this.stream;
      let lastId;
      let lastDispatchedId;
      let lastRetry;
      while (true) {
        const stream = readableStreamAsyncIterable(currentStream);
        let buf = "";
        let dataValue;
        try {
          for (var _d = true, stream_1 = (e_1 = void 0, __asyncValues2(stream)), stream_1_1; stream_1_1 = yield __await2(stream_1.next()), _a = stream_1_1.done, !_a; _d = true) {
            _c = stream_1_1.value;
            _d = false;
            const chunk = _c;
            buf += this.decodeChunk(chunk);
            let terminatorIndex;
            while ((terminatorIndex = buf.indexOf(this.messageTerminator)) >= 0) {
              const line = buf.slice(0, terminatorIndex);
              buf = buf.slice(terminatorIndex + this.messageTerminator.length);
              if (!line.trim()) {
                if (this.prefix != null && dataValue != null) {
                  if (this.streamTerminator != null && dataValue.includes(this.streamTerminator)) {
                    return yield __await2(void 0);
                  }
                  const data = yield __await2(this.parse(fromJson(dataValue)));
                  yield yield __await2({ data, id: lastId, retry: lastRetry, event: void 0 });
                  lastDispatchedId = lastId;
                  reconnectAttempts = 0;
                  dataValue = void 0;
                }
                continue;
              }
              if (line.startsWith(ID_PREFIX)) {
                const idValue = line.slice(ID_PREFIX.length).trim();
                if (!idValue.includes("\0")) {
                  lastId = idValue;
                }
                continue;
              }
              if (line.startsWith(RETRY_PREFIX)) {
                const retryValue = line.slice(RETRY_PREFIX.length).trim();
                const parsed = parseInt(retryValue, 10);
                if (!Number.isNaN(parsed) && String(parsed) === retryValue) {
                  lastRetry = parsed;
                }
                continue;
              }
              if (this.prefix != null) {
                const prefixIndex = line.indexOf(this.prefix);
                if (prefixIndex === -1) {
                  continue;
                }
                const val = line.slice(prefixIndex + this.prefix.length).trim();
                dataValue = dataValue != null ? `${dataValue}
${val}` : val;
              } else {
                if (this.streamTerminator != null && line.includes(this.streamTerminator)) {
                  return yield __await2(void 0);
                }
                const data = yield __await2(this.parse(fromJson(line)));
                yield yield __await2({ data, id: lastId, retry: lastRetry, event: void 0 });
                lastDispatchedId = lastId;
                reconnectAttempts = 0;
              }
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (!_d && !_a && (_b = stream_1.return)) yield __await2(_b.call(stream_1));
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        if (this.prefix != null && dataValue != null) {
          if (this.streamTerminator != null && dataValue.includes(this.streamTerminator)) {
            return yield __await2(void 0);
          }
          const data = yield __await2(this.parse(fromJson(dataValue)));
          yield yield __await2({ data, id: lastId, retry: lastRetry, event: void 0 });
          lastDispatchedId = lastId;
          reconnectAttempts = 0;
        }
        if (!this.shouldReconnect(lastDispatchedId, reconnectAttempts)) {
          return yield __await2(void 0);
        }
        reconnectAttempts++;
        yield __await2(this.delayReconnect(lastRetry));
        if (this.controller.signal.aborted) {
          return yield __await2(void 0);
        }
        const reconnectFn = this.reconnect;
        if (reconnectFn == null || lastDispatchedId == null) {
          return yield __await2(void 0);
        }
        try {
          const reconnected = yield __await2(reconnectFn(lastDispatchedId));
          if (reconnected == null) {
            currentStream = this.createEmptyStream();
            continue;
          }
          currentStream = reconnected;
        } catch (_e) {
          currentStream = this.createEmptyStream();
        }
      }
    });
  }
  iterSseEvents() {
    return __asyncGenerator2(this, arguments, function* iterSseEvents_1() {
      var _a, e_2, _b, _c;
      let reconnectAttempts = 0;
      let currentStream = this.stream;
      let lastId;
      let lastDispatchedId;
      let lastRetry;
      while (true) {
        const stream = readableStreamAsyncIterable(currentStream);
        let buf = "";
        let eventType;
        let dataValue;
        try {
          for (var _d = true, stream_2 = (e_2 = void 0, __asyncValues2(stream)), stream_2_1; stream_2_1 = yield __await2(stream_2.next()), _a = stream_2_1.done, !_a; _d = true) {
            _c = stream_2_1.value;
            _d = false;
            const chunk = _c;
            buf += this.decodeChunk(chunk);
            let terminatorIndex;
            while ((terminatorIndex = buf.indexOf("\n")) >= 0) {
              const line = buf.slice(0, terminatorIndex).replace(/\r$/, "");
              buf = buf.slice(terminatorIndex + 1);
              if (!line.trim()) {
                if (dataValue != null) {
                  const data = yield __await2(this.dispatchSseEvent(dataValue, eventType));
                  if (data == null) {
                    return yield __await2(void 0);
                  }
                  yield yield __await2({ data, id: lastId, retry: lastRetry, event: eventType });
                  lastDispatchedId = lastId;
                  reconnectAttempts = 0;
                }
                eventType = void 0;
                dataValue = void 0;
                continue;
              }
              if (line.startsWith(EVENT_PREFIX)) {
                eventType = line.slice(EVENT_PREFIX.length).trim();
              } else if (line.startsWith(DATA_PREFIX)) {
                const val = line.slice(DATA_PREFIX.length).trim();
                dataValue = dataValue != null ? `${dataValue}
${val}` : val;
              } else if (line.startsWith(ID_PREFIX)) {
                const idValue = line.slice(ID_PREFIX.length).trim();
                if (!idValue.includes("\0")) {
                  lastId = idValue;
                }
              } else if (line.startsWith(RETRY_PREFIX)) {
                const retryValue = line.slice(RETRY_PREFIX.length).trim();
                const parsed = parseInt(retryValue, 10);
                if (!Number.isNaN(parsed) && String(parsed) === retryValue) {
                  lastRetry = parsed;
                }
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (!_d && !_a && (_b = stream_2.return)) yield __await2(_b.call(stream_2));
          } finally {
            if (e_2) throw e_2.error;
          }
        }
        if (dataValue != null) {
          const data = yield __await2(this.dispatchSseEvent(dataValue, eventType));
          if (data != null) {
            yield yield __await2({ data, id: lastId, retry: lastRetry, event: eventType });
            lastDispatchedId = lastId;
            reconnectAttempts = 0;
          }
        }
        if (!this.shouldReconnect(lastDispatchedId, reconnectAttempts)) {
          return yield __await2(void 0);
        }
        reconnectAttempts++;
        yield __await2(this.delayReconnect(lastRetry));
        if (this.controller.signal.aborted) {
          return yield __await2(void 0);
        }
        const reconnectFn = this.reconnect;
        if (reconnectFn == null || lastDispatchedId == null) {
          return yield __await2(void 0);
        }
        try {
          const reconnected = yield __await2(reconnectFn(lastDispatchedId));
          if (reconnected == null) {
            currentStream = this.createEmptyStream();
            continue;
          }
          currentStream = reconnected;
        } catch (_e) {
          currentStream = this.createEmptyStream();
        }
      }
    });
  }
  /**
   * Parses and returns a single SSE event, or returns null if the event is a stream terminator.
   */
  dispatchSseEvent(dataValue, eventType) {
    return __awaiter13(this, void 0, void 0, function* () {
      if (this.streamTerminator != null && dataValue.includes(this.streamTerminator)) {
        return null;
      }
      return this.parse(this.injectDiscriminator(fromJson(dataValue), eventType));
    });
  }
  /**
   * Determines whether a reconnection attempt should be made.
   */
  shouldReconnect(lastId, reconnectAttempts) {
    if (!this.resumable) {
      return false;
    }
    if (this.streamTerminator == null) {
      return false;
    }
    if (!this.reconnectionEnabled) {
      return false;
    }
    if (this.reconnect == null) {
      return false;
    }
    if (lastId == null || lastId === "") {
      return false;
    }
    if (reconnectAttempts >= this.maxReconnectionAttempts) {
      return false;
    }
    if (this.controller.signal.aborted) {
      return false;
    }
    return true;
  }
  /**
   * Delays before reconnecting, using a server-sent retry directive if provided
   * (clamped to MAX_RECONNECT_DELAY_MS), otherwise falling back to
   * DEFAULT_RECONNECT_DELAY_MS. The delay is abortable: if the stream's abort
   * signal fires during the wait, the promise resolves immediately.
   */
  delayReconnect(lastRetry) {
    return __awaiter13(this, void 0, void 0, function* () {
      const base = lastRetry != null && lastRetry > 0 ? lastRetry : DEFAULT_RECONNECT_DELAY_MS;
      const delay = Math.min(base, MAX_RECONNECT_DELAY_MS);
      const signal = this.controller.signal;
      if (signal.aborted) {
        return;
      }
      yield new Promise((resolve) => {
        const timer = setTimeout(() => {
          signal.removeEventListener("abort", onAbort);
          resolve();
        }, delay);
        const onAbort = () => {
          clearTimeout(timer);
          resolve();
        };
        signal.addEventListener("abort", onAbort, { once: true });
      });
    });
  }
  createEmptyStream() {
    return new ReadableStream({
      start(controller) {
        controller.close();
      }
    });
  }
  removeAbortListener() {
    if (this.externalSignal != null && this.onExternalAbort != null) {
      this.externalSignal.removeEventListener("abort", this.onExternalAbort);
      this.onExternalAbort = void 0;
    }
  }
  withMetadata() {
    const self2 = this;
    return {
      [Symbol.asyncIterator]() {
        return __asyncGenerator2(this, arguments, function* _a() {
          try {
            yield __await2(yield* __asyncDelegator(__asyncValues2(self2.iterMessages())));
          } finally {
            self2.removeAbortListener();
          }
        });
      }
    };
  }
  injectDiscriminator(parsed, eventType) {
    if (this.eventDiscriminator == null || eventType == null) {
      return parsed;
    }
    if (parsed == null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return parsed;
    }
    const obj = parsed;
    if (this.eventDiscriminator in obj) {
      return parsed;
    }
    return Object.assign({ [this.eventDiscriminator]: eventType }, obj);
  }
  [Symbol.asyncIterator]() {
    return __asyncGenerator2(this, arguments, function* _a() {
      var _b, e_3, _c, _d;
      try {
        try {
          for (var _e = true, _f = __asyncValues2(this.iterMessages()), _g; _g = yield __await2(_f.next()), _b = _g.done, !_b; _e = true) {
            _d = _g.value;
            _e = false;
            const event = _d;
            yield yield __await2(event.data);
          }
        } catch (e_3_1) {
          e_3 = { error: e_3_1 };
        } finally {
          try {
            if (!_e && !_b && (_c = _f.return)) yield __await2(_c.call(_f));
          } finally {
            if (e_3) throw e_3.error;
          }
        }
      } finally {
        this.removeAbortListener();
      }
    });
  }
  decodeChunk(chunk) {
    let decoded = "";
    if (this.decoder != null) {
      decoded += this.decoder.decode(chunk, { stream: true });
    } else if (RUNTIME.type === "node" && typeof chunk !== "undefined") {
      decoded += Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    }
    return decoded;
  }
};
function readableStreamAsyncIterable(stream) {
  if (stream[Symbol.asyncIterator]) {
    return stream;
  }
  const reader = stream.getReader();
  return {
    next() {
      return __awaiter13(this, void 0, void 0, function* () {
        try {
          const result = yield reader.read();
          if (result === null || result === void 0 ? void 0 : result.done) {
            reader.releaseLock();
          }
          return result;
        } catch (e) {
          reader.releaseLock();
          throw e;
        }
      });
    },
    return() {
      return __awaiter13(this, void 0, void 0, function* () {
        const cancelPromise = reader.cancel();
        reader.releaseLock();
        yield cancelPromise;
        return { done: true, value: void 0 };
      });
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/url/index.mjs
var url_exports = {};
__export(url_exports, {
  encodePathParam: () => encodePathParam,
  join: () => join,
  queryBuilder: () => queryBuilder,
  toQueryString: () => toQueryString
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/url/encodePathParam.mjs
function encodePathParam(param) {
  if (param === null) {
    return "null";
  }
  const typeofParam = typeof param;
  switch (typeofParam) {
    case "undefined":
      return "undefined";
    case "string":
    case "number":
    case "boolean":
      break;
    default:
      param = String(param);
      break;
  }
  return encodeURIComponent(param);
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/url/QueryStringBuilder.mjs
function queryBuilder() {
  return new QueryStringBuilder();
}
var QueryStringBuilder = class {
  constructor() {
    this.parts = /* @__PURE__ */ new Map();
  }
  /**
   * Adds a query parameter, serializing it immediately.
   *
   * By default arrays use "repeat" format (`key=a&key=b`).
   * Pass `{ style: "comma" }` for OpenAPI `explode: false` parameters
   * to get comma-separated values (`key=a,b,c`).
   *
   * Null / undefined values are silently skipped.
   */
  add(key, value, options) {
    if (value === void 0 || value === null) {
      return this;
    }
    const serialized = toQueryString({ [key]: value }, { arrayFormat: (options === null || options === void 0 ? void 0 : options.style) === "comma" ? "comma" : "repeat" });
    if (serialized.length > 0) {
      this.parts.set(key, serialized);
    }
    return this;
  }
  /**
   * Adds multiple query parameters at once from a record.
   * All parameters use the default "repeat" array format.
   * Null / undefined values are silently skipped.
   */
  addMany(params) {
    if (params != null) {
      for (const [key, value] of Object.entries(params)) {
        this.add(key, value);
      }
    }
    return this;
  }
  /**
   * Merges additional query parameters supplied at call-time via
   * `requestOptions.queryParams`. Overrides existing keys (last-write-wins).
   */
  mergeAdditional(additionalParams) {
    if (additionalParams != null) {
      for (const [key, value] of Object.entries(additionalParams)) {
        if (value === void 0 || value === null) {
          continue;
        }
        const serialized = toQueryString({ [key]: value }, { arrayFormat: "repeat" });
        if (serialized.length > 0) {
          this.parts.set(key, serialized);
        }
      }
    }
    return this;
  }
  /**
   * Returns the assembled query string (without the leading `?`).
   * Returns an empty string when no parameters were added.
   */
  build() {
    return [...this.parts.values()].join("&");
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/utils/setObjectProperty.mjs
function setObjectProperty(object2, path, value) {
  if (object2 == null) {
    return object2;
  }
  const keys2 = path.split(".");
  if (keys2.length === 0) {
    return object2;
  }
  let current = object2;
  for (let i = 0; i < keys2.length - 1; i++) {
    const key = keys2[i];
    if (key == null) {
      continue;
    }
    if (!current[key] || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }
  const lastKey = keys2[keys2.length - 1];
  if (lastKey == null) {
    return object2;
  }
  current[lastKey] = value;
  return object2;
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/auth/BearerAuthProvider.mjs
var __awaiter14 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var TOKEN_PARAM = "token";
var BearerAuthProvider = class {
  constructor(options) {
    this.options = options;
  }
  static canCreate(options) {
    return (options === null || options === void 0 ? void 0 : options[TOKEN_PARAM]) != null;
  }
  getAuthRequest() {
    return __awaiter14(this, arguments, void 0, function* ({ endpointMetadata } = {}) {
      const token = yield Supplier.get(this.options[TOKEN_PARAM]);
      if (token == null) {
        return { headers: {} };
      }
      return {
        headers: { Authorization: `Bearer ${token}` }
      };
    });
  }
};
(function(BearerAuthProvider2) {
  BearerAuthProvider2.AUTH_SCHEME = "BearerAuth";
  BearerAuthProvider2.AUTH_CONFIG_ERROR_MESSAGE = `Please provide '${TOKEN_PARAM}' when initializing the client`;
  function createInstance(options) {
    return new BearerAuthProvider2(options);
  }
  BearerAuthProvider2.createInstance = createInstance;
})(BearerAuthProvider || (BearerAuthProvider = {}));

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/headers.mjs
function mergeHeaders(...headersArray) {
  const result = {};
  for (const [key, value] of headersArray.filter((headers) => headers != null).flatMap((headers) => Object.entries(headers))) {
    const insensitiveKey = key.toLowerCase();
    if (value != null) {
      result[insensitiveKey] = value;
    } else if (insensitiveKey in result) {
      delete result[insensitiveKey];
    }
  }
  return result;
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/BaseClient.mjs
function normalizeClientOptions(options) {
  const headers = mergeHeaders({
    "X-Fern-Language": "JavaScript",
    "X-Fern-SDK-Name": "@truefoundry/trueforge-sdk",
    "X-Fern-SDK-Version": "0.180.0",
    "User-Agent": "@truefoundry/trueforge-sdk/0.180.0",
    "X-Fern-Runtime": RUNTIME.type,
    "X-Fern-Runtime-Version": RUNTIME.version
  }, options === null || options === void 0 ? void 0 : options.headers);
  return Object.assign(Object.assign({}, options), { logging: logging_exports.createLogger(options === null || options === void 0 ? void 0 : options.logging), headers });
}
function normalizeClientOptionsWithAuth(options) {
  var _a;
  const normalized = normalizeClientOptions(options);
  if (options.auth === false) {
    normalized.authProvider = new NoOpAuthProvider();
    return normalized;
  }
  if (options.auth != null) {
    if (typeof options.auth === "function") {
      normalized.authProvider = { getAuthRequest: options.auth };
      return normalized;
    }
    if (isAuthProvider(options.auth)) {
      normalized.authProvider = options.auth;
      return normalized;
    }
    Object.assign(normalized, options.auth);
  }
  const normalizedWithNoOpAuthProvider = withNoOpAuthProvider(normalized);
  (_a = normalized.authProvider) !== null && _a !== void 0 ? _a : normalized.authProvider = new BearerAuthProvider(normalizedWithNoOpAuthProvider);
  return normalized;
}
function withNoOpAuthProvider(options) {
  return Object.assign(Object.assign({}, options), { authProvider: new NoOpAuthProvider() });
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/core/requestBody.mjs
function mergeAdditionalBodyParameters(body, additionalBodyParameters) {
  if (additionalBodyParameters == null) {
    return body;
  }
  if (body == null) {
    return Object.assign({}, additionalBodyParameters);
  }
  if (typeof body === "object" && !Array.isArray(body)) {
    return Object.assign(Object.assign({}, body), additionalBodyParameters);
  }
  return body;
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/errors/handleNonStatusCodeError.mjs
function handleNonStatusCodeError(error, rawResponse, method, path) {
  switch (error.reason) {
    case "non-json":
      throw new TrueForgeError({
        statusCode: error.statusCode,
        body: error.rawBody,
        rawResponse
      });
    case "body-is-null":
      throw new TrueForgeError({
        statusCode: error.statusCode,
        rawResponse
      });
    case "timeout":
      throw new TrueForgeTimeoutError(`Timeout exceeded when calling ${method} ${path}.`, {
        cause: error.cause
      });
    case "unknown":
      throw new TrueForgeError({
        message: error.errorMessage,
        rawResponse,
        cause: error.cause
      });
    default:
      throw new TrueForgeError({
        message: "Unknown error",
        rawResponse
      });
  }
}

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/InitialUserMessage.mjs
var InitialUserMessage = schemas_exports.object({
  content: schemas_exports.string(),
  type: schemas_exports.stringLiteral("user.message")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpServerApprovalToolSelector.mjs
var McpServerApprovalToolSelector = schemas_exports.undiscriminatedUnion([
  schemas_exports.stringLiteral("@all"),
  schemas_exports.stringLiteral("@write"),
  schemas_exports.stringLiteral("@destructive"),
  schemas_exports.string()
]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpServerToolSelector.mjs
var McpServerToolSelector = schemas_exports.undiscriminatedUnion([
  schemas_exports.stringLiteral("@all"),
  schemas_exports.stringLiteral("@read-only"),
  schemas_exports.string()
]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpServer.mjs
var McpServer = schemas_exports.object({
  disableTools: schemas_exports.property("disable_tools", schemas_exports.list(McpServerToolSelector).optional()),
  enableTools: schemas_exports.property("enable_tools", schemas_exports.list(McpServerToolSelector).optional()),
  name: schemas_exports.string(),
  preload: schemas_exports.boolean().optional(),
  preloadTools: schemas_exports.property("preload_tools", schemas_exports.list(McpServerToolSelector).optional()),
  requireApprovalForTools: schemas_exports.property("require_approval_for_tools", schemas_exports.list(McpServerApprovalToolSelector).optional())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ModelParams.mjs
var ModelParams = schemas_exports.object({
  maxTokens: schemas_exports.property("max_tokens", schemas_exports.number().optional()),
  parallelToolCalls: schemas_exports.property("parallel_tool_calls", schemas_exports.boolean().optional()),
  reasoningEffort: schemas_exports.property("reasoning_effort", schemas_exports.string().optional()),
  temperature: schemas_exports.number().optional(),
  topK: schemas_exports.property("top_k", schemas_exports.number().optional()),
  topP: schemas_exports.property("top_p", schemas_exports.number().optional())
}).passthrough();

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/Model.mjs
var Model = schemas_exports.object({
  name: schemas_exports.string(),
  params: ModelParams.optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ResponseFormatJsonObject.mjs
var ResponseFormatJsonObject = schemas_exports.object({
  type: schemas_exports.stringLiteral("json_object")
}).passthrough();

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ResponseFormatJsonSchemaJsonSchema.mjs
var ResponseFormatJsonSchemaJsonSchema = schemas_exports.object({
  description: schemas_exports.string().optional(),
  name: schemas_exports.string(),
  schema: schemas_exports.record(schemas_exports.string(), schemas_exports.unknown()).optional(),
  strict: schemas_exports.boolean().optionalNullable()
}).passthrough();

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ResponseFormatJsonSchema.mjs
var ResponseFormatJsonSchema = schemas_exports.object({
  jsonSchema: schemas_exports.property("json_schema", ResponseFormatJsonSchemaJsonSchema),
  type: schemas_exports.stringLiteral("json_schema")
}).passthrough();

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ResponseFormatText.mjs
var ResponseFormatText = schemas_exports.object({
  type: schemas_exports.stringLiteral("text")
}).passthrough();

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ResponseFormat.mjs
var ResponseFormat = schemas_exports.undiscriminatedUnion([ResponseFormatJsonObject, ResponseFormatJsonSchema, ResponseFormatText]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/AskUserQuestionsConfig.mjs
var AskUserQuestionsConfig = schemas_exports.object({
  enabled: schemas_exports.boolean().optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/InputTokensCompactionTrigger.mjs
var InputTokensCompactionTrigger = schemas_exports.object({
  type: schemas_exports.stringLiteral("input_tokens"),
  value: schemas_exports.number()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CompactionConfig.mjs
var CompactionConfig = schemas_exports.object({
  enabled: schemas_exports.boolean().optional(),
  trigger: InputTokensCompactionTrigger.optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/LargeToolResponseConfig.mjs
var LargeToolResponseConfig = schemas_exports.object({
  enabled: schemas_exports.boolean().optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ContextManagementConfig.mjs
var ContextManagementConfig = schemas_exports.object({
  compaction: CompactionConfig.optional(),
  largeToolResponse: schemas_exports.property("large_tool_response", LargeToolResponseConfig.optional())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/DynamicSubAgentsConfig.mjs
var DynamicSubAgentsConfig = schemas_exports.object({
  enabled: schemas_exports.boolean().optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GenerativeUiConfig.mjs
var GenerativeUiConfig = schemas_exports.object({
  enabled: schemas_exports.boolean().optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SandboxConfig.mjs
var SandboxConfig = schemas_exports.object({
  enabled: schemas_exports.boolean(),
  environmentName: schemas_exports.property("environment_name", schemas_exports.string().optional()),
  fileDownloads: schemas_exports.property("file_downloads", schemas_exports.boolean().optional())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/WebSearchConfig.mjs
var WebSearchConfig = schemas_exports.object({
  enabled: schemas_exports.boolean().optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/RuntimeConfig.mjs
var RuntimeConfig = schemas_exports.object({
  askUserQuestions: schemas_exports.property("ask_user_questions", AskUserQuestionsConfig.optional()),
  contextManagement: schemas_exports.property("context_management", ContextManagementConfig.optional()),
  dynamicSubAgents: schemas_exports.property("dynamic_sub_agents", DynamicSubAgentsConfig.optional()),
  generativeUi: schemas_exports.property("generative_ui", GenerativeUiConfig.optional()),
  iterationLimit: schemas_exports.property("iteration_limit", schemas_exports.number().optional()),
  sandbox: SandboxConfig.optional(),
  webSearch: schemas_exports.property("web_search", WebSearchConfig.optional())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/Skill.mjs
var Skill = schemas_exports.object({
  name: schemas_exports.string(),
  preload: schemas_exports.boolean().optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/AgentSpec.mjs
var AgentSpec = schemas_exports.object({
  config: RuntimeConfig.optional(),
  instructions: schemas_exports.string().optional(),
  mcpServers: schemas_exports.property("mcp_servers", schemas_exports.list(McpServer).optional()),
  messages: schemas_exports.list(InitialUserMessage).optional(),
  model: Model,
  responseFormat: schemas_exports.property("response_format", ResponseFormat.optional()),
  skills: schemas_exports.list(Skill).optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ResourceName.mjs
var ResourceName = schemas_exports.string();

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/agents/client/requests/CreateAgentRequest.mjs
var CreateAgentRequest = schemas_exports.object({
  description: schemas_exports.string(),
  manifest: AgentSpec,
  name: ResourceName
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/agents/client/requests/UpdateAgentRequest.mjs
var UpdateAgentRequest = schemas_exports.object({
  description: schemas_exports.string().optional(),
  manifest: AgentSpec
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/PermissionResourceType.mjs
var PermissionResourceType = schemas_exports.enum_(["agent", "schedule", "session", "tenant"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/internal/client/requests/ListPermissionsRequest.mjs
var ListPermissionsRequest = schemas_exports.object({
  resourceIds: schemas_exports.property("resource_ids", schemas_exports.list(schemas_exports.string())),
  resourceType: schemas_exports.property("resource_type", PermissionResourceType)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/internal/index.mjs
var internal_exports = {};
__export(internal_exports, {
  ExecuteScheduleRunRequest: () => ExecuteScheduleRunRequest,
  GetOrCreateSessionByExternalIdRequest: () => GetOrCreateSessionByExternalIdRequest,
  ListPermissionsRequest: () => ListPermissionsRequest,
  ProgressSandboxEnvironmentVersionRequest: () => ProgressSandboxEnvironmentVersionRequest,
  sandboxEnvironments: () => sandboxEnvironments_exports,
  schedules: () => schedules_exports,
  sessions: () => sessions_exports
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/internal/resources/sandboxEnvironments/client/requests/ProgressSandboxEnvironmentVersionRequest.mjs
var ProgressSandboxEnvironmentVersionRequest = schemas_exports.object({
  environmentVersionId: schemas_exports.property("environment_version_id", schemas_exports.string())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/internal/resources/sandboxEnvironments/index.mjs
var sandboxEnvironments_exports = {};
__export(sandboxEnvironments_exports, {
  ProgressSandboxEnvironmentVersionRequest: () => ProgressSandboxEnvironmentVersionRequest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/internal/resources/schedules/client/requests/ExecuteScheduleRunRequest.mjs
var ExecuteScheduleRunRequest = schemas_exports.object({
  scheduleRunId: schemas_exports.property("schedule_run_id", schemas_exports.string())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/internal/resources/schedules/index.mjs
var schedules_exports = {};
__export(schedules_exports, {
  ExecuteScheduleRunRequest: () => ExecuteScheduleRunRequest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionAgentNameRef.mjs
var SessionAgentNameRef = schemas_exports.object({
  name: ResourceName
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionAgentSpecBody.mjs
var SessionAgentSpecBody = schemas_exports.object({
  spec: AgentSpec
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CreateSessionAgent.mjs
var CreateSessionAgent = schemas_exports.undiscriminatedUnion([SessionAgentNameRef, SessionAgentSpecBody]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionSourceSchedule.mjs
var SessionSourceSchedule = schemas_exports.object({
  id: schemas_exports.string(),
  runId: schemas_exports.property("run_id", schemas_exports.string()),
  type: schemas_exports.stringLiteral("schedule")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/internal/resources/sessions/client/requests/GetOrCreateSessionByExternalIdRequest.mjs
var GetOrCreateSessionByExternalIdRequest = schemas_exports.object({
  agent: CreateSessionAgent,
  externalId: schemas_exports.property("external_id", schemas_exports.string()),
  source: SessionSourceSchedule.optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/internal/resources/sessions/index.mjs
var sessions_exports = {};
__export(sessions_exports, {
  GetOrCreateSessionByExternalIdRequest: () => GetOrCreateSessionByExternalIdRequest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SandboxEnvironmentImage.mjs
var SandboxEnvironmentImage = schemas_exports.object({
  buildScript: schemas_exports.property("build_script", schemas_exports.string().optional()),
  type: schemas_exports.stringLiteral("build")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SandboxEnvironmentSecret.mjs
var SandboxEnvironmentSecret = schemas_exports.object({
  env: schemas_exports.string(),
  hosts: schemas_exports.list(schemas_exports.string()),
  value: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SandboxEnvironmentNetworking.mjs
var SandboxEnvironmentNetworking = schemas_exports.object({
  domainAllowList: schemas_exports.property("domain_allow_list", schemas_exports.string().optional()),
  networkBlockAll: schemas_exports.property("network_block_all", schemas_exports.boolean().optional()),
  secrets: schemas_exports.list(SandboxEnvironmentSecret).optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SandboxEnvironmentResources.mjs
var SandboxEnvironmentResources = schemas_exports.object({
  cpu: schemas_exports.number().optional(),
  disk: schemas_exports.number().optional(),
  memory: schemas_exports.number().optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SandboxEnvironmentManifestRequest.mjs
var SandboxEnvironmentManifestRequest = schemas_exports.object({
  description: schemas_exports.string().optional(),
  environmentVariables: schemas_exports.property("environment_variables", schemas_exports.record(schemas_exports.string(), schemas_exports.string()).optional()),
  image: SandboxEnvironmentImage.optional(),
  name: ResourceName,
  networking: SandboxEnvironmentNetworking.optional(),
  resources: SandboxEnvironmentResources.optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/sandboxEnvironments/client/requests/CreateSandboxEnvironmentRequest.mjs
var CreateSandboxEnvironmentRequest = schemas_exports.object({
  manifest: SandboxEnvironmentManifestRequest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/sandboxEnvironments/client/requests/UpdateSandboxEnvironmentRequest.mjs
var UpdateSandboxEnvironmentRequest = schemas_exports.object({
  manifest: SandboxEnvironmentManifestRequest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CronExpression.mjs
var CronExpression = schemas_exports.string();

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ScheduleStatus.mjs
var ScheduleStatus = schemas_exports.enum_(["active", "paused"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/Timezone.mjs
var Timezone = schemas_exports.string();

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ScheduleManifest.mjs
var ScheduleManifest = schemas_exports.object({
  cron: CronExpression,
  status: ScheduleStatus.optional(),
  task: schemas_exports.string(),
  timezone: Timezone.optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/schedules/client/requests/CreateScheduleRequest.mjs
var CreateScheduleRequest = schemas_exports.object({
  agentName: schemas_exports.property("agent_name", ResourceName),
  manifest: ScheduleManifest,
  name: ResourceName
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/schedules/client/requests/CreateScheduleRunRequest.mjs
var CreateScheduleRunRequest = schemas_exports.object({
  scheduleId: schemas_exports.property("schedule_id", schemas_exports.string())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/schedules/client/requests/UpdateScheduleRequest.mjs
var UpdateScheduleRequest = schemas_exports.object({
  manifest: ScheduleManifest,
  name: ResourceName
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/sessions/client/requests/CancelSessionRequest.mjs
var CancelSessionRequest = schemas_exports.object({});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionMetadata.mjs
var SessionMetadata = schemas_exports.record(schemas_exports.string(), schemas_exports.string());

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/sessions/client/requests/CreateSessionRequest.mjs
var CreateSessionRequest = schemas_exports.object({
  agent: CreateSessionAgent,
  metadata: SessionMetadata.optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/UserMcpAuthContinueInputEvent.mjs
var UserMcpAuthContinueInputEvent = schemas_exports.object({
  type: schemas_exports.stringLiteral("user.mcp_auth_continue")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ApprovalAllow.mjs
var ApprovalAllow = schemas_exports.object({
  status: schemas_exports.stringLiteral("allow")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ApprovalDeny.mjs
var ApprovalDeny = schemas_exports.object({
  reason: schemas_exports.string().optional(),
  status: schemas_exports.stringLiteral("deny")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ApprovalDecision.mjs
var ApprovalDecision = schemas_exports.undiscriminatedUnion([ApprovalAllow, ApprovalDeny]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/UserToolApprovalInputEvent.mjs
var UserToolApprovalInputEvent = schemas_exports.object({
  approval: ApprovalDecision,
  threadId: schemas_exports.property("thread_id", schemas_exports.string()),
  toolCallId: schemas_exports.property("tool_call_id", schemas_exports.string()),
  type: schemas_exports.stringLiteral("user.tool_approval")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ToolApprovalPolicyAllowSession.mjs
var ToolApprovalPolicyAllowSession = schemas_exports.object({
  expireAt: schemas_exports.property("expire_at", schemas_exports.string().optional()),
  type: schemas_exports.stringLiteral("allow_session")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ComponentsSchemasToolApprovalPolicyAllowSession.mjs
var ComponentsSchemasToolApprovalPolicyAllowSession = ToolApprovalPolicyAllowSession;

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ToolApprovalPolicyItem.mjs
var ToolApprovalPolicyItem = schemas_exports.object({
  action: ComponentsSchemasToolApprovalPolicyAllowSession,
  name: schemas_exports.string(),
  serverName: schemas_exports.property("server_name", schemas_exports.string())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/UserToolApprovalPolicyMessage.mjs
var UserToolApprovalPolicyMessage = schemas_exports.object({
  policies: schemas_exports.list(ToolApprovalPolicyItem),
  type: schemas_exports.stringLiteral("user.tool_approval_policy")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/UserToolResponseInputEvent.mjs
var UserToolResponseInputEvent = schemas_exports.object({
  content: schemas_exports.string(),
  threadId: schemas_exports.property("thread_id", schemas_exports.string()),
  toolCallId: schemas_exports.property("tool_call_id", schemas_exports.string()),
  type: schemas_exports.stringLiteral("user.tool_response")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnInboundEventItem.mjs
var TurnInboundEventItem = schemas_exports.undiscriminatedUnion([
  UserMcpAuthContinueInputEvent,
  UserToolApprovalInputEvent,
  UserToolApprovalPolicyMessage,
  UserToolResponseInputEvent
]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/sessions/client/requests/CreateTurnEventRequest.mjs
var CreateTurnEventRequest = schemas_exports.object({
  events: schemas_exports.list(TurnInboundEventItem)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/PreviousTurnIdInput.mjs
var PreviousTurnIdInput = schemas_exports.undiscriminatedUnion([
  schemas_exports.stringLiteral("auto"),
  schemas_exports.stringLiteral("none"),
  schemas_exports.string()
]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/FileContent.mjs
var FileContent = schemas_exports.object({
  data: schemas_exports.string(),
  name: schemas_exports.string(),
  type: schemas_exports.stringLiteral("file")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TextContent.mjs
var TextContent = schemas_exports.object({
  text: schemas_exports.string(),
  type: schemas_exports.stringLiteral("text")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/UserMessageContentItem.mjs
var UserMessageContentItem = schemas_exports.undiscriminatedUnion([FileContent, TextContent]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/UserMessageContent.mjs
var UserMessageContent = schemas_exports.undiscriminatedUnion([
  schemas_exports.string(),
  schemas_exports.list(UserMessageContentItem)
]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/UserMessage.mjs
var UserMessage = schemas_exports.object({
  content: UserMessageContent,
  type: schemas_exports.stringLiteral("user.message")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnInputItem.mjs
var TurnInputItem = schemas_exports.undiscriminatedUnion([UserMessage, UserToolApprovalInputEvent, UserToolResponseInputEvent]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/sessions/client/requests/CreateTurnSessionsRequest.mjs
var CreateTurnSessionsRequest = schemas_exports.object({
  input: schemas_exports.list(TurnInputItem).optional(),
  previousTurnId: schemas_exports.property("previous_turn_id", PreviousTurnIdInput.optional())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/sessions/client/requests/CreateTurnSessionsStreamRequest.mjs
var CreateTurnSessionsStreamRequest = schemas_exports.object({
  input: schemas_exports.list(TurnInputItem).optional(),
  previousTurnId: schemas_exports.property("previous_turn_id", PreviousTurnIdInput.optional())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/sessions/client/requests/UpdateSessionRequest.mjs
var UpdateSessionRequest = schemas_exports.object({
  agent: SessionAgentSpecBody.optional(),
  metadata: SessionMetadata.optional(),
  shared: schemas_exports.boolean().optional(),
  title: schemas_exports.string().optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/settings/index.mjs
var settings_exports = {};
__export(settings_exports, {
  CreateMcpServerRequest: () => CreateMcpServerRequest,
  CreateModelProviderRequest: () => CreateModelProviderRequest,
  CreateSkillRequest: () => CreateSkillRequest,
  UpdateMcpServerRequest: () => UpdateMcpServerRequest,
  UpdateModelProviderRequest: () => UpdateModelProviderRequest,
  UpdateSandboxProviderRequest: () => UpdateSandboxProviderRequest,
  UpdateSkillRequest: () => UpdateSkillRequest,
  UpdateWebSearchProviderRequest: () => UpdateWebSearchProviderRequest,
  mcpServers: () => mcpServers_exports,
  modelProviders: () => modelProviders_exports,
  sandboxProviders: () => sandboxProviders_exports,
  skills: () => skills_exports,
  webSearchProviders: () => webSearchProviders_exports
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpServerDcrAuth.mjs
var McpServerDcrAuth = schemas_exports.object({
  type: schemas_exports.stringLiteral("dcr")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpServerHeaderAuth.mjs
var McpServerHeaderAuth = schemas_exports.object({
  headers: schemas_exports.record(schemas_exports.string(), schemas_exports.string()),
  type: schemas_exports.stringLiteral("header")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpServerManifestAuth.mjs
var McpServerManifestAuth = schemas_exports.undiscriminatedUnion([McpServerDcrAuth, McpServerHeaderAuth]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/RemoteMcpServerManifest.mjs
var RemoteMcpServerManifest = schemas_exports.object({
  auth: McpServerManifestAuth.optional(),
  description: schemas_exports.string(),
  name: ResourceName,
  type: schemas_exports.stringLiteral("remote"),
  url: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TrueFoundryMcpServerManifest.mjs
var TrueFoundryMcpServerManifest = schemas_exports.object({
  auth: McpServerManifestAuth.optional(),
  description: schemas_exports.string(),
  name: ResourceName,
  type: schemas_exports.stringLiteral("truefoundry"),
  url: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpServerManifest.mjs
var McpServerManifest = schemas_exports.undiscriminatedUnion([RemoteMcpServerManifest, TrueFoundryMcpServerManifest]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/settings/resources/mcpServers/client/requests/CreateMcpServerRequest.mjs
var CreateMcpServerRequest = schemas_exports.object({
  manifest: McpServerManifest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/settings/resources/mcpServers/client/requests/UpdateMcpServerRequest.mjs
var UpdateMcpServerRequest = schemas_exports.object({
  manifest: McpServerManifest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/settings/resources/mcpServers/index.mjs
var mcpServers_exports = {};
__export(mcpServers_exports, {
  CreateMcpServerRequest: () => CreateMcpServerRequest,
  UpdateMcpServerRequest: () => UpdateMcpServerRequest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ReasoningEffort.mjs
var ReasoningEffort = schemas_exports.enum_(["none", "minimal", "low", "medium", "high", "xhigh", "max"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ModelProperties.mjs
var ModelProperties = schemas_exports.object({
  contextLength: schemas_exports.property("context_length", schemas_exports.number().optional()),
  maxOutputTokens: schemas_exports.property("max_output_tokens", schemas_exports.number().optional()),
  reasoningEfforts: schemas_exports.property("reasoning_efforts", schemas_exports.list(ReasoningEffort).optional())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ConfiguredModel.mjs
var ConfiguredModel = schemas_exports.object({
  modelId: schemas_exports.property("model_id", schemas_exports.string()),
  name: ResourceName,
  properties: ModelProperties
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ModelProviderAuth.mjs
var ModelProviderAuth = schemas_exports.object({
  apiKey: schemas_exports.property("api_key", schemas_exports.string())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/AlibabaModelProvider.mjs
var AlibabaModelProvider = schemas_exports.object({
  auth: ModelProviderAuth,
  baseUrl: schemas_exports.property("base_url", schemas_exports.string().optional()),
  models: schemas_exports.list(ConfiguredModel),
  type: schemas_exports.stringLiteral("alibaba")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/AnthropicModelProvider.mjs
var AnthropicModelProvider = schemas_exports.object({
  auth: ModelProviderAuth,
  baseUrl: schemas_exports.property("base_url", schemas_exports.string().optional()),
  models: schemas_exports.list(ConfiguredModel),
  type: schemas_exports.stringLiteral("anthropic")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CustomModelProvider.mjs
var CustomModelProvider = schemas_exports.object({
  auth: ModelProviderAuth.optional(),
  baseUrl: schemas_exports.property("base_url", schemas_exports.string()),
  models: schemas_exports.list(ConfiguredModel),
  name: ResourceName,
  type: schemas_exports.stringLiteral("custom")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/FireworksModelProvider.mjs
var FireworksModelProvider = schemas_exports.object({
  auth: ModelProviderAuth,
  baseUrl: schemas_exports.property("base_url", schemas_exports.string().optional()),
  models: schemas_exports.list(ConfiguredModel),
  type: schemas_exports.stringLiteral("fireworks")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GoogleGeminiModelProvider.mjs
var GoogleGeminiModelProvider = schemas_exports.object({
  auth: ModelProviderAuth,
  baseUrl: schemas_exports.property("base_url", schemas_exports.string().optional()),
  models: schemas_exports.list(ConfiguredModel),
  type: schemas_exports.stringLiteral("google-gemini")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/MoonshotModelProvider.mjs
var MoonshotModelProvider = schemas_exports.object({
  auth: ModelProviderAuth,
  baseUrl: schemas_exports.property("base_url", schemas_exports.string().optional()),
  models: schemas_exports.list(ConfiguredModel),
  type: schemas_exports.stringLiteral("moonshot")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/OpenAiModelProvider.mjs
var OpenAiModelProvider = schemas_exports.object({
  auth: ModelProviderAuth,
  baseUrl: schemas_exports.property("base_url", schemas_exports.string().optional()),
  models: schemas_exports.list(ConfiguredModel),
  type: schemas_exports.stringLiteral("openai")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TogetherAiModelProvider.mjs
var TogetherAiModelProvider = schemas_exports.object({
  auth: ModelProviderAuth,
  baseUrl: schemas_exports.property("base_url", schemas_exports.string().optional()),
  models: schemas_exports.list(ConfiguredModel),
  type: schemas_exports.stringLiteral("together")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TrueFoundryModelProvider.mjs
var TrueFoundryModelProvider = schemas_exports.object({
  auth: ModelProviderAuth.optional(),
  baseUrl: schemas_exports.property("base_url", schemas_exports.string()),
  models: schemas_exports.list(ConfiguredModel),
  type: schemas_exports.stringLiteral("truefoundry")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ZaiModelProvider.mjs
var ZaiModelProvider = schemas_exports.object({
  auth: ModelProviderAuth,
  baseUrl: schemas_exports.property("base_url", schemas_exports.string().optional()),
  models: schemas_exports.list(ConfiguredModel),
  type: schemas_exports.stringLiteral("zai")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ModelProviderManifest.mjs
var ModelProviderManifest = schemas_exports.undiscriminatedUnion([
  AlibabaModelProvider,
  AnthropicModelProvider,
  CustomModelProvider,
  FireworksModelProvider,
  GoogleGeminiModelProvider,
  MoonshotModelProvider,
  OpenAiModelProvider,
  TogetherAiModelProvider,
  TrueFoundryModelProvider,
  ZaiModelProvider
]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/settings/resources/modelProviders/client/requests/CreateModelProviderRequest.mjs
var CreateModelProviderRequest = schemas_exports.object({
  manifest: ModelProviderManifest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/settings/resources/modelProviders/client/requests/UpdateModelProviderRequest.mjs
var UpdateModelProviderRequest = schemas_exports.object({
  manifest: ModelProviderManifest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/settings/resources/modelProviders/index.mjs
var modelProviders_exports = {};
__export(modelProviders_exports, {
  CreateModelProviderRequest: () => CreateModelProviderRequest,
  UpdateModelProviderRequest: () => UpdateModelProviderRequest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/DaytonaSandboxProviderAuth.mjs
var DaytonaSandboxProviderAuth = schemas_exports.object({
  apiKey: schemas_exports.property("api_key", schemas_exports.string())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SandboxProviderManifest.mjs
var SandboxProviderManifest = schemas_exports.object({
  auth: DaytonaSandboxProviderAuth,
  autoArchiveIntervalInMinutes: schemas_exports.property("auto_archive_interval_in_minutes", schemas_exports.number()),
  autoDeleteIntervalInMinutes: schemas_exports.property("auto_delete_interval_in_minutes", schemas_exports.number()),
  autoStopIntervalInMinutes: schemas_exports.property("auto_stop_interval_in_minutes", schemas_exports.number()),
  execTimeoutMs: schemas_exports.property("exec_timeout_ms", schemas_exports.number()),
  type: schemas_exports.stringLiteral("daytona")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/settings/resources/sandboxProviders/client/requests/UpdateSandboxProviderRequest.mjs
var UpdateSandboxProviderRequest = schemas_exports.object({
  manifest: SandboxProviderManifest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/settings/resources/sandboxProviders/index.mjs
var sandboxProviders_exports = {};
__export(sandboxProviders_exports, {
  UpdateSandboxProviderRequest: () => UpdateSandboxProviderRequest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GitSkill.mjs
var GitSkill = schemas_exports.object({
  description: schemas_exports.string(),
  name: ResourceName,
  path: schemas_exports.string().optional(),
  ref: schemas_exports.string(),
  type: schemas_exports.stringLiteral("git"),
  url: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TrueFoundryRegistrySkill.mjs
var TrueFoundryRegistrySkill = schemas_exports.object({
  description: schemas_exports.string(),
  displayName: schemas_exports.property("display_name", schemas_exports.string()),
  name: schemas_exports.string(),
  repositoryName: schemas_exports.property("repository_name", schemas_exports.string()),
  type: schemas_exports.stringLiteral("truefoundry"),
  version: schemas_exports.number()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SkillManifest.mjs
var SkillManifest = schemas_exports.undiscriminatedUnion([GitSkill, TrueFoundryRegistrySkill]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/settings/resources/skills/client/requests/CreateSkillRequest.mjs
var CreateSkillRequest = schemas_exports.object({
  manifest: SkillManifest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/settings/resources/skills/client/requests/UpdateSkillRequest.mjs
var UpdateSkillRequest = schemas_exports.object({
  manifest: SkillManifest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/settings/resources/skills/index.mjs
var skills_exports = {};
__export(skills_exports, {
  CreateSkillRequest: () => CreateSkillRequest,
  UpdateSkillRequest: () => UpdateSkillRequest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ParallelWebSearchProviderAuth.mjs
var ParallelWebSearchProviderAuth = schemas_exports.object({
  apiKey: schemas_exports.property("api_key", schemas_exports.string())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/WebSearchProviderManifest.mjs
var WebSearchProviderManifest = schemas_exports.object({
  auth: ParallelWebSearchProviderAuth,
  type: schemas_exports.stringLiteral("parallel")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/settings/resources/webSearchProviders/client/requests/UpdateWebSearchProviderRequest.mjs
var UpdateWebSearchProviderRequest = schemas_exports.object({
  manifest: WebSearchProviderManifest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/resources/settings/resources/webSearchProviders/index.mjs
var webSearchProviders_exports = {};
__export(webSearchProviders_exports, {
  UpdateWebSearchProviderRequest: () => UpdateWebSearchProviderRequest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ActionRequired.mjs
var ActionRequired = schemas_exports.object({
  id: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/BaseMcpAuthRequiredEvent.mjs
var BaseMcpAuthRequiredEvent = schemas_exports.object({
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  threadId: schemas_exports.property("thread_id", schemas_exports.string().nullable())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpServerAuthInfo.mjs
var McpServerAuthInfo = schemas_exports.object({
  authUrl: schemas_exports.property("auth_url", schemas_exports.string()),
  id: schemas_exports.string(),
  name: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpAuthRequiredEvent.mjs
var McpAuthRequiredEvent = schemas_exports.object({
  mcpServers: schemas_exports.property("mcp_servers", schemas_exports.list(McpServerAuthInfo)),
  type: schemas_exports.stringLiteral("mcp.auth_required")
}).extend(BaseMcpAuthRequiredEvent);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ToolCallRef.mjs
var ToolCallRef = schemas_exports.object({
  id: schemas_exports.string(),
  sourceEventId: schemas_exports.property("source_event_id", schemas_exports.string())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ToolApprovalRequiredEvent.mjs
var ToolApprovalRequiredEvent = schemas_exports.object({
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  threadId: schemas_exports.property("thread_id", schemas_exports.string()),
  toolCalls: schemas_exports.property("tool_calls", schemas_exports.list(ToolCallRef)),
  type: schemas_exports.stringLiteral("tool.approval_required")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ToolResponseRequiredEvent.mjs
var ToolResponseRequiredEvent = schemas_exports.object({
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  threadId: schemas_exports.property("thread_id", schemas_exports.string()),
  toolCalls: schemas_exports.property("tool_calls", schemas_exports.list(ToolCallRef)),
  type: schemas_exports.stringLiteral("tool.response_required")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ActionRequiredEvent.mjs
var ActionRequiredEvent = schemas_exports.undiscriminatedUnion([
  McpAuthRequiredEvent,
  ToolApprovalRequiredEvent,
  ToolResponseRequiredEvent
]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CreatedBySubject.mjs
var CreatedBySubject = schemas_exports.object({
  subjectDisplayName: schemas_exports.property("subject_display_name", schemas_exports.string()),
  subjectId: schemas_exports.property("subject_id", schemas_exports.string()),
  subjectType: schemas_exports.property("subject_type", schemas_exports.string())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/Agent.mjs
var Agent = schemas_exports.object({
  createdBySubject: schemas_exports.property("created_by_subject", CreatedBySubject),
  description: schemas_exports.string(),
  id: schemas_exports.string(),
  manifest: AgentSpec,
  name: ResourceName
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/AgentCodeSnippetSampleCode.mjs
var AgentCodeSnippetSampleCode = schemas_exports.object({
  nonStream: schemas_exports.property("non_stream", schemas_exports.string()),
  stream: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/AgentCodeSnippet.mjs
var AgentCodeSnippet = schemas_exports.object({
  icon: schemas_exports.string(),
  labelName: schemas_exports.property("label_name", schemas_exports.string()),
  language: schemas_exports.string(),
  sampleCode: schemas_exports.property("sample_code", AgentCodeSnippetSampleCode)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/AgentCodeSnippets.mjs
var AgentCodeSnippets = schemas_exports.object({
  baseUrl: schemas_exports.property("base_url", schemas_exports.string()),
  snippets: schemas_exports.list(AgentCodeSnippet)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/AgentInfo.mjs
var AgentInfo = schemas_exports.object({
  input: schemas_exports.string(),
  model: schemas_exports.string().optional(),
  name: schemas_exports.string(),
  type: schemas_exports.stringLiteral("dynamic")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/AgentParent.mjs
var AgentParent = schemas_exports.object({
  threadId: schemas_exports.property("thread_id", schemas_exports.string()),
  toolCallId: schemas_exports.property("tool_call_id", schemas_exports.string())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpAuthStatusStatus.mjs
var McpAuthStatusStatus = schemas_exports.enum_(["authenticated", "auth_required", "not_required"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpAuthStatus.mjs
var McpAuthStatus = schemas_exports.object({
  authorizationUrl: schemas_exports.property("authorization_url", schemas_exports.string().optional()),
  status: McpAuthStatusStatus
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpServerAuthPublicOne.mjs
var McpServerAuthPublicOne = schemas_exports.object({
  type: schemas_exports.stringLiteral("header")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpServerAuthPublicZero.mjs
var McpServerAuthPublicZero = schemas_exports.object({
  type: schemas_exports.stringLiteral("dcr")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpServerAuthPublic.mjs
var McpServerAuthPublic = schemas_exports.undiscriminatedUnion([McpServerAuthPublicZero, McpServerAuthPublicOne]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/AvailableMcpServer.mjs
var AvailableMcpServer = schemas_exports.object({
  auth: McpServerAuthPublic.optional(),
  authStatus: schemas_exports.property("auth_status", McpAuthStatus),
  name: ResourceName,
  url: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/AvailableModelProvider.mjs
var AvailableModelProvider = schemas_exports.object({
  name: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/AvailableModel.mjs
var AvailableModel = schemas_exports.object({
  modelId: schemas_exports.property("model_id", schemas_exports.string()),
  name: schemas_exports.string(),
  properties: ModelProperties,
  provider: AvailableModelProvider
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/AvailableSkill.mjs
var AvailableSkill = schemas_exports.object({
  description: schemas_exports.string(),
  metadata: schemas_exports.record(schemas_exports.string(), schemas_exports.string()).optional(),
  name: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CancelSessionResponse.mjs
var CancelSessionResponse = schemas_exports.object({});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SandboxCapability.mjs
var SandboxCapability = schemas_exports.object({
  enabled: schemas_exports.boolean()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SettingsCapability.mjs
var SettingsCapability = schemas_exports.object({
  enabled: schemas_exports.boolean()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SkillCapability.mjs
var SkillCapability = schemas_exports.object({
  enabled: schemas_exports.boolean(),
  reason: schemas_exports.string().optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/WebSearchCapability.mjs
var WebSearchCapability = schemas_exports.object({
  enabled: schemas_exports.boolean()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CapabilitiesData.mjs
var CapabilitiesData = schemas_exports.object({
  sandbox: SandboxCapability,
  settings: SettingsCapability,
  skill: SkillCapability,
  webSearch: schemas_exports.property("web_search", WebSearchCapability)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CatalogCustomModelProvider.mjs
var CatalogCustomModelProvider = schemas_exports.object({
  supportedReasoningEfforts: schemas_exports.property("supported_reasoning_efforts", schemas_exports.list(ReasoningEffort)),
  type: schemas_exports.stringLiteral("custom")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CatalogMcpServerType.mjs
var CatalogMcpServerType = schemas_exports.stringLiteral("remote");

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CatalogMcpServer.mjs
var CatalogMcpServer = schemas_exports.object({
  auth: McpServerManifestAuth.optional(),
  description: schemas_exports.string(),
  logo: schemas_exports.string().optional(),
  name: ResourceName,
  type: CatalogMcpServerType,
  url: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CatalogModel.mjs
var CatalogModel = schemas_exports.object({
  modelId: schemas_exports.property("model_id", schemas_exports.string()),
  name: ResourceName,
  properties: ModelProperties
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CatalogWellKnownModelProviderType.mjs
var CatalogWellKnownModelProviderType = schemas_exports.enum_([
  "openai",
  "anthropic",
  "google-gemini",
  "fireworks",
  "zai",
  "moonshot",
  "alibaba",
  "together"
]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CatalogWellKnownModelProvider.mjs
var CatalogWellKnownModelProvider = schemas_exports.object({
  logo: schemas_exports.string().optional(),
  models: schemas_exports.list(CatalogModel),
  type: CatalogWellKnownModelProviderType
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CatalogModelProvider.mjs
var CatalogModelProvider = schemas_exports.undiscriminatedUnion([CatalogWellKnownModelProvider, CatalogCustomModelProvider]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CatalogSandboxProvider.mjs
var CatalogSandboxProvider = schemas_exports.object({
  autoArchiveIntervalInMinutes: schemas_exports.property("auto_archive_interval_in_minutes", schemas_exports.number()),
  autoDeleteIntervalInMinutes: schemas_exports.property("auto_delete_interval_in_minutes", schemas_exports.number()),
  autoStopIntervalInMinutes: schemas_exports.property("auto_stop_interval_in_minutes", schemas_exports.number()),
  execTimeoutMs: schemas_exports.property("exec_timeout_ms", schemas_exports.number()),
  type: schemas_exports.stringLiteral("daytona")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CatalogSkillType.mjs
var CatalogSkillType = schemas_exports.stringLiteral("git");

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CatalogSkill.mjs
var CatalogSkill = schemas_exports.object({
  description: schemas_exports.string(),
  name: ResourceName,
  path: schemas_exports.string().optional(),
  ref: schemas_exports.string(),
  type: CatalogSkillType,
  url: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CatalogWebSearchProvider.mjs
var CatalogWebSearchProvider = schemas_exports.object({
  type: schemas_exports.stringLiteral("parallel")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ChatCompletionChunkDeltaToolCallFunction.mjs
var ChatCompletionChunkDeltaToolCallFunction = schemas_exports.object({
  arguments: schemas_exports.string().optional(),
  name: schemas_exports.string().optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ChatCompletionChunkDeltaToolCall.mjs
var ChatCompletionChunkDeltaToolCall = schemas_exports.object({
  function: ChatCompletionChunkDeltaToolCallFunction.optional(),
  id: schemas_exports.string().optional(),
  index: schemas_exports.number(),
  type: schemas_exports.stringLiteral("function").optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ChatCompletionContentPartRefusal.mjs
var ChatCompletionContentPartRefusal = schemas_exports.object({
  refusal: schemas_exports.string(),
  type: schemas_exports.stringLiteral("refusal")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ChatCompletionContentPartText.mjs
var ChatCompletionContentPartText = schemas_exports.object({
  text: schemas_exports.string(),
  type: schemas_exports.stringLiteral("text")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ChatCompletionMessageToolCallFunction.mjs
var ChatCompletionMessageToolCallFunction = schemas_exports.object({
  arguments: schemas_exports.string(),
  name: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ChatCompletionMessageToolCall.mjs
var ChatCompletionMessageToolCall = schemas_exports.object({
  function: ChatCompletionMessageToolCallFunction,
  id: schemas_exports.string(),
  type: schemas_exports.stringLiteral("function")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ConfiguredMcpServer.mjs
var ConfiguredMcpServer = schemas_exports.object({
  authStatus: schemas_exports.property("auth_status", McpAuthStatus),
  manifest: McpServerManifest,
  name: ResourceName
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ConfiguredModelProvider.mjs
var ConfiguredModelProvider = schemas_exports.object({
  manifest: ModelProviderManifest,
  name: ResourceName
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ConfiguredSandboxProvider.mjs
var ConfiguredSandboxProvider = schemas_exports.object({
  manifest: SandboxProviderManifest
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ConfiguredSkill.mjs
var ConfiguredSkill = schemas_exports.object({
  manifest: SkillManifest,
  name: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ConfiguredWebSearchProvider.mjs
var ConfiguredWebSearchProvider = schemas_exports.object({
  manifest: WebSearchProviderManifest,
  name: ResourceName
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ScheduleRunStatus.mjs
var ScheduleRunStatus = schemas_exports.enum_(["scheduled", "triggered", "failed"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ScheduleRun.mjs
var ScheduleRun = schemas_exports.object({
  createdAt: schemas_exports.property("created_at", schemas_exports.date()),
  createdBySubject: schemas_exports.property("created_by_subject", CreatedBySubject),
  id: schemas_exports.string(),
  name: schemas_exports.string(),
  reason: schemas_exports.string().nullable(),
  scheduleId: schemas_exports.property("schedule_id", schemas_exports.string()),
  scheduledFor: schemas_exports.property("scheduled_for", schemas_exports.date()),
  status: ScheduleRunStatus,
  triggeredAt: schemas_exports.property("triggered_at", schemas_exports.date().nullable()),
  updatedAt: schemas_exports.property("updated_at", schemas_exports.date())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CreateScheduleRunResponse.mjs
var CreateScheduleRunResponse = schemas_exports.object({
  data: ScheduleRun
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/UserMcpAuthContinueEvent.mjs
var UserMcpAuthContinueEvent = schemas_exports.object({
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  type: schemas_exports.stringLiteral("user.mcp_auth_continue")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/UserToolApprovalEvent.mjs
var UserToolApprovalEvent = schemas_exports.object({
  approval: ApprovalDecision,
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  threadId: schemas_exports.property("thread_id", schemas_exports.string()),
  toolCallId: schemas_exports.property("tool_call_id", schemas_exports.string()),
  type: schemas_exports.stringLiteral("user.tool_approval")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/UserToolApprovalPolicyEvent.mjs
var UserToolApprovalPolicyEvent = schemas_exports.object({
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  policies: schemas_exports.list(ToolApprovalPolicyItem),
  type: schemas_exports.stringLiteral("user.tool_approval_policy")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/UserToolResponseEvent.mjs
var UserToolResponseEvent = schemas_exports.object({
  content: schemas_exports.string(),
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  threadId: schemas_exports.property("thread_id", schemas_exports.string()),
  toolCallId: schemas_exports.property("tool_call_id", schemas_exports.string()),
  type: schemas_exports.stringLiteral("user.tool_response")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CreateTurnEventResponseDataItem.mjs
var CreateTurnEventResponseDataItem = schemas_exports.undiscriminatedUnion([
  UserMcpAuthContinueEvent,
  UserToolApprovalEvent,
  UserToolApprovalPolicyEvent,
  UserToolResponseEvent
]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/CreateTurnEventResponse.mjs
var CreateTurnEventResponse = schemas_exports.object({
  data: schemas_exports.list(CreateTurnEventResponseDataItem)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/DeleteAgentResponse.mjs
var DeleteAgentResponse = schemas_exports.object({});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/DeleteMcpServerResponse.mjs
var DeleteMcpServerResponse = schemas_exports.object({});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/DeleteModelProviderResponse.mjs
var DeleteModelProviderResponse = schemas_exports.object({});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/DeleteSandboxEnvironmentResponse.mjs
var DeleteSandboxEnvironmentResponse = schemas_exports.object({});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/DeleteScheduleResponse.mjs
var DeleteScheduleResponse = schemas_exports.object({});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/DeleteSkillResponse.mjs
var DeleteSkillResponse = schemas_exports.object({});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpToolInfo.mjs
var McpToolInfo = schemas_exports.object({
  name: schemas_exports.string(),
  serverId: schemas_exports.property("server_id", schemas_exports.string()),
  serverName: schemas_exports.property("server_name", schemas_exports.string()),
  type: schemas_exports.stringLiteral("mcp")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TrueFoundrySystemToolInfo.mjs
var TrueFoundrySystemToolInfo = schemas_exports.object({
  name: schemas_exports.string(),
  type: schemas_exports.stringLiteral("truefoundry-system")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ToolInfo.mjs
var ToolInfo = schemas_exports.undiscriminatedUnion([McpToolInfo, TrueFoundrySystemToolInfo]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ExtendedChunkDeltaToolCall.mjs
var ExtendedChunkDeltaToolCall = schemas_exports.object({
  providerSpecificFields: schemas_exports.property("provider_specific_fields", schemas_exports.record(schemas_exports.string(), schemas_exports.unknown()).optional()),
  toolInfo: schemas_exports.property("tool_info", ToolInfo.optional())
}).extend(ChatCompletionChunkDeltaToolCall);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/FinishReason.mjs
var FinishReason = schemas_exports.enum_(["stop", "length", "tool_calls", "content_filter", "function_call"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetAgentCodeSnippetsResponse.mjs
var GetAgentCodeSnippetsResponse = schemas_exports.object({
  data: AgentCodeSnippets
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetAgentResponse.mjs
var GetAgentResponse = schemas_exports.object({
  data: Agent
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetAvailableMcpServerResponse.mjs
var GetAvailableMcpServerResponse = schemas_exports.object({
  data: AvailableMcpServer
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetCapabilitiesResponse.mjs
var GetCapabilitiesResponse = schemas_exports.object({
  data: CapabilitiesData
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetMcpServerCatalogResponse.mjs
var GetMcpServerCatalogResponse = schemas_exports.object({
  data: schemas_exports.list(CatalogMcpServer)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetMcpServerResponse.mjs
var GetMcpServerResponse = schemas_exports.object({
  data: ConfiguredMcpServer
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetMeSubject.mjs
var GetMeSubject = schemas_exports.object({
  displayName: schemas_exports.property("display_name", schemas_exports.string()),
  id: schemas_exports.string(),
  type: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/MeSessionType.mjs
var MeSessionType = schemas_exports.enum_(["default", "oidc-connected"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/Me.mjs
var Me = schemas_exports.object({
  roles: schemas_exports.list(schemas_exports.string()),
  subject: GetMeSubject,
  tenantId: schemas_exports.property("tenant_id", schemas_exports.string()),
  type: MeSessionType
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetMeResponse.mjs
var GetMeResponse = schemas_exports.object({
  data: Me
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetModelProviderCatalogResponse.mjs
var GetModelProviderCatalogResponse = schemas_exports.object({
  data: schemas_exports.list(CatalogModelProvider)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetModelProviderResponse.mjs
var GetModelProviderResponse = schemas_exports.object({
  data: ConfiguredModelProvider
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SandboxEnvironmentLifecycleStage.mjs
var SandboxEnvironmentLifecycleStage = schemas_exports.enum_(["active", "deleted"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SandboxEnvironmentManifest.mjs
var SandboxEnvironmentManifest = schemas_exports.object({
  description: schemas_exports.string().optional(),
  environmentVariables: schemas_exports.property("environment_variables", schemas_exports.record(schemas_exports.string(), schemas_exports.string()).optional()),
  image: SandboxEnvironmentImage.optional(),
  name: ResourceName,
  networking: SandboxEnvironmentNetworking.optional(),
  resources: SandboxEnvironmentResources.optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SandboxEnvironmentVersionStatus.mjs
var SandboxEnvironmentVersionStatus = schemas_exports.enum_(["pending", "ready", "failed"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SandboxEnvironment.mjs
var SandboxEnvironment = schemas_exports.object({
  createdAt: schemas_exports.property("created_at", schemas_exports.date()),
  createdBySubject: schemas_exports.property("created_by_subject", CreatedBySubject),
  description: schemas_exports.string(),
  id: schemas_exports.string(),
  lifecycleStage: schemas_exports.property("lifecycle_stage", SandboxEnvironmentLifecycleStage),
  manifest: SandboxEnvironmentManifest,
  name: ResourceName,
  status: SandboxEnvironmentVersionStatus,
  statusReason: schemas_exports.property("status_reason", schemas_exports.string().nullable()),
  updatedAt: schemas_exports.property("updated_at", schemas_exports.date())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetSandboxEnvironmentResponse.mjs
var GetSandboxEnvironmentResponse = schemas_exports.object({
  data: SandboxEnvironment
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetSandboxProviderCatalogResponse.mjs
var GetSandboxProviderCatalogResponse = schemas_exports.object({
  data: schemas_exports.list(CatalogSandboxProvider)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetSandboxProviderResponse.mjs
var GetSandboxProviderResponse = schemas_exports.object({
  data: ConfiguredSandboxProvider
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/Schedule.mjs
var Schedule = schemas_exports.object({
  agentName: schemas_exports.property("agent_name", ResourceName),
  createdAt: schemas_exports.property("created_at", schemas_exports.date()),
  createdBySubject: schemas_exports.property("created_by_subject", CreatedBySubject),
  id: schemas_exports.string(),
  manifest: ScheduleManifest,
  name: ResourceName,
  updatedAt: schemas_exports.property("updated_at", schemas_exports.date())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetScheduleResponse.mjs
var GetScheduleResponse = schemas_exports.object({
  data: Schedule
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/MetricsUnit.mjs
var MetricsUnit = schemas_exports.enum_(["count", "$", "ms"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionMetricsChartName.mjs
var SessionMetricsChartName = schemas_exports.enum_(["sessions_over_time", "sessions_cost_over_time", "turns_over_time"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionMetricsPoint.mjs
var SessionMetricsPoint = schemas_exports.object({
  timestamp: schemas_exports.string(),
  value: schemas_exports.number()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionMetricsGraphLine.mjs
var SessionMetricsGraphLine = schemas_exports.object({
  name: schemas_exports.string(),
  values: schemas_exports.list(SessionMetricsPoint)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionMetricsGraph.mjs
var SessionMetricsGraph = schemas_exports.object({
  chartType: schemas_exports.property("chart_type", schemas_exports.stringLiteral("line")),
  description: schemas_exports.string(),
  displayName: schemas_exports.property("display_name", schemas_exports.string()),
  graphLines: schemas_exports.property("graph_lines", schemas_exports.list(SessionMetricsGraphLine)),
  name: SessionMetricsChartName,
  unit: MetricsUnit
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionMetricsChartDataResponse.mjs
var SessionMetricsChartDataResponse = schemas_exports.object({
  graphs: schemas_exports.list(SessionMetricsGraph),
  step: schemas_exports.string()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetSessionMetricsChartDataResponse.mjs
var GetSessionMetricsChartDataResponse = schemas_exports.object({
  data: SessionMetricsChartDataResponse
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionMetricsChart.mjs
var SessionMetricsChart = schemas_exports.object({
  chartType: schemas_exports.property("chart_type", schemas_exports.stringLiteral("line")),
  description: schemas_exports.string(),
  displayName: schemas_exports.property("display_name", schemas_exports.string()),
  name: SessionMetricsChartName
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionMetricsChartResponse.mjs
var SessionMetricsChartResponse = schemas_exports.object({
  charts: schemas_exports.list(SessionMetricsChart)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetSessionMetricsChartResponse.mjs
var GetSessionMetricsChartResponse = schemas_exports.object({
  data: SessionMetricsChartResponse
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionMetricsMeterName.mjs
var SessionMetricsMeterName = schemas_exports.enum_([
  "total_sessions",
  "total_cost_in_usd",
  "total_turns",
  "cost_per_session_in_usd",
  "avg_turns_per_session",
  "min_turns_per_session",
  "max_turns_per_session",
  "median_turns_per_session",
  "min_session_duration_ms",
  "max_session_duration_ms",
  "median_session_duration_ms",
  "p95_session_duration_ms"
]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionMetricsMeter.mjs
var SessionMetricsMeter = schemas_exports.object({
  aggregateValue: schemas_exports.property("aggregate_value", schemas_exports.number()),
  description: schemas_exports.string(),
  name: SessionMetricsMeterName,
  unit: MetricsUnit
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionMetricsMeterResponse.mjs
var SessionMetricsMeterResponse = schemas_exports.object({
  meters: schemas_exports.list(SessionMetricsMeter)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetSessionMetricsMeterResponse.mjs
var GetSessionMetricsMeterResponse = schemas_exports.object({
  data: SessionMetricsMeterResponse
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionAgentInline.mjs
var SessionAgentInline = schemas_exports.object({
  spec: AgentSpec,
  type: schemas_exports.stringLiteral("inline")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionAgentReference.mjs
var SessionAgentReference = schemas_exports.object({
  id: schemas_exports.string(),
  name: schemas_exports.string().nullable(),
  type: schemas_exports.stringLiteral("reference")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionAgent.mjs
var SessionAgent = schemas_exports.undiscriminatedUnion([SessionAgentInline, SessionAgentReference]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionMetrics.mjs
var SessionMetrics = schemas_exports.object({
  totalCostInUsd: schemas_exports.property("total_cost_in_usd", schemas_exports.number().optional()),
  totalDurationMs: schemas_exports.property("total_duration_ms", schemas_exports.number()),
  totalTurns: schemas_exports.property("total_turns", schemas_exports.number())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionSource.mjs
var SessionSource = schemas_exports.object({
  id: schemas_exports.string(),
  runId: schemas_exports.property("run_id", schemas_exports.string()),
  type: schemas_exports.stringLiteral("schedule")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/Session.mjs
var Session = schemas_exports.object({
  agent: SessionAgent,
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  createdBySubject: schemas_exports.property("created_by_subject", CreatedBySubject),
  id: schemas_exports.string(),
  metadata: SessionMetadata,
  metrics: SessionMetrics,
  shared: schemas_exports.boolean(),
  source: SessionSource.nullable(),
  title: schemas_exports.string().nullable(),
  updatedAt: schemas_exports.property("updated_at", schemas_exports.string())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetSessionResponse.mjs
var GetSessionResponse = schemas_exports.object({
  data: Session
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetSkillCatalogResponse.mjs
var GetSkillCatalogResponse = schemas_exports.object({
  data: schemas_exports.list(CatalogSkill)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetSkillResponse.mjs
var GetSkillResponse = schemas_exports.object({
  data: ConfiguredSkill
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnStateCancelledMetrics.mjs
var TurnStateCancelledMetrics = schemas_exports.object({
  totalCacheReadTokens: schemas_exports.property("total_cache_read_tokens", schemas_exports.number().optional()),
  totalCacheWriteTokens: schemas_exports.property("total_cache_write_tokens", schemas_exports.number().optional()),
  totalCostInUsd: schemas_exports.property("total_cost_in_usd", schemas_exports.number().optional()),
  totalInputTokens: schemas_exports.property("total_input_tokens", schemas_exports.number().optional()),
  totalOutputTokens: schemas_exports.property("total_output_tokens", schemas_exports.number().optional()),
  totalReasoningTokens: schemas_exports.property("total_reasoning_tokens", schemas_exports.number().optional()),
  totalTokens: schemas_exports.property("total_tokens", schemas_exports.number().optional())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnStateCancelledReason.mjs
var TurnStateCancelledReason = schemas_exports.enum_(["server-execution-timeout", "client-cancelled", "cancelled-for-next-turn", "abandoned"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnStateCancelled.mjs
var TurnStateCancelled = schemas_exports.object({
  completedAt: schemas_exports.property("completed_at", schemas_exports.string()),
  metrics: TurnStateCancelledMetrics.optional(),
  reason: TurnStateCancelledReason,
  status: schemas_exports.stringLiteral("cancelled")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ModelMessageEventContentOneItem.mjs
var ModelMessageEventContentOneItem = schemas_exports.undiscriminatedUnion([ChatCompletionContentPartText, ChatCompletionContentPartRefusal]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ModelMessageEventContent.mjs
var ModelMessageEventContent = schemas_exports.undiscriminatedUnion([
  schemas_exports.string(),
  schemas_exports.list(ModelMessageEventContentOneItem)
]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ModelMessageUsageInputTokensBreakdown.mjs
var ModelMessageUsageInputTokensBreakdown = schemas_exports.object({
  harness: schemas_exports.number(),
  instructions: schemas_exports.number(),
  messages: schemas_exports.number(),
  skills: schemas_exports.number(),
  toolDefinitions: schemas_exports.property("tool_definitions", schemas_exports.number())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ModelMessageUsage.mjs
var ModelMessageUsage = schemas_exports.object({
  cacheReadTokens: schemas_exports.property("cache_read_tokens", schemas_exports.number().optional()),
  cacheWriteTokens: schemas_exports.property("cache_write_tokens", schemas_exports.number().optional()),
  inputTokens: schemas_exports.property("input_tokens", schemas_exports.number()),
  inputTokensBreakdown: schemas_exports.property("input_tokens_breakdown", ModelMessageUsageInputTokensBreakdown),
  outputTokens: schemas_exports.property("output_tokens", schemas_exports.number())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/RawToolCall.mjs
var RawToolCall = schemas_exports.object({
  providerSpecificFields: schemas_exports.property("provider_specific_fields", schemas_exports.record(schemas_exports.string(), schemas_exports.unknown()).optional())
}).extend(ChatCompletionMessageToolCall);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ToolCall.mjs
var ToolCall = schemas_exports.object({
  toolInfo: schemas_exports.property("tool_info", ToolInfo)
}).extend(RawToolCall);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ModelMessageEvent.mjs
var ModelMessageEvent = schemas_exports.object({
  content: ModelMessageEventContent.optionalNullable(),
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  finishReason: schemas_exports.property("finish_reason", FinishReason.optionalNullable()),
  id: schemas_exports.string(),
  model: Model.optional(),
  name: schemas_exports.string().optional(),
  reasoningContent: schemas_exports.property("reasoning_content", schemas_exports.string().optional()),
  refusal: schemas_exports.string().optionalNullable(),
  threadId: schemas_exports.property("thread_id", schemas_exports.string()),
  toolCalls: schemas_exports.property("tool_calls", schemas_exports.list(ToolCall).optional()),
  type: schemas_exports.stringLiteral("model.message"),
  usage: ModelMessageUsage.optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnMetrics.mjs
var TurnMetrics = schemas_exports.object({
  totalCacheReadTokens: schemas_exports.property("total_cache_read_tokens", schemas_exports.number().optional()),
  totalCacheWriteTokens: schemas_exports.property("total_cache_write_tokens", schemas_exports.number().optional()),
  totalCostInUsd: schemas_exports.property("total_cost_in_usd", schemas_exports.number().optional()),
  totalInputTokens: schemas_exports.property("total_input_tokens", schemas_exports.number().optional()),
  totalOutputTokens: schemas_exports.property("total_output_tokens", schemas_exports.number().optional()),
  totalReasoningTokens: schemas_exports.property("total_reasoning_tokens", schemas_exports.number().optional()),
  totalTokens: schemas_exports.property("total_tokens", schemas_exports.number().optional())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnStateDone.mjs
var TurnStateDone = schemas_exports.object({
  completedAt: schemas_exports.property("completed_at", schemas_exports.string()),
  metrics: TurnMetrics.optional(),
  output: ModelMessageEvent.nullable(),
  requiredActions: schemas_exports.property("required_actions", schemas_exports.list(ActionRequiredEvent)),
  status: schemas_exports.stringLiteral("done")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnStateErrorMetrics.mjs
var TurnStateErrorMetrics = schemas_exports.object({
  totalCacheReadTokens: schemas_exports.property("total_cache_read_tokens", schemas_exports.number().optional()),
  totalCacheWriteTokens: schemas_exports.property("total_cache_write_tokens", schemas_exports.number().optional()),
  totalCostInUsd: schemas_exports.property("total_cost_in_usd", schemas_exports.number().optional()),
  totalInputTokens: schemas_exports.property("total_input_tokens", schemas_exports.number().optional()),
  totalOutputTokens: schemas_exports.property("total_output_tokens", schemas_exports.number().optional()),
  totalReasoningTokens: schemas_exports.property("total_reasoning_tokens", schemas_exports.number().optional()),
  totalTokens: schemas_exports.property("total_tokens", schemas_exports.number().optional())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnStateError.mjs
var TurnStateError = schemas_exports.object({
  completedAt: schemas_exports.property("completed_at", schemas_exports.string()),
  message: schemas_exports.string(),
  metrics: TurnStateErrorMetrics.optional(),
  status: schemas_exports.stringLiteral("error")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnStatePaused.mjs
var TurnStatePaused = schemas_exports.object({
  actionRequiredOnEvents: schemas_exports.property("action_required_on_events", schemas_exports.list(ActionRequired)),
  status: schemas_exports.stringLiteral("paused")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnStateRunning.mjs
var TurnStateRunning = schemas_exports.object({
  status: schemas_exports.stringLiteral("running")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnState.mjs
var TurnState = schemas_exports.undiscriminatedUnion([
  TurnStateCancelled,
  TurnStateDone,
  TurnStateError,
  TurnStatePaused,
  TurnStateRunning
]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/Turn.mjs
var Turn = schemas_exports.object({
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  input: schemas_exports.list(TurnInputItem).optional(),
  previousTurnId: schemas_exports.property("previous_turn_id", schemas_exports.string().nullable()),
  sessionId: schemas_exports.property("session_id", schemas_exports.string()),
  state: TurnState
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetTurnResponse.mjs
var GetTurnResponse = schemas_exports.object({
  data: Turn
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetWebSearchProviderCatalogResponse.mjs
var GetWebSearchProviderCatalogResponse = schemas_exports.object({
  data: schemas_exports.list(CatalogWebSearchProvider)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/GetWebSearchProviderResponse.mjs
var GetWebSearchProviderResponse = schemas_exports.object({
  data: ConfiguredWebSearchProvider
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TokenPagination.mjs
var TokenPagination = schemas_exports.object({
  limit: schemas_exports.number(),
  nextPageToken: schemas_exports.property("next_page_token", schemas_exports.string().optional()),
  previousPageToken: schemas_exports.property("previous_page_token", schemas_exports.string().optional())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListAgentsResponse.mjs
var ListAgentsResponse = schemas_exports.object({
  data: schemas_exports.list(Agent),
  pagination: TokenPagination
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListAvailableMcpServersResponse.mjs
var ListAvailableMcpServersResponse = schemas_exports.object({
  data: schemas_exports.list(AvailableMcpServer)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListAvailableModelsResponse.mjs
var ListAvailableModelsResponse = schemas_exports.object({
  data: schemas_exports.list(AvailableModel)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListAvailableSkillsResponse.mjs
var ListAvailableSkillsResponse = schemas_exports.object({
  data: schemas_exports.list(AvailableSkill)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListMcpServersResponse.mjs
var ListMcpServersResponse = schemas_exports.object({
  data: schemas_exports.list(ConfiguredMcpServer)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListMcpServerToolsResponse.mjs
var ListMcpServerToolsResponse = schemas_exports.object({
  data: schemas_exports.list(schemas_exports.record(schemas_exports.string(), schemas_exports.unknown()))
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListModelProvidersResponse.mjs
var ListModelProvidersResponse = schemas_exports.object({
  data: schemas_exports.list(ConfiguredModelProvider)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/PendingSandboxEnvironmentVersion.mjs
var PendingSandboxEnvironmentVersion = schemas_exports.object({
  environmentVersionId: schemas_exports.property("environment_version_id", schemas_exports.string())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListPendingSandboxEnvironmentVersionsResponse.mjs
var ListPendingSandboxEnvironmentVersionsResponse = schemas_exports.object({
  data: schemas_exports.list(PendingSandboxEnvironmentVersion)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ResourcePermission.mjs
var ResourcePermission = schemas_exports.enum_(["USE", "MANAGE", "DELETE", "CREATE"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListPermissionsData.mjs
var ListPermissionsData = schemas_exports.object({
  permissions: schemas_exports.record(schemas_exports.string(), schemas_exports.list(ResourcePermission)),
  type: PermissionResourceType
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListPermissionsResponse.mjs
var ListPermissionsResponse = schemas_exports.object({
  data: ListPermissionsData
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListSandboxEnvironmentsResponse.mjs
var ListSandboxEnvironmentsResponse = schemas_exports.object({
  data: schemas_exports.list(SandboxEnvironment),
  pagination: TokenPagination
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListScheduleRunsResponse.mjs
var ListScheduleRunsResponse = schemas_exports.object({
  data: schemas_exports.list(ScheduleRun),
  pagination: TokenPagination
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListSchedulesResponse.mjs
var ListSchedulesResponse = schemas_exports.object({
  data: schemas_exports.list(Schedule),
  pagination: TokenPagination
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpServerInitInfoTransportType.mjs
var McpServerInitInfoTransportType = schemas_exports.enum_(["streamable-http", "sse"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpServerInitInfo.mjs
var McpServerInitInfo = schemas_exports.object({
  approvalPolicies: schemas_exports.property("approval_policies", schemas_exports.record(schemas_exports.string(), ComponentsSchemasToolApprovalPolicyAllowSession).optional()),
  id: schemas_exports.string(),
  name: schemas_exports.string(),
  sessionId: schemas_exports.property("session_id", schemas_exports.string().optional()),
  transportType: schemas_exports.property("transport_type", McpServerInitInfoTransportType.optional())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/McpInitializeEvent.mjs
var McpInitializeEvent = schemas_exports.object({
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  mcpServers: schemas_exports.property("mcp_servers", schemas_exports.list(McpServerInitInfo)),
  threadId: schemas_exports.property("thread_id", schemas_exports.string()),
  type: schemas_exports.stringLiteral("mcp.initialize")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SandboxCreatedEvent.mjs
var SandboxCreatedEvent = schemas_exports.object({
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  sandboxId: schemas_exports.property("sandbox_id", schemas_exports.string()),
  threadId: schemas_exports.property("thread_id", schemas_exports.string().nullable()),
  type: schemas_exports.stringLiteral("sandbox.created")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ThreadCreatedEvent.mjs
var ThreadCreatedEvent = schemas_exports.object({
  agentInfo: schemas_exports.property("agent_info", AgentInfo),
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  parent: AgentParent,
  threadId: schemas_exports.property("thread_id", schemas_exports.string()),
  title: schemas_exports.string(),
  type: schemas_exports.stringLiteral("thread.created")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ThreadStateDone.mjs
var ThreadStateDone = schemas_exports.object({
  output: ModelMessageEvent,
  status: schemas_exports.stringLiteral("done")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ThreadStateError.mjs
var ThreadStateError = schemas_exports.object({
  error: schemas_exports.string(),
  output: ModelMessageEvent.optional(),
  status: schemas_exports.stringLiteral("error")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ThreadState.mjs
var ThreadState = schemas_exports.undiscriminatedUnion([ThreadStateDone, ThreadStateError]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ThreadDoneEvent.mjs
var ThreadDoneEvent = schemas_exports.object({
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  parent: AgentParent.optional(),
  state: ThreadState,
  threadId: schemas_exports.property("thread_id", schemas_exports.string()),
  title: schemas_exports.string(),
  type: schemas_exports.stringLiteral("thread.done")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ToolResponseEvent.mjs
var ToolResponseEvent = schemas_exports.object({
  content: schemas_exports.string(),
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  threadId: schemas_exports.property("thread_id", schemas_exports.string()),
  toolCallId: schemas_exports.property("tool_call_id", schemas_exports.string()),
  type: schemas_exports.stringLiteral("tool.response")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnCreatedEvent.mjs
var TurnCreatedEvent = schemas_exports.object({
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  input: schemas_exports.list(TurnInputItem).optional(),
  previousTurnId: schemas_exports.property("previous_turn_id", schemas_exports.string().nullable()),
  state: TurnStateRunning,
  threadId: schemas_exports.property("thread_id", schemas_exports.string().nullable()),
  turnId: schemas_exports.property("turn_id", schemas_exports.string()),
  type: schemas_exports.stringLiteral("turn.created")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnDoneEventState.mjs
var TurnDoneEventState = schemas_exports.undiscriminatedUnion([TurnStateCancelled, TurnStateDone, TurnStateError]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnDoneEvent.mjs
var TurnDoneEvent = schemas_exports.object({
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  state: TurnDoneEventState,
  threadId: schemas_exports.property("thread_id", schemas_exports.string().nullable()),
  type: schemas_exports.stringLiteral("turn.done")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnUpdateEventState.mjs
var TurnUpdateEventState = schemas_exports.undiscriminatedUnion([TurnStatePaused, TurnStateRunning]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnUpdateEvent.mjs
var TurnUpdateEvent = schemas_exports.object({
  createdAt: schemas_exports.property("created_at", schemas_exports.string()),
  id: schemas_exports.string(),
  state: TurnUpdateEventState,
  threadId: schemas_exports.property("thread_id", schemas_exports.string().nullable()),
  type: schemas_exports.stringLiteral("turn.update")
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionEvent.mjs
var SessionEvent = schemas_exports.undiscriminatedUnion([
  McpAuthRequiredEvent,
  McpInitializeEvent,
  ModelMessageEvent,
  SandboxCreatedEvent,
  ThreadCreatedEvent,
  ThreadDoneEvent,
  ToolApprovalRequiredEvent,
  ToolResponseEvent,
  ToolResponseRequiredEvent,
  TurnCreatedEvent,
  TurnDoneEvent,
  TurnUpdateEvent,
  UserMcpAuthContinueEvent,
  UserToolApprovalEvent,
  UserToolApprovalPolicyEvent,
  UserToolResponseEvent
]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionEventItem.mjs
var SessionEventItem = schemas_exports.object({
  event: SessionEvent,
  turnId: schemas_exports.property("turn_id", schemas_exports.string())
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListSessionEventsResponse.mjs
var ListSessionEventsResponse = schemas_exports.object({
  data: schemas_exports.list(SessionEventItem),
  pagination: TokenPagination
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListSessionsOrder.mjs
var ListSessionsOrder = schemas_exports.enum_(["asc", "desc"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListSessionsResponse.mjs
var ListSessionsResponse = schemas_exports.object({
  data: schemas_exports.list(Session),
  pagination: TokenPagination
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListSkillsResponse.mjs
var ListSkillsResponse = schemas_exports.object({
  data: schemas_exports.list(ConfiguredSkill)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SkillVersion.mjs
var SkillVersion = schemas_exports.object({
  description: schemas_exports.string(),
  displayName: schemas_exports.property("display_name", schemas_exports.string()),
  name: schemas_exports.string(),
  version: schemas_exports.number()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListSkillVersionsResponse.mjs
var ListSkillVersionsResponse = schemas_exports.object({
  data: schemas_exports.list(SkillVersion)
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListTurnEventsOrder.mjs
var ListTurnEventsOrder = schemas_exports.enum_(["asc", "desc"]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListTurnEventsResponse.mjs
var ListTurnEventsResponse = schemas_exports.object({
  data: schemas_exports.list(SessionEvent),
  pagination: TokenPagination
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ListTurnsResponse.mjs
var ListTurnsResponse = schemas_exports.object({
  data: schemas_exports.list(Turn),
  pagination: TokenPagination
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/ModelMessageDeltaEvent.mjs
var ModelMessageDeltaEvent = schemas_exports.object({
  content: schemas_exports.string().optionalNullable(),
  createdAt: schemas_exports.property("created_at", schemas_exports.string().optional()),
  finishReason: schemas_exports.property("finish_reason", FinishReason.optionalNullable()),
  id: schemas_exports.string(),
  reasoningContent: schemas_exports.property("reasoning_content", schemas_exports.string().optional()),
  refusal: schemas_exports.string().optionalNullable(),
  threadId: schemas_exports.property("thread_id", schemas_exports.string()),
  toolCalls: schemas_exports.property("tool_calls", schemas_exports.list(ExtendedChunkDeltaToolCall).optional()),
  type: schemas_exports.stringLiteral("model.message.delta"),
  usage: ModelMessageUsage.optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/RequestErrorResponseError.mjs
var RequestErrorResponseError = schemas_exports.object({
  code: schemas_exports.string().optionalNullable(),
  message: schemas_exports.string(),
  param: schemas_exports.string().optionalNullable(),
  type: schemas_exports.string().optional()
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/RequestErrorResponse.mjs
var RequestErrorResponse = schemas_exports.object({
  error: RequestErrorResponseError
});

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/SessionSourceType.mjs
var SessionSourceType = schemas_exports.stringLiteral("schedule");

// node_modules/@truefoundry/trueforge-sdk/dist/esm/serialization/types/TurnStreamingEvent.mjs
var TurnStreamingEvent = schemas_exports.undiscriminatedUnion([
  McpAuthRequiredEvent,
  McpInitializeEvent,
  ModelMessageEvent,
  ModelMessageDeltaEvent,
  SandboxCreatedEvent,
  ThreadCreatedEvent,
  ThreadDoneEvent,
  ToolApprovalRequiredEvent,
  ToolResponseEvent,
  ToolResponseRequiredEvent,
  TurnCreatedEvent,
  TurnDoneEvent,
  TurnUpdateEvent,
  UserMcpAuthContinueEvent,
  UserToolApprovalEvent,
  UserToolApprovalPolicyEvent,
  UserToolResponseEvent
]);

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/agents/client/Client.mjs
var __awaiter15 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var AgentsClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * List configured agents for the tenant, ordered by name. Optional `agent_name` filters by substring.
   *
   * @param {TrueForge.ListAgentsRequest} request
   * @param {AgentsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.agents.list()
   */
  list() {
    return __awaiter15(this, arguments, void 0, function* (request = {}, requestOptions) {
      const list2 = HttpResponsePromise.interceptFunction((request2) => __awaiter15(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const { limit = 50, pageToken, agentName } = request2;
        const _queryParams = {
          limit,
          page_token: pageToken,
          agent_name: agentName
        };
        const _authRequest = yield this._options.authProvider.getAuthRequest();
        const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
        const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
          url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/agents"),
          method: "GET",
          headers: _headers,
          queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
          timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
          maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
          abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
          fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
          logging: this._options.logging
        });
        if (_response.ok) {
          return {
            data: ListAgentsResponse.parseOrThrow(_response.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }),
            rawResponse: _response.rawResponse
          };
        }
        if (_response.error.reason === "status-code") {
          switch (_response.error.statusCode) {
            case 400:
              throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            case 401:
              throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            default:
              throw new TrueForgeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
                rawResponse: _response.rawResponse
              });
          }
        }
        return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/agents");
      }));
      const dataWithRawResponse = yield list2(request).withRawResponse();
      return new Page({
        response: dataWithRawResponse.data,
        rawResponse: dataWithRawResponse.rawResponse,
        hasNextPage: (response) => (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) != null && !(typeof (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === "string" && (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === ""),
        getItems: (response) => {
          var _a;
          return (_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : [];
        },
        loadPage: (response) => {
          return list2(setObjectProperty(request, "pageToken", response === null || response === void 0 ? void 0 : response.pagination.nextPageToken));
        }
      });
    });
  }
  /**
   * Creates an agent and allocates an immutable id. Fails if `name` is already taken. Name cannot be changed later.
   *
   * @param {TrueForge.CreateAgentRequest} request
   * @param {AgentsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.agents.create({
   *         description: "description",
   *         manifest: {
   *             model: {
   *                 name: "name"
   *             }
   *         },
   *         name: "name"
   *     })
   */
  create(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__create(request, requestOptions));
  }
  __create(request, requestOptions) {
    return __awaiter15(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/agents"),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(CreateAgentRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetAgentResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/v1/agents");
    });
  }
  /**
   * Fetch a configured agent by immutable id.
   *
   * @param {string} agent_id - Immutable agent identifier.
   * @param {AgentsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.agents.get("agent_id")
   */
  get(agent_id, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__get(agent_id, requestOptions));
  }
  __get(agent_id, requestOptions) {
    return __awaiter15(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/agents/${url_exports.encodePathParam(agent_id)}`),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetAgentResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/agents/{agent_id}");
    });
  }
  /**
   * Update an existing agent by immutable id.
   *
   * @param {string} agent_id - Immutable agent identifier.
   * @param {TrueForge.UpdateAgentRequest} request
   * @param {AgentsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.agents.update("agent_id", {
   *         manifest: {
   *             model: {
   *                 name: "name"
   *             }
   *         }
   *     })
   */
  update(agent_id, request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__update(agent_id, request, requestOptions));
  }
  __update(agent_id, request, requestOptions) {
    return __awaiter15(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/agents/${url_exports.encodePathParam(agent_id)}`),
        method: "PUT",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(UpdateAgentRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetAgentResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "PUT", "/api/v1/agents/{agent_id}");
    });
  }
  /**
   * Delete a configured agent by immutable id.
   *
   * @param {string} agent_id - Immutable agent identifier.
   * @param {AgentsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.agents.delete("agent_id")
   */
  delete(agent_id, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__delete(agent_id, requestOptions));
  }
  __delete(agent_id, requestOptions) {
    return __awaiter15(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/agents/${url_exports.encodePathParam(agent_id)}`),
        method: "DELETE",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: DeleteAgentResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "DELETE", "/api/v1/agents/{agent_id}");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/auth/client/Client.mjs
var __awaiter16 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var AuthClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * Returns the authenticated caller identity (`type`, `tenant_id`, `subject`, `roles`) wrapped as `{ data }`. `type` is `oidc-connected` when browser OIDC is enabled, otherwise `default`. When auth is enabled this requires a valid `id_token` cookie or `Authorization: Bearer` token (401 otherwise). When auth is disabled, returns the standalone default identity.
   *
   * @param {AuthClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.auth.me()
   */
  me(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__me(requestOptions));
  }
  __me(requestOptions) {
    return __awaiter16(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/auth/me"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetMeResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/auth/me");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/catalogs/resources/mcpServers/client/Client.mjs
var __awaiter17 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var McpServersClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * Shipped MCP server presets (discovery-only). Copy into PUT /settings/mcp-servers to configure.
   *
   * @param {McpServersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.catalogs.mcpServers.list()
   */
  list(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__list(requestOptions));
  }
  __list(requestOptions) {
    return __awaiter17(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/catalogs/mcp-servers"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetMcpServerCatalogResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/catalogs/mcp-servers");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/catalogs/resources/modelProviders/client/Client.mjs
var __awaiter18 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var ModelProvidersClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * Shipped model-provider presets (discovery-only). Copy into PUT /settings/model-providers to configure. Includes a `custom` sentinel with `supported_reasoning_efforts`.
   *
   * @param {ModelProvidersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.catalogs.modelProviders.list()
   */
  list(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__list(requestOptions));
  }
  __list(requestOptions) {
    return __awaiter18(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/catalogs/model-providers"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetModelProviderCatalogResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/catalogs/model-providers");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/catalogs/resources/sandboxProviders/client/Client.mjs
var __awaiter19 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SandboxProvidersClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * Shipped sandbox-provider presets (discovery-only). Copy into PUT /settings/sandbox-providers to configure.
   *
   * @param {SandboxProvidersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.catalogs.sandboxProviders.list()
   */
  list(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__list(requestOptions));
  }
  __list(requestOptions) {
    return __awaiter19(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/catalogs/sandbox-providers"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSandboxProviderCatalogResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/catalogs/sandbox-providers");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/catalogs/resources/skills/client/Client.mjs
var __awaiter20 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SkillsClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * Shipped skill presets (discovery-only). Copy into PUT /settings/skills to configure.
   *
   * @param {SkillsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.catalogs.skills.list()
   */
  list(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__list(requestOptions));
  }
  __list(requestOptions) {
    return __awaiter20(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/catalogs/skills"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSkillCatalogResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/catalogs/skills");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/catalogs/resources/webSearchProviders/client/Client.mjs
var __awaiter21 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var WebSearchProvidersClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * Shipped web-search provider presets.
   *
   * @param {WebSearchProvidersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.catalogs.webSearchProviders.list()
   */
  list(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__list(requestOptions));
  }
  __list(requestOptions) {
    return __awaiter21(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/catalogs/web-search-providers"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetWebSearchProviderCatalogResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/catalogs/web-search-providers");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/catalogs/client/Client.mjs
var CatalogsClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  get mcpServers() {
    var _a;
    return (_a = this._mcpServers) !== null && _a !== void 0 ? _a : this._mcpServers = new McpServersClient(this._options);
  }
  get modelProviders() {
    var _a;
    return (_a = this._modelProviders) !== null && _a !== void 0 ? _a : this._modelProviders = new ModelProvidersClient(this._options);
  }
  get sandboxProviders() {
    var _a;
    return (_a = this._sandboxProviders) !== null && _a !== void 0 ? _a : this._sandboxProviders = new SandboxProvidersClient(this._options);
  }
  get skills() {
    var _a;
    return (_a = this._skills) !== null && _a !== void 0 ? _a : this._skills = new SkillsClient(this._options);
  }
  get webSearchProviders() {
    var _a;
    return (_a = this._webSearchProviders) !== null && _a !== void 0 ? _a : this._webSearchProviders = new WebSearchProvidersClient(this._options);
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/internal/resources/agents/client/Client.mjs
var __awaiter22 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var AgentsClient2 = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * TrueForge SDK samples (TypeScript and Python, stream and non-stream) for a session and turn against this agent.
   *
   * @param {string} agent_id - Immutable agent identifier.
   * @param {TrueForge.internal.GetCodeSnippetsAgentsRequest} request
   * @param {AgentsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.internal.agents.getCodeSnippets("agent_id")
   */
  getCodeSnippets(agent_id, request = {}, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__getCodeSnippets(agent_id, request, requestOptions));
  }
  __getCodeSnippets(agent_id_1) {
    return __awaiter22(this, arguments, void 0, function* (agent_id, request = {}, requestOptions) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const { baseUrl } = request;
      const _queryParams = {
        base_url: baseUrl
      };
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/agents/${url_exports.encodePathParam(agent_id)}/code-snippets`),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetAgentCodeSnippetsResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/agents/{agent_id}/code-snippets");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/internal/resources/metrics/client/Client.mjs
var __awaiter23 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var MetricsClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * List available session metric charts.
   *
   * @param {MetricsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.internal.metrics.listCharts()
   */
  listCharts(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__listCharts(requestOptions));
  }
  __listCharts(requestOptions) {
    return __awaiter23(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/internal/metrics/charts"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSessionMetricsChartResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        throw new TrueForgeError({
          statusCode: _response.error.statusCode,
          body: _response.error.body,
          rawResponse: _response.rawResponse
        });
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/internal/metrics/charts");
    });
  }
  /**
   * Return one chart for the caller's sessions on a named agent over an inclusive creation-time window. Uses hourly buckets for windows up to 24 hours and daily UTC buckets otherwise.
   *
   * @param {TrueForge.internal.GetChartDataMetricsRequest} request
   * @param {MetricsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.internal.metrics.getChartData({
   *         agentId: "agent_id",
   *         startTimestamp: new Date("2024-01-15T09:30:00.000Z"),
   *         endTimestamp: new Date("2024-01-15T09:30:00.000Z"),
   *         chartName: "sessions_over_time"
   *     })
   */
  getChartData(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__getChartData(request, requestOptions));
  }
  __getChartData(request, requestOptions) {
    return __awaiter23(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const { agentId, startTimestamp, endTimestamp, chartName } = request;
      const _queryParams = {
        agent_id: agentId,
        start_timestamp: startTimestamp.toISOString(),
        end_timestamp: endTimestamp.toISOString(),
        chart_name: SessionMetricsChartName.jsonOrThrow(chartName, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        })
      };
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/internal/metrics/charts-data"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSessionMetricsChartDataResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/internal/metrics/charts-data");
    });
  }
  /**
   * Aggregate the caller's session meters for a named agent over an inclusive creation-time window.
   *
   * @param {TrueForge.internal.GetMetersMetricsRequest} request
   * @param {MetricsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.internal.metrics.getMeters({
   *         agentId: "agent_id",
   *         startTimestamp: new Date("2024-01-15T09:30:00.000Z"),
   *         endTimestamp: new Date("2024-01-15T09:30:00.000Z")
   *     })
   */
  getMeters(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__getMeters(request, requestOptions));
  }
  __getMeters(request, requestOptions) {
    return __awaiter23(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const { agentId, startTimestamp, endTimestamp } = request;
      const _queryParams = {
        agent_id: agentId,
        start_timestamp: startTimestamp.toISOString(),
        end_timestamp: endTimestamp.toISOString()
      };
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/internal/metrics/meters"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSessionMetricsMeterResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/internal/metrics/meters");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/internal/resources/sandboxEnvironments/client/Client.mjs
var __awaiter24 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SandboxEnvironmentsClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * Returns pending environment versions for the build controller.
   *
   * @param {SandboxEnvironmentsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.internal.sandboxEnvironments.listPending()
   */
  listPending(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__listPending(requestOptions));
  }
  __listPending(requestOptions) {
    return __awaiter24(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/internal/sandbox-environments/pending"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: ListPendingSandboxEnvironmentVersionsResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/internal/sandbox-environments/pending");
    });
  }
  /**
   * Registers or polls the snapshot build and updates version status.
   *
   * @param {TrueForge.internal.ProgressSandboxEnvironmentVersionRequest} request
   * @param {SandboxEnvironmentsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.internal.sandboxEnvironments.progress({
   *         environmentVersionId: "environment_version_id"
   *     })
   */
  progress(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__progress(request, requestOptions));
  }
  __progress(request, requestOptions) {
    return __awaiter24(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/internal/sandbox-environments/progress"),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(internal_exports.ProgressSandboxEnvironmentVersionRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return { data: void 0, rawResponse: _response.rawResponse };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/internal/sandbox-environments/progress");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/internal/resources/schedules/client/Client.mjs
var __awaiter25 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SchedulesClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * Execute a persisted schedule run using its saved schedule and agent.
   *
   * @param {TrueForge.internal.ExecuteScheduleRunRequest} request
   * @param {SchedulesClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.internal.schedules.executeRun({
   *         scheduleRunId: "schedule_run_id"
   *     })
   */
  executeRun(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__executeRun(request, requestOptions));
  }
  __executeRun(request, requestOptions) {
    return __awaiter25(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/internal/schedules/runs/execute"),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(internal_exports.ExecuteScheduleRunRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return { data: void 0, rawResponse: _response.rawResponse };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/internal/schedules/runs/execute");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/internal/resources/sessions/client/Client.mjs
var __awaiter26 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SessionsClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * Idempotent get-or-create: returns the existing session for this `external_id`, or creates one
   *
   * @param {TrueForge.internal.GetOrCreateSessionByExternalIdRequest} request
   * @param {SessionsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.internal.sessions.getOrCreateByExternalId({
   *         agent: {
   *             name: "name"
   *         },
   *         externalId: "external_id"
   *     })
   */
  getOrCreateByExternalId(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__getOrCreateByExternalId(request, requestOptions));
  }
  __getOrCreateByExternalId(request, requestOptions) {
    return __awaiter26(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/internal/sessions/get-or-create-by-external-id"),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(internal_exports.GetOrCreateSessionByExternalIdRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSessionResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/internal/sessions/get-or-create-by-external-id");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/internal/client/Client.mjs
var __awaiter27 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var InternalClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  get metrics() {
    var _a;
    return (_a = this._metrics) !== null && _a !== void 0 ? _a : this._metrics = new MetricsClient(this._options);
  }
  get sandboxEnvironments() {
    var _a;
    return (_a = this._sandboxEnvironments) !== null && _a !== void 0 ? _a : this._sandboxEnvironments = new SandboxEnvironmentsClient(this._options);
  }
  get schedules() {
    var _a;
    return (_a = this._schedules) !== null && _a !== void 0 ? _a : this._schedules = new SchedulesClient(this._options);
  }
  get sessions() {
    var _a;
    return (_a = this._sessions) !== null && _a !== void 0 ? _a : this._sessions = new SessionsClient(this._options);
  }
  get agents() {
    var _a;
    return (_a = this._agents) !== null && _a !== void 0 ? _a : this._agents = new AgentsClient2(this._options);
  }
  /**
   * Return granted actions for the requested resources.
   *
   * @param {TrueForge.ListPermissionsRequest} request
   * @param {InternalClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.internal.listPermissions({
   *         resourceIds: ["resource_ids"],
   *         resourceType: "agent"
   *     })
   */
  listPermissions(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__listPermissions(request, requestOptions));
  }
  __listPermissions(request, requestOptions) {
    return __awaiter27(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/internal/list-permissions"),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(ListPermissionsRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: ListPermissionsResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/internal/list-permissions");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/mcpServers/client/Client.mjs
var __awaiter28 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var McpServersClient2 = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * Configured MCP servers as a slim name/url list for the composer.
   *
   * @param {McpServersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.mcpServers.list()
   */
  list(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__list(requestOptions));
  }
  __list(requestOptions) {
    return __awaiter28(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/mcp-servers"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: ListAvailableMcpServersResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/mcp-servers");
    });
  }
  /**
   * A single MCP server as the slim chat projection, with live per-user auth_status.
   *
   * @param {string} name - MCP server name.
   * @param {McpServersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.mcpServers.get("name")
   */
  get(name, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__get(name, requestOptions));
  }
  __get(name, requestOptions) {
    return __awaiter28(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/mcp-servers/${url_exports.encodePathParam(name)}`),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetAvailableMcpServerResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/mcp-servers/{name}");
    });
  }
  /**
   * Returns current auth status. When OAuth is required, includes an authorization URL. Optional return_to is the post-consent landing path.
   *
   * @param {string} name - MCP server name.
   * @param {TrueForge.AuthorizeMcpServersRequest} request
   * @param {McpServersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link TrueForge.FailedDependencyError}
   * @throws {@link TrueForge.InternalServerError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.mcpServers.authorize("name")
   */
  authorize(name, request = {}, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__authorize(name, request, requestOptions));
  }
  __authorize(name_1) {
    return __awaiter28(this, arguments, void 0, function* (name, request = {}, requestOptions) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const { returnTo } = request;
      const _queryParams = {
        return_to: returnTo
      };
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/mcp-servers/${url_exports.encodePathParam(name)}/authorize`),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: McpAuthStatus.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 424:
            throw new FailedDependencyError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 500:
            throw new InternalServerError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/mcp-servers/{name}/authorize");
    });
  }
  /**
   * Disconnects OAuth for the MCP server when applicable and returns the updated server with auth_status. No-op when the server does not use stored OAuth tokens.
   *
   * @param {string} name - MCP server name.
   * @param {McpServersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.mcpServers.deleteAuthorization("name")
   */
  deleteAuthorization(name, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__deleteAuthorization(name, requestOptions));
  }
  __deleteAuthorization(name, requestOptions) {
    return __awaiter28(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/mcp-servers/${url_exports.encodePathParam(name)}/authorize`),
        method: "DELETE",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetMcpServerResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "DELETE", "/api/v1/mcp-servers/{name}/authorize");
    });
  }
  /**
   * All tools exposed by the given MCP server (non-paginated), as returned by the MCP `tools/list` call.
   *
   * @param {string} name - MCP server name.
   * @param {McpServersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link TrueForge.BadGatewayError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.mcpServers.listTools("name")
   */
  listTools(name, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__listTools(name, requestOptions));
  }
  __listTools(name, requestOptions) {
    return __awaiter28(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/mcp-servers/${url_exports.encodePathParam(name)}/tools`),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: ListMcpServerToolsResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 502:
            throw new BadGatewayError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/mcp-servers/{name}/tools");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/models/client/Client.mjs
var __awaiter29 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var ModelsClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * Configured models as a slim FQN list for the composer.
   *
   * @param {ModelsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.models.list()
   */
  list(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__list(requestOptions));
  }
  __list(requestOptions) {
    return __awaiter29(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/models"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: ListAvailableModelsResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/models");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/sandboxEnvironments/client/Client.mjs
var __awaiter30 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SandboxEnvironmentsClient2 = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * List available sandbox environments
   *
   * @param {TrueForge.ListSandboxEnvironmentsRequest} request
   * @param {SandboxEnvironmentsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sandboxEnvironments.list()
   */
  list() {
    return __awaiter30(this, arguments, void 0, function* (request = {}, requestOptions) {
      const list2 = HttpResponsePromise.interceptFunction((request2) => __awaiter30(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const { limit = 25, pageToken } = request2;
        const _queryParams = {
          limit,
          page_token: pageToken
        };
        const _authRequest = yield this._options.authProvider.getAuthRequest();
        const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
        const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
          url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/sandbox-environments"),
          method: "GET",
          headers: _headers,
          queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
          timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
          maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
          abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
          fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
          logging: this._options.logging
        });
        if (_response.ok) {
          return {
            data: ListSandboxEnvironmentsResponse.parseOrThrow(_response.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }),
            rawResponse: _response.rawResponse
          };
        }
        if (_response.error.reason === "status-code") {
          switch (_response.error.statusCode) {
            case 400:
              throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            case 401:
              throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            default:
              throw new TrueForgeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
                rawResponse: _response.rawResponse
              });
          }
        }
        return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/sandbox-environments");
      }));
      const dataWithRawResponse = yield list2(request).withRawResponse();
      return new Page({
        response: dataWithRawResponse.data,
        rawResponse: dataWithRawResponse.rawResponse,
        hasNextPage: (response) => (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) != null && !(typeof (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === "string" && (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === ""),
        getItems: (response) => {
          var _a;
          return (_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : [];
        },
        loadPage: (response) => {
          return list2(setObjectProperty(request, "pageToken", response === null || response === void 0 ? void 0 : response.pagination.nextPageToken));
        }
      });
    });
  }
  /**
   * Creates by `manifest.name`. Fails if the name is already taken. Requires a configured sandbox provider.
   *
   * @param {TrueForge.CreateSandboxEnvironmentRequest} request
   * @param {SandboxEnvironmentsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link TrueForge.BadGatewayError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sandboxEnvironments.create({
   *         manifest: {
   *             name: "name"
   *         }
   *     })
   */
  create(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__create(request, requestOptions));
  }
  __create(request, requestOptions) {
    return __awaiter30(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/sandbox-environments"),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(CreateSandboxEnvironmentRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSandboxEnvironmentResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 502:
            throw new BadGatewayError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/v1/sandbox-environments");
    });
  }
  /**
   * Create a new sandbox environment or update an existing one.
   *
   * @param {TrueForge.UpdateSandboxEnvironmentRequest} request
   * @param {SandboxEnvironmentsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link TrueForge.BadGatewayError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sandboxEnvironments.createOrUpdate({
   *         manifest: {
   *             name: "name"
   *         }
   *     })
   */
  createOrUpdate(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__createOrUpdate(request, requestOptions));
  }
  __createOrUpdate(request, requestOptions) {
    return __awaiter30(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/sandbox-environments"),
        method: "PUT",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(UpdateSandboxEnvironmentRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSandboxEnvironmentResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 502:
            throw new BadGatewayError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "PUT", "/api/v1/sandbox-environments");
    });
  }
  /**
   * @param {string} name - Sandbox environment name.
   * @param {SandboxEnvironmentsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sandboxEnvironments.get("name")
   */
  get(name, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__get(name, requestOptions));
  }
  __get(name, requestOptions) {
    return __awaiter30(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sandbox-environments/${url_exports.encodePathParam(name)}`),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSandboxEnvironmentResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/sandbox-environments/{name}");
    });
  }
  /**
   * Delete a sandbox environment, fails if any agent still references it.
   *
   * @param {string} name - Sandbox environment name.
   * @param {SandboxEnvironmentsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link TrueForge.BadGatewayError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sandboxEnvironments.delete("name")
   */
  delete(name, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__delete(name, requestOptions));
  }
  __delete(name, requestOptions) {
    return __awaiter30(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sandbox-environments/${url_exports.encodePathParam(name)}`),
        method: "DELETE",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: DeleteSandboxEnvironmentResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 502:
            throw new BadGatewayError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "DELETE", "/api/v1/sandbox-environments/{name}");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/schedules/client/Client.mjs
var __awaiter31 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SchedulesClient2 = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * List schedules for the tenant, newest first.
   *
   * @param {TrueForge.ListSchedulesRequest} request
   * @param {SchedulesClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.schedules.list()
   */
  list() {
    return __awaiter31(this, arguments, void 0, function* (request = {}, requestOptions) {
      const list2 = HttpResponsePromise.interceptFunction((request2) => __awaiter31(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const { limit = 25, pageToken, agentNames, createdByMe } = request2;
        const _queryParams = {
          limit,
          page_token: pageToken,
          agent_names: agentNames,
          created_by_me: createdByMe
        };
        const _authRequest = yield this._options.authProvider.getAuthRequest();
        const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
        const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
          url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/schedules"),
          method: "GET",
          headers: _headers,
          queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
          timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
          maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
          abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
          fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
          logging: this._options.logging
        });
        if (_response.ok) {
          return {
            data: ListSchedulesResponse.parseOrThrow(_response.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }),
            rawResponse: _response.rawResponse
          };
        }
        if (_response.error.reason === "status-code") {
          switch (_response.error.statusCode) {
            case 400:
              throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            case 401:
              throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            default:
              throw new TrueForgeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
                rawResponse: _response.rawResponse
              });
          }
        }
        return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/schedules");
      }));
      const dataWithRawResponse = yield list2(request).withRawResponse();
      return new Page({
        response: dataWithRawResponse.data,
        rawResponse: dataWithRawResponse.rawResponse,
        hasNextPage: (response) => (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) != null && !(typeof (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === "string" && (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === ""),
        getItems: (response) => {
          var _a;
          return (_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : [];
        },
        loadPage: (response) => {
          return list2(setObjectProperty(request, "pageToken", response === null || response === void 0 ? void 0 : response.pagination.nextPageToken));
        }
      });
    });
  }
  /**
   * Create a schedule for an existing agent (by name) and add its first pending run when active.
   *
   * @param {TrueForge.CreateScheduleRequest} request
   * @param {SchedulesClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.schedules.create({
   *         agentName: "agent_name",
   *         manifest: {
   *             cron: "cron",
   *             task: "task"
   *         },
   *         name: "name"
   *     })
   */
  create(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__create(request, requestOptions));
  }
  __create(request, requestOptions) {
    return __awaiter31(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/schedules"),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(CreateScheduleRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetScheduleResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/v1/schedules");
    });
  }
  /**
   * Start a schedule run immediately using the schedule task. Does not replace or advance the cron pending run.
   *
   * @param {TrueForge.CreateScheduleRunRequest} request
   * @param {SchedulesClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.schedules.createRun({
   *         scheduleId: "schedule_id"
   *     })
   */
  createRun(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__createRun(request, requestOptions));
  }
  __createRun(request, requestOptions) {
    return __awaiter31(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/schedules/runs"),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(CreateScheduleRunRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: CreateScheduleRunResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/v1/schedules/runs");
    });
  }
  /**
   * Get a schedule by id.
   *
   * @param {string} schedule_id - Immutable schedule identifier.
   * @param {SchedulesClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.schedules.get("schedule_id")
   */
  get(schedule_id, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__get(schedule_id, requestOptions));
  }
  __get(schedule_id, requestOptions) {
    return __awaiter31(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/schedules/${url_exports.encodePathParam(schedule_id)}`),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetScheduleResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/schedules/{schedule_id}");
    });
  }
  /**
   * Replace name and manifest; replaces or drops the pending run when status/cron/timezone change.
   *
   * @param {string} schedule_id - Immutable schedule identifier.
   * @param {TrueForge.UpdateScheduleRequest} request
   * @param {SchedulesClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.schedules.update("schedule_id", {
   *         manifest: {
   *             cron: "cron",
   *             task: "task"
   *         },
   *         name: "name"
   *     })
   */
  update(schedule_id, request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__update(schedule_id, request, requestOptions));
  }
  __update(schedule_id, request, requestOptions) {
    return __awaiter31(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/schedules/${url_exports.encodePathParam(schedule_id)}`),
        method: "PUT",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(UpdateScheduleRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetScheduleResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "PUT", "/api/v1/schedules/{schedule_id}");
    });
  }
  /**
   * Delete a schedule and its runs. Idempotent.
   *
   * @param {string} schedule_id - Immutable schedule identifier.
   * @param {SchedulesClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.schedules.delete("schedule_id")
   */
  delete(schedule_id, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__delete(schedule_id, requestOptions));
  }
  __delete(schedule_id, requestOptions) {
    return __awaiter31(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/schedules/${url_exports.encodePathParam(schedule_id)}`),
        method: "DELETE",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: DeleteScheduleResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "DELETE", "/api/v1/schedules/{schedule_id}");
    });
  }
  /**
   * List runs of a schedule, newest `scheduled_for` first. Available to its creator or a manager of its agent.
   *
   * @param {string} schedule_id - Immutable schedule identifier.
   * @param {TrueForge.ListRunsSchedulesRequest} request
   * @param {SchedulesClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.schedules.listRuns("schedule_id")
   */
  listRuns(schedule_id_1) {
    return __awaiter31(this, arguments, void 0, function* (schedule_id, request = {}, requestOptions) {
      const list2 = HttpResponsePromise.interceptFunction((request2) => __awaiter31(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const { limit = 25, pageToken } = request2;
        const _queryParams = {
          limit,
          page_token: pageToken
        };
        const _authRequest = yield this._options.authProvider.getAuthRequest();
        const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
        const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
          url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/schedules/${url_exports.encodePathParam(schedule_id)}/runs`),
          method: "GET",
          headers: _headers,
          queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
          timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
          maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
          abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
          fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
          logging: this._options.logging
        });
        if (_response.ok) {
          return {
            data: ListScheduleRunsResponse.parseOrThrow(_response.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }),
            rawResponse: _response.rawResponse
          };
        }
        if (_response.error.reason === "status-code") {
          switch (_response.error.statusCode) {
            case 400:
              throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            case 403:
              throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            case 404:
              throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            default:
              throw new TrueForgeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
                rawResponse: _response.rawResponse
              });
          }
        }
        return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/schedules/{schedule_id}/runs");
      }));
      const dataWithRawResponse = yield list2(request).withRawResponse();
      return new Page({
        response: dataWithRawResponse.data,
        rawResponse: dataWithRawResponse.rawResponse,
        hasNextPage: (response) => (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) != null && !(typeof (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === "string" && (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === ""),
        getItems: (response) => {
          var _a;
          return (_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : [];
        },
        loadPage: (response) => {
          return list2(setObjectProperty(request, "pageToken", response === null || response === void 0 ? void 0 : response.pagination.nextPageToken));
        }
      });
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/server/client/Client.mjs
var __awaiter32 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var ServerClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * Report optional runtime capabilities available for this tenant.
   *
   * @param {ServerClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.server.getCapabilities()
   */
  getCapabilities(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__getCapabilities(requestOptions));
  }
  __getCapabilities(requestOptions) {
    return __awaiter32(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/capabilities"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetCapabilitiesResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/capabilities");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/sessions/client/Client.mjs
var __awaiter33 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SessionsClient2 = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * List the sessions (newest first by default).
   *
   * @param {TrueForge.ListSessionsRequest} request
   * @param {SessionsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sessions.list()
   */
  list() {
    return __awaiter33(this, arguments, void 0, function* (request = {}, requestOptions) {
      const list2 = HttpResponsePromise.interceptFunction((request2) => __awaiter33(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const { limit = 25, order, pageToken, startTimestamp, endTimestamp, agentId, createdByMe, metadata, sourceType, sourceId } = request2;
        const _queryParams = {
          limit,
          order: order != null ? ListSessionsOrder.jsonOrThrow(order, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            omitUndefined: true
          }) : void 0,
          page_token: pageToken,
          start_timestamp: startTimestamp != null ? startTimestamp === null || startTimestamp === void 0 ? void 0 : startTimestamp.toISOString() : void 0,
          end_timestamp: endTimestamp != null ? endTimestamp === null || endTimestamp === void 0 ? void 0 : endTimestamp.toISOString() : void 0,
          agent_id: agentId,
          created_by_me: createdByMe,
          metadata,
          source_type: sourceType != null ? SessionSourceType.jsonOrThrow(sourceType, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            omitUndefined: true
          }) : void 0,
          source_id: sourceId
        };
        const _authRequest = yield this._options.authProvider.getAuthRequest();
        const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
        const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
          url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/sessions"),
          method: "GET",
          headers: _headers,
          queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
          timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
          maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
          abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
          fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
          logging: this._options.logging
        });
        if (_response.ok) {
          return {
            data: ListSessionsResponse.parseOrThrow(_response.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }),
            rawResponse: _response.rawResponse
          };
        }
        if (_response.error.reason === "status-code") {
          switch (_response.error.statusCode) {
            case 400:
              throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            default:
              throw new TrueForgeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
                rawResponse: _response.rawResponse
              });
          }
        }
        return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/sessions");
      }));
      const dataWithRawResponse = yield list2(request).withRawResponse();
      return new Page({
        response: dataWithRawResponse.data,
        rawResponse: dataWithRawResponse.rawResponse,
        hasNextPage: (response) => (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) != null && !(typeof (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === "string" && (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === ""),
        getItems: (response) => {
          var _a;
          return (_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : [];
        },
        loadPage: (response) => {
          return list2(setObjectProperty(request, "pageToken", response === null || response === void 0 ? void 0 : response.pagination.nextPageToken));
        }
      });
    });
  }
  /**
   * Create a session with `agent` as either `{ name }` (named registry binding) or `{ spec: AgentSpec }` (inline). Named sessions snapshot the agent name at create and resolve the live agent on each turn. Responses use `{ type: "reference", name, id }` or `{ type: "inline", spec }`.
   *
   * @param {TrueForge.CreateSessionRequest} request
   * @param {SessionsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sessions.create({
   *         agent: {
   *             name: "name"
   *         }
   *     })
   */
  create(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__create(request, requestOptions));
  }
  __create(request, requestOptions) {
    return __awaiter33(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/sessions"),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(CreateSessionRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSessionResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/v1/sessions");
    });
  }
  /**
   * Fetch a session by ID. Allowed for the creator, a manager of the bound named agent, or any tenant member when the session is shared.
   *
   * @param {string} session_id - Session identifier.
   * @param {SessionsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sessions.get("session_id")
   */
  get(session_id, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__get(session_id, requestOptions));
  }
  __get(session_id, requestOptions) {
    return __awaiter33(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sessions/${url_exports.encodePathParam(session_id)}`),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSessionResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/sessions/{session_id}");
    });
  }
  /**
   * Delete a session and all related turns, events, and internal state. Only the session creator may delete it. Idempotent if already gone.
   *
   * @param {string} session_id - Session identifier.
   * @param {SessionsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sessions.delete("session_id")
   */
  delete(session_id, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__delete(session_id, requestOptions));
  }
  __delete(session_id, requestOptions) {
    return __awaiter33(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sessions/${url_exports.encodePathParam(session_id)}`),
        method: "DELETE",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return { data: void 0, rawResponse: _response.rawResponse };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "DELETE", "/api/v1/sessions/{session_id}");
    });
  }
  /**
   * Update a session: optional `title`, `metadata`, `shared`, and (inline sessions only) `agent` as `{ spec: AgentSpec }`. Named sessions reject agent updates. An empty body is a valid no-op that refreshes `updated_at`. Only the session creator may update it.
   *
   * @param {string} session_id - Session identifier.
   * @param {TrueForge.UpdateSessionRequest} request
   * @param {SessionsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sessions.update("session_id")
   */
  update(session_id, request = {}, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__update(session_id, request, requestOptions));
  }
  __update(session_id_1) {
    return __awaiter33(this, arguments, void 0, function* (session_id, request = {}, requestOptions) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sessions/${url_exports.encodePathParam(session_id)}`),
        method: "PATCH",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(UpdateSessionRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSessionResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "PATCH", "/api/v1/sessions/{session_id}");
    });
  }
  /**
   * Cancel the running last turn for a session. Only the session creator may cancel.
   *
   * @param {string} session_id - Session identifier.
   * @param {TrueForge.CancelSessionRequest} request
   * @param {SessionsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.PreconditionFailedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sessions.cancel("session_id")
   */
  cancel(session_id, request = {}, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__cancel(session_id, request, requestOptions));
  }
  __cancel(session_id_1) {
    return __awaiter33(this, arguments, void 0, function* (session_id, request = {}, requestOptions) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sessions/${url_exports.encodePathParam(session_id)}/cancel`),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(CancelSessionRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: CancelSessionResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 412:
            throw new PreconditionFailedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/v1/sessions/{session_id}/cancel");
    });
  }
  /**
   * List session events as `{ turn_id, event }` across the active turn branch (newest first), including persisted events from a running tip. Each turn contributes turn.created, content events (model.message, tool.call, …), and turn.done when terminal; streaming deltas are not included. Use `page_token` to paginate backward toward older events while retaining the original branch anchor. Allowed for the creator, a manager of the bound named agent, or any tenant member when the session is shared.
   *
   * @param {string} session_id - Session identifier.
   * @param {TrueForge.ListEventsSessionsRequest} request
   * @param {SessionsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sessions.listEvents("session_id")
   */
  listEvents(session_id_1) {
    return __awaiter33(this, arguments, void 0, function* (session_id, request = {}, requestOptions) {
      const list2 = HttpResponsePromise.interceptFunction((request2) => __awaiter33(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const { pageToken, lastTurnId, limit = 100 } = request2;
        const _queryParams = {
          page_token: pageToken,
          last_turn_id: lastTurnId,
          limit
        };
        const _authRequest = yield this._options.authProvider.getAuthRequest();
        const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
        const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
          url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sessions/${url_exports.encodePathParam(session_id)}/events`),
          method: "GET",
          headers: _headers,
          queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
          timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
          maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
          abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
          fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
          logging: this._options.logging
        });
        if (_response.ok) {
          return {
            data: ListSessionEventsResponse.parseOrThrow(_response.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }),
            rawResponse: _response.rawResponse
          };
        }
        if (_response.error.reason === "status-code") {
          switch (_response.error.statusCode) {
            case 400:
              throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            case 403:
              throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            case 404:
              throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            default:
              throw new TrueForgeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
                rawResponse: _response.rawResponse
              });
          }
        }
        return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/sessions/{session_id}/events");
      }));
      const dataWithRawResponse = yield list2(request).withRawResponse();
      return new Page({
        response: dataWithRawResponse.data,
        rawResponse: dataWithRawResponse.rawResponse,
        hasNextPage: (response) => (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) != null && !(typeof (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === "string" && (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === ""),
        getItems: (response) => {
          var _a;
          return (_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : [];
        },
        loadPage: (response) => {
          return list2(setObjectProperty(request, "pageToken", response === null || response === void 0 ? void 0 : response.pagination.nextPageToken));
        }
      });
    });
  }
  /**
   * List turns for a session (newest first by default), token-paginated. Allowed for the creator, a manager of the bound named agent, or any tenant member when the session is shared.
   *
   * @param {string} session_id - Session identifier.
   * @param {TrueForge.ListTurnsSessionsRequest} request
   * @param {SessionsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sessions.listTurns("session_id")
   */
  listTurns(session_id_1) {
    return __awaiter33(this, arguments, void 0, function* (session_id, request = {}, requestOptions) {
      const list2 = HttpResponsePromise.interceptFunction((request2) => __awaiter33(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const { limit = 25, pageToken } = request2;
        const _queryParams = {
          limit,
          page_token: pageToken
        };
        const _authRequest = yield this._options.authProvider.getAuthRequest();
        const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
        const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
          url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sessions/${url_exports.encodePathParam(session_id)}/turns`),
          method: "GET",
          headers: _headers,
          queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
          timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
          maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
          abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
          fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
          logging: this._options.logging
        });
        if (_response.ok) {
          return {
            data: ListTurnsResponse.parseOrThrow(_response.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }),
            rawResponse: _response.rawResponse
          };
        }
        if (_response.error.reason === "status-code") {
          switch (_response.error.statusCode) {
            case 400:
              throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            case 403:
              throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            case 404:
              throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            default:
              throw new TrueForgeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
                rawResponse: _response.rawResponse
              });
          }
        }
        return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/sessions/{session_id}/turns");
      }));
      const dataWithRawResponse = yield list2(request).withRawResponse();
      return new Page({
        response: dataWithRawResponse.data,
        rawResponse: dataWithRawResponse.rawResponse,
        hasNextPage: (response) => (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) != null && !(typeof (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === "string" && (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === ""),
        getItems: (response) => {
          var _a;
          return (_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : [];
        },
        loadPage: (response) => {
          return list2(setObjectProperty(request, "pageToken", response === null || response === void 0 ? void 0 : response.pagination.nextPageToken));
        }
      });
    });
  }
  /**
   * Create a turn within a session and execute it.
   * Only the session creator may create turns.
   * When `stream` is true (default), respond with a Server-Sent Events stream of turn events.
   * When `stream` is false, return the turn immediately with `state.status: "running"` while execution continues in the background; use get turn or subscribe to observe completion.
   * Use `previous_turn_id` to chain to the session's last turn (defaults to `auto`); use `none` for a new root.
   */
  createTurnStream(session_id, request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__createTurnStream(session_id, request, requestOptions));
  }
  __createTurnStream(session_id, request, requestOptions) {
    return __awaiter33(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sessions/${url_exports.encodePathParam(session_id)}/turns`),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(Object.assign(Object.assign({}, CreateTurnSessionsStreamRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        })), { stream: true }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        responseType: "sse",
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: new Stream({
            stream: _response.body,
            parse: (data) => __awaiter33(this, void 0, void 0, function* () {
              return TurnStreamingEvent.parseOrThrow(data, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              });
            }),
            signal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
            eventShape: {
              type: "sse"
            }
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 412:
            throw new PreconditionFailedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 413:
            throw new ContentTooLargeError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/v1/sessions/{session_id}/turns");
    });
  }
  /**
   * Create a turn within a session and execute it.
   * Only the session creator may create turns.
   * When `stream` is true (default), respond with a Server-Sent Events stream of turn events.
   * When `stream` is false, return the turn immediately with `state.status: "running"` while execution continues in the background; use get turn or subscribe to observe completion.
   * Use `previous_turn_id` to chain to the session's last turn (defaults to `auto`); use `none` for a new root.
   *
   * @param {string} session_id - Session identifier.
   * @param {TrueForge.CreateTurnSessionsRequest} request
   * @param {SessionsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.PreconditionFailedError}
   * @throws {@link TrueForge.ContentTooLargeError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sessions.createTurn("session_id", {})
   */
  createTurn(session_id, request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__createTurn(session_id, request, requestOptions));
  }
  __createTurn(session_id, request, requestOptions) {
    return __awaiter33(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sessions/${url_exports.encodePathParam(session_id)}/turns`),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(Object.assign(Object.assign({}, CreateTurnSessionsRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        })), { stream: false }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetTurnResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 412:
            throw new PreconditionFailedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 413:
            throw new ContentTooLargeError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/v1/sessions/{session_id}/turns");
    });
  }
  /**
   * Fetch a single turn by ID. Allowed for the creator, a manager of the bound named agent, or any tenant member when the session is shared.
   *
   * @param {string} session_id - Session identifier.
   * @param {string} turn_id - Turn identifier.
   * @param {SessionsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sessions.getTurn("session_id", "turn_id")
   */
  getTurn(session_id, turn_id, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__getTurn(session_id, turn_id, requestOptions));
  }
  __getTurn(session_id, turn_id, requestOptions) {
    return __awaiter33(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sessions/${url_exports.encodePathParam(session_id)}/turns/${url_exports.encodePathParam(turn_id)}`),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetTurnResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/sessions/{session_id}/turns/{turn_id}");
    });
  }
  /**
   * Download a file from the sandbox this turn ran in. Paths come from the assistant's `sandbox_artifacts` block. Only the session creator may download.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.GoneError}
   * @throws {@link TrueForge.PreconditionFailedError}
   * @throws {@link TrueForge.ContentTooLargeError}
   * @throws {@link TrueForge.FailedDependencyError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   */
  downloadSandboxFile(session_id, turn_id, request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__downloadSandboxFile(session_id, turn_id, request, requestOptions));
  }
  __downloadSandboxFile(session_id, turn_id, request, requestOptions) {
    return __awaiter33(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const { path } = request;
      const _queryParams = {
        path
      };
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sessions/${url_exports.encodePathParam(session_id)}/turns/${url_exports.encodePathParam(turn_id)}/download-sandbox-file`),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        responseType: "binary-response",
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return { data: _response.body, rawResponse: _response.rawResponse };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 410:
            throw new GoneError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 412:
            throw new PreconditionFailedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 413:
            throw new ContentTooLargeError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 424:
            throw new FailedDependencyError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/sessions/{session_id}/turns/{turn_id}/download-sandbox-file");
    });
  }
  /**
   * Paginated persisted events for a turn (insertion order by default). Allowed for the creator, a manager of the bound named agent, or any tenant member when the session is shared.
   *
   * @param {string} session_id - Session identifier.
   * @param {string} turn_id - Turn identifier.
   * @param {TrueForge.ListTurnEventsSessionsRequest} request
   * @param {SessionsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sessions.listTurnEvents("session_id", "turn_id")
   */
  listTurnEvents(session_id_1, turn_id_1) {
    return __awaiter33(this, arguments, void 0, function* (session_id, turn_id, request = {}, requestOptions) {
      const list2 = HttpResponsePromise.interceptFunction((request2) => __awaiter33(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const { limit = 100, pageToken, order } = request2;
        const _queryParams = {
          limit,
          page_token: pageToken,
          order: order != null ? ListTurnEventsOrder.jsonOrThrow(order, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            omitUndefined: true
          }) : void 0
        };
        const _authRequest = yield this._options.authProvider.getAuthRequest();
        const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
        const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
          url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sessions/${url_exports.encodePathParam(session_id)}/turns/${url_exports.encodePathParam(turn_id)}/events`),
          method: "GET",
          headers: _headers,
          queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
          timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
          maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
          abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
          fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
          logging: this._options.logging
        });
        if (_response.ok) {
          return {
            data: ListTurnEventsResponse.parseOrThrow(_response.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }),
            rawResponse: _response.rawResponse
          };
        }
        if (_response.error.reason === "status-code") {
          switch (_response.error.statusCode) {
            case 400:
              throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            case 403:
              throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            case 404:
              throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              }), _response.rawResponse);
            default:
              throw new TrueForgeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
                rawResponse: _response.rawResponse
              });
          }
        }
        return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/sessions/{session_id}/turns/{turn_id}/events");
      }));
      const dataWithRawResponse = yield list2(request).withRawResponse();
      return new Page({
        response: dataWithRawResponse.data,
        rawResponse: dataWithRawResponse.rawResponse,
        hasNextPage: (response) => (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) != null && !(typeof (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === "string" && (response === null || response === void 0 ? void 0 : response.pagination.nextPageToken) === ""),
        getItems: (response) => {
          var _a;
          return (_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : [];
        },
        loadPage: (response) => {
          return list2(setObjectProperty(request, "pageToken", response === null || response === void 0 ? void 0 : response.pagination.nextPageToken));
        }
      });
    });
  }
  /**
   * Create events for a turn. Only the session creator may create them.
   *
   * @param {string} session_id - Session identifier.
   * @param {string} turn_id - Turn identifier.
   * @param {TrueForge.CreateTurnEventRequest} request
   * @param {SessionsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.sessions.createTurnEvent("session_id", "turn_id", {
   *         events: [{
   *                 type: "user.mcp_auth_continue"
   *             }]
   *     })
   */
  createTurnEvent(session_id, turn_id, request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__createTurnEvent(session_id, turn_id, request, requestOptions));
  }
  __createTurnEvent(session_id, turn_id, request, requestOptions) {
    return __awaiter33(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sessions/${url_exports.encodePathParam(session_id)}/turns/${url_exports.encodePathParam(turn_id)}/events`),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(CreateTurnEventRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: CreateTurnEventResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/v1/sessions/{session_id}/turns/{turn_id}/events");
    });
  }
  /**
   * Subscribe to the live SSE stream for a turn. Only the session creator may subscribe. Pass `after_sequence_number` to resume after a disconnect (exclusive — events after this sequence number are replayed).
   */
  subscribeToTurn(session_id, turn_id, request = {}, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__subscribeToTurn(session_id, turn_id, request, requestOptions));
  }
  __subscribeToTurn(session_id_1, turn_id_1) {
    return __awaiter33(this, arguments, void 0, function* (session_id, turn_id, request = {}, requestOptions) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
      const { afterSequenceNumber } = request;
      const _queryParams = {
        after_sequence_number: afterSequenceNumber
      };
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/sessions/${url_exports.encodePathParam(session_id)}/turns/${url_exports.encodePathParam(turn_id)}/subscribe`),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        responseType: "sse",
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      const _reconnect = (lastEventId) => __awaiter33(this, void 0, void 0, function* () {
        var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
        const _reconnectResponse = yield ((_a2 = this._options.fetcher) !== null && _a2 !== void 0 ? _a2 : fetcher)({
          url: url_exports.join((_b2 = yield Supplier.get(this._options.baseUrl)) !== null && _b2 !== void 0 ? _b2 : yield Supplier.get(this._options.environment), `api/v1/sessions/${url_exports.encodePathParam(session_id)}/turns/${url_exports.encodePathParam(turn_id)}/subscribe`),
          method: "GET",
          headers: Object.assign(Object.assign({}, _headers), { "Last-Event-ID": lastEventId }),
          queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
          responseType: "sse",
          timeoutMs: ((_e2 = (_c2 = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _c2 !== void 0 ? _c2 : (_d2 = this._options) === null || _d2 === void 0 ? void 0 : _d2.timeoutInSeconds) !== null && _e2 !== void 0 ? _e2 : 60) * 1e3,
          maxRetries: (_f2 = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _f2 !== void 0 ? _f2 : (_g2 = this._options) === null || _g2 === void 0 ? void 0 : _g2.maxRetries,
          abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
          fetchFn: (_h2 = this._options) === null || _h2 === void 0 ? void 0 : _h2.fetch,
          logging: this._options.logging
        });
        if (!_reconnectResponse.ok) {
          throw new Error("SSE stream reconnection failed");
        }
        if (_reconnectResponse.body == null) {
          throw new Error("SSE stream reconnection failed: empty response body");
        }
        return _reconnectResponse.body;
      });
      if (_response.ok) {
        return {
          data: new Stream({
            stream: _response.body,
            parse: (data) => __awaiter33(this, void 0, void 0, function* () {
              return TurnStreamingEvent.parseOrThrow(data, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"]
              });
            }),
            signal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
            eventShape: {
              type: "sse",
              resumable: true
            },
            reconnectionEnabled: (_l = (_k = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.stream) === null || _k === void 0 ? void 0 : _k.reconnectionEnabled) !== null && _l !== void 0 ? _l : (_o = (_m = this._options) === null || _m === void 0 ? void 0 : _m.stream) === null || _o === void 0 ? void 0 : _o.reconnectionEnabled,
            maxReconnectionAttempts: (_q = (_p = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.stream) === null || _p === void 0 ? void 0 : _p.maxReconnectionAttempts) !== null && _q !== void 0 ? _q : (_s = (_r = this._options) === null || _r === void 0 ? void 0 : _r.stream) === null || _s === void 0 ? void 0 : _s.maxReconnectionAttempts,
            reconnect: _reconnect
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 412:
            throw new PreconditionFailedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/sessions/{session_id}/turns/{turn_id}/subscribe");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/settings/resources/mcpServers/client/Client.mjs
var __awaiter34 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var McpServersClient3 = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * Configured MCP servers with auth_status. Header secrets are redacted.
   *
   * @param {McpServersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.mcpServers.list()
   */
  list(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__list(requestOptions));
  }
  __list(requestOptions) {
    return __awaiter34(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/settings/mcp-servers"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: ListMcpServersResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/settings/mcp-servers");
    });
  }
  /**
   * Creates an MCP server by `name`. Fails if `name` is already taken. Runs DCR registration when `auth.type` is `dcr`. Header secrets: real value required; redacted with no stored value returns 400.
   *
   * @param {TrueForge.settings.CreateMcpServerRequest} request
   * @param {McpServersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link TrueForge.FailedDependencyError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.mcpServers.create({
   *         manifest: {
   *             description: "description",
   *             name: "name",
   *             type: "remote",
   *             url: "url"
   *         }
   *     })
   */
  create(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__create(request, requestOptions));
  }
  __create(request, requestOptions) {
    return __awaiter34(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/settings/mcp-servers"),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(settings_exports.CreateMcpServerRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetMcpServerResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 424:
            throw new FailedDependencyError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/v1/settings/mcp-servers");
    });
  }
  /**
   * Create or replace by `name`. Header secrets: real value sets/rotates; redacted keeps existing (400 if none).
   *
   * @param {TrueForge.settings.UpdateMcpServerRequest} request
   * @param {McpServersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link TrueForge.FailedDependencyError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.mcpServers.createOrUpdate({
   *         manifest: {
   *             description: "description",
   *             name: "name",
   *             type: "remote",
   *             url: "url"
   *         }
   *     })
   */
  createOrUpdate(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__createOrUpdate(request, requestOptions));
  }
  __createOrUpdate(request, requestOptions) {
    return __awaiter34(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/settings/mcp-servers"),
        method: "PUT",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(settings_exports.UpdateMcpServerRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetMcpServerResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 424:
            throw new FailedDependencyError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "PUT", "/api/v1/settings/mcp-servers");
    });
  }
  /**
   * A single MCP server by name, with nested live auth_status (settings / admin projection). Header auth values are redacted.
   *
   * @param {string} name - MCP server name.
   * @param {McpServersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.mcpServers.get("name")
   */
  get(name, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__get(name, requestOptions));
  }
  __get(name, requestOptions) {
    return __awaiter34(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/settings/mcp-servers/${url_exports.encodePathParam(name)}`),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetMcpServerResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/settings/mcp-servers/{name}");
    });
  }
  /**
   * Deletes an MCP server by `name`, along with every stored OAuth token for it. Rejected while any agent still lists the server.
   *
   * @param {string} name - MCP server name.
   * @param {McpServersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link TrueForge.FailedDependencyError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.mcpServers.delete("name")
   */
  delete(name, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__delete(name, requestOptions));
  }
  __delete(name, requestOptions) {
    return __awaiter34(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/settings/mcp-servers/${url_exports.encodePathParam(name)}`),
        method: "DELETE",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: DeleteMcpServerResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 424:
            throw new FailedDependencyError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "DELETE", "/api/v1/settings/mcp-servers/{name}");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/settings/resources/modelProviders/client/Client.mjs
var __awaiter35 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var ModelProvidersClient2 = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * All configured providers with nested manifests.
   *
   * @param {ModelProvidersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.modelProviders.list()
   */
  list(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__list(requestOptions));
  }
  __list(requestOptions) {
    return __awaiter35(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/settings/model-providers"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: ListModelProvidersResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/settings/model-providers");
    });
  }
  /**
   * Creates a provider (models included). Fails if `name` is already taken. Well-known types use `type` as `name` (one each); `custom` is named by the caller. `auth.api_key`: real value required; redacted with no stored secret returns 400.
   *
   * @param {TrueForge.settings.CreateModelProviderRequest} request
   * @param {ModelProvidersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link TrueForge.FailedDependencyError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.modelProviders.create({
   *         manifest: {
   *             auth: {
   *                 apiKey: "api_key"
   *             },
   *             models: [{
   *                     modelId: "model_id",
   *                     name: "name",
   *                     properties: {}
   *                 }],
   *             type: "alibaba"
   *         }
   *     })
   */
  create(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__create(request, requestOptions));
  }
  __create(request, requestOptions) {
    return __awaiter35(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/settings/model-providers"),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(settings_exports.CreateModelProviderRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetModelProviderResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 424:
            throw new FailedDependencyError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/v1/settings/model-providers");
    });
  }
  /**
   * Create or replace a provider (models included). Well-known types use `type` as `name` (one each); `custom` is named by the caller. `auth.api_key`: real value sets/rotates; redacted keeps existing (400 if none).
   *
   * @param {TrueForge.settings.UpdateModelProviderRequest} request
   * @param {ModelProvidersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link TrueForge.FailedDependencyError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.modelProviders.createOrUpdate({
   *         manifest: {
   *             auth: {
   *                 apiKey: "api_key"
   *             },
   *             models: [{
   *                     modelId: "model_id",
   *                     name: "name",
   *                     properties: {}
   *                 }],
   *             type: "alibaba"
   *         }
   *     })
   */
  createOrUpdate(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__createOrUpdate(request, requestOptions));
  }
  __createOrUpdate(request, requestOptions) {
    return __awaiter35(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/settings/model-providers"),
        method: "PUT",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(settings_exports.UpdateModelProviderRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetModelProviderResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 424:
            throw new FailedDependencyError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "PUT", "/api/v1/settings/model-providers");
    });
  }
  /**
   * Deletes a provider and every model it declares. Rejected while any agent still uses one of them.
   *
   * @param {string} name - Model provider name.
   * @param {ModelProvidersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link TrueForge.FailedDependencyError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.modelProviders.delete("name")
   */
  delete(name, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__delete(name, requestOptions));
  }
  __delete(name, requestOptions) {
    return __awaiter35(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/settings/model-providers/${url_exports.encodePathParam(name)}`),
        method: "DELETE",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: DeleteModelProviderResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 424:
            throw new FailedDependencyError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "DELETE", "/api/v1/settings/model-providers/{name}");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/settings/resources/sandboxProviders/client/Client.mjs
var __awaiter36 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SandboxProvidersClient2 = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * The single configured sandbox provider for this tenant. `auth.api_key` is redacted.
   *
   * @param {SandboxProvidersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.sandboxProviders.get()
   */
  get(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__get(requestOptions));
  }
  __get(requestOptions) {
    return __awaiter36(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/settings/sandbox-providers"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSandboxProviderResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/settings/sandbox-providers");
    });
  }
  /**
   * Upserts the single sandbox provider for this tenant: creates it or replaces its entire configuration. `auth.api_key`: real value sets/rotates; redacted keeps existing (400 if none).
   *
   * @param {TrueForge.settings.UpdateSandboxProviderRequest} request
   * @param {SandboxProvidersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.UnprocessableEntityError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.sandboxProviders.createOrUpdate({
   *         manifest: {
   *             auth: {
   *                 apiKey: "api_key"
   *             },
   *             autoArchiveIntervalInMinutes: 1,
   *             autoDeleteIntervalInMinutes: 1,
   *             autoStopIntervalInMinutes: 1,
   *             execTimeoutMs: 1,
   *             type: "daytona"
   *         }
   *     })
   */
  createOrUpdate(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__createOrUpdate(request, requestOptions));
  }
  __createOrUpdate(request, requestOptions) {
    return __awaiter36(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/settings/sandbox-providers"),
        method: "PUT",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(settings_exports.UpdateSandboxProviderRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSandboxProviderResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 422:
            throw new UnprocessableEntityError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "PUT", "/api/v1/settings/sandbox-providers");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/settings/resources/skills/client/Client.mjs
var __awaiter37 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SkillsClient2 = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * All configured skills with nested manifests (settings / admin projection).
   *
   * @param {SkillsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.skills.list()
   */
  list(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__list(requestOptions));
  }
  __list(requestOptions) {
    return __awaiter37(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/settings/skills"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: ListSkillsResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/settings/skills");
    });
  }
  /**
   * Creates a skill keyed by `name`. Fails if `name` is already taken.
   *
   * @param {TrueForge.settings.CreateSkillRequest} request
   * @param {SkillsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link TrueForge.FailedDependencyError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.skills.create({
   *         manifest: {
   *             description: "description",
   *             name: "name",
   *             ref: "ref",
   *             type: "git",
   *             url: "url"
   *         }
   *     })
   */
  create(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__create(request, requestOptions));
  }
  __create(request, requestOptions) {
    return __awaiter37(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/settings/skills"),
        method: "POST",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(settings_exports.CreateSkillRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSkillResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 424:
            throw new FailedDependencyError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "POST", "/api/v1/settings/skills");
    });
  }
  /**
   * Full upsert keyed by `name`: creates the skill or replaces its entire manifest.
   *
   * @param {TrueForge.settings.UpdateSkillRequest} request
   * @param {SkillsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.FailedDependencyError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.skills.createOrUpdate({
   *         manifest: {
   *             description: "description",
   *             name: "name",
   *             ref: "ref",
   *             type: "git",
   *             url: "url"
   *         }
   *     })
   */
  createOrUpdate(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__createOrUpdate(request, requestOptions));
  }
  __createOrUpdate(request, requestOptions) {
    return __awaiter37(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/settings/skills"),
        method: "PUT",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(settings_exports.UpdateSkillRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetSkillResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 424:
            throw new FailedDependencyError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "PUT", "/api/v1/settings/skills");
    });
  }
  /**
   * Deletes a skill by `name`. Rejected while any agent still lists the skill.
   *
   * @param {string} name - Skill name.
   * @param {SkillsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link TrueForge.ConflictError}
   * @throws {@link TrueForge.FailedDependencyError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.skills.delete("name")
   */
  delete(name, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__delete(name, requestOptions));
  }
  __delete(name, requestOptions) {
    return __awaiter37(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), `api/v1/settings/skills/${url_exports.encodePathParam(name)}`),
        method: "DELETE",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: DeleteSkillResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 409:
            throw new ConflictError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 424:
            throw new FailedDependencyError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "DELETE", "/api/v1/settings/skills/{name}");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/settings/resources/webSearchProviders/client/Client.mjs
var __awaiter38 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var WebSearchProvidersClient2 = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * The configured provider for this tenant. `auth.api_key` is redacted when present.
   *
   * @param {WebSearchProvidersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link TrueForge.ForbiddenError}
   * @throws {@link TrueForge.NotFoundError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.webSearchProviders.get()
   */
  get(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__get(requestOptions));
  }
  __get(requestOptions) {
    return __awaiter38(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/settings/web-search-providers"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetWebSearchProviderResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 403:
            throw new ForbiddenError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 404:
            throw new NotFoundError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/settings/web-search-providers");
    });
  }
  /**
   * Upserts the single web search provider for this tenant. `auth.api_key`: real value sets/rotates; redacted keeps existing (400 if none).
   *
   * @param {TrueForge.settings.UpdateWebSearchProviderRequest} request
   * @param {WebSearchProvidersClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.BadRequestError}
   * @throws {@link TrueForge.FailedDependencyError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.settings.webSearchProviders.createOrUpdate({
   *         manifest: {
   *             auth: {
   *                 apiKey: "api_key"
   *             },
   *             type: "parallel"
   *         }
   *     })
   */
  createOrUpdate(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__createOrUpdate(request, requestOptions));
  }
  __createOrUpdate(request, requestOptions) {
    return __awaiter38(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/settings/web-search-providers"),
        method: "PUT",
        headers: _headers,
        contentType: "application/json",
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        requestType: "json",
        body: mergeAdditionalBodyParameters(settings_exports.UpdateWebSearchProviderRequest.jsonOrThrow(request, {
          unrecognizedObjectKeys: "passthrough",
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          omitUndefined: true
        }), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.additionalBodyParameters),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: GetWebSearchProviderResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 400:
            throw new BadRequestError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          case 424:
            throw new FailedDependencyError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "PUT", "/api/v1/settings/web-search-providers");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/settings/client/Client.mjs
var SettingsClient = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  get mcpServers() {
    var _a;
    return (_a = this._mcpServers) !== null && _a !== void 0 ? _a : this._mcpServers = new McpServersClient3(this._options);
  }
  get modelProviders() {
    var _a;
    return (_a = this._modelProviders) !== null && _a !== void 0 ? _a : this._modelProviders = new ModelProvidersClient2(this._options);
  }
  get sandboxProviders() {
    var _a;
    return (_a = this._sandboxProviders) !== null && _a !== void 0 ? _a : this._sandboxProviders = new SandboxProvidersClient2(this._options);
  }
  get skills() {
    var _a;
    return (_a = this._skills) !== null && _a !== void 0 ? _a : this._skills = new SkillsClient2(this._options);
  }
  get webSearchProviders() {
    var _a;
    return (_a = this._webSearchProviders) !== null && _a !== void 0 ? _a : this._webSearchProviders = new WebSearchProvidersClient2(this._options);
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/api/resources/skills/client/Client.mjs
var __awaiter39 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SkillsClient3 = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  /**
   * Configured skills as a slim name/description list for the composer.
   *
   * @param {SkillsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.skills.list()
   */
  list(requestOptions) {
    return HttpResponsePromise.fromPromise(this.__list(requestOptions));
  }
  __list(requestOptions) {
    return __awaiter39(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/skills"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: ListAvailableSkillsResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/skills");
    });
  }
  /**
   * Versions for one skill.
   *
   * @param {TrueForge.ListVersionsSkillsRequest} request
   * @param {SkillsClient.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @throws {@link TrueForge.UnauthorizedError}
   * @throws {@link errors.TrueForgeError}
   * @throws {@link errors.TrueForgeTimeoutError}
   *
   * @example
   *     await client.skills.listVersions({
   *         name: "name"
   *     })
   */
  listVersions(request, requestOptions) {
    return HttpResponsePromise.fromPromise(this.__listVersions(request, requestOptions));
  }
  __listVersions(request, requestOptions) {
    return __awaiter39(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const { name } = request;
      const _queryParams = {
        name
      };
      const _authRequest = yield this._options.authProvider.getAuthRequest();
      const _headers = mergeHeaders(_authRequest.headers, (_a = this._options) === null || _a === void 0 ? void 0 : _a.headers, requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
      const _response = yield ((_b = this._options.fetcher) !== null && _b !== void 0 ? _b : fetcher)({
        url: url_exports.join((_c = yield Supplier.get(this._options.baseUrl)) !== null && _c !== void 0 ? _c : yield Supplier.get(this._options.environment), "api/v1/skills/versions"),
        method: "GET",
        headers: _headers,
        queryString: url_exports.queryBuilder().addMany(_queryParams).mergeAdditional(requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.queryParams).build(),
        timeoutMs: ((_f = (_d = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeoutInSeconds) !== null && _d !== void 0 ? _d : (_e = this._options) === null || _e === void 0 ? void 0 : _e.timeoutInSeconds) !== null && _f !== void 0 ? _f : 60) * 1e3,
        maxRetries: (_g = requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.maxRetries) !== null && _g !== void 0 ? _g : (_h = this._options) === null || _h === void 0 ? void 0 : _h.maxRetries,
        abortSignal: requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.abortSignal,
        fetchFn: (_j = this._options) === null || _j === void 0 ? void 0 : _j.fetch,
        logging: this._options.logging
      });
      if (_response.ok) {
        return {
          data: ListSkillVersionsResponse.parseOrThrow(_response.body, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            breadcrumbsPrefix: ["response"]
          }),
          rawResponse: _response.rawResponse
        };
      }
      if (_response.error.reason === "status-code") {
        switch (_response.error.statusCode) {
          case 401:
            throw new UnauthorizedError(RequestErrorResponse.parseOrThrow(_response.error.body, {
              unrecognizedObjectKeys: "passthrough",
              allowUnrecognizedUnionMembers: true,
              allowUnrecognizedEnumValues: true,
              skipValidation: true,
              breadcrumbsPrefix: ["response"]
            }), _response.rawResponse);
          default:
            throw new TrueForgeError({
              statusCode: _response.error.statusCode,
              body: _response.error.body,
              rawResponse: _response.rawResponse
            });
        }
      }
      return handleNonStatusCodeError(_response.error, _response.rawResponse, "GET", "/api/v1/skills/versions");
    });
  }
};

// node_modules/@truefoundry/trueforge-sdk/dist/esm/Client.mjs
var __awaiter40 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var TrueForge = class {
  constructor(options) {
    this._options = normalizeClientOptionsWithAuth(options);
  }
  get internal() {
    var _a;
    return (_a = this._internal) !== null && _a !== void 0 ? _a : this._internal = new InternalClient(this._options);
  }
  get agents() {
    var _a;
    return (_a = this._agents) !== null && _a !== void 0 ? _a : this._agents = new AgentsClient(this._options);
  }
  get auth() {
    var _a;
    return (_a = this._auth) !== null && _a !== void 0 ? _a : this._auth = new AuthClient(this._options);
  }
  get server() {
    var _a;
    return (_a = this._server) !== null && _a !== void 0 ? _a : this._server = new ServerClient(this._options);
  }
  get mcpServers() {
    var _a;
    return (_a = this._mcpServers) !== null && _a !== void 0 ? _a : this._mcpServers = new McpServersClient2(this._options);
  }
  get models() {
    var _a;
    return (_a = this._models) !== null && _a !== void 0 ? _a : this._models = new ModelsClient(this._options);
  }
  get sandboxEnvironments() {
    var _a;
    return (_a = this._sandboxEnvironments) !== null && _a !== void 0 ? _a : this._sandboxEnvironments = new SandboxEnvironmentsClient2(this._options);
  }
  get schedules() {
    var _a;
    return (_a = this._schedules) !== null && _a !== void 0 ? _a : this._schedules = new SchedulesClient2(this._options);
  }
  get sessions() {
    var _a;
    return (_a = this._sessions) !== null && _a !== void 0 ? _a : this._sessions = new SessionsClient2(this._options);
  }
  get skills() {
    var _a;
    return (_a = this._skills) !== null && _a !== void 0 ? _a : this._skills = new SkillsClient3(this._options);
  }
  get catalogs() {
    var _a;
    return (_a = this._catalogs) !== null && _a !== void 0 ? _a : this._catalogs = new CatalogsClient(this._options);
  }
  get settings() {
    var _a;
    return (_a = this._settings) !== null && _a !== void 0 ? _a : this._settings = new SettingsClient(this._options);
  }
  /**
   * Make a passthrough request using the SDK's configured auth, retry, logging, etc.
   * This is useful for making requests to endpoints not yet supported in the SDK.
   * The input can be a URL string, URL object, or Request object. Relative paths are resolved against the configured base URL.
   *
   * @param {Request | string | URL} input - The URL, path, or Request object.
   * @param {RequestInit} init - Standard fetch RequestInit options.
   * @param {core.PassthroughRequest.RequestOptions} requestOptions - Per-request overrides (timeout, retries, headers, abort signal).
   * @returns {Promise<Response>} A standard Response object.
   */
  fetch(input, init, requestOptions) {
    return __awaiter40(this, void 0, void 0, function* () {
      var _a;
      return makePassthroughRequest(input, init, {
        baseUrl: (_a = this._options.baseUrl) !== null && _a !== void 0 ? _a : this._options.environment,
        headers: this._options.headers,
        timeoutInSeconds: this._options.timeoutInSeconds,
        maxRetries: this._options.maxRetries,
        fetch: this._options.fetch,
        logging: this._options.logging,
        getAuthHeaders: () => __awaiter40(this, void 0, void 0, function* () {
          return (yield this._options.authProvider.getAuthRequest()).headers;
        })
      }, requestOptions);
    });
  }
};

// src/cli/trueforgeCli.ts
var C = {
  reset: "\x1B[0m",
  bold: "\x1B[1m",
  dim: "\x1B[2m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  blue: "\x1B[34m",
  magenta: "\x1B[35m",
  cyan: "\x1B[36m",
  red: "\x1B[31m",
  gray: "\x1B[90m"
};
var config = {
  serverUrl: process.env.TRUEFORGE_SERVER_URL || "http://localhost:8790",
  mcpUrl: process.env.TRUEFORGE_MCP_URL || "http://127.0.0.1:45821/mcp",
  primaryModel: process.env.TRUEFORGE_PRIMARY_MODEL || "google-gemini/gemini-3-5-flash",
  fallbackModel: process.env.TRUEFORGE_FALLBACK_MODEL || "google-gemini/gemini-3-5-flash-lite",
  workspaceRoot: process.cwd()
};
var activeSessionId = null;
var simulateTaskCFailure = false;
function printBanner() {
  console.log("");
  console.log(`${C.cyan}${C.bold}  \u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E${C.reset}`);
  console.log(`${C.cyan}${C.bold}  \u2502  \u26A1 TrueForge Coding Agent CLI  \xB7  Editor-Native MCP REPL           \u2502${C.reset}`);
  console.log(`${C.cyan}${C.bold}  \u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F${C.reset}`);
  console.log(`  ${C.gray}Harness Server:${C.reset}  ${C.green}${config.serverUrl}${C.reset}`);
  console.log(`  ${C.gray}VS Code MCP:${C.reset}     ${C.cyan}${config.mcpUrl}${C.reset}`);
  console.log(`  ${C.gray}Primary Model:${C.reset}   ${C.bold}${config.primaryModel}${C.reset}`);
  console.log(`  ${C.gray}Fallback Model:${C.reset}  ${C.yellow}${config.fallbackModel}${C.reset}`);
  console.log(`  ${C.gray}Workspace:${C.reset}       ${config.workspaceRoot}`);
  console.log("");
  console.log(`  ${C.dim}Commands: /status  /models  /task-a  /task-b  /task-c  /sessions  /clear  /help  /exit${C.reset}`);
  console.log(`  ${C.dim}Or type any coding prompt to stream a live TrueForge turn with VS Code MCP tools.${C.reset}`);
  console.log("");
}
async function checkStatus() {
  process.stdout.write(`  ${C.gray}Checking TrueForge harness (${config.serverUrl})...${C.reset} `);
  try {
    const res = await fetch(`${config.serverUrl}/api/v1/sessions`, {
      signal: AbortSignal.timeout(3e3)
    });
    if (res.ok) {
      const json = await res.json();
      console.log(`${C.green}\u25CF Connected${C.reset} (${(json.data || []).length} recent sessions)`);
    } else {
      console.log(`${C.yellow}\u25CF HTTP ${res.status}${C.reset}`);
    }
  } catch (err) {
    console.log(
      `${C.red}\u25CF Offline${C.reset} (${err instanceof Error ? err.message : String(err)}) \u2014 run 'npm run trueforge' to start`
    );
  }
  process.stdout.write(`  ${C.gray}Checking VS Code Editor MCP (${config.mcpUrl.replace(/\/mcp$/, "/health")})...${C.reset} `);
  try {
    const res = await fetch(config.mcpUrl.replace(/\/mcp$/, "/health"), {
      signal: AbortSignal.timeout(2500)
    });
    if (res.ok) {
      const data = await res.json();
      console.log(
        `${C.green}\u25CF Active${C.reset} (${(data.tools || []).length} tools: ${(data.tools || []).join(", ")})`
      );
    } else {
      console.log(`${C.yellow}\u25CF HTTP ${res.status}${C.reset}`);
    }
  } catch {
    console.log(`${C.yellow}\u25CF Not detected on ${config.mcpUrl}${C.reset}`);
  }
  console.log("");
}
async function listModels() {
  try {
    const res = await fetch(`${config.serverUrl}/api/v1/settings/model-providers`, {
      signal: AbortSignal.timeout(4e3)
    });
    const json = await res.json();
    const models = [];
    for (const p of json.data || []) {
      const prov = p.name || p.manifest?.name;
      for (const m of p.manifest?.models || []) {
        if (prov && m.name) {
          models.push(`${prov}/${m.name}`);
        }
      }
    }
    console.log(`
  ${C.bold}Configured TrueForge Models (${models.length}):${C.reset}`);
    for (const m of models) {
      const tag = m === config.primaryModel ? ` ${C.green}[PRIMARY]${C.reset}` : m === config.fallbackModel ? ` ${C.yellow}[FALLBACK]${C.reset}` : "";
      console.log(`    \u2022 ${m}${tag}`);
    }
    console.log("");
  } catch (err) {
    console.log(`  ${C.red}Failed to query models:${C.reset} ${err instanceof Error ? err.message : String(err)}
`);
  }
}
async function listSessions() {
  try {
    const res = await fetch(`${config.serverUrl}/api/v1/sessions`, {
      signal: AbortSignal.timeout(4e3)
    });
    const json = await res.json();
    const sessions = (json.data || []).slice(0, 8);
    console.log(`
  ${C.bold}Recent TrueForge Sessions:${C.reset}`);
    for (const s of sessions) {
      const model = s.agent?.spec?.model?.name || "default";
      const title = (s.title || "Untitled").replace(/\s+/g, " ").slice(0, 52);
      console.log(`    ${C.cyan}${s.id}${C.reset}  ${C.gray}[${model}]${C.reset}  ${title}`);
    }
    console.log("");
  } catch (err) {
    console.log(`  ${C.red}Failed to list sessions:${C.reset} ${err instanceof Error ? err.message : String(err)}
`);
  }
}
async function executePromptWithFailover(prompt) {
  const primaryToTry = simulateTaskCFailure ? "unreachable-provider/invalid-model-endpoint" : config.primaryModel;
  const maxRetries = 2;
  let lastError = "";
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await runSingleTurn(primaryToTry, prompt, attempt === 1 && !simulateTaskCFailure);
      return;
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      if (attempt < maxRetries) {
        const delayMs = 600 * Math.pow(2, attempt - 1);
        console.log(
          `
  ${C.yellow}\u25CF Retry (${attempt}/${maxRetries}, backoff ${delayMs}ms):${C.reset} Primary model '${primaryToTry}' failed: ${lastError}`
        );
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  console.log(
    `
  ${C.yellow}\u26A1 Automatic Failover:${C.reset} Switching '${primaryToTry}' \u2192 '${config.fallbackModel}' (Workspace unchanged)`
  );
  activeSessionId = null;
  try {
    await runSingleTurn(config.fallbackModel, prompt, false);
  } catch (fbErr) {
    console.log(
      `
  ${C.red}\u2717 Both primary and fallback models failed:${C.reset} ${fbErr instanceof Error ? fbErr.message : String(fbErr)}
`
    );
  }
}
async function runSingleTurn(modelName, prompt, reuseSession) {
  const client = new TrueForge({
    baseUrl: config.serverUrl,
    token: "local-trueforge-token"
  });
  if (!reuseSession || !activeSessionId) {
    const sessionResp = await client.sessions.create({
      agent: {
        spec: {
          model: {
            name: modelName,
            params: { temperature: 0.1 }
          },
          instructions: "You are TrueForge Coding Agent running in the VS Code CLI. Use your MCP tools (search_workspace, read_file, list_files, get_symbols, get_diagnostics, propose_edit, run_command) to inspect and edit files cleanly.",
          mcpServers: [
            {
              name: "vscode-editor-mcp",
              enableTools: ["@all"],
              preload: false,
              preloadTools: ["search_workspace", "read_file"],
              requireApprovalForTools: ["propose_edit", "run_command"]
            }
          ],
          config: {
            iterationLimit: 24,
            sandbox: { enabled: false },
            dynamicSubAgents: { enabled: true },
            contextManagement: {
              compaction: { enabled: true },
              largeToolResponse: { enabled: true }
            },
            generativeUi: { enabled: false },
            askUserQuestions: { enabled: false },
            webSearch: { enabled: false }
          }
        }
      },
      metadata: {
        source: "trueforge-vscode-cli",
        model: modelName
      }
    });
    activeSessionId = sessionResp.data.id;
    console.log(`  ${C.gray}Session: ${activeSessionId} (${modelName})${C.reset}`);
  }
  const stream = await client.sessions.createTurnStream(activeSessionId, {
    input: [{ type: "user.message", content: prompt }]
  });
  let currentTurnId = "";
  let printedHeader = false;
  for await (const event of stream) {
    if (event.type === "turn.created") {
      currentTurnId = event.turnId;
    } else if (event.type === "model.message.delta" && event.content) {
      if (!printedHeader) {
        process.stdout.write(`
  ${C.gray}\u25CF${C.reset} `);
        printedHeader = true;
      }
      process.stdout.write(event.content);
    } else if (event.type === "model.message" && event.toolCalls?.length) {
      if (printedHeader) {
        process.stdout.write("\n");
        printedHeader = false;
      }
      for (const tc of event.toolCalls) {
        const name = tc.function?.name || "tool";
        const args = tc.function?.arguments || "{}";
        console.log(`  ${C.green}\u25CF ${C.bold}${name}${C.reset} ${C.gray}${args.slice(0, 120)}${C.reset}`);
      }
    } else if (event.type === "tool.approval_required") {
      if (printedHeader) {
        process.stdout.write("\n");
        printedHeader = false;
      }
      for (const ref of event.toolCalls) {
        console.log(
          `  ${C.yellow}\u25CF Approval Checkpoint (${ref.id}):${C.reset} Auto-approving in CLI & staging diff in VS Code editor...`
        );
        await client.sessions.createTurnEvent(activeSessionId, currentTurnId, {
          events: [
            {
              type: "user.tool_approval",
              threadId: event.threadId,
              toolCallId: ref.id,
              approval: { status: "allow" }
            }
          ]
        });
      }
    } else if (event.type === "turn.done") {
      if (printedHeader) {
        process.stdout.write("\n");
      }
      if (event.state.status === "error") {
        throw new Error(event.state.message || "Turn ended in error state");
      }
      console.log(`  ${C.green}\u2713 Turn complete${C.reset}
`);
    }
  }
}
async function main() {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printBanner();
    process.exit(0);
  }
  printBanner();
  await checkStatus();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${C.cyan}${C.bold}trueforge>${C.reset} `
  });
  rl.prompt();
  rl.on("line", async (rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      rl.prompt();
      return;
    }
    if (line === "/exit" || line === "/quit" || line === "exit") {
      console.log(`  ${C.gray}Closing TrueForge CLI.${C.reset}`);
      process.exit(0);
    } else if (line === "/help") {
      console.log(`
  ${C.bold}Available Slash Commands:${C.reset}`);
      console.log(`    ${C.cyan}/status${C.reset}    Check TrueForge server & VS Code MCP connector health`);
      console.log(`    ${C.cyan}/models${C.reset}    List configured models on TrueForge`);
      console.log(`    ${C.cyan}/sessions${C.reset}  Show recent TrueForge sessions`);
      console.log(`    ${C.cyan}/task-a${C.reset}    Run Round 1 Task A (Inline Edit on get_debug_flag)`);
      console.log(`    ${C.cyan}/task-b${C.reset}    Run Round 1 Task B (Multi-file flask config CLI command)`);
      console.log(`    ${C.cyan}/task-c${C.reset}    Toggle Task C Resilience Failure Simulation (currently ${simulateTaskCFailure ? "ON" : "OFF"})`);
      console.log(`    ${C.cyan}/clear${C.reset}     Reset active session and clear terminal`);
      console.log(`    ${C.cyan}/exit${C.reset}      Close the CLI
`);
    } else if (line === "/status") {
      await checkStatus();
    } else if (line === "/models") {
      await listModels();
    } else if (line === "/sessions") {
      await listSessions();
    } else if (line === "/clear") {
      activeSessionId = null;
      console.clear();
      printBanner();
    } else if (line === "/task-c") {
      simulateTaskCFailure = !simulateTaskCFailure;
      console.log(
        `
  ${C.yellow}\u{1F6E1}\uFE0F Task C Primary Failure Simulation is now ${simulateTaskCFailure ? "ENABLED" : "DISABLED"}${C.reset}
`
      );
    } else if (line === "/task-a") {
      const prompt = "In src/flask/helpers.py function get_debug_flag, treat the values 'off' and 'n' as false as well, case-insensitively, and update the docstring to list every value that is treated as false. Call propose_edit.";
      await executePromptWithFailover(prompt);
    } else if (line === "/task-b") {
      const prompt = `Add a new built-in CLI command flask config that prints the loaded application's configuration as JSON, masking the values of any key containing SECRET, PASSWORD, TOKEN or KEY as "***". It must appear in flask --help, be covered by a test, and be documented alongside the other built-in commands.`;
      await executePromptWithFailover(prompt);
    } else {
      await executePromptWithFailover(line);
    }
    rl.prompt();
  });
}
void main();
