import { Request, Response, NextFunction } from "express";
import * as studentService from "../services/student.service.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createStudent = catchAsync(async (req, res, next) => {
  const mentorId = req.user?.userId;
  if (!mentorId) throw new AppError("Mentor ID missing from token", 401);

  const studentData = { ...req.body, mentorId };
  
  const result = await studentService.createStudentService(studentData);
  res.status(201).json(result);
});

export const getAllStudents = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  // Extract mentorId from the authenticated user
  const mentorId = req.user?.userId as string;

  const result = await studentService.getAllStudentsService(page, limit, mentorId);
  res.status(200).json(result);
});

export const getStudentById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new AppError("Student ID is required", 400);
  const result = await studentService.getStudentByIdService(id);
  res.status(200).json(result);
});

export const updateStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const mentorId = req.user?.userId as string; // Fix: Scoping
  if (!id) throw new AppError("Student ID is required", 400);
  const result = await studentService.updateStudentService(id, req.body, mentorId);
  res.status(200).json(result);
});

export const deleteStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const mentorId = req.user?.userId as string; // Fix: Scoping
  if (!id) throw new AppError("Student ID is required", 400);
  const result = await studentService.deleteStudentService(id, mentorId);
  res.status(200).json(result);
});

export const getStudentProgress = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const mentorId = req.user?.userId as string; // Fix: Scoping
  if (!id) throw new AppError("Student ID is required", 400);

  const result = await studentService.getStudentProgressService(id, mentorId);
  res.status(200).json(result);
});
