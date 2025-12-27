import prisma from "../connect/prisma.js";
export const createSubmissionService = async (data) => {
    // Check if assignment exists
    const assignment = await prisma.assignment.findUnique({
        where: { id: data.assignmentId },
    });
    if (!assignment) {
        throw new Error("Assignment not found");
    }
    // Check if student exists
    const student = await prisma.student.findUnique({
        where: { id: data.studentId },
    });
    if (!student) {
        throw new Error("Student not found");
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
export const getAllSubmissionsService = async (mentorId) => {
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
export const getSubmissionByIdService = async (id) => {
    const submission = await prisma.submission.findUnique({ where: { id } });
    if (!submission)
        throw new Error("Submission not found");
    return { message: "Submission fetched", submission };
};
export const getByAssignmentService = async (assignmentId) => {
    const submissions = await prisma.submission.findMany({
        where: { assignmentId },
    });
    return { message: "Submissions for assignment fetched", submissions };
};
export const getByStudentService = async (studentId) => {
    const submissions = await prisma.submission.findMany({
        where: { studentId },
    });
    return { message: "Submissions for student fetched", submissions };
};
export const reviewSubmissionService = async (id, data, mentorId) => {
    // If mentorId is provided, we must check if this submission belongs to one of their assignments
    if (mentorId) {
        const submission = await prisma.submission.findUnique({
            where: { id },
            include: { assignment: true }
        });
        if (!submission)
            throw new Error("Submission not found");
        if (submission.assignment.mentorId !== mentorId) {
            throw new Error("Unauthorized: You can only review submissions for your own assignments");
        }
    }
    const submission = await prisma.submission.update({
        where: { id },
        data,
    });
    return { message: "Submission reviewed", submission };
};
//# sourceMappingURL=submission.service.js.map