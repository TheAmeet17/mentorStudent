import prisma from "../connect/prisma.js";
import { AppError } from "../utils/appError.js";

export const createSubmissionService = async (data: any) => {
    // Check if assignment exists
    const assignment = await prisma.assignment.findUnique({
      where: { id: data.assignmentId },
    });
    if (!assignment) {
      throw new AppError("Assignment not found", 404);
    }
  
    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id: data.studentId },
    });
    if (!student) {
      throw new AppError("Student not found", 404);
    }
  
    // Create submission
    const submission = await prisma.submission.create({
      data: {
        assignmentId: data.assignmentId,
        studentId: data.studentId,
        status: "pending",
      },
    });
  
    return { message: "Assignment submitted successfully", submission };
  };

export const getAllSubmissionsService = async (mentorId?: string) => {
  const whereClause = mentorId ? {
    assignment: {
      mentorId: mentorId
    }
  } : {};

  const submissions = await prisma.submission.findMany({
    where: whereClause,
    include: {
      assignment: true,
      student: true
    }
  });
  return { message: "All submissions fetched", submissions };
};

export const getSubmissionByIdService = async (id: string) => {
  const submission = await prisma.submission.findUnique({ where: { id } });
  if (!submission) throw new AppError("Submission not found", 404);
  return { message: "Submission fetched", submission };
};

export const getByAssignmentService = async (assignmentId: string) => {
  const submissions = await prisma.submission.findMany({
    where: { assignmentId },
  });
  return { message: "Submissions for assignment fetched", submissions };
};

export const getByStudentService = async (studentId: string) => {
  const submissions = await prisma.submission.findMany({
    where: { studentId },
  });
  return { message: "Submissions for student fetched", submissions };
};

export const reviewSubmissionService = async (id: string, data: any, mentorId?: string) => {
  // If mentorId is provided, we must check if this submission belongs to one of their assignments
  if (mentorId) {
    const submission = await prisma.submission.findUnique({ 
      where: { id },
      include: { assignment: true }
    });
    
    if (!submission) throw new AppError("Submission not found", 404);
    
    if (submission.assignment.mentorId !== mentorId) {
      throw new AppError("Unauthorized: You can only review submissions for your own assignments", 403);
    }
  }

  const submission = await prisma.submission.update({
    where: { id },
    data,
  });
  return { message: "Submission reviewed", submission };
};
