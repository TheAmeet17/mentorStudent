import prisma from "../connect/prisma.js";
import { AppError } from "../utils/appError.js";

export const createAssignmentService = async (data: any) => {
  if (Array.isArray(data)) {
    const assignments = await prisma.$transaction(
      data.map((item) => prisma.assignment.create({ data: item }))
    );
    return { message: "Assignments created", assignments };
  } else {
    const assignment = await prisma.assignment.create({ data });
    return { message: "Assignment created", assignment };
  }
};

export const getAllAssignmentsService = async (page: number = 1, limit: number = 10, mentorId?: string) => {
  const skip = (page - 1) * limit;
  
  // If mentorId is provided, filter by it.
  // Note: If admins use this and don't pass mentorId, they see all.
  const whereClause = mentorId ? { mentorId } : {};

  const assignments = await prisma.assignment.findMany({
    where: whereClause,
    skip,
    take: limit,
  });
  const total = await prisma.assignment.count({ where: whereClause });
  return { message: "All assignments fetched", assignments, total, page, totalPages: Math.ceil(total / limit) };
};

export const getAssignmentByIdService = async (id: string) => {
  const assignment = await prisma.assignment.findUnique({ where: { id } });
  if (!assignment) throw new AppError("Assignment not found", 404);
  return { message: "Assignment fetched", assignment };
};

export const updateAssignmentService = async (id: string, data: any, mentorId?: string) => {
  if (mentorId) {
    const assignment = await prisma.assignment.findUnique({ where: { id } });
    if (!assignment) throw new AppError("Assignment not found", 404);
    if (assignment.mentorId !== mentorId) throw new AppError("Unauthorized access to this assignment", 403);
  }
  const assignment = await prisma.assignment.update({ where: { id }, data });
  return { message: "Assignment updated", assignment };
};

export const deleteAssignmentService = async (id: string, mentorId?: string) => {
  if (mentorId) {
    const assignment = await prisma.assignment.findUnique({ where: { id } });
    if (!assignment) throw new AppError("Assignment not found", 404);
    if (assignment.mentorId !== mentorId) throw new AppError("Unauthorized access to this assignment", 403);
  }
  await prisma.assignment.delete({ where: { id } });
  return { message: "Assignment deleted" };
};

export const assignToStudentsService = async (assignmentId: string, data: any, mentorId?: string) => {
  const { studentIds } = data;
  if (!studentIds || !Array.isArray(studentIds)) throw new AppError("studentIds array required", 400);

  // Check if assignment exists
  const assignment = await prisma.assignment.findUnique({ where: { id: assignmentId } });
  if (!assignment) throw new AppError("Assignment not found", 404);
  
  // Verify ownership
  if (mentorId && assignment.mentorId !== mentorId) {
    throw new AppError("Unauthorized to assign to this assignment", 403);
  }

  // Validate student IDs
  const students = await prisma.student.findMany({
    where: { id: { in: studentIds } },
    select: { id: true }
  });

  if (students.length !== studentIds.length) {
    const foundIds = students.map(s => s.id);
    const missingIds = studentIds.filter((id: string) => !foundIds.includes(id));
    throw new AppError(`Invalid Student IDs found: ${missingIds.join(", ")}`, 400);
  }

  const submissions = studentIds.map((studentId: string) =>
    prisma.submission.create({
      data: { assignmentId, studentId, status: "pending" },
    })
  );

  await prisma.$transaction(submissions);

  return { message: "Assignment assigned to students" };
};
