import { ZodError } from "zod";
import { AppError } from "../utils/appError.js";
export const validate = (schema) => async (req, res, next) => {
    try {
        const result = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        req.body = result.body;
        // req.query and req.params might be read-only in some environments
        // We specificially need req.body update for Date transformation
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.issues.map((err) => err.message).join(", ");
            return next(new AppError(`Validation failed: ${errorMessages}`, 400));
        }
        next(error);
    }
};
//# sourceMappingURL=validate.middleware.js.map