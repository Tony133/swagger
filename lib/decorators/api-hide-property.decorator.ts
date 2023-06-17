/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * @publicApi
 */
export function ApiHideProperty(): PropertyDecorator {
  return (target: Record<string, any>, propertyKey: string | symbol) => {};
}
