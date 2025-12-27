import { Router } from "express";
import { getAllSubmissions, getSubmissionById, getByAssignment, getByStudent, reviewSubmission, submitAssignment, } from "../Controller/submission.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { restrictTo } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { reviewSubmissionSchema, submitAssignmentSchema } from "../validators/submission.validator.js";
const router = Router();
router.use(protect);
/**
 * @swagger
 * /api/submissions:
 *   get:
 *     summary: Get all submissions for mentor's assignments (Mentor only)
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of submissions
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginatedResponse'
 *                 - type: object
 *                   properties:
 *                     submissions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Submission'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not a mentor
 */
router.get("/", restrictTo("mentor", "admin"), getAllSubmissions);
/**
 * @swagger
 * /api/submissions:
 *   post:
 *     summary: Submit an assignment (Student only)
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assignmentId
 *             properties:
 *               assignmentId:
 *                 type: string
 *                 format: uuid
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       201:
 *         description: Assignment submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assignment submitted successfully
 *                 submission:
 *                   $ref: '#/components/schemas/Submission'
 *       400:
 *         description: Validation error or assignment already completed
 *       403:
 *         description: Forbidden - Assignment not assigned to student or not a student
 *       404:
 *         description: Assignment or student not found
 */
router.post("/", restrictTo("student"), validate(submitAssignmentSchema), submitAssignment);
/**
 * @swagger
 * /api/submissions/{id}:
 *   get:
 *     summary: Get a submission by ID
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Submission ID
 *     responses:
 *       200:
 *         description: Submission details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Submission fetched
 *                 submission:
 *                   $ref: '#/components/schemas/Submission'
 *       403:
 *         description: Forbidden - Not authorized to view this submission
 *       404:
 *         description: Submission not found
 */
router.get("/:id", getSubmissionById);
/**
 * @swagger
 * /api/submissions/assignment/{assignmentId}:
 *   get:
 *     summary: Get all submissions for an assignment
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Assignment ID
 *     responses:
 *       200:
 *         description: List of submissions for the assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Submissions for assignment fetched
 *                 submissions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Submission'
 *       403:
 *         description: Forbidden - Not authorized to view these submissions
 *       404:
 *         description: Assignment not found
 */
router.get("/assignment/:assignmentId", getByAssignment);
/**
 * @swagger
 * /api/submissions/student/{studentId}:
 *   get:
 *     summary: Get all submissions for a student
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student ID
 *     responses:
 *       200:
 *         description: List of submissions for the student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Submissions for student fetched
 *                 submissions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Submission'
 *       403:
 *         description: Forbidden - Not authorized to view these submissions
 *       404:
 *         description: Student not found
 */
router.get("/student/:studentId", getByStudent);
/**
 * @swagger
 * /api/submissions/{id}/review:
 *   put:
 *     summary: Review a submission (Mentor only)
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Submission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [completed, incomplete]
 *                 example: completed
 *               feedback:
 *                 type: string
 *                 example: Great work! Well done.
 *     responses:
 *       200:
 *         description: Submission reviewed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Submission reviewed
 *                 submission:
 *                   $ref: '#/components/schemas/Submission'
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden - Submission does not belong to mentor's assignment
 *       404:
 *         description: Submission not found
 */
router.put("/:id/review", restrictTo("mentor"), validate(reviewSubmissionSchema), reviewSubmission);
export default router;
//# sourceMappingURL=submission.router.js.map