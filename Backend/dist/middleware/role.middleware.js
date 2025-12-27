import { AppError } from "../utils/appError.js";
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']. role='user'
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new AppError("You do not have permission to perform this action", 403));
        }
        next();
    };
};
//# sourceMappingURL=role.middleware.js.map