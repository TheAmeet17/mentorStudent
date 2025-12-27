import { z } from "zod";
export const createStudentSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        mentorId: z.string().uuid("Invalid Mentor ID").optional(),
    }),
});
export const updateStudentSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
    }),
});
//# sourceMappingURL=student.validator.js.map