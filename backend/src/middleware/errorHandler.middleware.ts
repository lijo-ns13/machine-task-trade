import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types/Api.types';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', error);

  const response: ErrorResponse = {
    success: false,
    error: error.message || 'Internal server error',
    message: 'An error occurred while processing your request',
  };

  res.status(500).json(response);
};

