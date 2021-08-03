import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { sendErrorResponse } from './error-handler';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token || req.headers['x-access-token'] || req.body.token;
    if (!token) return sendErrorResponse(res, 'A token is required for authentication', 401);

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

export const getUserFromToken = async (req: Request, res: Response) => {
    const token = req.query.token || req.headers['x-access-token'] || req.body.token;
    if (!token) return sendErrorResponse(res, 'A token is required for authentication', 401);

    try {
        const tokenKey = process.env.TOKEN_KEY;

        if (!tokenKey) return sendErrorResponse(res, 'Server Problem - plesase try again later', 500);

        const decoded = await jwt.verify(token, tokenKey);

        if (typeof decoded === 'string')
            return sendErrorResponse(res, 'Somethings goes wrong - please login again', 500);

        const user = await findUserByEmail(decoded.email);

        return user;
    } catch (err) {
        return sendErrorResponse(res, 'Invalid token', 401);
    }
};

export default verifyToken;
