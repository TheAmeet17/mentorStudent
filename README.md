# Mentor-Student System

A backend system for managing mentor-student interactions, assignments, and submissions. Built with Node.js, Express, Prisma, and PostgreSQL.

## Features

- **Authentication**: Secure signup and login for Mentors and Students.
- **Role-based Access**: 
  - **Mentors** can create, update, delete, and view assignments.
  - **Students** can view assigned tasks and submit their work.
- **Assignment Management**: Create assignments with due dates and descriptions.
- **Submissions**: Students can submit work, and mentors can (future feature) grade them.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Documentation**: Swagger (OpenAPI)
- **Authentication**: JWT & Bcrypt

## Prerequisites

- Node.js (v18+)
- PostgreSQL installed and running

## Setup & Installation

1.  **Clone the repository** (if applicable) or navigate to the project folder.

2.  **Navigate to the Backend directory:**
    ```bash
    cd Backend
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Environment Setup:**
    Create a `.env` file in the `Backend` directory with the following variables:
    ```env
    PORT=8000
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    JWT_SECRET="your_super_secret_key"
    ```
    *Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your actual PostgreSQL credentials.*

5.  **Database Migration:**
    Push the schema to your database:
    ```bash
    npx prisma db push
    ```

6.  **Start the Server:**
    - For development (with auto-reload):
      ```bash
      npm run dev
      ```
      Output should look like:
      ```
      Server running at http://localhost:8000
      API Documentation available at http://localhost:8000/api-docs
      Swagger JSON available at http://localhost:8000/api-docs.json
      ```
    - For production:
      ```bash
      npx tsx src/index.ts
      ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login.
- `POST /api/auth/logout` - Logout.

### Assignments
- `POST /api/assignments` - Create a new assignment .
- `GET /api/assignments` - Get all assignments.
- `GET /api/assignments/:id` - Get assignment by ID.
- `PUT /api/assignments/:id` - Update assignment (Mentor only).
- `DELETE /api/assignments/:id` - Delete assignment (Mentor only).
- `POST /api/assignments/:id/assign` - Assign to students (Mentor only).

### Students
- `POST /api/students` - Create a student (Mentor only).
- `GET /api/students` - Get all students (Mentor only).
- `GET /api/students/:id` - Get student by ID (Mentor only).
- `PUT /api/students/:id` - Update student (Mentor only).
- `DELETE /api/students/:id` - Delete student (Mentor only).
- `GET /api/students/:id/progress` - Get student progress (Mentor only).

### Submissions
- `GET /api/submissions` - Get all submissions.(mentor)
- `POST /api/submissions` - Submit an assignment.(student)
- `GET /api/submissions/:id` - Get submission by ID.(mentor)
- `GET /api/submissions/assignment/:assignmentId` - Get submissions by assignment (student)
- `GET /api/submissions/student/:studentId` - Get submissions by student.(student)
- `PUT /api/submissions/:id/review` - Review submission.(mentor)

## API Documentation

This project uses Swagger for interactive API documentation.

- **Swagger UI**: [http://localhost:8000/api-docs](http://localhost:8000/api-docs)
- **Swagger JSON**: [http://localhost:8000/api-docs.json](http://localhost:8000/api-docs.json)

You can use the Swagger UI to create users, assignments, and test authentication flows directly from the browser.

## Project Structure
- `src/Controller`: Handles incoming requests and sends responses.
- `src/services`: Contains business logic and database interactions.
- `src/routes`: Defines API route definitions.
- `src/middleware`: Auth and validation middleware.
- `src/connect`: Database connection configuration.
