import { NextFunction, Request, Response } from 'express';
import { body, validationResult, ValidationError, Result } from 'express-validator';

export const registerUserValidationRules = () => {
    return [
        body('email').trim().isEmail().isLength({ max: 50 }),
        body('username').trim().isString().isLength({ min: 5, max: 50 }),
        body('password').trim().isString().isLength({ min: 5, max: 50 }),
    ];
};

export const loginUserValidationRules = () => {
    return [body('email').trim().isEmail().isLength({ max: 50 }), body('password').isLength({ min: 5, max: 50 })];
};

export const createProjectValidationRules = () => {
    return [
        body('projectName').trim().isString().isLength({ max: 80, min: 3 }),
        body('projectDescription').trim().isString().isLength({ min: 5, max: 500 }),
    ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
};
