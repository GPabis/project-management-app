import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token || req.headers['x-access-token'] || req.body.token;

    if (!token) return res.status(403).send('A token is required for authentication');

    try {
        const tokenKey = process.env.TOKEN_KEY;

        if (!tokenKey) return res.status(500).send('Server Problem - plesase try again later');

        const decoded = jwt.verify(token, tokenKey);
        // eslint-disable-next-line
        (<any>req).user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token!');
    }
    return next();
};

export const findUserByEmail = async (email: string) => {
    const existingUser = await User.findOne({ email });
    return existingUser ? existingUser : false;
};

export const sendErrorResponse = async (res: Response, message: string, status: number) => {
    const error = {
        errors: [
            {
                msg: message,
            },
        ],
    };

    return res.status(status).json(error);
};

export default verifyToken;
