import { Request, Response, NextFunction } from 'express';
// import { AppError } from '../utils/appError.js'; // Ensure correct import if AppError is used, or define interface locally if simplifying

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log error for debugging
  console.error('ERROR 💥', err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // Stack trace only in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
