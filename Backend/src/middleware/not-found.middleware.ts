import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError.js';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};
