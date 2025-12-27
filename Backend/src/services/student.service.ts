import prisma from "../connect/prisma.js";

import bcrypt from "bcrypt";

export const createStudentService = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const student = await prisma.student.create({
    data: { ...data, password: hashedPassword },
  });
  return { message: "Student created", student };
};

export const getAllStudentsService = async (page: number = 1, limit: number = 10, mentorId?: string) => {
  const skip = (page - 1) * limit;
  
  const whereClause = mentorId ? { mentorId } : {};

  const students = await prisma.student.findMany({
    where: whereClause,
    skip,
    take: limit,
  });
  const total = await prisma.student.count({ where: whereClause });
  return { message: "All students fetched", students, total, page, totalPages: Math.ceil(total / limit) };
};

export const getStudentByIdService = async (id: string) => {
  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) throw new Error("Student not found");
  return { message: "Student fetched", student };
};

export const updateStudentService = async (id: string, data: any, mentorId?: string) => {
  // If mentorId given, ensure student belongs to them
  const whereClause = mentorId ? { id, mentorId } : { id };

  // Check existence first for better error message or let prisma fail
  // Using updateMany is safer for permission checks but update({where}) throws if not found
  // For 'update' with composite unique/id check, typically need findFirst or catch error.
  // Prisma update() requires logic 'where' to be a unique key. 
  // 'id' is unique, but 'id + mentorId' isn't a primary composite key in schema.
  // So we must check permissions first.
  
  if (mentorId) {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student || student.mentorId !== mentorId) {
      throw new Error("Student not found or unauthorized");
    }
  }

  const student = await prisma.student.update({ where: { id }, data });
  return { message: "Student updated", student };
};

export const deleteStudentService = async (id: string, mentorId?: string) => {
  if (mentorId) {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student || student.mentorId !== mentorId) {
      throw new Error("Student not found or unauthorized");
    }
  }
  await prisma.student.delete({ where: { id } });
  return { message: "Student deleted" };
};

export const getStudentProgressService = async (studentId: string, mentorId?: string) => {
    // 1. Get student to find mentor
    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) throw new Error("Student not found");

    // Scoping check
    if (mentorId && student.mentorId !== mentorId) {
        throw new Error("Unauthorized access to student progress");
    }

    // 2. Count total assignments from the mentor
    const totalAssignments = await prisma.assignment.count({
        where: { mentorId: student.mentorId }
    });

    // 3. Count completed submissions
    const completedSubmissions = await prisma.submission.count({
        where: { 
            studentId, 
            status: "completed" 
        }
    });

    // 4. Calculate percentage
    const progressPercentage = totalAssignments === 0 ? 0 : (completedSubmissions / totalAssignments) * 100;

    return {
        studentId,
        totalAssignments,
        completedSubmissions,
        progressPercentage: Math.round(progressPercentage * 100) / 100
    };
};
