import 'dotenv/config';
import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

import assignmentRouter from "./routes/assignment.router.js";
import authRouter from "./routes/auth.router.js";
import studentRouter from "./routes/student.router.js";
import submissionRouter from "./routes/submission.router.js"
import { globalErrorHandler } from "./middleware/error.middleware.js";
import { notFoundHandler } from "./middleware/not-found.middleware.js";
import { getWelcomeMessage } from "./Controller/app.controller.js";
import { handleUncaughtException, handleUnhandledRejection } from "./utils/process-handlers.js";

// Handle uncaught exceptions immediately
handleUncaughtException();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/', getWelcomeMessage);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/assignments', assignmentRouter);
app.use('/api/auth', authRouter);
app.use('/api/students', studentRouter);
app.use('/api/submissions', submissionRouter);

// Handle 404 - Keep this as the LAST route handler
app.use(notFoundHandler);

app.use(globalErrorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  console.log(`Swagger JSON available at http://localhost:${PORT}/api-docs.json`);
});

// Handle unhandled promise rejections
handleUnhandledRejection(server);

export default app;
