import { NextFunction, Request, Response } from 'express';
import { body, validationResult, ValidationError, Result } from 'express-validator';

export const registerUserValidationRules = () => {
    return [
        body('email').trim().isEmail().isLength({ max: 100 }),
        body('username').isLength({ min: 5, max: 50 }),
        body('password').isLength({ min: 5, max: 50 }),
    ];
};

export const loginUserValidationRules = () => {
    return [body('email').trim().isEmail().isLength({ max: 100 }), body('password').isLength({ min: 5, max: 50 })];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
};
