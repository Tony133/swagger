import { HttpStatus, Type } from '@nestjs/common';
import { omit } from 'lodash';
import { DECORATORS } from '../constants';
import {
  ReferenceObject,
  ResponseObject,
  SchemaObject
} from '../interfaces/open-api-spec.interface';
import { getTypeIsArrayTuple } from './helpers';

export interface ApiResponseMetadata
  extends Omit<ResponseObject, 'description'> {
  status?: number | 'default' | '1XX' | '2XX' | '3XX' | '4XX' | '5XX';
  type?: Type<unknown> | Function | [Function] | string;
  isArray?: boolean;
  description?: string;
}

export interface ApiResponseSchemaHost
  extends Omit<ResponseObject, 'description'> {
  schema: SchemaObject & Partial<ReferenceObject>;
  status?: number | 'default' | '1XX' | '2XX' | '3XX' | '4XX' | '5XX';
  description?: string;
}

export type ApiResponseOptions = ApiResponseMetadata | ApiResponseSchemaHost;

/**
 * @publicApi
 */
export function ApiResponse(
  options: ApiResponseOptions,
  { overrideExisting } = { overrideExisting: true }
): MethodDecorator & ClassDecorator {
  const [type, isArray] = getTypeIsArrayTuple(
    (options as ApiResponseMetadata).type,
    (options as ApiResponseMetadata).isArray
  );

  (options as ApiResponseMetadata).type = type;
  (options as ApiResponseMetadata).isArray = isArray;
  options.description = options.description ? options.description : '';

  const groupedMetadata = {
    [options.status || 'default']: omit(options, 'status')
  };
  return (
    target: object,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>
  ): any => {
    if (descriptor) {
      const responses = Reflect.getMetadata(
        DECORATORS.API_RESPONSE,
        descriptor.value
      );

      if (responses && !overrideExisting) {
        return descriptor;
      }
      Reflect.defineMetadata(
        DECORATORS.API_RESPONSE,
        {
          ...responses,
          ...groupedMetadata
        },
        descriptor.value
      );
      return descriptor;
    }
    const responses = Reflect.getMetadata(DECORATORS.API_RESPONSE, target);
    if (responses && !overrideExisting) {
      return descriptor;
    }
    Reflect.defineMetadata(
      DECORATORS.API_RESPONSE,
      {
        ...responses,
        ...groupedMetadata
      },
      target
    );
    return target;
  };
}

/**
 * @publicApi
 */
export const ApiOkResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.OK
  });

/**
 * @publicApi
 */
export const ApiCreatedResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.CREATED
  });

/**
 * @publicApi
 */
export const ApiAcceptedResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.ACCEPTED
  });

/**
 * @publicApi
 */
export const ApiNoContentResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.NO_CONTENT
  });

/**
 * @publicApi
 */
export const ApiMovedPermanentlyResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.MOVED_PERMANENTLY
  });

/**
 * @publicApi
 */
export const ApiFoundResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.FOUND
  });

/**
 * @publicApi
 */
export const ApiBadRequestResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.BAD_REQUEST
  });


/**
 * @publicApi
 */
export const ApiUnauthorizedResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.UNAUTHORIZED
  });


/**
 * @publicApi
 */
export const ApiTooManyRequestsResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.TOO_MANY_REQUESTS
  });


/**
 * @publicApi
 */
export const ApiNotFoundResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.NOT_FOUND
  });


/**
 * @publicApi
 */
export const ApiInternalServerErrorResponse = (
  options: ApiResponseOptions = {}
) =>
  ApiResponse({
    ...options,
    status: HttpStatus.INTERNAL_SERVER_ERROR
  });


/**
 * @publicApi
 */
export const ApiBadGatewayResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.BAD_GATEWAY
  });


/**
 * @publicApi
 */
export const ApiConflictResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.CONFLICT
  });


/**
 * @publicApi
 */
export const ApiForbiddenResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.FORBIDDEN
  });


/**
 * @publicApi
 */
export const ApiGatewayTimeoutResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.GATEWAY_TIMEOUT
  });


/**
 * @publicApi
 */
export const ApiGoneResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.GONE
  });


/**
 * @publicApi
 */
export const ApiMethodNotAllowedResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.METHOD_NOT_ALLOWED
  });


/**
 * @publicApi
 */
export const ApiNotAcceptableResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.NOT_ACCEPTABLE
  });


/**
 * @publicApi
 */
export const ApiNotImplementedResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.NOT_IMPLEMENTED
  });


/**
 * @publicApi
 */
export const ApiPreconditionFailedResponse = (
  options: ApiResponseOptions = {}
) =>
  ApiResponse({
    ...options,
    status: HttpStatus.PRECONDITION_FAILED
  });


/**
 * @publicApi
 */
export const ApiPayloadTooLargeResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.PAYLOAD_TOO_LARGE
  });


/**
 * @publicApi
 */
export const ApiRequestTimeoutResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: HttpStatus.REQUEST_TIMEOUT
  });


/**
 * @publicApi
 */
export const ApiServiceUnavailableResponse = (
  options: ApiResponseOptions = {}
) =>
  ApiResponse({
    ...options,
    status: HttpStatus.SERVICE_UNAVAILABLE
  });


/**
 * @publicApi
 */
export const ApiUnprocessableEntityResponse = (
  options: ApiResponseOptions = {}
) =>
  ApiResponse({
    ...options,
    status: HttpStatus.UNPROCESSABLE_ENTITY
  });


/**
 * @publicApi
 */
export const ApiUnsupportedMediaTypeResponse = (
  options: ApiResponseOptions = {}
) =>
  ApiResponse({
    ...options,
    status: HttpStatus.UNSUPPORTED_MEDIA_TYPE
  });


/**
 * @publicApi
 */
export const ApiDefaultResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: 'default'
  });
