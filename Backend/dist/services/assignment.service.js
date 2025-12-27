import prisma from "../connect/prisma.js";
export const createAssignmentService = async (data) => {
    if (Array.isArray(data)) {
        const assignments = await prisma.$transaction(data.map((item) => prisma.assignment.create({ data: item })));
        return { message: "Assignments created", assignments };
    }
    else {
        const assignment = await prisma.assignment.create({ data });
        return { message: "Assignment created", assignment };
    }
};
export const getAllAssignmentsService = async (page = 1, limit = 10, mentorId) => {
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
export const getAssignmentByIdService = async (id) => {
    const assignment = await prisma.assignment.findUnique({ where: { id } });
    if (!assignment)
        throw new Error("Assignment not found");
    return { message: "Assignment fetched", assignment };
};
export const updateAssignmentService = async (id, data, mentorId) => {
    if (mentorId) {
        const assignment = await prisma.assignment.findUnique({ where: { id } });
        if (!assignment || assignment.mentorId !== mentorId) {
            throw new Error("Assignment not found or unauthorized");
        }
    }
    const assignment = await prisma.assignment.update({ where: { id }, data });
    return { message: "Assignment updated", assignment };
};
export const deleteAssignmentService = async (id, mentorId) => {
    if (mentorId) {
        const assignment = await prisma.assignment.findUnique({ where: { id } });
        if (!assignment || assignment.mentorId !== mentorId) {
            throw new Error("Assignment not found or unauthorized");
        }
    }
    await prisma.assignment.delete({ where: { id } });
    return { message: "Assignment deleted" };
};
export const assignToStudentsService = async (assignmentId, data, mentorId) => {
    const { studentIds } = data;
    if (!studentIds || !Array.isArray(studentIds))
        throw new Error("studentIds array required");
    // Check if assignment exists
    const assignment = await prisma.assignment.findUnique({ where: { id: assignmentId } });
    if (!assignment)
        throw new Error("Assignment not found");
    // Verify ownership
    if (mentorId && assignment.mentorId !== mentorId) {
        throw new Error("Unauthorized to assign to this assignment");
    }
    // Validate student IDs
    const students = await prisma.student.findMany({
        where: { id: { in: studentIds } },
        select: { id: true }
    });
    if (students.length !== studentIds.length) {
        const foundIds = students.map(s => s.id);
        const missingIds = studentIds.filter((id) => !foundIds.includes(id));
        throw new Error(`Invalid Student IDs found: ${missingIds.join(", ")}`);
    }
    const submissions = studentIds.map((studentId) => prisma.submission.create({
        data: { assignmentId, studentId, status: "pending" },
    }));
    await prisma.$transaction(submissions);
    return { message: "Assignment assigned to students" };
};
//# sourceMappingURL=assignment.service.js.map