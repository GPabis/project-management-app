import express, { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginUserValidationRules, validate } from '../middleware/validate';
import verifyToken, { findUserByEmail } from '../middleware/auth';
import { getUserFromToken } from './../middleware/auth';
import { sendErrorResponse } from '../middleware/error-handler';
import { loginBody } from '../types/auth-types';

const router = express.Router();

router.post('/login', loginUserValidationRules(), validate, async (req: Request, res: Response) => {
    try {
        const { email, password }: loginBody = req.body;

        const user = await findUserByEmail(email);

        const tokenKey = process.env.TOKEN_KEY;

        if (!tokenKey) return await sendErrorResponse(res, 'Server Problem - plesase try again later', 409);

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user._id, email }, tokenKey, {
                expiresIn: '2h',
            });

            user.token = token;

            res.status(200).json(user);
        } else {
            return await sendErrorResponse(res, 'Invalid Credentials', 409);
        }
    } catch (err) {
        await sendErrorResponse(res, err, 500);
    }
});

router.get('/login', verifyToken, async (req: Request, res: Response) => {
    try {
        const { email, username } = await getUserFromToken(req, res);
        res.status(200).json({ email, username });
    } catch (err) {
        await sendErrorResponse(res, err, 500);
    }
});

export default router;
