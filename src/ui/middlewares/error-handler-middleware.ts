import type { NextFunction, Request, Response } from 'express';
import { status } from 'http-status';
import * as zod from 'zod';

import { DomainError } from '../../domain/types/errors/DomainError';

const domainErrorToHttpStatusCode: Record<string, number> = {
  EntityNotFoundError: status.NOT_FOUND,
  UnauthorizedError: status.UNAUTHORIZED,
  BusinessConflictError: status.CONFLICT,
  ForbiddenOperationError: status.FORBIDDEN,
};

export const errorHandlerMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error instanceof DomainError) {
    const statusCode = domainErrorToHttpStatusCode[error.name] || status.BAD_REQUEST;
    response.status(statusCode).json({ message: error.message });
    return;
  }
  if (error instanceof zod.ZodError) {
    const errorMessage = error.issues.map((issue: zod.ZodIssue) => issue.message).join('; ');
    response.status(status.BAD_REQUEST).json({ message: errorMessage });
    return;
  }

  response.status(status.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
    error: error instanceof Error ? error.message : String(error),
  });
};
