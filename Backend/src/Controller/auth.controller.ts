import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const signupUser = catchAsync(async (req, res, next) => {
  const result = await authService.signupUserService(req.body);
  res.status(201).json(result);
});

export const loginUser = catchAsync(async (req, res, next) => {
  const result = await authService.loginUserService(req.body);
  res.status(200).json(result);
});

export const logoutUser = catchAsync(async (req, res, next) => {
  const result = authService.logoutUserService();
  res.clearCookie("access_token");
  res.status(200).json(result);
});
