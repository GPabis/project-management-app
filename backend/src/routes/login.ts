import express, { Response, Request } from 'express';
import connect from '../middleware/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { loginUserValidationRules, validate } from '../middleware/validate';
import { findUserByEmail, sendErrorResponse } from '../middleware/auth';

const router = express.Router();

interface loginBody {
    email: string;
    password: string;
}

router.post('/login', loginUserValidationRules(), validate, async (req: Request, res: Response) => {
    try {
        const { email, password }: loginBody = req.body;

        await connect();

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
    } finally {
        await mongoose.connection.close();
    }
});

export default router;
