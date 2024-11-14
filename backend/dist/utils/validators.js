import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty())
                break;
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required."),
    // body("password").notEmpty().withMessage("Password required."),
    // body("password").trim().isLength({min:3}).withMessage("Password should contains atlease 3 letters."),
];
export const signUpValidator = [
    body("name").notEmpty().withMessage("Name is required."),
    ...loginValidator,
    // body("email").trim().isEmail().withMessage("Email is required."),
    body("password").trim().isLength({ min: 3 }).withMessage("Password should contains atlease 3 letters."),
];
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required."),
];
//# sourceMappingURL=validators.js.map