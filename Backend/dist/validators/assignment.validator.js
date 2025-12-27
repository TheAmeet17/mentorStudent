import { z } from "zod";
const assignmentObject = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    dueDate: z.coerce.date({ message: "Invalid date format" }),
    mentorId: z.string().uuid("Invalid Mentor ID").optional(),
});
export const createAssignmentSchema = z.object({
    body: z.union([assignmentObject, z.array(assignmentObject)]),
});
export const updateAssignmentSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        dueDate: z.coerce.date({ message: "Invalid date format" }).optional(),
    }),
});
export const assignToStudentsSchema = z.object({
    body: z.object({
        studentIds: z.array(z.string().uuid("Invalid Student ID")).nonempty("At least one student ID is required"),
    }),
});
//# sourceMappingURL=assignment.validator.js.map