import { Response } from 'express';

export const sendErrorResponse = async (res: Response, message: string, status: number) => {
    const error = {
        errors: [
            {
                msg: message,
            },
        ],
    };

    return await res.status(status).json(error);
};
