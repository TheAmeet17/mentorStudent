import { z } from "zod";

export const reviewSubmissionSchema = z.object({
  body: z.object({
    status: z.string().refine((val) => ["completed", "incomplete"].includes(val), {
      message: "Status must be 'completed' or 'incomplete'",
    }),
    feedback: z.string().optional(),
  }),
});

export const submitAssignmentSchema = z.object({
  body: z.object({
    assignmentId: z.string().uuid("Invalid Assignment ID"),
  }),
});
