import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../connect/prisma.js";
import { createAccessToken } from "../jwt/token.js";
import { AppError } from "../utils/appError.js";

export const signupUserService = async ({ name, email, password }: any) => {
  if (!name || !email || !password) throw new AppError("All fields are required", 400);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.mentor.create({
    data: { name, email, password: hashedPassword },
  });

  const token = createAccessToken(user.id, user.email, "mentor");

  return {
    message: "User created successfully.",
    user: { id: user.id, name: user.name, email: user.email },
    token,
  };
};

export const loginUserService = async ({ email, password }: any) => {
  if (!email || !password) throw new AppError("Email and password are required", 400);

  // Check for Mentor, then Student
  let user: any = await prisma.mentor.findUnique({ where: { email } });
  let role = "mentor";

  if (!user) {
    user = await prisma.student.findUnique({ where: { email } });
    role = "student";
  }

  if (!user) throw new AppError("User not found", 404);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new AppError("Invalid password", 401);

  const token = createAccessToken(user.id, user.email, role);

  return {
    message: "Login successful",
    user: { id: user.id, name: user.name, email: user.email, role },
    token,
  };
};

export const logoutUserService = () => {
  return { message: "Logout successful" };
};
