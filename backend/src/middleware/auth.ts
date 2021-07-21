import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { Request, Response, NextFunction } from 'express';

config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token || req.headers['x-access-token'] || req.body.token;

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const tokenKey = process.env.TOKEN_KEY;

        if (!tokenKey) {
            return res.status(500).send('Server Problem - plesase try again later');
        }

        const decoded = jwt.verify(token, tokenKey);
        // eslint-disable-next-line
        (<any>req).user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token!');
    }
    return next();
};

export default verifyToken;
