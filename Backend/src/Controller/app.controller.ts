import { Request, Response } from 'express';

export const getWelcomeMessage = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the Mentor-Student API",
    description: "A comprehensive API for managing mentor-student interactions.",
    documentation: "/api-docs",
  });
};
