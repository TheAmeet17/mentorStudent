import { Router } from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentProgress,
} from "../Controller/student.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { restrictTo } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../validators/student.validator.js";

const router = Router();

router.use(protect);

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student (Mentor only)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 example: Jane Smith
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane.smith@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student created
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *       400:
 *         description: Validation error or email already exists
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not a mentor
 */
router.post(
  "/",
  restrictTo("mentor", "admin"),
  validate(createStudentSchema),
  createStudent
);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students assigned to the mentor (Mentor only)
 *     tags: [Students]
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
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginatedResponse'
 *                 - type: object
 *                   properties:
 *                     students:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Student'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not a mentor
 */
router.get("/", restrictTo("mentor", "admin"), getAllStudents);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get a student by ID (Mentor only)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student fetched
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *       403:
 *         description: Forbidden - Student does not belong to mentor
 *       404:
 *         description: Student not found
 */
router.get("/:id", restrictTo("mentor", "admin"), getStudentById);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update a student (Mentor only)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Smith Updated
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane.updated@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student updated
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden - Student does not belong to mentor
 *       404:
 *         description: Student not found
 */
router.put(
  "/:id",
  restrictTo("mentor", "admin"),
  validate(updateStudentSchema),
  updateStudent
);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student (Mentor only)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student deleted
 *       403:
 *         description: Forbidden - Student does not belong to mentor
 *       404:
 *         description: Student not found
 */
router.delete("/:id", restrictTo("mentor", "admin"), deleteStudent);

/**
 * @swagger
 * /api/students/{id}/progress:
 *   get:
 *     summary: Get student progress (Mentor only)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student progress information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 studentId:
 *                   type: string
 *                   format: uuid
 *                 totalAssignments:
 *                   type: integer
 *                   example: 10
 *                 completedSubmissions:
 *                   type: integer
 *                   example: 7
 *                 progressPercentage:
 *                   type: number
 *                   example: 70.0
 *       403:
 *         description: Forbidden - Student does not belong to mentor
 *       404:
 *         description: Student not found
 */
router.get("/:id/progress", restrictTo("mentor", "admin"), getStudentProgress);

export default router;
