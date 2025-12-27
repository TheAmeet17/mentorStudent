import { Router } from "express";
import {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  assignToStudents,
} from "../Controller/assignment.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { restrictTo } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createAssignmentSchema,
  updateAssignmentSchema,
  assignToStudentsSchema,
} from "../validators/assignment.validator.js";

const router = Router();

router.use(protect);

/**
 * @swagger
 * /api/assignments:
 *   post:
 *     summary: Create a new assignment (Mentor only)
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 example: Complete React Project
 *               description:
 *                 type: string
 *                 minLength: 5
 *                 example: Build a todo application using React
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-12-31T23:59:59Z
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assignment created
 *                 assignment:
 *                   $ref: '#/components/schemas/Assignment'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not a mentor
 */
router.post(
  "/",
  restrictTo("mentor", "admin"),
  validate(createAssignmentSchema),
  createAssignment
);

/**
 * @swagger
 * /api/assignments:
 *   get:
 *     summary: Get all assignments (Mentors see their own, Students see assigned ones)
 *     tags: [Assignments]
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
 *         description: List of assignments
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginatedResponse'
 *                 - type: object
 *                   properties:
 *                     assignments:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Assignment'
 *       401:
 *         description: Unauthorized
 */
router.get("/", getAllAssignments);

/**
 * @swagger
 * /api/assignments/{id}:
 *   get:
 *     summary: Get an assignment by ID
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Assignment ID
 *     responses:
 *       200:
 *         description: Assignment details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assignment fetched
 *                 assignment:
 *                   $ref: '#/components/schemas/Assignment'
 *       403:
 *         description: Forbidden - Not authorized to view this assignment
 *       404:
 *         description: Assignment not found
 */
router.get("/:id", getAssignmentById);

/**
 * @swagger
 * /api/assignments/{id}:
 *   put:
 *     summary: Update an assignment (Mentor only)
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 example: Updated Assignment Title
 *               description:
 *                 type: string
 *                 minLength: 5
 *                 example: Updated assignment description
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-01-31T23:59:59Z
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assignment updated
 *                 assignment:
 *                   $ref: '#/components/schemas/Assignment'
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden - Assignment does not belong to mentor
 *       404:
 *         description: Assignment not found
 */
router.put(
  "/:id",
  restrictTo("mentor", "admin"),
  validate(updateAssignmentSchema),
  updateAssignment
);

/**
 * @swagger
 * /api/assignments/{id}:
 *   delete:
 *     summary: Delete an assignment (Mentor only)
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Assignment ID
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assignment deleted
 *       403:
 *         description: Forbidden - Assignment does not belong to mentor
 *       404:
 *         description: Assignment not found
 */
router.delete("/:id", restrictTo("mentor", "admin"), deleteAssignment);

/**
 * @swagger
 * /api/assignments/{id}/assign:
 *   post:
 *     summary: Assign an assignment to students (Mentor only)
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentIds
 *             properties:
 *               studentIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example: ["550e8400-e29b-41d4-a716-446655440000", "660e8400-e29b-41d4-a716-446655440001"]
 *     responses:
 *       200:
 *         description: Assignment assigned to students successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assignment assigned to students
 *                 assignedCount:
 *                   type: integer
 *                   example: 2
 *       400:
 *         description: Validation error or students already assigned
 *       403:
 *         description: Forbidden - Assignment does not belong to mentor
 *       404:
 *         description: Assignment not found
 */
router.post("/:id/assign", restrictTo("mentor", "admin"), validate(assignToStudentsSchema), assignToStudents);

export default router;
