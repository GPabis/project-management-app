import express, { Request, Response } from 'express';
import verifyToken, { getUserFromToken } from '../../middleware/auth';
import { validate } from '../../middleware/validate';

const router = express.Router();

router.post('/project/:id/task', verifyToken, validate, async (req: Request, res: Response) => {
    const user = await getUserFromToken(req, res);
});
