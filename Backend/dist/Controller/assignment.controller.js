import * as assignmentService from "../services/assignment.service.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
// Create
export const createAssignment = catchAsync(async (req, res, next) => {
    const mentorId = req.user?.userId;
    if (!mentorId)
        throw new AppError("Mentor ID missing from token", 401);
    if (Array.isArray(req.body)) {
        const assignmentData = req.body.map((item) => ({ ...item, mentorId }));
        const result = await assignmentService.createAssignmentService(assignmentData);
        res.status(201).json(result);
    }
    else {
        const assignmentData = { ...req.body, mentorId };
        const result = await assignmentService.createAssignmentService(assignmentData);
        res.status(201).json(result);
    }
});
// Get All
export const getAllAssignments = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    // Scoping: If the user is a mentor, filter by their ID.
    const mentorId = req.user?.userId;
    const result = await assignmentService.getAllAssignmentsService(page, limit, mentorId);
    res.status(200).json(result);
});
// Get One
export const getAssignmentById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!id)
        throw new AppError("Assignment ID is required", 400);
    const result = await assignmentService.getAssignmentByIdService(id);
    res.status(200).json(result);
});
// Update
export const updateAssignment = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const mentorId = req.user?.userId; // Fix: Scoping
    if (!id)
        throw new AppError("Assignment ID is required", 400);
    const result = await assignmentService.updateAssignmentService(id, req.body, mentorId);
    res.status(200).json(result);
});
// Delete
export const deleteAssignment = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const mentorId = req.user?.userId; // Fix: Scoping
    if (!id)
        throw new AppError("Assignment ID is required", 400);
    const result = await assignmentService.deleteAssignmentService(id, mentorId);
    res.status(200).json(result);
});
// Assign
export const assignToStudents = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const mentorId = req.user?.userId; // Fix: Scoping
    if (!id)
        throw new AppError("Assignment ID is required", 400);
    const result = await assignmentService.assignToStudentsService(id, req.body, mentorId);
    res.status(200).json(result);
});
//# sourceMappingURL=assignment.controller.js.map