import { verifyAccessToken } from "../jwt/token.js";
import { AppError } from "../utils/appError.js";
export const protect = async (req, res, next) => {
    try {
        // 1) Get token and check of it's there
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return next(new AppError("You are not logged in! Please log in to get access.", 401));
        }
        // 2) Verification token
        const decoded = verifyAccessToken(token);
        // 4) GRANT ACCESS TO PROTECTED ROUTE
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Auth Error:", error.message);
        next(new AppError(`Auth Failed: ${error.message}`, 401));
    }
};
//# sourceMappingURL=auth.middleware.js.map