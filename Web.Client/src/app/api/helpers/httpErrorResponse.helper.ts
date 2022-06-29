import { StandardHttpErrorResponse } from '../models/httpErrorResponse.interface';

/**
 * Takes an StandardHttpErrorResponse object and pulls out the error messages
 * @param errorResponse the HTTP error response
 * @returns an array of error messages
 */
export const standardHttpErrorResponseToErrorArray = (
  errorResponse: StandardHttpErrorResponse
): string[] => {
  if (typeof errorResponse.error === 'string') {
    return [errorResponse.error];
  }

  const errors = [];
  for (const k in errorResponse.error.errors) {
    const errorList = errorResponse.error.errors[k];
    errors.push(...errorList);
  }

  return errors;
};
