import { z } from "zod";
export declare const reviewSubmissionSchema: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodString;
        feedback: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const submitAssignmentSchema: z.ZodObject<{
    body: z.ZodObject<{
        assignmentId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=submission.validator.d.ts.map