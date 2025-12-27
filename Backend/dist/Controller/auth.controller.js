import * as authService from "../services/auth.service.js";
import { AppError } from "../utils/appError.js";
export const signupUser = async (req, res, next) => {
    try {
        const result = await authService.signupUserService(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(new AppError(error.message || "Signup failed", 500));
    }
};
export const loginUser = async (req, res, next) => {
    try {
        const result = await authService.loginUserService(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        next(new AppError(error.message || "Login failed", 500));
    }
};
export const logoutUser = (req, res, next) => {
    try {
        const result = authService.logoutUserService();
        res.clearCookie("access_token");
        res.status(200).json(result);
    }
    catch (error) {
        next(new AppError(error.message || "Logout failed", 500));
    }
};
//# sourceMappingURL=auth.controller.js.map