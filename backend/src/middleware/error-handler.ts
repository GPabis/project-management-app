import { Response, Request, NextFunction } from 'express';

export const sendErrorResponse = async (res: Response, message: string, status: number) => {
    const error = {
        errorMessage: message,
    };

    return await res.status(status).json(error);
};
