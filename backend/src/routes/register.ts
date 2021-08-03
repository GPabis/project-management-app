import User from '../models/user.model';
import express, { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerUserValidationRules, validate } from '../middleware/validate';
import { findUserByEmail } from '../middleware/auth';
import { sendErrorResponse } from '../middleware/error-handler';

interface registerBody {
    email: string;
    username: string;
    password: string;
}

const router = express.Router();

router.post('/register', registerUserValidationRules(), validate, async (req: Request, res: Response) => {
    try {
        const { email, username, password }: registerBody = req.body;

        const userExist = await findUserByEmail(email);

        if (userExist) return await sendErrorResponse(res, 'User already exist', 409);

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email.toLowerCase(),
            username,
            password: encryptedPassword,
        });

        const tokenKey = process.env.TOKEN_KEY;

        if (!tokenKey) {
            return res.status(500).send('Server Problem - plesase try again later');
        }

        const token = jwt.sign({ user_id: user._id, email }, tokenKey, {
            expiresIn: '2h',
        });

        res.status(201).json({
            ...user,
            token,
        });
    } catch (err) {
        await sendErrorResponse(res, err, 500);
    }
});

export default router;
