import express, { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginUserValidationRules, validate } from '../middleware/validate';
import verifyToken, { findUserByEmail, getUserFromToken } from '../middleware/auth';
import { getEnvTokenKey } from './../middleware/auth';
import { sendErrorResponse } from '../middleware/error-handler';
import { loginBody } from '../types/auth-types';

const router = express.Router();

router.post('/login', loginUserValidationRules(), validate, async (req: Request, res: Response) => {
    try {
        const { email, password }: loginBody = req.body;

        const user = await findUserByEmail(email, false);

        const tokenKey = getEnvTokenKey();

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
        const { email, username, _id } = await getUserFromToken(req, res);
        res.status(200).json({ email, username, _id });
    } catch (err) {
        await sendErrorResponse(res, err, 500);
    }
});

export default router;
