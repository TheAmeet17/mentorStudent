import { z } from "zod";
export declare const createAssignmentSchema: z.ZodObject<{
    body: z.ZodUnion<readonly [z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        dueDate: z.ZodCoercedDate<unknown>;
        mentorId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>, z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        dueDate: z.ZodCoercedDate<unknown>;
        mentorId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>]>;
}, z.core.$strip>;
export declare const updateAssignmentSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        dueDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const assignToStudentsSchema: z.ZodObject<{
    body: z.ZodObject<{
        studentIds: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=assignment.validator.d.ts.map