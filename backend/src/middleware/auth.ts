import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { sendErrorResponse } from './error-handler';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token || req.headers['x-access-token'] || req.body.token;
    if (!token) return sendErrorResponse(res, 'A token is required for authentication', 401);

    try {
        const tokenKey = getEnvTokenKey();

        const decoded = jwt.verify(token, tokenKey);
        // eslint-disable-next-line
        (<any>req).user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token!');
    }
    return next();
};

export const findUserByEmail = async (email: string, shouldBeEmpty?: boolean) => {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (shouldBeEmpty && existingUser) throw 'There is already user with that email address.';
    if (!shouldBeEmpty && !existingUser) throw 'There is no user with that email address.';
    return existingUser ? existingUser : false;
};

export const getUserFromToken = async (req: Request, res: Response) => {
    const token = req.query.token || req.headers['x-access-token'] || req.body.token;
    if (!token) throw 'A token is required for authentication';
    const tokenKey = process.env.TOKEN_KEY;

    if (!tokenKey) throw 'Server Problem - plesase try again later';

    const decoded = await jwt.verify(token, tokenKey);

    if (typeof decoded === 'string') throw 'Somethings goes wrong - please login again';

    const user = await findUserByEmail(decoded.email);

    if (!user) throw 'Somethings goes wrong. Please login again.';

    return user;
};

export const getEnvTokenKey = () => {
    const tokenKey = process.env.TOKEN_KEY;
    if (!tokenKey) throw 'Server Problem - plesase try again later';
    return tokenKey;
};

export default verifyToken;
