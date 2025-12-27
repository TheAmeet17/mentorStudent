import { Request, Response, NextFunction } from "express";
import * as submissionService from "../services/submission.service.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const submitAssignment = catchAsync(async (req, res, next) => {
  const studentId = req.user?.userId;
  if (!studentId) {
    throw new AppError("User not identified", 401);
  }

  const submissionData = {
    ...req.body,
    studentId,
  };

  const result = await submissionService.createSubmissionService(submissionData);
  res.status(201).json(result);
});

export const getAllSubmissions = catchAsync(async (req, res, next) => {
  const mentorId = req.user?.userId as string;
  const result = await submissionService.getAllSubmissionsService(mentorId);
  res.status(200).json(result);
});

export const getSubmissionById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new AppError("Submission ID is required", 400);
  const result = await submissionService.getSubmissionByIdService(id);
  res.status(200).json(result);
});

export const getByAssignment = catchAsync(async (req, res, next) => {
  const { assignmentId } = req.params;
  if (!assignmentId) throw new AppError("Assignment ID is required", 400);
  const result = await submissionService.getByAssignmentService(assignmentId);
  res.status(200).json(result);
});

export const getByStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  if (!studentId) throw new AppError("Student ID is required", 400);
  const result = await submissionService.getByStudentService(studentId);
  res.status(200).json(result);
});

export const reviewSubmission = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const mentorId = req.user?.userId as string; // Fix: Scoping
  if (!id) throw new AppError("Submission ID is required", 400);
  const result = await submissionService.reviewSubmissionService(id, req.body, mentorId);
  res.status(200).json(result);
});
